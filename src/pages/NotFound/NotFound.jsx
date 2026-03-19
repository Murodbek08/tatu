import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl mb-5">🚧</div>
      <h2 className="text-2xl font-black text-slate-800 mb-2">
        {t("notFound.title")}
      </h2>
      <p className="text-slate-500">{t("notFound.desc")}</p>
    </div>
  );
};

export default NotFound;
