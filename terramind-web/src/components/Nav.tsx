"use client";

import { useState } from "react";
import Image from "next/image";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-chrome-deep/85 shadow-[0_1px_0_rgba(255,255,255,0.08),0_8px_24px_rgba(10,15,12,0.25)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-6 py-4 md:px-10 md:py-5">
        <a href="#" className="flex items-center gap-2.5">
          <Image
            src="/logo-icon.png"
            alt="TerraMind logo"
            width={28}
            height={28}
            className="h-7 w-7"
            priority
          />
          <span className="text-[17px] font-bold tracking-tight text-white">
            TerraMind
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-[13px] text-white transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            onClick={openModal}
            className="group hidden cursor-pointer items-center overflow-hidden rounded-full border border-white/20 text-[13px] transition-colors hover:border-white/40 sm:flex"
          >
            <span className="whitespace-nowrap py-2 pl-5 pr-4 text-white">
              Request access
            </span>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-full bg-leaf text-sm text-white transition-colors group-hover:bg-leaf-deep">
              ↗
            </span>
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="flex h-10 w-10 cursor-pointer flex-col items-center justify-center gap-[5px] md:hidden"
          >
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${
                menuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-white transition-opacity duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-white transition-transform duration-300 ${
                menuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-[max-height] duration-300 md:hidden ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 pb-6 pt-4">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block py-2.5 text-[15px] text-white transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li className="pt-3 sm:hidden">
            <button
              onClick={() => {
                setMenuOpen(false);
                openModal();
              }}
              className="group flex cursor-pointer items-center overflow-hidden rounded-full border border-white/20 text-[13px]"
            >
              <span className="whitespace-nowrap py-2 pl-5 pr-4 text-white">
                Request access
              </span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-r-full bg-leaf text-sm text-white">
                ↗
              </span>
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
