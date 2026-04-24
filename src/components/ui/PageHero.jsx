import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function PageHero({ crumb, title, subtitle }) {
  const { t } = useTranslation();

  return (
    <div className="relative bg-[var(--bg-light-section)] overflow-hidden border-b border-slate-200">
      {/* Orqa fondagi nafis grid (kataklar) */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-dark) 1px,transparent 1px),linear-gradient(90deg,var(--text-dark) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dekorativ nurlar - Ochiq fonda nafisroq ko'rinadi */}
      <div className="absolute -right-32 -top-32 w-[600px] h-[600px] bg-[var(--color-primary)]/10 rounded-full blur-[120px]" />
      <div className="absolute -left-32 bottom-0 w-96 h-96 bg-[var(--color-secondary)]/10 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
        {/* Breadcrumb - Kattalashtirildi */}
        {crumb && (
          <nav className="flex items-center gap-2 text-base font-bold mb-8">
            <Link
              to="/"
              className="text-[var(--text-gray)] hover:text-[var(--color-secondary)] transition-colors"
            >
              {t("homeName") || "Asosiy"}
            </Link>
            <span className="text-slate-300 font-light text-xl">/</span>
            <span className="text-[var(--color-secondary)] tracking-wide uppercase text-sm">
              {crumb}
            </span>
          </nav>
        )}

        {/* Asosiy Sarlavha - JUDA YIRIK (text-7xl) */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-[var(--text-dark)] mb-8 leading-[1.05] tracking-tighter max-w-4xl">
          {title}
        </h1>

        {/* Subtitle - O'qishga juda qulay (text-2xl) */}
        {subtitle && (
          <p className="text-[var(--text-gray)] text-xl md:text-2xl max-w-3xl leading-relaxed font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Pastki qismdagi dekorativ chiziq */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent" />
    </div>
  );
}

export default PageHero;
