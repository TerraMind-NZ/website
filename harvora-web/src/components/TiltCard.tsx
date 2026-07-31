"use client";

import { CSSProperties, ReactNode, useRef } from "react";

const MAX_DEG = 6;

/**
 * Cursor-tracking 3D tilt with a glare highlight that follows the pointer.
 * Writes CSS vars directly (no re-renders); .tilt in globals.css consumes them.
 */
export default function TiltCard({
  children,
  className = "",
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(px * MAX_DEG).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-py * MAX_DEG).toFixed(2)}deg`);
    el.style.setProperty("--gx", `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--gy", `${((py + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty("--glare", "0.35");
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--glare", "0");
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`tilt ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
