import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import { Link, useNavigate } from "react-router-dom";

const NEWS_META = {
  research: { icon: "🔬", color: "bg-blue-100 text-blue-700" },
  partner: { icon: "🤝", color: "bg-emerald-100 text-emerald-700" },
  achievement: { icon: "🏆", color: "bg-amber-100 text-amber-700" },
  event: { icon: "📅", color: "bg-purple-100 text-purple-700" },
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
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-linear-to-br from-[#0a1628] to-blue-800 flex items-center justify-center text-[96px] p-16 min-h-55">
              🔬
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_META["research"].color}`}
                >
                  {t("news.list", { returnObjects: true })[0].cat}
                </span>
                <span className="text-slate-400 text-sm">
                  {t("news.list", { returnObjects: true })[0].date}
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                {t("news.list", { returnObjects: true })[0].title}
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                {t("news.list", { returnObjects: true })[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate("/news/1?lang=" + t("i18nextLng"))}
                  className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors"
                >
                  {t("news.readFullBtn")}
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {t("news.list", { returnObjects: true }).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
              >
                <div className="h-40 bg-linear-to-br from-slate-100 to-blue-50 flex items-center justify-center text-6xl">
                  {NEWS_META[item.catKey].icon}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_META[item.catKey].color}`}
                    >
                      {item.cat}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="text-[15px] font-extrabold text-slate-900 mb-2.5 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-5 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <button
                    onClick={() => navigate(`/news/${item.id}`)}
                    className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    {t("news.readMoreBtn")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
