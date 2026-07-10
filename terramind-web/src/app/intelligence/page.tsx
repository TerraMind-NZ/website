import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IntelligenceSections from "@/components/IntelligenceSections";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "TerraMind Intelligence — A 14-feature AI reasoning layer",
  description:
    "Grounding-before-generation, nightly insight scans, an agentic assistant with retrieval-augmented answers — every AI feature exists because of a TerraMind prediction.",
};

export default function IntelligencePage() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <IntelligenceSections />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
