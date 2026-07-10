"use client";

import { useReveal } from "@/hooks/useReveal";
import { useModal } from "./ModalProvider";

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
  const { openModal } = useModal();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome-deep px-6 py-28 md:px-10"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 50% 30%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
        }}
      />
      <div className="relative z-1 mx-auto max-w-[1100px]">
        <div className="mb-12 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          The economics
        </div>
        <h2 className="mb-5 max-w-3xl font-serif text-[clamp(30px,4vw,52px)] font-semibold leading-[1.08] tracking-tight text-white">
          Frost alone is a{" "}
          <em className="italic text-accent">five-figure decision</em> — per
          hectare, per season.
        </h2>
        <p className="mb-14 max-w-2xl text-[17px] leading-relaxed text-white/65">
          Exposure runs to tens of thousands of dollars a hectare. TerraMind
          prices every risk night in dollars and tells you when protection
          pays for itself — before you start the wind machine, not after.
        </p>
        <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FIGURES.map((f) => (
            <div
              key={f.value}
              className="rounded-xl border border-white/12 bg-white/4 p-7"
            >
              <div className="mb-2 font-serif text-[44px] font-semibold leading-none tracking-tight text-white">
                {f.value}
              </div>
              <p className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-white/50">
                {f.label}
              </p>
            </div>
          ))}
        </div>
        <button
          onClick={openModal}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
        >
          Get early access ↗
        </button>
      </div>
    </section>
  );
}
