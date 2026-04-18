import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { supabase } from "../../supabaseClient";
import request from "../../api";

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

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] gap-16">
            {/* Chap tomon: Ma'lumotlar (UI saqlab qolindi) */}
            <div>
              <AnimatedSection direction="left">
                <SectionLabel>
                  {t("admissions.steps.sectionLabel")}
                </SectionLabel>
                <div className="mt-1 mb-10">
                  <SectionTitle>{t("admissions.steps.title")}</SectionTitle>
                </div>
              </AnimatedSection>

              <div className="space-y-7 mb-14">
                {t("admissions.steps.list", { returnObjects: true }).map(
                  (s) => (
                    <div key={s.n} className="flex gap-5 items-start">
                      <div className="w-12 h-12 bg-amber-500 text-white font-black rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25">
                        {s.n}
                      </div>
                      <div>
                        <h4 className="text-[16px] font-extrabold text-slate-900 mb-0.5">
                          {s.title}
                        </h4>
                        <p className="text-amber-600 font-bold text-xs mb-1.5">
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

              {/* Tuition section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-xl font-extrabold mb-6">
                  {t("admissions.tuition.title")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {t("admissions.tuition.list", { returnObjects: true }).map(
                    (f) => (
                      <div
                        key={f.lvl}
                        className="bg-slate-50 p-5 rounded-xl text-center border border-slate-100"
                      >
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                          {f.lvl}
                        </p>
                        <p className="text-lg font-black text-slate-900">
                          {f.fee}
                        </p>
                        <p className="text-[10px] text-slate-400">{f.per}</p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* O'ng tomon: Multi-step Form (UI saqlab qolindi) */}
            <div className="xl:sticky xl:top-24 self-start">
              <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                {/* Progress Header */}
                <div className="bg-[#0a1628] px-8 py-7">
                  <p className="text-white font-extrabold text-xl mb-5">
                    {t("admissions.form.title")}
                  </p>
                  <div className="flex gap-1.5 mb-3">
                    {[0, 1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${i <= step ? "bg-amber-500" : "bg-white/20"}`}
                      />
                    ))}
                  </div>
                  <p className="text-white/50 text-[11px] uppercase tracking-wider font-bold">
                    {t("admissions.form.stepLabel")} {step + 1} / 4:{" "}
                    <span className="text-white">{steps[step]}</span>
                  </p>
                </div>

                <div className="p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="min-h-[280px]"
                    >
                      {/* STEP 0: INFO */}
                      {step === 0 && (
                        <div className="space-y-4">
                          {t("admissions.form.fields", {
                            returnObjects: true,
                          }).map((f) => (
                            <div key={f.key}>
                              <label className="block text-[11px] font-black text-slate-400 uppercase mb-1.5">
                                {f.label}
                              </label>
                              <input
                                className="w-full border border-slate-200 p-3.5 rounded-xl text-sm focus:border-blue-500 outline-none transition-all"
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

                      {/* STEP 1: PROGRAM */}
                      {step === 1 && (
                        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-2 custom-scroll">
                          {t("admissions.form.programs", {
                            returnObjects: true,
                          }).map((prog) => (
                            <div
                              key={prog.id}
                              onClick={() =>
                                setForm({ ...form, program: prog.title })
                              }
                              className={`p-4 border-2 rounded-2xl cursor-pointer transition-all flex items-center gap-4 ${form.program === prog.title ? "border-amber-500 bg-amber-50/50" : "border-slate-100 hover:border-slate-200"}`}
                            >
                              <span className="text-2xl">{prog.icon}</span>
                              <div>
                                <p className="font-bold text-slate-900 text-sm">
                                  {prog.title}
                                </p>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">
                                  {prog.degree}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* STEP 2: DOCUMENTS (Majburiy yuklash) */}
                      {step === 2 && (
                        <div className="space-y-4">
                          <p className="text-xs font-bold text-slate-500 mb-4">
                            {t("admissions.form.docsTitle")}
                          </p>
                          {["passport", "diploma"].map((type) => (
                            <div
                              key={type}
                              className={`p-4 border-2 border-dashed rounded-2xl transition-all ${files[type] ? "border-green-500 bg-green-50" : "border-slate-200"}`}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="text-sm font-bold text-slate-900 capitalize">
                                    {type === "passport"
                                      ? "Passport nusxasi"
                                      : "Diplom yoki Shahodatnoma"}
                                  </p>
                                  <p className="text-[10px] text-slate-400">
                                    PDF, JPG (Max 5MB)
                                  </p>
                                </div>
                                <label className="cursor-pointer bg-slate-900 text-white px-4 py-2 rounded-lg text-[10px] font-bold">
                                  {files[type] ? "ALMASHTIRISH" : "YUKLASH"}
                                  <input
                                    type="file"
                                    hidden
                                    onChange={(e) => handleFileChange(e, type)}
                                    accept=".pdf,.jpg,.jpeg,.png"
                                  />
                                </label>
                              </div>
                              {files[type] && (
                                <p className="mt-2 text-[10px] font-bold text-green-600 truncate">
                                  ✓ {files[type].name}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* STEP 3: REVIEW */}
                      {step === 3 && (
                        <div className="space-y-4">
                          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3">
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-xs text-slate-400">
                                Ism:
                              </span>{" "}
                              <span className="text-xs font-bold">
                                {form.name}
                              </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-xs text-slate-400">
                                Email:
                              </span>{" "}
                              <span className="text-xs font-bold">
                                {form.email}
                              </span>
                            </div>
                            <div className="flex justify-between border-b pb-2">
                              <span className="text-xs text-slate-400">
                                Yo'nalish:
                              </span>{" "}
                              <span className="text-xs font-bold text-right ml-4">
                                {form.program}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-xs text-slate-400">
                                Hujjatlar:
                              </span>{" "}
                              <span className="text-xs font-bold text-green-600">
                                YUKLANDI ✅
                              </span>
                            </div>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed">
                            {t("admissions.form.reviewNote")}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-8">
                    {step > 0 && (
                      <button
                        onClick={() => goTo(step - 1)}
                        className="flex-1 border-2 border-slate-100 py-3.5 rounded-2xl font-bold text-slate-600 text-sm hover:bg-slate-50 transition-all"
                      >
                        {t("admissions.form.backBtn")}
                      </button>
                    )}
                    <button
                      onClick={() =>
                        step === 3 ? handleSubmit() : goTo(step + 1)
                      }
                      disabled={loading}
                      className="flex-[2] bg-amber-500 text-white py-3.5 rounded-2xl font-black text-sm shadow-xl shadow-amber-500/20 hover:bg-amber-600 transition-all disabled:opacity-50"
                    >
                      {loading
                        ? "YUBORILMOQDA..."
                        : step === 3
                          ? t("admissions.form.submitBtn")
                          : t("admissions.form.nextBtn")}
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
