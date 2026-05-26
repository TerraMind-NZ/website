"use client";

import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import PlatformSection from "@/components/PlatformSection";
import WhoForSection from "@/components/WhoForSection";
import VisionSection from "@/components/VisionSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import { useParallax } from "@/hooks/useParallax";

export default function HomePage() {
  useParallax();

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MarqueeStrip />
        <PlatformSection />
        <WhoForSection />
        <VisionSection />
        <CTASection />
      </main>
      <div className="container">
        <Footer />
      </div>
    </>
  );
}
