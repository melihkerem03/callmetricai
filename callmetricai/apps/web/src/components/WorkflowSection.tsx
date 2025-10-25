import Link from "next/link";

export default function WorkflowSection() {
  return (
    <section className="bg-white py-40">
      <div className="mx-auto max-w-7xl px-6">
        {/* Title */}
        <div className="mb-12 text-center">
          <h2 className="mb-6 text-4xl font-normal text-gray-900 md:text-5xl lg:text-6xl">
            İş akışlarınızı{" "}
            <span className="font-serif italic">uçtan uca</span> yürüten yapay zeka ajanları
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Yapay Zeka Ajanlarınızı ekiplerinizin zaten kullandığı araçlara bağlayın
          </p>
        </div>

        {/* CTA Button */}
        <div className="mb-16 text-center">
          <Link
            href="/integrations"
            className="inline-flex items-center justify-center rounded-full bg-gray-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
          >
            Tüm entegrasyonları görüntüle
          </Link>
        </div>

        {/* Workflow Diagram - Image */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br bg-white p-4 ">
          <div className="flex min-h-[400px] items-center justify-center">
            <img
              src="/workflow1.png"
              alt="Workflow Diagram"
              className="max-h-[600px] w-auto object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

