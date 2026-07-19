"use client";

import Link from "next/link";
import { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import FeaturePills from "@/components/FeaturePills";

const FEATURES = [
  {
    name: "AI Season Planner",
    desc: "A prediction-driven calendar. Spray, irrigation, frost, harvest and more — scheduled, then rescheduled the moment the forecast shifts.",
  },
  {
    name: "Insights Feed",
    desc: "Every night, TerraMind reads each block's trajectory and gathers what builds too slowly to trip an alarm — drifts, accumulating pressure, quiet anomalies — waiting in-app by morning.",
  },
  {
    name: "AI Alerts",
    desc: "The urgent calls, pushed to your phone. When the reasoning layer flags something critical, it reaches you by SMS and email — no thresholds to configure, deduped and rate-limited so one threat never pages you twice.",
  },
  {
    name: "Ask TerraMind",
    desc: "An agentic assistant grounded in your blocks, your history, your numbers — down to actual costs synced from Xero. A bounded tool-calling loop that retrieves, reasons and runs what-ifs, powerful enough to act — disciplined enough to never act without you.",
  },
];

const MORE_FEATURES = [
  {
    name: "Daily Briefing",
    desc: "Each morning's decisions, ranked by economic impact.",
  },
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
    name: "Decision Optimisation",
    desc: "A lever sweep — in-chat or overnight — ranking frost, irrigation and harvest actions by dollar outcome. Scenario search, never a forecast.",
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
  {
    name: "Analysis Carousel",
    desc: "Nightly critical, watch and good items drive the dashboard's Today's Priority banner.",
  },
  {
    name: "Ledger Analysis",
    desc: "Ask reads your synced Xero ledger — summaries, P&L and period comparisons, orchard-scoped.",
  },
  {
    name: "Account Mapping",
    desc: "Suggests fixes for unmapped Xero codes so cost overlays ground on real spend.",
  },
  {
    name: "Conversation Memory",
    desc: "Ask remembers your operation across sessions — “as you mentioned last week.”",
  },
  {
    name: "Grower-Learning Synthesis",
    desc: "Proposes durable profile facts from the day's activity, always yours to confirm.",
  },
  {
    name: "Chart Readings",
    desc: "Expand any chart for a grounded, cached read of what it shows and why.",
  },
  {
    name: "Season-State Summary",
    desc: "A weekly on-screen read of where each block sits in its season.",
  },
  {
    name: "SMS & WhatsApp",
    desc: "The full agent, reachable from any phone — identity-gated and keyword-routed.",
  },
  {
    name: "Reliability Hardening",
    desc: "An audited layer beneath all 23 features — every answer budgeted, validated and safe against bad input.",
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
      <div className="mb-14 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-20">
        <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          A 23-feature AI reasoning layer —{" "}
          <em className="shimmer-text on-light italic">built for horticulture</em>
        </h2>
        <div>
          <p className="mb-6 text-base leading-relaxed text-ink-mute">
            Every AI feature exists because of a TerraMind prediction. The
            discipline is grounding-before-generation: deterministic engines
            find the signal, the AI puts it into words, and a structured
            fallback ships if it can&apos;t. Agentic tool-calling,
            retrieval-augmented answers, cross-checked responses on
            high-stakes questions — all sitting on an audited
            reliability layer, with you making every call.
          </p>
          <Link
            href="/intelligence"
            className="link-arrow font-mono text-[12px] uppercase tracking-[0.15em] text-leaf transition-colors hover:text-leaf-deep"
          >
            Explore the intelligence layer <span className="arrow">→</span>
          </Link>
        </div>
      </div>
      <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            style={{ "--d": i } as CSSProperties}
            className="card-lift rounded-xl border border-line bg-white/60 px-6 py-5"
          >
            <div className="mb-1 text-[15px] font-semibold text-ink">
              {f.name}
            </div>
            <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
          </div>
        ))}
        <div
          style={{ "--d": FEATURES.length } as CSSProperties}
          className="sm:col-span-2"
        >
          <FeaturePills label="The rest of the layer" items={MORE_FEATURES} />
        </div>
      </div>
    </section>
  );
}
