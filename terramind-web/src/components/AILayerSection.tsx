"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  {
    name: "AI Season Planner",
    desc: "A prediction-driven calendar. Spray, irrigation, frost and harvest events scheduled — and rescheduled — as forecasts change.",
  },
  {
    name: "Daily Briefing",
    desc: "Each morning's decisions, ranked by economic impact. The five things worth your attention today, and why.",
  },
  {
    name: "Insights Feed",
    desc: "An overnight scan of every block surfaces patterns no single alert would catch — trajectory shifts, accumulating risks, quiet anomalies.",
  },
  {
    name: "Ask TerraMind",
    desc: "An agentic assistant with retrieval-augmented answers grounded in your blocks, your history, your numbers — never a generic chatbot.",
  },
];

const MORE_FEATURES = [
  {
    name: "Nightly Insight Scan",
    desc: "Five deterministic detectors sweep every block at 2:30 am.",
  },
  {
    name: "Decision Wins",
    desc: "Confirmed calls valued in dollars, banked per block.",
  },
  {
    name: "Risk-Weighted Planning",
    desc: "Season-scale Monte Carlo, priced into revenue impact.",
  },
  {
    name: "Pre-Decision Checklists",
    desc: "Before you run the wind machine: check X, Y, Z.",
  },
  {
    name: "Season Reports",
    desc: "Weekly, pre-season, debrief and agronomist-grade PDFs.",
  },
  {
    name: "Voice Logging",
    desc: "Hands-free structured logging from the orchard row.",
  },
  {
    name: "Inferred Logging",
    desc: "Likely actions detected, confirmed with one tap.",
  },
  {
    name: "Staff View",
    desc: "A plain-language day sheet for the crew, one tap to share.",
  },
];

export default function AILayerSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="intelligence"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">TerraMind Intelligence</div>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            A 14-feature AI reasoning layer —{" "}
            <em className="italic text-leaf">not a chatbot</em>
          </h2>
          <p className="mb-6 text-base leading-relaxed text-ink-mute">
            Every AI feature exists because of a TerraMind prediction. The
            discipline is grounding-before-generation: deterministic engines
            find the signal, the AI puts it into words, and a structured
            fallback ships if it can&apos;t. Agentic tool-calling,
            retrieval-augmented answers, self-consistency ensembles on
            high-stakes questions — with you making every call.
          </p>
          <Link
            href="/intelligence"
            className="font-mono text-[12px] uppercase tracking-[0.15em] text-leaf transition-colors hover:text-leaf-deep"
          >
            Explore the intelligence layer →
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border border-line bg-white/60 px-6 py-5 transition-colors hover:border-ink/20 hover:bg-mint"
            >
              <div className="mb-1 text-[15px] font-semibold text-ink">
                {f.name}
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {MORE_FEATURES.map((f) => (
          <div
            key={f.name}
            className="rounded-xl border border-line-soft bg-white/40 px-5 py-4"
          >
            <div className="mb-0.5 text-[13px] font-semibold text-ink">
              {f.name}
            </div>
            <p className="text-[13px] leading-relaxed text-ink-mute">
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
