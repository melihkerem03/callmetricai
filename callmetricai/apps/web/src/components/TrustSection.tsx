import Link from "next/link";

export default function TrustSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left Side - Title and Description */}
          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
              KVKK / GİZLİLİK / VERİ İŞLEME
            </p>
            <h2 className="mb-8 text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
              Verileriniz güvende,{" "}
              <span className="block">uyumluluğunuz garanti</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Çağrı kayıtları ve konuşma verileri KVKK&apos;na uygun olarak işlenir. Müşteri verileri yalnızca hizmet sağlama amaçlı kullanılır, anonimleştirme ve veri minimalizasyonu uygulanır.
            </p>
            <Link
              href="/privacy"
              className="flex items-center gap-2 text-lg font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
            >
              Gizlilik Politikası
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Right Side - Feature Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col rounded-2xl bg-white p-6 transition-shadow shadow-xl">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                KVKK Uyumluluğu
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Kişisel veri işlemlerine ilişkin detaylı doküman için Gizlilik Politikası sayfasını inceleyin. Yerel hosting, anonimleştirme ve DPA seçenekleri mevcuttur.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-6 transition-shadow shadow-xl">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Veri Güvenliği
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Verileriniz durağan ve aktarım sırasında şifrelenir, katı erişim kontrolleri ve denetim günlükleri ile korunur.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-6 transition-shadow shadow-xl">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Denetim İzleri
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Her kararın arkasındaki mantığı anlamak için konuşmaların %100&apos;ünü otomatik olarak değerlendirin ve eksiksiz bir denetim izi ile tam şeffaflık elde edin.
              </p>
            </div>
            <div className="flex flex-col rounded-2xl bg-white p-6 transition-shadow shadow-xl">
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Rol Tabanlı Erişim
              </h3>
              <p className="text-sm leading-relaxed text-gray-700">
                Verilerinize yalnızca yetkili personel erişebilir. Rol tabanlı erişim kontrolü ile veri güvenliğiniz en üst seviyede korunur.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
