import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SetupFlow from "@/components/SetupFlow";
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
        <section className="border-y border-line bg-paper-2 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1100px]">
            <SetupFlow />
          </div>
        </section>
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
