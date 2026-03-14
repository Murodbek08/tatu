import PageHero from "../../components/ui/PageHero";
const NEWS = [
  {
    id: 1,
    cat: "Tadqiqot",
    icon: "🔬",
    date: "10 Mart, 2026",
    title: "TATU tadqiqotchilari O'zbek tili uchun yangi AI modeli yaratdi",
    excerpt:
      "Sun'iy intellekt tadqiqot markazidagi jamoa O'zbek NLP testlarida 94% aniqlikka erishgan yangi transformer modelini e'lon qildi.",
  },
  {
    id: 2,
    cat: "Hamkorlik",
    icon: "🤝",
    date: "5 Mart, 2026",
    title:
      "Samsung R&D bilan o'rnatilgan tizimlar laboratoriyasi shartnomasi imzolandi",
    excerpt:
      "TATU Muhandislik Maktabi va Samsung Electronics 5 yillik hamkorlik shartnomasini rasmiylashtirdi.",
  },
  {
    id: 3,
    cat: "Yutuq",
    icon: "🏆",
    date: "28 Fevral, 2026",
    title:
      "Talabalar Markaziy Osiyo Robototexnika Olimpiadasida 1-o'rinni egalladilar",
    excerpt:
      "To'rt nafar bakalavr talabadan iborat jamoa Olmaotada bo'lib o'tgan olimpiadada 14 mamlakatdan raqobatchilarni mag'lub etdi.",
  },
  {
    id: 4,
    cat: "Tadbir",
    icon: "📅",
    date: "20 Fevral, 2026",
    title: "Xalqaro Tech Summit 2026 TATU kampusida bo'lib o'tdi",
    excerpt:
      "2,000 dan ortiq muhandislar, tadqiqotchilar va sanoat vakillari uch kunlik anjumanga yig'ildi.",
  },
];

const NEWS_BADGE = {
  Tadqiqot: "bg-blue-50 text-blue-700",
  Hamkorlik: "bg-emerald-50 text-emerald-700",
  Yutuq: "bg-amber-50 text-amber-700",
  Tadbir: "bg-violet-50 text-violet-700",
};
function News() {
  return (
    <div>
      <PageHero
        crumb="Yangiliklar"
        title="Yangiliklar va E'lonlar"
        subtitle="TATU Muhandislik Maktabidagi yutuqlar, hamkorliklar va kampus hayotidan xabardor bo'ling."
      />

      <div className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden mb-8 grid grid-cols-1 md:grid-cols-2">
            <div className="bg-gradient-to-br from-[#0a1628] to-blue-800 flex items-center justify-center text-[96px] p-16 min-h-[220px]">
              🔬
            </div>
            <div className="p-10 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-5">
                <span
                  className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_BADGE[NEWS[0].cat]}`}
                >
                  {NEWS[0].cat}
                </span>
                <span className="text-slate-400 text-sm">{NEWS[0].date}</span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-4 leading-tight">
                {NEWS[0].title}
              </h2>
              <p className="text-slate-500 text-[15px] leading-relaxed mb-7">
                {NEWS[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <button className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-colors">
                  To'liq O'qish →
                </button>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {NEWS.slice(1).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden cursor-pointer group hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
              >
                <div className="h-40 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center text-6xl">
                  {item.icon}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wide ${NEWS_BADGE[item.cat]}`}
                    >
                      {item.cat}
                    </span>
                    <span className="text-xs text-slate-400">{item.date}</span>
                  </div>
                  <h4 className="text-[15px] font-extrabold text-slate-900 mb-2.5 leading-snug group-hover:text-blue-700 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed mb-5 line-clamp-3">
                    {item.excerpt}
                  </p>
                  <button className="w-full border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-semibold py-2.5 rounded-xl transition-colors">
                    Ko'proq O'qish →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default News;
