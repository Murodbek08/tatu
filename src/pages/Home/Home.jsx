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
import {request} from "../../api";
import { useEffect } from "react";
import { useState } from "react";
import { aboutImage, heroImage } from "../../assets";

const ICON_MAP = {
  users: GraduationCap,
  books: Users,
  award: Microscope,
  globe: Briefcase,
};

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

  const social_image = [
    "https://static.tuit.uz/uploads/1/ya02NIlKA49EdnSw4huY3Wz0jPl4eaNq.png",
    "https://static.tuit.uz/uploads/1/s0_W7X8zIoomi4jEDKnKXgzYbhoD_STK.png",
    "https://static.tuit.uz/uploads/1/mMhqxaKipg1IICdGsT_qL-2TQxvfWISR.png",
    "https://static.tuit.uz/uploads/1/lE8f-O4ORLRlsk4MHs169AudPgUfCCYN.png",
    "https://static.tuit.uz/uploads/1/kPI89m2E075vJjw2s602EcmQ8vX3fRu6.png",
    "https://static.tuit.uz/uploads/1/YLwEFVIbrC-jYdNHACMHb58fzSdrzSMP.png",
    "https://static.tuit.uz/uploads/1/OISj7D-2dek65inIiuNgmII5bYfZUMbV.jpg",
    "https://static.tuit.uz/uploads/1/uU_hlO5eknGUh3Qntb0lDQXe2OZFVlEQ.png",
  ];

  return (
    // ⬇️ overflow-x-hidden — butun sahifada gorizontal scroll yo'q
    <div className="overflow-x-hidden">
      {/* ══════════════════════════════════════════
        HERO
══════════════════════════════════════════ */}
      <section className="relative min-h-screen bg-[var(--bg-light-section)] flex items-center overflow-hidden">
        {/* Background grid - Och fondagi och binafsha katakchalar */}
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "linear-gradient(rgba(137, 43, 226, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(137, 43, 226, 0.08) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Animated gradient blobs - Binafsha va Yalpiz ranglarda */}
        <motion.div
          className="absolute -right-24 top-[20%] w-[600px] h-[600px] bg-[var(--color-secondary)]/10 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -left-36 bottom-0 w-[500px] h-[500px] bg-[var(--color-primary)]/15 rounded-full blur-3xl pointer-events-none"
          animate={{ scale: [1, 1.06, 1], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* ── Left: Matnlar va Tugmalar ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {/* H1 */}
              <motion.h1
                variants={fadeUpItem}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-dark)] leading-[1.05] mb-7"
                style={{ fontFamily: "sans-serif" }} // School 21 odatda sans-serif ishlatadi, xohlasangiz Georgia'ni qoldirishingiz mumkin
              >
                {t("home.hero.title1")}
                <br />
                {/* Urg'u berilgan so'z binafsha rangda */}
                <span className="text-[var(--color-secondary)]">
                  {" "}
                  {t("home.hero.title2")}
                </span>
                <br />
                {t("home.hero.title3")}
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                variants={fadeUpItem}
                className="text-[var(--text-gray)] text-2xl font-medium leading-relaxed max-w-lg mb-10"
              >
                {t("home.hero.subtitle")}
              </motion.p>

              {/* Buttons */}
              <motion.div
                variants={fadeUpItem}
                className="flex flex-wrap gap-4 mb-14"
              >
                {/* Asosiy yalpiz rangli tugma */}
                <Link
                  to={"admissions"}
                  className="bg-[var(--color-primary)] hover:brightness-95 active:scale-95 text-[var(--bg-dark-section)] font-bold text-base px-9 py-4 rounded-xl transition-all shadow-xl shadow-[var(--color-primary)]/20 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  <span className="relative">{t("home.hero.applyBtn")}</span>
                </Link>

                {/* Ikkinchi darajali tugma */}
                <Link
                  to={"programs"}
                  className="bg-transparent hover:bg-[var(--color-secondary)]/5 border-2 border-[var(--color-secondary)] text-[var(--color-secondary)] font-bold text-base px-9 py-4 rounded-xl transition-all"
                >
                  {t("home.hero.programsBtn")}
                </Link>
              </motion.div>

              {/* Stats mini */}
              <motion.div
                variants={fadeUpItem}
                className="flex flex-wrap gap-10 pt-8 border-t border-black/10"
              >
                {t("home.stats", { returnObjects: true })
                  .slice(0, 3)
                  .map((s) => (
                    <div key={s.label}>
                      {/* Raqamlar yalpiz yoki binafsha rangda */}
                      <p className="text-[var(--color-secondary)] text-4xl font-black leading-none">
                        <CountUp value={s.value} duration={2200} />
                      </p>
                      <p className="text-[var(--text-gray)] font-medium text-xs mt-2 tracking-wide uppercase">
                        {s.label}
                      </p>
                    </div>
                  ))}
              </motion.div>
            </motion.div>

            {/* ── Right: Rasm uchun joy ── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="relative hidden lg:block h-[500px] w-full rounded-[32px] overflow-hidden shadow-2xl shadow-black/5"
            >
              {/* Rasm URL manzilini shu yerdagi 'src' ga qo'yasiz */}
              <img
                src={heroImage}
                alt="Hero background"
                className="w-full rounded-[32px] h-full object-cover hover:scale-105  transition-transform duration-700 border-6 border-[var(--color-secondary)]"
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--text-gray)] text-xs font-bold uppercase tracking-widest"
        >
          <span>{t("home.hero.scrollDown")}</span>
          <motion.div
            className="w-px h-8 bg-[var(--text-gray)]/40"
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAND
      ══════════════════════════════════════════ */}

      <AnimatedSection direction="up">
        <section className="bg-[var(--color-primary)]">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-[var(--bg-dark-section)]/10">
            {t("home.stats", { returnObjects: true }).map((s) => {
              const Icon = ICON_MAP[s.icon] || Globe;
              return (
                <div
                  key={s.label}
                  className="py-8 px-6 flex flex-col items-center justify-center text-center"
                >
                  {/* Ikonka orqa foni va rangi to'q qorong'i rangga moslashtirildi */}
                  <div className="bg-[var(--bg-dark-section)]/10 p-3 rounded-xl mb-3 text-[var(--bg-dark-section)]">
                    <Icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Raqamlar rangi */}
                  <p className="text-[var(--bg-dark-section)] font-black text-3xl md:text-4xl leading-none">
                    <CountUp value={s.value} duration={2000} />
                  </p>

                  {/* Ostki matn (label) rangi */}
                  <p className="text-[var(--bg-dark-section)]/80 text-sm md:text-base mt-2 font-medium tracking-wide">
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
      <section className="bg-[var(--bg-light-section)] py-24">
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

                <ul className="mt-8 space-y-6 mb-10">
                  {t("home.about.points", { returnObjects: true }).map(
                    (item) => (
                      <li key={item.title} className="flex gap-5 items-start">
                        {/* Amber nuqta yalpiz rangga almashtirildi va biroz kattalashtirildi */}
                        <span className="w-3 h-3 rounded-full bg-[var(--color-primary)] mt-2 shrink-0" />
                        <div>
                          {/* Matnlar text-lg (18px) ga oshirildi */}
                          <p className="font-extrabold text-[var(--text-dark)] text-lg mb-1">
                            {item.title}
                          </p>
                          {/* Izoh matni text-base (16px) ga oshirildi */}
                          <p className="text-[var(--text-gray)] text-base leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </li>
                    ),
                  )}
                </ul>

                {/* Tugma Yalpiz rangiga o'tkazildi va matni kattalashtirildi */}
                <Link
                  to={"about"}
                  className="bg-[var(--color-primary)] hover:brightness-95 active:scale-95 text-[var(--bg-dark-section)] font-bold text-base px-10 py-4 rounded-xl transition-all shadow-lg inline-block"
                >
                  {t("home.about.readMoreBtn")}
                </Link>
              </div>
            </AnimatedSection>
          </div>

          <div className="overflow-hidden">
            <AnimatedSection direction="right" delay={0.1}>
              {/* Rasm qolipi: to'liq to'rtburchak va buzilmasligi uchun */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border-6 border-[var(--color-secondary)]"
              >
                <img
                  src={aboutImage}
                  alt="Tatu Engineering School Kampus"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
      PROGRAMS SECTION
       ══════════════════════════════════════════ */}
      <section className="bg-[var(--bg-light-section)] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <SectionLabel>{t("home.programs.sectionLabel")}</SectionLabel>
              <SectionSubtitle>{t("home.programs.subtitle")}</SectionSubtitle>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            // Kartochkalar orasidagi masofa gap-8 ga oshirildi
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16"
          >
            {latestPrograms.map((prog) => {
              // Standart rang School 21 binafsharangiga o'zgartirildi
              const accentColor = prog.bg_color || "var(--color-secondary)";

              // Tilga mos nom va tavsifni tanlash
              const currentName = prog[`name_${i18n.language}`] || prog.name_uz;
              const currentDesc = prog[`desc_${i18n.language}`] || prog.desc_uz;

              return (
                <motion.div key={prog.id} variants={fadeUpItem}>
                  <Link
                    to={`/programs/${prog.id}`}
                    className="bg-white rounded-[32px] overflow-hidden cursor-pointer group transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl block border-[6px] border-solid"
                    style={{
                      // Bu yerda borderColor aniq ishlaydi
                      borderColor: accentColor
                        ? `color-mix(in srgb, ${accentColor} 20%, transparent)`
                        : "#e2e8f0",
                    }}
                  >
                    {/* Dekorativ chiziqlar */}
                    <div
                      className="h-2 w-full"
                      style={{
                        background: `color-mix(in srgb, ${accentColor} 20%, transparent)`,
                      }} // CSS o'zgaruvchilar bilan ishlash uchun
                    />
                    <div
                      className="h-2 w-full -mt-2 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
                      style={{ background: accentColor }}
                    />

                    {/* Ichki bo'shliqlar p-10 ga oshirildi */}
                    <div className="p-10">
                      <div className="flex justify-between items-start mb-8">
                        {/* Icon qismi kattalashtirildi (w-20 h-20, text-5xl) */}
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl group-hover:rotate-6 transition-transform duration-300 shadow-sm border border-slate-50"
                          style={{
                            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
                            color: accentColor,
                          }}
                        >
                          {prog.icon_url || "🎓"}
                        </div>

                        {/* Kategoriya badge-i kattalashtirildi (text-xs) */}
                        <span
                          className="text-xs font-black px-4 py-2 rounded-xl tracking-widest uppercase"
                          style={{
                            background: `color-mix(in srgb, ${accentColor} 15%, transparent)`,
                            color: accentColor,
                          }}
                        >
                          {prog.category_short || "DEGREE"}
                        </span>
                      </div>

                      {/* Sarlavha text-3xl ga kattalashtirildi */}
                      <h3 className="text-3xl font-black text-[var(--text-dark)] mb-4 leading-tight group-hover:text-[var(--color-secondary)] transition-colors">
                        {currentName}
                      </h3>

                      {/* Matn text-lg ga kattalashtirildi */}
                      <p className="text-[var(--text-gray)] text-lg leading-relaxed mb-8 line-clamp-3">
                        {currentDesc}
                      </p>

                      {/* Teglar (Tags) text-sm ga kattalashtirildi */}
                      <div className="flex flex-wrap gap-3 mb-10 min-h-[40px]">
                        {getTagsArray(prog.tags).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-sm font-bold px-4 py-1.5 rounded-full border"
                            style={{
                              borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
                              background: `color-mix(in srgb, ${accentColor} 5%, transparent)`,
                              color: accentColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Pastki ma'lumotlar paneli yiriklashtirildi */}
                      <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-[var(--text-gray)] uppercase font-bold tracking-wider">
                            Daraja
                          </span>
                          <span className="text-xl font-black text-[var(--text-dark)]">
                            {prog.level || "Bakalavr"}
                          </span>
                        </div>
                        <div className="flex flex-col text-right gap-1">
                          <span className="text-xs text-[var(--text-gray)] uppercase font-bold tracking-wider">
                            Davomiyligi
                          </span>
                          <span className="text-xl font-black text-[var(--text-dark)]">
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

          {/* Barcha dasturlarni ko'rish tugmasi - School 21 uslubiga o'tkazildi va yiriklashdi */}
          <AnimatedSection delay={0.2}>
            <div className="text-center">
              <Link
                to="/programs"
                className="inline-flex items-center gap-3 border-2 border-[var(--bg-dark-section)] text-[var(--bg-dark-section)] hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] font-black text-lg px-14 py-5 rounded-xl transition-all duration-300 group shadow-lg hover:shadow-[var(--color-primary)]/30"
              >
                {t("home.programs.viewAllBtn")}
                <span className="text-2xl leading-none group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWS 
      ══════════════════════════════════════════ */}
      <section className="bg-[var(--bg-light-section)] py-28">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
          {/* ————— YANGILIKLAR (TO'LIQ KENGILK VA YIRIKLASHGAN) ————— */}
          <div className="overflow-hidden">
            <AnimatedSection direction="up">
              <div>
                <div className="text-center mb-16 max-w-3xl mx-auto">
                  <SectionLabel>{t("home.news.sectionLabel")}</SectionLabel>
                  <SectionTitle>{t("home.news.title")}</SectionTitle>
                </div>

                {/* Yangiliklarni to'liq ekranda 3 ta ustunga bo'lib ko'rsatish */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                  {news.map((item) => {
                    // Original ranglarni dizayn tizimiga moslash
                    const meta = NEWS_META[item.cat_key] || {
                      icon: "📰",
                      color:
                        "bg-[var(--bg-dark-section)]/5 text-[var(--bg-dark-section)]/70 border border-[var(--bg-dark-section)]/10",
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
                        className="flex flex-col p-8 rounded-[40px] bg-white group transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] block border-[6px] border-solid"
                        style={{
                          borderColor: `var(--color-primary)`,
                        }}
                      >
                        {/* Rasm qismi (Balandligi oshirildi: h-72) */}
                        <div className="w-full h-72 shrink-0 rounded-[24px] overflow-hidden bg-[var(--bg-light-section)] flex items-center justify-center mb-8 relative border border-slate-100">
                          {item.embed_url ? (
                            <img
                              src={`https://img.youtube.com/vi/${extractVideoId(item.embed_url)}/hqdefault.jpg`}
                              alt=""
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              onError={(e) => {
                                e.target.src = `https://img.youtube.com/vi/${extractVideoId(item.embed_url)}/0.jpg`;
                              }}
                            />
                          ) : (
                            <span className="opacity-20 text-[var(--color-secondary)] text-7xl">
                              {meta.icon}
                            </span>
                          )}

                          {/* Kategoriya tegi */}
                          <div className="absolute top-5 left-5">
                            <span className="text-sm font-black px-4 py-2 rounded-xl uppercase tracking-widest backdrop-blur-md bg-white/90 text-[var(--bg-dark-section)] shadow-lg border border-white/50">
                              {category}
                            </span>
                          </div>
                        </div>

                        {/* Matnlar qismi */}
                        <div className="flex flex-col flex-1 px-2">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-base font-bold text-[var(--color-primary)] bg-[var(--color-primary)]/10 px-3 py-1 rounded-lg">
                              {item.date_label}
                            </span>
                          </div>

                          {/* Sarlavha: text-3xl gacha yiriklashdi */}
                          <h4 className="text-3xl font-black text-[var(--text-dark)] mb-4 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                            {title}
                          </h4>

                          {/* Izoh: text-xl ga oshirildi */}
                          <p className="text-xl text-[var(--text-gray)] leading-relaxed line-clamp-3 mb-8 flex-1 font-medium">
                            {excerpt}
                          </p>

                          {/* Pastki qism */}
                          <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center text-[var(--color-secondary)] font-black text-lg group-hover:text-[var(--color-primary)] transition-colors">
                              Batafsil o'qish
                              <span className="ml-3 group-hover:translate-x-3 transition-transform duration-300">
                                <svg
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5 12H19M19 12L12 5M19 12L12 19"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Markazlashgan yirik "Barchasini ko'rish" tugmasi */}
                <div className="text-center">
                  <Link
                    to="/news"
                    className="inline-flex items-center gap-3 border-2 border-[var(--bg-dark-section)] text-[var(--bg-dark-section)] hover:bg-[var(--bg-dark-section)] hover:text-[var(--color-primary)] font-black text-lg px-12 py-4 rounded-xl transition-all duration-300 shadow-lg"
                  >
                    {t("home.news.viewAllBtn")}
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FACULTY PREVIEW
      ══════════════════════════════════════════ */}
      <section className="bg-[var(--bg-light-section)] py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <SectionLabel>{t("home.faculty.sectionLabel")}</SectionLabel>
              <SectionTitle>{t("home.faculty.title")}</SectionTitle>
            </div>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            // Gap kattalashtirildi
            className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16"
          >
            {facultyPreview.map((m) => (
              <motion.div key={m.id} variants={fadeUpItem}>
                <Link
                  to={"/faculty"}
                  className="bg-white rounded-[32px] p-10 border-[6px] border-solid text-center cursor-pointer group hover:-translate-y-3 hover:shadow-2xl transition-all duration-300 block relative overflow-hidden"
                  style={{
                    // UI o'zgarmaydi, faqat hoshiya rangi binafsha rangning 20% shaffofligida ko'rinadi
                    borderColor: `var(--color-primary)`,
                  }}
                >
                  {/* Accent top line - Yalpiz rangda */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />

                  {/* Avatar / Initials */}
                  <div
                    className={`w-24 h-24 ${m.avatar_cls || "bg-[var(--color-secondary)]"} rounded-full flex items-center justify-center text-white text-3xl font-black mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl overflow-hidden`}
                  >
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={getField(m, "name")}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      m.initials
                    )}
                  </div>

                  {/* Ism */}
                  <h4 className="text-2xl font-black text-[var(--text-dark)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors leading-tight">
                    {getField(m, "name")}
                  </h4>

                  {/* Rol */}
                  <p className="text-[var(--color-secondary)] font-bold text-lg mb-1">
                    {getField(m, "role")}
                  </p>

                  {/* Bo'lim */}
                  <p className="text-[var(--text-gray)] text-base mb-6 font-medium">
                    {getField(m, "dept")}
                  </p>

                  {/* Tadqiqot yo'nalishi */}
                  <div className="bg-[var(--bg-light-section)] rounded-2xl p-5 text-base text-[var(--text-dark)]/80 mb-6 line-clamp-2 min-h-[70px] flex items-center justify-center italic">
                    "{getField(m, "research")}"
                  </div>

                  {/* Nashrlar */}
                  <p className="text-[var(--text-gray)] text-sm font-bold tracking-wide uppercase">
                    📄 {m.pubs} {t("home.faculty.pubsLabel")}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <AnimatedSection delay={0.2}>
            <div className="text-center">
              {/* Tugma yiriklashtirildi va Yalpiz rangga o'tkazildi */}
              <Link
                to={"/faculty"}
                className="bg-[var(--color-primary)] hover:brightness-95 active:scale-95 text-[var(--bg-dark-section)] font-black text-lg px-14 py-5 rounded-xl transition-all shadow-xl shadow-[var(--color-primary)]/20 inline-block"
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
      <section className="bg-[var(--bg-dark-section)] py-28 relative overflow-hidden">
        {/* Background gradient - Yalpiz rangiga moslandi */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-[var(--color-primary)]/5 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <AnimatedSection>
            <div className="text-center mb-20">
              {/* Label - Shrifti kattalashtirildi va rang yashilga o'zgartirildi */}
              <span className="inline-block px-5 py-2 mb-6 text-xs font-black tracking-[0.2em] text-[var(--color-primary)] uppercase bg-[var(--color-primary)]/10 rounded-full border border-[var(--color-primary)]/20">
                {t("home.partners.sectionLabel")}
              </span>
              <h3 className="text-white font-black text-4xl md:text-5xl lg:text-6xl">
                {t("home.partners.title")}
              </h3>
            </div>
          </AnimatedSection>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {social_image.map((e) => (
              <motion.div
                key={e}
                variants={fadeUpItem}
                whileHover={{
                  scale: 1.05,
                  borderColor: "var(--color-primary)",
                }}
                className="relative bg-white border border-white/10 p-8 rounded-[24px] transition-all duration-300 flex items-center justify-center text-center group min-h-[140px]"
              >
                {/* Logotip rasmi */}
                <img
                  src={e}
                  alt="Hamkor logotipi"
                  className="max-h-16 w-auto  transition-all duration-500  group-hover:opacity-100"
                />

                {/* Pastki dekorativ chiziq - Yashil rangda */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)]/0 to-transparent group-hover:via-[var(--color-primary)]/50 transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <AnimatedSection direction="up">
        {/* Fon juda och kulrang (bg-[var(--bg-light-section)]), chetlari yumshoq soya bilan */}
        <section className="relative bg-[var(--bg-light-section)] py-32 overflow-hidden rounded-[40px] mx-6 my-24 border border-slate-200 shadow-xl">
          {/* Dekorativ elementlar - juda nafis va yengil */}
          <div className="absolute -right-20 -top-20 w-[600px] h-[600px] bg-[var(--color-primary)]/5 rounded-full pointer-events-none blur-[100px]" />
          <div className="absolute -left-20 -bottom-20 w-[400px] h-[400px] bg-[var(--color-secondary)]/5 rounded-full pointer-events-none blur-[80px]" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
            {/* Sarlavha - To'q matn (var(--text-dark)), juda yirik */}
            <h2
              className="text-5xl md:text-6xl lg:text-7xl font-black text-[var(--text-dark)] mb-10 leading-[1.05] tracking-tighter"
              style={{ fontFamily: "sans-serif" }}
            >
              {t("home.cta.title")}
            </h2>
            {/* Subtitle - Kulrang (var(--text-gray)), o'qilishi oson */}
            <p className="text-[var(--text-gray)] text-xl md:text-2xl leading-relaxed mb-16 max-w-3xl mx-auto font-medium">
              {t("home.cta.subtitle")}
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              {/* Asosiy tugma - Yalpiz yashil, lekin matni to'q */}
              <Link
                to={"admissions"}
                className="bg-[var(--color-primary)] hover:scale-105 active:scale-95 text-[var(--text-dark)] font-black text-xl px-16 py-6 rounded-2xl transition-all shadow-xl shadow-[var(--color-primary)]/30 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative uppercase tracking-widest">
                  {t("home.cta.applyBtn")}
                </span>
              </Link>
              {/* Ikkinchi darajali tugma - Oq fonli, toza */}
              <Link
                to={"contact"}
                className="bg-white hover:bg-slate-50 border-2 border-slate-200 text-[var(--text-dark)] font-black text-xl px-16 py-6 rounded-2xl transition-all shadow-sm"
              >
                {t("home.cta.visitBtn")}
              </Link>
            </div>
          </div>
          {/* Pastki bezak chizig'i */}
          <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[var(--color-secondary)]/20 to-transparent" />
        </section>
      </AnimatedSection>
    </div>
  );
}

export default Home;
