"use client";

import { useState } from "react";
import EarlyAccessModal from "../EarlyAccessModal";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="bg-gradient-to-br from-[var(--brand-navy)] to-gray-900 py-20 text-white md:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Çağrı Merkezinizi Dönüştürmeye Hazır mısınız?
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-300">
              CallMetric AI ile performansınızı artırın, maliyetlerinizi düşürün, 
              müşteri memnuniyetini yükseltin. Ücretsiz demo için hemen başvurun.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-lg bg-[var(--brand-orange)] px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-xl"
              >
                İletişime Geç
              </a>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center rounded-lg border-2 border-[var(--brand-turquoise)] bg-transparent px-8 py-4 text-base font-semibold text-[var(--brand-turquoise)] transition-all hover:bg-[var(--brand-turquoise)] hover:text-white"
              >
                Erken Erişim Talep Et
              </button>
            </div>
          </div>
        </div>
      </section>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}




