import Link from "next/link";

export default function TrustedSection() {
  return (
    <section className="bg-gradient-to-b from-gray-50 via-green-50 to-green-200 py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="mx-auto max-w-5xl text-4xl font-normal leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Sektörünüzü güçlendiren 350+ kuruluşun güvendiği
          </h2>
        </div>

        {/* Subtitle */}
        <div className="mb-12 text-center">
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-700">
            Departmanınızı bir maliyet merkezinden stratejik
            <br />
            bir gelir bölümüne dönüştürmeye hazır mısınız? Size yardımcı olmak için buradayız.
          </p>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-gray-800"
          >
            Başlayın
          </Link>
        </div>
      </div>
    </section>
  );
}

