import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DecisionPipeline from "@/components/DecisionPipeline";
import PlatformRows from "@/components/PlatformRows";
import StatementBand from "@/components/StatementBand";
import AILayerSection from "@/components/AILayerSection";
import MetricsBand from "@/components/MetricsBand";
import EconomicsBand from "@/components/EconomicsBand";
import Footer from "@/components/Footer";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export default function Home() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <Hero />
        <DecisionPipeline />
        <PlatformRows />
        <StatementBand />
        <AILayerSection />
        <MetricsBand />
        <EconomicsBand />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
