"use client";

import Link from "next/link";
import SectionArt from "@/components/SectionArt";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-chrome-deep px-6 pb-10 pt-18 md:px-10">
      <SectionArt seed={4} />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 120% at 15% 0%, rgba(15,122,65,0.22) 0%, rgba(15,122,65,0) 55%), radial-gradient(ellipse 70% 90% at 85% 100%, rgba(27,42,34,0.9) 0%, rgba(27,42,34,0) 60%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="relative mx-auto mb-12 grid max-w-[1100px] grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-2 text-base font-bold tracking-tight text-white">
            TerraMind<span className="text-accent">.</span>
          </div>
          <div className="font-mono text-xs tracking-wider text-white/70">
            Christchurch · New Zealand
          </div>
          <p className="mt-5 max-w-60 text-sm leading-relaxed text-white/75">
            Horticulture&apos;s weather-exposed economics, finally met with calibrated intelligence.
          </p>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
            Platform
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <Link href="/#platform" className="text-white/75 transition-colors hover:text-white">
                Frost
              </Link>
            </li>
            <li>
              <Link href="/#platform" className="text-white/75 transition-colors hover:text-white">
                Water &amp; Irrigation
              </Link>
            </li>
            <li>
              <Link href="/#platform" className="text-white/75 transition-colors hover:text-white">
                Disease Risk
              </Link>
            </li>
            <li>
              <Link href="/#platform" className="text-white/75 transition-colors hover:text-white">
                Soil Scouter
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
            Company
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <Link href="/#intelligence" className="text-white/75 transition-colors hover:text-white">
                Intelligence
              </Link>
            </li>
            <li>
              <Link href="/#calibration" className="text-white/75 transition-colors hover:text-white">
                Calibration
              </Link>
            </li>
            <li>
              <Link
                href="/work-with-us"
                className="text-white/75 transition-colors hover:text-white"
              >
                Work with us
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/55">
            Legal
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <Link href="/privacy" className="text-white/75 transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/75 transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/grower-data-sovereignty"
                className="text-white/75 transition-colors hover:text-white"
              >
                Grower Data Sovereignty
              </Link>
            </li>
            <li>
              <Link
                href="/financial-disclaimer"
                className="text-white/75 transition-colors hover:text-white"
              >
                Financial Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative mx-auto flex max-w-[1100px] flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 TerraMind Ltd. All rights reserved.</span>
        <div className="flex items-center gap-5">
          <a
            href="mailto:support@terramind.co.nz"
            className="transition-colors hover:text-white"
          >
            support@terramind.co.nz
          </a>
          <a
            href="https://www.linkedin.com/company/terramindnz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TerraMind on LinkedIn"
            className="transition-colors hover:text-white"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
