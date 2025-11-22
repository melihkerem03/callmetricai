"use client";

import { useState } from "react";

const features = [
  {
    id: 1,
    title: "Gerçek Zamanlı Koçluk (Agent Assist)",
    description: "Canlı çağrı sırasında anlık öneriler (konuşma hızı, empati ipuçları, sorun çözme yönlendirmesi). Satış anı algılama: sistem 'satış anı' tespitinde ödeme bilgisi talebi veya upsell önerileri sunar. Teknik destek çağrılarında adım adım çözüm akışı önerileri.",
    image: "/call1.jpg",
    visual: {
      type: "waveform",
      content: "Gerçek zamanlı koçluk ve öneriler"
    }
  },
  {
    id: 2,
    title: "Multimodal Performans Skorlama",
    description: "SER (Speech Emotion Recognition) ile konuşma tonu, stres ve memnuniyet ölçümü. NLP ile prosedür uyumu, anahtar kelime kontrolü, empati ve bilgilendirme doğruluğu analizi. Bu iki kaynaktan gelen skorların harmonize edilmesiyle güvenilir skor kartlar.",
    image: "/call2.webp",
    visual: {
      type: "entities",
      content: "Multimodal analiz ve skorlama"
    }
  },
  {
    id: 3,
    title: "Duygu Haritası & İş Haritası Görselleştirmesi",
    description: "Çağrının duygusal seyri: anlık duygu değişimleri zaman serisi şeklinde. İş haritası: konuşmanın hangi aşamalarında (karşılama, doğrulama, çözüm, kapanış) ne kadar etkili olunduğu gösterilir.",
    image: "/call3.webp",
    visual: {
      type: "conversation",
      content: "Duygu ve iş haritası görselleştirmesi"
    }
  },
  {
    id: 4,
    title: "Anlık KPI ve Yöneticinin Güç Paneli",
    description: "Gerçek zamanlı temsilci performansı, bekleyen çağrı dağılımı, FCR, AHT, NPS benzeri metrikler. Yönetici için uyarılar: kritik düşüş, yüksek stresli hatlar, eğitim gerektiren temsilciler.",
    image: "/call4.webp",
    visual: {
      type: "dashboard",
      content: "Yönetici dashboard ve KPI'lar"
    }
  },
  {
    id: 5,
    title: "Kişiselleştirilmiş Koçluk & Eğitim Önerileri",
    description: "Her temsilci için zayıf alan analizi ve kısa eğitim/snippet önerileri. Otomatik atama: koçluk ihtiyacı tespit edilen temsilciler için eğitim görevleri oluşturulur.",
    image: "/call1.jpg",
    visual: {
      type: "coaching",
      content: "Kişiselleştirilmiş koçluk planları"
    }
  },
  {
    id: 6,
    title: "Uyumluluk & Güvenlik",
    description: "KVKK uyumlu veri işleme seçenekleri (yerel hosting, anonimleştirme, DPA). Denetim izleri, rol tabanlı erişim ve şifreleme.",
    image: "/call2.webp",
    visual: {
      type: "security",
      content: "Güvenlik ve uyumluluk"
    }
  }
];

export default function ComprehensionSection() {
  const [activeFeature, setActiveFeature] = useState<number | null>(3);

  return (
    <section className="bg-white py-32 lg:py-40">
      <div className="bg-gray-50">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-2">
        {/* Left Side - Features List with padding */}
        <div className="flex flex-col justify-center px-6 py-20">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              ÜRÜN ÖZELLİKLERİ
            </p>
            <h2 className="mb-12 text-4xl font-bold text-gray-900 md:text-5xl">
              Çağrı merkezi performansınızı{" "}
              <span className="block">dönüştüren özellikler</span>
            </h2>

            <div className="space-y-0 border-t border-gray-200">
              {features.map((feature) => {
                const isActive = activeFeature === feature.id;
                
                return (
                  <div key={feature.id} className="border-b border-gray-200">
                    <button
                      onClick={() => setActiveFeature(isActive ? null : feature.id)}
                      className="flex w-full items-start justify-between gap-4 py-6 text-left transition-colors hover:bg-gray-50"
                    >
                      <div className="flex items-start gap-4">
                        <span className="mt-1 text-sm font-semibold text-gray-400">
                          {feature.id}
                        </span>
                        <div className="flex-1">
                          <h3
                            className={[
                              "text-lg font-semibold transition-colors",
                              isActive ? "text-cyan-600" : "text-gray-900"
                            ].join(" ")}
                          >
                            {feature.title}
                          </h3>
                          
                          {/* Expandable Description */}
                          <div
                            className={[
                              "overflow-hidden transition-all duration-300",
                              isActive ? "mt-3 max-h-32 opacity-100" : "max-h-0 opacity-0"
                            ].join(" ")}
                          >
                            <p className="text-sm leading-relaxed text-gray-700">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Visual Demo - Full height */}
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-white lg:min-h-0">
              {/* Centered Visual - full height and width */}
              <div className="relative z-10 h-full w-full">
                {features.map((feature) => {
                  const isActive = activeFeature === feature.id;
                  if (!isActive) return null;
                  return (
                    <img
                      key={feature.id}
                      src={feature.image}
                      alt={feature.title}
                      className="h-full w-full object-cover transition-opacity duration-300"
                    />
                  );
                })}
                {!activeFeature && (
                  <img
                    src="/call4.webp"
                    alt="Comprehension Visual"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
        </div>
        </div>
      </div>
    </section>
  );
}
