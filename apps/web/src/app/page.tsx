import { Metadata } from "next";
import Hero from "@/components/landing/Hero";
import ProductIntro from "@/components/landing/ProductIntro";
import ProductFeatures from "@/components/landing/ProductFeatures";
import HowItWorks from "@/components/landing/HowItWorks";
import Dashboards from "@/components/landing/Dashboards";
import Scenarios from "@/components/landing/Scenarios";
import Testimonials from "@/components/landing/Testimonials";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";
import StickyCTA from "@/components/landing/StickyCTA";

export const metadata: Metadata = {
  title: "CallMetric AI — Çağrı Merkezi Performans Analizi",
  description: "CallMetric AI — Türkçe'ye özel çağrı merkezi performans analizi. Gerçek zamanlı duygu ve içerik füzyonu (SER+NLP), anlık koçluk, yönetici dashboard'ları ve KVKK uyumlu SaaS. Ücretsiz demo alın.",
  keywords: "çağrı merkezi analizi, çağrı merkezi yapay zeka, Türkçe SER, çağrı performans analizi, agent assist, gerçek zamanlı koçluk, KVKK uyumlu çağrı analizi",
  authors: [{ name: "CallMetric AI" }],
  openGraph: {
    title: "CallMetric AI — Çağrı Merkezi Performans Analizi",
    description: "Türkçe'ye özel multimodal çağrı merkezi analiz platformu. Gerçek zamanlı duygu ve içerik füzyonu ile performansınızı artırın.",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "CallMetric AI — Çağrı Merkezi Performans Analizi",
    description: "Türkçe'ye özel multimodal çağrı merkezi analiz platformu.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProductIntro />
      <ProductFeatures />
      <HowItWorks />
      <Dashboards />
      <Scenarios />
      <Testimonials />
      <CTA />
      <Footer />
      <StickyCTA />
    </>
  );
}
