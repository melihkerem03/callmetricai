"use client";

import { useEffect, useRef } from "react";

export default function AboutHero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0");
            entry.target.classList.remove("opacity-0", "translate-y-8");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToContact = () => {
    const ctaSection = document.getElementById("contact-cta");
    ctaSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white px-6 py-24 opacity-0 transition-all duration-1000 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Sol: Başlık & Subcopy */}
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl">
              İnsan zekâsı ve{" "}
              <span className="bg-gradient-to-r from-brand-turquoise to-brand-navy bg-clip-text text-transparent">
                Agentic AI
              </span>{" "}
              bir arada.
            </h1>
            <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
              CallMetric AI, çağrı merkezi performansını analiz eden bir
              yazılımın ötesinde; insan zekâsı ve yapay zekânın dönüştürücü
              gücünü birleştiren bir vizyondur.
            </p>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-navy px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-opacity-90 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-brand-navy focus:ring-opacity-30"
              aria-label="İletişime geçin"
            >
              İletişime Geç
              <svg
                className="transition-transform group-hover:translate-x-1"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.5 15L12.5 10L7.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Sağ: Orbit Portrait */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Ana görsel - gerçek fotoğraf için /about/hero-image.jpg yükleyin */}
              <div className="relative z-10 h-80 w-80 overflow-hidden rounded-full bg-gradient-to-br from-brand-turquoise/20 to-brand-navy/20 shadow-2xl">
                {/* Gerçek görsel kullanmak için bu div'i next/image ile değiştirin:
                <Image 
                  src="/about/hero-image.jpg" 
                  alt="CallMetric AI Team"
                  width={320}
                  height={320}
                  className="object-cover"
                /> */}
                <div className="flex h-full w-full items-center justify-center">
                  <svg
                    className="h-32 w-32 text-brand-navy opacity-20"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>

              {/* Dotted orbit ring */}
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                width="420"
                height="420"
                viewBox="0 0 420 420"
                fill="none"
              >
                <circle
                  cx="210"
                  cy="210"
                  r="200"
                  stroke="#1EB8B2"
                  strokeWidth="2"
                  strokeDasharray="8 12"
                  strokeOpacity="0.3"
                />
              </svg>

              {/* Floating accent dots */}
              <div className="absolute right-8 top-12 h-4 w-4 animate-float rounded-full bg-brand-orange shadow-lg" />
              <div className="absolute bottom-16 left-8 h-6 w-6 animate-float-delayed rounded-full bg-brand-turquoise shadow-lg" />
              <div className="absolute right-16 bottom-8 h-3 w-3 animate-float rounded-full bg-brand-navy shadow-lg" />

              {/* Arc accent */}
              <svg
                className="absolute -right-4 top-1/4"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
              >
                <path
                  d="M10 40 Q 10 10, 40 10"
                  stroke="#FF7A1A"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeOpacity="0.4"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

