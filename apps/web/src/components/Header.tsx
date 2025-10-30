"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import EarlyAccessModal from "./landing/EarlyAccessModal";

const navItems = [
  { label: "Ana Sayfa", href: "/" },
  { label: "Çözümler", href: "/cozumler" },
  { label: "Fiyatlandırma", href: "/fiyatlandirma" },
  { 
    label: "Kurumsal", 
    href: "/kurumsal",
    dropdown: [
      { label: "Hakkımızda", href: "/hakkimizda" },
      { label: "Ekip", href: "/ekip" },
    ]
  },
  { label: "Kaynaklar", href: "/kaynaklar" },
  { 
    label: "İletişim", 
    href: "/iletisim",
    dropdown: [
      { label: "İletişim", href: "/iletisim" },
      { label: "FAQ", href: "/faq" },
    ]
  },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header 
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300 bg-white",
        isScrolled ? "shadow-md" : "shadow-sm"
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center">
          <img
            src="/callmetriclogo.jpg"
            alt="CallMetric AI"
            className="h-12 w-auto object-contain md:h-14"
            style={{ mixBlendMode: 'multiply' }}
          />
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);
            const hasDropdown = item.dropdown && item.dropdown.length > 0;
            
            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => hasDropdown && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={[
                    "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200",
                    active 
                      ? "bg-[var(--brand-turquoise)]/10 text-[var(--brand-turquoise)]" 
                      : "text-gray-700 hover:bg-gray-50 hover:text-[var(--brand-turquoise)]"
                  ].join(" ")}
                >
                  {item.label}
                  {hasDropdown && (
                    <svg 
                      width="14" 
                      height="14" 
                      viewBox="0 0 14 14" 
                      fill="none"
                      className={[
                        "transition-transform duration-200",
                        openDropdown === item.label ? "rotate-180" : ""
                      ].join(" ")}
                    >
                      <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown Menu */}
                {hasDropdown && openDropdown === item.label && (
                  <div className="absolute left-0 top-full mt-2 w-48 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                      {item.dropdown?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[var(--brand-turquoise)]/5 hover:text-[var(--brand-turquoise)]"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: CTAs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="whitespace-nowrap rounded-lg bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)] px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:shadow-xl md:px-8"
          >
            Erken Erişim Talep Et
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
            aria-label="Menü"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-6 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              const hasDropdown = item.dropdown && item.dropdown.length > 0;
              
              return (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => !hasDropdown && setMobileMenuOpen(false)}
                    className={[
                      "flex items-center justify-between rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                      active 
                        ? "bg-[var(--brand-turquoise)]/10 text-[var(--brand-turquoise)]" 
                        : "text-gray-700 hover:bg-gray-50"
                    ].join(" ")}
                  >
                    {item.label}
                    {hasDropdown && (
                      <svg 
                        width="14" 
                        height="14" 
                        viewBox="0 0 14 14" 
                        fill="none"
                        className={[
                          "transition-transform duration-200",
                          openDropdown === item.label ? "rotate-180" : ""
                        ].join(" ")}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenDropdown(openDropdown === item.label ? null : item.label);
                        }}
                      >
                        <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </Link>

                  {/* Mobile Dropdown */}
                  {hasDropdown && openDropdown === item.label && (
                    <div className="ml-4 mt-2 space-y-1">
                      {item.dropdown?.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[var(--brand-turquoise)]"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      {/* Early Access Modal */}
      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
}