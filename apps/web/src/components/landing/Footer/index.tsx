import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/callmetric-ai/",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      name: "Twitter",
      url: "https://x.com/CallMetricAi",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/CallMetricAi",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      )
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/callmetricai",
      icon: (
        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    }
  ];

  const footerLinks = {
    product: [
      { label: "Özellikler", href: "#features" },
      { label: "Fiyatlandırma", href: "#pricing" },
      { label: "Nasıl Çalışır", href: "#how-it-works" }
    ],
    company: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Kurumsal", href: "#corporate" },
      { label: "İletişim", href: "#contact" }
    ],
    resources: [
      { label: "Blog", href: "#blog" },
      { label: "Vaka Çalışmaları", href: "#cases" },
      { label: "SSS", href: "#faq" }
    ],
    legal: [
      { label: "Gizlilik Politikası", href: "#privacy" },
      { label: "KVKK", href: "#kvkk" },
      { label: "Kullanım Şartları", href: "#terms" }
    ]
  };

  return (
    <footer id="contact" className="bg-[var(--brand-navy)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-4">
        {/* Logo */}
        <div className="mb-1.5">
          <Image
            src="/callmetriclogo-dark.jpg"
            alt="CallMetric AI"
            width={150}
            height={42}
            className=""
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left: Company Info & Contact */}
          <div>
            <p className="mb-3 text-sm text-gray-300">
              Çağrı merkezi performansını yapay zeka ile optimize eden, 
              Türkçe'ye özel multimodal analiz platformu.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-1.5 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <span>📧</span>
                <a href="mailto:Info@callmetricai.com" className="hover:text-[var(--brand-turquoise)]">
                  Info@callmetricai.com
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span>
                <a href="tel:+902129122426" className="hover:text-[var(--brand-turquoise)]">
                  +90 212 912 24 26
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span>💬</span>
                <a href="https://wa.me/905330964800" className="hover:text-[var(--brand-turquoise)]">
                  WhatsApp: 0 533 096 4800
                </a>
              </p>
              <p className="flex items-start gap-2">
                <span>📍</span>
                <span>Teknopark, Orhangazi Mah. Merkez, Düzce</span>
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-3 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-[var(--brand-turquoise)]"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Links Grid - All in one row */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">Ürün</h4>
              <ul className="space-y-1.5">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[var(--brand-turquoise)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">Kurumsal</h4>
              <ul className="space-y-1.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[var(--brand-turquoise)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">Kaynaklar</h4>
              <ul className="space-y-1.5">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[var(--brand-turquoise)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wider">Yasal</h4>
              <ul className="space-y-1.5">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-gray-300 hover:text-[var(--brand-turquoise)]">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* KVKK Notice - Compact */}
        <div className="mt-4 rounded-lg bg-white/5 p-3">
          <h4 className="mb-1.5 text-xs font-bold uppercase">KVKK / Gizlilik / Veri İşleme</h4>
          <p className="text-xs leading-relaxed text-gray-300">
            Çağrı kayıtları ve konuşma verileri KVKK'na uygun olarak işlenir. Müşteri verileri 
            yalnızca hizmet sağlama amaçlı kullanılır, anonimleştirme ve veri minimalizasyonu uygulanır. 
            Kişisel veri işlemlerine ilişkin detaylı doküman için{" "}
            <Link href="#privacy" className="text-[var(--brand-turquoise)] underline">
              Gizlilik Politikası
            </Link>{" "}
            sayfasını inceleyin.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-3 border-t border-white/10 pt-3 text-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} CallMetric AI. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}



