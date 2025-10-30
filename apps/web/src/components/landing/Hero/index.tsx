"use client";

import Image from "next/image";
import { useState } from "react";
import EarlyAccessModal from "../EarlyAccessModal";

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-white to-gray-50 py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero Content */}
          <div className="text-center">
            <h1 className="mx-auto mb-6 max-w-5xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
              Çağrı Merkezi Performansında{" "}
              <span className="text-[var(--brand-turquoise)]">İnsan Zekâsı</span>{" "}
              ile{" "}
              <span className="bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)] bg-clip-text text-transparent">Agentic AI'nın</span>{" "}
              Dönüştürücü Gücü
            </h1>
            
            <p className="mx-auto mb-8 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Çağrı Merkezi Performansını, ses, metin ve duyguyla analiz eden Multimodal Agentic AI platformu.
            </p>

            <p className="mx-auto mb-10 max-w-3xl text-base leading-relaxed text-gray-600 md:text-lg">
              Operasyonel maliyetleri %30 azaltırken, konuşma verisini en etkin stratejilere dönüştürür. Gerçek zamanlı analizler, duygu takibi ve akıllı önerilerle temsilciyi destekler, yöneticilere karar gücü kazandırır.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-navy)] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-xl"
              >
                İletişime Geç
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--brand-orange)] bg-white px-8 py-4 text-base font-semibold text-[var(--brand-orange)] transition-all hover:bg-[var(--brand-orange)] hover:text-white"
              >
                Erken Erişim Talep Et
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mt-16 md:mt-24">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="aspect-video w-full">
                <Image
                  src="/call1.jpg"
                  alt="CallMetric AI Dashboard"
                  width={1920}
                  height={1080}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Sub-heading */}
          <div className="mt-16 text-center">
            <h2 className="mx-auto max-w-4xl text-2xl font-bold leading-tight text-gray-900 md:text-3xl lg:text-4xl">
              İnsanla yapay zekânın birlikte evrildiği yeni bir çağrı merkezi deneyimi.
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600">
              CallMetric AI, insan performansını optimize eden Agentic AI teknolojisiyle çağrı merkezlerinde 
              yeni bir verimlilik standardı yaratır. Gerçek zamanlı içgörülerle her temsilci daha başarılı, 
              her kurum daha verimli, her müşteri daha memnun.
            </p>
          </div>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}


