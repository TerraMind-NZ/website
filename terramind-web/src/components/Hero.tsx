"use client";

import HeroCanvas from "./HeroCanvas";
import { useModal } from "./ModalProvider";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-30 text-center md:px-10">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(243,246,238,0.72) 0%, rgba(243,246,238,0) 100%), linear-gradient(to bottom, rgba(243,246,238,0.6) 0%, rgba(243,246,238,0) 30%, rgba(243,246,238,0) 70%, rgba(243,246,238,0.5) 100%)",
        }}
      />
      <div className="relative z-2 max-w-3xl">
        <div className="mb-7 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          Probabilistic forecasting · Decision economics
        </div>
        <h1 className="mb-6 font-serif text-[clamp(42px,6vw,78px)] font-semibold leading-[1.05] tracking-tight text-ink">
          Every forecast
          <br />a <em className="font-serif italic text-leaf">dollar decision</em>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-ink-mute">
          TerraMind converts weather and agronomic predictions into block-level,
          dollar-denominated recommendations for New Zealand growers — calibrated
          probabilities, not dashboard noise.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3.5">
          <button
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep"
          >
            Get early access ↗
          </button>
          <a
            href="#platform"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5.5 py-3.5 text-sm text-ink-soft transition-colors hover:border-ink/30 hover:text-ink"
          >
            See the platform →
          </a>
        </div>
      </div>
    </section>
  );
}
