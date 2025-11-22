"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-black text-white">
      {/* Top Border Line */}
      <div className="h-[8px] bg-gradient-to-r from-[#65f5e5] to-[#fea263]"></div>
      
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo and Copyright */}
          <div className="flex flex-col">
            <div className="mb-8">
              <img
                src="/callmetriclogo.png"
                alt="CallMetric AI"
                className="h-30 w-auto object-contain"
              />
            </div>
            
          </div>

          {/* Column 2: İletişime Geçin */}
          <div className="flex flex-col">
            <h3 className="mb-8 text-xl font-bold text-white">İletişime Geçin</h3>
            <div className="space-y-3 text-base text-gray-400">
              <p>Teknopark, Orhangazi Mah. Merkez</p>
              <p>Düzce, Türkiye</p>
              <p className="mt-6">
                <a
                  href="mailto:info@callmetricai.com"
                  className="text-white transition-colors hover:text-cyan-400"
                >
                  info@callmetricai.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+902129122426"
                  className="text-white transition-colors hover:text-cyan-400"
                >
                  0(212) 912 24 26
                </a>
              </p>
            </div>
          </div>

          {/* Column 3: Daha Fazla */}
          <div className="flex flex-col">
            <h3 className="mb-8 text-xl font-bold text-white">Daha Fazla</h3>
            <ul className="space-y-4 text-base text-gray-400">
              <li>
                <Link href="/company" className="transition-colors hover:text-white">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/products" className="transition-colors hover:text-white">
                  Ürünler
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-white">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="transition-colors hover:text-white">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Bizi Takip Edin */}
          <div className="flex flex-col justify-center">
            <div className="flex justify-start gap-4">
              <Link
                href="https://www.linkedin.com/company/callmetric-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label="LinkedIn"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link
                href="https://x.com/CallMetricAi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label="X (Twitter)"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
              <Link
                href="https://www.instagram.com/CallMetricAi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 w-12 items-center justify-center text-white transition-opacity hover:opacity-70"
                aria-label="Instagram"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Content Border Line */}
      <div className="h-[8px] bg-gradient-to-r from-[#65f5e5] to-[#fea263]"></div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-500 bg-black text-white transition-all hover:bg-cyan-500 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </footer>
  );
}
