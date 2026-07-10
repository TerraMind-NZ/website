"use client";

import { useScrolled } from "@/hooks/useScrolled";
import { useModal } from "./ModalProvider";

const LINKS = [
  { href: "#platform", label: "Platform" },
  { href: "#intelligence", label: "Intelligence" },
  { href: "#calibration", label: "Calibration" },
];

export default function Nav() {
  const scrolled = useScrolled(40);
  const { openModal } = useModal();

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-10 md:py-7 ${
        scrolled
          ? "border-b border-line-soft bg-paper/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-[17px] font-bold tracking-tight text-ink">
          TerraMind
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">
          Central Otago · NZ
        </span>
      </div>

      <ul className="hidden items-center gap-8 md:flex">
        {LINKS.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="text-[13px] text-ink-soft transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <button
        onClick={openModal}
        className="group flex cursor-pointer items-center overflow-hidden rounded-full border border-line text-[13px] transition-colors hover:border-ink/30"
      >
        <span className="whitespace-nowrap py-2 pl-5 pr-4 text-ink">
          Request access
        </span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-full bg-leaf text-sm text-white transition-colors group-hover:bg-leaf-deep">
          ↗
        </span>
      </button>
    </nav>
  );
}
