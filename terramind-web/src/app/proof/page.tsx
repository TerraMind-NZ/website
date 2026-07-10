import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ProofSections from "@/components/ProofSections";
import RequestAccessModal from "@/components/RequestAccessModal";
import { ModalProvider } from "@/components/ModalProvider";

export const metadata: Metadata = {
  title: "TerraMind Proof — Measured accuracy, every surface",
  description:
    "94% of frost nights caught, ECE 0.007 calibration, r = 0.87 irrigation across 6 NZ regions — every TerraMind surface ships with a measured accuracy stat on real New Zealand data.",
};

export default function ProofPage() {
  return (
    <ModalProvider>
      <Nav />
      <main>
        <ProofSections />
        <Footer />
      </main>
      <RequestAccessModal />
    </ModalProvider>
  );
}
