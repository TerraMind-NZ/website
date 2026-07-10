"use client";

import { useEffect, useRef } from "react";

const C = {
  sky0: "#dfe9dd",
  sky1: "#ebf1e8",
  sky2: "#f3f6ee",
  ground: "#cfdec7",
  vine1: "#4f8a68",
  vine2: "#2e7a4f",
  vine3: "#155c38",
  leaf1: "#5f9a76",
  leaf2: "#35845a",
  leaf3: "#1a6b42",
  mist: "rgba(230, 240, 228,",
  glint: "rgba(31, 157, 87,",
};

const VP = { xr: 0.5, yr: 0.6 };

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
      W = canvas.width = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const GLINTS = Array.from({ length: 120 }, (_, i) => {
      const r = Math.sin(i * 9301 + 49297) * 0.5 + 0.5;
      const s = Math.sin(i * 6571 + 3141) * 0.5 + 0.5;
      const q = Math.sin(i * 2357 + 1777) * 0.5 + 0.5;
      return { x: r, y: s * 0.55, r: 0.4 + q, phase: q * Math.PI * 2 };
    });

    const MIST = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: 0.68 + Math.random() * 0.32,
      r: 40 + Math.random() * 120,
      speed: 0.00004 + Math.random() * 0.00008,
      phase: Math.random() * Math.PI * 2,
      alpha: 0.01 + Math.random() * 0.025,
    }));

    const rowY = (row: number, rows: number) => {
      const f = row / (rows - 1);
      return VP.yr + f * f * (1 - VP.yr);
    };

    const drawVineRow = (
      ry: number,
      alpha: number,
      color: string,
      leafColor: string,
      leafSize: number,
      scroll: number
    ) => {
      const vpx = VP.xr * W;
      const ly = ry * H;
      const hw = Math.max(0.001, ry - VP.yr) * 2.6 * W;
      const lx0 = vpx - hw;
      const lx1 = vpx + hw;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = color;
      ctx.lineWidth = Math.max(0.5, (ry - VP.yr) * 3);
      ctx.beginPath();
      ctx.moveTo(lx0, ly);
      ctx.lineTo(lx1, ly);
      ctx.stroke();

      for (let p = 0; p <= 24; p++) {
        const fx = lx0 + (lx1 - lx0) * (p / 24);
        const postH = leafSize * 2.5;
        ctx.lineWidth = Math.max(0.5, (ry - VP.yr) * 2);
        ctx.beginPath();
        ctx.moveTo(fx, ly - postH * 0.3);
        ctx.lineTo(fx, ly + postH * 0.7);
        ctx.stroke();
      }

      for (let b = 0; b < 80; b++) {
        const sway = Math.sin(b * 0.71 + scroll * 0.4) * leafSize * 0.15;
        const bx = lx0 + (lx1 - lx0) * ((b + 0.5) / 80) + sway;
        const by = ly - leafSize * (0.45 + Math.sin(b * 1.3) * 0.15);
        const br = leafSize * (0.6 + Math.sin(b * 2.1 + 1) * 0.12);
        ctx.fillStyle = leafColor;
        ctx.beginPath();
        ctx.ellipse(bx, by, br * 1.4, br * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(31, 157, 87, 0.18)";
        ctx.beginPath();
        ctx.ellipse(bx - br * 0.2, by - br * 0.3, br * 0.5, br * 0.3, -0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);

      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.65);
      sky.addColorStop(0, C.sky2);
      sky.addColorStop(0.5, C.sky1);
      sky.addColorStop(1, C.sky0);
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H * 0.65);

      const gnd = ctx.createLinearGradient(0, H * 0.55, 0, H);
      gnd.addColorStop(0, C.sky0);
      gnd.addColorStop(1, C.ground);
      ctx.fillStyle = gnd;
      ctx.fillRect(0, H * 0.55, W, H * 0.45);

      GLINTS.forEach((s) => {
        const twinkle = 0.2 + 0.4 * (0.5 + 0.5 * Math.sin(t * 0.8 + s.phase));
        ctx.fillStyle = C.glint + twinkle * 0.5 + ")";
        ctx.beginPath();
        ctx.arc(s.x * W, s.y * H * 0.5, s.r * 1.2, 0, Math.PI * 2);
        ctx.fill();
      });

      const ROWS = 10;
      for (let row = 0; row < ROWS; row++) {
        const ry = rowY(row, ROWS);
        const depth = row / (ROWS - 1);
        const scroll = t * 0.12 * (0.2 + depth * 0.8);
        const alpha = 0.45 + depth * 0.55;
        const lsize = 4 + depth * 18;
        const color = depth < 0.33 ? C.vine1 : depth < 0.66 ? C.vine2 : C.vine3;
        const leaf = depth < 0.33 ? C.leaf1 : depth < 0.66 ? C.leaf2 : C.leaf3;
        drawVineRow(ry, alpha, color, leaf, lsize, scroll);
      }

      MIST.forEach((m) => {
        m.x += m.speed;
        if (m.x > 1.3) m.x = -0.3;
        const mx = m.x * W + Math.sin(t * 0.3 + m.phase) * 30;
        const my = m.y * H + Math.sin(t * 0.5 + m.phase) * 8;
        const g = ctx.createRadialGradient(mx, my, 0, mx, my, m.r);
        g.addColorStop(0, C.mist + m.alpha + ")");
        g.addColorStop(1, C.mist + "0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(mx, my, m.r * 2.5, m.r * 0.7, 0, 0, Math.PI * 2);
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
