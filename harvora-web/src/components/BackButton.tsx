"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
  /** "dark" for dark backgrounds, "light" for light backgrounds */
  surface?: "dark" | "light";
}

export default function BackButton({ className = "", surface = "dark" }: BackButtonProps) {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
      }}
      className={`inline-flex cursor-pointer items-center gap-2 font-mono text-[12px] uppercase tracking-[0.15em] transition-colors ${
        surface === "dark"
          ? "text-accent hover:text-white"
          : "text-accent-strong hover:text-ink"
      } ${className}`}
    >
      ← Back
    </button>
  );
}
