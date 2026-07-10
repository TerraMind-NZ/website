"use client";

import Link from "next/link";
import { useModal } from "./ModalProvider";

export default function Footer() {
  const { openModal } = useModal();

  return (
    <footer className="bg-chrome px-6 pb-10 pt-15 md:px-10">
      <div className="mx-auto mb-12 grid max-w-[1100px] grid-cols-2 gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-12">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-2 text-base font-bold tracking-tight text-white">
            TerraMind
          </div>
          <div className="font-mono text-xs tracking-wider text-white/50">
            Christchurch · New Zealand
          </div>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Platform
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <a href="#platform" className="text-white/60 transition-colors hover:text-white">
                Frost
              </a>
            </li>
            <li>
              <a href="#platform" className="text-white/60 transition-colors hover:text-white">
                Water &amp; Irrigation
              </a>
            </li>
            <li>
              <a href="#platform" className="text-white/60 transition-colors hover:text-white">
                Disease Risk
              </a>
            </li>
            <li>
              <a href="#platform" className="text-white/60 transition-colors hover:text-white">
                Soil Scouter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Company
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <a href="#intelligence" className="text-white/60 transition-colors hover:text-white">
                Intelligence
              </a>
            </li>
            <li>
              <a href="#calibration" className="text-white/60 transition-colors hover:text-white">
                Calibration
              </a>
            </li>
            <li>
              <button
                onClick={openModal}
                className="cursor-pointer text-white/60 transition-colors hover:text-white"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
        <div>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/45">
            Legal
          </div>
          <ul className="flex flex-col gap-2.5 text-[13px]">
            <li>
              <Link href="/privacy" className="text-white/60 transition-colors hover:text-white">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="text-white/60 transition-colors hover:text-white">
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="/grower-data-sovereignty"
                className="text-white/60 transition-colors hover:text-white"
              >
                Grower Data Sovereignty
              </Link>
            </li>
            <li>
              <Link
                href="/financial-disclaimer"
                className="text-white/60 transition-colors hover:text-white"
              >
                Financial Disclaimer
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1100px] items-center justify-between border-t border-white/10 pt-6 text-xs text-white/40">
        <span>© 2026 TerraMind Ltd.</span>
        <span>Central Otago pilot season</span>
      </div>
    </footer>
  );
}
