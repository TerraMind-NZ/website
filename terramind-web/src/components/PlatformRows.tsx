"use client";

import { CSSProperties } from "react";
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
      className="reveal border-y border-line bg-paper-2 px-6 py-24 md:px-10"
    >
      <div className="mx-auto max-w-[1100px]">
        <div className="eyebrow mb-12">The platform</div>
        <div className="relative pl-7 md:pl-9">
          <span aria-hidden className="scan-beam" />
          <span aria-hidden className="spine-rail" />
          <div className="stagger">
          {PRODUCTS.map((p, i) => (
            <div
              key={p.name}
              style={{ "--d": i, "--i": i } as CSSProperties}
              className="group relative grid cursor-default grid-cols-1 items-start gap-4 py-9 md:grid-cols-[88px_1fr_1.15fr] md:gap-8"
            >
              {/* Spine node — flares as the scan beam passes */}
              <span
                aria-hidden
                className="spine-node top-[46px] -left-7 md:-left-9"
              />
              {/* Hairline draws itself in on reveal */}
              <span
                aria-hidden
                className="row-hairline absolute inset-x-0 top-0 h-px bg-line"
              />
              {i === PRODUCTS.length - 1 && (
                <span
                  aria-hidden
                  className="row-hairline absolute inset-x-0 bottom-0 h-px bg-line"
                />
              )}
              {/* Mint wash sweeps in from the left on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-4 inset-y-2 origin-left scale-x-0 rounded-2xl bg-leaf/6 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 md:-inset-x-6"
              />
              {/* Ghost index numeral */}
              <div
                aria-hidden
                className="pointer-events-none relative hidden select-none font-serif text-[64px] font-semibold leading-none text-leaf/12 transition-colors duration-500 group-hover:text-leaf/25 md:block"
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="relative">
                <div className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1.5">
                  <div
                    style={{ "--i": i } as CSSProperties}
                    className="row-title mask-reveal mb-1.5 font-serif text-[30px] font-semibold leading-tight tracking-tight text-ink"
                  >
                    <span>{p.name}</span>
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-leaf">
                    {p.tag}
                  </div>
                </div>
              </div>
              <p className="relative text-[15px] leading-relaxed text-ink-mute transition-colors duration-300 group-hover:text-ink-soft">
                {p.desc}
              </p>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
