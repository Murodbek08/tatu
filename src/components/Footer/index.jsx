import { Link } from "react-router-dom";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";
import { Linkedin } from "lucide-react";
import { Youtube } from "lucide-react";

function Footer() {
  const COLS = [
    {
      title: "Akademik",
      links: [
        ["Dasturlar", "/programs"],
        ["O'qituvchilar", "/faculty"],
        ["Tadqiqot", "/research"],
        ["Kutubxona", "/#"],
      ],
    },
    {
      title: "Kampus",
      links: [
        ["Talabalar", "/students"],
        ["Qabul", "/admissions"],
        ["Tadbirlar", "/#"],
        ["Media", "/#"],
      ],
    },
    {
      title: "Institut",
      links: [
        ["Haqimizda", "/about"],
        ["Yangiliklar", "/news"],
        ["Hamkorlar", "/#"],
        ["Aloqa", "/contact"],
      ],
    },
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
                  Engineering School
                </p>
                <p className="text-amber-400 text-[10px] font-medium tracking-wider mt-0.5">
                  Tashkent University of IT
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-xs mb-6">
              1955 yildan beri Markaziy Osiyoda muhandislar, innovatorlar va
              texnologiya liderlarining keyingi avlodini shakllantirmoqda.
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
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-white font-extrabold text-sm mb-5 tracking-wide">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map(([label, pg]) => (
                  <li key={label}>
                    <Link
                      to={pg}
                      className="text-sm hover:text-amber-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
          <span>
            © 2026 Toshkent Axborot Texnologiyalari Universiteti. Barcha
            huquqlar himoyalangan.
          </span>
          <div className="flex gap-5">
            {[
              "Maxfiylik Siyosati",
              "Foydalanish Shartlari",
              "Maxsus Ehtiyojlar",
            ].map((l) => (
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
