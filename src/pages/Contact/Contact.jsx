import { useState } from "react";
import PageHero from "../../components/ui/PageHero";
import {
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Ikonka muammosini hal qilish uchun (Leaflet default ikonkasini tuzatish)
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { useTranslation } from "react-i18next";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

const socialLinks = [
  {
    name: "Facebook",
    icon: Facebook,
    color: "hover:text-blue-600 hover:border-blue-300",
  },
  {
    name: "Twitter",
    icon: Twitter,
    color: "hover:text-sky-500 hover:border-sky-300",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    color: "hover:text-blue-700 hover:border-blue-400",
  },
  {
    name: "YouTube",
    icon: Youtube,
    color: "hover:text-red-600 hover:border-red-300",
  },
];

function Contact() {
  const { t } = useTranslation();
  const position = [41.3111, 69.2797];
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
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
  return (
    <div>
      <PageHero
        crumb={t("contact.hero.crumb")}
        title={t("contact.hero.title")}
        subtitle={t("contact.hero.subtitle")}
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">
              {t("contact.infoTitle")}
            </h2>

            <div className="space-y-6 mb-10">
              {contactData.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-4">
                    {/* Ikonka uchun kvadrat */}
                    <div className="bg-slate-800 p-3 rounded-xl text-amber-500">
                      <Icon size={24} />
                    </div>

                    {/* Matnli qism */}
                    <div>
                      <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        {item.label}
                      </p>
                      <p className="text-[15px] text-slate-800 leading-relaxed">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map placeholder */}
            <div className="h-56 w-full  rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-8">
              <MapContainer
                center={position}
                zoom={15}
                className="h-full w-full"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                  <Popup>{t("contact.mapPopup")}</Popup>
                </Marker>
              </MapContainer>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 mb-4">
                {t("contact.socialLabel")}
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((item) => (
                  <button
                    key={item.name}
                    className={`flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white 
                      border border-slate-200 px-4 py-2.5 rounded-xl transition-all
                      ${item.color}`}
                  >
                    <item.icon size={16} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-7xl mb-5">✅</div>
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
              </div>
            ) : (
              <>
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
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.key]}
                          onChange={(e) => set(f.key, e.target.value)}
                          className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300 text-slate-800"
                        />
                      </div>
                    ),
                  )}
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                      {t("contact.form.messageLabel")}
                    </label>
                    <textarea
                      rows={5}
                      placeholder={t("contact.form.messagePlaceholder")}
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none placeholder-slate-300 text-slate-800"
                    />
                  </div>
                  <button
                    onClick={() => {
                      if (form.name && form.email && form.message)
                        setSent(true);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 active:scale-[0.99] text-white font-extrabold text-[15px] py-4 rounded-xl transition-all shadow-lg shadow-amber-500/20"
                  >
                    {t("contact.form.submitBtn")}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
