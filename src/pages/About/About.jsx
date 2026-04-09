// pages/About/About.jsx — animatsiyalangan versiya
// Timeline: har bir element ketma-ket chiqadi (stagger)
// MVV cards: hover-lift + scroll reveal

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
// Timeline item: chapdan chiqib keladi
const timelineItem = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function About() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("about.hero.crumb")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* MVV Cards — stagger */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
          >
            {t("about.mvv", { returnObjects: true }).map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{
                  y: -6,
                  boxShadow: "0 16px 32px rgba(0,0,0,0.09)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 cursor-default"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl mb-5"
                >
                  {c.icon}
                </motion.div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Timeline */}
          <AnimatedSection direction="up">
            <SectionLabel>{t("about.timeline.sectionLabel")}</SectionLabel>
            <div className="mt-1 mb-3">
              <SectionTitle>{t("about.timeline.title")}</SectionTitle>
            </div>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative pl-10 mt-8"
          >
            {/* Vertical line — grows down */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ once: true }}
              style={{ originY: 0 }}
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200"
            />

            {t("about.timeline.events", { returnObjects: true }).map(
              ({ year, event }, i) => (
                <motion.div
                  key={year}
                  variants={timelineItem}
                  className="flex gap-6 mb-8 items-start relative"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.3,
                      delay: i * 0.06,
                      type: "spring",
                      stiffness: 350,
                    }}
                    viewport={{ once: true }}
                    className={`absolute -left-5.5 w-4 h-4 rounded-full border-4 border-white shadow ${
                      i === 7 ? "bg-amber-500" : "bg-[#0a1628]"
                    }`}
                  />
                  <span
                    className={`text-xs font-black tracking-widest uppercase ${i === 7 ? "text-amber-500" : "text-slate-400"}`}
                  >
                    {year}
                  </span>
                  <p className="text-[15px] text-slate-800 mt-1 leading-relaxed">
                    {event}
                  </p>
                </motion.div>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default About;
