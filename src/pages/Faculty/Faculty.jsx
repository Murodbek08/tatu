import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Send,
  Mail,
  X,
  Search,
  FileText,
  GraduationCap,
  Award,
  MapPin,
  ChevronRight,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import { useTranslation } from "react-i18next";
import { request } from "../../api";

const CONTACT_LINKS = [
  {
    key: "phone",
    label: "Telefon",
    Icon: Phone,
    href: (s) => `tel:${s.phone?.replace(/\s/g, "")}`,
    value: (s) => s.phone,
    wrapperCls: "bg-emerald-50 border-emerald-100 text-emerald-900",
    iconBg: "bg-emerald-500",
  },
  {
    key: "telegram",
    label: "Telegram",
    Icon: Send,
    href: (s) => s.telegram,
    value: (s) => s.telegram?.replace("https://t.me/", "@"),
    wrapperCls: "bg-blue-50 border-blue-100 text-blue-900",
    iconBg: "bg-blue-500",
  },
  {
    key: "email",
    label: "Email",
    Icon: Mail,
    href: (s) => `mailto:${s.email}`,
    value: (s) => s.email,
    wrapperCls: "bg-slate-100 border-slate-200 text-slate-900",
    iconBg: "bg-slate-800",
  },
];

export default function Faculty() {
  const { t, i18n } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getField = (obj, fieldName) => {
    const currentLang = i18n.language;
    return obj[`${fieldName}_${currentLang}`] || obj[`${fieldName}_uz`] || "";
  };

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        setLoading(true);
        const { data } = await request.get("/faculty?select=*&order=id.asc");
        setFacultyList(data);
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaculty();
  }, []);

  const visible = facultyList.filter(
    (f) =>
      getField(f, "name").toLowerCase().includes(search.toLowerCase()) ||
      getField(f, "dept").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-[#f1f5f9] min-h-screen pb-20 font-inter">
      <PageHero
        crumb={t("faculty.hero.crumb")}
        title={t("faculty.hero.title")}
      />

      {/* 1. Search Bar - IXCHAM VA RANGDOR */}
      <div className="sticky top-0 z-100 bg-white/80 backdrop-blur-md border-b border-slate-200 py-5 px-6">
        <div className="max-w-4xl mx-auto relative">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder={t("faculty.searchPlaceholder")}
            className="w-full bg-slate-100/50 border border-slate-200 rounded-2xl pl-14 pr-6 py-4 text-lg focus:ring-2 focus:ring-blue-500 transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex justify-center items-center h-64 italic font-bold text-slate-400 uppercase tracking-widest">
            Yuklanmoqda...
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((m) => {
                // Rangni aniqlash
                const accentColor = m.bg_color || "#3b82f6";

                return (
                  <motion.div
                    key={m.id}
                    layout
                    whileHover={{ y: -10 }}
                    onClick={() => setSelectedStaff(m)}
                    className="group relative flex flex-col h-full bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-slate-100"
                    style={{
                      // Border-left o'rniga ichki shadow yoki pseudoelement ishlatsa responsivlik buzilmaydi
                      boxShadow: `inset 10px 0 0 0 ${accentColor}, 0 1px 3px 0 rgb(0 0 0 / 0.1)`,
                    }}
                  >
                    <div className="p-6 md:p-10 flex flex-col h-full">
                      {/* Identity Section */}
                      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
                        <div className="relative shrink-0">
                          <div
                            className={`w-24 h-24 sm:w-28 sm:h-28 rounded-[1.8rem] ${m.avatar_cls || "bg-blue-600"} flex items-center justify-center text-white text-3xl font-black shadow-xl overflow-hidden border-4 border-white group-hover:scale-105 transition-transform duration-500`}
                          >
                            {m.image ? (
                              <img
                                src={m.image}
                                alt=""
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              m.initials
                            )}
                          </div>
                        </div>
                        <div className="text-center sm:text-left min-w-0">
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors truncate">
                            {getField(m, "name")}
                          </h3>
                          <div className="inline-flex px-3 py-1 bg-slate-100 rounded-lg">
                            <p className="text-blue-600 text-[10px] md:text-xs font-black uppercase tracking-widest">
                              {getField(m, "role")}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Department - Responsiv p-6 */}
                      <div className="bg-slate-50 rounded-3xl md:rounded-4xl p-5 md:p-8 mb-8 grow border border-slate-100 group-hover:bg-blue-50/30 transition-colors">
                        <p className="text-base md:text-xl font-bold text-slate-800 leading-snug">
                          {getField(m, "dept")}
                        </p>
                      </div>

                      {/* Footer - Stats */}
                      <div className="flex justify-between items-center pt-6 border-t border-slate-100 mt-auto">
                        <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
                            Ilmiy faoliyat
                          </span>
                          <div className="flex items-center gap-2 text-slate-900 font-black">
                            <FileText
                              size={20}
                              className="text-blue-500 shrink-0"
                            />
                            <span className="text-xl md:text-2xl">
                              {m.pubs}{" "}
                              <span className="text-[10px] md:text-xs font-medium opacity-60 uppercase tracking-normal">
                                nashr
                              </span>
                            </span>
                          </div>
                        </div>

                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shrink-0 shadow-sm">
                          <ChevronRight size={24} />
                        </div>
                      </div>
                    </div>

                    {/* Hover nur effekti */}
                    <div
                      className="absolute -bottom-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-[0.05] transition-opacity blur-3xl rounded-full pointer-events-none"
                      style={{ backgroundColor: accentColor }}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* 2. MODAL - O'RTACHA O'LCHAM VA PREMIUN STYLE */}
      <AnimatePresence>
        {selectedStaff && (
          <div className="fixed inset-0 z-10001 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStaff(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal - Ixcham va Premium */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-3xl rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              {/* Modal Top Border/Header */}
              <div
                className={`h-24 w-full ${selectedStaff.avatar_cls || "bg-blue-600"} relative shrink-0`}
              >
                {/* YOPISH TUGMASI (X ICON) */}
                <button
                  onClick={() => setSelectedStaff(null)}
                  className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-black/10 hover:bg-black/20 text-white rounded-full transition-all backdrop-blur-sm group"
                >
                  <X
                    size={20}
                    className="group-hover:rotate-90 transition-transform duration-300"
                  />
                </button>
              </div>

              <div className="px-8 md:px-10 pb-10 -mt-12 md:-mt-14 flex-1 overflow-y-auto">
                {/* Profile Head */}
                <div className="flex flex-col md:flex-row gap-6 items-center md:items-end mb-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-4xl bg-white p-1.5 shadow-xl border-4 border-white shrink-0 overflow-hidden">
                    {selectedStaff.image ? (
                      <img
                        src={selectedStaff.image}
                        className="w-full h-full object-cover rounded-[1.7rem]"
                        alt=""
                      />
                    ) : (
                      <div className="w-full h-full rounded-[1.7rem] bg-slate-100 flex items-center justify-center text-4xl font-black text-slate-300">
                        {selectedStaff.initials}
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-3xl font-black text-slate-900 leading-tight">
                      {getField(selectedStaff, "name")}
                    </h2>
                    <p className="text-blue-600 text-lg font-bold">
                      {getField(selectedStaff, "role")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Bio & Education */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
                        <Award size={14} /> Biografiya
                      </h4>
                      <p className="text-slate-600 text-base leading-relaxed font-medium">
                        {getField(selectedStaff, "bio")}
                      </p>
                    </section>

                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                      <span className="text-[9px] font-black uppercase text-slate-400 block mb-2">
                        Ma'lumoti
                      </span>
                      <p className="text-slate-900 font-bold text-sm leading-snug">
                        {getField(selectedStaff, "education")}
                      </p>
                    </div>
                  </div>

                  {/* Department & Contact */}
                  <div className="space-y-6">
                    <div className="p-6 bg-slate-900 rounded-3xl text-white">
                      <h5 className="text-lg font-bold mb-5 leading-tight">
                        {getField(selectedStaff, "dept")}
                      </h5>
                      <a
                        href={`mailto:${selectedStaff.email}`}
                        className="block w-full py-3.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-black text-center text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-500/20"
                      >
                        Xat yozish
                      </a>
                    </div>

                    <div className="space-y-2">
                      <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest pl-2 mb-2">
                        Aloqa
                      </p>
                      {CONTACT_LINKS.map((link) => {
                        const val = link.value(selectedStaff);
                        if (!val) return null;
                        return (
                          <a
                            key={link.key}
                            href={link.href(selectedStaff)}
                            className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all ${link.wrapperCls}`}
                          >
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${link.iconBg} text-white shadow-sm`}
                            >
                              <link.Icon size={14} />
                            </div>
                            <span className="text-sm font-bold truncate">
                              {val}
                            </span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
