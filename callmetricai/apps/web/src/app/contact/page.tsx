"use client";

import HeroImageArea from "@/components/HeroImageArea";

export default function ContactPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 lg:items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col justify-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                İLETİŞİM
              </p>
              <h1 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Çağrı merkezi performansınızı bir sonraki seviyeye taşımak için buradayız.
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Sorularınız, iş birlikleri veya demo talepleriniz için ekibimizle doğrudan iletişime geçebilirsiniz. İş süreçlerinizi optimize etmek ve performansınızı artırmak için buradayız.
              </p>
            </div>

            {/* Right Side - Circular Image Area */}
            <HeroImageArea />
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="bg-white py-40">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Side - Contact Information */}
            <div>
              <h2 className="mb-12 text-4xl font-bold text-gray-900 md:text-5xl">
                Genel İletişim Bilgileri
              </h2>
              
              <div className="mb-10 space-y-8">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Telefon
                  </p>
                  <a
                    href="tel:+902129122426"
                    className="text-lg text-gray-900 transition-colors hover:text-cyan-600"
                  >
                    (0212) 912 24 26
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    E-posta
                  </p>
                  <a
                    href="mailto:info@callmetricai.com"
                    className="text-lg text-gray-900 transition-colors hover:text-cyan-600"
                  >
                    info@callmetricai.com
                  </a>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Adres
                  </p>
                  <p className="text-lg text-gray-900">
                    Teknopark, Orhangazi Mah. Merkez, Düzce, Türkiye
                  </p>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="mb-8">
                <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Sosyal Medya
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/callmetric-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-cyan-600"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://x.com/CallMetricAi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 transition-colors hover:text-cyan-600"
                  >
                    X (Twitter)
                  </a>
                </div>
              </div>

              {/* Trust Note */}
              <div className="border-t border-gray-200 pt-8">
                <p className="text-sm leading-relaxed text-gray-600">
                  &quot;Düzce Teknopark bünyesinde yürütülen Ar-Ge faaliyetleri ve Bilsoft Yazılım ile pilot entegrasyon deneyimi sayesinde, Türkiye&apos;de kurumsal veri barındırma ve ölçeklenebilir SaaS çözümleri sunmaktayız.&quot;
                </p>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div>
              <h2 className="mb-8 text-4xl font-bold text-gray-900 md:text-5xl">
                Bize Ulaşın
              </h2>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-700">
                    Ad Soyad <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                    placeholder="Adınız ve soyadınız"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                    E-posta Adresi <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                    placeholder="ornek@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="mb-2 block text-sm font-medium text-gray-700">
                    Şirket Adı
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-cyan-500 focus:outline-none"
                    placeholder="Şirket adınız"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                    Mesajınız / Talebiniz <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder:text-gray-400 transition-colors focus:border-cyan-500 focus:outline-none resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-gradient-to-r from-cyan-500 to-orange-500 px-8 py-4 text-sm font-semibold text-white transition-all hover:from-cyan-600 hover:to-orange-600"
                >
                  Mesaj Gönder
                </button>

                <p className="text-center text-xs text-gray-500">
                  Form gönderiminiz ardından ekibimiz en geç 24 saat içinde sizinle iletişime geçecektir.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Info Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Business & Press */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                İş Birlikleri ve Basın
              </h3>
              <p className="mb-4 text-base leading-relaxed text-gray-600">
                Basın, yatırım veya ortaklık fırsatlarıyla ilgili iletişimler için:
              </p>
              <a
                href="mailto:partner@callmetricai.com"
                className="text-lg font-medium text-cyan-600 transition-colors hover:text-cyan-700"
              >
                partner@callmetricai.com
              </a>
            </div>

            {/* Support */}
            <div>
              <h3 className="mb-4 text-2xl font-bold text-gray-900">
                Destek ve Teknik Sorular
              </h3>
              <p className="mb-4 text-base leading-relaxed text-gray-600">
                Destek veya entegrasyon talepleriniz için:
              </p>
              <a
                href="mailto:support@callmetricai.com"
                className="text-lg font-medium text-cyan-600 transition-colors hover:text-cyan-700"
              >
                support@callmetricai.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="bg-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-gray-600">
            Verileriniz yalnızca iletişim amacıyla kullanılacak ve KVKK/ulusal veri barındırma standartlarına uygun şekilde korunmaktadır.
          </p>
        </div>
      </section>
    </>
  );
}

