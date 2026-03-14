import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
const PROGRAMS = [
  {
    id: 1,
    code: "CS",
    icon: "💻",
    title: "Kompyuter Fanlari va Muhandisligi",
    degree: "Bakalavr / Magistr / PhD",
    duration: "4 yil",
    hex: "#1d4ed8",
    tags: ["AI", "Tizimlar", "Veb", "Xavfsizlik"],
    desc: "Algoritmlar, sun'iy intellekt, mashinali o'rganish, taqsimlangan tizimlar va dasturiy muhandislik.",
  },
  {
    id: 2,
    code: "CE",
    icon: "🔧",
    title: "Kompyuter Muhandisligi",
    degree: "Bakalavr / Magistr",
    duration: "4 yil",
    hex: "#0891b2",
    tags: ["FPGA", "Embedded", "IoT", "VLSI"],
    desc: "Apparat-dasturiy integratsiya, o'rnatilgan tizimlar, FPGA dizayni va IoT ilovalari.",
  },
  {
    id: 3,
    code: "IT",
    icon: "🌐",
    title: "Axborot Texnologiyalari",
    degree: "Bakalavr / Magistr",
    duration: "4 yil",
    hex: "#7c3aed",
    tags: ["Cloud", "Xavfsizlik", "ERP", "DevOps"],
    desc: "Korporativ tizimlar, bulutli arxitektura, kiberxavfsizlik va raqamli transformatsiya.",
  },
  {
    id: 4,
    code: "DS",
    icon: "📊",
    title: "Ma'lumotlar Fanlari",
    degree: "Bakalavr / Magistr",
    duration: "4 yil",
    hex: "#059669",
    tags: ["BigData", "ML", "BI", "Python"],
    desc: "Katta ma'lumotlar, statistik modellashtirish, mashinali o'rganish va biznes razvedkasi.",
  },
  {
    id: 5,
    code: "EE",
    icon: "⚡",
    title: "Elektr Muhandisligi",
    degree: "Bakalavr / Magistr / PhD",
    duration: "4 yil",
    hex: "#d97706",
    tags: ["Energiya", "RF", "DSP", "Smart Grid"],
    desc: "Energiya tizimlari, signal qayta ishlash, telekommunikatsiya va aqlli tarmoq texnologiyalari.",
  },
  {
    id: 6,
    code: "AI",
    icon: "🤖",
    title: "Sun'iy Intellekt",
    degree: "Magistr / PhD",
    duration: "2 yil",
    hex: "#e11d48",
    tags: ["Deep Learning", "NLP", "Vision", "Robotics"],
    desc: "Chuqur o'rganish, NLP, kompyuter ko'rishi, robotika va avtonom tizimlar tadqiqoti.",
  },
];
function Programs() {
  const [filter, setFilter] = useState("all");
  const FILTERS = [
    { key: "all", label: "Barcha Dasturlar" },
    { key: "bachelor", label: "Bakalavr" },
    { key: "master", label: "Magistr" },
    { key: "phd", label: "PhD" },
  ];

  return (
    <div>
      <PageHero
        crumb="Dasturlar"
        title="Akademik Dasturlar"
        subtitle="Bakalavr'dan PhD'gacha — dasturlarimiz dunyoning eng talabchan muhandislik rollariga sizni tayyorlash uchun yaratilgan."
      />

      {/* Filter bar */}
      <div className="bg-[#0d1f3c] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                filter === f.key
                  ? "bg-amber-500 text-white shadow"
                  : "bg-white/10 text-white/70 hover:bg-white/18 border border-white/15"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {PROGRAMS.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-200"
              >
                <div
                  className="p-6 text-white"
                  style={{
                    background: `linear-gradient(135deg, ${prog.hex}ee, ${prog.hex}aa)`,
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-3xl mb-4">
                      {prog.icon}
                    </div>
                    <span className="bg-white/20 text-white text-[11px] font-black px-3 py-1.5 rounded-lg tracking-widest">
                      {prog.code}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-extrabold leading-snug mb-1">
                    {prog.title}
                  </h3>
                  <p className="text-white/70 text-[13px]">{prog.degree}</p>
                </div>
                <div className="p-6">
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-4">
                    {prog.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {prog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                        style={{ background: prog.hex + "12", color: prog.hex }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-xs text-slate-400">
                      ⏱ {prog.duration}
                    </span>
                    <button
                      className="text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                      style={{ background: prog.hex }}
                    >
                      Batafsil
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Programs;
