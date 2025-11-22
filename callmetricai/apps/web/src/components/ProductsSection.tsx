const products = [
  {
    title: "Gerçek Zamanlı İşbirliği",
    description:
      "Temsilciler çağrı sırasında Agentic AI tarafından desteklenir. Sistem, konuşmayı analiz eder, duygu ve niyet tespiti yapar, ve temsilciye anlık öneriler sunar — doğru anda, doğru aksiyonu almasını sağlar.",
    image: "/call2.webp",
  },
  {
    title: "Akıllı Performans Panelleri",
    description:
      "Gerçek zamanlı verilerle ekiplerinizi yönetin. Temsilci performansını, çağrı kalitesini ve müşteri memnuniyetini aynı ekranda izleyin. AI, size yalnızca metrik değil; anlam sunar.",
    image: "/call3.webp",
  },
  {
    title: "Multimodal Veri Analizi",
    description:
      "Tüm çağrı merkezi verilerinizi ses, metin ve duygu katmanlarında analiz eder. SER + NLP füzyonu ile empati, stres, çözüm oranı ve prosedür uyumunu birleştirerek canlı tepkiler ve anlık içgörüler sunar.",
    image: "/call4.webp",
  },
];

export default function ProductsSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Three Column Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col">
              <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
                {product.title}
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-gray-600">
                {product.description}
              </p>
              
              {/* Visual Representation */}
              <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-3xl">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

