import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";
import CountUp from "../../components/ui/CountUp";
import AnimatedSection from "../../components/ui/AnimatedSection";
import {
  GraduationCap,
  Users,
  Microscope,
  Briefcase,
  Globe,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import request from "../../api";
import { useEffect } from "react";
import { useState } from "react";

const PARTNERS = [
  "Uzbektelecom",
  "IT Park Uzbekistan",
  "Samsung R&D",
  "Huawei Central Asia",
  "Cisco Academy",
  "Microsoft Imagine",
  "Google Developer Groups",
  "EPAM Systems",
];
const ICON_MAP = {
  users: GraduationCap,
  books: Users,
  award: Microscope,
  globe: Briefcase,
};
const cardStyles = [
  "bg-[#0a1628]",
  "bg-blue-700",
  "bg-amber-500",
  "bg-emerald-600",
];

const NEWS_META = [
  { id: 1, icon: "🔬", cat_key: "Tadqiqot" },
  { id: 2, icon: "🤝", cat_key: "Hamkorlik" },
  { id: 3, icon: "🏆", cat_key: "Yutuq" },
  { id: 4, icon: "📅", cat_key: "Tadbir" },
];

// ── Stagger container
const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

// ── Fade up — faqat Y o'qi, X yo'q (horizontal scroll sababi bo'lmaydi)
const fadeUpItem = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Hero right cards uchun — x animatsiyasi faqat lg+ da ishlaydi,
//    lekin overflow-hidden bilan o'ralgan bo'lgani uchun scroll chiqmaydi
const heroCardLeft = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};
const heroCardRight = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

function Home() {
  const { t, i18n } = useTranslation();
  const [latestPrograms, setLatestPrograms] = useState([]);
  const [facultyPreview, setFacultyPreview] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getPrograms = async () => {
      try {
        // setLoading(true); // Olib tashlandi
        const res = await request.get(
          "/academic_programs?select=*&order=id.desc&limit=3",
        );
        setLatestPrograms(res.data);
      } catch (err) {
        console.error("Home Programs Error:", err);
      }
    };
    getPrograms();
  }, []);

  const getTagsArray = (tagsData) => {
    if (!tagsData) return [];
    if (Array.isArray(tagsData)) return tagsData;
    return typeof tagsData === "string"
      ? tagsData.split(",").filter(Boolean)
      : [];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setLoading(true); // Olib tashlandi
        const newsRes = await request.get(
          "/news?select=*&order=created_at.desc&limit=3",
        );
        setNews(newsRes.data || []);
      } catch (error) {
        console.error("Data fetching error:", error);
      }
    };

    fetchData();
  }, []);

  const extractVideoId = (url) => {
    if (!url) return null;
    const match = url.match(/embed\/([^?&]+)/) || url.match(/v=([^?&]+)/);
    return match ? match[1] : null;
  };

  const getField = (obj, fieldName) => {
    const currentLang = i18n.language;
    return obj[`${fieldName}_${currentLang}`] || obj[`${fieldName}_uz`] || "";
  };

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const { data } = await request.get("/faculty?select=*&limit=3");
        setFacultyPreview(data);
      } catch (err) {
        console.error("Home faculty fetch error:", err);
      }
    };
    fetchPreview();
  }, []);

  return (
    // ⬇️ overflow-x-hidden — butun sahifada gorizontal scroll yo'q
    <div className="overflow-x-hidden">
      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[#0a1628] flex items-center overflow-hidden">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Animated gradient blobs — position:absolute, overflow:hidden section ichida */}
        <motion.div
          className="absolute -right-24 top-[20%] w-[600px] h-[600px] bg-amber-500/[0.07] rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.07, 0.1, 0.07] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-36 bottom-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.06, 1], opacity: [0.1, 0.14, 0.1] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* ── Left ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* Badge */}
              <motion.div variants={fadeUpItem}>
                <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[11px] font-black tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-8">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {t("home.hero.badge")}
                </div>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={fadeUpItem}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {t("home.hero.title1")}
                <br />
                <span className="text-amber-400"> {t("home.hero.title2")}</span>
                <br />
                {t("home.hero.title3")}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUpItem}
                className="text-white/65 text-lg leading-relaxed max-w-lg mb-10"
              >
                {t("home.hero.subtitle")}
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUpItem}
                className="flex flex-wrap gap-4 mb-14"
              >
                <Link
                  to={"admissions"}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base px-9 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative">{t("home.hero.applyBtn")}</span>
                </Link>
                <Link
                  to={"programs"}
                  className="bg-white/10 hover:bg-white/18 border border-white/25 text-white font-semibold text-base px-9 py-4 rounded-xl transition-all"
                >
                  {t("home.hero.programsBtn")}
                </Link>
              </motion.div>

              {/* Stats mini */}
              <motion.div
                variants={fadeUpItem}
                className="flex flex-wrap gap-10 pt-8 border-t border-white/10"
              >
                {t("home.stats", { returnObjects: true })
                  .slice(0, 3)
                  .map((s) => (
                    <div key={s.label}>
                      <p className="text-amber-400 text-3xl font-black leading-none">
                        <CountUp value={s.value} duration={2200} />
                      </p>
                      <p className="text-white/45 text-xs mt-1.5 tracking-wide">
                        {s.label}
                      </p>
                    </div>
                  ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Float-in cards — faqat lg+ da ko'rinadi ── */}
            <div className="relative hidden lg:block h-[480px]">
              {/* Featured program card — x o'rniga y animatsiya */}
              <motion.div
                {...heroCardRight}
                animate={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.7,
                  delay: 0.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-0 top-8 w-80 bg-white/[0.07] border border-white/12 rounded-2xl p-7 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-white/45 text-[10px] tracking-[0.12em] uppercase mb-1">
                      {t("home.hero.floatingCard.label")}
                    </p>
                    <h3 className="text-white font-extrabold text-lg leading-snug">
                      {t("home.hero.floatingCard.title")}
                    </h3>
                  </div>
                  <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest">
                    HOT
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap mb-5">
                  {t("home.hero.floatingCard.tags", {
                    returnObjects: true,
                  }).map((tag) => (
                    <span
                      key={tag}
                      className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 grid grid-cols-3 text-center gap-3">
                  {[
                    [
                      t("home.hero.floatingCard.duration"),
                      t("home.hero.floatingCard.durationLabel"),
                    ],
                    [
                      t("home.hero.floatingCard.seats"),
                      t("home.hero.floatingCard.seatsLabel"),
                    ],
                    [
                      t("home.hero.floatingCard.intake"),
                      t("home.hero.floatingCard.intakeLabel"),
                    ],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="text-white font-black text-xl leading-none">
                        {v}
                      </p>
                      <p className="text-white/40 text-[10px] mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Event card — x o'rniga y animatsiya */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  delay: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute left-0 top-44 w-56 bg-blue-700/90 border border-white/15 rounded-2xl p-5"
              >
                <p className="text-white/50 text-[10px] tracking-widest uppercase mb-2">
                  {t("home.hero.eventCard.label")}
                </p>
                <h4 className="text-white font-extrabold text-sm leading-snug mb-3">
                  {t("home.hero.eventCard.title")}
                </h4>
                <p className="text-amber-400 text-sm font-bold">
                  {t("home.hero.eventCard.date")}
                </p>
              </motion.div>

              {/* Ranking badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: 0.9,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="absolute right-5 bottom-16 bg-amber-500 rounded-2xl p-5 text-center shadow-2xl shadow-amber-500/40"
              >
                <p className="text-white font-black text-4xl leading-none">
                  {t("home.hero.rankBadge.rank")}
                </p>
                <p className="text-white/80 text-xs font-bold mt-1">
                  {t("home.hero.rankBadge.region")}
                </p>
                <p className="text-white/55 text-[10px] mt-0.5">
                  {t("home.hero.rankBadge.label")}
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs"
        >
          <span>{t("home.hero.scrollDown")}</span>
          <motion.div
            className="w-px h-8 bg-white/20"
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}
      <AnimatedSection direction="up">
        <section className="bg-amber-500">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
            {t("home.stats", { returnObjects: true }).map((s) => {
              const Icon = ICON_MAP[s.icon] || Globe;
              return (
                <div
                  key={s.label}
                  className="py-8 px-6 flex flex-col items-center justify-center text-center"
                >
                  <div className="bg-white/10 p-3 rounded-xl mb-3 text-white">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>
                  <p className="text-white font-black text-3xl md:text-4xl leading-none">
                    <CountUp value={s.value} duration={2000} />
                  </p>
                  <p className="text-white/80 text-sm md:text-base mt-2 font-medium tracking-wide">
                    {s.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </AnimatedSection>

      {/* ══════════════════════════════════════════
          ABOUT PREVIEW
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* direction="left" → translateX ishlatadi, shuning uchun
              AnimatedSection ichida overflow:hidden bo'lishi kerak —
              bu yerda wrapper bilan o'raymiz */}
          <div className="overflow-hidden">
            <AnimatedSection direction="left">
              <div>
                <SectionLabel>{t("home.about.sectionLabel")}</SectionLabel>
                <SectionTitle>{t("home.about.title")}</SectionTitle>
                <SectionSubtitle>{t("home.about.subtitle")}</SectionSubtitle>
                <ul className="mt-7 space-y-5 mb-9">
                  {t("home.about.points", { returnObjects: true }).map(
                    (item) => (
                      <li key={item.t} className="flex gap-4 items-start">
                        <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <div>
                          <p className="font-extrabold text-slate-900 text-[15px] mb-0.5">
                            {item.title}
                          </p>
                          <p className="text-slate-500 text-sm leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ),
                  )}
                </ul>
                <Link
                  to={"about"}
                  className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors shadow-lg"
                >
                  {t("home.about.readMoreBtn")}
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="overflow-hidden">
            <AnimatedSection direction="right" delay={0.1}>
              <div className="grid grid-cols-2 gap-4">
                {t("home.about.cards", { returnObjects: true }).map(
                  (c, index) => (
                    <motion.div
                      key={c.label}
                      whileHover={{ scale: 1.03, y: -4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`${cardStyles[index]} text-white rounded-2xl p-7 cursor-default`}
                    >
                      <p className="text-white/55 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">
                        {c.label}
                      </p>
                      <p className="font-black text-4xl leading-none">
                        {c.value}
                      </p>
                      <p className="text-white/65 text-sm mt-2">{c.sub}</p>
                    </motion.div>
                  ),
                )}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
    PROGRAMS SECTION
══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionLabel>{t("home.programs.sectionLabel")}</SectionLabel>
              <SectionTitle>{t("home.programs.title")}</SectionTitle>
              <SectionSubtitle>{t("home.programs.subtitle")}</SectionSubtitle>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12"
          >
            {latestPrograms.map((prog) => {
              // Har bir dastur uchun bazadan rang kelmasa, standart ko'k rang ishlatiladi
              const accentColor = prog.bg_color || "#3b82f6";

              // Tilga mos nom va tavsifni tanlash
              const currentName = prog[`name_${i18n.language}`] || prog.name_uz;
              const currentDesc = prog[`desc_${i18n.language}`] || prog.desc_uz;

              return (
                <motion.div key={prog.id} variants={fadeUpItem}>
                  <Link
                    to={`/programs/${prog.id}`}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-transparent block"
                  >
                    {/* Dekorativ chiziqlar */}
                    <div
                      className="h-1.5 w-full"
                      style={{ background: `${accentColor}20` }} // 20% shaffoflik
                    />
                    <div
                      className="h-1.5 w-full -mt-1.5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                      style={{ background: accentColor }}
                    />

                    <div className="p-8">
                      <div className="flex justify-between items-start mb-6">
                        {/* Icon qismi */}
                        <div
                          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl group-hover:rotate-6 transition-transform duration-300 shadow-sm border border-slate-50"
                          style={{
                            background: `${accentColor}10`,
                            color: accentColor,
                          }}
                        >
                          {prog.icon_url || "🎓"}
                        </div>

                        {/* Kategoriya bage-i */}
                        <span
                          className="text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest uppercase"
                          style={{
                            background: `${accentColor}15`,
                            color: accentColor,
                          }}
                        >
                          {prog.category_short || "DEGREE"}
                        </span>
                      </div>

                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
                        {currentName}
                      </h3>

                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {currentDesc}
                      </p>

                      {/* Teglar (Tags) */}
                      <div className="flex flex-wrap gap-2 mb-8 min-h-[32px]">
                        {getTagsArray(prog.tags).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-bold px-3 py-1 rounded-full border"
                            style={{
                              borderColor: `${accentColor}30`,
                              background: `${accentColor}05`,
                              color: accentColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Pastki ma'lumotlar paneli */}
                      <div className="flex justify-between items-center pt-5 border-t border-slate-100">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            Daraja
                          </span>
                          <span className="text-sm font-bold text-slate-700">
                            {prog.level || "Bakalavr"}
                          </span>
                        </div>
                        <div className="flex flex-col text-right">
                          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            Davomiyligi
                          </span>
                          <span className="text-sm font-bold text-slate-700">
                            {prog.duration || "4 yil"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Barcha dasturlarni ko'rish tugmasi */}
          <AnimatedSection delay={0.2}>
            <div className="text-center">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 border-2 border-[#0a1628] text-[#0a1628] hover:bg-[#0a1628] hover:text-white font-bold text-base px-12 py-4 rounded-xl transition-all duration-300 group"
              >
                {t("home.programs.viewAllBtn")}
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWS + EVENTS
      ══════════════════════════════════════════ */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-16">
          {/* ————— YANGILIKLAR (DINAMIK, LOADINGSIZ) ————— */}
          <div className="overflow-hidden">
            <AnimatedSection direction="left">
              <div>
                <SectionLabel>{t("home.news.sectionLabel")}</SectionLabel>
                <SectionTitle>{t("home.news.title")}</SectionTitle>

                <div className="mt-8 space-y-5">
                  {news.map((item) => {
                    const meta = NEWS_META[item.cat_key] || {
                      icon: "📰",
                      color: "bg-slate-100 text-slate-600",
                    };
                    const title =
                      item[`title_${i18n.language}`] || item.title_uz;
                    const excerpt =
                      item[`excerpt_${i18n.language}`] || item.excerpt_uz;
                    const category =
                      item[`cat_${i18n.language}`] || item.cat_uz;

                    return (
                      <Link
                        to={`/news/${item.id}`}
                        key={item.id}
                        className="flex gap-4 sm:gap-5 p-4 sm:p-5 rounded-2xl border border-slate-200 group hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="w-20 sm:w-24 shrink-0 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center text-3xl aspect-video sm:h-20">
                          {item.embed_url ? (
                            <img
                              src={`https://img.youtube.com/vi/${extractVideoId(item.embed_url)}/mqdefault.jpg`}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <span className="opacity-30">{meta.icon}</span>
                          )}
                        </div>

                        <div className="min-w-0 flex flex-col justify-center">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span
                              className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide ${meta.color}`}
                            >
                              {category}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {item.date_label}
                            </span>
                          </div>
                          <h4 className="text-[14px] sm:text-[15px] font-extrabold text-slate-900 mb-1 leading-snug group-hover:text-blue-700 line-clamp-2">
                            {title}
                          </h4>
                          <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2 hidden sm:block">
                            {excerpt}
                          </p>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <Link
                    to="/news"
                    className="inline-block border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all"
                  >
                    {t("home.news.viewAllBtn")}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* ————— TADBIRLAR (STATIK) ————— */}
          <div className="overflow-hidden">
            <AnimatedSection direction="right" delay={0.15}>
              <div>
                <SectionLabel>{t("home.events.sectionLabel")}</SectionLabel>
                <SectionTitle>{t("home.events.title")}</SectionTitle>

                <div className="mt-8 space-y-3">
                  {t("home.events.list", { returnObjects: true }).map(
                    (ev, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 4 }}
                        className="flex gap-3 sm:gap-4 items-center p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer group"
                      >
                        <div className="bg-[#0a1628] text-white rounded-xl px-3 py-2 text-center shrink-0 min-w-14">
                          <p className="font-black text-lg leading-none">
                            {ev.date.split(" ")[1]}
                          </p>
                          <p className="text-white/50 text-[10px] uppercase mt-0.5">
                            {ev.date.split(" ")[0]}
                          </p>
                        </div>
                        <div className="min-w-0">
                          <p className="text-[13px] sm:text-[14px] font-extrabold text-slate-900 leading-snug group-hover:text-blue-700 line-clamp-2">
                            {ev.title}
                          </p>
                          <p className="text-amber-600 text-[11px] font-bold mt-1">
                            {ev.type}
                          </p>
                        </div>
                      </motion.div>
                    ),
                  )}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACULTY PREVIEW
      ══════════════════════════════════════════ */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <SectionLabel>{t("home.faculty.sectionLabel")}</SectionLabel>
              <SectionTitle>{t("home.faculty.title")}</SectionTitle>
              <SectionSubtitle>{t("home.faculty.subtitle")}</SectionSubtitle>
            </div>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          >
            {facultyPreview.map((m) => (
              <motion.div key={m.id} variants={fadeUpItem}>
                <Link
                  to={"/faculty"}
                  className="bg-white rounded-2xl p-8 border border-slate-200 text-center cursor-pointer group hover:-translate-y-2 hover:shadow-xl transition-all duration-300 block relative overflow-hidden"
                >
                  {/* Accent top line */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-0.5 ${m.avatar_cls} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                  />

                  {/* Avatar / Initials */}
                  <div
                    className={`w-16 h-16 ${m.avatar_cls} rounded-full flex items-center justify-center text-white text-xl font-black mx-auto mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg overflow-hidden`}
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

                  <h4 className="text-[16px] font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                    {getField(m, "name")}
                  </h4>

                  <p className="text-blue-700 font-bold text-[13px] mb-1">
                    {getField(m, "role")}
                  </p>

                  <p className="text-slate-400 text-[12px] mb-4">
                    {getField(m, "dept")}
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3 text-[13px] text-slate-600 mb-3 line-clamp-2 min-h-[50px]">
                    {getField(m, "research")}
                  </div>

                  <p className="text-slate-400 text-xs">
                    📄 {m.pubs} {t("home.faculty.pubsLabel")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection delay={0.2}>
            <div className="text-center">
              <Link
                to={"/faculty"}
                className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-colors shadow-lg"
              >
                {t("home.faculty.viewAllBtn")}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════════ */}
      <section className="bg-[#0a1628] py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-16">
              <span className="inline-block px-4 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase bg-amber-500/10 rounded-full border border-amber-500/20">
                {t("home.partners.sectionLabel")}
              </span>
              <h3 className="text-white font-extrabold text-3xl md:text-4xl">
                {t("home.partners.title")}
              </h3>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {PARTNERS.map((p) => (
              <motion.div
                key={p}
                variants={fadeUpItem}
                whileHover={{
                  scale: 1.03,
                  borderColor: "rgba(245,158,11,0.4)",
                }}
                className="relative bg-white/3 border border-white/5 p-6 rounded-2xl transition-colors duration-300 flex items-center justify-center text-center group"
              >
                <span className="text-white/60 group-hover:text-amber-100 font-medium tracking-wide transition-colors">
                  {p}
                </span>
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <AnimatedSection direction="up">
        <section className="relative bg-gradient-to-br from-blue-700 to-blue-900 py-24 overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/3 rounded-full pointer-events-none" />
          <div className="absolute -left-14 -bottom-14 w-64 h-64 bg-white/3 rounded-full pointer-events-none" />
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <h2
              className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("home.cta.title")}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to={"admissions"}
                className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-base px-10 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                <span className="relative">{t("home.cta.applyBtn")}</span>
              </Link>
              <Link
                to={"contact"}
                className="bg-white/12 hover:bg-white/20 border border-white/30 text-white font-bold text-base px-10 py-4 rounded-xl transition-all"
              >
                {t("home.cta.visitBtn")}
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}

export default Home;
