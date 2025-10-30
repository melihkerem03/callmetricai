export default function Scenarios() {
  const scenarios = [
    {
      title: "Teknik Destek",
      description: "Arıza yönetim adımlarının doğruluğu ve çözüm hızının ölçümü; karmaşık vaka transferlerinde bilgi kaybı analizi."
    },
    {
      title: "Satış & Telesatış",
      description: "Satış anı tanıma, itiraz yönetimi başarısı, ödeme talep etme anı."
    },
    {
      title: "Müşteri Hizmetleri",
      description: "Memnuniyet anları, öfke yumuşatma taktikleri, churn risk tespiti."
    },
    {
      title: "Pazarlama Insight",
      description: "Çağrı verilerini müşteri davranışı, ürün geri bildirimi ve pazar eğilimleri açısından analiz eder. Her çağrıyı bir pazarlama zekâsı kaynağına dönüştürür."
    }
  ];

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Sektörel Kullanım Senaryoları
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Her sektörde özelleştirilmiş çözümler
          </p>
          <div className="mx-auto mt-6 h-1 w-24 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)]"></div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {scenarios.map((scenario, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--brand-turquoise)] to-[var(--brand-orange)]"></div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                {scenario.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {scenario.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


