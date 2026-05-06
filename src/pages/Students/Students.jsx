import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { Users, Zap, Globe, Rocket, ArrowUpRight } from "lucide-react";

// Klublar uchun maxsus ranglar va ikonka sozlamalari
const CLUB_METADATA = [
  { icon: <Zap size={28} />, color: "#3de082" }, // Yashil
  { icon: <Rocket size={28} />, color: "#892be2" }, // Binafsha
  { icon: <Globe size={28} />, color: "#fbbf24" }, // Sariq
  { icon: <Users size={28} />, color: "#3b82f6" }, // Ko'k
];

const FACILITY_ICONS = ["🖥️", "🔐", "💡", "📚", "🏋️", "🏠"];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

function Students() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f4f7fa] min-h-screen font-inter">
      <PageHero
        crumb={t("students.hero.crumb")}
        title={t("students.hero.title")}
        subtitle={t("students.hero.subtitle")}
      />

      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* 1. Talabalar Klublari Seksiyasi */}
          <AnimatedSection>
            <div className="flex flex-col items-center text-center mb-20">
              <SectionLabel className="bg-white px-8 py-3 rounded-2xl shadow-sm border border-slate-100 text-[#892be2] font-black tracking-[0.2em] uppercase text-[10px]">
                {t("students.clubs.sectionLabel")}
              </SectionLabel>
              <div className="mt-8">
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
                  {t("students.clubs.title")}
                </h2>
              </div>
            </div>
          </AnimatedSection>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32"
          >
            {t("students.clubs.list", { returnObjects: true }).map(
              (club, index) => {
                const meta = CLUB_METADATA[index] || CLUB_METADATA[0];
                return (
                  <motion.div
                    key={club.name}
                    variants={fadeUp}
                    whileHover={{ y: -12 }}
                    className="bg-white rounded-[3.5rem] p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col relative overflow-hidden group transition-all duration-500"
                    style={{ borderLeft: `14px solid ${meta.color}` }}
                  >
                    <div className="flex-1">
                      <div
                        className="w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 shadow-inner group-hover:scale-110 transition-transform duration-500"
                        style={{
                          backgroundColor: `${meta.color}15`,
                          color: meta.color,
                        }}
                      >
                        {meta.icon}
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[#892be2] transition-colors">
                        {club.name}
                      </h3>
                      <p className="text-slate-500 text-xl md:text-2xl leading-relaxed font-medium mb-10">
                        {club.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              },
            )}
          </motion.div>

          {/* 2. Qulayliklar (Facilities) Seksiyasi */}
          <div className="mt-40">
            <AnimatedSection>
              <div className="flex flex-col items-center text-center mb-24">
                <SectionLabel className="text-[#3de082] font-black uppercase tracking-[0.3em] text-[10px]">
                  {t("students.facilities.sectionLabel")}
                </SectionLabel>
                <h2 className="text-5xl md:text-8xl font-black text-slate-900 mt-8 tracking-tighter leading-[0.9]">
                  {t("students.facilities.title")}
                </h2>
              </div>
            </AnimatedSection>

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
            >
              {t("students.facilities.list", { returnObjects: true }).map(
                (f, index) => (
                  <motion.div
                    key={f.title}
                    variants={fadeUp}
                    whileHover={{
                      y: -20,
                      boxShadow: "0 50px 100px -20px rgba(0,0,0,0.1)",
                    }}
                    className="bg-white rounded-[3.5rem] p-12 md:p-14 border border-slate-100 flex flex-col h-full group transition-all duration-500"
                  >
                    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-5xl mb-10 group-hover:bg-[#892be2] group-hover:text-white transition-all duration-500 shadow-inner">
                      {FACILITY_ICONS[index]}
                    </div>
                    <h4 className="text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[#892be2] transition-colors">
                      {f.title}
                    </h4>
                    <p className="text-slate-500 text-xl leading-relaxed font-medium flex-grow">
                      {f.desc}
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

export default Students;
