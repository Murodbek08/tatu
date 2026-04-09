// pages/Faculty/Faculty.jsx — animatsiyalangan versiya
// Qo'shilgan: card hover-lift, stagger grid, modal fade-in

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Send,
  Instagram,
  Facebook,
  Mail,
  X,
  Search,
  FileText,
} from "lucide-react";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { useTranslation } from "react-i18next";

const FACULTY_META = [
  {
    id: 1,
    initials: "AT",
    avatarCls: "bg-blue-600",
    email: "a.toshmatov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Akbar",
    phone: "+998 90 123 45 67",
    telegram: "https://t.me/a_toshmatov",
    instagram: "https://instagram.com/a.toshmatov",
    facebook: "https://facebook.com/a.toshmatov",
  },
  {
    id: 2,
    initials: "NY",
    avatarCls: "bg-emerald-600",
    email: "n.yusupova@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
    phone: "+998 91 234 56 78",
    telegram: "https://t.me/n_yusupova",
    instagram: "https://instagram.com/n.yusupova",
    facebook: "https://facebook.com/n.yusupova",
  },
  {
    id: 3,
    initials: "SR",
    avatarCls: "bg-amber-600",
    email: "s.rakhimov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=George",
    phone: "+998 93 345 67 89",
    telegram: "https://t.me/s_rakhimov",
    instagram: "https://instagram.com/s.rakhimov",
    facebook: "https://facebook.com/s.rakhimov",
  },
  {
    id: 4,
    initials: "KM",
    avatarCls: "bg-rose-600",
    email: "k.mirzayeva@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vivian",
    phone: "+998 94 456 78 90",
    telegram: "https://t.me/k_mirzayeva",
    instagram: "https://instagram.com/k.mirzayeva",
    facebook: "https://facebook.com/k.mirzayeva",
  },
  {
    id: 5,
    initials: "ON",
    avatarCls: "bg-violet-600",
    email: "o.nazarov@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    phone: "+998 95 567 89 01",
    telegram: "https://t.me/o_nazarov",
    instagram: "https://instagram.com/o.nazarov",
    facebook: "https://facebook.com/o.nazarov",
  },
  {
    id: 6,
    initials: "ZE",
    avatarCls: "bg-cyan-600",
    email: "z.ergasheva@univ.uz",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    phone: "+998 97 678 90 12",
    telegram: "https://t.me/z_ergasheva",
    instagram: "https://instagram.com/z.ergasheva",
    facebook: "https://facebook.com/z.ergasheva",
  },
];

const CONTACT_LINKS = [
  {
    key: "phone",
    label: "Telefon",
    Icon: Phone,
    href: (s) => `tel:${s.phone?.replace(/\s/g, "")}`,
    value: (s) => s.phone,
    wrapperCls: "bg-green-50 border-green-100 hover:bg-green-100",
    textCls: "text-green-800",
    iconBg: "bg-green-100",
    iconCls: "text-green-600",
  },
  {
    key: "telegram",
    label: "Telegram",
    Icon: Send,
    href: (s) => s.telegram,
    value: (s) => s.telegram?.replace("https://t.me/", "@"),
    wrapperCls: "bg-sky-50 border-sky-100 hover:bg-sky-100",
    textCls: "text-sky-800",
    iconBg: "bg-sky-100",
    iconCls: "text-sky-600",
  },
  {
    key: "instagram",
    label: "Instagram",
    Icon: Instagram,
    href: (s) => s.instagram,
    value: (s) => s.instagram?.replace("https://instagram.com/", "@"),
    wrapperCls: "bg-pink-50 border-pink-100 hover:bg-pink-100",
    textCls: "text-pink-800",
    iconBg: "bg-pink-100",
    iconCls: "text-pink-600",
  },
  {
    key: "facebook",
    label: "Facebook",
    Icon: Facebook,
    href: (s) => s.facebook,
    value: (s) => s.facebook?.replace("https://facebook.com/", ""),
    wrapperCls: "bg-blue-50 border-blue-100 hover:bg-blue-100",
    textCls: "text-blue-800",
    iconBg: "bg-blue-100",
    iconCls: "text-blue-600",
  },
  {
    key: "email",
    label: "Email",
    Icon: Mail,
    href: (s) => `mailto:${s.email}`,
    value: (s) => s.email,
    wrapperCls: "bg-amber-50 border-amber-100 hover:bg-amber-100",
    textCls: "text-amber-800",
    iconBg: "bg-amber-100",
    iconCls: "text-amber-600",
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Faculty() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showContact, setShowContact] = useState(false);

  const list = t("faculty.list", { returnObjects: true }) || [];
  const mergedFaculty = list.map((item, index) => ({
    ...item,
    ...FACULTY_META[index],
  }));
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
        <div className="max-w-7xl mx-auto relative">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none"
          />
          <input
            type="text"
            placeholder={t("faculty.searchPlaceholder")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md bg-white/10 border border-white/20 text-white placeholder-white/40 rounded-xl pl-10 pr-5 py-3 text-sm focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Cards */}
      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            key={search} // search o'zgarganda qayta animate
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {visible.map((m) => (
              <motion.div
                key={m.id}
                variants={cardItem}
                whileHover={{
                  y: -6,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                onClick={() => {
                  setSelectedStaff(m);
                  setShowContact(false);
                }}
                className="bg-white rounded-2xl p-8 border border-slate-200 cursor-pointer group relative overflow-hidden"
              >
                {/* Accent top line on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 ${m.avatarCls} scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}
                />

                <div className="flex gap-4 mb-6">
                  <div className="relative shrink-0">
                    <div
                      className={`w-16 h-16 ${m.avatarCls} rounded-full flex items-center justify-center text-white text-lg font-black overflow-hidden border-2 border-white shadow-sm group-hover:scale-105 transition-transform duration-300`}
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
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FileText size={13} /> {m.pubs} {t("faculty.pubsLabel")}
                  </span>
                  <button
                    className={`${m.avatarCls} text-white text-[12px] font-bold px-4 py-1.5 rounded-lg hover:opacity-90 transition-opacity`}
                  >
                    {t("faculty.profileBtn")}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {visible.length === 0 && (
            <div className="text-center py-20 text-slate-400">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-semibold">{t("faculty.notFound")}</p>
            </div>
          )}

          {/* ── MODAL — AnimatePresence bilan ── */}
          <AnimatePresence>
            {selectedStaff && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10001] flex items-end md:items-center justify-center p-0 md:p-4"
              >
                {/* Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                  onClick={() => setSelectedStaff(null)}
                />

                {/* Modal body */}
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 40, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative bg-white w-full max-w-xl md:rounded-3xl rounded-t-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
                >
                  <div className="md:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mt-3 mb-1 shrink-0" />
                  <div
                    className={`h-20 ${selectedStaff.avatarCls} opacity-10 absolute top-0 left-0 w-full pointer-events-none`}
                  />

                  <div className="relative p-6 md:p-8 overflow-y-auto">
                    <button
                      onClick={() => setSelectedStaff(null)}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 shadow-sm text-slate-500 hover:bg-slate-100 transition-colors z-10"
                    >
                      <X size={16} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
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

                    <div className="mt-8 space-y-3">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setShowContact((v) => !v)}
                        className={`w-full py-3.5 rounded-xl text-white font-bold text-xs shadow-md transition-all ${selectedStaff.avatarCls}`}
                      >
                        {showContact
                          ? t("faculty.modal.hideContactBtn") || "▲ Yopish"
                          : t("faculty.modal.contactBtn")}
                      </motion.button>

                      <AnimatePresence>
                        {showContact && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="overflow-hidden flex flex-col gap-2"
                          >
                            {CONTACT_LINKS.map(
                              ({
                                key,
                                label,
                                Icon,
                                href,
                                value,
                                wrapperCls,
                                textCls,
                                iconBg,
                                iconCls,
                              }) => {
                                const val = value(selectedStaff);
                                if (!val) return null;
                                return (
                                  <a
                                    key={key}
                                    href={href(selectedStaff)}
                                    target={
                                      key !== "phone" && key !== "email"
                                        ? "_blank"
                                        : undefined
                                    }
                                    rel="noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${wrapperCls}`}
                                  >
                                    <span
                                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${iconBg} ${iconCls}`}
                                    >
                                      <Icon size={16} />
                                    </span>
                                    <div className="min-w-0">
                                      <p
                                        className={`text-[10px] font-bold uppercase tracking-widest opacity-60 ${textCls}`}
                                      >
                                        {label}
                                      </p>
                                      <p
                                        className={`text-[13px] font-semibold truncate ${textCls}`}
                                      >
                                        {val}
                                      </p>
                                    </div>
                                  </a>
                                );
                              },
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-3.5 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs hover:bg-slate-200 transition-all"
                        onClick={() => setSelectedStaff(null)}
                      >
                        {t("faculty.modal.closeBtn")}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default Faculty;
