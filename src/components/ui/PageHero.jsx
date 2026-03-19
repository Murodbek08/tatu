import { useTranslation } from "react-i18next";

function PageHero({ crumb, title, subtitle }) {
  const { t } = useTranslation();
  return (
    <div className="relative bg-[#0a1628] overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl" />
      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {crumb && (
          <p className="text-white/40 text-sm mb-4">
            {t("homeName")} <span className="mx-1">/</span>
            <span className="text-amber-400">{crumb}</span>
          </p>
        )}
        <h1
          className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight max-w-3xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-white/60 text-lg max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default PageHero;
