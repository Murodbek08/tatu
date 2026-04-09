// pages/Students/Students.jsx — animatsiyalangan versiya
// Clubs: hover slide-right + border accent | Facilities: stagger hover-lift

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";

const CLUB_ICONS = ["⚡", "🤖", "🛡️", "🚀"];
const FACILITY_ICONS = ["🖥️", "🔐", "💡", "📚", "🏋️", "🏠"];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
const slideLeft = {
  hidden: { opacity: 0, x: -28 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Students() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("students.hero.crumb")}
        title={t("students.hero.title")}
        subtitle={t("students.hero.subtitle")}
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Clubs header */}
          <AnimatedSection>
            <SectionLabel>{t("students.clubs.sectionLabel")}</SectionLabel>
            <div className="mt-1 mb-3">
              <SectionTitle>{t("students.clubs.title")}</SectionTitle>
            </div>
            <SectionSubtitle>{t("students.clubs.subtitle")}</SectionSubtitle>
          </AnimatedSection>

          {/* Clubs — slide-left stagger */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mb-20"
          >
            {t("students.clubs.list", { returnObjects: true }).map(
              (club, index) => (
                <motion.div
                  key={club.name}
                  variants={slideLeft}
                  whileHover={{ x: 6, borderColor: "#f59e0b" }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="bg-white rounded-2xl p-7 border border-slate-200 flex gap-5 items-start cursor-pointer group"
                >
                  <motion.div
                    whileHover={{ scale: 1.12, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className="w-14 h-14 bg-[#0a1628] rounded-2xl flex items-center justify-center text-3xl shrink-0"
                  >
                    {CLUB_ICONS[index]}
                  </motion.div>
                  <div>
                    <h4 className="text-[16px] font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {club.name}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {club.desc}
                    </p>
                    <span className="text-amber-600 font-bold text-sm">
                      👥 {club.members} {t("students.clubs.membersSuffix")}
                    </span>
                  </div>
                </motion.div>
              ),
            )}
          </motion.div>

          {/* Facilities header */}
          <AnimatedSection>
            <SectionLabel>{t("students.facilities.sectionLabel")}</SectionLabel>
            <div className="mt-2 mb-8">
              <SectionTitle>{t("students.facilities.title")}</SectionTitle>
            </div>
          </AnimatedSection>

          {/* Facilities — stagger grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {t("students.facilities.list", { returnObjects: true }).map(
              (f, index) => (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{
                    y: -6,
                    borderColor: "#93c5fd",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  }}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                  className="bg-white rounded-2xl p-7 border border-slate-200 cursor-pointer group"
                >
                  <motion.div
                    className="text-3xl mb-4"
                    whileHover={{ scale: 1.2, rotate: -6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {FACILITY_ICONS[index]}
                  </motion.div>
                  <h4 className="text-[15px] font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {f.desc}
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

export default Students;
