import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DecisionPipeline from "@/components/DecisionPipeline";
import PlatformRows from "@/components/PlatformRows";
import StatementBand from "@/components/StatementBand";
import AILayerSection from "@/components/AILayerSection";
import CompoundingSection from "@/components/CompoundingSection";
import HardwareSection from "@/components/HardwareSection";
import MetricsBand from "@/components/MetricsBand";
import EconomicsBand from "@/components/EconomicsBand";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DecisionPipeline />
        <PlatformRows />
        <StatementBand />
        <AILayerSection />
        <CompoundingSection />
        <MetricsBand />
        <HardwareSection />
        <EconomicsBand />
        <Footer />
      </main>
    </>
  );
}
