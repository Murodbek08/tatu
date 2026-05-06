import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../../components/ui/PageHero";
import AnimatedSection from "../../components/ui/AnimatedSection";
import {
  Facebook,
  Instagram,
  Globe,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useTranslation } from "react-i18next";
import { request } from "../../api";
import SectionLabel from "../../components/ui/SectionLabel";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const socialLinks = [
  { name: "Web", icon: Globe, href: "https://tuit.uz/" },
  { name: "Telegram", icon: Send, href: "https://t.me/tuituz_official" },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/tuit.official",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/TUITuzb",
  },
];

function Contact() {
  const { t } = useTranslation();
  const position = [41.3409, 69.2867];
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const contactData = [
    {
      icon: MapPin,
      label: t("contact.contact_data.address.label"),
      value: t("contact.contact_data.address.value"),
      color: "#3de082",
    },
    {
      icon: Phone,
      label: t("contact.contact_data.phone.label"),
      value: t("contact.contact_data.phone.value"),
      color: "#892be2",
    },
    {
      icon: Mail,
      label: t("contact.contact_data.email.label"),
      value: t("contact.contact_data.email.value"),
      color: "#fbbf24",
    },
    {
      icon: Clock,
      label: t("contact.contact_data.working_hours.label"),
      value: t("contact.contact_data.working_hours.value"),
      color: "#3b82f6",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await request.post("/contact_messages", form);
      if (res.status === 201 || res.status === 200) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] font-inter antialiased">
      <PageHero
        crumb={t("contact.hero.crumb")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
      />

      <div className="py-16 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* ── 1. Ma'lumotlar va Xarita ── */}
            <div className="space-y-12">
              <div>
                <SectionLabel className="text-[#892be2] font-bold uppercase tracking-[0.15em] text-[10px] mb-4">
                  {t("contact.info_title")}
                </SectionLabel>
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Biz bilan aloqada bo'ling
                </h2>
              </div>

              {/* Kontakt Kartalari - Ixchamroq o'lchamda */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {contactData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-7 rounded-[2rem] border border-slate-100 shadow-sm relative overflow-hidden transition-all duration-300 hover:shadow-md"
                    style={{ borderLeft: `8px solid ${item.color}` }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                      style={{
                        backgroundColor: `${item.color}10`,
                        color: item.color,
                      }}
                    >
                      <item.icon size={24} />
                    </div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <p className="text-base font-bold text-slate-800 leading-snug">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Xarita */}
              <div className="h-72 w-full rounded-[2.5rem] overflow-hidden border-4 border-white shadow-lg relative z-0">
                <MapContainer
                  center={position}
                  zoom={15}
                  className="h-full w-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position}>
                    <Popup>{t("contact.mapPopup")}</Popup>
                  </Marker>
                </MapContainer>
              </div>

              {/* Ijtimoiy tarmoqlar */}
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white border border-slate-100 px-5 py-3 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                  >
                    <item.icon size={16} /> {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* ── 2. Aloqa Formasi ── */}
            <div className="bg-white rounded-[3rem] border border-slate-100 p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden self-start">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-16 text-center"
                  >
                    <CheckCircle2
                      size={60}
                      className="text-[#3de082] mx-auto mb-6"
                    />
                    <h3 className="text-2xl font-black text-slate-900 mb-2">
                      {t("contact.success.title")}
                    </h3>
                    <p className="text-slate-500 mb-8">
                      {t("contact.success.desc")}
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider"
                    >
                      {t("contact.success.new_btn")}
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                      {t("contact.form.title")}
                    </h3>
                    <div className="grid grid-cols-1 gap-6">
                      {t("contact.form.fields", { returnObjects: true }).map(
                        (f) => (
                          <div key={f.key}>
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                              {f.label}
                            </label>
                            <input
                              required
                              type={f.type}
                              placeholder={f.placeholder}
                              value={form[f.key]}
                              onChange={(e) => set(f.key, e.target.value)}
                              className="w-full bg-slate-50 border border-slate-100 focus:border-[#892be2] focus:bg-white rounded-xl px-5 py-3.5 text-sm font-semibold outline-none transition-all"
                            />
                          </div>
                        ),
                      )}
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 ml-1">
                          {t("contact.form.message_label")}
                        </label>
                        <textarea
                          required
                          rows={4}
                          placeholder={t("contact.form.message_placeholder")}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          className="w-full bg-slate-50 border border-slate-100 focus:border-[#892be2] focus:bg-white rounded-xl px-5 py-3.5 text-sm font-semibold outline-none transition-all resize-none"
                        />
                      </div>
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-full bg-[#3de082] hover:bg-[#2ecb72] text-slate-900 font-black py-4 rounded-xl shadow-lg shadow-emerald-500/20 flex justify-center items-center gap-2 uppercase text-xs tracking-widest transition-all"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" size={20} />
                        ) : (
                          <>
                            {t("contact.form.submit_btn")}{" "}
                            <ArrowRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
