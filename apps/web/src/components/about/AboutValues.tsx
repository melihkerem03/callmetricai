"use client";

import { useEffect, useRef } from "react";

interface Value {
  title: string;
  description: string;
  icon: string;
  color: "turquoise" | "orange" | "navy";
}

const values: Value[] = [
  {
    title: "Uyum",
    description:
      "İnsan zekâsı ve yapay zekânın birlikte çalıştığı sistemler kurmak.",
    icon: "⚡",
    color: "turquoise",
  },
  {
    title: "Verimlilik",
    description: "Zamanı, işi ve enerjiyi en etkili şekilde kullanmak.",
    icon: "⚙️",
    color: "orange",
  },
  {
    title: "Güven",
    description:
      "Etik, şeffaf ve KVKK'ya tam uyumlu teknolojiler geliştirmek.",
    icon: "🔒",
    color: "navy",
  },
  {
    title: "Yenilik",
    description: "Sürekli öğrenen sistemler ve gelişen ekip kültürü.",
    icon: "💡",
    color: "turquoise",
  },
  {
    title: "Dönüşüm",
    description:
      "Sürekli gelişen dijital dünyada değişime hızla uyum sağlamak ve her adımda yenilenmek.",
    icon: "🔄",
    color: "orange",
  },
  {
    title: "Sürdürülebilir Fayda",
    description:
      "Herkesin kazandığı bir denge — çalışan, kurum, müşteri.",
    icon: "🌱",
    color: "navy",
  },
];

export default function AboutValues() {
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

  const colorClasses = {
    turquoise: "bg-brand-turquoise/10 text-brand-turquoise",
    orange: "bg-brand-orange/10 text-brand-orange",
    navy: "bg-brand-navy/10 text-brand-navy",
  };

  return (
    <section
      ref={sectionRef}
      className="border-t border-gray-100 bg-gray-50 px-6 py-20 opacity-0 transition-all duration-1000 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-4 text-center text-4xl font-bold text-gray-900 md:text-5xl">
          Değerlerimiz
        </h2>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600">
          CallMetric AI'ı oluştururken rehber aldığımız beş temel değer
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((value, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full text-3xl transition-transform duration-300 group-hover:scale-110 ${
                  colorClasses[value.color]
                }`}
              >
                {value.icon}
              </div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900">
                {value.title}
              </h3>
              <p className="leading-relaxed text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

