import { useState } from "react";
import PageHero from "../../components/ui/PageHero";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);
  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  return (
    <div>
      <PageHero
        crumb="Aloqa"
        title="Biz Bilan Bog'laning"
        subtitle="Dasturlar, qabul, tadqiqot yoki kampus hayoti haqida savollaringiz bormi? Biz yordam berishga tayyormiz."
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Info */}
          <div>
            <h2 className="text-2xl font-black text-slate-900 mb-8">
              Aloqa Ma'lumotlari
            </h2>
            <div className="space-y-6 mb-10">
              {[
                {
                  icon: "📍",
                  l: "Manzil",
                  v: "University Street 108, Yakkasaray tumani, Toshkent 100200, O'zbekiston",
                },
                { icon: "📞", l: "Telefon", v: "+998 71 238 64 00" },
                { icon: "✉️", l: "Elektron Pochta", v: "engineering@tatu.uz" },
                {
                  icon: "🕐",
                  l: "Ish Vaqti",
                  v: "Dushanba – Juma: 09:00 – 17:00 (UZT)",
                },
              ].map((c) => (
                <div key={c.l} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-[#0a1628] rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">
                      {c.l}
                    </p>
                    <p className="text-[15px] text-slate-800 leading-relaxed">
                      {c.v}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="h-56 rounded-2xl bg-gradient-to-br from-slate-100 to-blue-50 border border-slate-200 flex flex-col items-center justify-center gap-2 mb-8">
              <span className="text-5xl">🗺️</span>
              <p className="font-bold text-slate-500 text-sm">
                Interaktiv Xarita
              </p>
              <p className="text-slate-400 text-xs">Toshkent, O'zbekiston</p>
            </div>

            <div>
              <p className="text-sm font-bold text-slate-500 mb-4">
                Ijtimoiy Tarmoqlar
              </p>
              <div className="flex flex-wrap gap-2">
                {["📘 Facebook", "🐦 Twitter", "💼 LinkedIn", "▶️ YouTube"].map(
                  (s) => (
                    <button
                      key={s}
                      className="text-xs font-semibold text-slate-600 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-700 px-4 py-2.5 rounded-xl transition-all"
                    >
                      {s}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl border border-slate-200 p-10 shadow-xl">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="text-7xl mb-5">✅</div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">
                  Xabar Yuborildi!
                </h3>
                <p className="text-slate-500 leading-relaxed mb-8">
                  Murojaat uchun rahmat. Jamoamiz 1–2 ish kuni ichida siz bilan
                  bog'lanadi.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-xl transition-colors"
                >
                  Yangi Xabar Yuborish
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-extrabold text-slate-900 mb-7">
                  Xabar Yuborish
                </h3>
                <div className="space-y-5">
                  {[
                    {
                      key: "name",
                      label: "To'liq Ism *",
                      ph: "Ismingiz",
                      type: "text",
                    },
                    {
                      key: "email",
                      label: "Elektron Pochta *",
                      ph: "email@example.com",
                      type: "email",
                    },
                    {
                      key: "subject",
                      label: "Mavzu",
                      ph: "Qabul haqida savol...",
                      type: "text",
                    },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                        {f.label}
                      </label>
                      <input
                        type={f.type}
                        placeholder={f.ph}
                        value={form[f.key]}
                        onChange={(e) => set(f.key, e.target.value)}
                        className="w-full border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl px-4 py-3 text-sm outline-none transition-all placeholder-slate-300 text-slate-800"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[13px] font-extrabold text-slate-800 mb-1.5">
                      Xabar *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Sizga qanday yordam bera olamiz?"
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
                    Xabar Yuborish →
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

export default Contact