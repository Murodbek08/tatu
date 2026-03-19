import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";

function About() {
  const { t } = useTranslation();
  return (
    <div>
      <PageHero
        crumb={t("about.hero.crumb")}
        title={t("about.hero.title")}
        subtitle={t("about.hero.subtitle")}
      />

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* MVV */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {t("about.mvv", { returnObjects: true }).map((c) => (
              <div
                key={c.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
              >
                <div className="text-4xl mb-5">{c.icon}</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <SectionLabel>{t("about.timeline.sectionLabel")}</SectionLabel>
          <div className="mt-1 mb-3">
            <SectionTitle>{t("about.timeline.title")}</SectionTitle>
          </div>
          <div className="relative pl-10 mt-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            {t("about.timeline.events", { returnObjects: true }).map(
              ({year, event}, i) => (
                <div
                  key={year}
                  className="flex gap-6 mb-8 items-start relative"
                >
                  <div
                    className={`absolute -left-5.5 w-4 h-4 rounded-full border-4 border-white shadow ${
                      i === 7 ? "bg-amber-500" : "bg-[#0a1628]"
                    }`}
                  />
                  <span
                    className={`text-xs font-black tracking-widest uppercase ${i === 7 ? "text-amber-500" : "text-slate-400"}`}
                  >
                    {year}
                  </span>
                  <p className="text-[15px] text-slate-800 mt-1 leading-relaxed">
                    {event}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
