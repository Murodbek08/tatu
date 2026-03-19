import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
import { useTranslation } from "react-i18next";

const PROGRAMS_META = [
  { id: 1, code: "CS", icon: "💻", hex: "#1d4ed8" },
  { id: 2, code: "CE", icon: "🔧", hex: "#0891b2" },
  { id: 3, code: "IT", icon: "🌐", hex: "#7c3aed" },
  { id: 4, code: "DS", icon: "📊", hex: "#059669" },
  { id: 5, code: "EE", icon: "⚡", hex: "#d97706" },
  { id: 6, code: "AI", icon: "🤖", hex: "#e11d48" },
];
function Programs() {
  const { t } = useTranslation();
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState("all");

  // 1. JSON dan listni olamiz
  const translations = t("programs.list", { returnObjects: true });

  // 2. JSON ma'lumotlarini Meta (hex, icon) bilan birlashtiramiz
  const mergedPrograms = translations.map((item, index) => ({
    ...item,
    ...PROGRAMS_META[index],
  }));

  // 3. Filtrlaymiz
  const filteredPrograms = mergedPrograms.filter((prog) => {
    // 1. Agar "all" bo'lsa hamma ko'rinsin
    if (filter === "all") return true;

    // 2. Kichik harflarga o'girib solishtiramiz (Bakalavr, Magistr, PhD)
    const currentFilter = filter.toLowerCase().trim();
    const programDegree = prog.type.toLowerCase();

    // 3. Matn ichida filtr so'zi borligini tekshiramiz
    return programDegree.includes(currentFilter);
  });
  return (
    <div>
      <PageHero
        crumb={t("programs.hero.crumb")}
        title={t("programs.hero.title")}
        subtitle={t("programs.hero.subtitle")}
      />

      {/* Filter bar */}
      <div className="bg-[#0d1f3c] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {t("programs.filters", { returnObjects: true }).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
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
                      onClick={() => setActive(prog)}
                      className="text-white text-[12px] font-bold px-4 py-2 rounded-lg transition-opacity hover:opacity-90"
                      style={{ background: prog.hex }}
                    >
                      {t("programs.detailBtn")}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredPrograms.length === 0 && (
              <div className="text-center py-20 text-slate-400">
                {t("programs.emptyMsg")}
              </div>
            )}
          </div>

          {/* --- YANGILANGAN IXCHAM MODAL --- */}
          {active && (
            <div className="fixed inset-0 z-10001 flex items-end md:items-center justify-center transition-all duration-300">
              {/* Orqa fon (Blur) */}
              <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setActive(null)}
              />

              {/* Modal oynasi */}
              <div className="relative bg-white w-full max-w-lg md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300">
                {/* Modal tepasi - Ixcham chiziq (mobilda yopish uchun vizual signal) */}
                <div className="md:hidden w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-3 mb-1" />

                <div className="p-6 md:p-8">
                  {/* Sarlavha qismi */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{
                        background: `${active.hex}15`,
                        color: active.hex,
                      }}
                    >
                      {active.icon}
                    </div>
                    <div className="min-w-0">
                      <h2 className="text-lg md:text-xl font-black text-slate-900 leading-tight truncate">
                        {active.title}
                      </h2>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {active.degree} • {active.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => setActive(null)}
                      className="ml-auto p-2 text-[36px] text-slate-300 hover:text-slate-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Batafsil ma'lumot qismi */}
                  <div className="bg-slate-50 p-5 rounded-2xl mb-6">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {active.details}
                    </p>
                  </div>

                  {/* Taglar */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {active.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-[10px] font-bold text-slate-500 uppercase"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Yopish tugmasi */}
                  <button
                    onClick={() => setActive(null)}
                    className="w-full py-4 rounded-xl text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-slate-100"
                    style={{ background: active.hex }}
                  >
                    {t("programs.closeBtn")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Programs;
