import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const FOOTER_PATHS = [
    ["/programs", "/faculty", "/research", "/library"],
    ["/students", "/admissions", "/tadbirlar", "/media"],
    ["/about", "/news", "/hamkorlar", "/contact"],
  ];

  const socialLinks = [
    { icon: Facebook, label: "Facebook" },
    { icon: Twitter, label: "Twitter" },
    { icon: Linkedin, label: "Linkedin" },
    { icon: Youtube, label: "Youtube" },
  ];

  return (
    <footer className="bg-[#0a1628] text-white/60">
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center font-black text-white text-[11px] tracking-tight">
                TATU
              </div>
              <div>
                <p className="text-white font-extrabold text-sm leading-none">
                  {t("footer.brand.logoTitle")}
                </p>
                <p className="text-amber-400 text-[10px] font-medium tracking-wider mt-0.5">
                  {t("footer.brand.logoSubtitle")}
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              {t("footer.brand.desc")}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <button
                    key={i}
                    aria-label={item.label}
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                       flex items-center justify-center text-slate-300
                       transition-all duration-300 ease-in-out
                       hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-500"
                  >
                    <Icon size={18} strokeWidth={2} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Link cols */}
          {t("footer.cols", { returnObjects: true }).map((col, colIdx) => (
            <div key={colIdx}>
              <p className="text-white font-extrabold text-sm mb-5 tracking-wide">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((linkText, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={FOOTER_PATHS[colIdx][linkIdx]}
                      className="text-sm hover:text-amber-400 transition-colors"
                    >
                      {linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>{t("footer.copy")}</span>
          <div className="flex gap-5">
            {t("footer.legal", { returnObjects: true }).map((l) => (
              <button key={l} className="hover:text-white/60 transition-colors">
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
