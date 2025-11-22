"use client";

import Link from "next/link";
import HeroImageArea from "@/components/HeroImageArea";

const plans = [
  {
    id: 1,
    name: "KOBİ Paketi",
    subtitle: "1–50 Temsilci",
    price: "Aylık 750 USD",
    description: "Küçük ve orta ölçekli ekipler için profesyonel düzeyde performans analizi.",
    features: [
      "Temel performans analizi (ses + metin)",
      "Yönetici dashboard erişimi",
      "E-posta desteği ve standart raporlamalar",
      "KVKK uyumlu yerel veri barındırma",
    ],
  },
  {
    id: 2,
    name: "Growth Paketi",
    subtitle: "51–250 Temsilci",
    price: "Kullanıcı başı 75–100 USD / ay",
    description: "Veriyle karar alan büyüyen işletmeler için tasarlanmış gelişmiş model.",
    features: [
      "Gelişmiş raporlama ve metrik panelleri",
      "Anlık öneri motoru (Agentic AI)",
      "API erişimi ve çoklu kullanıcı yönetimi",
      "Tüm KOBİ paketi özellikleri",
    ],
  },
  {
    id: 3,
    name: "Enterprise Paketi",
    subtitle: "250+ Temsilci",
    price: "Özel fiyatlandırma",
    description: "Büyük ölçekli kurumlar için uçtan uca performans ve içgörü yönetimi.",
    features: [
      "Yıllık sözleşme ve özel fiyatlandırma",
      "SLA, KVKK & GDPR uyumlu güvenlik altyapısı",
      "CRM / IVR / ERP entegrasyonları",
      "Kurulum ve özel model eğitimi",
      "Saha danışmanlığı ve teknik koordinasyon",
    ],
  },
];

const commonFeatures = [
  "Türkçe dilinde yüksek doğruluklu konuşma analizi",
  "Duygu & etkileşim analitiği",
  "Gerçek zamanlı temsilci ve yönetici dashboard&apos;ları",
  "KVKK uyumlu veri güvenliği",
  "Sürekli model güncellemeleri ve performans optimizasyonu",
  "Müşteri başarı ekibi desteği",
];

export default function ProductsPage() {

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                ÜRÜNLER
              </p>
              <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Çağrı Merkezi Performansında İnsan Zekâsı ile Agentic AI&apos;nın Dönüştürücü Gücü
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Her ekip için akıllı, veriye dayalı ve insan gücünü optimize eden performans zekâsı. Her ölçekte çağrı merkezi için tasarlandı. Gerçek başarı, yalnızca rakamlarda değil — insan performansında, etkileşim kalitesinde ve müşteri deneyiminde ölçülür.
              </p>
            </div>

            {/* Right Side - Circular Image Area */}
            <HeroImageArea />
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
              Esnek, Ölçeklenebilir ve Kurumsal Yapılara Uygun Lisans Modeli
            </h2>
            <p className="text-lg text-gray-600">Paketler</p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:shadow-lg"
              >
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                    {plan.subtitle}
                  </p>
                  <div className="mb-4 h-px w-full bg-gradient-to-r from-cyan-500 to-orange-500"></div>
                  <p className="mb-6 text-2xl font-bold text-gray-900">
                    {plan.price}
                  </p>
                  <p className="text-base leading-relaxed text-gray-600">
                    {plan.description}
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="mt-1 h-5 w-5 shrink-0 text-cyan-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-base text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className="mt-auto rounded-lg border-2 border-cyan-500 bg-white px-6 py-3 text-center text-sm font-semibold text-cyan-600 transition-all hover:bg-cyan-50"
                >
                  Teklif Alın
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Features Section */}
      <section className="bg-white py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
              Tüm Paketlerde Ortak Olan Özellikler
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Her pakette standart olarak sunulan güçlü özellikler
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {commonFeatures.map((feature, idx) => (
              <div
                key={idx}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-cyan-300 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-orange-500">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium leading-relaxed text-gray-900">
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* R&D and Trust Infrastructure Section */}
      <section className="bg-gradient-to-r from-[#63f5e6] to-[#fea363] py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">
              Ar-Ge ve Güven Altyapısı
            </h2>
            <p className="text-sm text-gray-800">
              Saha testleriyle doğrulanmış, kurumsal ölçeğe hazır yapay zekâ platformu
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Ar-Ge Section */}
            <div>
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-gray-900">Ar-Ge Merkezi</h3>
                <p className="text-sm text-gray-700">Düzce Teknopark</p>
              </div>
              <p className="mb-3 text-base leading-relaxed text-gray-800">
                Düzce Teknopark Ar-Ge Merkezinde geliştirilen CallMetric AI, akademik iş birlikleri sayesinde sürekli optimize edilmektedir.
              </p>
              <p className="text-base leading-relaxed text-gray-800">
                Bilsoft Yazılım Çağrı Merkezi ile ortak pilot proje kapsamında gerçek operasyonel verilerle test edilmiş, sahada doğrulanmış bir yapay zekâ platformudur.
              </p>
            </div>

            {/* Güven & Uyum Section */}
            <div>
              <div className="mb-4">
                <h3 className="mb-1 text-xl font-bold text-gray-900">Güven & Uyum</h3>
                <p className="text-sm text-gray-700">KVKK Uyumlu</p>
              </div>
              <p className="mb-3 text-base leading-relaxed text-gray-800">
                KVKK&apos;ya tamamen uyumlu. Verileriniz Türkiye sınırları içinde barındırılır ve yalnızca hizmet kalitesi ölçümünde kullanılır.
              </p>
              <div className="mb-3 space-y-2">
                <p className="text-base text-gray-800">• Fiyatlar şirket büyüklüğüne göre özelleştirilir.</p>
                <p className="text-base text-gray-800">• Gizli ücret, sürpriz maliyet yok.</p>
                <p className="text-base text-gray-800">• İnsan performansını yükselten yapay zekâ.</p>
              </div>
              <p className="text-base leading-relaxed text-gray-800">
                Her işletmenin dinamiğine göre kişisel fiyatlandırma modeli oluşturuyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}

