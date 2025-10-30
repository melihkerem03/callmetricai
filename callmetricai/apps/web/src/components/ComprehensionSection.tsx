"use client";

import { useState } from "react";

const features = [
  {
    id: 1,
    title: "Gerçek dünya konuşma işleme",
    description: "Üst üste konuşma, kesintiler ve arka plan gürültüsünü ele alarak Yapay Zeka Ajanlarının müşterileri doğru anlamasını sağlayın",
    visual: {
      type: "waveform",
      content: "Gürültü filtreleme ile gerçek dünya konuşma analizi"
    }
  },
  {
    id: 2,
    title: "Yüksek hassasiyetli varlık çıkarımı",
    description: "Müşteri görüşmelerinden isimler, tarihler, numaralar ve niyetler gibi temel bilgileri yüksek doğrulukla çıkarın",
    visual: {
      type: "entities",
      content: "Varlık tanıma ve çıkarımı"
    }
  },
  {
    id: 3,
    title: "Karmaşık çok turlu konuşmalar",
    description: "Karmaşık, çok turlu konuşmalarda bile arayan kişinin niyetini doğru bir şekilde belirleyin",
    visual: {
      type: "conversation",
      content: "Çok turlu konuşma akışı"
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
            <h2 className="mb-12 text-4xl font-bold text-gray-900 md:text-5xl">
              Yapay zeka ajanları{" "}
              <span className="block">doğru anlama ile başlar</span>
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
                              isActive ? "text-purple-600" : "text-gray-900"
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
        <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:min-h-0">
              {/* Colorful Overlay Effects - Abstract Art */}
              <div className="absolute inset-0">
                {/* Top Blue Section */}
                <div className="absolute left-0 right-0 top-0 h-64 bg-gradient-to-br from-blue-400/40 via-cyan-300/30 to-transparent backdrop-blur-sm"></div>
                
                {/* Pink/Red Bottom Section */}
                <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-tr from-red-400/40 via-orange-300/30 to-transparent backdrop-blur-sm"></div>
                
                {/* Center Purple Accent */}
                <div className="absolute left-1/4 top-1/3 h-48 w-48 rounded-full bg-purple-400/20 blur-3xl"></div>
                
                {/* Pixel/Glitch Effects */}
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: `
                    linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 50%, transparent 100%),
                    repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
                  `
                }}></div>
              </div>

              {/* Centered Visual - ensures full image visibility without cropping */}
              <div className="relative z-10 flex flex-1 items-center justify-center p-4">
                <img
                  src="/call4.webp"
                  alt="Comprehension Visual"
                  className="max-h-full w-auto object-contain"
                />
              </div>

          {/* Scanning Line Effect */}
          <div className="absolute inset-0 animate-pulse">
            <div className="absolute left-0 right-0 top-1/3 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
