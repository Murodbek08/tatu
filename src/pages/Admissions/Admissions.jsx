// pages/Admissions/Admissions.jsx — animatsiyalangan versiya
// Steps: ketma-ket chiqadi | Form: slide transition step o'tishda | Cards: hover

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";
import AnimatedSection from "../../components/ui/AnimatedSection";
import { useTranslation } from "react-i18next";

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

function Admissions() {
  const { t } = useTranslation();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1: forward, -1: back
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    program: "",
  });
  const set = (f, v) => setForm((p) => ({ ...p, [f]: v }));

  const steps = t("admissions.form.steps", { returnObjects: true });

  const goTo = (next) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  // Slide variants for form steps
  const slideVariants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 40 : -40 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
    exit: (d) => ({
      opacity: 0,
      x: d > 0 ? -40 : 40,
      transition: { duration: 0.25 },
    }),
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
            {/* ── Left: Steps ── */}
            <div>
              <AnimatedSection direction="left">
                <SectionLabel>
                  {t("admissions.steps.sectionLabel")}
                </SectionLabel>
                <div className="mt-1 mb-10">
                  <SectionTitle>{t("admissions.steps.title")}</SectionTitle>
                </div>
              </AnimatedSection>

              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="space-y-7 mb-14"
              >
                {t("admissions.steps.list", { returnObjects: true }).map(
                  (s) => (
                    <motion.div
                      key={s.n}
                      variants={fadeUp}
                      className="flex gap-5 items-start"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -4 }}
                        transition={{ type: "spring", stiffness: 350 }}
                        className="w-12 h-12 bg-amber-500 text-white font-black text-base rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/25"
                      >
                        {s.n}
                      </motion.div>
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
                    </motion.div>
                  ),
                )}
              </motion.div>

              {/* Tuition */}
              <AnimatedSection direction="up" delay={0.1}>
                <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-6 lg:p-8 shadow-sm">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-6">
                    {t("admissions.tuition.title")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {t("admissions.tuition.list", { returnObjects: true }).map(
                      (f) => (
                        <motion.div
                          key={f.lvl}
                          whileHover={{
                            y: -4,
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-5 flex flex-col justify-center text-center cursor-default"
                        >
                          <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                            {f.lvl}
                          </p>
                          <p className="text-slate-900 font-black text-xl sm:text-2xl leading-tight">
                            {f.fee}
                          </p>
                          <p className="text-slate-400 text-[11px] mt-1 font-medium">
                            {f.per}
                          </p>
                        </motion.div>
                      ),
                    )}
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 font-medium flex items-start sm:items-center gap-3">
                    <span className="text-lg">🎓</span>
                    <p className="leading-relaxed">
                      {t("admissions.tuition.scholarship")}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* ── Right: Sticky multi-step form ── */}
            <AnimatedSection direction="right">
              <div className="xl:sticky xl:top-24 self-start">
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xl">
                  {/* Progress header */}
                  <div className="bg-[#0a1628] px-8 py-7">
                    <p className="text-white font-extrabold text-xl mb-5">
                      {t("admissions.form.title")}
                    </p>
                    <div className="flex gap-1.5 mb-3">
                      {steps.map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            backgroundColor:
                              i <= step ? "#fbbf24" : "rgba(255,255,255,0.2)",
                          }}
                          transition={{ duration: 0.4 }}
                          className="flex-1 h-1 rounded-full"
                        />
                      ))}
                    </div>
                    <p className="text-white/50 text-xs">
                      {t("admissions.form.stepLabel")} {step + 1} /{" "}
                      {steps.length}:{" "}
                      <span className="text-white/80 font-semibold">
                        {steps[step]}
                      </span>
                    </p>
                  </div>

                  {/* Step content — slide transition */}
                  <div className="p-8 overflow-hidden">
                    <AnimatePresence custom={direction} mode="wait">
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                      >
                        {/* Step 0 */}
                        {step === 0 && (
                          <div className="space-y-5">
                            {t("admissions.form.fields", {
                              returnObjects: true,
                            }).map((f) => (
                              <div key={f.label}>
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

                        {/* Step 1 */}
                        {step === 1 && (
                          <div className="space-y-2.5 max-h-105 overflow-y-auto pr-1">
                            <label className="block text-[13px] font-extrabold text-slate-800 mb-3">
                              {t("admissions.form.programLabel")}
                            </label>
                            {t("admissions.form.programs", {
                              returnObjects: true,
                            }).map((prog) => (
                              <motion.div
                                key={prog.id}
                                whileTap={{ scale: 0.98 }}
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
                                <AnimatePresence>
                                  {form.program === prog.title && (
                                    <motion.span
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      exit={{ scale: 0 }}
                                      className="text-blue-600 font-black text-lg shrink-0"
                                    >
                                      ✓
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </motion.div>
                            ))}
                          </div>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                          <div className="space-y-3">
                            <p className="text-sm font-bold text-slate-600 mb-4">
                              {t("admissions.form.docsTitle")}
                            </p>
                            {t("admissions.form.docs", {
                              returnObjects: true,
                            }).map((doc) => (
                              <div
                                key={doc}
                                className="flex items-center justify-between p-4 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                              >
                                <div>
                                  <p className="text-sm font-extrabold text-slate-800">
                                    {doc}
                                  </p>
                                  <p className="text-[11px] text-slate-400 mt-0.5">
                                    {t("admissions.form.docFormat")}
                                  </p>
                                </div>
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold px-4 py-2 rounded-lg transition-colors shrink-0 ml-3"
                                >
                                  {t("admissions.form.uploadBtn")}
                                </motion.button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Step 3 */}
                        {step === 3 && (
                          <div>
                            <div className="bg-slate-50 rounded-2xl p-5 mb-5">
                              <p className="font-extrabold text-slate-900 text-[15px] mb-4">
                                {t("admissions.form.reviewTitle")}
                              </p>
                              {[
                                {
                                  label: t("admissions.form.reviewFields.name"),
                                  value: form.name,
                                },
                                {
                                  label: t(
                                    "admissions.form.reviewFields.email",
                                  ),
                                  value: form.email,
                                },
                                {
                                  label: t(
                                    "admissions.form.reviewFields.phone",
                                  ),
                                  value: form.phone,
                                },
                                {
                                  label: t(
                                    "admissions.form.reviewFields.program",
                                  ),
                                  value: form.program,
                                },
                              ].map((item, index) => (
                                <div
                                  key={index}
                                  className="flex gap-7 justify-between py-2.5 border-b border-slate-200 last:border-0 text-sm"
                                >
                                  <span className="text-slate-400 font-medium">
                                    {item.label}
                                  </span>
                                  <span className="text-slate-800 font-bold truncate max-w-50 text-right">
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {t("admissions.form.reviewNote")}
                            </p>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    {/* Nav buttons */}
                    <div className="flex gap-3 mt-7">
                      {step > 0 && (
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => goTo(step - 1)}
                          className="flex-1 border-2 border-slate-200 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all text-sm"
                        >
                          {t("admissions.form.backBtn")}
                        </motion.button>
                      )}
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => {
                          if (step < steps.length - 1) goTo(step + 1);
                          else alert(t("admissions.form.successMsg"));
                        }}
                        className="flex-2 bg-amber-500 hover:bg-amber-600 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg shadow-amber-500/25 text-sm relative overflow-hidden group"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                        <span className="relative">
                          {step < steps.length - 1
                            ? t("admissions.form.nextBtn")
                            : t("admissions.form.submitBtn")}
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admissions;
