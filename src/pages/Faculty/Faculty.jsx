// Faculty.jsx — Website sahifasi (Supabase bilan)
// npm install @supabase/supabase-js framer-motion lucide-react

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Send,
  Instagram,
  Facebook,
  Mail,
  X,
  Search,
  FileText,
  Loader2,
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";

// --- O'z Supabase URL va ANON KEY ni kiriting ---
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);

const CONTACT_LINKS = [
  {
    key: "phone",
    label: "Telefon",
    Icon: Phone,
    href: (s) => `tel:${s.phone?.replace(/\s/g, "")}`,
    value: (s) => s.phone,
    wrapperCls: "bg-green-50 border-green-100 hover:bg-green-100",
    textCls: "text-green-800",
    iconBg: "bg-green-100",
    iconCls: "text-green-600",
  },
  {
    key: "telegram",
    label: "Telegram",
    Icon: Send,
    href: (s) => s.telegram,
    value: (s) => s.telegram?.replace("https://t.me/", "@"),
    wrapperCls: "bg-sky-50 border-sky-100 hover:bg-sky-100",
    textCls: "text-sky-800",
    iconBg: "bg-sky-100",
    iconCls: "text-sky-600",
  },
  {
    key: "instagram",
    label: "Instagram",
    Icon: Instagram,
    href: (s) => s.instagram,
    value: (s) => s.instagram?.replace("https://instagram.com/", "@"),
    wrapperCls: "bg-pink-50 border-pink-100 hover:bg-pink-100",
    textCls: "text-pink-800",
    iconBg: "bg-pink-100",
    iconCls: "text-pink-600",
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: Facebook,
    href: (s) => s.facebook,
    value: (s) => s.facebook?.replace("https://facebook.com/", ""),
    wrapperCls: "bg-blue-50 border-blue-100 hover:bg-blue-100",
    textCls: "text-blue-800",
    iconBg: "bg-blue-100",
    iconCls: "text-blue-600",
  },
  {
    key: "email",
    label: "Email",
    Icon: Mail,
    href: (s) => `mailto:${s.email}`,
    value: (s) => s.email,
    wrapperCls: "bg-amber-50 border-amber-100 hover:bg-amber-100",
    textCls: "text-amber-800",
    iconBg: "bg-amber-100",
    iconCls: "text-amber-600",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardAnim = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Faculty() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language || "uz";

  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showContact, setShowContact] = useState(false);

  // --- Supabase dan ma'lumot olish ---
  useEffect(() => {
    const fetchFaculty = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("faculty")
        .select("*")
        .eq("status", "active")
        .order("id", { ascending: true });

      if (!error) setFaculty(data || []);
      setLoading(false);
    };
    fetchFaculty();
  }, []);

  // Ko'p tilli maydonlar uchun yordamchi
  const tr = (item, field) =>
    item[`${field}_${lang}`] || item[`${field}_uz`] || "";

  const visible = faculty.filter((f) => {
    const q = search.toLowerCase();
    return (
      tr(f, "name").toLowerCase().includes(q) ||
      tr(f, "dept").toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Hero */}
      <div className="bg-[#0d1f3c] py-16 px-6 text-center">
        <p className="text-amber-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
          {t("faculty.hero.crumb", "Biz haqimizda / Professor-o'qituvchilar")}
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
          {t("faculty.hero.title", "Bizning Jamoamiz")}
        </h1>
        <p className="text-white/50 max-w-xl mx-auto text-sm leading-relaxed">
          {t(
            "faculty.hero.subtitle",
            "Tajribali professor-o'qituvchilar va tadqiqotchilar jamoasi",
          )}
        </p>
      </div>

      {/* Search bar */}
      <div className="bg-[#0d1f3c] border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
          <input
            type="text"
            placeholder={t(
              "faculty.searchPlaceholder",
              "Ism yoki kafedra bo'yicha qidiring...",
            )}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-10 pr-5 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="bg-slate-50 py-16 min-h-[400px]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-32 gap-3 text-slate-400">
              <Loader2 size={24} className="animate-spin" />
              <span className="font-semibold text-sm">Yuklanmoqda...</span>
            </div>
          ) : (
            <>
              <motion.div
                key={search}
                variants={stagger}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {visible.map((m) => (
                  <motion.div
                    key={m.id}
                    variants={cardAnim}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    onClick={() => {
                      setSelected(m);
                      setShowContact(false);
                    }}
                    className="bg-white rounded-2xl p-8 border border-slate-200 cursor-pointer group relative overflow-hidden"
                  >
                    {/* Top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                      style={{ backgroundColor: m.avatar_color }}
                    />

                    <div className="flex gap-4 mb-6">
                      <div className="relative shrink-0">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center text-white text-lg font-black overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300"
                          style={{ backgroundColor: m.avatar_color }}
                        >
                          {m.image_url ? (
                            <img
                              src={m.image_url}
                              alt={tr(m, "name")}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            m.initials
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-[16px] font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                          {tr(m, "name")}
                        </h4>
                        <p className="text-blue-700 font-bold text-[13px]">
                          {tr(m, "role")}
                        </p>
                        <p className="text-slate-400 text-[12px] mt-0.5">
                          {t("faculty.deptLabel", "Kafedra:")} {tr(m, "dept")}
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-4 mb-4">
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                        {t("faculty.researchLabel", "Tadqiqot yo'nalishi")}
                      </p>
                      <p className="text-[13px] text-slate-700 font-semibold line-clamp-1">
                        {tr(m, "research")}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FileText size={13} /> {m.pubs}{" "}
                        {t("faculty.pubsLabel", "ta nashr")}
                      </span>
                      <button
                        className="text-white text-[12px] font-bold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                        style={{ backgroundColor: m.avatar_color }}
                      >
                        {t("faculty.profileBtn", "Profil")}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {visible.length === 0 && (
                <div className="text-center py-20 text-slate-400">
                  <div className="text-5xl mb-4">🔍</div>
                  <p className="font-semibold">
                    {t("faculty.notFound", "Natija topilmadi")}
                  </p>
                </div>
              )}
            </>
          )}

          {/* MODAL */}
          <AnimatePresence>
            {selected && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10001] flex items-end md:items-center justify-center p-0 md:p-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  onClick={() => setSelected(null)}
                />

                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white w-full max-w-xl md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                >
                  <div className="md:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1 shrink-0" />

                  {/* Color header strip */}
                  <div
                    className="h-20 absolute top-0 left-0 w-full pointer-events-none opacity-10"
                    style={{ backgroundColor: selected.avatar_color }}
                  />

                  <div className="relative p-6 md:p-8 overflow-y-auto">
                    <button
                      onClick={() => setSelected(null)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-slate-500 hover:bg-slate-100 transition-colors z-10"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                      <div className="shrink-0 text-center md:text-left">
                        <div
                          className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg mb-3 mx-auto flex items-center justify-center text-white text-3xl font-black"
                          style={{ backgroundColor: selected.avatar_color }}
                        >
                          {selected.image_url ? (
                            <img
                              src={selected.image_url}
                              className="w-full h-full object-cover"
                              alt={tr(selected, "name")}
                            />
                          ) : (
                            selected.initials
                          )}
                        </div>
                        <div className="flex flex-col items-center md:items-start gap-1">
                          <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                            {tr(selected, "role")}
                          </span>
                          <p className="text-slate-400 text-[11px] font-medium mt-1">
                            {selected.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex-1 text-center md:text-left">
                        <h2 className="text-xl font-black text-slate-900 leading-tight">
                          {tr(selected, "name")}
                        </h2>
                        <p className="text-blue-700 font-bold text-xs mb-4">
                          {tr(selected, "dept")}
                        </p>
                        <div className="space-y-4">
                          <section>
                            <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                              {t("faculty.modal.bioLabel", "Tarjimayi hol")}
                            </h5>
                            <p className="text-slate-600 text-[13px] leading-relaxed">
                              {tr(selected, "bio")}
                            </p>
                          </section>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">
                                {t("faculty.modal.educationLabel", "Ma'lumoti")}
                              </p>
                              <p className="text-slate-800 text-[11px] font-bold leading-tight">
                                {selected.education}
                              </p>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                              <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">
                                {t("faculty.modal.pubsLabel", "Nashrlar")}
                              </p>
                              <p className="text-slate-800 text-[11px] font-bold leading-tight">
                                {selected.pubs}{" "}
                                {t("faculty.modal.pubsSuffix", "ta maqola")}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 space-y-3">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowContact((v) => !v)}
                        className="w-full py-3.5 rounded-xl text-white font-bold text-xs shadow-md transition-all"
                        style={{ backgroundColor: selected.avatar_color }}
                      >
                        {showContact
                          ? t("faculty.modal.hideContactBtn", "▲ Yopish")
                          : t("faculty.modal.contactBtn", "Bog'lanish")}
                      </motion.button>

                      <AnimatePresence>
                        {showContact && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden flex flex-col gap-2"
                          >
                            {CONTACT_LINKS.map(
                              ({
                                key,
                                label,
                                Icon,
                                href,
                                value,
                                wrapperCls,
                                textCls,
                                iconBg,
                                iconCls,
                              }) => {
                                const val = value(selected);
                                if (!val) return null;
                                return (
                                  <a
                                    key={key}
                                    href={href(selected)}
                                    target={
                                      key !== "phone" && key !== "email"
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${wrapperCls}`}
                                  >
                                    <span
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg} ${iconCls}`}
                                    >
                                      <Icon size={16} />
                                    </span>
                                    <div className="min-w-0">
                                      <p
                                        className={`text-[10px] font-bold uppercase tracking-widest opacity-60 ${textCls}`}
                                      >
                                        {label}
                                      </p>
                                      <p
                                        className={`text-[13px] font-semibold truncate ${textCls}`}
                                      >
                                        {val}
                                      </p>
                                    </div>
                                  </a>
                                );
                              },
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all"
                        onClick={() => setSelected(null)}
                      >
                        {t("faculty.modal.closeBtn", "Yopish")}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
