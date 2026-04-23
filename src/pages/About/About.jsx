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
  const { t, i18n } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("about.hero.crumb")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* 1. MVV Cards — Missiya, Vizyon va Qadriyatlar */}
          <motion.div
            key={i18n.language}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-28"
          >
            {t("about.mvv", { returnObjects: true }).map((c) => (
              <motion.div
                key={c.title}
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="bg-slate-50 rounded-[2rem] p-10 border border-slate-200 cursor-default"
              >
                <motion.div
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileInView={{ scale: 1.1, opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-5xl mb-7 inline-block"
                >
                  {c.icon}
                </motion.div>

                {/* Sarlavha: Yanada qalin va yirikroq */}
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">
                  {c.title}
                </h3>

                {/* Matn: O'qishga juda qulay o'lchamda */}
                <p className="text-slate-600 text-lg leading-relaxed font-medium">
                  {c.text}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* 2. Timeline — Xronologiya qismi */}
          <div className="space-y-4 mb-12">
            <div className="uppercase tracking-[0.25em] text-sm font-bold text-blue-600 opacity-80">
              {t("about.timeline.sectionLabel")}
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
              {t("about.timeline.title")}
            </h2>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="relative pl-12 mt-16"
          >
            {/* Vertical line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 1.5, ease: "circOut" }}
              viewport={{ once: true }}
              style={{ originY: 0 }}
              className="absolute left-4 top-0 bottom-0 w-[3px] bg-gradient-to-b from-slate-200 via-slate-200 to-transparent"
            />

            {t("about.timeline.events", { returnObjects: true }).map(
              ({ year, event }, i) => (
                <motion.div
                  key={year}
                  variants={timelineItem}
                  className="flex flex-col md:flex-row gap-2 md:gap-10 mb-12 items-start relative"
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.08,
                      type: "spring",
                      stiffness: 400,
                    }}
                    viewport={{ once: true }}
                    className={`absolute -left-[41px] w-6 h-6 rounded-full border-[5px] border-white shadow-md z-10 ${
                      i === 7
                        ? "bg-amber-500 scale-125 shadow-amber-200"
                        : "bg-slate-900"
                    }`}
                  />

                  {/* Yil: Katta va ko'zga tashlanadigan */}
                  <span
                    className={`text-2xl font-black tracking-tighter min-w-[100px] ${
                      i === 7 ? "text-amber-500" : "text-slate-400"
                    }`}
                  >
                    {year}
                  </span>

                  {/* Voqea matni: Qalinroq va yirikroq shrift */}
                  <p className="text-xl font-bold text-slate-800 mt-1 leading-snug max-w-3xl">
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
