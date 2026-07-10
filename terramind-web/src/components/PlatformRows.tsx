"use client";

import { useReveal } from "@/hooks/useReveal";

const PRODUCTS = [
  {
    name: "Frost",
    tag: "Flagship · 94% of frost nights",
    desc: "Catches 94% of frost nights. Block-level frost probability converted to expected-value thresholds — protect or don't, priced against crop-loss risk. Not a temperature chart, a decision engine.",
  },
  {
    name: "Water & Irrigation",
    tag: "r = 0.87 · Validated in 6 NZ regions",
    desc: "FAO-56 evapotranspiration bounded by real S-Map soil data. Deficit trajectory validated across six New Zealand regions (r = 0.87) — irrigation scheduled when your soil actually needs it.",
  },
  {
    name: "Disease Risk",
    tag: "Psa · Published models",
    desc: "Published Plant & Food Research disease models combined with ensemble weather, producing block-level infection-risk curves growers and industry can interrogate.",
  },
  {
    name: "Harvest & Phenology",
    tag: "±2-day harvest timing",
    desc: "Growing-degree-day projections anchored to observed heat accumulation. Harvest windows accurate to ±2 days — labour, packhouse slots, and market timing planned from evidence.",
  },
  {
    name: "Pollination & Wind",
    tag: "92% bloom · 97% wind days",
    desc: "Bee-flyable-hour forecasts (92% accuracy) for bloom and day-ahead warnings that catch 97% of damaging-wind days — notice enough to supplement hives or bring a pick forward.",
  },
  {
    name: "Soil Scouter",
    tag: "Hardware · Ground truth",
    desc: "Proprietary in-field soil moisture and temperature sensing feeding the prediction engine with block-level ground truth — closing the loop between forecast and soil reality.",
  },
];

export default function PlatformRows() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="platform"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">The platform</div>
      {PRODUCTS.map((p, i) => (
        <div
          key={p.name}
          className={`grid cursor-default grid-cols-1 items-start gap-4 border-t border-line py-10 transition-colors hover:bg-leaf/4 md:grid-cols-2 md:gap-0 ${
            i === PRODUCTS.length - 1 ? "border-b" : ""
          }`}
        >
          <div className="flex items-start gap-5 md:pr-15">
            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent-strong" />
            <div>
              <div className="mb-1.5 text-[22px] font-semibold tracking-tight text-ink">
                {p.name}
              </div>
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-leaf">
                {p.tag}
              </div>
            </div>
          </div>
          <p className="pl-7 text-[15px] leading-relaxed text-ink-mute">
            {p.desc}
          </p>
        </div>
      ))}
    </section>
  );
}
