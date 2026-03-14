import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";

function Research() {
  const AREAS = [
    {
      title: "Sun'iy Intellekt va ML",
      desc: "Neyron arxitekturalar, O'zbek NLP, kompyuter ko'rishi",
      projects: 24,
      icon: "🧠",
      bar: "from-blue-600 to-blue-800",
    },
    {
      title: "Kiberxavfsizlik",
      desc: "Tarmoq himoyasi, kriptografiya, zero-trust tizimlar",
      projects: 18,
      icon: "🛡️",
      bar: "from-rose-600 to-rose-800",
    },
    {
      title: "Aqlli Infratuzilma",
      desc: "IoT sensorlar, aqlli shahar, energiya optimizatsiyasi",
      projects: 15,
      icon: "🏙️",
      bar: "from-emerald-600 to-emerald-800",
    },
    {
      title: "Ma'lumotlar Muhandisligi",
      desc: "Taqsimlangan tizimlar, real-vaqt tahlili, data lakes",
      projects: 21,
      icon: "📡",
      bar: "from-violet-600 to-violet-800",
    },
  ];

  return (
    <div>
      <PageHero
        crumb="Tadqiqot"
        title="Tadqiqot va Innovatsiya"
        subtitle="TATU Muhandislik Maktabi AI, kiberxavfsizlik, ma'lumotlar fanlari va aqlli infratuzilmada ilg'or tadqiqotlarni boshqaradi."
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Tadqiqot Yo'nalishlari</SectionLabel>
          <div className="mt-1 mb-10">
            <SectionTitle>Innovatsiya Sohalarimiz</SectionTitle>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {AREAS.map((area) => (
              <div
                key={area.title}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex cursor-pointer group hover:-translate-y-1 hover:shadow-xl transition-all duration-200"
              >
                <div
                  className={`w-2 bg-gradient-to-b ${area.bar} flex-shrink-0`}
                />
                <div className="p-8">
                  <div className="text-4xl mb-4">{area.icon}</div>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {area.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {area.desc}
                  </p>
                  <span className="inline-block bg-blue-50 text-blue-700 text-sm font-bold px-4 py-2 rounded-xl">
                    {area.projects} Faol Loyiha
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Stats band */}
          <div className="bg-[#0a1628] rounded-3xl p-12">
            <h3
              className="text-white font-black text-2xl text-center mb-10"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Tadqiqot Ko'rsatkichlari
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { v: "1,200+", l: "Nashrlar", s: "2025 yilda" },
                { v: "78", l: "Faol Patentlar", s: "ro'yxatga olingan" },
                { v: "15", l: "Startaplar", s: "tashkil etilgan" },
                { v: "$8M", l: "Tadqiqot Mablag'i", s: "yillik byudjet" },
              ].map((stat) => (
                <div key={stat.l} className="text-center">
                  <p className="text-amber-400 font-black text-4xl leading-none mb-2">
                    {stat.v}
                  </p>
                  <p className="text-white font-bold text-[15px] mb-1">
                    {stat.l}
                  </p>
                  <p className="text-white/40 text-xs">{stat.s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Labs */}
          <div className="mt-20">
            <SectionLabel>Laboratoriyalar</SectionLabel>
            <div className="mt-2 mb-8">
              <SectionTitle>Zamonaviy Ilmiy Markazlar</SectionTitle>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[
                {
                  name: "AI va ML Laboratoriyasi",
                  desc: "96 ish stantsiyasi, NVIDIA A100 GPU cluster, 3D bosib chiqarish",
                  icon: "🖥️",
                },
                {
                  name: "Kiberxavfsizlik Laboratoriyasi",
                  desc: "Etik xakerlik va himoya treningi uchun ajratilgan tarmoq muhiti",
                  icon: "🔐",
                },
                {
                  name: "Innovatsiya Habı",
                  desc: "Co-working, pitch xonalari, prototiplash vositalari, mentor tarmog'i",
                  icon: "💡",
                },
                {
                  name: "Elektr Muhandislik Lab",
                  desc: "Smart grid simulyatori, sinovchi stendlar va energiya o'lchagichlar",
                  icon: "⚡",
                },
                {
                  name: "IoT Laboratoriyasi",
                  desc: "100+ sensor turi, embedded tizimlar, FPGA ishlanmasi platformasi",
                  icon: "📡",
                },
                {
                  name: "Robototexnika Markazi",
                  desc: "Avtomatik manipulyatsiya tizimi, 12 ta sanoat robot qo'li",
                  icon: "🤖",
                },
              ].map((lab) => (
                <div
                  key={lab.name}
                  className="bg-white rounded-2xl p-7 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-4">{lab.icon}</div>
                  <h4 className="text-[15px] font-extrabold text-slate-900 mb-2">
                    {lab.name}
                  </h4>
                  <p className="text-slate-500 text-[13px] leading-relaxed">
                    {lab.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Research;