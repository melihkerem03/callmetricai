export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Content */}
        <div className="text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            MÜŞTERİ DENEYİMİ İÇİN YAPAY ZEKA AJANLAR
          </p>
          <h1 className="mx-auto mb-6 max-w-4xl text-5xl font-normal leading-tight text-gray-900 md:text-6xl lg:text-7xl">
            <span className="font-serif italic">Daha iyi müşteri</span>
            <br />
            <span className="font-serif italic">deneyimleri</span> için yapay zeka ajanları
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-gray-600 md:text-lg">
            Ses öncelikli yapay zeka ajanları. Müşterileriniz için doğal, insansı konuşmalar.
            <br />
            İşiniz için öngörülebilir yürütme.
          </p>
          <div className="flex justify-center">
            <a
              href="#get-started"
              className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:bg-purple-700 hover:shadow-xl"
            >
              Başlayın
            </a>
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-20">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div className="aspect-video w-full">
              <img
                src="/call1.jpg"
                alt="Anlaşmazlıklar"
                className="h-full w-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="text-center">
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}