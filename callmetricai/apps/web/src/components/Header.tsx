"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Hakkımızda", href: "/company", hasDropdown: false },
  { label: "Ürünler", href: "/products", hasDropdown: false },
  { label: "İletişim", href: "/contact", hasDropdown: false },
  { label: "FAQs", href: "/faqs", hasDropdown: false },
];

const pageTitles: Record<string, string> = {
  "/": "CallMetric AI | İnsan Zekâsı ile Agentic AI'nın Dönüştürücü Gücü",
  "/company": "Hakkımızda | CallMetric AI",
  "/products": "Ürünler | CallMetric AI",
  "/contact": "İletişim | CallMetric AI",
  "/faqs": "FAQs | CallMetric AI",
  "/login": "Giriş Yap | CallMetric AI",
  "/signup": "Kayıt Ol | CallMetric AI",
};

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const title = pageTitles[pathname] || "CallMetric AI";
    document.title = title;
  }, [pathname]);

  return (
    <header 
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white",
        isScrolled ? "shadow-md" : ""
      ].join(" ")}
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/callmetriclogo.png"
            alt="CallMetricAI"
            className="h-32 w-auto object-contain"
          />
        </Link>

        {/* Center: Nav - Rounded pill container */}
        <nav className="hidden items-center gap-1 rounded-full bg-gray-50 px-4 py-2.5 shadow-sm md:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "flex items-center gap-1 rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  active ? "text-cyan-600" : "text-gray-700 hover:text-gray-900",
                ].join(" ")}
              >
                {item.label}
                {item.hasDropdown && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-70 text-gray-600">
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden rounded-full border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-all hover:bg-gray-50 md:inline-flex"
          >
            Giriş Yap
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-gradient-to-r from-cyan-500 to-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:from-cyan-600 hover:to-orange-600 hover:shadow-xl"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </header>
  );
}