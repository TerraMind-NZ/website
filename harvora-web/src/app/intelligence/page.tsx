import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import IntelligenceSections from "@/components/IntelligenceSections";

export const metadata: Metadata = {
  title: "Harvora Intelligence — A 24-feature AI reasoning layer",
  description:
    "Grounding-before-generation, nightly insight scans, an agentic assistant with retrieval-augmented answers — every AI feature exists because of a Harvora prediction.",
};

export default function IntelligencePage() {
  return (
    <>
      <Nav />
      <main>
        <IntelligenceSections />
        <Footer />
      </main>
    </>
  );
}
