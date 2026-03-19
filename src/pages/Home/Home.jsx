import { Link } from "react-router-dom";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";
import { GraduationCap } from "lucide-react";
import { Users } from "lucide-react";
import { Microscope } from "lucide-react";
import { Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

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
const ICON_MAP = {
  users: GraduationCap,
  books: Users,
  award: Microscope,
  globe: Briefcase,
};
const cardStyles = [
  "bg-[#0a1628]",
  "bg-blue-700",
  "bg-amber-500",
  "bg-emerald-600",
];
const PROGRAMS_META = [
  { id: 1, code: "CS", icon: "💻", hex: "#1d4ed8" },
  { id: 2, code: "CE", icon: "🔧", hex: "#0891b2" },
  { id: 3, code: "IT", icon: "🌐", hex: "#7c3aed" },
  { id: 4, code: "DS", icon: "📊", hex: "#059669" },
  { id: 5, code: "EE", icon: "⚡", hex: "#d97706" },
  { id: 6, code: "AI", icon: "🤖", hex: "#e11d48" },
];
const NEWS_META = [
  { id: 1, icon: "🔬", cat_key: "Tadqiqot" },
  { id: 2, icon: "🤝", cat_key: "Hamkorlik" },
  { id: 3, icon: "🏆", cat_key: "Yutuq" },
  { id: 4, icon: "📅", cat_key: "Tadbir" },
];
const NEWS_BADGE = {
  Tadqiqot: "bg-purple-100 text-purple-600",
  Исследования: "bg-purple-100 text-purple-600",
  Hamkorlik: "bg-blue-100 text-blue-600",
  Сотрудничество: "bg-blue-100 text-blue-600",
  Yutuq: "bg-emerald-100 text-emerald-600",
  Достижение: "bg-emerald-100 text-emerald-600",
  Tadbir: "bg-amber-100 text-amber-600",
  Мероприятие: "bg-amber-100 text-amber-600",
};
const FACULTY_META = [
  { id: 1, initials: "AT", avatarCls: "bg-blue-600" },
  { id: 2, initials: "NY", avatarCls: "bg-emerald-600" },
  { id: 3, initials: "SR", avatarCls: "bg-amber-600" },
  { id: 4, initials: "KM", avatarCls: "bg-rose-600" },
  { id: 5, initials: "ON", avatarCls: "bg-violet-600" },
  { id: 6, initials: "ZE", avatarCls: "bg-cyan-600" },
];

function Home() {
  const { t } = useTranslation();
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
        <div className="absolute -right-24 top-[20%] w-150 h-150 bg-amber-500/[0.07] rounded-full blur-3xl" />
        <div className="absolute -left-36 bottom-0 w-125 h-125 bg-blue-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[11px] font-black tracking-[0.15em] uppercase px-4 py-2 rounded-full mb-8">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                {t("home.hero.badge")}
              </div>

              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-7"
                style={{ fontFamily: "Georgia, serif" }}
              >
                {t("home.hero.title1")}
                <br />
                <span className="text-amber-400"> {t("home.hero.title2")}</span>
                <br />
                {t("home.hero.title3")}
              </h1>

              <p className="text-white/65 text-lg leading-relaxed max-w-lg mb-10">
                {t("home.hero.subtitle")}
              </p>

              <div className="flex flex-wrap gap-4 mb-14">
                <Link
                  to={"admissions"}
                  className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-base px-9 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25"
                >
                  {t("home.hero.applyBtn")}
                </Link>
                <Link
                  to={"programs"}
                  className="bg-white/10 hover:bg-white/18 border border-white/25 text-white font-semibold text-base px-9 py-4 rounded-xl transition-all"
                >
                  {t("home.hero.programsBtn")}
                </Link>
              </div>

              <div className="flex flex-wrap gap-10 pt-8 border-t border-white/10">
                {t("home.stats", { returnObjects: true })
                  .slice(0, 3)
                  .map((s) => (
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
            <div className="relative hidden lg:block h-120">
              {/* Featured program card */}
              <div className="absolute right-0 top-8 w-80 bg-white/[0.07] border border-white/12 rounded-2xl p-7 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="text-white/45 text-[10px] tracking-[0.12em] uppercase mb-1">
                      {t("home.hero.floatingCard.label")}
                    </p>
                    <h3 className="text-white font-extrabold text-lg leading-snug">
                      {t("home.hero.floatingCard.title")}
                    </h3>
                  </div>
                  <span className="bg-amber-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg tracking-widest">
                    HOT
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap mb-5">
                  {t("home.hero.floatingCard.tags", {
                    returnObjects: true,
                  }).map((t) => (
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
                    [
                      t("home.hero.floatingCard.duration"),
                      t("home.hero.floatingCard.durationLabel"),
                    ],
                    [
                      t("home.hero.floatingCard.seats"),
                      t("home.hero.floatingCard.seatsLabel"),
                    ],
                    [
                      t("home.hero.floatingCard.intake"),
                      t("home.hero.floatingCard.intakeLabel"),
                    ],
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
                  {t("home.hero.eventCard.label")}
                </p>
                <h4 className="text-white font-extrabold text-sm leading-snug mb-3">
                  {t("home.hero.eventCard.title")}
                </h4>
                <p className="text-amber-400 text-sm font-bold">
                  {t("home.hero.eventCard.date")}
                </p>
              </div>

              {/* Ranking badge */}
              <div className="absolute right-5 bottom-16 bg-amber-500 rounded-2xl p-5 text-center shadow-2xl shadow-amber-500/40">
                <p className="text-white font-black text-4xl leading-none">
                  {t("home.hero.rankBadge.rank")}
                </p>
                <p className="text-white/80 text-xs font-bold mt-1">
                  {t("home.hero.rankBadge.region")}
                </p>
                <p className="text-white/55 text-[10px] mt-0.5">
                  {t("home.hero.rankBadge.label")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
          <span>{t("home.hero.scrollDown")}</span>
          <div className="w-px h-8 bg-white/20" />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="bg-amber-500">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-white/20">
          {t("home.stats", { returnObjects: true }).map((s) => {
            const Icon = ICON_MAP[s.icon] || Globe;
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
            <SectionLabel>{t("home.about.sectionLabel")}</SectionLabel>
            <SectionTitle>{t("home.about.title")}</SectionTitle>
            <SectionSubtitle>{t("home.about.subtitle")}</SectionSubtitle>
            <ul className="mt-7 space-y-5 mb-9">
              {t("home.about.points", { returnObjects: true }).map((item) => (
                <li key={item.t} className="flex gap-4 items-start">
                  <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <div>
                    <p className="font-extrabold text-slate-900 text-[15px] mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to={"about"}
              className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              {t("home.about.readMoreBtn")}
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {t("home.about.cards", { returnObjects: true }).map((c, index) => (
              <div
                key={c.label}
                className={`${cardStyles[index]} text-white rounded-2xl p-7`}
              >
                <p className="text-white/55 text-[10px] font-bold tracking-[0.12em] uppercase mb-2">
                  {c.label}
                </p>
                <p className="font-black text-4xl leading-none">{c.value}</p>
                <p className="text-white/65 text-sm mt-2">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel>{t("home.programs.sectionLabel")}</SectionLabel>
            <SectionTitle>{t("home.programs.title")}</SectionTitle>
            <SectionSubtitle>{t("home.programs.subtitle")}</SectionSubtitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
            {t("home.programs.list", { returnObjects: true }).map(
              (prog, index) => {
                const meta = PROGRAMS_META[index];
                return (
                  <Link
                    key={meta}
                    to={"programs"}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group transition-all duration-200 hover:-translate-y-1.5 hover:shadow-2xl hover:border-transparent"
                  >
                    <div
                      className="h-1 w-full"
                      style={{ background: meta.hex + "1a" }}
                    />
                    <div className="p-7">
                      <div className="flex justify-between items-start mb-5">
                        <div
                          className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl"
                          style={{ background: meta.hex + "1a" }}
                        >
                          {meta.icon}
                        </div>
                        <span
                          className="text-[11px] font-black px-2.5 py-1.5 rounded-lg tracking-widest"
                          style={{
                            background: meta.hex + "15",
                            color: meta.hex,
                          }}
                        >
                          {meta.code}
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
                            style={{
                              background: meta.hex + "12",
                              color: meta.hex,
                            }}
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
                );
              },
            )}
          </div>

          <div className="text-center">
            <Link
              to={"programs"}
              className="border-2 border-[#0a1628] text-[#0a1628] hover:bg-[#0a1628] hover:text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-all duration-200"
            >
              {t("home.programs.viewAllBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── NEWS + EVENTS ── */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-16">
          {/* News */}
          <div>
            <SectionLabel>{t("home.news.sectionLabel")}</SectionLabel>
            <SectionTitle>{t("home.news.title")}</SectionTitle>
            <div className="mt-8 space-y-5">
              {t("home.news.list", { returnObjects: true })
                .slice(0, 3)
                .map((item, index) => {
                  const meta = NEWS_META[index];
                  return (
                    <div
                      key={meta.id}
                      className="flex gap-5 p-5 rounded-2xl border border-slate-200 cursor-pointer group hover:border-blue-400 hover:bg-blue-50/40 transition-all duration-150"
                    >
                      <div className="w-22 h-20 shrink-0 rounded-xl bg-linear-to-br from-slate-100 to-blue-50 flex items-center justify-center text-4xl">
                        {meta.icon}
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
                  );
                })}
            </div>
            <div className="mt-6">
              <Link
                to={"news"}
                className="mt-10 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all duration-150"
              >
                {t("home.news.viewAllBtn")}
              </Link>
            </div>
          </div>

          {/* Events */}
          <div>
            <SectionLabel>{t("home.events.sectionLabel")}</SectionLabel>
            <SectionTitle>{t("home.events.title")}</SectionTitle>
            <div className="mt-8 space-y-3">
              {t("home.events.list", { returnObjects: true }).map((ev, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-center p-4 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors group"
                >
                  <div className="bg-[#0a1628] text-white rounded-xl px-3.5 py-2.5 text-center shrink-0 min-w-14">
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
            <SectionLabel>{t("home.faculty.sectionLabel")}</SectionLabel>
            <SectionTitle>{t("home.faculty.title")}</SectionTitle>
            <SectionSubtitle>{t("home.faculty.subtitle")}</SectionSubtitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {t("home.faculty.list", { returnObjects: true })
              .slice(0, 3)
              .map((m, index) => {
                const meta = FACULTY_META[index];
                return (
                  <Link
                    key={meta.id}
                    to={"faculty"}
                    className="bg-white rounded-2xl p-8 border border-slate-200 text-center cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
                  >
                    <div
                      className={`w-16 h-16 ${meta.avatarCls} rounded-full flex items-center justify-center text-white text-xl font-black mx-auto mb-5`}
                    >
                      {meta.initials}
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
                    <p className="text-slate-400 text-xs">
                      📄 {m.pubs} {t("home.faculty.pubsLabel")}
                    </p>
                  </Link>
                );
              })}
          </div>

          <div className="text-center">
            <Link
              to={"faculty"}
              className="bg-[#0a1628] hover:bg-[#0d1f3c] text-white font-bold text-sm px-10 py-3.5 rounded-xl transition-colors shadow-lg"
            >
              {t("home.faculty.viewAllBtn")}
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}

      <section className="bg-[#0a1628] py-20 relative overflow-hidden">
        {/* Dekorativ elementlar qo'shish orqali chuqurlik yaratamiz */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-amber-500/5 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 mb-4 text-[10px] font-bold tracking-[0.2em] text-amber-500 uppercase bg-amber-500/10 rounded-full border border-amber-500/20">
              {t("home.partners.sectionLabel")}
            </span>
            <h3 className="text-white font-extrabold text-3xl md:text-4xl">
              {t("home.partners.title")}
            </h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="group relative bg-white/3 border border-white/5 p-6 rounded-2xl 
                     hover:bg-amber-500/5 hover:border-amber-500/30 
                     transition-all duration-300 flex items-center justify-center text-center"
              >
                {/* Matn ko'rinishini yanada jozibali qilish */}
                <span className="text-white/60 group-hover:text-amber-100 font-medium tracking-wide transition-colors">
                  {p}
                </span>

                {/* Hover effekti uchun pastki chiziqcha */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-amber-500/0 to-transparent group-hover:via-amber-500/50 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-linear-to-br from-blue-700 to-blue-900 py-24 overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/3 rounded-full" />
        <div className="absolute -left-14 -bottom-14 w-64 h-64 bg-white/3 rounded-full" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight"
            style={{ fontFamily: "Georgia, serif" }}
          >
            {t("home.cta.title")}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed mb-10">
            {t("home.cta.subtitle")}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to={"admissions"}
              className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-base px-10 py-4 rounded-xl transition-all shadow-2xl shadow-amber-500/25"
            >
              {t("home.cta.applyBtn")}
            </Link>
            <Link
              to={"contact"}
              className="bg-white/12 hover:bg-white/20 border border-white/30 text-white font-bold text-base px-10 py-4 rounded-xl transition-all"
            >
              {t("home.cta.visitBtn")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
