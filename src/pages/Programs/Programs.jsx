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
} from "lucide-react";
import { default as Slider } from "react-slick";

const ProgramCard = ({ prog, lang }) => {
  // Rasmga ko'ra ranglar palitrasini o'rnatamiz
  const cardColor = prog.bg_color || "#3b82f6"; // Default ko'k

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

  return (
    <motion.div
      layout
      whileHover={{ y: -8 }}
      className="group relative bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100 flex flex-col h-full overflow-hidden"
    >
      {/* Kartaning yuqori qismidagi rangli chiziq/gradient (Rasmga mos) */}
      <div
        className="absolute top-0 left-0 right-0 h-2 opacity-80"
        style={{
          background: `linear-gradient(90deg, ${cardColor}, #892be2)`,
        }}
      />

      {/* Badge va Icon qismi */}
      <div className="flex justify-between items-start mb-10">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-sm border border-slate-50 transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundColor: `${cardColor}10`, color: cardColor }}
        >
          {prog.icon_url || "🎓"}
        </div>

        <span
          className="px-4 py-1.5 rounded-full text-[12px] font-bold tracking-widest uppercase"
          style={{ backgroundColor: `${cardColor}15`, color: cardColor }}
        >
          {prog.category_short || "CS"}
        </span>
      </div>

      {/* Sarlavha - Kattaroq shriftda */}
      <h3 className="text-2xl md:text-[26px] font-bold text-slate-800 mb-4 leading-tight group-hover:text-indigo-600 transition-colors">
        {prog[`name_${lang}`] || prog.name_uz}
      </h3>

      {/* Tavsif - Toza va ochiq */}
      <p className="text-slate-500 text-lg leading-relaxed mb-8 line-clamp-3 flex-grow">
        {prog[`desc_${lang}`] || prog.desc_uz}
      </p>

      {/* Teglar (Pills) - Rasmda ko'rsatilgandek */}
      <div className="flex flex-wrap gap-2 mb-10">
        {getTagsArray(prog.tags).map((tag, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full bg-slate-50 text-slate-600 text-sm font-semibold border border-slate-100 hover:border-indigo-200 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer qismi - Meta ma'lumotlar */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <GraduationCap size={20} className="text-slate-300" />
          <span className="text-base">{prog.level || "Kurs"}</span>
        </div>

        <div className="flex items-center gap-2 text-slate-400 font-medium">
          <Clock size={20} className="text-slate-300" />
          <span className="text-base">{prog.duration || "6 oy"}</span>
        </div>
      </div>
    </motion.div>
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
      <section className="bg-[#16181d] py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Orqa fon naqshi */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#3de082_1px,transparent_1px)] bg-size-[40px_40px]"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex gap-3 mr-0 md:mr-4 mb-8 justify-end">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center text-white hover:bg-[#3de082] hover:text-black hover:border-[#3de082] transition-all duration-300"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-14 h-14 rounded-full border border-gray-800 flex items-center justify-center text-white hover:bg-[#3de082] hover:text-black hover:border-[#3de082] transition-all duration-300"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Slider */}
          <div className="program-slider">
            <Slider ref={sliderRef} {...settings}>
              {steps.map((step) => (
                <div key={step.id} className="px-3 h-full">
                  <div className="bg-[#1f2229] border border-gray-800 p-8 md:p-10 rounded-[2.5rem] min-h-[450px] flex flex-col hover:border-[#892be2]/50 group transition-all duration-500 relative h-full">
                    {/* Icon */}
                    <div className="mb-8 w-20 h-20 bg-[#16181d] rounded-2xl flex items-center justify-center text-[#3de082] group-hover:bg-[#892be2] group-hover:text-white transition-all duration-500 shadow-xl">
                      {step.icon}
                    </div>

                    <span className="text-[11px] font-bold tracking-widest text-gray-500 mb-4 block">
                      {step.tag}
                    </span>

                    <h3 className="text-white text-2xl md:text-3xl font-bold mb-5 group-hover:text-[#3de082] transition-colors leading-tight">
                      {step.title}
                    </h3>

                    <p className="text-gray-400 text-base md:text-lg leading-relaxed flex-grow">
                      {step.desc}
                    </p>

                    {/* Gradient Glow */}
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#892be2] opacity-0 group-hover:opacity-10 blur-[100px] transition-opacity"></div>
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
              <div className="col-span-full text-center py-20 text-slate-400 border-2 border-dashed border-slate-200 rounded-3xl font-medium uppercase tracking-widest">
                Dasturlar topilmadi
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
