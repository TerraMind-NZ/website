"use client";

import { useReveal } from "@/hooks/useReveal";

export default function StatementBand() {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      className="reveal relative overflow-hidden bg-chrome px-6 py-28 text-center md:px-10"
    >
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="relative z-1 mx-auto max-w-3xl">
        <h2 className="mb-5 font-serif text-[clamp(32px,4.5vw,56px)] font-semibold leading-tight tracking-tight text-white">
          Not a weather app.
          <br />A <em className="italic text-accent">decision-economics</em>{" "}
          platform.
        </h2>
        <p className="text-[17px] leading-relaxed text-white/65">
          Every TerraMind prediction is a calibrated probability distribution —
          and a finance layer prices each one into action, in dollars, per
          block. Forecasts you can take to the bank, literally.
        </p>
      </div>
    </section>
  );
}
