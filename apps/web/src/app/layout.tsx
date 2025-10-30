import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CallMetricAI - Yapay Zeka Ajanları",
  description: "Müşteri deneyimi için yapay zeka ajanları. Ses öncelikli yapay zeka ile doğal konuşmalar ve güvenilir yürütme.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body className="min-h-screen bg-white text-gray-900">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}