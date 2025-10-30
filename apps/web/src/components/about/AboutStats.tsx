"use client";

import { useEffect, useRef } from "react";

interface Stat {
  value: string;
  label: string;
  accent: "turquoise" | "orange" | "navy";
}

interface AboutStatsProps {
  stats?: Stat[];
}

const defaultStats: Stat[] = [
  {
    value: "100%",
    label: "Müşteri Memnuniyeti",
    accent: "turquoise",
  },
  {
    value: "7/24",
    label: "Kesintisiz Analiz",
    accent: "orange",
  },
  {
    value: "AI-Powered",
    label: "Agentic Intelligence",
    accent: "navy",
  },
];

export default function AboutStats({ stats = defaultStats }: AboutStatsProps) {
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

  const accentClasses = {
    turquoise: "text-brand-turquoise",
    orange: "text-brand-orange",
    navy: "text-brand-navy",
  };

  return (
    <section
      ref={sectionRef}
      className="border-t border-gray-100 bg-white px-6 py-20 opacity-0 transition-all duration-1000 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-10 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <div
                className={`mb-4 text-5xl font-bold md:text-6xl ${accentClasses[stat.accent]}`}
              >
                {stat.value}
              </div>
              <div className="text-lg font-medium text-gray-700">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

