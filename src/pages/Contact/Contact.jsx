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
  Loader2, // Yuklanish uchun icon
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useTranslation } from "react-i18next";
import request from "../../api"; // SIZNING AXIOS INSTANCE

// Leaflet icon sozlamasi
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const socialLinks = [
  {
    name: "Web sayt",
    icon: Globe,
    href: "https://tuit.uz/",
    color: "hover:text-emerald-600 hover:border-emerald-300",
  },
  {
    name: "Telegram",
    icon: Send,
    href: "https://t.me/tuituz_official",
    color: "hover:text-sky-500 hover:border-sky-300",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/tuit.official",
    color: "hover:text-pink-600 hover:border-pink-300",
  },
  {
    name: "Facebook",
    icon: Facebook,
    href: "https://www.facebook.com/TUITuzb",
    color: "hover:text-blue-600 hover:border-blue-300",
  },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

function Contact() {
  const { t } = useTranslation();
  const position = [41.3409, 69.2867]; // TUIT koordinatasi (to'g'rilandi)
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
      label: t("contact.contactData.address.label"),
      value: t("contact.contactData.address.value"),
    },
    {
      icon: Phone,
      label: t("contact.contactData.phone.label"),
      value: t("contact.contactData.phone.value"),
    },
    {
      icon: Mail,
      label: t("contact.contactData.email.label"),
      value: t("contact.contactData.email.value"),
    },
    {
      icon: Clock,
      label: t("contact.contactData.workingHours.label"),
      value: t("contact.contactData.workingHours.value"),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert("Iltimos, barcha maydonlarni to'ldiring");
      return;
    }

    setLoading(true);
    try {
      const res = await request.post("/contact_messages", {
        name: form.name,
        email: form.email,
        subject: form.subject,
        message: form.message,
      });

      if (res.status === 201 || res.status === 200) {
        setSent(true);
        setForm({ name: "", email: "", subject: "", message: "" }); // Formani tozalash
      }
    } catch (error) {
      console.error("Xatolik:", error);
      alert(
        "Xabar yuborishda xatolik yuz berdi. Iltimos qaytadan urunib ko'ring.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        crumb={t("contact.hero.crumb")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* ── Ma'lumotlar va Xarita ── */}
          <AnimatedSection direction="left">
            <div>
              <h2 className="text-2xl font-black text-slate-900 mb-8">
                {t("contact.infoTitle")}
              </h2>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-6 mb-10"
              >
                {contactData.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeUp}
                    className="flex items-start gap-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="bg-slate-800 p-3 rounded-xl text-amber-500 shrink-0"
                    >
                      <item.icon size={24} />
                    </motion.div>
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      <p className="text-[15px] text-slate-800 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="h-56 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8 z-0"
              >
                <MapContainer
                  center={position}
                  zoom={15}
                  className="h-full w-full"
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker position={position}>
                    <Popup>{t("contact.mapPopup")}</Popup>
                  </Marker>
                </MapContainer>
              </motion.div>

              <div>
                <p className="text-sm font-bold text-slate-500 mb-4">
                  {t("contact.socialLabel")}
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white border border-slate-200 px-4 py-2.5 rounded-xl transition-colors ${item.color}`}
                    >
                      <item.icon size={16} /> {item.name}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* ── Aloqa Formasi ── */}
          <AnimatedSection direction="right" delay={0.1}>
            <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="text-7xl mb-5 text-emerald-500">✅</div>
                    <h3 className="text-2xl font-black text-slate-900 mb-3">
                      {t("contact.success.title")}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-8">
                      {t("contact.success.desc")}
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                    >
                      {t("contact.success.newBtn")}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-extrabold text-slate-900 mb-7">
                      {t("contact.form.title")}
                    </h3>
                    <div className="space-y-5">
                      {t("contact.form.fields", { returnObjects: true }).map(
                        (f) => (
                          <div key={f.key}>
                            <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                              {f.label}
                            </label>
                            <input
                              required
                              type={f.type}
                              placeholder={f.placeholder}
                              value={form[f.key]}
                              onChange={(e) => set(f.key, e.target.value)}
                              className="w-full border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-3 text-sm outline-none transition-all text-slate-800"
                            />
                          </div>
                        ),
                      )}
                      <div>
                        <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                          {t("contact.form.messageLabel")}
                        </label>
                        <textarea
                          required
                          rows={5}
                          placeholder={t("contact.form.messagePlaceholder")}
                          value={form.message}
                          onChange={(e) => set("message", e.target.value)}
                          className="w-full border border-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none text-slate-800"
                        />
                      </div>
                      <motion.button
                        disabled={loading}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-extrabold text-[15px] py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20 relative overflow-hidden group flex justify-center items-center"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin" />
                        ) : (
                          t("contact.form.submitBtn")
                        )}
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}

export default Contact;
