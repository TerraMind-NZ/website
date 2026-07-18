"use client";

import { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";

const CARDS = [
  {
    title: "Pilot growers wanted",
    body: "We're recruiting farmers for our pilot season. Run TerraMind on your blocks, shape the product, and get the platform at pilot terms.",
  },
  {
    title: "Your blocks, your data",
    body: "Block-level predictions calibrated to your orchard from day one — and every byte of your data stays yours, under grower data sovereignty.",
  },
  {
    title: "Direct line to the builders",
    body: "Pilot growers work directly with the team building the engine. What you need next season is what we build next sprint.",
  },
];

export default function PilotCards() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal mx-auto max-w-[1100px]"
    >
      <div className="stagger grid grid-cols-1 gap-4 lg:grid-cols-3">
        {CARDS.map((c, i) => (
          <div
            key={c.title}
            style={{ "--d": i } as CSSProperties}
            className="card-lift-dark group h-full rounded-xl border border-white/12 bg-white/4 p-7 text-center"
          >
            <div className="mx-auto mb-4 h-px w-6 bg-accent/40 transition-all duration-300 group-hover:w-12 group-hover:bg-accent/80" />
            <div className="mb-3 font-serif text-xl font-semibold tracking-tight text-white">
              {c.title}
            </div>
            <p className="text-sm leading-relaxed text-white/70">{c.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
