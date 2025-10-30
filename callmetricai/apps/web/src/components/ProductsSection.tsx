import Link from "next/link";

const products = [
  {
    title: "Yapay Zeka Ajanları",
    description:
      "Ses ve sohbet üzerinden doğal konuşmalar ve güvenilir yürütme sağlayan Yapay Zeka Ajanları ile müşteri etkileşimlerini otomatikleştirin.",
  },
  {
    title: "Yapay Zeka Yardımcıları",
    description:
      "Ajanları gerçek zamanlı rehberlik ve otomatik iş akışları ile güçlendirin, liderlere talep üzerine müşteri sesi içgörüleri sağlayın",
  },
  {
    title: "Konuşma Zekası",
    description:
      "İnsan ve yapay zeka etkileşimlerinin %100'ünü otomatik olarak kalite kontrol ederek ajan performansını, kaliteyi ve uyumluluğu izleyin.",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-gray-50 py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            NEDEN CALLMETRICAI
          </p>
          <h2 className="mx-auto max-w-4xl text-4xl font-normal text-gray-900 md:text-5xl lg:text-6xl">
            İşinizi güçlendirmek için
            <br />
            <span className="font-serif italic">Üç</span> güçlü ürün
          </h2>
        </div>

        {/* Three Product Cards */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {products.map((product, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-white p-8 shadow-sm transition-all shadow-xl"
            >
              <div className="mb-4 flex-1">
                <h3 className="mb-4 text-2xl font-bold text-gray-900">
                  {product.title}
                </h3>
                <p className="leading-relaxed text-gray-600">
                  {product.description}
                </p>
              </div>
              <div className="mt-6">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-purple-600 transition-colors hover:text-purple-700"
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
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-purple-600 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-purple-700"
          >
            Başlayın
          </Link>
        </div>
      </div>
    </section>
  );
}

