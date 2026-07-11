"use client";

import { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import CountUp from "@/components/CountUp";
import SectionArt from "@/components/SectionArt";
import SurfaceBrowser from "@/components/SurfaceBrowser";

const SURFACES = [
  {
    name: "Frost",
    stat: "94%",
    statLabel: "of frost nights caught",
    impact:
      "The average NZ growing location faces 23.4 damaging frost nights a season, with exposure running to tens of thousands of dollars per hectare.",
    accuracy:
      "Catches 94% of frost nights at the economically-correct alarm setting. Production overnight-low forecasts run 15–18% sharper than the public forecast (1.38 °C RMSE at 24 h). Climatology-style tools miss 66% of frost nights.",
  },
  {
    name: "Calibration",
    stat: "0.007",
    statLabel: "expected calibration error",
    impact:
      "Calibrated probabilities are what lenders and insurers can actually price on — trust infrastructure, not a footnote.",
    accuracy:
      "When TerraMind says 30%, it happens about 30% of the time. ECE 0.007, CRPS skill 0.306, and the 90% interval holds about 90% of the time — verified on 2,278 held-out nights.",
  },
  {
    name: "Irrigation",
    stat: "r = 0.87",
    statLabel: "deficit trajectory · 6 regions",
    impact:
      "Water is the next-biggest input cost after frost protection — and over- or under-watering both cost real money.",
    accuracy:
      "Soil-water deficit trajectory validated against independent ERA5-Land reanalysis across six NZ regions: r = 0.87 (0.77–0.94), direction right on 85% of meaningful days, bounded by real S-Map soil data.",
  },
  {
    name: "Pollination",
    stat: "92%",
    statLabel: "flyable-hour accuracy",
    impact:
      "Only 34–45% of bloom-window daylight hours are bee-flyable — and it swings 30% year to year. Poor bloom weather is lost fruit set.",
    accuracy:
      "1-day-ahead bee-flyable-hour forecasts: 92% classification accuracy with 86% recall and precision, measured over 2,544 spring daylight hours.",
  },
  {
    name: "Wind",
    stat: "97%",
    statLabel: "of damaging-wind days caught",
    impact:
      "Damaging gusts drop and scar fruit — roughly 58 damaging-gust days a season for kiwifruit, with peaks over 100 km/h.",
    accuracy:
      "Day-ahead forecasts catch 97% of damaging-wind days at a 50 km/h watch trigger; gust forecast RMSE 10.4 km/h. A day's warning to deploy protection or bring a pick forward.",
  },
  {
    name: "Harvest & phenology",
    stat: "±2 days",
    statLabel: "harvest-timing accuracy",
    impact:
      "A wrong harvest date mis-books labour, packhouse slots and market windows — costs that land whether or not the fruit is perfect.",
    accuracy:
      "Growing-degree-day projections from forecast temperature hit days-to-harvest targets within ±2 days, with 7.1% cumulative-season error.",
  },
  {
    name: "Psa risk",
    stat: "6.6×",
    statLabel: "correct regional separation",
    impact:
      "The bacterial disease behind the 2010–11 outbreak that cost NZ kiwifruit hundreds of millions and forced Gold replanting.",
    accuracy:
      "Built on the published Plant & Food Research risk curve — explainable to growers and industry. It rates the Bay of Plenty (kiwifruit heartland) 6.6× higher-risk than Central Otago: the correct geographic separation.",
  },
];

const ENGINE = [
  { value: "1,000", label: "Monte Carlo samples per prediction" },
  { value: "~1.5 ms", label: "Per full simulation" },
  { value: "Bit-identical", label: "Same seed, same result — auditable" },
  { value: "1,270", label: "Tests passing" },
  { value: "×18", label: "Surfaces green on the calibration gate" },
  { value: "7 · 13", label: "Crops · NZ regions, equal depth" },
];

const NOT_CLAIMED = [
  "Our disease classifiers (AUC 0.91–0.98) faithfully reproduce published agronomic risk formulas — that is reproduction fidelity, not field-validated infection prediction. Real validation lands as grower-confirmed outcomes accumulate.",
  "Yield-from-satellite (NDVI) is not field-validated for any crop yet. Five of seven crop models are flagged as self-referential in their own metadata — in capitals.",
  "A runoff model scoring a 92% improvement sits unshipped in our codebase, held at deployable:false — it learned to mimic physics labels, so the score isn't real-world skill. We'd rather hold it back than dress it up.",
  "No named-competitor benchmark yet. When we publish one, it will be run the same way as everything on this page: real data, stated provenance.",
];

export default function ProofSections() {
  const heroRef = useReveal<HTMLElement>();
  const surfacesRef = useReveal<HTMLElement>();
  const engineRef = useReveal<HTMLElement>();
  const honestyRef = useReveal<HTMLElement>();

  return (
    <>
      <section
        ref={heroRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 pb-24 pt-44 md:px-10"
      >
        <SectionArt seed={7} />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 20%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-8 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
            Proof
          </div>
          <h1 className="mb-6 max-w-3xl font-serif text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] tracking-tight text-white">
            Proof, <em className="italic text-accent">not promises</em>
          </h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-white/80">
            Every TerraMind surface ships with a measured accuracy stat on real
            New Zealand data — benchmarked July 2026, provenance documented,
            caveats stated up front. This page is our technical brief, in the
            open.
          </p>
        </div>
      </section>

      <section
        ref={surfacesRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">Impact + accuracy, per surface</div>
        <SurfaceBrowser surfaces={SURFACES} />
      </section>

      <section
        ref={engineRef}
        className="reveal relative overflow-hidden bg-chrome-deep px-6 py-24 md:px-10"
      >
        <SectionArt seed={10} />
        <div
          className="glow-breathe pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 80% at 50% 25%, rgba(15,122,65,0.2) 0%, rgba(15,122,65,0) 60%)",
          }}
        />
        <div className="relative z-1 mx-auto max-w-[1100px]">
          <div className="mb-12 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            The engine underneath
          </div>
          <div className="stagger grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {ENGINE.map((e, i) => (
              <div
                key={e.label}
                style={{ "--d": i } as CSSProperties}
                className="card-lift-dark rounded-xl border border-white/12 bg-white/4 p-5"
              >
                <div className="mb-1 font-mono text-[20px] font-bold tracking-tight text-white tabular-nums">
                  <CountUp value={e.value} />
                </div>
                <div className="font-mono text-[10px] uppercase leading-snug tracking-[0.12em] text-white/60">
                  {e.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        ref={honestyRef}
        className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
      >
        <div className="eyebrow mb-12">What we don&apos;t claim (yet)</div>
        <h2 className="mb-4.5 max-w-3xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          Numbers you can trust exist only where a company says{" "}
          <em className="italic text-leaf">what it can&apos;t claim</em>
        </h2>
        <p className="mb-14 max-w-2xl text-base leading-relaxed text-ink-mute">
          Everything above is measured against real, independent data. A few
          things aren&apos;t provable yet — and rather than blur the line, we
          publish it. This discipline is the product.
        </p>
        <ul className="stagger grid grid-cols-1 gap-4 md:grid-cols-2">
          {NOT_CLAIMED.map((item, i) => (
            <li
              key={item}
              style={{ "--d": i } as CSSProperties}
              className="claim-item card-lift rounded-xl border border-line bg-white/60 px-6 py-5"
            >
              <div className="mb-2.5 flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-leaf">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="row-hairline h-px flex-1 bg-line"
                  style={{ "--d": i } as CSSProperties}
                />
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{item}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
