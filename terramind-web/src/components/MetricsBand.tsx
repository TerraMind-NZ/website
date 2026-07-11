"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import CountUp from "@/components/CountUp";

const METRICS = [
  { value: "94%", label: "Frost nights caught" },
  { value: "15–18%", label: "Sharper than the public forecast" },
  { value: "0.007", label: "Expected calibration error" },
  { value: "r = 0.87", label: "Irrigation accuracy · 6 NZ regions" },
  { value: "97%", label: "Damaging-wind days caught" },
  { value: "92%", label: "Pollination-window accuracy" },
  { value: "±2 days", label: "Harvest-timing accuracy" },
  { value: "1,270", label: "Tests passing · gate green ×18" },
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
          <p className="mb-6 text-base leading-relaxed text-ink-mute">
            When TerraMind says 30%, it happens about 30% of the time — and we
            publish the reliability data to prove it. Every surface ships with
            a measured accuracy stat on real New Zealand data. Calibrated
            probabilities are trust infrastructure: the foundation growers,
            lenders and insurers can build decisions on.
          </p>
          <Link
            href="/proof"
            className="link-arrow font-mono text-[12px] uppercase tracking-[0.15em] text-leaf transition-colors hover:text-leaf-deep"
          >
            See the full proof <span className="arrow">→</span>
          </Link>
        </div>
        <div className="stagger grid grid-cols-2 gap-4">
          {METRICS.map((m, i) => (
            <div
              key={m.label}
              style={{ "--d": i } as CSSProperties}
              className="card-lift rounded-xl border border-line bg-paper p-6"
            >
              <div className="mb-1 font-mono text-[26px] font-bold tracking-tight text-ink tabular-nums">
                <CountUp value={m.value} />
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
