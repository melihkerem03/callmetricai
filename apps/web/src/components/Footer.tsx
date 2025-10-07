import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t-4 border-black bg-black py-16 text-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top Section - Simplified Links */}
        <div className="mb-12 grid gap-8 md:grid-cols-3">
          {/* Ürün */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Ürün</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Yapay Zeka Ajanları
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Yapay Zeka Yardımcıları
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Konuşma Zekası
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Platform</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Entegrasyonlar &amp; API&apos;ler
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Güvenlik
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Çözümler
                </Link>
              </li>
            </ul>
          </div>

          {/* Şirket */}
          <div>
            <h3 className="mb-4 text-sm font-bold text-white">Şirket</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Kariyer
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row">
          {/* Left: Brand */}
          <div className="flex items-center gap-4">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#6366f1] to-[#a855f7] text-lg font-bold text-white">
              C
            </span>
            <span className="text-lg font-bold text-white">CallMetricAI</span>
            <span className="text-sm text-gray-500">© 2025</span>
          </div>

          {/* Center: Social (kept minimal) */}
          <div className="flex items-center gap-6">
            <Link href="#" className="text-gray-400 transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </Link>
            <Link href="#" className="text-gray-400 transition-colors hover:text-white">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-6.597-8.717L5.067 22H1.75l7.804-10.293L.453 2.25H4.72L9.52 8.481Zm1.871 15.981H17.3L6.637 6.25h3.308L20.115 18.231Z" />
              </svg>
            </Link>
          </div>

          {/* Right: Legal & Address */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500">
            <Link href="#" className="hover:text-white">
              Şartlar
            </Link>
            <Link href="#" className="hover:text-white">
              Gizlilik
            </Link>
            <Link href="#" className="hover:text-white">
              Çerez Politikası
            </Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
}
