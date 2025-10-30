import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Entegrasyon & Veri Toplama",
      description: "IVR/ACD/CTI, CRM ve kayıt sistemleriyle hızlı entegrasyon. Çağrılar buluta güvenli olarak aktarılır."
    },
    {
      number: "2",
      title: "Çift Kanallı Analiz",
      description: "(a) ASR → metin analizi (NLP)\n(b) Ham ses → SER + prosodik analiz\nSonuçlar fusion modülünde birleşir ve skorlanır."
    },
    {
      number: "3",
      title: "Dashboard & Aksiyon",
      description: "Yöneticinin dashboard'unda anlık uyarılar, temsilcinin ekranında canlı öneriler, haftalık gelişim raporları ve otomatik koçluk planları."
    }
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Nasıl Çalışır?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            3 adımda veri işleme süreci
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)]"></div>
        </div>

        {/* Steps */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              {/* Number Badge */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-orange)] to-[var(--brand-turquoise)] text-2xl font-bold text-white shadow-lg">
                {step.number}
              </div>
              
              {/* Arrow (hidden on last item) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-8 hidden translate-x-1/2 md:block">
                  <svg
                    width="50"
                    height="20"
                    viewBox="0 0 50 20"
                    fill="none"
                    className="animate-pulse text-[var(--brand-turquoise)]"
                  >
                    <path
                      d="M1 10H49M49 10L40 1M49 10L40 19"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              <h3 className="mb-4 text-xl font-bold text-gray-900">{step.title}</h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* System Process Image */}
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-xl">
            <Image
              src="/workflow1.png"
              alt="Veri Analizi"
              width={1600}
              height={900}
              className="w-full"
            />
          </div>
          <p className="mt-4 text-center text-sm font-medium text-gray-500 uppercase tracking-wider">
            Veri Analizi
          </p>
        </div>

        {/* Bottom Text */}
        <div className="space-y-6 text-center">
          <p className="mx-auto max-w-4xl text-2xl italic text-gray-900 md:text-3xl lg:text-4xl">
            Yapay zekâyı yalnızca analiz aracı değil, <strong className="font-bold italic">aktif bir temsilci destek sistemi</strong> haline getirdik. Agentic AI yaklaşımıyla insan sezgisi ile makine öğreniminin gücünü birleştiriyoruz.
          </p>
          <p className="mx-auto max-w-3xl text-2xl font-bold italic text-[var(--brand-navy)] md:text-3xl">
            Verileriniz konuşsun, kararlarınız hızlansın.
          </p>
        </div>
      </div>
    </section>
  );
}


