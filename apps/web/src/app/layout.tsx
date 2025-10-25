import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "CallMetricAI - Yapay Zeka Ajanları",
  description: "Müşteri deneyimi için yapay zeka ajanları. Ses öncelikli yapay zeka ile doğal konuşmalar ve güvenilir yürütme.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RD0ME6D4W7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RD0ME6D4W7');
          `}
        </Script>
      </head>
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}