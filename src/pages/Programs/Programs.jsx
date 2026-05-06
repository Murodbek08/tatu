import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { request } from "../../api";
import PageHero from "../../components/ui/PageHero";
import _Slider from "react-slick";

import {
  Clock,
  GraduationCap,
  UserPlus,
  Code2,
  Layers,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
  CheckCircle2,
} from "lucide-react";
import { default as Slider } from "react-slick";

const ProgramCard = ({ prog, lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cardColor = prog.bg_color || "#3de082";

  const getTagsArray = (tagsData) => {
    if (!tagsData) return [];
    if (Array.isArray(tagsData)) return tagsData;
    if (typeof tagsData === "string")
      return tagsData
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    return [];
  };

  const title = prog[`name_${lang}`] || prog.name_uz;
  const description = prog[`desc_${lang}`] || prog.desc_uz;
  const fullDetails = prog[`details_${lang}`] || prog.details_uz || description;

  return (
    <>
      {/* --- ASOSIY KARTA --- */}
      <motion.div
        layout
        whileHover={{ y: -10 }}
        className="group relative bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-slate-100 flex flex-col h-full overflow-hidden transition-all duration-500 hover:shadow-2xl"
        style={{ borderTop: `12px solid ${cardColor}` }}
      >
        {/* Badge va Icon */}
        <div className="flex justify-between items-start mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-inner bg-slate-50 transition-transform duration-500 group-hover:scale-110"
            style={{ color: cardColor }}
          >
            {prog.icon_url || "🎓"}
          </div>
          <span
            className="px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest  border"
            style={{
              backgroundColor: `${cardColor}10`,
              color: cardColor,
              borderColor: `${cardColor}20`,
            }}
          >
            {prog.category_short || "CS"}
          </span>
        </div>

        {/* Sarlavha - Yirik va Qalin */}
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 leading-tight group-hover:text-[#892be2] transition-colors tracking-tighter">
          {title}
        </h3>

        {/* Tavsif - 3 qatorda kesiladi va nuqtacha qo'yiladi */}
        <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-8 line-clamp-3 font-medium opacity-80 flex-grow">
          {description}
        </p>

        {/* Teglar - Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {getTagsArray(prog.tags)
            .slice(0, 3)
            .map((tag, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 text-[11px] font-black border border-slate-100  tracking-wider"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Footer qismi */}
        <div className="pt-8 border-t border-slate-50 space-y-6">
          <div className="flex items-center justify-between text-slate-400 font-black text-xs  tracking-widest">
            <div className="flex items-center gap-2">
              <GraduationCap size={18} className="text-slate-300" />
              <span>{prog.level}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={18} className="text-slate-300" />
              <span>{prog.duration}</span>
            </div>
          </div>

          {/* Batafsil tugmasi - To'q va aniq ko'rinishda */}
          <button
            onClick={() => setIsOpen(true)}
            className="w-full bg-slate-900 text-white py-5 rounded-[1.5rem] font-black text-[11px]  tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#3de082] hover:text-slate-900 transition-all duration-300 shadow-xl shadow-slate-200"
          >
            Batafsil <ChevronRight size={16} />
          </button>
        </div>
      </motion.div>

      {/* --- MODAL (TO'LIQ MA'LUMOT) --- */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[3.5rem] shadow-2xl p-10 md:p-16 custom-scrollbar"
            >
              {/* Modal Yopish */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-8 right-8 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-6 mb-12">
                <div
                  className="w-20 h-20 rounded-3xl flex items-center justify-center text-5xl bg-slate-50"
                  style={{ color: cardColor }}
                >
                  {prog.icon_url || "🎓"}
                </div>
                <div>
                  <span className="text-xs font-black tracking-[0.3em] text-[#892be2]  mb-2 block">
                    {prog.category_short}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-none tracking-tighter">
                    {title}
                  </h2>
                </div>
              </div>

              <div className="space-y-10">
                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-4  tracking-tight ">
                    Yo'nalish haqida:
                  </h4>
                  <p className="text-slate-500 text-xl leading-relaxed font-medium">
                    {fullDetails}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 p-8 bg-slate-50 rounded-[2rem] border border-slate-100">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400  tracking-widest mb-1">
                      Daraja:
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {prog.level}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400  tracking-widest mb-1">
                      Davomiyligi:
                    </span>
                    <span className="text-xl font-black text-slate-900">
                      {prog.duration}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900 mb-6 ">
                    Asosiy ko'nikmalar:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {getTagsArray(prog.tags).map((tag, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 px-6 py-3 bg-white border border-slate-100 text-slate-700 rounded-2xl font-bold shadow-sm"
                      >
                        <CheckCircle2 size={20} className="text-[#3de082]" />
                        {tag}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-16 py-6 bg-slate-900 text-white rounded-[1.8rem] font-black text-lg hover:bg-[#892be2] transition-all shadow-2xl shadow-purple-200  tracking-widest"
              >
                Tushunarli
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default function Programs() {
  const { t, i18n } = useTranslation();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef(null);
  const Slider = _Slider?.default || _Slider;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await request.get(
          "/academic_programs?select=*&order=id.asc",
        );
        setPrograms(res.data);
      } catch (error) {
        console.error("API Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const steps = [
    {
      id: 1,
      title: "Ro'yxatdan o'tish",
      desc: "IT sohasida o'z yo'lingizni boshlash uchun ariza topshirasiz va saralashdan o'tasiz.",
      icon: <UserPlus size={40} />,
      tag: "1-BOSQICH",
    },
    {
      id: 2,
      title: "Intensiv ta'lim",
      desc: "Zamonaviy texnologiyalar (Frontend, Backend, AI) bo'yicha chuqur bilim olasiz.",
      icon: <Code2 size={40} />,
      tag: "O'QUV JARAYONI",
    },
    {
      id: 3,
      title: "Amaliy loyihalar",
      desc: "Real keyslar asosida jamoaviy ishlash va portfolioni shakllantirish bosqichi.",
      icon: <Layers size={40} />,
      tag: "AMALIYOT",
    },
    {
      id: 4,
      title: "Majburiy stajirovka",
      desc: "Hamkor IT kompaniyalarda 3 oylik haq to'lanadigan amaliyot o'taysiz.",
      icon: <Briefcase size={40} />,
      tag: "KARYERA",
    },
    {
      id: 5,
      title: "Sertifikatlash",
      desc: "Kursni muvaffaqiyatli yakunlab, xalqaro darajadagi diplomga ega bo'ling.",
      icon: <GraduationCap size={40} />,
      tag: "YAKUNIY",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    cssEase: "ease-in-out",
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <PageHero
        crumb={t("programs.hero.crumb")}
        title={t("programs.hero.title")}
      />
      <section className="bg-[#f4f7fa] py-24 px-4 md:px-8 relative overflow-hidden">
        {/* Orqa fon naqshi - Och rangda */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#892be2_1px,transparent_1px)] bg-[length:40px_40px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Slider tugmalari - Premium Style */}
          <div className="flex gap-4 mb-12 justify-end">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-[#3de082] hover:text-white hover:border-[#3de082] transition-all duration-300 shadow-sm"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-200 bg-white flex items-center justify-center text-slate-400 hover:bg-[#3de082] hover:text-white hover:border-[#3de082] transition-all duration-300 shadow-sm"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Slider */}
          <div className="program-slider">
            <Slider ref={sliderRef} {...settings}>
              {steps.map((step, idx) => (
                <div key={step.id} className="px-3 h-full">
                  <div
                    className="bg-white border border-slate-100 p-10 md:p-12 rounded-[3.5rem] min-h-[480px] flex flex-col group transition-all duration-500 relative h-full shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-2xl hover:shadow-purple-500/10"
                    style={{
                      borderTop: `10px solid ${idx % 2 === 0 ? "#3de082" : "#892be2"}`,
                    }}
                  >
                    {/* Icon - Yorqinroq fon bilan */}
                    <div className="mb-10 w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-[#892be2] group-hover:bg-[#892be2] group-hover:text-white transition-all duration-500 shadow-inner text-4xl">
                      {step.icon}
                    </div>

                    <span className="text-[10px] font-black tracking-[0.3em] text-slate-400  mb-5 block">
                      {step.tag}
                    </span>

                    <h3 className="text-slate-900 text-3xl md:text-4xl font-black mb-6 group-hover:text-[#892be2] transition-colors leading-tight tracking-tighter">
                      {step.title}
                    </h3>

                    <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium flex-grow opacity-90">
                      {step.desc}
                    </p>

                    {/* Gradient Glow - Och binafsha */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#892be2] opacity-0 group-hover:opacity-5 blur-[100px] transition-opacity"></div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>
      {/* Kartalar gridi */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {programs.map((prog) => (
                <ProgramCard key={prog.id} prog={prog} lang={i18n.language} />
              ))}
            </AnimatePresence>

            {programs.length === 0 && (
              <div className="col-span-full text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl font-medium  tracking-widest">
                Dasturlar topilmadi
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
