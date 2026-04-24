import { Link } from "react-router-dom";
import { Facebook, Instagram, Send, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  const FOOTER_PATHS = [
    ["/programs", "/faculty", "/research", "/library"],
    ["/students", "/admissions", "/tadbirlar", "/media"],
    ["/about", "/news", "/hamkorlar", "/contact"],
  ];

  const socialLinks = [
    {
      name: "Web sayt",
      icon: Globe,
      href: "https://tuit.uz/",
      color:
        "hover:bg-[var(--color-primary)]/20 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]",
    },
    {
      name: "Telegram",
      icon: Send,
      href: "https://t.me/tuituz_official",
      color: "hover:bg-sky-500/20 hover:border-sky-500 hover:text-sky-500",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://www.instagram.com/tuit.official",
      color: "hover:bg-pink-600/20 hover:border-pink-600 hover:text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://www.facebook.com/TUITuzb",
      color: "hover:bg-blue-600/20 hover:border-blue-600 hover:text-blue-600",
    },
  ];

  return (
    <footer className="bg-[var(--bg-dark-section)] text-white/60">
      <div className="max-w-7xl mx-auto px-6 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[2fr_1fr_1fr_1fr] gap-16 pb-16 border-b border-white/10">
          {/* Brand Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-14flex items-center justify-center p-2 ">
                <img
                  src="logo.png"
                  alt="TATU Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                {/* Logo Title text-xl ga oshirildi */}
                <p className="text-white font-black text-xl leading-tight">
                  {t("footer.brand.logoTitle")}
                </p>
                {/* Logo Subtitle text-sm ga oshirildi */}
                <p className="text-[var(--color-primary)] text-sm font-bold tracking-widest mt-1 uppercase">
                  {t("footer.brand.logoSubtitle")}
                </p>
              </div>
            </div>

            {/* Ta'rif text-base ga oshirildi */}
            <p className="text-base leading-relaxed max-w-sm">
              {t("footer.brand.desc")}
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              {socialLinks.map((item, i) => {
                const Icon = item.icon;
                return (
                  <a
                    key={i}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                    className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 
                               flex items-center justify-center text-slate-300
                               transition-all duration-300 ease-in-out
                               ${item.color}`}
                  >
                    <Icon size={22} strokeWidth={2.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Columns */}
          {t("footer.cols", { returnObjects: true }).map((col, colIdx) => (
            <div key={colIdx}>
              {/* Ustun sarlavhasi text-lg ga oshirildi */}
              <p className="text-white font-black text-lg mb-8 tracking-wide">
                {col.title}
              </p>
              <ul className="space-y-4">
                {col.links.map((linkText, linkIdx) => (
                  <li key={linkIdx}>
                    <Link
                      to={FOOTER_PATHS[colIdx][linkIdx]}
                      className="text-base hover:text-[var(--color-primary)] transition-colors font-medium"
                    >
                      {linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-sm text-white/40 border-t border-white/5 mt-8">
          <span className="font-medium">{t("footer.copy")}</span>
          <div className="flex gap-8">
            {t("footer.legal", { returnObjects: true }).map((l) => (
              <button
                key={l}
                className="hover:text-[var(--color-primary)] transition-colors font-bold"
              >
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
