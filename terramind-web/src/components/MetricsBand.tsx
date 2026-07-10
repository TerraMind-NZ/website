"use client";

import { useReveal } from "@/hooks/useReveal";

const METRICS = [
  { value: "94%", label: "Frost nights caught" },
  { value: "r = 0.87", label: "Irrigation accuracy · 6 NZ regions" },
  { value: "7 · 13", label: "Crops · regions, NZ-wide" },
  { value: "±2 days", label: "Harvest-timing accuracy" },
];

export default function MetricsBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="calibration"
      ref={ref}
      className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
    >
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <div className="eyebrow mb-8">Calibration as brand</div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            Published accuracy.
            <br />
            Every prediction.
          </h2>
          <p className="text-base leading-relaxed text-ink-mute">
            When TerraMind says 30%, it happens about 30% of the time — and we
            publish the reliability data to prove it. Calibrated probabilities
            are trust infrastructure, not a footnote: the foundation growers,
            lenders and insurers can build decisions on.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl border border-line bg-paper p-6"
            >
              <div className="mb-1 font-mono text-[28px] font-bold tracking-tight text-ink tabular-nums">
                {m.value}
              </div>
              <div className="font-mono text-[11px] uppercase leading-snug tracking-[0.12em] text-ink-mute">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
