// pages/Programs/Programs.jsx — animatsiyalangan versiya
// Framer Motion: filter toggle, stagger cards, hover-lift

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { useTranslation } from "react-i18next";

const PROGRAMS_META = [
  { id: 1, code: "CS", icon: "💻", hex: "#1d4ed8" },
  { id: 2, code: "CE", icon: "🔧", hex: "#0891b2" },
  { id: 3, code: "IT", icon: "🌐", hex: "#7c3aed" },
  { id: 4, code: "DS", icon: "📊", hex: "#059669" },
  { id: 5, code: "EE", icon: "⚡", hex: "#d97706" },
  { id: 6, code: "AI", icon: "🤖", hex: "#e11d48" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

function Programs() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");

  const translations = t("programs.list", { returnObjects: true });
  const mergedPrograms = translations.map((item, index) => ({
    ...item,
    ...PROGRAMS_META[index],
  }));
  const filteredPrograms = mergedPrograms.filter((prog) => {
    if (filter === "all") return true;
    return prog.type.toLowerCase().includes(filter.toLowerCase().trim());
  });

  return (
    <div>
      <PageHero
        crumb={t("programs.hero.crumb")}
        title={t("programs.hero.title")}
        subtitle={t("programs.hero.subtitle")}
      />

      {/* Filter bar */}
      <div className="bg-[#0d1f3c] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {t("programs.filters", { returnObjects: true }).map((f) => (
            <motion.button
              key={f.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap shrink-0 relative overflow-hidden ${
                filter === f.key
                  ? "bg-amber-500 text-white shadow"
                  : "bg-white/10 text-white/70 hover:bg-white/18 border border-white/15"
              }`}
            >
              {f.label}
              {filter === f.key && (
                <motion.div
                  layoutId="filter-pill"
                  className="absolute inset-0 bg-amber-500 rounded-lg -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            key={filter}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredPrograms.map((prog) => (
              <motion.div
                key={prog.id}
                variants={cardItem}
                layout
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                onClick={() => setActive(active === prog.id ? null : prog.id)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Colored header */}
                <div
                  className="p-6 text-white relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${prog.hex}ee, ${prog.hex}aa)`,
                  }}
                >
                  {/* Subtle shine */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  <div className="flex justify-between items-start relative z-10">
                    <motion.div
                      whileHover={{ rotate: [0, -8, 8, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                      className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-4"
                    >
                      {prog.icon}
                    </motion.div>
                    <span className="bg-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-lg tracking-widest">
                      {prog.code}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-extrabold leading-snug mb-1 relative z-10">
                    {prog.title}
                  </h3>
                  <p className="text-white/70 text-[13px] relative z-10">
                    {prog.degree}
                  </p>
                </div>

                <div className="p-6">
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
                    {prog.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {prog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: prog.hex + "12", color: prog.hex }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[12px] text-slate-400">
                    <span>🎓 {prog.degree}</span>
                    <span>⏱ {prog.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Programs;
