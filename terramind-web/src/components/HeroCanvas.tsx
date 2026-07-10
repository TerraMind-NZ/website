"use client";

import { useEffect, useRef } from "react";

const C = {
  skyTop: "#050c08",
  skyMid: "#0c1f15",
  skyLow: "#16382464",
  glow: "rgba(67, 213, 133,",
  mist: "rgba(140, 180, 150,",
  firefly: "rgba(67, 213, 133,",
  star: "rgba(210, 235, 218,",
  ridges: ["#17352255", "#122c1c", "#0d2114", "#08160d", "#040b07"],
  vineCanopy: ["#1d4a30", "#173d27", "#11301e"],
  vinePost: "rgba(8, 20, 12, 0.9)",
};

type Ridge = {
  base: number; // baseline as fraction of H
  amp: number; // amplitude as fraction of H
  phases: number[];
  freqs: number[];
  vineRows: number; // trellis rows planted on this hill face
  color: string;
};

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let t = 0;
    let raf = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", resize);
    resize();

    const rand = (i: number, salt: number) =>
      Math.sin(i * 9301.7 + salt * 49297.3) * 0.5 + 0.5;

    const RIDGES: Ridge[] = C.ridges.map((color, i) => ({
      base: 0.58 + i * 0.09,
      amp: 0.05 + i * 0.018,
      phases: [rand(i, 1) * 7, rand(i, 2) * 7, rand(i, 3) * 7],
      freqs: [1.7 + rand(i, 4), 3.3 + rand(i, 5) * 2, 6 + rand(i, 6) * 3],
      vineRows: i >= 2 ? 3 + i * 2 : 0,
      color,
    }));

    const ridgeY = (r: Ridge, fx: number, drift: number) => {
      const [p0, p1, p2] = r.phases;
      const [f0, f1, f2] = r.freqs;
      const n =
        Math.sin(fx * f0 + p0 + drift) * 0.55 +
        Math.sin(fx * f1 + p1 - drift * 0.6) * 0.3 +
        Math.sin(fx * f2 + p2) * 0.15;
      return (r.base + n * r.amp) * H;
    };

    const STARS = Array.from({ length: 90 }, (_, i) => ({
      x: rand(i, 21),
      y: rand(i, 22) * 0.5,
      r: 0.4 + rand(i, 23) * 0.9,
      phase: rand(i, 24) * Math.PI * 2,
    }));

    const FIREFLIES = Array.from({ length: 26 }, (_, i) => ({
      x: rand(i, 31),
      y: 0.55 + rand(i, 32) * 0.38,
      r: 1 + rand(i, 33) * 1.6,
      phase: rand(i, 34) * Math.PI * 2,
      speed: 0.15 + rand(i, 35) * 0.35,
      wander: 0.01 + rand(i, 36) * 0.02,
    }));

    const MIST = Array.from({ length: 22 }, (_, i) => ({
      x: rand(i, 41),
      y: 0.52 + rand(i, 42) * 0.42,
      r: 60 + rand(i, 43) * 160,
      speed: 0.00005 + rand(i, 44) * 0.0001,
      phase: rand(i, 45) * Math.PI * 2,
      alpha: 0.015 + rand(i, 46) * 0.035,
    }));

    // One vineyard trellis row draped over the hill face: canopy line,
    // leaf clumps swaying gently, and posts every few metres.
    const drawVineRow = (
      r: Ridge,
      drift: number,
      offset: number, // px below the ridgeline
      scale: number, // 0..1 depth scale for this ridge
      canopy: string,
      sway: number
    ) => {
      const steps = 70;
      const yAt = (fx: number) =>
        ridgeY(r, fx, drift) + offset + Math.sin(fx * 9 + offset) * 2 * scale;

      // canopy line
      ctx.strokeStyle = canopy;
      ctx.lineWidth = Math.max(1, 2.6 * scale);
      ctx.beginPath();
      for (let p = 0; p <= steps; p++) {
        const fx = p / steps;
        const y = yAt(fx);
        if (p === 0) ctx.moveTo(fx * W, y);
        else ctx.lineTo(fx * W, y);
      }
      ctx.stroke();

      // leaf clumps along the wire
      const clumps = 46;
      ctx.fillStyle = canopy;
      for (let b = 0; b < clumps; b++) {
        const fx = (b + 0.5) / clumps;
        const wob = Math.sin(b * 1.31 + sway) * 1.5 * scale;
        const y = yAt(fx) - 2 * scale + wob * 0.4;
        const rr = (2 + rand(b, offset) * 2.6) * scale;
        ctx.beginPath();
        ctx.ellipse(fx * W + wob, y, rr * 1.5, rr * 0.9, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // trellis posts
      const posts = 22;
      ctx.strokeStyle = C.vinePost;
      ctx.lineWidth = Math.max(0.6, 1.4 * scale);
      for (let p = 0; p <= posts; p++) {
        const fx = p / posts;
        const y = yAt(fx);
        const ph = (7 + rand(p, offset * 3) * 3) * scale;
        ctx.beginPath();
        ctx.moveTo(fx * W, y - ph * 0.55);
        ctx.lineTo(fx * W, y + ph * 0.45);
        ctx.stroke();
      }
    };

    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, W, H);

      // Night sky
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, C.skyTop);
      sky.addColorStop(0.55, C.skyMid);
      sky.addColorStop(1, "#0a1a10");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Soft horizon glow, gently breathing
      const breathe = 0.06 + 0.025 * Math.sin(t * 0.5);
      const glow = ctx.createRadialGradient(
        W * 0.5, H * 0.62, 0,
        W * 0.5, H * 0.62, Math.max(W, H) * 0.55
      );
      glow.addColorStop(0, C.glow + breathe + ")");
      glow.addColorStop(1, C.glow + "0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Stars
      STARS.forEach((s) => {
        const tw = 0.15 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.9 + s.phase));
        ctx.fillStyle = C.star + tw + ")";
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ridgelines, far to near, with slow parallax drift
      RIDGES.forEach((r, i) => {
        const drift = t * 0.05 * (i + 1) * 0.25;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.moveTo(0, H);
        const steps = 90;
        for (let p = 0; p <= steps; p++) {
          const fx = p / steps;
          ctx.lineTo(fx * W, ridgeY(r, fx, drift));
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();

        // vineyard rows terraced down the hill face
        if (r.vineRows > 0) {
          const scale = 0.35 + (i / (C.ridges.length - 1)) * 0.65;
          const spacing = (10 + i * 9) * (H / 800);
          for (let k = 1; k <= r.vineRows; k++) {
            const canopy = C.vineCanopy[(k + i) % C.vineCanopy.length];
            drawVineRow(r, drift, k * spacing, scale, canopy, t * 1.2 + k);
          }
        }
      });

      // Drifting mist banks
      MIST.forEach((m) => {
        m.x += m.speed;
        if (m.x > 1.3) m.x = -0.3;
        const mx = m.x * W + Math.sin(t * 0.3 + m.phase) * 24;
        const my = m.y * H + Math.sin(t * 0.45 + m.phase) * 10;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, m.r);
        g.addColorStop(0, C.mist + m.alpha + ")");
        g.addColorStop(1, C.mist + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(mx, my, m.r * 2.4, m.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      });

      // Fireflies
      FIREFLIES.forEach((f) => {
        const fx = (f.x + Math.sin(t * f.speed + f.phase) * f.wander * 4) * W;
        const fy = (f.y + Math.cos(t * f.speed * 0.8 + f.phase) * f.wander * 2.5) * H;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + f.phase * 3);
        const a = 0.12 + pulse * 0.5;
        const g = ctx.createRadialGradient(fx, fy, 0, fx, fy, f.r * 5);
        g.addColorStop(0, C.firefly + a + ")");
        g.addColorStop(1, C.firefly + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(fx, fy, f.r * 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = C.firefly + Math.min(1, a + 0.3) + ")";
        ctx.beginPath();
        ctx.arc(fx, fy, f.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reduced) raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
