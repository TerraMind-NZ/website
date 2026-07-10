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
            className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5.5 py-3.5 text-sm text-white transition-colors hover:border-white/60"
          >
            See the platform →
          </a>
        </div>
      </div>
    </section>
  );
}
