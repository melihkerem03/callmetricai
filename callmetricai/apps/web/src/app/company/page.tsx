"use client";

import Link from "next/link";
import HeroImageArea from "@/components/HeroImageArea";

export default function CompanyPage() {
  return (
    <>
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
          {/* Left Side - Text Content */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              HAKKIMIZDA
            </p>
            <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              Biz Kimiz
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-gray-600">
              CallMetric AI, çağrı merkezi performansını analiz eden bir yazılımın ötesinde; insan zekâsı ve Agentic AI&apos;nın dönüştürücü gücünü birleştiren bir vizyondur.
            </p>
            <p className="text-lg leading-relaxed text-gray-600">
              Amacımız, insan emeğini, zamanı ve potansiyeli optimize ederek çalışma hayatını daha akıllı, daha verimli ve daha anlamlı hale getirmektir. Teknolojiyi insanın yerini almak için değil; insanın performansını ve yaşam kalitesini yükseltmek için kullanıyoruz.
            </p>
          </div>

          {/* Right Side - Circular Image Area */}
          <HeroImageArea />
        </div>
      </div>
    </section>

    {/* Vision & Mission Section */}
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">Vizyonumuz & Misyonumuz</h2>
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Vizyonumuz</h3>
            <p className="text-base leading-relaxed text-gray-600">
              İnsan zekâsı ile yapay zekânın aynı hedefte birleştiği bir gelecek inşa etmek. Her çağrıda, her kararda sezgiyi ve veriyi bir araya getirerek iş dünyasının verimlilik, doğruluk ve mutluluk dengesini yeniden tanımlamak.
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900">Misyonumuz</h3>
            <p className="text-base leading-relaxed text-gray-600">
              Agentic AI teknolojilerini insan zekâsıyla birleştirerek çağrı merkezlerinde performansı, üretkenliği ve memnuniyeti artırmak. Her çalışanın potansiyelini ortaya çıkarmak, yöneticilerin kararlarını kolaylaştırmak ve müşterilere daha iyi bir deneyim sunmaktır.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Story & Journey Section */}
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">Hikayemiz & Yolculuğumuz</h2>
        <p className="mb-4 text-base leading-relaxed text-gray-600">
          CallMetric AI fikri, hızlı büyüyen ama karmaşıklaşan iş dünyasının içinden doğdu. Yıllar boyunca operasyonlarda aynı döngüyü gözlemledik: insanlar yoğun çalışıyor ama süreçler verimsizdi. Teknolojiyi insan için çalıştırmak, yapay zekâyı insana rakip değil iş ortağı yapmak vizyonuyla yola çıktık.
        </p>
        <p className="text-base leading-relaxed text-gray-600">
          Bu bir yazılım değil, bir dönüşüm yolculuğu. Her adımda, insanı merkezde tutmaya kararlıyız. Çünkü nihai hedefimiz yalnızca işi değil — hayatı optimize etmek.
        </p>
      </div>
    </section>

    {/* Values Section */}
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">Değerlerimiz</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Uyum</h3>
            <p className="text-sm leading-relaxed text-gray-600">İnsan zekâsı ve yapay zekânın birlikte çalıştığı sistemler kurmak.</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Verimlilik</h3>
            <p className="text-sm leading-relaxed text-gray-600">Zamanı, işi ve enerjiyi en etkili şekilde kullanmak.</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Güven</h3>
            <p className="text-sm leading-relaxed text-gray-600">Etik, şeffaf ve KVKK&apos;ya tam uyumlu teknolojiler geliştirmek.</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Yenilik</h3>
            <p className="text-sm leading-relaxed text-gray-600">Sürekli öğrenen sistemler ve gelişen ekip kültürü.</p>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">Sürdürülebilir Fayda</h3>
            <p className="text-sm leading-relaxed text-gray-600">Herkesin kazandığı bir denge — çalışan, kurum, müşteri.</p>
          </div>
        </div>
      </div>
    </section>

    {/* R&D & Field Tests Section */}
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Ar-Ge Ekosistemimiz</h2>
            <p className="mb-4 text-base leading-relaxed text-gray-600">
              CallMetric AI, Düzce Teknopark Ar-Ge ofisinde konumlanan profesyonel bir teknoloji projesidir. Akademik danışmanlar, veri bilimciler ve yazılım mühendislerinden oluşan ekip, Türkiye&apos;nin farklı üniversiteleriyle etkileşim içinde sürekli olarak modeli geliştirir.
            </p>
            <p className="text-sm italic leading-relaxed text-gray-600">
              Düzce Teknopark iş birliği, CallMetric AI&apos;yi Türkiye&apos;nin güçlü yapay zekâ girişimlerinden biri haline getirmiştir.
            </p>
          </div>
          <div>
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">Saha Testleri</h2>
            <p className="mb-4 text-base leading-relaxed text-gray-600">
              CallMetric AI, Bilsoft Yazılım Çağrı Merkezi ile yürütülen ortak pilot proje kapsamında gerçek operasyonel ortamda test edilmiştir. Binlerce çağrı verisi analiz edilerek, platformun doğruluk oranı, duygu tanıma kapasitesi ve raporlama kalitesi optimize edilmiştir.
            </p>
            <p className="text-sm italic leading-relaxed text-gray-600">
              Bugün CallMetric AI, laboratuvar ortamında değil, saha verileriyle kanıtlanmış bir kurumsal çözüm olarak faaliyet göstermektedir.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Founder Message Section */}
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="rounded-2xl bg-gradient-to-br from-cyan-50 to-orange-50 p-12 md:p-16">
          <blockquote className="text-center">
            <p className="mb-6 text-2xl font-medium leading-relaxed text-gray-900 md:text-3xl">
              &quot;Teknoloji, insanın yerini almak için değil, onun potansiyelini büyütmek için vardır. CallMetric AI bu inançla doğdu; çünkü biz biliyoruz ki en iyi çağrı merkezleri, insan sezgisiyle yapay zekânın uyum içinde çalıştığı merkezlerdir.&quot;
            </p>
            <footer className="text-lg font-semibold text-gray-700">
              — Ferhat Sağlam, Kurucu
            </footer>
          </blockquote>
        </div>
        <p className="mt-12 text-center text-lg leading-relaxed text-gray-600">
          Her veri, bir hikâyeyi anlatır. Biz bu hikâyeleri analiz ediyor, anlamlandırıyor ve geleceğe yön veriyoruz. CallMetric AI, sadece bir performans aracı değil, kurumların öğrenen organizmaya dönüşüm yolculuğundaki akıllı rehberidir.
        </p>
      </div>
    </section>

    {/* Leadership & Board Section */}
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Leadership Section */}
        <div className="mb-20">
          <h2 className="mb-16 text-5xl font-bold text-gray-900 md:text-6xl">Yöneticilerimiz</h2>
          <div className="grid grid-cols-2 gap-12 md:grid-cols-3 lg:grid-cols-5">
            {[
              { name: "Team 1", title: "CEO & Kurucu", image: "/team-1.jpg" },
              { name: "Team 2", title: "CTO & Kurucu", image: "/team-2.jpg" },
              { name: "Team 3", title: "CMO", image: "/team-3.jpg" },
              { name: "Team 4", title: "CCO", image: "/team-4.jpg" },
              { name: "Team 5", title: "CFO", image: "/team-5.jpg" },
            ].map((person, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-6 h-48 w-48 overflow-hidden rounded-full md:h-56 md:w-56">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{person.name}</h3>
                <p className="text-base text-gray-600">{person.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Board Members Section */}
        <div>
          <h2 className="mb-16 text-5xl font-bold text-gray-900 md:text-6xl">Yönetim Kurulu</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {[
              { name: "Team 6", title: "Partner, Şirket Adı", image: "/team-6.jpg" },
              { name: "Team 7", title: "Managing Director, Şirket Adı", image: "/team-7.jpg" },
              { name: "Team 8", title: "Partner, Şirket Adı", image: "/team-8.jpg" },
            ].map((person, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="mb-6 h-48 w-48 overflow-hidden rounded-full md:h-56 md:w-56">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">{person.name}</h3>
                <p className="text-base text-gray-600">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Our Investors Section */}
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top border line */}
        <div className="mb-12 border-t border-gray-300"></div>
        
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Side - Title */}
          <div className="flex items-center">
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Yatırımcılarımız
            </h2>
          </div>

          {/* Right Side - Investor Logos */}
          <div className="grid grid-cols-2 gap-8 md:grid-cols-2">
            {[
              { name: "Yatırımcı 1", logo: "/investor-1.png" },
              { name: "Yatırımcı 2", logo: "/investor-2.png" },
            ].map((investor, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 grayscale transition-all hover:grayscale-0"
              >
                <img
                  src={investor.logo}
                  alt={investor.name}
                  className="max-h-16 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom border line */}
        <div className="mt-12 border-t border-gray-300"></div>
      </div>
    </section>

    {/* Get in Touch Section */}
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Side - Title, Map and Address */}
          <div className="flex flex-col">
            <h2 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              İletişime Geçin
            </h2>
            
            {/* Map */}
            <div className="mb-4">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                {/* Map placeholder - replace with actual map embed or image */}
                <img
                  src="/office-map.jpg"
                  alt="Office Location Map"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            {/* Address below map */}
            <p className="text-lg text-gray-700">
              Teknopark, Orhangazi Mah. Merkez, Düzce
            </p>
          </div>

          {/* Right Side - Circular Image Area with decorative elements (same as about section) - Logo area, don't touch */}
          <div className="flex items-center justify-center">
            <div className="relative h-[500px] w-[500px]">
              {/* Dashed circular orbits */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Outer dashed circle */}
                <div className="absolute h-[450px] w-[450px] rounded-full border-2 border-dashed border-gray-300"></div>
                {/* Inner dashed circle */}
                <div className="absolute h-[350px] w-[350px] rounded-full border-2 border-dashed border-gray-300"></div>
              </div>

              {/* Main circular image container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-[400px] w-[400px] rounded-full overflow-hidden bg-gradient-to-br from-cyan-50 to-orange-50 shadow-xl">
                  {/* Image - using same source as about section */}
                  <img
                    src="/about-image.jpg"
                    alt="CallMetric AI Office"
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}

