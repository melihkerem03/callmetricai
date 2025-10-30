import Image from "next/image";

export default function ProductIntro() {
  const features = [
    {
      title: "Gerçek Zamanlı İşbirliği: İnsan + Agentic AI",
      description: "Temsilciler çağrı sırasında Agentic AI tarafından desteklenir. Sistem, konuşmayı analiz eder, duygu ve niyet tespiti yapar, ve temsilciye anlık öneriler sunar; doğru anda, doğru aksiyonu almasını sağlar.",
      image: "/call2.webp"
    },
    {
      title: "Yöneticiler için Akıllı Performans Panelleri",
      description: (
        <>
          Gerçek zamanlı verilerle ekiplerinizi yönetin. Temsilci performansını, çağrı kalitesini ve müşteri memnuniyetini aynı ekranda izleyin. AI, size yalnızca metrik değil; <strong>anlam</strong> sunar.
        </>
      ),
      image: "/call3.webp"
    },
    {
      title: "SER + NLP Füzyonu: Duygu ve İçerik Analizinde Yeni Seviye",
      description: (
        <>
          Konuşmanın hem ses hem metin katmanını analiz eden Agentic AI, empati, stres, çözüm oranı, prosedür uyumu gibi parametreleri birleştirir. Böylece çağrının tamamı bir <strong>&quot;dönüşüm yolculuğu&quot;</strong> olarak görülür.
        </>
      ),
      image: "/call4.webp"
    },
    {
      title: "Anlık Koçluk & Gelişim Motoru",
      description: (
        <>
          Agentic AI, her temsilcinin güçlü ve gelişime açık yönlerini belirler. Anlık öneriler ve kişisel gelişim planlarıyla sürekli öğrenme kültürünü destekler. Amaç, sadece ölçmek değil aynı zamanda <strong>geliştirmektir</strong>.
        </>
      ),
      image: "/call1.jpg"
    }
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Ürün Anlatımı
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)]"></div>
        </div>

        {/* Features Grid */}
        <div className="space-y-12 md:space-y-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group flex flex-col items-center gap-8 md:gap-10 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"
              }`}
            >
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="relative overflow-hidden rounded-2xl shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:scale-[1.02]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={800}
                    height={600}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2">
                <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
                  {feature.title}
                </h3>
                <p className="text-lg leading-relaxed text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Vurucu Cümle */}
        <div className="mt-16 text-center">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-[var(--brand-turquoise)]/10 to-[var(--brand-orange)]/10 p-8 md:p-12">
            <p className="text-xl font-semibold text-gray-900 md:text-2xl lg:text-3xl">
              Yöneticiler stratejik karar alırken, temsilciler çağrı sırasında yönlendirilir ve her iki tarafın potansiyeli optimize edilir.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


