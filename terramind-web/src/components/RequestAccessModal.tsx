"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "./ModalProvider";

const CHIPS = [
  "Lincoln University",
  "Word of mouth",
  "Industry event",
  "Google",
  "LinkedIn",
  "Other",
];

export default function RequestAccessModal() {
  const { open, closeModal } = useModal();
  const [step, setStep] = useState(1);
  const [chip, setChip] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, closeModal]);

  useEffect(() => {
    if (!open) {
      const id = setTimeout(() => {
        setStep(1);
        setChip(null);
      }, 300);
      return () => clearTimeout(id);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-chrome-deep/55 px-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Request access"
        className="relative w-full max-w-lg rounded-2xl border border-line bg-paper p-8 outline-none md:p-12"
      >
        <button
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-paper-2 text-ink-soft transition-colors hover:bg-paper-3"
        >
          ✕
        </button>

        {step === 1 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              Get in touch
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              Request early access to the TerraMind pilot or ask us anything.
            </p>
            <input
              type="text"
              placeholder="Name · email · or phone"
              className="w-full rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-accent-strong"
            />
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">1 of 3</span>
              <button
                onClick={() => setStep(2)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              About your operation
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              What are you growing, and what&apos;s your biggest decision
              challenge right now?
            </p>
            <textarea
              rows={4}
              placeholder="e.g. 25 ha Pinot Noir in Bannockburn, frost protection decisions eating margin every September…"
              className="w-full resize-none rounded-lg border border-line bg-white px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-mute focus:border-accent-strong"
            />
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">2 of 3</span>
              <button
                onClick={() => setStep(3)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              How did you find us?
            </h3>
            <p className="mb-8 text-sm leading-normal text-ink-mute">
              We appreciate it.
            </p>
            <div className="mb-7 flex flex-wrap gap-2">
              {CHIPS.map((c) => (
                <button
                  key={c}
                  onClick={() => setChip(c)}
                  className={`cursor-pointer rounded-full border px-4 py-2 text-[13px] transition-all ${
                    chip === c
                      ? "border-leaf bg-leaf text-white"
                      : "border-line text-ink-soft hover:border-leaf hover:bg-leaf hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-7 flex items-center justify-between">
              <span className="text-xs text-ink-mute">3 of 3</span>
              <button
                onClick={() => setStep(4)}
                className="cursor-pointer rounded-full bg-leaf px-5.5 py-2.75 text-sm font-semibold text-white transition-colors hover:bg-leaf-deep"
              >
                Submit ↗
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent bg-leaf/10 text-[22px] text-leaf">
              ✓
            </div>
            <h3 className="mb-2 font-serif text-2xl font-semibold tracking-tight text-ink">
              Thank you
            </h3>
            <p className="text-sm leading-normal text-ink-mute">
              Our team will reach out shortly. We&apos;re selectively onboarding
              growers for the Central Otago pilot season.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
