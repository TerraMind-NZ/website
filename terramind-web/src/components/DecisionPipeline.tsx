"use client";

import { useReveal } from "@/hooks/useReveal";
import ChainSteps from "@/components/ChainSteps";

const STEPS = [
  {
    n: "01",
    name: "Predict",
    desc: "A 1000-sample Monte Carlo engine fuses physics models with machine learning across every block — emitting calibrated probability distributions, not point guesses. Deterministic, auditable, millisecond-fast.",
  },
  {
    n: "02",
    name: "Price",
    desc: "The AI-powered finance layer converts each probability into expected value — dollars per block, per decision — in the language growers, lenders and insurers actually use.",
  },
  {
    n: "03",
    name: "Decide",
    desc: "Expected-value thresholds and three-tier decision confidence turn priced risk into a clear call: protect or don't, irrigate or wait — AI reasoning shown, drivers attributed.",
  },
  {
    n: "04",
    name: "Learn",
    desc: "Every confirmed outcome banks a dollar-valued decision win, builds the block's track record, and retrains the prediction engine and AI models. Intelligence that compounds, season over season.",
  },
];

export default function DecisionPipeline() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="pipeline"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">How TerraMind thinks</div>
      <h2 className="mb-14 max-w-2xl font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
        From probability{" "}
        <em className="italic text-leaf">to decision</em>
      </h2>
      <ChainSteps steps={STEPS} />
    </section>
  );
}
