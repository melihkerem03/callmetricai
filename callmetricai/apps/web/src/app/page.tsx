import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import ComprehensionSection from "@/components/ComprehensionSection";
import WorkflowSection from "@/components/WorkflowSection";
import TrustSection from "@/components/TrustSection";
import TrustedSection from "@/components/TrustedSection";
import FinalCTASection from "@/components/FinalCTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductsSection />
      <ComprehensionSection />
      <WorkflowSection />
      <TrustSection />
      <TrustedSection />
      <FinalCTASection />
    </>
  );
}