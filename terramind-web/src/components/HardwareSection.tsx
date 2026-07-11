"use client";

import { CSSProperties } from "react";
import { useReveal } from "@/hooks/useReveal";
import FeaturePills from "@/components/FeaturePills";

const FEATURES = [
  {
    name: "Seven parameters, one probe",
    desc: "Volumetric moisture (±2%), soil temperature (±0.5 °C), electrical conductivity, pH and N-P-K from a single RS485 probe at root depth — plus ambient temperature and humidity above the ground.",
  },
  {
    name: "Measured initial conditions",
    desc: "With a reading in the past 24 hours, measured soil moisture replaces the modelled estimate as the irrigation forecast's starting point — cutting the error that accumulates in evapotranspiration estimates.",
  },
  {
    name: "A season on its own power",
    desc: "Solar-assisted lithium cells, a ~20-second wake cycle every 15 minutes, deep sleep in between. Months of unattended operation in an IP65-sealed enclosure — no wiring in the block.",
  },
  {
    name: "WiFi first, LoRa always",
    desc: "Readings post over orchard WiFi; where there's no coverage, LoRaWAN carries them out — a single gateway covers roughly 5 km of open farmland.",
  },
];

const MORE_FEATURES = [
  {
    name: "15-minute cadence",
    desc: "Configurable sampling interval; microamp deep sleep between cycles.",
  },
  {
    name: "Fresh-data priority",
    desc: "Each new reading flags the block so prediction jobs process it first.",
  },
  {
    name: "Deficit detection",
    desc: "48 hours below the irrigation trigger raises an accumulating-risk finding.",
  },
  {
    name: "EC anomaly watch",
    desc: "A simultaneous conductivity rise across 3+ blocks flags agronomist review.",
  },
  {
    name: "Weekly recalibration",
    desc: "Modelled-vs-measured error updates each block's learned irrigation response.",
  },
  {
    name: "Leaf-wetness proxy",
    desc: "Block-level humidity sharpens Psa antecedent modelling beyond regional stations.",
  },
  {
    name: "Soil panel per block",
    desc: "Moisture trend, EC sparkline, NPK and battery, live in the block view.",
  },
  {
    name: "Honest by design",
    desc: "NPK and pH ship marked indicative — lab confirmation advised, never implied.",
  },
];

export default function HardwareSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">Soil Scouter · Hardware, launching soon</div>
      <div className="mb-14 grid grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-20">
        <h2 className="font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
          A soil sensor node in every block —{" "}
          <em className="italic text-leaf">ground truth, live</em>
        </h2>
        <p className="text-base leading-relaxed text-ink-mute">
          TerraMind&apos;s own in-field hardware: a self-contained,
          solar-assisted node with a seven-parameter probe in the root zone,
          reporting every 15 minutes over WiFi or LoRa. Today the engine
          forecasts your soil from weather; Soil Scouter lets it measure it —
          correcting the irrigation model&apos;s starting point, feeding the
          per-block learned models, and providing the real-world labels that
          unlock the deliberately held-back runoff and infiltration ML.
        </p>
      </div>
      <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2">
        {FEATURES.map((f, i) => (
          <div
            key={f.name}
            style={{ "--d": i } as CSSProperties}
            className="card-lift rounded-xl border border-line bg-white/60 px-6 py-5"
          >
            <div className="mb-1 text-[15px] font-semibold text-ink">
              {f.name}
            </div>
            <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
          </div>
        ))}
        <div
          style={{ "--d": FEATURES.length } as CSSProperties}
          className="sm:col-span-2"
        >
          <FeaturePills label="Field notes, in detail" items={MORE_FEATURES} />
        </div>
      </div>
    </section>
  );
}
