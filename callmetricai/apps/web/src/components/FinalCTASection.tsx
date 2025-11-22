import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="bg-gradient-to-b from-white to-[#fea363] py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Headline */}
        <div className="mb-8 text-center">
          <h2 className="mx-auto max-w-5xl text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
            Çağrı merkezlerinde güvenilen{" "}
            <span className="font-serif italic">Agentic AI</span>{" "}
            
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
            Departmanınızı bir maliyet merkezinden stratejik bir gelir bölümüne dönüştürmeye hazır mısınız? Size yardımcı olmak için buradayız.
          </p>
        </div>

        {/* CTA Button */}
        
      </div>
    </section>
  );
}

