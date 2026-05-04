import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { request } from "../../api";

const NEWS_META = {
  innovation: { color: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  education: { color: "bg-blue-100 text-blue-700 border-blue-200" },
  event: { color: "bg-purple-100 text-purple-700 border-purple-200" },
  startup: { color: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  award: { color: "bg-amber-100 text-amber-700 border-amber-200" },
  achievement: { color: "bg-orange-100 text-orange-700 border-orange-200" },
  research: { color: "bg-sky-100 text-sky-700 border-sky-200" },
  partner: { color: "bg-teal-100 text-teal-700 border-teal-200" },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function News() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const res = await request.get("/news?select=*&order=created_at.desc");
        setNewsList(res.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const featured = newsList.find((n) => n.is_featured) || newsList[0];
  const gridItems = newsList.filter(
    (n) => !n.is_featured || n.id !== featured?.id,
  );

  const getField = (item, field) =>
    item[`${field}_${lang}`] || item[`${field}_uz`] || "";

  const getMeta = (catKey) => NEWS_META[catKey] || NEWS_META["event"];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <PageHero
          crumb={t("news.hero.crumb")}
          title={t("news.hero.title")}
          subtitle={t("news.hero.subtitle")}
        />
        <div className="flex justify-center py-32">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        crumb={t("news.hero.crumb")}
        title={t("news.hero.title")}
        subtitle={t("news.hero.subtitle")}
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured */}
          {featured && (
            <AnimatedSection direction="up">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
                <div className="relative aspect-video md:aspect-auto min-h-64 bg-slate-900">
                  <iframe
                    src={featured.embed_url}
                    title={getField(featured, "title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full absolute inset-0"
                  />
                </div>
                <div className="p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide border ${getMeta(featured.cat_key).color}`}
                    >
                      {getField(featured, "cat")}
                    </span>
                    <span className="text-slate-400 text-sm">
                      {featured.date_label}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                    {getField(featured, "title")}
                  </h2>
                  <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                    {getField(featured, "excerpt")}
                  </p>
                  <motion.button
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => navigate(`/news/${featured.id}`)}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors w-fit"
                  >
                    {t("news.readFullBtn")}
                  </motion.button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {gridItems.map((item) => (
              <motion.div
                key={item.id}
                variants={cardItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="relative aspect-video w-full bg-slate-900">
                  <iframe
                    src={item.embed_url}
                    title={getField(item, "title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border ${getMeta(item.cat_key).color}`}
                    >
                      {getField(item, "cat")}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.date_label}
                    </span>
                  </div>
                  <h4 className="text-[17px] font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {getField(item, "title")}
                  </h4>
                  <p className="text-slate-600 text-[13px] leading-relaxed mb-6 line-clamp-3">
                    {getField(item, "excerpt")}
                  </p>
                  <button className="mt-auto w-full flex items-center justify-center gap-2 border border-slate-200 bg-slate-50/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-800 text-sm font-bold py-3.5 rounded-xl transition-all duration-200">
                    {t("news.readMoreBtn")}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {!loading && newsList.length === 0 && (
            <div className="text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl font-medium uppercase tracking-widest">
              Yangiliklar topilmadi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
