// pages/News/News.jsx — animatsiyalangan versiya
// Featured card: fade-in | Grid: stagger | Cards: hover-lift

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { Link, useNavigate } from "react-router-dom";

const NEWS_META = {
  research: { icon: "🔬", color: "bg-blue-100 text-blue-700" },
  partner: { icon: "🤝", color: "bg-emerald-100 text-emerald-700" },
  achievement: { icon: "🏆", color: "bg-amber-100 text-amber-700" },
  event: { icon: "📅", color: "bg-purple-100 text-purple-700" },
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

function News() {
  const { t } = useTranslation();
  const navigate = useNavigate();

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
          {(() => {
            const featured = t("news.list", { returnObjects: true })[0];
            return (
              <AnimatedSection direction="up">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
                  <div className="relative aspect-video md:aspect-auto min-h-64 bg-slate-900">
                    <iframe
                      src={featured.embedUrl}
                      title={featured.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full absolute inset-0"
                    />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_META["research"].color}`}
                      >
                        {featured.cat}
                      </span>
                      <span className="text-slate-400 text-sm">
                        {featured.date}
                      </span>
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                      {featured.title}
                    </h2>
                    <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                      {featured.excerpt}
                    </p>
                    <motion.button
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate("/news/1")}
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors w-fit"
                    >
                      {t("news.readFullBtn")}
                    </motion.button>
                  </div>
                </div>
              </AnimatedSection>
            );
          })()}

          {/* Grid */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {t("news.list", { returnObjects: true }).map((item) => (
              <motion.div
                key={item.id}
                variants={cardItem}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer"
                onClick={() => navigate(`/news/${item.id}`)}
              >
                <div className="relative aspect-video w-full bg-slate-900">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.embedUrl.split("/embed/")[1]}`}
                    title={item.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                      {item.cat}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {item.date}
                    </span>
                  </div>
                  <h4 className="text-[17px] font-extrabold text-slate-900 mb-3 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-600 text-[13px] leading-relaxed mb-6 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <button className="mt-auto w-full flex items-center justify-center gap-2 border border-slate-200 bg-slate-50/50 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-slate-800 text-sm font-bold py-3.5 rounded-xl transition-all duration-200">
                    {t("news.readMoreBtn")}
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default News;
