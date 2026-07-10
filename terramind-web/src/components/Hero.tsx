"use client";

import HeroCanvas from "./HeroCanvas";
import { useModal } from "./ModalProvider";

export default function Hero() {
  const { openModal } = useModal();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-chrome-deep px-6 pb-20 pt-30 text-center md:px-10">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(4,10,7,0.45) 0%, rgba(4,10,7,0) 100%), linear-gradient(to bottom, rgba(4,10,7,0.55) 0%, rgba(4,10,7,0) 28%, rgba(4,10,7,0) 72%, rgba(4,10,7,0.55) 100%)",
        }}
      />
      <div className="relative z-2 max-w-3xl">
        <h1 className="mb-6 font-serif text-[clamp(42px,6vw,78px)] font-semibold leading-[1.05] tracking-tight text-white">
          Every forecast
          <br />a <em className="font-serif italic text-accent">dollar decision</em>
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/70">
          TerraMind&apos;s prediction engine turns calibrated weather and
          agronomic probabilities into block-level, dollar-denominated
          decisions — with an AI reasoning layer that plans your season,
          briefs your mornings, and learns every block.
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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5.5 py-3.5 text-sm text-white transition-colors hover:border-white/60"
          >
            See the platform →
          </a>
        </div>
        <div className="mx-auto mt-12 flex max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
          <span>94% frost nights caught</span>
          <span className="text-white/25">·</span>
          <span>r = 0.87 irrigation</span>
          <span className="text-white/25">·</span>
          <span>±2-day harvest timing</span>
          <span className="text-white/25">·</span>
          <span>ECE 0.007 calibration</span>
        </div>
      </div>
    </section>
  );
}
