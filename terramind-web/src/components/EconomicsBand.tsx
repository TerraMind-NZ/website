"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import CountUp from "@/components/CountUp";
import SectionArt from "@/components/SectionArt";
import TiltCard from "@/components/TiltCard";

const FIGURES = [
  {
    value: "23.4",
    label: "Damaging frost nights per season, average NZ location",
  },
  { value: "66%", label: "Of frost nights missed by climatology tools" },
  { value: "94%", label: "Caught by TerraMind at the economic setting" },
];

export default function EconomicsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 md:px-10"
    >
      <SectionArt seed={2} />
      <div
        className="glow-breathe pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
        }}
      />
      <div className="relative z-1 mx-auto max-w-[1100px]">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
          The economics
        </div>
        <h2 className="mb-5 max-w-3xl font-serif text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-tight text-white">
          Frost alone is a{" "}
          <em className="shimmer-text italic">five-figure decision</em> — per
          hectare, per season.
        </h2>
        <p className="mb-14 max-w-2xl text-[17px] leading-relaxed text-white/80">
          Exposure runs to tens of thousands of dollars a hectare. TerraMind
          prices every risk night in dollars and tells you when protection
          pays for itself — before you start the wind machine, not after. And
          with read-only Xero integration, the AI reasons with your actual
          costs and returns — your dollars, not industry averages.
        </p>
        <div className="stagger mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FIGURES.map((f, i) => (
            <TiltCard
              key={f.value}
              style={{ "--d": i } as CSSProperties}
              className="rounded-xl"
            >
              <div className="card-lift-dark h-full rounded-xl border border-white/12 bg-white/4 p-7">
                <div className="mb-2 font-serif text-[44px] font-semibold leading-none tracking-tight text-white">
                  <CountUp value={f.value} />
                </div>
                <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-white/60">
                  {f.label}
                </p>
              </div>
            </TiltCard>
          ))}
        </div>
        <Link
          href="/work-with-us"
          className="link-arrow inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep hover:shadow-[0_14px_36px_-12px_rgba(67,213,133,0.55)]"
        >
          Work with us <span className="arrow">↗</span>
        </Link>
      </div>
    </section>
  );
}
