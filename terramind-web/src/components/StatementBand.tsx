"use client";

import { useReveal } from "@/hooks/useReveal";
import SectionArt from "@/components/SectionArt";

export default function StatementBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 text-center md:px-10"
    >
      <SectionArt seed={1} />
      <div
        className="glow-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 35%, rgba(15,122,65,0.24) 0%, rgba(15,122,65,0) 60%), linear-gradient(to bottom, rgba(27,42,34,0.6) 0%, rgba(27,42,34,0) 30%, rgba(27,42,34,0) 70%, rgba(27,42,34,0.6) 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-1 mx-auto max-w-3xl">
        <h2 className="mb-5 font-serif text-[clamp(32px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-white">
          Not a weather app.
          <br />An <em className="shimmer-text italic">
            AI prediction
          </em>{" "}
          platform.
        </h2>
        <p className="text-[17px] leading-relaxed text-white/80">
          TerraMind&apos;s machine-learning prediction engine is calibrated
          against what actually happens on your blocks. It forecasts frost,
          disease, water stress and harvest windows as honest probabilities,
          not vague icons.
          An AI reasoning layer then turns every prediction into dollars and a
          decision: what&apos;s likely, what it costs, and what&apos;s worth
          doing about it.
        </p>
      </div>
    </section>
  );
}
