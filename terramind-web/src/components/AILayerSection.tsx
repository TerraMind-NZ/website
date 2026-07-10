"use client";

import { useReveal } from "@/hooks/useReveal";

const FEATURES = [
  {
    name: "AI Season Planner",
    desc: "A prediction-driven calendar. Spray, irrigation, frost and harvest events scheduled — and rescheduled — as forecasts change.",
  },
  {
    name: "Daily Briefing",
    desc: "Each morning's decisions, ranked by economic impact. The five things worth your attention today, and why.",
  },
  {
    name: "Insights Feed",
    desc: "An overnight scan of every block surfaces patterns no single alert would catch — trajectory shifts, accumulating risks, quiet anomalies.",
  },
  {
    name: "Ask TerraMind",
    desc: "Ask anything about your operation. Answers grounded in your blocks, your history, your numbers — never a generic chatbot.",
  },
];

export default function AILayerSection() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      id="intelligence"
      ref={ref}
      className="reveal mx-auto max-w-[1100px] px-6 py-24 md:px-10"
    >
      <div className="eyebrow mb-12">TerraMind Intelligence</div>
      <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2 md:gap-20">
        <div>
          <h2 className="mb-4.5 font-serif text-[clamp(28px,3.5vw,46px)] font-semibold leading-[1.1] tracking-tight text-ink">
            An AI layer that
            <br />
            <em className="italic text-leaf">works your season</em>
          </h2>
          <p className="text-base leading-relaxed text-ink-mute">
            TerraMind doesn&apos;t stop at predicting. It plans your season,
            briefs you each morning, and watches every block overnight —
            reasoning across weather, agronomy and economics so the right
            information surfaces at the right moment. Grounded in your own
            blocks&apos; data, with you making every call.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.name}
              className="rounded-xl border border-line bg-white/60 px-6 py-5 transition-colors hover:border-ink/20 hover:bg-mint"
            >
              <div className="mb-1 text-[15px] font-semibold text-ink">
                {f.name}
              </div>
              <p className="text-sm leading-relaxed text-ink-mute">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
