import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import request from "../../api";
import PageHero from "../../components/ui/PageHero";
import { Clock, GraduationCap } from "lucide-react";

// Sinonimlar lug'ati (Filtr uchun)
const LEVEL_MAP = {
  Bachelor: ["bachelor", "bakalavr", "бакалавр"],
  Master: ["master", "magistr", "магистр"],
  PhD: ["phd", "doktorantura", "пхд", "докторантура"],
};

const ProgramCard = ({ prog, lang }) => {
  const cardColor = prog.bg_color || "#4f46e5";

  const getTagsArray = (tagsData) => {
    if (!tagsData) return [];
    if (Array.isArray(tagsData)) return tagsData;
    if (typeof tagsData === "string")
      return tagsData
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    if (typeof tagsData === "object") return Object.values(tagsData);
    return [];
  };

  const hex2rgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -6 }}
      className="bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl hover:border-transparent transition-all duration-300 cursor-pointer group"
    >
      {/* Top bar */}
      <div
        className="h-[3px] w-full"
        style={{ background: hex2rgba(cardColor, 0.22) }}
      />
      <div
        className="h-[3px] w-full -mt-[3px] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"
        style={{ background: cardColor }}
      />

      <div className="p-[22px]">
        {/* Icon + Badge */}
        <div className="flex justify-between items-start mb-[18px]">
          <div
            className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[26px] border border-slate-100 group-hover:scale-110 transition-transform duration-300"
            style={{ background: hex2rgba(cardColor, 0.1) }}
          >
            {prog.icon_url || "🎓"}
          </div>
          <span
            className="text-[10px] font-medium px-[10px] py-1 rounded-lg tracking-widest uppercase"
            style={{
              background: hex2rgba(cardColor, 0.12),
              color: cardColor,
            }}
          >
            {prog.category_short || "NEW"}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-[16px] font-medium text-slate-900 mb-1.5 leading-snug group-hover:opacity-80 transition-opacity">
          {prog[`name_${lang}`] || prog.name_uz}
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-[13px] leading-relaxed mb-[14px] line-clamp-2">
          {prog[`desc_${lang}`] || prog.desc_uz}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4 min-h-[24px]">
          {getTagsArray(prog.tags).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{
                background: hex2rgba(cardColor, 0.1),
                color: cardColor,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Meta */}
        <div className="flex justify-between items-center pt-[14px] border-t border-slate-100 text-[12px] text-slate-400 font-medium">
          <div className="flex items-center gap-1.5">
            <GraduationCap size={15} className="text-slate-300" />
            <span>{prog.level}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-slate-300" />
            <span>{prog.duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Programs() {
  const { t, i18n } = useTranslation();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await request.get(
          "/academic_programs?select=*&order=id.asc",
        );
        setPrograms(res.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filtr logikasi
  const filteredPrograms = programs.filter((p) => {
    if (filter === "all") return true;
    const backendLevel = String(p.level || "").toLowerCase();
    const synonyms = LEVEL_MAP[filter] || [filter.toLowerCase()];
    return synonyms.some((syn) => backendLevel.includes(syn));
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        crumb={t("programs.hero.crumb")}
        title={t("programs.hero.title")}
        subtitle={t("programs.hero.subtitle")}
      />

      {/* Filtrlar paneli */}
      <div className="bg-[#0d1f3c] sticky top-0 z-30 shadow-xl overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3">
          {(t("programs.filters", { returnObjects: true }) || []).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-2.5 rounded-xl text-[13px] font-black transition-all relative whitespace-nowrap ${
                filter === f.key
                  ? "text-white"
                  : "text-white/40 hover:text-white bg-white/5"
              }`}
            >
              <span className="relative z-10 tracking-widest">{f.label}</span>
              {filter === f.key && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-amber-500 rounded-xl shadow-lg"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Kartalar gridi */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((prog) => (
                <ProgramCard key={prog.id} prog={prog} lang={i18n.language} />
              ))}
            </AnimatePresence>

            {filteredPrograms.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl font-medium uppercase tracking-widest">
                Dasturlar topilmadi
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
