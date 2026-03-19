import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import { useTranslation } from "react-i18next";

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
    desc: "Algoritmlar, sun'iy intellekt, mashinali o'rganish va dasturiy muhandislik.",
    details:
      "Ushbu yo'nalishda siz zamonaviy dasturlash tillari, algoritmlar va sun'iy intellektning fundamental asoslarini o'rganasiz. Kurs dekani Prof. Akbar Toshmatov boshchiligida siz 4 yil davomida nazariy bilimlarni real loyihalar bilan mustahkamlab borasiz.",
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
    desc: "Apparat-dasturiy integratsiya, o'rnatilgan tizimlar va IoT ilovalari.",
    details:
      "Kompyuter muhandisligi yo'nalishi apparat vositalari (hardware) va dasturiy ta'minot o'rtasidagi bog'liqlikka qaratilgan. Siz mikrokontrollerlar, aqlli uylar tizimi va robototexnika qurilmalarini loyihalashni o'rganasiz.",
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
    desc: "Korporativ tizimlar, bulutli arxitektura va kiberxavfsizlik.",
    details:
      "Axborot texnologiyalari mutaxassisi sifatida siz yirik korxonalar uchun bulutli tizimlar qurish, ma'lumotlar xavfsizligini ta'minlash va tizim administratori ko'nikmalarini egallaysiz.",
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
    desc: "Katta ma'lumotlar, statistik modellashtirish va biznes razvedkasi.",
    details:
      "Dr. Nilufar Yusupova rahbarligidagi ushbu yo'nalishda siz ma'lumotlar tahlili (Data Analysis) va bashorat qiluvchi modellarni yaratishni o'rganasiz. Bu bugungi kunda bozordagi eng talabgir kasblardan biri hisoblanadi.",
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
    desc: "Energiya tizimlari, signal qayta ishlash va aqlli tarmoqlar.",
    details:
      "Elektr muhandisligi yo'nalishi qayta tiklanuvchi energiya manbalari va telekommunikatsiya qurilmalarini o'rganadi. Prof. Sherzod Rahimov boshchiligida siz aqlli elektr tarmoqlari (Smart Grids) bo'yicha chuqur bilim olasiz.",
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
    desc: "Chuqur o'rganish, NLP, kompyuter ko'rishi va robotika tadqiqoti.",
    details:
      "Bu faqat Magistr va PhD talabalari uchun mo'ljallangan chuqurlashtirilgan tadqiqot yo'nalishidir. Siz neyron tarmoqlari, nutqni aniqlash va avtonom robotlarni yaratish bo'yicha laboratoriyalarda tajriba o'tkazasiz.",
  },
];
function Admissions() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
  });
  const STEPS = [
    "Shaxsiy Ma'lumot",
    "Dastur Tanlash",
    "Hujjatlar",
    "Ko'rib Chiqish",
  ];

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div>
      <PageHero
        crumb={t("admissions.hero.crumb")}
        title={t("admissions.hero.title")}
        subtitle={t("admissions.hero.subtitle")}
      />
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] gap-16">
            {/* Left: Steps */}
            <div>
              <SectionLabel>{t("admissions.steps.sectionLabel")}</SectionLabel>
              <div className="mt-1 mb-10">
                <SectionTitle>{t("admissions.steps.title")}</SectionTitle>
              </div>

              <div className="space-y-7 mb-14">
                {t("admissions.steps.list", { returnObjects: true }).map(
                  (s) => (
                    <div key={s.n} className="flex gap-5 items-start">
                      <div className="w-12 h-12 bg-amber-500 text-white font-black text-base rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                        {s.n}
                      </div>
                      <div>
                        <h4 className="text-[16px] font-extrabold text-slate-900 mb-0.5">
                          {s.title}
                        </h4>
                        <p className="text-amber-600 font-bold text-xs mb-1.5 tracking-wide">
                          {s.date}
                        </p>
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Tuition */}

              <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6">
                  {t("admissions.tuition.title")}
                </h3>

                {/* Grid: Mobilda 1 ta ustun, o'rta ekranda (sm) 2 ta, katta ekranda (lg) 3 ta */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {t("admissions.tuition.list", { returnObjects: true }).map(
                    (f) => (
                      <div
                        key={f.lvl}
                        className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-center text-center transition-all hover:shadow-md hover:bg-slate-100/50"
                      >
                        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                          {f.lvl}
                        </p>
                        <p className="text-slate-900 font-black text-xl sm:text-2xl leading-tight wrap-break-word">
                          {f.fee}
                        </p>
                        <p className="text-slate-400 text-[11px] mt-1 font-medium">
                          {f.per}
                        </p>
                      </div>
                    ),
                  )}
                </div>

                {/* Ogohlantirish qismi: Mobilda matn markazda, kattaroqda chapda */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium flex items-start sm:items-center gap-3">
                  <span className="text-lg">🎓</span>
                  <p className="leading-relaxed">
                    {t("admissions.tuition.scholarship")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Sticky form */}
            <div className="xl:sticky xl:top-24 self-start">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                {/* Progress */}
                <div className="bg-[#0a1628] px-8 py-7">
                  <p className="text-white font-extrabold text-xl mb-5">
                    {t("admissions.form.title")}
                  </p>
                  <div className="flex gap-1.5 mb-3">
                    {t("admissions.form.steps", { returnObjects: true }).map(
                      (_, i) => (
                        <div
                          key={i}
                          className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= step ? "bg-amber-400" : "bg-white/20"}`}
                        />
                      ),
                    )}
                  </div>
                  <p className="text-white/50 text-xs">
                    {t("admissions.form.stepLabel")} {step + 1} /{" "}
                    {t("admissions.form.steps", { returnObjects: true }).length}
                    :{" "}
                    <span className="text-white/80 font-semibold">
                      {
                        t("admissions.form.steps", { returnObjects: true })[
                          step
                        ]
                      }
                    </span>
                  </p>
                </div>

                <div className="p-8">
                  {/* Step 0: Personal Info */}
                  {step === 0 && (
                    <div className="space-y-5">
                      {t("admissions.form.fields", { returnObjects: true }).map(
                        (f) => (
                          <div key={f.label}>
                            <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                              {f.label}
                            </label>
                            <input
                              type="text"
                              placeholder={f.ph}
                              value={form[f.key]}
                              onChange={(e) => set(f.key, e.target.value)}
                              className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300 text-slate-800"
                            />
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* Step 1: Program */}
                  {step === 1 && (
                    <div className="space-y-2.5 max-h-105 overflow-y-auto pr-1">
                      <label className="block text-[13px] font-extrabold text-slate-800 mb-3">
                        {t("admissions.form.programLabel")}
                      </label>
                      {t("admissions.form.programs", {
                        returnObjects: true,
                      }).map((prog) => (
                        <div
                          key={prog.id}
                          onClick={() => set("program", prog.title)}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                            form.program === prog.title
                              ? "border-blue-500 bg-blue-50"
                              : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <span className="text-xl">{prog.icon}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[13px] font-extrabold text-slate-900 truncate">
                              {prog.title}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {prog.degree}
                            </p>
                          </div>
                          {form.program === prog.title && (
                            <span className="text-blue-600 font-black text-lg shrink-0">
                              ✓
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 2: Documents */}
                  {step === 2 && (
                    <div className="space-y-3">
                      <p className="text-sm font-bold text-slate-600 mb-4">
                        {t("admissions.form.docsTitle")}
                      </p>
                      {t("admissions.form.docs", { returnObjects: true }).map(
                        (doc) => (
                          <div
                            key={doc}
                            className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                          >
                            <div>
                              <p className="text-sm font-extrabold text-slate-800">
                                {doc}
                              </p>
                              <p className="text-[11px] text-slate-400 mt-0.5">
                                {t("admissions.form.docFormat")}
                              </p>
                            </div>
                            <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0 ml-3">
                              {t("admissions.form.uploadBtn")}
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {step === 3 && (
                    <div>
                      <div className="bg-slate-50 rounded-2xl p-5 mb-5">
                        <p className="font-extrabold text-slate-900 text-[15px] mb-4">
                          {t("admissions.form.reviewTitle")}
                        </p>
                        {[
                          {
                            label: t("admissions.form.reviewFields.name"),
                            value: form.name,
                          },
                          {
                            label: t("admissions.form.reviewFields.email"),
                            value: form.email,
                          },
                          {
                            label: t("admissions.form.reviewFields.phone"),
                            value: form.phone,
                          },
                          {
                            label: t("admissions.form.reviewFields.program"),
                            value: form.program,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-7 justify-between py-2.5 border-b border-slate-200 last:border-0 text-sm"
                          >
                            <span className="text-slate-400 font-medium">
                              {item.label}
                            </span>
                            <span className="text-slate-800 font-bold truncate max-w-50 text-right">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {t("admissions.form.reviewNote")}
                      </p>
                    </div>
                  )}

                  <div className={`flex gap-3 mt-7`}>
                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all text-sm"
                      >
                        {t("admissions.form.backBtn")}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (
                          step <
                          t("admissions.form.steps", { returnObjects: true })
                            .length -
                            1
                        )
                          setStep((s) => s + 1);
                        else alert(t("admissions.form.successMsg"));
                      }}
                      className="flex-2 bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 text-sm"
                    >
                      {step <
                      t("admissions.form.steps", { returnObjects: true })
                        .length -
                        1
                        ? t("admissions.form.nextBtn")
                        : t("admissions.form.submitBtn")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admissions;
