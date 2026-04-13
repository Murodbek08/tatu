import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import request from "../../api";
import PageHero from "../../components/ui/PageHero";
import { Clock, GraduationCap } from "lucide-react";

// 1. Sinonimlar lug'ati: Filtr kalitini backenddagi turli xil yozilishlar bilan bog'laymiz
const LEVEL_MAP = {
  Bachelor: ["bachelor", "bakalavr", "бакалавр"],
  Master: ["master", "magistr", "магистр"],
  PhD: ["phd", "doktorantura", "пхд", "докторантура"],
};

const ProgramCard = ({ prog, lang }) => {
  const cardColor = prog.bg_color || "#4f46e5";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[32px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
    >
      <div
        className="p-8 text-white relative"
        style={{ background: cardColor }}
      >
        <div className="flex justify-between items-start mb-8">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[20px] flex items-center justify-center text-3xl shadow-lg">
            {prog.icon || "🎓"}
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest uppercase border border-white/10">
            {prog.category_code}
          </div>
        </div>
        <h3 className="text-[21px] font-bold leading-tight mb-2">
          {prog[`name_${lang}`] || prog.name_uz}
        </h3>
      </div>

      <div className="p-8">
        <p className="text-slate-500 text-[15px] leading-relaxed mb-6 line-clamp-2">
          {prog[`desc_${lang}`] || prog.desc_uz}
        </p>

        <div className="flex flex-wrap gap-2 mb-8">
          {prog.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] font-bold rounded-full border uppercase"
              style={{
                backgroundColor: `${cardColor}10`,
                color: cardColor,
                borderColor: `${cardColor}20`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center pt-5 border-t border-slate-100 text-[13px] text-slate-400 font-bold">
          <div className="flex items-center gap-2">
            <GraduationCap size={18} />
            <span>{prog.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={18} />
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

  // 2. Kuchaytirilgan filtr logikasi
  const filteredPrograms = programs.filter((p) => {
    if (filter === "all") return true;

    const backendLevel = String(p.level || "").toLowerCase();

    // Lug'atdan mos sinonimlarni olamiz, agar lug'atda bo'lmasa filtrning o'zini ishlatamiz
    const synonyms = LEVEL_MAP[filter] || [filter.toLowerCase()];

    // Backend matni (masalan: "Bakalavr / Magistr") ichida sinonimlardan birontasi bormi?
    return synonyms.some((syn) => backendLevel.includes(syn));
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        crumb={t("programs.hero.crumb")}
        title={t("programs.hero.title")}
        subtitle={t("programs.hero.subtitle")}
      />

      <div className="bg-[#0d1f3c] sticky top-0 z-30 shadow-xl overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-3">
          {t("programs.filters", { returnObjects: true }).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-6 py-2.5 rounded-xl text-[13px] font-black transition-all relative whitespace-nowrap ${
                filter === f.key
                  ? "text-white"
                  : "text-white/40 hover:text-white bg-white/5"
              }`}
            >
              <span className="relative z-10 tracking-widest">
                {f.label}
              </span>
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
