import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";

const AREA_METADATA = [
  { icon: "🧠", bar: "from-blue-600 to-blue-800" },
  { icon: "🛡️", bar: "from-rose-600 to-rose-800" },
  { icon: "🏙️", bar: "from-emerald-600 to-emerald-800" },
  { icon: "📡", bar: "from-violet-600 to-violet-800" },
];
const LAB_ICONS = ["🖥️", "🔐", "💡", "⚡", "📡", "🤖"];
function Research() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("research.hero.crumb")}
        title={t("research.hero.title")}
        subtitle={t("research.hero.subtitle")}
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>{t("research.areas.sectionLabel")}</SectionLabel>
          <div className="mt-1 mb-10">
            <SectionTitle>{t("research.areas.title")}</SectionTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {t("research.areas.list", { returnObjects: true }).map(
              (area, index) => {
                const meta = AREA_METADATA[index] || {};
                return (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
                  >
                    <div
                      className={`w-2 bg-linear-to-b ${meta.bar} shrink-0`}
                    />
                    <div className="p-8">
                      <div className="text-4xl mb-4">{meta.icon}</div>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-slate-500 text-sm leading-relaxed mb-5">
                        {area.desc}
                      </p>
                      <span className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-xl">
                        {area.projects} {t("research.areas.projectsSuffix")}
                      </span>
                    </div>
                  </div>
                );
              },
            )}
          </div>

          {/* Stats band */}
          <div className="bg-[#0a1628] rounded-3xl p-12">
            <h3
              className="text-white font-black text-2xl text-center mb-10"
              style={{ fontFamily: "Georgia, serif" }}
            >
              {t("research.stats.title")}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t("research.stats.list", { returnObjects: true }).map((stat) => (
                <div key={stat.l} className="text-center">
                  <p className="text-amber-400 font-black text-4xl leading-none mb-2">
                    {stat.v}
                  </p>
                  <p className="text-white font-bold text-[15px] mb-1">
                    {stat.l}
                  </p>
                  <p className="text-white/40 text-xs">{stat.s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Labs */}
          <div className="mt-20">
            <SectionLabel>{t("research.labs.sectionLabel")}</SectionLabel>
            <div className="mt-2 mb-8">
              <SectionTitle>{t("research.labs.title")}</SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {t("research.labs.list", { returnObjects: true }).map(
                (lab, index) => (
                  <div
                    key={lab.name}
                    className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="text-3xl mb-4">{LAB_ICONS[index]}</div>
                    <h4 className="text-[15px] font-extrabold text-slate-900 mb-2">
                      {lab.name}
                    </h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed">
                      {lab.desc}
                    </p>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;
