import Link from "next/link";

const products = [
  {
    title: "Gerçek Zamanlı İşbirliği",
    description:
      "Temsilciler çağrı sırasında Agentic AI tarafından desteklenir. Sistem, konuşmayı analiz eder, duygu ve niyet tespiti yapar, ve temsilciye anlık öneriler sunar — doğru anda, doğru aksiyonu almasını sağlar.",
  },
  {
    title: "Akıllı Performans Panelleri",
    description:
      "Gerçek zamanlı verilerle ekiplerinizi yönetin. Temsilci performansını, çağrı kalitesini ve müşteri memnuniyetini aynı ekranda izleyin. AI, size yalnızca metrik değil; anlam sunar.",
  },
  {
    title: "Multimodal Veri Analizi",
    description:
      "Tüm çağrı merkezi verilerinizi ses, metin ve duygu katmanlarında analiz eder. SER + NLP füzyonu ile empati, stres, çözüm oranı ve prosedür uyumunu birleştirerek canlı tepkiler ve anlık içgörüler sunar.",
  },
];

export default function TrustedSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            NEDEN CALLMETRIC AI
          </p>
          <h2 className="mx-auto max-w-4xl text-4xl font-normal text-gray-900 md:text-5xl lg:text-6xl">
            İşinizi güçlendirmek için{" "}
            <span className="font-serif italic">Üç</span> güçlü ürün
          </h2>
        </div>

        {/* Three Product Cards */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all shadow-xl border border-cyan-100"
            >
              <div className="mb-4 flex-1">
                <h3 className="mb-3 text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>
                {/* Cyan separator line */}
                <div className="mb-4 h-px w-full bg-gradient-to-r from-cyan-500 to-orange-500"></div>
                <p className="leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 transition-colors hover:text-cyan-600"
                >
                  Daha Fazla Bilgi
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Get Started Button */}
        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600"
          >
            Başlayın
          </Link>
        </div>
      </div>
    </section>
  );
}

