import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
// Rasmlarni import qilish
import { image1, image2, image3, image4 } from "../../assets";

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const timelineItem = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function About() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-white">
      <PageHero
        crumb={t("about.hero.crumb")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* --- YANGI: ILG'OR MUHANDISLIK MAKTABI OCHILISH MAROSIMI CARDI --- */}
        <AnimatedSection>
          <div className="bg-[var(--bg-light-section)] rounded-[48px] p-10 md:p-16 border-4 border-[var(--color-secondary)] shadow-2xl mb-32 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-center">
              {/* Rasmlar Gridi - YIRIK VA KATTA */}
              <div className="grid grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group"
                >
                  <img
                    src={image1}
                    alt={`Muhandislik maktabi ${image1 + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group"
                >
                  <img
                    src={image2}
                    alt={`Muhandislik maktabi ${image1 + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group"
                >
                  <img
                    src={image3}
                    alt={`Muhandislik maktabi ${image1 + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="aspect-square rounded-[32px] overflow-hidden shadow-2xl border-4 border-white relative group"
                >
                  <img
                    src={image4}
                    alt={`Muhandislik maktabi ${image1 + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              </div>

              {/* Matn qismi */}
              <div className="space-y-8">
                <div className="space-y-6 text-xl md:text-2xl text-[var(--text-gray)] font-medium leading-relaxed">
                  <p>
                    2024-yil 13-iyul kuni Muhammad al-Xorazmiy nomidagi Toshkent
                    axborot texnologiyalari universitetida Ilgʻor muhandislik
                    maktabining ochilish marosimi boʻlib oʻtdi. Tadbirda
                    Prezident Administratsiyasi Ijtimoiy rivojlanish
                    departamenti rahbari Odil Abdurahmonov, Oliy taʼlim, fan va
                    innovatsiyalar vaziri Qoʻngʻirotboy Sharipov ishtirok etdi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
        {/* --- 1. MVV Cards (Missiya, Vizyon, Qadriyatlar) --- */}
        <motion.div
          key={i18n.language}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32"
        >
          {t("about.mvv", { returnObjects: true }).map((c) => (
            <motion.div
              key={c.title}
              variants={fadeUp}
              whileHover={{ y: -15 }}
              className="bg-[var(--bg-light-section)] rounded-[48px] p-10 md:p-16 border-4 border-[var(--color-secondary)] shadow-2xl mb-32 overflow-hidden relative"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-[var(--color-secondary)] opacity-10" />
              <div className="text-6xl mb-8">{c.icon}</div>
              <h3 className="text-3xl font-black text-[var(--text-dark)] mb-5 tracking-tight">
                {c.title}
              </h3>
              <p className="text-[var(--text-gray)] text-2xl leading-relaxed font-medium">
                {c.text}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* --- 2. Timeline (Xronologiya) --- */}
        <div className="space-y-6 mb-16 text-center md:text-left">
          <div className="uppercase tracking-[0.3em] text-sm font-black text-[var(--color-secondary)]">
            {t("about.timeline.sectionLabel")}
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[var(--text-dark)] tracking-tighter">
            {t("about.timeline.title")}
          </h2>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative pl-12 md:pl-20 mt-20"
        >
          {/* Vertical line - Binafsha gradient */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            viewport={{ once: true }}
            style={{ originY: 0 }}
            className="absolute left-4 md:left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--color-secondary)] via-slate-200 to-transparent"
          />

          {t("about.timeline.events", { returnObjects: true }).map(
            ({ year, event }, i, arr) => (
              <motion.div
                key={year}
                variants={timelineItem}
                className="flex flex-col md:flex-row gap-4 md:gap-16 mb-16 items-start relative"
              >
                {/* Dot - Yalpiz yoki Binafsha */}
                <motion.div
                  className={`absolute -left-[42px] md:-left-[58px] w-8 h-8 rounded-full border-[6px] border-white shadow-lg z-10 ${
                    i === arr.length - 1
                      ? "bg-[var(--color-primary)] scale-125"
                      : "bg-[var(--color-secondary)]"
                  }`}
                />

                <span
                  className={`text-3xl font-black tracking-tighter min-w-[120px] ${
                    i === arr.length - 1
                      ? "text-[var(--color-primary)]"
                      : "text-slate-400"
                  }`}
                >
                  {year}
                </span>

                <p className="text-2xl font-bold text-[var(--text-dark)] mt-1 leading-snug max-w-4xl">
                  {event}
                </p>
              </motion.div>
            ),
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default About;
