import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
import { useTranslation } from "react-i18next";

const FACULTY_META = [
  {
    id: 1,
    initials: "AT",
    avatarCls: "bg-blue-600",
    email: "a.toshmatov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akbar",
  },
  {
    id: 2,
    initials: "NY",
    avatarCls: "bg-emerald-600",
    email: "n.yusupova@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  },
  {
    id: 3,
    initials: "SR",
    avatarCls: "bg-amber-600",
    email: "s.rakhimov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=George",
  },
  {
    id: 4,
    initials: "KM",
    avatarCls: "bg-rose-600",
    email: "k.mirzayeva@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vivian",
  },
  {
    id: 5,
    initials: "ON",
    avatarCls: "bg-violet-600",
    email: "o.nazarov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
  },
  {
    id: 6,
    initials: "ZE",
    avatarCls: "bg-cyan-600",
    email: "z.ergasheva@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
  },
];
function Faculty() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  // 1. JSON dan ro'yxatni olish
  const list = t("faculty.list", { returnObjects: true }) || [];

  // 2. Tarjima va Meta ma'lumotlarini birlashtirish
  const mergedFaculty = list.map((item, index) => ({
    ...item,
    ...FACULTY_META[index],
  }));

  // 3. Qidiruv bo'yicha filtrlash
  const visible = mergedFaculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.dept.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <PageHero
        crumb={t("faculty.hero.crumb")}
        title={t("faculty.hero.title")}
        subtitle={t("faculty.hero.subtitle")}
      />

      {/* Search */}
      <div className="bg-[#0d1f3c] border-b border-white/10 py-5 px-6">
        <div className="max-w-7xl mx-auto">
          <input
            type="text"
            placeholder={t("faculty.searchPlaceholder")}
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
                onClick={() => setSelectedStaff(m)}
                className="bg-white rounded-2xl p-8 border border-slate-200 cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div className="flex gap-4 mb-6">
                  {/* Surat qismi */}
                  <div className="relative shrink-0">
                    <div
                      className={`w-16 h-16 ${m.avatarCls} rounded-full flex items-center justify-center text-white text-lg font-black overflow-hidden border-2 border-white shadow-sm`}
                    >
                      {m.image ? (
                        <img
                          src={m.image}
                          alt={m.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        m.initials
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[16px] font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                      {m.name}
                    </h4>
                    <p className="text-blue-700 font-bold text-[13px]">
                      {m.role}
                    </p>
                    <p className="text-slate-400 text-[12px] mt-0.5">
                      {t("faculty.deptLabel")} {m.dept}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">
                    {t("faculty.researchLabel")}
                  </p>
                  <p className="text-[13px] text-slate-700 font-semibold line-clamp-1">
                    {m.research}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-slate-400">
                    📄 {m.pubs} {t("faculty.pubsLabel")}
                  </span>
                  <button
                    className={`${m.avatarCls} text-white text-[12px] font-bold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {t("faculty.profileBtn")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visible.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold">{t("faculty.notFound")}</p>
            </div>
          )}
          {/* --- MODAL SECTION --- */}
          {selectedStaff && (
            <div className="fixed inset-0 z-10001 flex items-end md:items-center justify-center p-0 md:p-4">
              {/* Overlay - loyqa fon */}
              <div
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={() => setSelectedStaff(null)}
              />

              {/* Modal Body */}
              <div className="relative bg-white w-full max-w-xl md:rounded-4xl rounded-t-3xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom md:zoom-in duration-300 max-h-[90vh] flex flex-col">
                {/* Mobilda yopish uchun vizual chiziqcha */}
                <div className="md:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1 shrink-0" />

                {/* Header rangli fon (pastroq qilindi) */}
                <div
                  className={`h-20 ${selectedStaff.avatarCls} opacity-10 absolute top-0 left-0 w-full`}
                />

                <div className="relative p-6 md:p-8 overflow-y-auto no-scrollbar">
                  {/* Yopish tugmasi (X) */}
                  <button
                    onClick={() => setSelectedStaff(null)}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-slate-500 hover:bg-slate-100 transition-colors z-10"
                  >
                    ✕
                  </button>

                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    {/* Photo & Basic Info */}
                    <div className="shrink-0 text-center md:text-left">
                      <div
                        className={`w-24 h-24 md:w-28 md:h-28 ${selectedStaff.avatarCls} rounded-2xl overflow-hidden border-4 border-white shadow-lg mb-3 mx-auto`}
                      >
                        {selectedStaff.image ? (
                          <img
                            src={selectedStaff.image}
                            className="w-full h-full object-cover"
                            alt={selectedStaff.name}
                          />
                        ) : (
                          <span className="text-3xl text-white font-black flex items-center justify-center h-full">
                            {selectedStaff.initials}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-col items-center md:items-start gap-1">
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          {selectedStaff.role}
                        </span>
                        <p className="text-slate-400 text-[11px] font-medium mt-1">
                          {selectedStaff.email}
                        </p>
                      </div>
                    </div>

                    {/* Biography & Details */}
                    <div className="flex-1 text-center md:text-left">
                      <h2 className="text-xl font-black text-slate-900 leading-tight">
                        {selectedStaff.name}
                      </h2>
                      <p className="text-blue-700 font-bold text-xs mb-4">
                        {selectedStaff.dept}
                      </p>

                      <div className="space-y-4">
                        <section>
                          <h5 className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1.5">
                            {t("faculty.modal.bioLabel")}
                          </h5>
                          <p className="text-slate-600 text-[13px] leading-relaxed">
                            {selectedStaff.bio}
                          </p>
                        </section>

                        {/* Ixcham ma'lumotlar bloki */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">
                              {t("faculty.modal.educationLabel")}
                            </p>
                            <p className="text-slate-800 text-[11px] font-bold leading-tight">
                              {selectedStaff.education}
                            </p>
                          </div>
                          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <p className="text-[8px] font-black text-slate-400 uppercase mb-0.5">
                              {t("faculty.modal.pubsLabel")}
                            </p>
                            <p className="text-slate-800 text-[11px] font-bold leading-tight">
                              {selectedStaff.pubs}{" "}
                              {t("faculty.modal.pubsSuffix")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tugmalar qismi */}
                  <div className="mt-8 flex gap-2">
                    <button
                      className={`flex-1 py-3.5 rounded-xl text-white font-bold text-xs shadow-md active:scale-95 transition-all ${selectedStaff.avatarCls}`}
                      onClick={() => setSelectedStaff(null)}
                    >
                      {t("faculty.modal.contactBtn")}
                    </button>
                    <button
                      className="flex-1 py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 active:scale-95 transition-all"
                      onClick={() => setSelectedStaff(null)}
                    >
                      {t("faculty.modal.closeBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Faculty;
