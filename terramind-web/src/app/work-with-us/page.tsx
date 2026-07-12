import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalEmbed from "@/components/CalEmbed";
import PilotCards from "@/components/PilotCards";
import SectionArt from "@/components/SectionArt";

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
        {/* One continuous dark canvas behind all three sections so the
            hero-style landscape reads as a single scene, not tiled bands */}
        <div className="relative overflow-hidden bg-chrome-deep">
        <SectionArt seed={9} />
        <section className="relative px-6 pb-8 pt-32 text-center md:px-10">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.24) 0%, rgba(15,122,65,0) 60%)",
            }}
          />
          <div className="relative z-1 mx-auto max-w-3xl">
            <div className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              Work with us
            </div>
            <h1 className="mb-6 font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.08] tracking-tight text-white">
              Join us in transforming
              <br />
              <em className="font-serif italic text-accent">horticulture</em>
            </h1>
            <p className="mx-auto mb-6 max-w-2xl text-[17px] leading-relaxed text-white/80">
              TerraMind is a fundamental reimagining of how horticultural
              decisions get made — the AI-powered platform growers have been waiting
              for:
              one that saves time, prevents losses, and puts the economics of
              every decision in plain sight, with the confidence interval
              attached.
            </p>
            <p className="mx-auto max-w-2xl text-[17px] leading-relaxed text-white/80">
              For growers tired of making six-figure calls without the tools to
              back them up. For an industry ready to move from signal to
              decision — choose TerraMind, configured to the way your orchard
              already works.
            </p>
          </div>
        </section>

        <section className="relative px-6 pb-16 md:px-10">
          <PilotCards />
        </section>

        <section className="relative px-6 pb-28 md:px-10">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 text-center">
              <h2 className="mb-4 font-serif text-[clamp(28px,3.5vw,44px)] font-semibold tracking-tight text-white">
                Book a call
              </h2>
              <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/75">
                Thirty minutes with the people building it. We&apos;ll discuss
                your blocks, your risks, and what the pilot would look like on
                your operation. No deck, no pressure — pick a time below.
              </p>
            </div>
            <CalEmbed />
            <p className="mt-6 text-center text-xs text-white/55">
              Prefer email?{" "}
              <a
                href="mailto:support@terramind.co.nz"
                className="text-white/75 transition-colors hover:text-white"
              >
                support@terramind.co.nz
              </a>
            </p>
          </div>
        </section>
        </div>
        <Footer />
      </main>
    </>
  );
}
