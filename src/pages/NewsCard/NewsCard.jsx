import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, Link } from "react-router-dom";

const NEWS_DATA_UZ = [
  {
    id: 1,
    catKey: "research",
    cat: "Tadqiqot",
    date: "10 Mart, 2026",
    title: "TATU tadqiqotchilari O'zbek tili uchun yangi AI modeli yaratdi",
    excerpt:
      "Sun'iy intellekt tadqiqot markazidagi jamoa O'zbek NLP testlarida 94% aniqlikka erishgan yangi transformer modelini e'lon qildi.",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Hamkorlik",
    date: "5 Mart, 2026",
    title:
      "Samsung R&D bilan o'rnatilgan tizimlar laboratoriyasi shartnomasi imzolandi",
    excerpt:
      "TATU Muhandislik Maktabi va Samsung Electronics 5 yillik hamkorlik shartnomasini rasmiylashtirdi.",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Yutuq",
    date: "28 Fevral, 2026",
    title:
      "Talabalar Markaziy Osiyo Robototexnika Olimpiadasida 1-o'rinni egalladilar",
    excerpt:
      "To'rt nafar bakalavr talabadan iborat jamoa Olmaotada bo'lib o'tgan olimpiadada 14 mamlakatdan raqobatchilarni mag'lub etdi.",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Tadbir",
    date: "20 Fevral, 2026",
    title: "Xalqaro Tech Summit 2026 TATU kampusida bo'lib o'tdi",
    excerpt:
      "2,000 dan ortiq muhandislar, tadqiqotchilar va sanoat vakillari uch kunlik anjumanga yig'ildi.",
  },
];
const NEWS_DATA_RU = [
  {
    id: 1,
    catKey: "research",
    cat: "Исследование",
    date: "10 марта, 2026",
    title:
      "Исследователи ТУИТ разработали новую ИИ-модель для узбекского языка",
    excerpt:
      "Команда Центра исследований ИИ представила новую модель-трансформер, достигшую 94% точности в тестах узбекского NLP.",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Партнерство",
    date: "5 марта, 2026",
    title:
      "Подписано соглашение с Samsung R&D о создании лаборатории встроенных систем",
    excerpt:
      "Инженерная школа ТУИТ и Samsung Electronics оформили соглашение о 5-летнем сотрудничестве.",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Достижение",
    date: "28 февраля, 2026",
    title:
      "Студенты заняли 1-е место на Центральноазиатской олимпиаде по робототехнике",
    excerpt:
      "Команда из четырех студентов бакалавриата победила конкурентов из 14 стран на олимпиаде в Алматы.",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Мероприятие",
    date: "20 февраля, 2026",
    title: "В кампусе ТУИТ прошел международный Tech Summit 2026",
    excerpt:
      "Более 2,000 инженеров, исследователей и представителей отрасли собрались на трехдневную конференцию.",
  },
];
const NEWS_DATA_EN = [
  {
    id: 1,
    catKey: "research",
    cat: "Research",
    date: "March 10, 2026",
    title: "TUIT Researchers Create New AI Model for Uzbek Language",
    excerpt:
      "The AI Research Center team announced a new transformer model that achieved 94% accuracy in Uzbek NLP tests.",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Partnership",
    date: "March 5, 2026",
    title: "Embedded Systems Lab Agreement Signed with Samsung R&D",
    excerpt:
      "TUIT School of Engineering and Samsung Electronics formalized a 5-year partnership agreement.",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Achievement",
    date: "February 28, 2026",
    title: "Students Win 1st Place at Central Asian Robotics Olympiad",
    excerpt:
      "A team of four undergraduate students defeated competitors from 14 countries at the Olympiad held in Almaty.",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Event",
    date: "February 20, 2026",
    title: "International Tech Summit 2026 Held at TUIT Campus",
    excerpt:
      "Over 2,000 engineers, researchers, and industry representatives gathered for the three-day conference.",
  },
];

// Stil va ikonka sozlamalari (Meta ma'lumotlar)
const NEWS_META = {
  research: { icon: "🔬", color: "bg-blue-100 text-blue-700" },
  partner: { icon: "🤝", color: "bg-emerald-100 text-emerald-700" },
  achievement: { icon: "🏆", color: "bg-amber-100 text-amber-700" },
  event: { icon: "📅", color: "bg-purple-100 text-purple-700" },
};

const NewsCard = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();

  // 1. Ma'lumotlarni tillar bo'yicha bitta ob'ektga yig'amiz
  const ALL_NEWS = {
    uz: NEWS_DATA_UZ,
    ru: NEWS_DATA_RU,
    en: NEWS_DATA_EN,
  };

  // 2. Joriy tildagi massivni olamiz (agar til topilmasa 'uz' default bo'ladi)
  const currentLangData = ALL_NEWS[i18n.language] || ALL_NEWS["uz"];

  // 3. ID bo'yicha topamiz (useState va setNewsItem shart emas!)
  const newsItem = currentLangData.find((item) => item.id === Number(id));

  // Agar ma'lumot topilmasa (Sahifa yangilanganda yoki xato ID bo'lsa)

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Ma'lumot topilmadi!
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Bosh sahifaga qaytish
        </Link>
      </div>
    );
  }

  const meta = NEWS_META[newsItem.catKey];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans antialiased">
      {/* Mobil qurilmalar uchun tepada kichik "Orqaga" tugmasi */}
      <div className="max-w-3xl mx-auto px-4 pt-4 md:pt-8">
        <Link
          to="/news"
          className="inline-flex items-center text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("newsCard.backBtn")}
        </Link>
      </div>

      <div className="max-w-3xl mx-auto px-0 md:px-4">
        <div className="bg-white md:rounded-3xl border-y md:border border-slate-200 shadow-sm overflow-hidden">
          {/* Rasm/Ikonka qismi - Mobilda balandligi kichikroq */}
          <div className="h-48 sm:h-64 md:h-80 bg-linear-to-br from-slate-100 to-blue-50 flex items-center justify-center text-7xl sm:text-8xl md:text-9xl transition-all">
            {meta.icon}
          </div>

          <div className="p-6 sm:p-8 md:p-12">
            {/* Kategoriya va Sana */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <span
                className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${meta.color}`}
              >
                {newsItem.cat}
              </span>
              <span className="text-xs sm:text-sm text-slate-400 font-medium">
                {newsItem.date}
              </span>
            </div>

            {/* Sarlavha - Mobilda kichikroq, Desktopda kattaroq */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>

            {/* Vizual ajratuvchi chiziq (Divider) */}
            <div className="w-16 h-1 bg-blue-600 rounded-full mb-8"></div>

            {/* Asosiy matn */}
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {newsItem.excerpt}
              </p>
            </div>

            {/* Pastki qism */}
            <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-between">
              <button className="flex items-center text-slate-400 hover:text-blue-500 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
                <span className="text-xs font-semibold">
                  {t("newsCard.shareBtn")}
                </span>
              </button>
              <span className="text-[10px] text-slate-300 uppercase tracking-widest font-bold">
                {t("newsCard.location")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
