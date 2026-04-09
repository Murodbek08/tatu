// pages/NewsCard/NewsCard.jsx — animatsiyalangan versiya
// Page mount: fade-in + slide-up | Share button: bounce

import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

const NEWS_META = {
  innovation: { icon: "💡", color: "bg-yellow-100 text-yellow-700" },
  education: { icon: "🎓", color: "bg-blue-100 text-blue-700" },
  event: { icon: "📅", color: "bg-purple-100 text-purple-700" },
  startup: { icon: "🚀", color: "bg-emerald-100 text-emerald-700" },
  award: { icon: "🏆", color: "bg-amber-100 text-amber-700" },
  achievement: { icon: "🥇", color: "bg-orange-100 text-orange-700" },
  research: { icon: "🔬", color: "bg-sky-100 text-sky-700" },
  partner: { icon: "🤝", color: "bg-teal-100 text-teal-700" },
};

const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 mr-1.5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);
const LinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4 shrink-0 text-slate-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
    />
  </svg>
);
const ShareIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
    />
  </svg>
);

// Stagger for content sections
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const NewsCard = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const newsList = t("news.list", { returnObjects: true });
  const newsItem = newsList.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center font-sans"
      >
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {t("newsCard.notFound.title")}
        </h2>
        <Link to="/news" className="text-blue-600 hover:underline">
          {t("newsCard.notFound.homeLink")}
        </Link>
      </motion.div>
    );
  }

  const meta = NEWS_META[newsItem.catKey] || NEWS_META["event"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-slate-50 pb-12 font-sans antialiased"
    >
      <div className="max-w-3xl mx-auto px-4 pt-4 md:pt-8">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/news"
            className="inline-flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors mb-4"
          >
            <BackIcon />
            {t("newsCard.backBtn")}
          </Link>
        </motion.div>
      </div>

      <div className="max-w-3xl mx-auto px-0 md:px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="bg-white md:rounded-3xl border-y md:border border-slate-200 shadow-sm overflow-hidden"
        >
          {/* Video */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="relative aspect-video w-full bg-slate-900"
          >
            {newsItem.embedUrl ? (
              <iframe
                src={`${newsItem.embedUrl}?modestbranding=1&rel=0`}
                title={newsItem.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full absolute inset-0"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl md:text-9xl bg-gradient-to-br from-slate-800 to-blue-900">
                {meta.icon}
              </div>
            )}
          </motion.div>

          {/* Content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="p-6 sm:p-8 md:p-12"
          >
            {/* Category + date */}
            <motion.div
              variants={fadeUp}
              className="flex flex-wrap items-center justify-between gap-3 mb-6"
            >
              <span
                className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${meta.color}`}
              >
                {newsItem.cat}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">
                {newsItem.date}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight"
            >
              {newsItem.title}
            </motion.h1>

            <motion.div
              variants={fadeUp}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              style={{ originX: 0 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-1 bg-blue-600 rounded-full mb-8"
            />

            {/* Excerpt */}
            <motion.p
              variants={fadeUp}
              className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium"
            >
              {newsItem.excerpt}
            </motion.p>

            {/* Source */}
            <motion.div
              variants={fadeUp}
              className="mt-4 flex items-center gap-2 text-sm text-slate-500"
            >
              <LinkIcon />
              <span>{t("newsCard.sourceLabel")}</span>
              <a
                href="https://tuit.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
              >
                tuit.uz
              </a>
              <span>{t("newsCard.sourceSuffix")}</span>
            </motion.div>

            {/* Footer */}
            <motion.div
              variants={fadeUp}
              className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  navigator.share?.({
                    title: newsItem.title,
                    url: window.location.href,
                  })
                }
                className="flex items-center text-slate-400 hover:text-blue-500 transition-colors"
              >
                <ShareIcon />
                <span className="text-xs font-semibold">
                  {t("newsCard.shareBtn")}
                </span>
              </motion.button>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                {t("newsCard.location")}
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
