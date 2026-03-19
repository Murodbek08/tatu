import { useTranslation } from "react-i18next";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";

const CLUB_ICONS = ["⚡", "🤖", "🛡️", "🚀"];
const FACILITY_ICONS = ["🖥️", "🔐", "💡", "📚", "🏋️", "🏠"];

function Students() {
  const { t } = useTranslation();

  return (
    <div>
      <PageHero
        crumb={t("students.hero.crumb")}
        title={t("students.hero.title")}
        subtitle={t("students.hero.subtitle")}
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>{t("students.clubs.sectionLabel")}</SectionLabel>
          <div className="mt-1 mb-3">
            <SectionTitle>{t("students.clubs.title")}</SectionTitle>
          </div>
          <SectionSubtitle>{t("students.clubs.subtitle")}</SectionSubtitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mb-20">
            {t("students.clubs.list", { returnObjects: true }).map(
              (club, index) => (
                <div
                  key={club.name}
                  className="bg-white rounded-2xl p-7 border border-slate-200 flex gap-5 items-start cursor-pointer group hover:border-amber-400 hover:translate-x-1 transition-all duration-150"
                >
                  <div className="w-14 h-14 bg-[#0a1628] rounded-2xl flex items-center justify-center text-3xl shrink-0">
                    {CLUB_ICONS[index]}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                      {club.name}
                    </h4>
                    <p className="text-slate-500 text-sm leading-relaxed mb-3">
                      {club.desc}
                    </p>
                    <span className="text-amber-600 font-bold text-sm">
                      👥 {club.members} {t("students.clubs.membersSuffix")}
                    </span>
                  </div>
                </div>
              ),
            )}
          </div>

          <SectionLabel>{t("students.facilities.sectionLabel")}</SectionLabel>
          <div className="mt-2 mb-8">
            <SectionTitle>{t("students.facilities.title")}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {t("students.facilities.list", { returnObjects: true }).map(
              (f, index) => (
                <div
                  key={f.title}
                  className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-4">{FACILITY_ICONS[index]}</div>
                  <h4 className="text-[15px] font-extrabold text-slate-900 mb-2">
                    {f.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {f.desc}
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

export default Students;
