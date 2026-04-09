// pages/Research/Research.jsx — animatsiyalangan versiya
// Areas: stagger cards | Stats band: count-up | Labs: hover-lift

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";
import CountUp from "../../components/ui/CountUp";

const AREA_METADATA = [
  { icon: "🧠", bar: "from-blue-600 to-blue-800" },
  { icon: "🛡️", bar: "from-rose-600 to-rose-800" },
  { icon: "🏙️", bar: "from-emerald-600 to-emerald-800" },
  { icon: "📡", bar: "from-violet-600 to-violet-800" },
];
const LAB_ICONS = ["🖥️", "🔐", "💡", "⚡", "📡", "🤖"];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Research() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("research.hero.crumb")}
        title={t("research.hero.title")}
        subtitle={t("research.hero.subtitle")}
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <AnimatedSection>
            <SectionLabel>{t("research.areas.sectionLabel")}</SectionLabel>
            <div className="mt-1 mb-10">
              <SectionTitle>{t("research.areas.title")}</SectionTitle>
            </div>
          </AnimatedSection>

          {/* Areas — stagger */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20"
          >
            {t("research.areas.list", { returnObjects: true }).map(
              (area, index) => {
                const meta = AREA_METADATA[index] || {};
                return (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    whileHover={{
                      y: -6,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex cursor-pointer group"
                  >
                    <motion.div
                      className={`w-2 bg-gradient-to-b ${meta.bar} shrink-0`}
                      whileHover={{ width: "6px" }}
                      transition={{ duration: 0.2 }}
                    />
                    <div className="p-8">
                      <motion.div
                        className="text-4xl mb-4"
                        whileHover={{ scale: 1.2, rotate: -8 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {meta.icon}
                      </motion.div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {area.desc}
                      </p>
                      <span className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-xl">
                        {area.projects} {t("research.areas.projectsSuffix")}
                      </span>
                    </div>
                  </motion.div>
                );
              },
            )}
          </motion.div>

          {/* Stats band — count-up */}
          <AnimatedSection direction="up">
            <div className="bg-[#0a1628] rounded-3xl p-12">
              <h3
                className="text-white font-black text-2xl text-center mb-10"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {t("research.stats.title")}
              </h3>
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8"
              >
                {t("research.stats.list", { returnObjects: true }).map(
                  (stat) => (
                    <motion.div
                      key={stat.l}
                      variants={fadeUp}
                      className="text-center"
                    >
                      <p className="text-amber-400 font-black text-4xl leading-none mb-2">
                        <CountUp value={stat.v} duration={2000} />
                      </p>
                      <p className="text-white font-bold text-[15px] mb-1">
                        {stat.l}
                      </p>
                      <p className="text-white/40 text-xs">{stat.s}</p>
                    </motion.div>
                  ),
                )}
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Labs */}
          <div className="mt-20">
            <AnimatedSection>
              <SectionLabel>{t("research.labs.sectionLabel")}</SectionLabel>
              <div className="mt-2 mb-8">
                <SectionTitle>{t("research.labs.title")}</SectionTitle>
              </div>
            </AnimatedSection>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
            >
              {t("research.labs.list", { returnObjects: true }).map(
                (lab, index) => (
                  <motion.div
                    key={lab.name}
                    variants={fadeUp}
                    whileHover={{
                      y: -5,
                      borderColor: "#93c5fd",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                    }}
                    transition={{ type: "spring", stiffness: 280, damping: 22 }}
                    className="bg-white rounded-2xl p-7 border border-slate-200 transition-colors cursor-pointer group"
                  >
                    <motion.div
                      className="text-3xl mb-4"
                      whileHover={{ scale: 1.2, rotate: -6 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {LAB_ICONS[index]}
                    </motion.div>
                    <h4 className="text-[15px] font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {lab.name}
                    </h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      {lab.desc}
                    </p>
                  </motion.div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
