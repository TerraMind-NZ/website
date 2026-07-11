"use client";

import { useEffect, useRef } from "react";

// Animated rendition of the hero canvas scene — horizon glow, twinkling
// stars, layered ridgelines terraced with vine rows, drifting mist and
// fireflies — for the full-width dark sections. Same playbook as HeroCanvas:
// only animates while on screen, draws a single static frame under
// prefers-reduced-motion. `seed` varies the landscape so no two sections
// show the same hills.

const C = {
  glow: "rgba(67, 213, 133,",
  mist: "rgba(140, 180, 150,",
  firefly: "rgba(67, 213, 133,",
  star: "rgba(210, 235, 218,",
  ridges: ["#17352255", "#122c1c", "#0d2114", "#08160d"],
  vineCanopy: ["#1d4a30", "#173d27", "#11301e"],
};

export default function SectionArt({ seed = 0 }: { seed?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0;
    let H = 0;
    let band = 0;
    let horizon = 0;
    let t = seed * 37; // desync sections that share a viewport
    let raf = 0;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rand = (i: number, salt: number) =>
      Math.sin((i + seed * 137.31) * 9301.7 + salt * 49297.3) * 0.5 + 0.5;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Ridges live in a bottom band capped in px so tall sections don't
      // become all mountain; stars fill the sky above it.
      band = Math.min(H * 0.5, 380);
      horizon = H - band;
    };

    const RIDGES = C.ridges.map((color, i) => ({
      color,
      phases: [rand(i, 1) * 7, rand(i, 2) * 7, rand(i, 3) * 7],
      freqs: [1.7 + rand(i, 4), 3.3 + rand(i, 5) * 2, 6 + rand(i, 6) * 3],
    }));

    const ridgeY = (i: number, fx: number, drift: number) => {
      const [p0, p1, p2] = RIDGES[i].phases;
      const [f0, f1, f2] = RIDGES[i].freqs;
      const n =
        Math.sin(fx * f0 + p0 + drift) * 0.55 +
        Math.sin(fx * f1 + p1 - drift * 0.6) * 0.3 +
        Math.sin(fx * f2 + p2) * 0.15;
      const base = horizon + band * (0.12 + i * 0.24);
      return base + n * band * (0.06 + i * 0.02);
    };

    const STARS = Array.from({ length: 60 }, (_, i) => ({
      x: rand(i, 21),
      y: rand(i, 22),
      r: 0.4 + rand(i, 23) * 0.9,
      phase: rand(i, 24) * Math.PI * 2,
    }));

    const FIREFLIES = Array.from({ length: 26 }, (_, i) => ({
      x: 0.05 + rand(i, 31) * 0.9,
      y: 0.1 + rand(i, 32) * 0.75,
      r: 1 + rand(i, 33) * 1.5,
      phase: rand(i, 34) * Math.PI * 2,
      speed: 0.15 + rand(i, 35) * 0.35,
      wander: 0.01 + rand(i, 36) * 0.02,
    }));

    const MIST = Array.from({ length: 14 }, (_, i) => ({
      x: rand(i, 41),
      y: 0.2 + rand(i, 42) * 0.6,
      r: 60 + rand(i, 43) * 140,
      speed: 0.00005 + rand(i, 44) * 0.0001,
      phase: rand(i, 45) * Math.PI * 2,
      alpha: 0.02 + rand(i, 46) * 0.03,
    }));

    const draw = () => {
      t += 0.006;
      ctx.clearRect(0, 0, W, H);

      // Soft glow rising off the horizon, gently breathing
      const breathe = 0.055 + 0.02 * Math.sin(t * 0.5);
      const glow = ctx.createRadialGradient(
        W * 0.5, horizon + band * 0.15, 0,
        W * 0.5, horizon + band * 0.15, Math.max(W, H) * 0.5
      );
      glow.addColorStop(0, C.glow + breathe + ")");
      glow.addColorStop(1, C.glow + "0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Stars, twinkling
      const skyH = Math.max(horizon * 0.9, H * 0.3);
      const starCount = Math.min(STARS.length, Math.round(W / 22));
      for (let i = 0; i < starCount; i++) {
        const s = STARS[i];
        const tw = 0.12 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.9 + s.phase));
        ctx.fillStyle = C.star + tw + ")";
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * skyH, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Ridgelines, far to near, slow parallax drift, vine rows terraced in
      const steps = 90;
      RIDGES.forEach((r, i) => {
        const drift = t * 0.05 * (i + 1) * 0.25;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let p = 0; p <= steps; p++) {
          const fx = p / steps;
          ctx.lineTo(fx * W, ridgeY(i, fx, drift));
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fill();

        if (i >= 1) {
          const scale = 0.35 + (i / (C.ridges.length - 1)) * 0.65;
          const rows = 1 + i;
          const spacing = 8 + i * 7;
          ctx.globalAlpha = 0.45;
          ctx.lineWidth = Math.max(1, 2.2 * scale);
          for (let k = 1; k <= rows; k++) {
            const off = k * spacing;
            ctx.strokeStyle = C.vineCanopy[(k + i) % C.vineCanopy.length];
            ctx.beginPath();
            for (let p = 0; p <= steps; p++) {
              const fx = p / steps;
              const y = ridgeY(i, fx, drift) + off;
              if (p === 0) ctx.moveTo(fx * W, y);
              else ctx.lineTo(fx * W, y);
            }
            ctx.stroke();
          }
          ctx.globalAlpha = 1;
        }
      });

      // On tall canvases (e.g. a whole page sharing one scene) the ridge band
      // only covers the bottom, so spread the ambient life — mist and
      // fireflies — across the full height instead of pinning it to the hills.
      const spread = H > 1100;
      const mistCount = spread ? MIST.length : 8;
      const flyCount = spread
        ? Math.min(FIREFLIES.length, Math.max(8, Math.round((W * H) / 120000)))
        : Math.min(FIREFLIES.length, Math.max(4, Math.round(W / 220)));

      // Mist banks drifting between the hills
      for (let j = 0; j < mistCount; j++) {
        const m = MIST[j];
        m.x += m.speed;
        if (m.x > 1.3) m.x = -0.3;
        const mx = m.x * W + Math.sin(t * 0.3 + m.phase) * 24;
        const anchor = spread
          ? H * (0.1 + m.y)
          : horizon + band * m.y;
        const my = anchor + Math.sin(t * 0.45 + m.phase) * 10;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, m.r);
        g.addColorStop(0, C.mist + m.alpha + ")");
        g.addColorStop(1, C.mist + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(mx, my, m.r * 2.4, m.r * 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Fireflies pulsing over the rows
      for (let i = 0; i < flyCount; i++) {
        const f = FIREFLIES[i];
        const fx = (f.x + Math.sin(t * f.speed + f.phase) * f.wander * 4) * W;
        const anchor = spread ? H * (0.06 + f.y) : horizon + band * f.y;
        const fy =
          anchor + Math.cos(t * f.speed * 0.8 + f.phase) * f.wander * 2.5 * 380;
        const pulse = 0.5 + 0.5 * Math.sin(t * 1.4 + f.phase * 3);
        const a = 0.1 + pulse * 0.45;
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
      }

      if (!reduced && running) raf = requestAnimationFrame(draw);
    };

    // Only animate while the section is actually on screen.
    let running = false;
    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    if (!reduced) {
      io = new IntersectionObserver(([entry]) =>
        entry.isIntersecting ? start() : stop()
      );
      io.observe(canvas);
    }

    return () => {
      io?.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [seed]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
