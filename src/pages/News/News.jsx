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

      <div className="bg-[#f4f7fa] py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          {/* 1. FEATURED NEWS - Asosiy yangilik (Yirikroq) */}
          {featured && (
            <AnimatedSection direction="up">
              <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.03)] grid grid-cols-1 lg:grid-cols-2 group">
                <div className="relative aspect-video lg:aspect-auto min-h-[400px] bg-slate-900 overflow-hidden">
                  <iframe
                    src={featured.embed_url}
                    title={getField(featured, "title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="p-12 md:p-16 flex flex-col justify-center relative">
                  {/* Side Accent Line */}
                  <div className="absolute left-0 top-1/4 bottom-1/4 w-2 bg-[#892be2] rounded-r-full" />

                  <div className="flex items-center gap-4 mb-8">
                    <span
                      className={`text-[12px] font-black px-5 py-2 rounded-2xl  tracking-[0.2em] border ${getMeta(featured.cat_key).color} bg-white shadow-sm`}
                    >
                      {getField(featured, "cat")}
                    </span>
                    <span className="text-slate-400 font-bold text-base italic">
                      {featured.date_label}
                    </span>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.1] tracking-tighter group-hover:text-[#892be2] transition-colors">
                    {getField(featured, "title")}
                  </h2>

                  <p className="text-slate-500 text-xl md:text-2xl leading-relaxed mb-10 font-medium">
                    {getField(featured, "excerpt")}
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(`/news/${featured.id}`)}
                    className="bg-slate-900 hover:bg-[#3de082] hover:text-slate-900 text-white font-black text-lg px-10 py-5 rounded-[2rem] transition-all duration-300 w-fit shadow-xl shadow-slate-200"
                  >
                    {t("news.readfullbtn")}
                  </motion.button>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* 2. NEWS GRID - Qolgan yangiliklar (Kattalashtirilgan) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10"
          >
            {gridItems.map((item) => (
              <motion.div
                key={item.id}
                variants={cardItem}
                whileHover={{ y: -15 }}
                className="bg-white rounded-[3rem] border border-slate-100 overflow-hidden group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                  <iframe
                    src={item.embed_url}
                    title={getField(item, "title")}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full transition-transform duration-700 group-hover:scale-110 pointer-events-none"
                  />
                </div>

                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-8">
                    <span
                      className={`text-[10px] font-black px-4 py-2 rounded-xl  tracking-widest border ${getMeta(item.cat_key).color} bg-white`}
                    >
                      {getField(item, "cat")}
                    </span>
                    <span className="text-sm text-slate-400 font-bold italic">
                      {item.date_label}
                    </span>
                  </div>

                  <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 leading-tight group-hover:text-[#892be2] transition-colors line-clamp-2 tracking-tight">
                    {getField(item, "title")}
                  </h4>

                  <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 line-clamp-3 font-medium">
                    {getField(item, "excerpt")}
                  </p>

                  <button className="mt-auto w-full flex items-center justify-center gap-3 border-2 border-slate-50 bg-slate-50 text-slate-900 text-base font-black py-5 rounded-[1.8rem] group-hover:bg-[#3de082] group-hover:border-[#3de082] transition-all duration-300">
                    {t("news.readmorebtn")}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bo'sh holat */}
          {!loading && newsList.length === 0 && (
            <div className="text-center py-32 text-slate-300 border-4 border-dashed border-slate-100 rounded-[4rem] font-black text-2xl  tracking-[0.3em]">
              Yangiliklar topilmadi
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
