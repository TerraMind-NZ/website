"use client";

import { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import SectionArt from "@/components/SectionArt";

const SEASONS = [
  {
    label: "Season one",
    title: "It learns your land",
    desc: "Every confirmed frost call, every irrigation, every harvest teaches TerraMind how each block actually behaves — where cold air pools, how your soils drain and dry, how heat accumulates row by row.",
  },
  {
    label: "Season two",
    title: "It anticipates you",
    desc: "Briefings arrive tuned to how you farm. Thresholds settle around your risk appetite. The question you were about to ask is already answered, in your numbers, for your blocks.",
  },
  {
    label: "Every season after",
    title: "It compounds",
    desc: "A track record banked in dollars. A memory of every outcome. Models retrained on your ground truth. The intelligence you build never leaves the orchard — it deepens with it.",
  },
];

export default function CompoundingSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 md:px-10"
    >
      <SectionArt seed={3} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 50% 0%, rgba(15,122,65,0.2) 0%, rgba(15,122,65,0) 60%)",
        }}
      />
      <div className="relative z-1 mx-auto max-w-[1100px]">
        <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
          Season over season
        </div>
        <h2 className="mb-5 max-w-3xl font-serif text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-tight text-white">
          The longer you grow with it,{" "}
          <em className="italic text-accent">the better it knows your land</em>
        </h2>
        <p className="mb-14 max-w-2xl text-[17px] leading-relaxed text-white/80">
          Most software is the same on day one thousand as it was on day one.
          TerraMind isn&apos;t. Every season you farm with it, it remembers —
          and what it remembers, it turns into sharper predictions, quieter
          alerts, and advice that sounds less like a tool and more like someone
          who has walked your rows for years.
        </p>
        <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-3">
          {SEASONS.map((s, i) => (
            <div
              key={s.label}
              style={{ "--d": i } as CSSProperties}
              className="card-lift-dark rounded-xl border border-white/12 bg-white/4 p-7"
            >
              <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
                {s.label}
              </div>
              <div className="mb-2 text-[17px] font-semibold tracking-tight text-white">
                {s.title}
              </div>
              <p className="text-sm leading-relaxed text-white/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
