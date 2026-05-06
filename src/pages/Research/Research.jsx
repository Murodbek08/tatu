import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import AnimatedSection from "../../components/ui/AnimatedSection";
import CountUp from "../../components/ui/CountUp";
import { Cpu, Beaker, Microscope, Radio, FlaskConical } from "lucide-react";

// Ranglar va Ikonkalar
const AREA_METADATA = [
  { icon: <Cpu size={32} />, color: "#3de082" },
  { icon: <Beaker size={32} />, color: "#892be2" },
  { icon: <Microscope size={32} />, color: "#fbbf24" },
  { icon: <Radio size={32} />, color: "#3b82f6" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

function Research() {
  const { t } = useTranslation();

  return (
    <div className="bg-[#f8fafc] min-h-screen">
      <PageHero
        crumb={t("research.hero.crumb")}
        title={t("research.hero.title")}
        subtitle={t("research.hero.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* 1. Yo'nalishlar Seksiyasi */}
        <AnimatedSection>
          <div className="text-center mb-16 md:mb-24">
            <SectionLabel className="text-[#892be2] font-black tracking-[0.2em] text-xs">
              {t("research.areas.sectionLabel")}
            </SectionLabel>
            <h2 className="mt-6 text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
              {t("research.areas.title")}
            </h2>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-32">
          {t("research.areas.list", { returnObjects: true }).map(
            (area, index) => {
              const meta = AREA_METADATA[index] || AREA_METADATA[0];
              return (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] p-10 md:p-14 shadow-sm border border-slate-100 flex flex-col relative overflow-hidden group hover:shadow-2xl transition-all duration-500"
                  style={{ borderLeft: `12px solid ${meta.color}` }}
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem] flex items-center justify-center mb-8 shadow-inner transition-transform group-hover:scale-110 duration-500"
                    style={{
                      backgroundColor: `${meta.color}15`,
                      color: meta.color,
                    }}
                  >
                    {meta.icon}
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-tight group-hover:text-blue-600 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-600 text-lg md:text-2xl leading-relaxed font-medium opacity-90">
                    {area.desc}
                  </p>
                </motion.div>
              );
            },
          )}
        </div>

        {/* 2. Statistika Bandi (Rasmda yopishib qolgan qism tuzatildi) */}
        <AnimatedSection direction="up">
          <div className="bg-[#0f172a] rounded-[3.5rem] p-12 md:p-24 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 relative z-10">
              {t("research.stats.list", { returnObjects: true }).map((stat) => (
                <div key={stat.l} className="text-center group">
                  <div className="text-[#3de082] font-black text-6xl md:text-8xl mb-4 flex items-center justify-center gap-1">
                    <CountUp value={stat.v} duration={2500} />
                    <span className="text-2xl md:text-4xl opacity-20 text-white font-bold">
                      +
                    </span>
                  </div>
                  <p className="text-white font-black text-lg md:text-2xl tracking-widest mb-2">
                    {stat.l}
                  </p>
                  <p className="text-slate-500 text-xs md:text-sm font-bold tracking-[0.2em]">
                    {stat.s}
                  </p>
                </div>
              ))}
            </div>
            {/* Background Glow */}
            <div className="absolute top-[-20%] right-[-10%] w-[30rem] h-[30rem] bg-blue-500/10 blur-[120px] rounded-full" />
          </div>
        </AnimatedSection>

        {/* 3. Laboratoriyalar Seksiyasi */}
        <div className="mt-40">
          <div className="flex flex-col items-center text-center mb-20">
            <SectionLabel className="text-[#3de082] tracking-[0.3em] text-xs font-black">
              {t("research.labs.sectionLabel")}
            </SectionLabel>
            <h2 className="mt-6 text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">
              {t("research.labs.title")}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {t("research.labs.list", { returnObjects: true }).map(
              (lab, index) => (
                <motion.div
                  key={lab.name}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-[3rem] p-10 md:p-12 border border-slate-100 shadow-sm flex flex-col hover:border-[#892be2]/40 transition-all duration-500 group"
                >
                  <div className="text-5xl md:text-6xl mb-10 group-hover:scale-110 transition-transform duration-500">
                    {["🖥️", "🔐", "💡", "⚡", "📡", "🤖"][index]}
                  </div>
                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[#892be2] transition-colors">
                    {lab.name}
                  </h4>
                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed flex-grow font-medium">
                    {lab.desc}
                  </p>
                </motion.div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
