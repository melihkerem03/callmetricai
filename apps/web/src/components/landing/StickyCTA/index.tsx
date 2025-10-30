"use client";

import { useEffect, useState } from "react";
import EarlyAccessModal from "../EarlyAccessModal";

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down 500px
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-8 right-8 z-40 animate-bounce">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[var(--brand-orange)] to-[var(--brand-turquoise)] px-6 py-4 font-semibold text-white shadow-2xl transition-all hover:scale-105 hover:shadow-3xl"
        >
          <span>🚀</span>
          <span className="hidden sm:inline">Erken Erişim Talep Et</span>
          <span className="sm:hidden">Erken Erişim</span>
        </button>
      </div>

      <EarlyAccessModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}




