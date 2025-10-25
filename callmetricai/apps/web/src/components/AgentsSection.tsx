export default function AgentsSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
            YAPAY ZEKA AJANLARIMIZLA TANIŞ
          </p>
        </div>

        {/* Two Column Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* VoiceAI Agents */}
          <div className="flex flex-col">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Sesli Yapay Zeka Ajanları
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Çağrıları uçtan uca otomatikleştirin veya her konuşmanın doğru sonuca ulaşması için akıllıca yönlendirin.
            </p>
            
            {/* Visual Representation - Voice Call Flow */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-3xl ">
              <img
                src="/call2.webp"
                alt="Sesli Yapay Zeka Ajanları"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* ChatAI Agents */}
          <div className="flex flex-col">
            <h2 className="mb-6 text-4xl font-bold text-gray-900 md:text-5xl">
              Sohbet Yapay Zeka Ajanları
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Kaliteli müşteri adayları oluşturun, müşteri sorunlarını çözün ve her kanalda sorunsuz aktarım yapın.
            </p>

            {/* Visual Representation - Chat Interface */}
            <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-3xl ">
              <img
                src="/call3.webp"
                alt="Sohbet Yapay Zeka Ajanları"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
