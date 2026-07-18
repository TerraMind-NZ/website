"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CalEmbed from "./CalEmbed";

export default function BookingCTA() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const portalRoot = typeof document === "undefined" ? null : document.body;

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", closeOnEscape);
    closeRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <div className="booking-cta-wrap booking-cta-wrap--inline flex flex-col items-center justify-center">
        <div className="booking-cta group">
          <button
            type="button"
            aria-label="Book a call with TerraMind"
            aria-haspopup="dialog"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen(true);
            }}
            className="booking-cta__primary cursor-pointer"
          >
            <span className="text-center">
              <span className="block text-[19px] font-semibold text-white">
                Book a call
              </span>
              <span className="block text-[12px] uppercase tracking-[0.16em] text-white/55">
                30 min · pilot season
              </span>
            </span>
            <span className="booking-cta__arrow" aria-hidden="true">
              ↗
            </span>
          </button>
          <a
            href="mailto:partners@terramind.co.nz"
            className="booking-cta__email"
          >
            <span>Prefer email?</span>
            <span>partners@terramind.co.nz</span>
          </a>
        </div>
      </div>

      {portalRoot &&
        createPortal(
          <div
            className={`booking-modal-backdrop${open ? " is-open" : ""}`}
            role="presentation"
            aria-hidden={!open}
            inert={!open}
            onMouseDown={(event) => {
              if (event.currentTarget === event.target) setOpen(false);
            }}
          >
            <div
              className="booking-modal-panel"
              role="dialog"
              aria-modal="true"
              aria-label="Book a call"
            >
              <button
                ref={closeRef}
                type="button"
                aria-label="Close booking dialog"
                onClick={() => setOpen(false)}
                className="booking-modal-close cursor-pointer"
                tabIndex={open ? 0 : -1}
              >
                ×
              </button>
              <div className="booking-modal-intro">
                <p className="booking-modal-eyebrow">PILOT SEASON</p>
                <h2 className="booking-modal-title">Book a call</h2>
                <p className="booking-modal-copy">
                  Thirty minutes with the people building it. We&apos;ll
                  discuss your blocks, your risks, and what the pilot would
                  look like on your operation. No deck, no pressure — pick a
                  time below.
                </p>
              </div>
              <div className="booking-modal-calendar">
                <CalEmbed />
              </div>
            </div>
          </div>,
          portalRoot,
        )}
    </>
  );
}
