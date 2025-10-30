import Image from "next/image";

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-5xl">
          {/* Quote */}
          <div className="relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl md:p-12">
            {/* Quote Icon */}
            <div className="absolute left-8 top-8 text-6xl text-[var(--brand-turquoise)] opacity-20">
              "
            </div>
            
            <div className="relative flex flex-col gap-8 md:flex-row md:items-center">
              {/* Text on Left */}
              <blockquote className="flex-1">
                <p className="text-lg font-bold leading-relaxed text-gray-800 md:text-xl">
                  CallMetric AI'ı kurarken hedefimiz yalın: insan hizmetini teknolojiyle güçlendirmek. 
                  Temsilcilerimizi yalnızca değerlendirmek değil, onlara anlık destek sunup gelişimlerini 
                  hızlandırmak; yöneticilere de karar alma süreçlerinde net, eyleme dönüştürülebilir 
                  içgörüler vermek istiyoruz. Türkçe'ye özel multimodal teknik altyapımızla çağrı 
                  merkezlerinin performansını sürdürülebilir şekilde artırıyoruz.
                </p>
              </blockquote>
              
              {/* Author on Right */}
              <footer className="flex flex-col items-center gap-4 md:flex-shrink-0">
                <div className="group relative overflow-hidden rounded-2xl shadow-xl transition-all duration-300 hover:shadow-2xl">
                  <div className="relative h-48 w-40 overflow-hidden">
                    <Image
                      src="/founder.jpg"
                      alt="Muhittin Ferhat Sağlam"
                      width={160}
                      height={192}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-navy)]/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  </div>
                  {/* Decorative Border */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-[var(--brand-turquoise)]/0 transition-all duration-300 group-hover:ring-[var(--brand-turquoise)]/30"></div>
                </div>
                <div className="text-center">
                  <p className="font-bold text-gray-900">Muhittin Ferhat Sağlam</p>
                  <p className="text-sm text-gray-600">Kurucu</p>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



