import { Link } from "react-router-dom";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";
import { Microscope } from "lucide-react";
import { Briefcase } from "lucide-react";

const PARTNERS = [
  "Uzbektelecom",
  "IT Park Uzbekistan",
  "Samsung R&D",
  "Huawei Central Asia",
  "Cisco Academy",
  "Microsoft Imagine",
  "Google Developer Groups",
  "EPAM Systems",
];

const STATS = [
  { value: "12,000+", label: "Talabalar", icon: GraduationCap },
  { value: "340+", label: "O'qituvchilar", icon: Users },
  { value: "85+", label: "Ilmiy Laboratoriya", icon: Microscope },
  { value: "96%", label: "Ish bilan Ta'minlash", icon: Briefcase },
];

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

const NEWS = [
  {
    id: 1,
    cat: "Tadqiqot",
    icon: "🔬",
    date: "10 Mart, 2026",
    title: "TATU tadqiqotchilari O'zbek tili uchun yangi AI modeli yaratdi",
    excerpt:
      "Sun'iy intellekt tadqiqot markazidagi jamoa O'zbek NLP testlarida 94% aniqlikka erishgan yangi transformer modelini e'lon qildi.",
  },
  {
    id: 2,
    cat: "Hamkorlik",
    icon: "🤝",
    date: "5 Mart, 2026",
    title:
      "Samsung R&D bilan o'rnatilgan tizimlar laboratoriyasi shartnomasi imzolandi",
    excerpt:
      "TATU Muhandislik Maktabi va Samsung Electronics 5 yillik hamkorlik shartnomasini rasmiylashtirdi.",
  },
  {
    id: 3,
    cat: "Yutuq",
    icon: "🏆",
    date: "28 Fevral, 2026",
    title:
      "Talabalar Markaziy Osiyo Robototexnika Olimpiadasida 1-o'rinni egalladilar",
    excerpt:
      "To'rt nafar bakalavr talabadan iborat jamoa Olmaotada bo'lib o'tgan olimpiadada 14 mamlakatdan raqobatchilarni mag'lub etdi.",
  },
  {
    id: 4,
    cat: "Tadbir",
    icon: "📅",
    date: "20 Fevral, 2026",
    title: "Xalqaro Tech Summit 2026 TATU kampusida bo'lib o'tdi",
    excerpt:
      "2,000 dan ortiq muhandislar, tadqiqotchilar va sanoat vakillari uch kunlik anjumanga yig'ildi.",
  },
];

const NEWS_BADGE = {
  Tadqiqot: "bg-blue-50 text-blue-700",
  Hamkorlik: "bg-emerald-50 text-emerald-700",
  Yutuq: "bg-amber-50 text-amber-700",
  Tadbir: "bg-violet-50 text-violet-700",
};

const EVENTS = [
  {
    date: "Mar 20",
    title: "Ochiq Eshiklar Kuni — Muhandislik Kampusi",
    type: "Qabul",
  },
  {
    date: "Mar 25",
    title: "Xакатон: Aqlli O'zbekiston 2026",
    type: "Musobaqa",
  },
  {
    date: "Apr 2",
    title: "PhD Himoya: Ilg'or Mashinali O'rganish",
    type: "Akademik",
  },
  {
    date: "Apr 10",
    title: "Karyera Yarmarkasi — Texnologiya & Muhandislik",
    type: "Karyera",
  },
  {
    date: "Apr 18",
    title: "IEEE Talabalar Filiali Konferensiyasi",
    type: "Konferensiya",
  },
];

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

function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-[#0a1628] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute -right-24 top-[20%] w-[600px] h-[600px] bg-amber-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute -left-36 bottom-0 w-[500px] h-[500px] bg-blue-600/[0.1] rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[11px] font-black tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                Markaziy Osiyoda №1 Muhandislik Maktabi
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Texnologiya
                <br />
                <span className="text-amber-400">Kelajagini</span>
                <br />
                Yarating
              </h1>

              <p className="text-white/65 text-lg leading-relaxed max-w-lg mb-10">
                TATU Muhandislik Maktabi — O'zbekistonning raqamli
                transformatsiyasi uchun innovatorlar, tadqiqotchilar va
                texnologiya liderlarini tayyorlaydigan yetakchi muassasasi.
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  to={"admissions"}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base px-9 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25"
                >
                  2026 uchun Ariza →
                </Link>
                <Link
                  to={"programs"}
                  className="bg-white/10 hover:bg-white/18 border border-white/25 text-white font-semibold text-base px-9 py-4 rounded-xl transition-all"
                >
                  Dasturlarni Ko'rish
                </Link>
              </div>

              <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
                {STATS.slice(0, 3).map((s) => (
                  <div key={s.label}>
                    <p className="text-amber-400 text-3xl font-black leading-none">
                      {s.value}
                    </p>
                    <p className="text-white/45 text-xs mt-1.5 tracking-wide">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right floating cards */}
            <div className="relative hidden lg:block h-[480px]">
              {/* Featured program card */}
              <div className="absolute right-0 top-8 w-80 bg-white/[0.07] border border-white/12 rounded-2xl p-7 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-white/45 text-[10px] tracking-[0.12em] uppercase mb-1">
                      Tavsiya Etilgan Dastur
                    </p>
                    <h3 className="text-white font-extrabold text-lg leading-snug">
                      MSc Sun'iy Intellekt
                    </h3>
                  </div>
                  <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest">
                    HOT
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap mb-5">
                  {["NLP", "Deep Learning", "Robotika"].map((t) => (
                    <span
                      key={t}
                      className="bg-amber-500/20 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 grid grid-cols-3 text-center gap-3">
                  {[
                    ["2 yil", "Muddati"],
                    ["30", "O'rin"],
                    ["Avg '26", "Qabul"],
                  ].map(([v, l]) => (
                    <div key={l}>
                      <p className="text-white font-black text-xl leading-none">
                        {v}
                      </p>
                      <p className="text-white/40 text-[10px] mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Event card */}
              <div className="absolute left-0 top-44 w-56 bg-blue-700/90 border border-white/15 rounded-2xl p-5">
                <p className="text-white/50 text-[10px] tracking-widest uppercase mb-2">
                  Keyingi Tadbir
                </p>
                <h4 className="text-white font-extrabold text-sm leading-snug mb-3">
                  Ochiq Eshiklar Kuni — Muhandislik
                </h4>
                <p className="text-amber-400 text-sm font-bold">
                  20 Mart, 2026
                </p>
              </div>

              {/* Ranking badge */}
              <div className="absolute right-5 bottom-16 bg-amber-500 rounded-2xl p-5 text-center shadow-2xl shadow-amber-500/40">
                <p className="text-white font-black text-4xl leading-none">
                  #1
                </p>
                <p className="text-white/80 text-xs font-bold mt-1">
                  Markaziy Osiyo
                </p>
                <p className="text-white/55 text-[10px] mt-0.5">
                  Muhandislik 2025
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>Pastga o'ting</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-amber-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {STATS.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="py-8 px-6 flex flex-col items-center justify-center text-center"
              >
                {/* Ikonka uchun konteyner */}
                <div className="bg-white/10 p-3 rounded-xl mb-3 text-white">
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <p className="text-white font-black text-3xl md:text-4xl leading-none">
                  {s.value}
                </p>
                <p className="text-white/80 text-sm md:text-base mt-2 font-medium tracking-wide">
                  {s.label}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <SectionLabel>Biz Haqimizda</SectionLabel>
            <SectionTitle>
              O'zbekistonning Yetakchi Muhandislik Muassasasi
            </SectionTitle>
            <SectionSubtitle>
              1955 yilda Toshkent Politexnika Instituti Muhandislik Fakulteti
              sifatida tashkil etilgan TATU Muhandislik Maktabi O'zbekistonning
              raqamli transformatsiyasini shakllantiradigan jahon darajasidagi
              muassasaga aylandi.
            </SectionSubtitle>
            <ul className="mt-7 space-y-5 mb-9">
              {[
                {
                  t: "Ta'limda Mukammallik",
                  d: "Global muhandislik standartlariga mos, tadqiqotga asoslangan o'quv dasturi",
                },
                {
                  t: "Sanoat Integratsiyasi",
                  d: "Amaliy bitiruvchilar tayorlaydigan yetakchi texnologiya kompaniyalari bilan kuchli hamkorlik",
                },
                {
                  t: "Global Tadqiqot Tarmog'i",
                  d: "Dunyo bo'ylab 50+ universitet va tadqiqot markazlari bilan faol hamkorlik",
                },
              ].map((item) => (
                <li key={item.t} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <div>
                    <p className="font-extrabold text-slate-900 text-[15px] mb-0.5">
                      {item.t}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to={"about"}
              className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Tariximizni O'qing →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              {
                l: "Tashkil Topgan",
                v: "1955",
                s: "70 yillik an'ana",
                cls: "bg-[#0a1628]",
              },
              {
                l: "Akkreditatsiya",
                v: "ISO",
                s: "9001:2015 Sertifikat",
                cls: "bg-blue-700",
              },
              {
                l: "Tadqiqot Byudjeti",
                v: "$8M",
                s: "Yillik R&D mablag'i",
                cls: "bg-amber-500",
              },
              {
                l: "Bitiruvchilar",
                v: "45K+",
                s: "Global mutaxassislar",
                cls: "bg-emerald-600",
              },
            ].map((c) => (
              <div key={c.l} className={`${c.cls} text-white rounded-2xl p-7`}>
                <p className="text-white/55 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">
                  {c.l}
                </p>
                <p className="font-black text-4xl leading-none">{c.v}</p>
                <p className="text-white/65 text-sm mt-2">{c.s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>Akademik Dasturlar</SectionLabel>
            <SectionTitle>Jahon Darajasidagi Muhandislik Diplomi</SectionTitle>
            <SectionSubtitle>
              Oltita keng muhandislik yo'nalishi — sizni dunyoning eng talabchan
              muhandislik rollariga tayyorlash uchun yaratilgan.
            </SectionSubtitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {PROGRAMS.map((prog) => (
              <Link
                key={prog.id}
                to={"programs"}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent"
              >
                <div className="h-1 w-full" style={{ background: prog.hex }} />
                <div className="p-7">
                  <div className="flex justify-between items-start mb-5">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: prog.hex + "1a" }}
                    >
                      {prog.icon}
                    </div>
                    <span
                      className="text-[11px] font-black px-2.5 py-1.5 rounded-lg tracking-widest"
                      style={{ background: prog.hex + "15", color: prog.hex }}
                    >
                      {prog.code}
                    </span>
                  </div>
                  <h3 className="text-[16px] font-extrabold text-slate-900 mb-2 leading-snug group-hover:text-blue-700 transition-colors">
                    {prog.title}
                  </h3>
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
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100 text-[12px] text-slate-400">
                    <span>🎓 {prog.degree}</span>
                    <span>⏱ {prog.duration}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={"programs"}
              className="border-2 border-[#0a1628] text-[#0a1628] hover:bg-[#0a1628] hover:text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-all duration-200"
            >
              Barcha Dasturlarni Ko'rish →
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS + EVENTS ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-16">
          {/* News */}
          <div>
            <SectionLabel>So'nggi Yangiliklar</SectionLabel>
            <SectionTitle>Kampus va Undan Tashqarida</SectionTitle>
            <div className="mt-8 space-y-5">
              {NEWS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex gap-5 p-5 rounded-2xl border border-slate-200 cursor-pointer group hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-150"
                >
                  <div className="w-[88px] h-20 flex-shrink-0 rounded-xl bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-4xl">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_BADGE[item.cat] || "bg-slate-100 text-slate-600"}`}
                      >
                        {item.cat}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {item.date}
                      </span>
                    </div>
                    <h4 className="text-[15px] font-extrabold text-slate-900 mb-1.5 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-[13px] text-slate-500 leading-relaxed line-clamp-2">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Link
                to={"news"}
                className="mt-10 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all duration-150"
              >
                Barcha Yangiliklar →
              </Link>
            </div>
          </div>

          {/* Events */}
          <div>
            <SectionLabel>Tadbirlar</SectionLabel>
            <SectionTitle>Nima Bo'lyapti</SectionTitle>
            <div className="mt-8 space-y-3">
              {EVENTS.map((ev, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="bg-[#0a1628] text-white rounded-xl px-3.5 py-2.5 text-center flex-shrink-0 min-w-[56px]">
                    <p className="font-black text-lg leading-none">
                      {ev.date.split(" ")[1]}
                    </p>
                    <p className="text-white/50 text-[10px] uppercase mt-0.5">
                      {ev.date.split(" ")[0]}
                    </p>
                  </div>
                  <div>
                    <p className="text-[14px] font-extrabold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {ev.title}
                    </p>
                    <p className="text-amber-600 text-[12px] font-bold mt-1">
                      {ev.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FACULTY PREVIEW ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>O'qituvchilar</SectionLabel>
            <SectionTitle>Jahon Darajasidagi Olimlar</SectionTitle>
            <SectionSubtitle>
              O'qituvchilarimiz o'z sohalarida yetakchi — nashr etilgan,
              mukofotlangan va talabalar muvaffaqiyatiga chin dildan
              bag'ishlangan.
            </SectionSubtitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {FACULTY.slice(0, 3).map((m) => (
              <Link
                key={m.id}
                to={"faculty"}
                className="bg-white rounded-2xl p-8 border border-slate-200 text-center cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
              >
                <div
                  className={`w-16 h-16 ${m.avatarCls} rounded-full flex items-center justify-center text-white text-xl font-black mx-auto mb-5`}
                >
                  {m.initials}
                </div>
                <h4 className="text-[16px] font-extrabold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">
                  {m.name}
                </h4>
                <p className="text-blue-700 font-bold text-[13px] mb-1">
                  {m.role}
                </p>
                <p className="text-slate-400 text-[12px] mb-4">{m.dept}</p>
                <div className="bg-slate-50 rounded-xl p-3 text-[13px] text-slate-600 mb-3">
                  {m.research}
                </div>
                <p className="text-slate-400 text-xs">📄 {m.pubs} ta nashr</p>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              to={"faculty"}
              className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Barcha O'qituvchilar →
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      {/* <section className="bg-[#0a1628] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <p className="text-amber-400 text-[11px] font-black tracking-[0.15em] uppercase mb-3">
              Sanoat Hamkorlari
            </p>
            <h3 className="text-white font-extrabold text-2xl">
              Sanoat Yetakchilari Ishonchi
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="bg-white/[0.07] hover:bg-amber-500/20 border border-white/12 hover:border-amber-500/40 text-white/70 hover:text-amber-300 text-sm font-semibold px-6 py-3 rounded-xl cursor-pointer transition-all duration-150"
              >
                {p}
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section className="bg-[#0a1628] py-20 relative overflow-hidden">
        {/* Dekorativ elementlar qo'shish orqali chuqurlik yaratamiz */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase bg-amber-500/10 rounded-full border border-amber-500/20">
              Sanoat Hamkorlari
            </span>
            <h3 className="text-white font-extrabold text-3xl md:text-4xl">
              Sanoat Yetakchilari Ishonchi
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="group relative bg-white/[0.03] border border-white/5 p-6 rounded-2xl 
                     hover:bg-amber-500/5 hover:border-amber-500/30 
                     transition-all duration-300 flex items-center justify-center text-center"
              >
                {/* Matn ko'rinishini yanada jozibali qilish */}
                <span className="text-white/60 group-hover:text-amber-100 font-medium tracking-wide transition-colors">
                  {p}
                </span>

                {/* Hover effekti uchun pastki chiziqcha */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-gradient-to-br from-blue-700 to-blue-900 py-24 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/[0.03] rounded-full" />
        <div className="absolute -left-14 -bottom-14 w-64 h-64 bg-white/[0.03] rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Kelajakni Muhandislik Qilishga Tayyormisiz?
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            12,000+ talabaga qo'shiling va O'zbekistonning eng innovatsion
            muhandislik hamjamiyatining bir qismiga aylaning. 2026 o'quv yili
            uchun arizalar qabul qilinmoqda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={"admissions"}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-base px-10 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25"
            >
              Ariza Topshirish — Bepul
            </Link>
            <Link
              to={"contact"}
              className="bg-white/12 hover:bg-white/20 border border-white/30 text-white font-bold text-base px-10 py-4 rounded-xl transition-all"
            >
              Tashrif Rejalashtirish
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
