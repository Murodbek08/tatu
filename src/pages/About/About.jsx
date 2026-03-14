import PageHero from "../../components/ui/PageHero";
import SectionLabel from "../../components/ui/SectionLabel";
import SectionTitle from "../../components/ui/SectionTitle";

function About() {
  return (
    <div>
      <PageHero
        crumb="Haqimizda"
        title="TATU Muhandislik Maktabi Haqida"
        subtitle="Muhandislik mukammalligi, tadqiqot yetakchiligi va milliy xizmatning etmish yili — O'zbekistonning raqamli kelajagini harakatga keltiradigan aqlllarni shakllantirish."
      />

      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* MVV */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {[
              {
                title: "Missiyamiz",
                icon: "🎯",
                text: "Tadqiqot va innovatsiyaga asoslangan jahon darajasidagi muhandislik ta'limini ta'minlash — O'zbekistonning raqamli iqtisodiyotini harakatga keltiradigan va global texnologiya rivojiga hissa qo'shadigan liderlarni tarbiyalash.",
              },
              {
                title: "Vizyonimiz",
                icon: "🌟",
                text: "2030 yilga kelib global miqyosda tan olingan muhandislik muassasasiga aylanish — texnologik chegaralarni qayta belgilaydigan va insoniyatning eng dolzarb muammolarini hal qiladigan bitiruvchilar tayyorlash.",
              },
              {
                title: "Qadriyatlarimiz",
                icon: "⚖️",
                text: "Mukammallik, halollik, innovatsiya, inklyuzivlik va xizmat. Biz har bir talaba muvaffaqiyat uchun zarur vositalar va har bir g'oya eshitilishga loyiq deb ishonамiz.",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200"
              >
                <div className="text-4xl mb-5">{c.icon}</div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">
                  {c.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {c.text}
                </p>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <SectionLabel>Tarixamiz</SectionLabel>
          <div className="mt-1 mb-3">
            <SectionTitle>70 Yillik Muhandislik Mukammalligi</SectionTitle>
          </div>
          <div className="relative pl-10 mt-8">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200" />
            {[
              [
                "1955",
                "Toshkent Politexnika Instituti Muhandislik Fakulteti sifatida tashkil etildi",
              ],
              [
                "1972",
                "Markaziy Osiyoda birinchi Kompyuter Fanlari kafedrasi ochildi",
              ],
              [
                "1991",
                "O'zbekiston mustaqilligidan keyin universitet maqomiga erishdi",
              ],
              [
                "2001",
                "Toshkent Axborot Texnologiyalari Universiteti (TATU) nomi berildi",
              ],
              [
                "2015",
                "Xalqaro hamkorlar bilan AI Tadqiqot Markazi ishga tushirildi",
              ],
              [
                "2020",
                "QS Reytingi bo'yicha Markaziy Osiyoda №1 Muhandislik Maktabi",
              ],
              [
                "2024",
                "Yangi Muhandislik Innovatsiya Habı ochildi — 12,000 m² zamonaviy bino",
              ],
              [
                "2026",
                "O'zbekistondagi birinchi Sun'iy Intellekt PhD dasturi ishga tushirildi",
              ],
            ].map(([year, event], i) => (
              <div key={year} className="flex gap-6 mb-8 items-start relative">
                <div
                  className={`absolute -left-[22px] w-4 h-4 rounded-full border-4 border-white shadow ${
                    i === 7 ? "bg-amber-500" : "bg-[#0a1628]"
                  }`}
                />
                <div>
                  <span
                    className={`text-xs font-black tracking-widest uppercase ${i === 7 ? "text-amber-500" : "text-slate-400"}`}
                  >
                    {year}
                  </span>
                  <p className="text-[15px] text-slate-800 mt-1 leading-relaxed">
                    {event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
