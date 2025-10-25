import Link from "next/link";

const features = [
  {
    title: "Koruma Duvarları",
    description:
      "Temellendirme ve koruma duvarları ajanınızı konuda tutar, uyarılar, gerçek zamanlı raporlar ve sıcak yönlendirmeler zamanında müdahale ve gözetim sağlar.",
  },
  {
    title: "Denetim",
    description:
      "Her kararın arkasındaki mantığı anlamak için konuşmaların %100'ünü otomatik olarak değerlendirin ve eksiksiz bir denetim izi ile tam şeffaflık elde edin.",
  },
  {
    title: "Veri Yönetişimi",
    description:
      "Verileriniz yalnızca Yapay Zeka Ajanınız için kullanılır. Modelleri asla eğitmez veya paylaşmayız ve gizliliğinizi korumak için sektör lideri uygulamaları takip ederiz.",
  },
  {
    title: "Gizlilik",
    description:
      "SOC 2 Type II, HIPAA ve GDPR uyumlu. Verileriniz durağan ve aktarım sırasında şifrelenir, katı erişim kontrolleri ve denetim günlükleri ile korunur.",
  },
];

export default function TrustSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Side - Title and CTA */}
          <div className="flex flex-col justify-center">
            <h2 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              Güven, Kontrol ve{" "}
              <span className="block">Her Katmanda</span>
              <span className="block">Şeffaflık</span>
            </h2>
            <Link
              href="/learn-more"
              className="flex items-center gap-2 text-lg font-semibold text-purple-600 transition-colors hover:text-purple-700"
            >
              Daha Fazla Bilgi
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl bg-gray-50 p-6 transition-shadow shadow-xl"
              >
                <h3 className="mb-4 text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
