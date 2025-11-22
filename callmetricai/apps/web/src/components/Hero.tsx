import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Content */}
        <div className="text-center">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            İnsanla yapay zekânın birlikte evrildiği çağrı merkezi deneyimi
          </p>
          <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-normal leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            İnsan Zekâsı ile Agentic AI&apos;nın Dönüştürücü Gücü
          </h1>
          <p className="mx-auto mb-6 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
            Ses, metin ve duyguyla analiz eden Multimodal Agentic AI platformu. Operasyonel maliyetleri %30 azaltırken, gerçek zamanlı analizler ve akıllı önerilerle temsilciyi destekler, yöneticilere karar gücü kazandırır.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600 hover:shadow-xl"
            >
              İletişime Geç
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg border-2 border-cyan-500 bg-white px-8 py-4 text-sm font-semibold text-cyan-600 transition-all hover:bg-cyan-50"
            >
              Erken Erişim
            </Link>
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