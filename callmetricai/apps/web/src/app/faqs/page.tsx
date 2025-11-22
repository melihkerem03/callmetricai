"use client";

import { useState } from "react";
import Link from "next/link";
import HeroImageArea from "@/components/HeroImageArea";

const faqs = [
  {
    id: 1,
    question: "CallMetric AI nedir?",
    answer: "CallMetric AI, çağrı merkezi performansını ses, metin ve duygu düzeyinde analiz eden Agentic AI tabanlı bir performans ve içgörü platformudur. Temsilcilerin görüşme kalitesini ölçer, yöneticilere karar destek verileri sunar ve müşteri memnuniyetini artırır.",
  },
  {
    id: 2,
    question: "CallMetric AI, bir chatbot mu?",
    answer: "Hayır. CallMetric AI bir sohbet botu değildir. Sistemin amacı, temsilcinin yerini almak değil, onu güçlendirmektir. Agentic AI, temsilcinin konuşma esnasında daha etkili ve çözüm odaklı olmasını sağlayan bir destek sistemidir.",
  },
  {
    id: 3,
    question: "Sistem hangi verileri analiz eder?",
    answer: "CallMetric AI, çağrı kayıtlarını hem ses sinyali hem metin transkripti üzerinden işler. Duygu analizi (tonlama, stres, empati), içerik analizi (konu, anahtar kelime, çözüm tipi) ve prosedür uyumu gibi metrikleri birleştirir. Bu hibrit yapı, tek boyutlu analizlere göre %30&apos;a kadar daha doğru sonuçlar sağlar.",
  },
  {
    id: 4,
    question: "Verilerimiz nerede saklanıyor?",
    answer: "Tüm veriler Türkiye sınırları içinde, KVKK uyumlu yerel veri merkezlerinde saklanmaktadır. Kurumsal müşteriler için özel veri barındırma opsiyonu da mevcuttur. CallMetric AI hiçbir veriyi yurtdışına aktarmadan, yerel regülasyonlara uygun biçimde çalışır.",
  },
  {
    id: 5,
    question: "CallMetric AI hangi kurumlar için uygundur?",
    answer: "Çağrı merkezi yöneten tüm kurumlar (KOBİ&apos;den kurumsal ölçeğe), müşteri destek ekipleri bulunan işletmeler, satış ve pazarlama operasyonlarında müşteri etkileşimini analiz etmek isteyen markalar, bankacılık, sigorta, e-ticaret, sağlık, lojistik gibi çoklu çağrı trafiğine sahip sektörler için uygundur.",
  },
  {
    id: 6,
    question: "Sistemi kurmak için teknik altyapı gerekiyor mu?",
    answer: "Hayır. CallMetric AI bulut tabanlı SaaS mimaride çalışır. Kurulum, entegrasyon ve ilk eğitim süreçleri uzman ekibimiz tarafından uzaktan desteklenir. CRM, IVR ve çağrı yönetim sistemlerine kolayca entegre edilebilir.",
  },
  {
    id: 7,
    question: "Agentic AI yaklaşımı neden fark yaratıyor?",
    answer: "Klasik yapay zekâ sistemleri yalnızca veriyi analiz eder. Agentic AI ise karar anında etkileşime girer — temsilciye konuşma sırasında öneriler sunar, hata eğilimlerini azaltır ve öğrenir. Bu yaklaşım, insan zekâsıyla yapay zekânın birlikte çalıştığı yeni nesil sistemlerin temelini oluşturur.",
  },
  {
    id: 8,
    question: "Türkçe veri analizi nasıl yapılıyor?",
    answer: "CallMetric AI, Türkçe&apos;ye özel geliştirilen duygu tanıma ve dil işleme modelleri kullanır. Düzce Teknopark&apos;ta yürütülen Ar-Ge çalışmalarıyla sistem, Türkçe ses kayıtlarında %90+ doğruluk oranına ulaşmıştır.",
  },
  {
    id: 9,
    question: "Sistem Bilsoft Yazılım ile nasıl test edildi?",
    answer: "Proje, Bilsoft Yazılım Çağrı Merkezi ile yürütülen pilot uygulamada gerçek operasyonel çağrılar üzerinde test edilmiştir. Binlerce görüşme verisiyle model doğruluğu, hız ve performans parametreleri optimize edilmiştir. Bu sayede CallMetric AI, laboratuvar ortamında değil, saha koşullarında doğrulanmış bir çözüm olarak geliştirilmiştir.",
  },
  {
    id: 10,
    question: "Fiyatlandırma nasıl belirleniyor?",
    answer: "Fiyatlandırma, temsilci sayısı ve operasyonel ihtiyaçlara göre değişen SaaS tabanlı lisans modeli üzerine kuruludur. Tüm planlar aylık veya yıllık abonelik olarak sunulur.",
  },
  {
    id: 11,
    question: "Eğitim ve destek süreci nasıl ilerliyor?",
    answer: "Kurulum sonrası tüm kurumlara, kullanıcı kılavuzları ve online eğitim oturumları sağlanır. Destek ekibimiz teknik ve operasyonel süreçlerde aktif yardım sunar.",
  },
  {
    id: 12,
    question: "CallMetric AI uluslararası pazarlarda da kullanılabilir mi?",
    answer: "Evet. Platform çoklu dil desteğine ve uluslararası regülasyon uyumluluğuna (GDPR dahil) sahiptir. Kanada ve Avrupa pazarlarında ticarileştirme süreci planlanmaktadır.",
  },
];

export default function FAQsPage() {
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                SIKÇA SORULAN SORULAR
              </p>
              <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Sıkça Sorulan Sorular
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Çağrı merkezi performansını yeniden tanımlayan Agentic AI platformumuz hakkında en çok merak edilen konular.
              </p>
            </div>

            {/* Right Side - Circular Image Area */}
            <HeroImageArea />
          </div>
        </div>
      </section>

      {/* FAQs Accordion Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-4">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="border-b border-gray-200 transition-all"
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:bg-gray-50"
                  >
                    <h3 className="flex-1 text-xl font-semibold text-gray-900">
                      {faq.question}
                    </h3>
                    <svg
                      className={`h-5 w-5 shrink-0 text-gray-400 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pb-6">
                      <p className="text-base leading-relaxed text-gray-600">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
              Sorunuz mu var? Bizimle iletişime geçin.
            </h2>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-orange-500 px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600 hover:shadow-xl"
              >
                İletişime Geçin
              </Link>
              <span className="text-gray-500">veya</span>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border-2 border-cyan-500 bg-white px-8 py-4 text-sm font-semibold text-cyan-600 transition-all hover:bg-cyan-50"
              >
                Toplantı Planlayın
              </Link>
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Verileriniz yalnızca iletişim amacıyla kullanılacaktır. KVKK kapsamında güvendedir.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

