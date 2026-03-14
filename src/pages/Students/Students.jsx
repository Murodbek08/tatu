import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionSubtitle from "../../components/ui/SectionSubtitle";
import SectionTitle from "../../components/ui/SectionTitle";

function Students() {
  const CLUBS = [
    {
      name: "IEEE Talabalar Filiali",
      members: 420,
      icon: "⚡",
      desc: "Texnik seminarlar, musobaqalar va global tarmoqlar",
    },
    {
      name: "AI Robototexnika Klubi",
      members: 280,
      icon: "🤖",
      desc: "Avtonom robotlar yaratish va xalqaro musobaqalarda ishtirok etish",
    },
    {
      name: "Kiber Himoya Jamoasi",
      members: 160,
      icon: "🛡️",
      desc: "CTF musobaqalari va kiberxavfsizlik mashqlari laboratoriyasi",
    },
    {
      name: "Startap Inkubatori",
      members: 95,
      icon: "🚀",
      desc: "Mentorlik va moliyalash bilan g'oyalarni kompaniyaga aylantirish",
    },
  ];

  return (
    <div>
      <PageHero
        crumb="Talabalar"
        title="Talaba Hayoti"
        subtitle="Dars xonalari va laboratoriyalardan tashqari — klub, musobaqa va kampus tajribalarining jonli talaba hamjamiyati."
      />

      <div className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel>Talaba Tashkilotlari</SectionLabel>
          <div className="mt-1 mb-3">
            <SectionTitle>Faol Bo'ling</SectionTitle>
          </div>
          <SectionSubtitle>
            Muhandislik, texnologiya, san'at va jamoat xizmati bo'yicha 30+ faol
            talaba klubi va tashkilotlariga qo'shiling.
          </SectionSubtitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 mb-20">
            {CLUBS.map((club) => (
              <div
                key={club.name}
                className="bg-white rounded-2xl p-7 border border-slate-200 flex gap-5 items-start cursor-pointer group hover:border-amber-400 hover:translate-x-1 transition-all duration-150"
              >
                <div className="w-14 h-14 bg-[#0a1628] rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                  {club.icon}
                </div>
                <div>
                  <h4 className="text-[16px] font-extrabold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {club.name}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">
                    {club.desc}
                  </p>
                  <span className="text-amber-600 font-bold text-sm">
                    👥 {club.members} a'zo
                  </span>
                </div>
              </div>
            ))}
          </div>

          <SectionLabel>Kampus Imkoniyatlari</SectionLabel>
          <div className="mt-2 mb-8">
            <SectionTitle>Zamonaviy O'quv Muhiti</SectionTitle>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {[
              {
                title: "AI va ML Laboratoriyasi",
                desc: "96 ish stantsiyasi, NVIDIA A100 GPU cluster, 3D bosib chiqarish stantsiyasi",
                icon: "🖥️",
              },
              {
                title: "Kiberxavfsizlik Laboratoriyasi",
                desc: "Etik xakerlik va mudofaa treningi uchun ajratilgan tarmoq muhiti",
                icon: "🔐",
              },
              {
                title: "Innovatsiya Habı",
                desc: "Co-working, pitch xonalari, prototiplash vositalari, mentor tarmog'i",
                icon: "💡",
              },
              {
                title: "Kutubxona va Tadqiqot Markazi",
                desc: "200,000+ kitob, IEEE Xplore, ScienceDirect va Web of Science to'liq kirish",
                icon: "📚",
              },
              {
                title: "Sport Majmuasi",
                desc: "Suzish havzasi, sport zal, basketbol, futbol, stol tennisi maydonlari",
                icon: "🏋️",
              },
              {
                title: "Talabalar Yotoqxonasi",
                desc: "2,400 o'rin, yuqori tezlikli internet, o'qish xonalari, 24/7 xavfsizlik xizmati",
                icon: "🏠",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-2xl p-7 border border-slate-200 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h4 className="text-[15px] font-extrabold text-slate-900 mb-2">
                  {f.title}
                </h4>
                <p className="text-slate-500 text-[13px] leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Students;