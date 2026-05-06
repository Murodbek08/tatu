import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { request, supabase } from "../../api";
import {
  CheckCircle2,
  ChevronRight,
  UploadCloud,
  FileText,
  Info,
} from "lucide-react";

import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";

export default function Admissions() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
  });
  const [files, setFiles] = useState({ passport: null, diploma: null });

  const steps = t("admissions.form.steps", { returnObjects: true });

  const goTo = (next) => {
    // Har bir stepdan o'tishda tekshirish (Validatsiya)
    if (next > step) {
      if (step === 0 && (!form.name || !form.email || !form.phone)) {
        return alert("Iltimos, barcha maydonlarni to'ldiring!");
      }
      if (step === 1 && !form.program) {
        return alert("Iltimos, ta'lim yo'nalishini tanlang!");
      }
      if (step === 2 && (!files.passport || !files.diploma)) {
        return alert("Iltimos, barcha hujjatlarni yuklang!");
      }
    }
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024)
        return alert("Fayl hajmi 5MB dan oshmasligi kerak");
      setFiles((prev) => ({ ...prev, [type]: file }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const urls = { passport_url: null, diploma_url: null };

      // 1. Fayllarni yuklash (Majburiy)
      for (const key of ["passport", "diploma"]) {
        const file = files[key];
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}_${key}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("admissions")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("admissions")
          .getPublicUrl(fileName);
        urls[`${key}_url`] = data.publicUrl;
      }

      // 2. Bazaga yozish
      await request.post("/admissions", {
        full_name: form.name,
        email: form.email,
        phone: form.phone,
        program: form.program,
        ...urls,
      });

      alert("Arizangiz muvaffaqiyatli yuborildi!");
      window.location.reload(); // Sahifani yangilash
    } catch (err) {
      console.error(err);
      alert("Xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHero
        crumb={t("admissions.hero.crumb")}
        title={t("admissions.hero.title")}
        subtitle={t("admissions.hero.subtitle")}
      />

      <div className="bg-[#f4f7fa] min-h-screen font-inter">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-12 lg:gap-20">
            {/* CHAP TOMON: Yo'riqnoma va Narxlar */}
            <div className="space-y-20">
              {/* Steps Header */}
              <AnimatedSection direction="left">
                <SectionLabel className="bg-white border border-slate-100 text-[#892be2] px-6 py-2 rounded-xl shadow-sm">
                  {t("admissions.steps.section_label")}
                </SectionLabel>
                <div className="mt-6 mb-12">
                  <h2 className="text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                    {t("admissions.steps.title")}
                  </h2>
                </div>
              </AnimatedSection>

              {/* Steps List */}
              <div className="space-y-10 relative">
                {/* Vertical timeline line (Desktop uchun) */}
                <div className="hidden md:block absolute left-7 top-10 bottom-10 w-1 bg-slate-200/50 rounded-full" />

                {t("admissions.steps.list", { returnObjects: true }).map(
                  (s, idx) => (
                    <motion.div
                      key={s.n}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group relative flex flex-col md:flex-row gap-6 md:gap-10 p-8 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-500"
                      style={{
                        borderLeft: `12px solid ${idx % 2 === 0 ? "#3de082" : "#892be2"}`,
                      }}
                    >
                      <div className="w-14 h-14 md:w-16 md:h-16 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center shrink-0 text-xl md:text-2xl shadow-lg relative z-10">
                        {s.n}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-2xl md:text-3xl font-black text-slate-900 mb-2 leading-tight">
                          {s.title}
                        </h4>
                        <p className="text-[#892be2] font-black text-sm  tracking-widest mb-4 italic">
                          {s.date}
                        </p>
                        <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
                          {s.desc}
                        </p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>

              {/* Tuition Section */}
              <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-12 shadow-sm relative overflow-hidden">
                <div className="flex items-center gap-4 mb-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#3de082]/10 flex items-center justify-center text-[#3de082]">
                    <FileText size={28} />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                    {t("admissions.tuition.title")}
                  </h3>
                </div>

                {/* Kartalar to'plami */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10">
                  {t("admissions.tuition.list", { returnObjects: true }).map(
                    (f, idx) => (
                      <div
                        key={f.lvl}
                        className={`relative p-6 md:p-8 rounded-[2rem] text-center border-2 transition-all flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] ${
                          idx === 2
                            ? "border-[#3de082] bg-emerald-50/20"
                            : "border-slate-50 bg-slate-50/50"
                        }`}
                      >
                        <p className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3 italic">
                          {f.lvl}
                        </p>

                        {/* Narx qismi - "Moliyalashtir" so'zi uchun maxsus klass */}
                        <div className="w-full flex flex-col items-center justify-center leading-none">
                          <p
                            className={`font-black text-slate-900 break-words w-full ${
                              f.fee.length > 8
                                ? "text-xl md:text-2xl"
                                : "text-3xl md:text-5xl"
                            }`}
                          >
                            {f.fee}
                          </p>
                          <p className="text-[10px] md:text-xs text-slate-400 font-bold mt-2 uppercase">
                            {f.per}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Ma'lumot bandi - Ixchamroq */}
                <div className="bg-blue-50/50 rounded-2xl p-5 md:p-6 border border-blue-100/50 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
                    <Info size={16} strokeWidth={3} />
                  </div>
                  <p className="text-blue-900 font-bold text-xs md:text-sm leading-relaxed">
                    {t("admissions.tuition.scholarship")}
                  </p>
                </div>
              </div>
            </div>

            {/* O'NG TOMON: Multi-step Form */}
            <div className="xl:sticky xl:top-24 self-start">
              <div className="bg-white rounded-[3.5rem] border border-slate-100 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)]">
                {/* Form Header */}
                <div className="bg-slate-900 px-10 py-10 text-white">
                  <p className="font-black text-2xl md:text-3xl mb-6 tracking-tight">
                    {t("admissions.form.title")}
                  </p>
                  <div className="flex gap-2 mb-4">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full transition-all duration-700 ${i <= step ? "bg-[#3de082]" : "bg-white/10"}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/40 text-[10px] font-black  tracking-widest">
                    {t("admissions.form.step_label")} {step + 1} / 4:{" "}
                    <span className="text-[#3de082] italic">{steps[step]}</span>
                  </p>
                </div>

                <div className="p-10 md:p-12">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="min-h-[320px]"
                    >
                      {/* STEP 0: Personal Info */}
                      {step === 0 && (
                        <div className="space-y-6">
                          {t("admissions.form.fields", {
                            returnObjects: true,
                          }).map((f) => (
                            <div key={f.key}>
                              <label className="block text-[11px] font-black text-slate-400  tracking-widest mb-2 ml-1">
                                {f.label}
                              </label>
                              <input
                                className="w-full bg-slate-50 border-2 border-slate-50 p-4 rounded-2xl text-lg font-bold text-slate-900 focus:border-[#892be2] focus:bg-white outline-none transition-all placeholder:text-slate-300"
                                placeholder={f.ph}
                                value={form[f.key]}
                                onChange={(e) =>
                                  setForm({ ...form, [f.key]: e.target.value })
                                }
                              />
                            </div>
                          ))}
                        </div>
                      )}

                      {/* STEP 1: Program Choice */}
                      {step === 1 && (
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                          {t("admissions.form.programs", {
                            returnObjects: true,
                          }).map((prog) => (
                            <div
                              key={prog.code}
                              onClick={() =>
                                setForm({ ...form, program: prog.title })
                              }
                              className={`p-6 border-2 rounded-[2rem] cursor-pointer transition-all flex items-center gap-5 ${form.program === prog.title ? "border-[#3de082] bg-emerald-50/50" : "border-slate-50 hover:border-slate-200"}`}
                            >
                              <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl border border-slate-100">
                                {prog.icon || "🎓"}
                              </div>
                              <div>
                                <p className="font-black text-slate-900 text-base">
                                  {prog.title}
                                </p>
                                <p className="text-[10px] text-slate-400 font-black  tracking-widest mt-1">
                                  {prog.degree}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* STEP 2: Documents */}
                      {step === 2 && (
                        <div className="space-y-6">
                          <p className="text-sm font-black text-slate-400  tracking-widest mb-6 italic">
                            {t("admissions.form.docs_title")}
                          </p>
                          {["passport", "diploma"].map((type) => (
                            <div
                              key={type}
                              className={`p-8 border-2 border-dashed rounded-[2.5rem] transition-all relative group ${files[type] ? "border-[#3de082] bg-emerald-50/30" : "border-slate-200 hover:border-[#892be2]"}`}
                            >
                              <div className="flex flex-col items-center text-center">
                                <div
                                  className={`mb-4 ${files[type] ? "text-[#3de082]" : "text-slate-300 group-hover:text-[#892be2]"}`}
                                >
                                  {files[type] ? (
                                    <CheckCircle2 size={40} />
                                  ) : (
                                    <UploadCloud size={40} />
                                  )}
                                </div>
                                <p className="text-lg font-black text-slate-900 mb-1">
                                  {type === "passport"
                                    ? "Pasport nusxasi"
                                    : "Diplom / Shahodatnoma"}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold mb-6">
                                  PDF, JPG (MAX 5MB)
                                </p>

                                <label className="cursor-pointer bg-slate-900 text-white px-8 py-3 rounded-xl text-[10px] font-black  tracking-widest hover:bg-[#892be2] transition-colors">
                                  {files[type]
                                    ? "ALMASHTIRISH"
                                    : "FAYLNI TANLASH"}
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFileChange(e, type)}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                  />
                                </label>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* STEP 3: Review */}
                      {step === 3 && (
                        <div className="space-y-6">
                          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-5 shadow-xl">
                            {["name", "email", "program"].map((field) => (
                              <div
                                key={field}
                                className="flex flex-col border-b border-white/10 pb-3"
                              >
                                <span className="text-[9px] font-black text-white/30  tracking-[0.2em] mb-1">
                                  {field}
                                </span>
                                <span className="text-base font-bold truncate">
                                  {form[field]}
                                </span>
                              </div>
                            ))}
                            <div className="flex items-center gap-3 text-[#3de082] font-black text-xs">
                              <CheckCircle2 size={18} /> HUJJATLAR TAYYOR
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic px-4">
                            {t("admissions.form.review_note")}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-12">
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="flex-1 bg-slate-100 py-5 rounded-2xl font-black text-slate-600 text-xs  tracking-widest hover:bg-slate-200 transition-all"
                      >
                        {t("admissions.form.back_btn")}
                      </button>
                    )}
                    <button
                      onClick={() =>
                        step === 3 ? handleSubmit() : setStep(step + 1)
                      }
                      className="flex-[2] bg-[#3de082] text-slate-900 py-5 rounded-2xl font-black text-xs  tracking-[0.2em] shadow-xl shadow-emerald-500/20 hover:bg-[#2ecb72] transition-all"
                    >
                      {step === 3
                        ? t("admissions.form.submit_btn")
                        : t("admissions.form.next_btn")}
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
