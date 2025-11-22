const steps = [
  {
    number: "1",
    title: "Entegrasyon & Veri Toplama",
    description:
      "IVR/ACD/CTI, CRM ve kayıt sistemleriyle hızlı entegrasyon. Çağrılar buluta güvenli olarak aktarılır.",
  },
  {
    number: "2",
    title: "Çift Kanallı Analiz",
    description:
      "(a) ASR → metin analizi (NLP) (b) Ham ses → SER + prosodik analiz. Sonuçlar fusion modülünde birleşir ve skorlanır.",
  },
  {
    number: "3",
    title: "Dashboard & Aksiyon",
    description:
      "Yöneticinin dashboard'unda anlık uyarılar, temsilcinin ekranında canlı öneriler, haftalık gelişim raporları ve otomatik koçluk planları.",
  },
];

export default function WorkflowSection() {
  return (
    <section className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            NASIL ÇALIŞIR?
          </p>
          <h2 className="mb-4 text-3xl font-normal text-gray-900 md:text-4xl lg:text-5xl">
            Verileriniz konuşsun, kararlarınız hızlansın.
          </h2>
        </div>

        {/* Three Steps */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="flex flex-col rounded-2xl bg-gray-50 p-6 shadow-sm transition-all hover:shadow-lg"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-orange-500 text-2xl font-bold text-white">
                {step.number}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Workflow Diagram - Image */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-4">
          <div className="flex min-h-[300px] items-center justify-center">
            <img
              src="/workflowrb.png"
              alt="Veri İşleme Süreci"
              className="max-h-[400px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

