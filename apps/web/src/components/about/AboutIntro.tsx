"use client";

import { useEffect, useRef } from "react";

export default function AboutIntro() {
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
      ref={sectionRef}
      className="border-t border-gray-100 bg-white px-6 py-20 opacity-0 transition-all duration-1000 md:py-28"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
          Biz Kimiz
        </h2>
        <div className="space-y-6 text-lg leading-relaxed text-gray-700">
          <p>
            CallMetric AI, çağrı merkezi performansını analiz eden bir
            yazılımın ötesinde; insan zekâsı ve Agentic AI'nın dönüştürücü
            gücünü birleştiren bir vizyondur.
          </p>
          <p>
            Amacımız, insan emeğini, zamanı ve potansiyeli optimize ederek
            çalışma hayatını daha akıllı, daha verimli ve daha anlamlı hale
            getirmektir.
          </p>
          <p>
            Ekibimiz, yapay zekâ, yazılım mühendisliği ve dijital pazarlama
            alanlarında uzman profesyonellerden oluşur.
          </p>
          <p>
            Farklı disiplinlerden gelen bu ekip, teknolojiyi yalnızca bir araç
            olarak değil — insanın üretkenliğini artıran bir &quot;ortak
            zekâ&quot; unsuru olarak konumlandırır.
          </p>
          <p className="font-medium text-gray-900">
            Bizim için teknoloji, insanın yerini almak için değil; insanın
            performansını ve yaşam kalitesini yükseltmek için vardır.
          </p>
        </div>
      </div>
    </section>
  );
}

