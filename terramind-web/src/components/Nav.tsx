"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useScrolled } from "@/hooks/useScrolled";

const NAV_LINKS = [
  { href: "#what", label: "Platform" },
  { href: "#who", label: "Who it's for" },
  { href: "#vision", label: "Vision" },
];

export default function Nav() {
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const mediaQuery = window.matchMedia("(min-width: 721px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    mediaQuery.addEventListener("change", closeOnDesktop);
    return () => mediaQuery.removeEventListener("change", closeOnDesktop);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        id="topnav"
        className={`${scrolled ? "scrolled" : ""}${menuOpen ? " menu-open" : ""}`}
      >
        <div className="nav-inner">
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <a href="#" className="brand" aria-label="TerraMind home" onClick={closeMenu}>
            <Image
              src="/logo-icon.png"
              alt="TerraMind"
              width={36}
              height={30}
              className="brand-mark"
              priority
            />
            <span className="brand-name">TerraMind</span>
          </a>
          <div className="nav-links">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="nav-cta">
              Talk to us
            </a>
          </div>
        </div>
      </nav>
      <div
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className="mobile-menu-panel">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </a>
          ))}
          <a href="#contact" className="mobile-menu-cta" onClick={closeMenu}>
            Talk to us
          </a>
        </div>
      </div>
    </>
  );
}
