export default function ProductFeatures() {
  const features = [
    {
      title: "Gerçek Zamanlı Koçluk (Agent Assist)",
      items: [
        "Canlı çağrı sırasında anlık öneriler (konuşma hızı, empati ipuçları, sorun çözme yönlendirmesi).",
        "Satış anı algılama: sistem \"satış anı\" tespitinde ödeme bilgisi talebi veya upsell önerileri sunar.",
        "Teknik destek çağrılarında adım adım çözüm akışı önerileri."
      ]
    },
    {
      title: "Multimodal Performans Skorlama",
      items: [
        "SER (Speech Emotion Recognition) ile konuşma tonu, stres ve memnuniyet ölçümü.",
        "NLP ile prosedür uyumu, anahtar kelime kontrolü, empati ve bilgilendirme doğruluğu analizi.",
        "Bu iki kaynaktan gelen skorların harmonize edilmesiyle güvenilir skor kartlar."
      ]
    },
    {
      title: "Duygu Haritası & İş Haritası Görselleştirmesi",
      items: [
        "Çağrının duygusal seyri: anlık duygu değişimleri zaman serisi şeklinde.",
        "İş haritası: konuşmanın hangi aşamalarında (karşılama, doğrulama, çözüm, kapanış) ne kadar etkili olunduğu gösterilir."
      ]
    },
    {
      title: "Anlık KPI ve Yöneticinin Güç Paneli",
      items: [
        "Gerçek zamanlı temsilci performansı, bekleyen çağrı dağılımı, FCR, AHT, NPS benzeri metrikler.",
        "Yönetici için uyarılar: kritik düşüş, yüksek stresli hatlar, eğitim gerektiren temsilciler."
      ]
    },
    {
      title: "Kişiselleştirilmiş Koçluk & Eğitim Önerileri",
      items: [
        "Her temsilci için zayıf alan analizi ve kısa eğitim/snippet önerileri.",
        "Otomatik atama: koçluk ihtiyacı tespit edilen temsilciler için eğitim görevleri oluşturulur."
      ]
    },
    {
      title: "Uyumluluk & Güvenlik",
      items: [
        "KVKK uyumlu veri işleme seçenekleri (yerel hosting, anonimleştirme, DPA).",
        "Denetim izleri, rol tabanlı erişim ve şifreleme."
      ]
    }
  ];

  return (
    <section className="bg-gray-50 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
            Ürün Özellikleri
          </h2>
          <div className="mx-auto h-1 w-24 bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)]"></div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:border-[var(--brand-turquoise)]/30 hover:shadow-[0_20px_60px_-15px_rgba(30,184,178,0.3)] hover:-translate-y-3 hover:scale-[1.03]"
            >
              {/* Gradient Top Border */}
              <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-[var(--brand-orange)] via-[var(--brand-turquoise)] to-[var(--brand-navy)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
              
              {/* Animated Background Glow */}
              <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-[var(--brand-turquoise)]/10 to-[var(--brand-orange)]/10 blur-2xl transition-all duration-500 group-hover:scale-[2.5]"></div>
              
              <div className="relative">
                <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-[var(--brand-navy)]">
                  {feature.title}
                </h3>
                <ul className="space-y-3">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <svg className="mt-1 h-5 w-5 flex-shrink-0 text-[var(--brand-turquoise)] transition-transform duration-300 group-hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm leading-relaxed text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


