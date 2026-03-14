import { useState } from "react";
import PageHero from "../../components/ui/PageHero";

const FACULTY = [
  {
    id: 1,
    name: "Prof. Akbar Toshmatov",
    role: "Dekan",
    dept: "Kompyuter Fanlari",
    initials: "AT",
    research: "Taqsimlangan AI Tizimlari",
    pubs: 142,
    avatarCls: "bg-blue-600",
  },
  {
    id: 2,
    name: "Dr. Nilufar Yusupova",
    role: "Dotsent",
    dept: "Ma'lumotlar Fanlari",
    initials: "NY",
    research: "Mashinali O'rganish",
    pubs: 89,
    avatarCls: "bg-emerald-600",
  },
  {
    id: 3,
    name: "Prof. Sherzod Rakhimov",
    role: "Professor",
    dept: "Elektr Muhandisligi",
    initials: "SR",
    research: "Aqlli Quvvat Tarmoqlari",
    pubs: 115,
    avatarCls: "bg-amber-600",
  },
  {
    id: 4,
    name: "Dr. Kamola Mirzayeva",
    role: "Katta O'qituvchi",
    dept: "Kiberxavfsizlik",
    initials: "KM",
    research: "Tarmoq Xavfsizligi",
    pubs: 67,
    avatarCls: "bg-rose-600",
  },
  {
    id: 5,
    name: "Prof. Otabek Nazarov",
    role: "Professor",
    dept: "Kompyuter Muhandisligi",
    initials: "ON",
    research: "FPGA va Embedded Tizimlar",
    pubs: 103,
    avatarCls: "bg-violet-600",
  },
  {
    id: 6,
    name: "Dr. Zulfiya Ergasheva",
    role: "Dotsent",
    dept: "Axborot Texnologiyalari",
    initials: "ZE",
    research: "Bulutli Hisoblash",
    pubs: 54,
    avatarCls: "bg-cyan-600",
  },
];
function Faculty() {
  const [search, setSearch] = useState("");
  const visible = FACULTY.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHero
        crumb="O'qituvchilar"
        title="O'qituvchilarimiz"
        subtitle="340+ jahon darajasidagi tadqiqotchilar, o'qituvchilar va sanoat mutaxassislari — bilim va sizning rivojlanishingizga bag'ishlangan."
      />

      {/* Search */}
      <div className="bg-[#0d1f3c] border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto">
          <input
            type="text"
            placeholder="Ism yoki kafedra bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {visible.map((m) => (
              <div
                key={m.id}
                className="bg-white rounded-2xl p-8 border border-slate-200 cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex gap-4 mb-6">
                  <div
                    className={`w-16 h-16 ${m.avatarCls} rounded-full flex items-center justify-center text-white text-lg font-black flex-shrink-0`}
                  >
                    {m.initials}
                  </div>
                  <div>
                    <h4 className="text-[16px] font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {m.name}
                    </h4>
                    <p className="text-blue-700 font-bold text-[13px]">
                      {m.role}
                    </p>
                    <p className="text-slate-400 text-[12px] mt-0.5">
                      Kafedra: {m.dept}
                    </p>
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    Tadqiqot Yo'nalishi
                  </p>
                  <p className="text-[13px] text-slate-700 font-semibold">
                    {m.research}
                  </p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    📄 {m.pubs} ta nashr
                  </span>
                  <button
                    className={`${m.avatarCls} text-white text-[12px] font-bold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    Profil
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold">Hech narsa topilmadi</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Faculty;
