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
      "Toshkent Axborot Texnologiyalari Universiteti qoshidagi Sun'iy intellekt tadqiqot markazi olimlari o'zbek tili semantikasini tushunishga ixtisoslashgan yangi avlod transformer modelini taqdim etishdi. Mazkur model o'zbek tili uchun maxsus ishlab chiqilgan NLP (tabiiy tilni qayta ishlash) testlarida 94% aniqlikka erishib, mavjud xalqaro modellardan sezilarli darajada o'zib ketdi. Ushbu texnologiya kelajakda davlat xizmatlari va ta'lim tizimida o'zbek tilidagi ovozli yordamchilar hamda avtomatik tarjimonlar sifatini tubdan yaxshilashga xizmat qiladi.",
    source: "https://tuit.uz/yangiliklar/ai-model-uzbek",
    sourceLabel: "tuit.uz",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Hamkorlik",
    date: "5 Mart, 2026",
    title:
      "Samsung R&D bilan o'rnatilgan tizimlar laboratoriyasi shartnomasi imzolandi",
    excerpt:
      "TATU Muhandislik maktabi va Janubiy Koreyaning Samsung Electronics kompaniyasi o'rtasida 5 yillik strategik hamkorlik memorandumi imzolandi. Kelishuv doirasida universitet hududida zamonaviy 'Embedded Systems' (O'rnatilgan tizimlar) laboratoriyasi tashkil etiladi. Laboratoriya eng so'nggi texnologik uskunalar bilan jihozlanib, unda talabalar buyumlar interneti (IoT) va aqlli qurilmalar uchun dasturiy ta'minot yaratishni o'rganadilar. Shuningdek, eng iqtidorli talabalar Samsung kompaniyasining xalqaro markazlarida amaliyot o'tash imkoniyatiga ega bo'ladilar.",
    source: "https://tuit.uz/yangiliklar/samsung-lab",
    sourceLabel: "tuit.uz",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Yutuq",
    date: "28 Fevral, 2026",
    title:
      "Talabalar Markaziy Osiyo Robototexnika Olimpiadasida 1-o'rinni egalladilar",
    excerpt:
      "Qozog'istonning Olmaota shahrida bo'lib o'tgan Markaziy Osiyo Robototexnika Olimpiadasida TATUning to'rt nafar iqtidorli bakalavr talabasidan iborat 'Tech-TUIT' jamoasi mutlaq g'oliblikni qo'lga kiritdi. Mintaqaning 14 mamlakatidan kelgan 150 dan ortiq kuchli jamoalar o'rtasida kechgan bahsda bizning talabalarimiz qidiruv-qutqaruv robotlari yo'nalishida eng yuqori ballni jamg'arishdi. Jamoa tomonidan ishlab chiqilgan avtonom robot murakkab to'siqlarni bosib o'tish va sun'iy intellekt yordamida obyektlarni aniqlash tezligi bo'yicha hakamlarni hayratda qoldirdi.",
    source: "https://tuit.uz/yangiliklar/robotics-olympiad",
    sourceLabel: "tuit.uz",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Tadbir",
    date: "20 Fevral, 2026",
    title: "Xalqaro Tech Summit 2026 TATU kampusida bo'lib o'tdi",
    excerpt:
      "TATU asosiy kampusida uch kun davom etgan 'International Tech Summit 2026' o'z ishini yakunladi. Mazkur yirik forumda dunyoning 30 dan ortiq davlatidan 2,000 dan ziyod IT-muhandislar, tadqiqotchilar va yirik texnologik korporatsiyalar vakillari ishtirok etishdi. Anjuman davomida 5G texnologiyalari, kiberxavfsizlik va raqamli iqtisodiyot kabi dolzarb mavzularda 50 dan ortiq ma'ruzalar va master-klasslar o'tkazildi. Tadbir yakunida mahalliy startap loyihalar uchun xorijiy investorlar tomonidan jami 1.5 million dollarlik investitsiya shartnomalari imzolandi.",
    source: "https://tuit.uz/yangiliklar/tech-summit-2026",
    sourceLabel: "tuit.uz",
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
      "Ученые Центра исследований искусственного интеллекта при ТУИТ представили новую модель-трансформер следующего поколения, специально оптимизированную для семантики узбекского языка. Модель достигла рекордной точности в 94% в тестах NLP (обработка естественного языка), превзойдя существующие международные аналоги. Данная технология в будущем послужит основой для качественного улучшения голосовых помощников, автоматических переводчиков и систем интеллектуального анализа текста в государственном и образовательном секторах Узбекистана.",
    source: "https://tuit.uz/yangiliklar/ai-model-uzbek",
    sourceLabel: "tuit.uz",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Партнерство",
    date: "5 марта, 2026",
    title:
      "Подписано соглашение с Samsung R&D о создании лаборатории встроенных систем",
    excerpt:
      "Инженерная школа ТУИТ и южнокорейская компания Samsung Electronics подписали меморандум о стратегическом сотрудничестве сроком на 5 лет. В рамках соглашения на территории университета будет создана современная лаборатория встроенных систем (Embedded Systems). Лаборатория будет оснащена новейшим технологическим оборудованием, где студенты смогут изучать разработку программного обеспечения для интернета вещей (IoT) и умных устройств. Также лучшие студенты получат возможность пройти стажировку в международных исследовательских центрах Samsung.",
    source: "https://tuit.uz/yangiliklar/samsung-lab",
    sourceLabel: "tuit.uz",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Достижение",
    date: "28 февраля, 2026",
    title:
      "Студенты заняли 1-е место на Центральноазиатской олимпиаде по робототехнике",
    excerpt:
      "Команда 'Tech-TUIT', состоящая из четырех талантливых студентов бакалавриата ТУИТ, стала абсолютным победителем Центральноазиатской олимпиады по робототехнике в Алматы. В соревновании среди более 150 команд из 14 стран региона наши студенты набрали наивысшие баллы в категории поисково-спасательных роботов. Разработанный командой автономный робот поразил судей скоростью преодоления сложных препятствий и точностью распознавания объектов с помощью искусственного интеллекта.",
    source: "https://tuit.uz/yangiliklar/robotics-olympiad",
    sourceLabel: "tuit.uz",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Мероприятие",
    date: "20 февраля, 2026",
    title: "В кампусе ТУИТ прошел международный Tech Summit 2026",
    excerpt:
      "На базе главного кампуса ТУИТ завершился трехдневный международный 'Tech Summit 2026'. В этом масштабном форуме приняли участие более 2,000 IT-инженеров, исследователей и представителей крупнейших технологических корпораций из 30 стран мира. В ходе конференции было проведено более 50 докладов и мастер-классов по таким актуальным темам, как технологии 5G, кибербезопасность и цифровая экономика. По итогам мероприятия иностранными инвесторами были подписаны инвестиционные соглашения на сумму 1.5 млн долларов для поддержки локальных стартап-проектов.",
    source: "https://tuit.uz/yangiliklar/tech-summit-2026",
    sourceLabel: "tuit.uz",
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
      "Scientists at the Artificial Intelligence Research Center of TUIT have introduced a next-generation transformer model specialized in understanding Uzbek language semantics. The model achieved an impressive 94% accuracy in specialized Uzbek NLP (Natural Language Processing) tests, significantly outperforming existing global models. This technology will serve as a foundation for radically improving the quality of voice assistants and automated translation systems within the public services and education sectors of Uzbekistan in the near future.",
    source: "https://tuit.uz/yangiliklar/ai-model-uzbek",
    sourceLabel: "tuit.uz",
  },
  {
    id: 2,
    catKey: "partner",
    cat: "Partnership",
    date: "March 5, 2026",
    title: "Embedded Systems Lab Agreement Signed with Samsung R&D",
    excerpt:
      "TUIT School of Engineering and South Korea's Samsung Electronics have signed a 5-year strategic partnership memorandum. Under this agreement, a modern 'Embedded Systems' laboratory will be established on the university campus. The lab will be equipped with the latest technological hardware, where students will learn to develop software for the Internet of Things (IoT) and smart devices. Furthermore, the most talented students will have the opportunity to participate in internships at Samsung's international research and development centers.",
    source: "https://tuit.uz/yangiliklar/samsung-lab",
    sourceLabel: "tuit.uz",
  },
  {
    id: 3,
    catKey: "achievement",
    cat: "Achievement",
    date: "February 28, 2026",
    title: "Students Win 1st Place at Central Asian Robotics Olympiad",
    excerpt:
      "The 'Tech-TUIT' team, consisting of four talented undergraduate students, secured the absolute victory at the Central Asian Robotics Olympiad held in Almaty, Kazakhstan. Competing against more than 150 teams from 14 countries across the region, our students scored the highest points in the search-and-rescue robotics category. The autonomous robot developed by the team impressed judges with its speed in navigating complex obstacles and its precision in object recognition powered by artificial intelligence.",
    source: "https://tuit.uz/yangiliklar/robotics-olympiad",
    sourceLabel: "tuit.uz",
  },
  {
    id: 4,
    catKey: "event",
    cat: "Event",
    date: "February 20, 2026",
    title: "International Tech Summit 2026 Held at TUIT Campus",
    excerpt:
      "The three-day 'International Tech Summit 2026' concluded at the main TUIT campus. This major forum brought together over 2,000 IT engineers, researchers, and representatives from global tech corporations across 30 different countries. Throughout the summit, more than 50 presentations and masterclasses were held on critical topics such as 5G technologies, cybersecurity, and the digital economy. By the end of the event, foreign investors signed investment agreements totaling $1.5 million for local startup projects.",
    source: "https://tuit.uz/yangiliklar/tech-summit-2026",
    sourceLabel: "tuit.uz",
  },
];

const NEWS_META = {
  research: { icon: "🔬", color: "bg-blue-100 text-blue-700" },
  partner: { icon: "🤝", color: "bg-emerald-100 text-emerald-700" },
  achievement: { icon: "🏆", color: "bg-amber-100 text-amber-700" },
  event: { icon: "📅", color: "bg-purple-100 text-purple-700" },
};

const NewsCard = () => {
  const { id } = useParams();
  const { i18n, t } = useTranslation();

  const ALL_NEWS = {
    uz: NEWS_DATA_UZ,
    ru: NEWS_DATA_RU,
    en: NEWS_DATA_EN,
  };

  const currentLangData = ALL_NEWS[i18n.language] || ALL_NEWS["uz"];
  const newsItem = currentLangData.find((item) => item.id === Number(id));

  if (!newsItem) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center font-sans">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          {t("newsCard.notFound.title")}
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          {t("newsCard.notFound.homeLink")}
        </Link>
      </div>
    );
  }

  const meta = NEWS_META[newsItem.catKey];

  return (
    <div className="min-h-screen bg-slate-50 pb-12 font-sans antialiased">
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
          <div className="h-48 sm:h-64 md:h-80 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-7xl sm:text-8xl md:text-9xl transition-all">
            {meta.icon}
          </div>

          <div className="p-6 sm:p-8 md:p-12">
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

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {newsItem.title}
            </h1>

            <div className="w-16 h-1 bg-blue-600 rounded-full mb-8"></div>

            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6 font-medium">
                {newsItem.excerpt}
              </p>
            </div>

            {newsItem.source && (
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 shrink-0 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
                <span>{t("newsCard.sourceLabel")}</span>
                <a
                  href={newsItem.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline font-semibold transition-colors"
                >
                  {newsItem.sourceLabel}
                </a>
                <span>{t("newsCard.sourceSuffix")}</span>
              </div>
            )}

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
