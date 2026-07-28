"use client";

import { CSSProperties } from "react";
import Link from "next/link";
import HeroCanvas from "./HeroCanvas";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-chrome-deep px-6 py-24 text-center md:px-10">
      <HeroCanvas />
      <div
        className="pointer-events-none absolute inset-0 z-1"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(4,10,7,0.45) 0%, rgba(4,10,7,0) 100%), linear-gradient(to bottom, rgba(4,10,7,0.55) 0%, rgba(4,10,7,0) 28%, rgba(4,10,7,0) 72%, rgba(4,10,7,0.55) 100%)",
        }}
      />
      <div className="relative z-2 w-full max-w-[1120px]">
        <div
          className="hero-in mb-8 flex justify-center"
          style={{ "--hd": "0s" } as CSSProperties}
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-accent backdrop-blur-sm">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-accent" />
            Launching soon · Recruiting pilot growers
          </span>
        </div>
        <h1
          className="hero-in mb-8 font-serif text-[clamp(42px,6.4vw,84px)] font-semibold leading-[0.96] tracking-tight text-white"
          style={{ "--hd": "0.1s" } as CSSProperties}
        >
          <span className="inline-block">Intelligent predictions,</span>
          <br />
          <em className="shimmer-text inline-block font-serif italic">
            informed decisions
          </em>
        </h1>
        <p
          className="hero-in mx-auto mb-11 max-w-[900px] font-serif text-[clamp(15px,1.5vw,18px)] italic leading-relaxed text-accent"
          style={{ "--hd": "0.3s" } as CSSProperties}
        >
          Horticulture&apos;s weather-exposed economics, finally met with
          calibrated intelligence.
        </p>
        <div
          className="hero-in flex flex-wrap items-center justify-center gap-3.5"
          style={{ "--hd": "0.45s" } as CSSProperties}
        >
          <Link
            href="/work-with-us"
            className="link-arrow inline-flex cursor-pointer items-center gap-2 rounded-full bg-leaf px-7 py-4 text-[15px] font-semibold text-white transition-all hover:-translate-y-px hover:bg-leaf-deep hover:shadow-[0_14px_36px_-12px_rgba(67,213,133,0.55)]"
          >
            Work with us <span className="arrow">↗</span>
          </Link>
          <a
            href="#problem"
            className="link-arrow inline-flex items-center gap-2 rounded-full border border-white/30 px-6.5 py-4 text-[15px] text-white transition-all hover:-translate-y-px hover:border-white/60 hover:bg-white/5"
          >
            See how it works <span className="arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
