import Hero from "@/components/Hero";
import AgentsSection from "@/components/AgentsSection";
import ComprehensionSection from "@/components/ComprehensionSection";
import TrustSection from "@/components/TrustSection";
import WorkflowSection from "@/components/WorkflowSection";
import ProductsSection from "@/components/ProductsSection";
import TrustedSection from "@/components/TrustedSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AgentsSection />
      <ComprehensionSection />
      <TrustSection />
      <WorkflowSection />
      <ProductsSection />
      <TrustedSection />
    </>
  );
}