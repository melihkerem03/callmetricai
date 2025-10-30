"use client";

import { useEffect, useRef } from "react";

interface AboutTwoColProps {
  title: string;
  paragraphs: string[];
  accent?: "turquoise" | "orange" | "navy";
  icon?: string;
}

export default function AboutTwoCol({
  title,
  paragraphs,
  accent = "turquoise",
  icon = "✨",
}: AboutTwoColProps) {
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

  const accentColorClasses = {
    turquoise: {
      border: "border-brand-turquoise",
      bg: "bg-brand-turquoise/5",
      text: "text-brand-turquoise",
      icon: "bg-brand-turquoise/10 text-brand-turquoise",
      gradient: "from-brand-turquoise/10 to-transparent",
    },
    orange: {
      border: "border-brand-orange",
      bg: "bg-brand-orange/5",
      text: "text-brand-orange",
      icon: "bg-brand-orange/10 text-brand-orange",
      gradient: "from-brand-orange/10 to-transparent",
    },
    navy: {
      border: "border-brand-navy",
      bg: "bg-brand-navy/5",
      text: "text-brand-navy",
      icon: "bg-brand-navy/10 text-brand-navy",
      gradient: "from-brand-navy/10 to-transparent",
    },
  };

  const colors = accentColorClasses[accent];

  return (
    <section
      ref={sectionRef}
      className="border-t border-gray-100 bg-white px-6 py-20 opacity-0 transition-all duration-1000 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          {/* Sol: Başlık + Icon */}
          <div className="space-y-6">
            <div
              className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl text-4xl ${colors.icon}`}
            >
              {icon}
            </div>
            <h2 className={`text-4xl font-bold md:text-5xl ${colors.text}`}>
              {title}
            </h2>
          </div>

          {/* Sağ: İçerik - Card Style */}
          <div className="space-y-4">
            {paragraphs.map((paragraph, index) => (
              <div
                key={index}
                className={`group rounded-xl border-l-4 ${colors.border} bg-gradient-to-r ${colors.gradient} p-6 transition-all duration-300 hover:shadow-md`}
              >
                <p className="leading-relaxed text-gray-700">{paragraph}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

