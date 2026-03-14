import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
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
function Admissions() {
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
        crumb="Qabul"
        title="Qabul 2026"
        subtitle="Muhandislik sayohatingizni boshlang. 2026 o'quv yili uchun arizalar qabul qilinmoqda."
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] gap-16">
            {/* Left: Steps */}
            <div>
              <SectionLabel>Qanday Ariza Topshirish</SectionLabel>
              <div className="mt-1 mb-10">
                <SectionTitle>TATU Sari Yo'lingiz</SectionTitle>
              </div>

              <div className="space-y-7 mb-14">
                {[
                  {
                    n: "01",
                    title: "Ariza Topshirish",
                    date: "Mar 1 – Iyun 30, 2026",
                    desc: "Barcha shaxsiy va akademik ma'lumotlar bilan onlayn ariza shaklini to'ldiring.",
                  },
                  {
                    n: "02",
                    title: "Hujjat Yuklash",
                    date: "Ariza topshirilgandan keyin",
                    desc: "Pasport nusxasi, akademik shahodatnoma, til sertifikati (IELTS 6.0+) va motivatsiya xati.",
                  },
                  {
                    n: "03",
                    title: "Kirish Imtihoni",
                    date: "Iyul 15–20, 2026",
                    desc: "Matematika va yo'nalish bo'yicha maxsus test. Top abituriyentlar oldingi akademik ko'rsatkich asosida qabul qilinadi.",
                  },
                  {
                    n: "04",
                    title: "Suhbat",
                    date: "Avgust 1–10, 2026",
                    desc: "Tanlangan nomzodlar dastur komissiyasi bilan 30 daqiqalik onlayn yoki shaxsiy suhbatda ishtirok etadi.",
                  },
                  {
                    n: "05",
                    title: "Qaror Olish",
                    date: "Avgust 15, 2026",
                    desc: "Barcha abituriyentlarga elektron pochta va ariza portali orqali qabul qarorlari e'lon qilinadi.",
                  },
                ].map((s) => (
                  <div key={s.n} className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-amber-500 text-white font-black text-base rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/25">
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
                ))}
              </div>

              {/* Tuition */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8">
                <h3 className="text-xl font-extrabold text-slate-900 mb-6">
                  O'quv To'lovi
                </h3>
                <div className="grid grid-cols-3 gap-4 mb-5">
                  {[
                    { lvl: "Bakalavr", fee: "$2,400", per: "/yil" },
                    { lvl: "Magistr", fee: "$3,200", per: "/yil" },
                    {
                      lvl: "PhD",
                      fee: "Moliyalashtiriladi",
                      per: "+ stipendiya",
                    },
                  ].map((f) => (
                    <div
                      key={f.lvl}
                      className="bg-slate-50 rounded-xl p-5 text-center"
                    >
                      <p className="text-slate-400 text-[12px] mb-2">{f.lvl}</p>
                      <p className="text-slate-900 font-black text-[20px] leading-none">
                        {f.fee}
                      </p>
                      <p className="text-slate-400 text-[11px] mt-1">{f.per}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium">
                  🎓 O'quv to'lovining 50–100% ni qoplaydigan yutuqqa asoslangan
                  stipendiyalar mavjud
                </div>
              </div>
            </div>

            {/* Right: Sticky form */}
            <div className="xl:sticky xl:top-24 self-start">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                {/* Progress */}
                <div className="bg-[#0a1628] px-8 py-7">
                  <p className="text-white font-extrabold text-xl mb-5">
                    Arizangizni Boshlang
                  </p>
                  <div className="flex gap-1.5 mb-3">
                    {STEPS.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-300 ${i <= step ? "bg-amber-400" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/50 text-xs">
                    Qadam {step + 1} / {STEPS.length}:{" "}
                    <span className="text-white/80 font-semibold">
                      {STEPS[step]}
                    </span>
                  </p>
                </div>

                <div className="p-8">
                  {/* Step 0: Personal Info */}
                  {step === 0 && (
                    <div className="space-y-5">
                      {[
                        {
                          key: "name",
                          label: "To'liq Ism *",
                          ph: "Akbar Toshmatov",
                        },
                        {
                          key: "email",
                          label: "Elektron Pochta *",
                          ph: "akbar@email.com",
                        },
                        {
                          key: "phone",
                          label: "Telefon Raqami",
                          ph: "+998 90 123 45 67",
                        },
                      ].map((f) => (
                        <div key={f.key}>
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
                      ))}
                    </div>
                  )}

                  {/* Step 1: Program */}
                  {step === 1 && (
                    <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
                      <label className="block text-[13px] font-extrabold text-slate-800 mb-3">
                        Dasturni Tanlang *
                      </label>
                      {PROGRAMS.map((prog) => (
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
                            <span className="text-blue-600 font-black text-lg flex-shrink-0">
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
                        Quyidagi hujjatlarni yuklang:
                      </p>
                      {[
                        "Akademik Shahodatnoma",
                        "Til Sertifikati (IELTS/TOEFL)",
                        "Motivatsiya Xati",
                        "Pasport Nusxasi",
                      ].map((doc) => (
                        <div
                          key={doc}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <p className="text-sm font-extrabold text-slate-800">
                              {doc}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                              PDF formatida, maksimal 5 MB
                            </p>
                          </div>
                          <button className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-lg transition-colors flex-shrink-0 ml-3">
                            Yuklash
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {step === 3 && (
                    <div>
                      <div className="bg-slate-50 rounded-2xl p-5 mb-5">
                        <p className="font-extrabold text-slate-900 text-[15px] mb-4">
                          Ariza Xulasasi
                        </p>
                        {[
                          ["Ism", form.name || "—"],
                          ["Email", form.email || "—"],
                          ["Telefon", form.phone || "—"],
                          ["Dastur", form.program || "—"],
                        ].map(([k, v]) => (
                          <div
                            key={k}
                            className="flex justify-between py-2.5 border-b border-slate-200 last:border-0 text-sm"
                          >
                            <span className="text-slate-400 font-medium">
                              {k}
                            </span>
                            <span className="text-slate-800 font-bold truncate max-w-[200px] text-right">
                              {v}
                            </span>
                          </div>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Yuborish orqali siz TATU Qabul Shartlari bilan kelishgan
                        holda barcha ko'rsatilgan ma'lumotlar to'g'riligini
                        tasdiqlaysiz.
                      </p>
                    </div>
                  )}

                  <div className={`flex gap-3 mt-7`}>
                    {step > 0 && (
                      <button
                        onClick={() => setStep((s) => s - 1)}
                        className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all text-sm"
                      >
                        ← Orqaga
                      </button>
                    )}
                    <button
                      onClick={() => {
                        if (step < STEPS.length - 1) setStep((s) => s + 1);
                        else
                          alert(
                            "Arizangiz muvaffaqiyatli yuborildi! Tez orada siz bilan bog'lanamiz. 🎉",
                          );
                      }}
                      className="flex-[2] bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 text-sm"
                    >
                      {step < STEPS.length - 1
                        ? "Davom Etish →"
                        : "Ariza Yuborish 🚀"}
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
