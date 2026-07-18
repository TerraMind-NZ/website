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
    stat: "r = 0.81",
    statLabel: "vs ERA5-Land · 6 regions",
    impact:
      "Water is the next-biggest input cost after frost protection — and over- or under-watering both cost real money.",
    accuracy:
      "The production two-layer FAO-56 balance tracks independent ERA5-Land reanalysis at root-zone r = 0.805 and topsoil r = 0.872 across 6 NZ regions × 5 summers, direction right on 74% of meaningful days, bounded by real S-Map soil data.",
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
      "Day-ahead forecasts catch 97% of damaging-wind days at a 50 km/h watch trigger; gust forecast RMSE 10.4 km/h. A day's warning to deploy protection or bring a pick forward. Gusts are spiky, so hour-exact recall is 50% — but damage is a day-level event, and at the day level a watch trigger catches 97%.",
  },
  {
    name: "Spray window",
    stat: "96.7%",
    statLabel: "of promised windows stay rain-free",
    impact:
      "A mistimed spray is wasted product, a re-spray cost, and — for agrichemicals — a compliance and residue risk. The value of the surface is the reliability of its promise that a window stays sprayable.",
    accuracy:
      "Of 335 windows the production model promised across 6 NZ regions × 2 spring seasons, 100% still met the wind, gust and temperature rules in truth and 96.7% stayed genuinely rain-free — the ~3% gap is honest 1-day rain-forecast uncertainty, not model error. It is also highly selective: 335 windows from 13,576 naive dry-daylight hours (2.5%).",
  },
  {
    name: "Harvest & phenology",
    stat: "±2 days",
    statLabel: "harvest-timing accuracy",
    impact:
      "A wrong harvest date mis-books labour, packhouse slots and market windows — costs that land whether or not the fruit is perfect.",
    accuracy:
      "Growing-degree-day projections from forecast temperature track days-to-target within ±2 days (7.1% cumulative-season error). A separate leave-one-year-out backtest over 6 regions × 10 seasons lands within a 3.5-day median error at 30 days out, with 95% interval coverage.",
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

const HAZARD_SURFACES = [
  {
    name: "Hail",
    stat: "~25×",
    statLabel: "better than chance at flagging hail days",
    impact:
      "Hail can wipe out a season's fruit in minutes — and no forecast anywhere can call it block by block. Knowing when the atmosphere is primed is the edge that matters.",
    accuracy:
      "Machine-learned models read the convective environment (CAPE, lifted index) up to 7 days out, beating the raw forecast at every lead across a 58,526-row corpus spanning 13 regions. On the days it flags, real convective events occur ~25× more often than chance — with fully calibrated probabilities (Brier 0.0095, ECE 0.008).",
  },
  {
    name: "Sunburn",
    stat: "37%",
    statLabel: "sharper heat forecast than raw",
    impact:
      "Radiative heat scalds fruit surfaces on clear, still, high-sun days — a quality downgrade waiting at the packhouse.",
    accuracy:
      "A fruit-surface-temperature model — air temperature plus radiation, attenuated by wind — predicted up to 7 days out. Beats the raw forecast at every lead (1.66 vs 2.62 °C at 24 h) with calibrated probabilities (Brier 0.0103), so a high-risk day is flagged days before the sun does the damage.",
  },
  {
    name: "Splitting rain",
    stat: "40%",
    statLabel: "sharper than climatology",
    impact:
      "Rain on ripe fruit splits it — a direct loss landing in the narrow pre-harvest window when the crop's value is highest.",
    accuracy:
      "Probability of a ≥5 mm rain day, targeted to each crop's ripeness window and built on rain-specific statistics rather than one-size-fits-all assumptions. Trained on a 58,591-row corpus with probabilities 40% sharper than climatology (Brier 0.098 vs 0.165) and the full catch/false-alarm curve published — and it's the second surface with decision economics: rain covers, calcium spray and helicopter drying are priced against the revenue actually at risk, so your own costs pick the operating point.",
  },
  {
    name: "Fire weather",
    stat: "31%",
    statLabel: "sharper index than raw forecast",
    impact:
      "Severe fire-weather days threaten shelterbelts, structures and crews — and govern when hot work can safely happen.",
    accuracy:
      "The Fosberg fire-weather index, bias-corrected per lead and tuned to what actually counts as severe in New Zealand's maritime climate. Beats the raw forecast at every lead (RMSE 4.2 vs 6.1 at 24 h) and climatology on calibration (Brier 0.0269 vs 0.0316).",
  },
  {
    name: "Crew heat safety",
    stat: "90%",
    statLabel: "heat-stress days caught",
    impact:
      "Heat stress is a worker-safety risk with real liability — and a missed heat day costs far more than a cautious one.",
    accuracy:
      "A wet-bulb-globe heat-stress index, bias-corrected per lead and alarmed at the same economic operating point as frost — because a missed day risks a worker. Catches 90% of heat-stress days at a 5.8% false-alarm rate, calibrated to ECE 0.0035.",
  },
  {
    name: "Seasonal dryness",
    stat: "41 yrs",
    statLabel: "of rainfall history behind every read",
    impact:
      "Whether the season ahead tilts wet or dry shapes water budgets, storage decisions and cashflow — months before any daily forecast can help.",
    accuracy:
      "41 years of rainfall history, cut by El Niño / La Niña state, gives every region its own season-ahead tilt. The current El Niño reads the classic east/west split — Hawke's Bay tilting dry, the West Coast wet — clearly presented as historical odds, so it informs planning without pretending to be a daily forecast.",
  },
  {
    name: "Field access",
    stat: "5-day",
    statLabel: "soil-memory trafficability model",
    impact:
      "Can machinery get on the block without bogging or rutting? A go/no-go that governs spraying, mowing and harvest logistics.",
    accuracy:
      "A transparent agronomic model: five days of decaying rain accumulation weighed against the block's own soil drainage class from S-Map, with Monte Carlo over measured rain-forecast error. Every input is inspectable — a grower can see exactly why the model says wait.",
  },
];

const ENGINE = [
  { value: "1,000", label: "Monte Carlo samples per prediction" },
  { value: "~1.5 ms", label: "Per full simulation" },
  { value: "Bit-identical", label: "Same seed, same result — auditable" },
  { value: "OOD-guarded", label: "Refuses to extrapolate beyond NZ" },
  { value: "1.075 °C", label: "Forecast meta-model MAE · 13 regions" },
  { value: "24,217", label: "Frost nights benchmarked · 20 NZ sites" },
  { value: "1,818", label: "Tests passing" },
  { value: "×18", label: "Surfaces green on the calibration gate" },
  { value: "7 · 13", label: "Crops · NZ regions modelled at equal depth" },
];

const NOT_CLAIMED = [
  "Our disease classifiers (AUC 0.91–0.98) faithfully reproduce published agronomic risk formulas — that is reproduction fidelity, not field-validated infection prediction. Real validation lands as grower-confirmed outcomes accumulate.",
  "Yield-from-satellite (NDVI) is not field-validated for any crop yet. Five of seven crop models are flagged as self-referential in their own metadata — in capitals. Tested honestly against 658 real Sentinel-2 observations, the trajectory lands at climatology (MAE 0.066 vs 0.068) — no added skill yet on two blocks.",
  "A runoff model scoring a 92% improvement sits unshipped in our codebase, held at deployable:false — it learned to mimic physics labels, so the score isn't real-world skill. We'd rather hold it back than dress it up.",
  "No named-competitor benchmark yet. When we publish one, it will be run the same way as everything on this page: real data, stated provenance.",
];

export default function ProofSections() {
  const heroRef = useReveal<HTMLElement>();
  const surfacesRef = useReveal<HTMLElement>();
  const hazardRef = useReveal<HTMLElement>();
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
        ref={hazardRef}
        className="reveal border-t border-line bg-paper-2 px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="eyebrow mb-5">Hazard &amp; summer-risk pack</div>
          <h2 className="mb-4.5 max-w-3xl font-serif text-[clamp(26px,3.2vw,40px)] font-semibold leading-[1.1] tracking-tight text-ink">
            Seven more surfaces,{" "}
            <em className="italic text-leaf">
              covering the risks summer brings
            </em>
          </h2>
          <p className="mb-12 max-w-2xl text-base leading-relaxed text-ink-mute">
            Hail, sunburn, splitting rain, fire weather, crew heat safety,
            seasonal dryness and field access — the perils that arrive with
            heat, ripe fruit and harvest machinery. Each one beats the raw
            forecast or climatology on held-out data, and each card states
            exactly what was measured.
          </p>
          <SurfaceBrowser surfaces={HAZARD_SURFACES} />
        </div>
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
          <div className="stagger grid grid-cols-3 gap-4">
            {ENGINE.map((e, i) => (
              <div
                key={e.label}
                style={{ "--d": i } as CSSProperties}
                className="card-lift-dark rounded-xl border border-white/12 bg-white/4 p-3.5 sm:p-5"
              >
                <div className="mb-1 break-words font-mono text-[14px] font-bold tracking-tight text-white tabular-nums sm:text-[20px]">
                  <CountUp value={e.value} />
                </div>
                <div className="break-words font-mono text-[9px] uppercase leading-snug tracking-normal text-white/60 sm:text-[10px] sm:tracking-[0.12em]">
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
