import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PilotCards from "@/components/PilotCards";
import SectionArt from "@/components/SectionArt";
import BookingCTA from "@/components/BookingCTA";

export const metadata: Metadata = {
  title: "Work with us — TerraMind",
  description:
    "We're recruiting growers for the TerraMind pilot. Book a call and join us in transforming horticulture.",
};

export default function WorkWithUsPage() {
  return (
    <>
      <Nav />
      <main>
        <div className="relative overflow-hidden bg-chrome-deep">
          <SectionArt seed={9} />
          <section className="work-with-us-stage relative px-6 text-center md:px-10">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.24) 0%, rgba(15,122,65,0) 60%)",
              }}
            />
            <div className="work-with-us-shell relative z-1">
              <div className="work-with-us-copy mx-auto max-w-3xl">
                <h1 className="mb-5 font-serif text-[clamp(42px,6vw,78px)] font-semibold leading-[1.05] tracking-tight text-white">
                  Join us in transforming
                  <br />
                  <em className="font-serif italic text-accent">
                    horticulture
                  </em>
                </h1>
                <p className="mx-auto mb-4 max-w-2xl text-[17px] leading-relaxed text-white/80">
                  TerraMind is a fundamental reimagining of how horticultural
                  decisions get made — the AI-powered platform growers have
                  been waiting for: one that saves time, prevents losses, and
                  puts the economics of every decision in plain sight, with the
                  confidence interval attached.
                </p>
                <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-white/80">
                  For growers tired of making six-figure calls without the tools
                  to back them up. For an industry ready to move from signal to
                  decision — choose TerraMind, configured to the way your
                  orchard already works.
                </p>
              </div>
              <div className="work-with-us-booking-row">
                <BookingCTA />
              </div>
              <div className="work-with-us-cards">
                <PilotCards />
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
