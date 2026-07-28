"use client";

import { CSSProperties } from "react";
import CountUp from "@/components/CountUp";
import MonteCarloPlate from "@/components/MonteCarloPlate";
import { useReveal } from "@/hooks/useReveal";

// Sits directly under the hero, and deliberately breaks the page's rhythm:
// where every other section explains, this one shows. The plate is the engine's
// actual contract — a thousand futures for one block, collapsed into a
// distribution and cut by a threshold — with the type wrapped around it.

// The gap the incumbents leave, then what we put in it. 66% missed and 94%
// caught are the same measurement, which is the whole argument.
const PROBLEM = [
  {
    value: "66%",
    label: "of damaging frost nights, missed by climatology-based tools",
    source: "TerraMind backtest · 6 NZ regions",
  },
  {
    value: "24%",
    label: "of a region's crop, lost to a single frost event",
    source: "NZ Winegrowers 2025",
  },
];

const PROOF = [
  { value: "94%", label: "Frost nights caught" },
  { value: "0.007", label: "Expected calibration error" },
  { value: "1,000", label: "Simulations behind every call" },
  { value: "0", label: "NZ incumbents with an AI layer" },
];

export default function ProblemSolution() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="problem"
      ref={ref}
      className="reveal border-b border-line bg-paper px-6 py-28 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="grid grid-cols-1 gap-x-16 gap-y-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* ── The problem, carried by the numbers */}
          <div>
            <div className="eyebrow mb-8">The problem</div>
            <h2 className="mb-5 max-w-sm font-serif text-[clamp(26px,3vw,36px)] font-semibold leading-[1.08] tracking-tight text-ink">
              Today&apos;s tools miss the nights that cost the most.
            </h2>
            <p className="mb-10 max-w-sm text-[15px] leading-relaxed text-ink-mute">
              And when they do fire, they hand back a useless, unreliable risk
              score — never a dollar figure, never a recommendation. Not one
              incumbent runs an AI reasoning layer.
            </p>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8">
              {PROBLEM.map((p) => (
                <div key={p.label}>
                  <div className="mb-2 font-serif text-[clamp(44px,5.6vw,62px)] font-semibold leading-[0.85] tracking-tight text-earth">
                    <CountUp value={p.value} />
                  </div>
                  <p className="text-[14px] leading-snug text-ink-soft">
                    {p.label}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    {p.source}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ── The answer */}
          <div className="lg:border-l lg:border-line lg:pl-16">
            <div className="eyebrow mb-8">The answer</div>
            <h2 className="mb-6 font-serif text-[clamp(38px,5.2vw,64px)] font-semibold leading-[0.98] tracking-tight text-ink">
              A thousand futures.
              <br />
              <em className="shimmer-text on-light italic">
                One call you can trust.
              </em>
            </h2>
            <p className="max-w-xl text-[16px] leading-relaxed text-ink-mute">
              TerraMind&apos;s prediction engine turns raw atmospheric and field
              data into calibrated weather and agronomic probabilities — then
              into block-level, dollar-denominated decisions. An AI reasoning
              layer plans your season, triages what threatens it, and learns
              every block with compounding seasonal intelligence.
            </p>
          </div>
        </div>

        {/* ── The plate */}
        <div className="mt-14 rounded-2xl border border-line bg-paper-3/60 p-5 md:mt-18 md:p-8">
          <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute">
            <span>1,000 simulated futures · one block · one night</span>
            <span className="text-ink-mute/70">End-state distribution ↓</span>
          </div>

          <div className="relative">
            <MonteCarloPlate />

            {/* The line that turns a distribution into a question */}
            <div className="pointer-events-none absolute left-0 top-[55.5%] -translate-y-[calc(100%+7px)] font-mono text-[10.5px] uppercase tracking-[0.16em] text-earth">
              Damage threshold
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div className="flex w-[74%] shrink-0 justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-ink-mute/70 md:w-[78%]">
              <span>6pm</span>
              <span>Midnight</span>
              <span>6am</span>
            </div>
            {/* What each layer contributes */}
            <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em]">
              <span className="text-ink-mute">Engine</span>
              <span className="font-bold text-earth tabular-nums">
                <CountUp value="70%" /> breach
              </span>
              <span className="h-3.5 w-px bg-line" />
              <span className="text-ink-mute">Decision layer</span>
              <span className="font-bold text-leaf">Protect · tonight</span>
            </div>
          </div>
        </div>

        {/* ── What holds it up */}
        <div className="stagger mt-16 grid grid-cols-2 gap-y-9 border-t border-line pt-12 md:mt-20 md:grid-cols-4">
          {PROOF.map((p, i) => (
            <div
              key={p.label}
              style={{ "--d": i } as CSSProperties}
              className="border-l border-line pl-5 first:border-l-0 first:pl-0 md:pl-7"
            >
              <div className="mb-1.5 font-mono text-[clamp(24px,2.6vw,30px)] font-bold leading-none tracking-tight text-ink tabular-nums">
                <CountUp value={p.value} />
              </div>
              <div className="font-mono text-[10.5px] uppercase leading-snug tracking-[0.12em] text-ink-mute">
                {p.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
