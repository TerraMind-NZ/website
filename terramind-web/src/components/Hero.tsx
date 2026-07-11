"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-chrome-deep px-6 py-24 text-center md:px-10">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(4,10,7,0.45) 0%, rgba(4,10,7,0) 100%), linear-gradient(to bottom, rgba(4,10,7,0.55) 0%, rgba(4,10,7,0) 28%, rgba(4,10,7,0) 72%, rgba(4,10,7,0.55) 100%)",
        }}
      />
      <div className="relative z-2 max-w-3xl">
        <h1
          className="hero-in mb-6 font-serif text-[clamp(42px,6vw,78px)] font-semibold leading-[1.05] tracking-tight text-white"
          style={{ "--hd": "0.1s" } as CSSProperties}
        >
          Intelligent predictions,
          <br />
          <em className="shimmer-text font-serif italic">informed decisions</em>
        </h1>
        <p
          className="hero-in mx-auto mb-10 max-w-xl text-[17px] leading-relaxed text-white/70"
          style={{ "--hd": "0.3s" } as CSSProperties}
        >
          TerraMind&apos;s prediction engine turns raw atmospheric and field
          data into calibrated weather and agronomic probabilities — then into
          block-level, dollar-denominated decisions. An AI reasoning layer
          plans your season, triages what threatens it, and learns every block
          with compounding seasonal intelligence.
        </p>
        <p
          className="hero-in mx-auto -mt-5 mb-10 whitespace-nowrap font-serif text-[min(16px,calc((100vw-48px)/37.4))] italic leading-snug text-accent"
          style={{ "--hd": "0.45s" } as CSSProperties}
        >
          Horticulture&apos;s weather-exposed economics, finally met with
          calibrated intelligence.
        </p>
        <div
          className="hero-in flex flex-wrap items-center justify-center gap-3.5"
          style={{ "--hd": "0.6s" } as CSSProperties}
        >
          <Link
            href="/work-with-us"
            className="link-arrow inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-6.5 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep hover:shadow-[0_14px_36px_-12px_rgba(67,213,133,0.55)]"
          >
            Work with us <span className="arrow">↗</span>
          </Link>
          <a
            href="#platform"
            className="link-arrow inline-flex items-center gap-2 rounded-full border border-white/30 px-5.5 py-3.5 text-sm text-white transition-all hover:-translate-y-px hover:border-white/60 hover:bg-white/5"
          >
            See the platform <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
