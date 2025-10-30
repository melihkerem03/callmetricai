"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

export default function AboutCTA() {
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

  return (
    <section
      id="contact-cta"
      ref={sectionRef}
      className="border-t border-gray-100 bg-gradient-to-br from-brand-navy to-brand-navy/90 px-6 py-20 opacity-0 transition-all duration-1000 md:py-28"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
          Birlikte daha verimli bir gelecek inşa edelim
        </h2>
        <p className="mb-10 text-lg leading-relaxed text-gray-200 md:text-xl">
          CallMetric AI ile çağrı merkezi performansınızı nasıl dönüştürebileceğinizi
          keşfedin. Ekibimiz size özel bir demo sunmaya hazır.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/demo"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-navy shadow-lg transition-all hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
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
          </Link>
          <Link
            href="/demo"
            className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/10 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
          >
            Demo Talep Et
          </Link>
        </div>
      </div>
    </section>
  );
}

