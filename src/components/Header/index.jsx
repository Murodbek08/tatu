import { useState } from "react";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const NAV_LINKS = [
  { label: "Bosh sahifa", page: "/" },
  { label: "Haqimizda", page: "/about" },
  { label: "Dasturlar", page: "/programs" },
  { label: "O'qituvchilar", page: "/faculty" },
  { label: "Tadqiqot", page: "/research" },
  { label: "Talabalar", page: "/students" },
  { label: "Yangiliklar", page: "/news" },
  { label: "Qabul", page: "/admissions" },
  { label: "Aloqa", page: "/contact" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Utility bar */}
      <div className="bg-[#0a1628] border-b border-white/10 text-white/45 text-xs h-8 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full flex justify-between">
          <span className="truncate ">
            O'zbekiston Respublikasi Oliy Ta'lim, Fan va Innovatsiyalar
            Vazirligi
          </span>
          <div className="flex items-center gap-2">
            <button className="hover:text-amber-400 transition-colors">
              UZ
            </button>
            <span className="text-amber-500">|</span>
            <button className="hover:text-amber-400 transition-colors">
              EN
            </button>
            <span className="text-amber-500">|</span>
            <button className="hover:text-amber-400 transition-colors">
              RU
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`sticky top-0 z-10000 transition-all duration-300 ${
          scrolled
            ? "bg-[#0a1628]/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "bg-[#0a1628]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={"/"}
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-black text-white text-[11px] tracking-tight shadow-lg shadow-amber-500/30">
              TATU
            </div>
            <div className="text-left">
              <p className="text-white font-extrabold text-sm leading-none">
                Engineering School
              </p>
              <p className="text-amber-400 text-[10px] font-medium tracking-wider mt-0.5">
                Tashkent University of IT
              </p>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden xl:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.page}
                to={link.page}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-[13px] font-semibold transition-all border-b-2 ${
                    isActive
                      ? "text-amber-400 border-amber-500 bg-white/[0.06]"
                      : "text-white/75 border-transparent hover:text-white hover:bg-white/[0.07]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to={"admissions"}
              className="hidden sm:block bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-[13px] font-bold px-5 py-2 rounded-lg transition-all shadow-md shadow-amber-500/30"
            >
              Ariza Topshirish
            </Link>

            {/* Hamburger */}
            <button
              className="xl:hidden flex flex-col gap-[5px] p-2 group"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menyu"
            >
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "rotate-45 translate-y-[7px]" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="xl:hidden bg-[#0d1f3c] border-t border-white/10 px-6 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.page}
                to={link.page}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to="/admissions"
              onClick={() => setOpen(false)}
              className="block w-full mt-2 text-center bg-amber-500 hover:bg-amber-600 text-white text-sm font-bold py-3 rounded-xl transition-colors"
            >
              Ariza Topshirish
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
