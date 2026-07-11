"use client";

import { CSSProperties } from "react";

export interface ChainStep {
  n: string;
  name: string;
  desc: string;
}

export default function ChainSteps({ steps }: { steps: ChainStep[] }) {
  return (
    <div
      style={{ "--steps": steps.length } as CSSProperties}
      className="pipe relative overflow-hidden rounded-3xl border border-line bg-white/70 shadow-[0_30px_80px_-40px_rgba(10,15,12,0.3)]"
    >
      {/* Glow crown */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 0%, rgba(15,122,65,0.07) 0%, rgba(15,122,65,0) 60%)",
        }}
      />

      {/* Console header */}
      <div className="relative flex items-center justify-between gap-4 border-b border-line-soft px-7 py-4">
        <div className="flex items-center gap-2.5 font-mono text-[10px] uppercase tracking-[0.22em] text-leaf">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent-strong" />
          Decision pipeline — running
        </div>
        <div className="hidden font-mono text-[10px] tracking-[0.18em] text-ink-mute/70 sm:block">
          01 → {steps[steps.length - 1].n} · every block · every day
        </div>
      </div>

      {/* Steps */}
      <div className="relative grid grid-cols-1 lg:grid-cols-[repeat(var(--steps),minmax(0,1fr))]">
        {steps.map((s, i) => (
          <div
            key={s.n}
            style={{ "--i": i } as CSSProperties}
            className="pipe-col relative border-t border-line-soft p-7 first:border-t-0 lg:border-t-0 lg:border-l lg:first:border-l-0"
          >
            <div className="mb-5 flex items-center gap-2.5">
              <span className="pipe-dot h-2 w-2 rounded-full bg-accent-strong" />
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-leaf/80">
                Step {s.n}
              </span>
              <span className="h-px flex-1 bg-line-soft" />
            </div>
            <div className="pipe-title mb-3 font-serif text-[24px] font-semibold leading-tight tracking-tight text-ink">
              {s.name}
            </div>
            <p className="text-[13.5px] leading-relaxed text-ink-mute">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Cycle progress line */}
      <div className="relative h-[3px] w-full bg-ink/8">
        <span aria-hidden className="pipe-progress absolute inset-0" />
      </div>
    </div>
  );
}
