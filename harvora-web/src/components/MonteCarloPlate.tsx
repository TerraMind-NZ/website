"use client";

import { useEffect, useRef } from "react";

// The engine's actual contract, drawn: a thousand simulated futures for one
// block fan out across the night, collapse into a distribution, and get cut by
// a damage threshold. Everything left of the fold is probability; the readout
// is what the decision layer does with it.
//
// Draws itself in on entry, then a slow scan sweeps the fan so the plate stays
// alive. Static single frame under prefers-reduced-motion.

const PATHS = 140; // drawn traces standing in for the full 1,000-sample run
const STEPS = 64;
const T_TOP = 6.5; // °C at the top of the plot
const T_BOT = -6.5;
const THRESHOLD = -1;
const DURATION = 2600;
const SWEEP_MS = 7000;

const COOL = "15, 122, 65"; // leaf
const WARM = "182, 125, 46"; // earth: only ever used below the threshold

// Deterministic RNG so the plate is identical on server, client and reload.
const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

type Path = { temps: number[] };

function buildPaths(): Path[] {
  const rnd = mulberry32(7);
  const gauss = () => {
    const u = Math.max(rnd(), 1e-9);
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rnd());
  };

  return Array.from({ length: PATHS }, () => {
    const start = 4.6 + gauss() * 0.5;
    const drop = 6.3 + gauss() * 1.7; // how hard this future cools
    const temps: number[] = [];
    let wobble = 0;
    for (let s = 0; s <= STEPS; s++) {
      const t = s / STEPS;
      wobble = wobble * 0.82 + gauss() * 0.16; // correlated, not white noise
      // Radiative cooling curve, steepest through the small hours.
      temps.push(start - drop * Math.pow(t, 0.82) + wobble * (0.35 + t));
    }
    return { temps };
  });
}

export default function MonteCarloPlate() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const paths = buildPaths();
    const finals = paths.map((p) => p.temps[STEPS]);

    // Histogram of where the night ends up.
    const BINS = 26;
    const bins = new Array<number>(BINS).fill(0);
    finals.forEach((v) => {
      const i = Math.floor(((T_TOP - v) / (T_TOP - T_BOT)) * BINS);
      if (i >= 0 && i < BINS) bins[i] += 1;
    });
    const binMax = Math.max(...bins);

    const base = document.createElement("canvas");
    const bctx = base.getContext("2d");

    let W = 0;
    let H = 0;
    let dpr = 1;
    let plotW = 0;
    let histW = 0;
    let raf = 0;
    let entryAt = 0;
    let entryDone = false;
    let running = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    const yOf = (t: number) => ((T_TOP - t) / (T_TOP - T_BOT)) * (H - 34) + 12;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const seg = (p: number, a: number, b: number) =>
      Math.max(0, Math.min(1, (p - a) / (b - a)));

    // One path, cool for its whole length, amber only where it drops through
    // the threshold. The amber you see is the risk.
    const strokePath = (
      c: CanvasRenderingContext2D,
      path: Path,
      end: number,
      coolA: number,
      warmA: number
    ) => {
      c.strokeStyle = `rgba(${COOL}, ${coolA})`;
      c.lineWidth = 1;
      c.beginPath();
      for (let s = 0; s <= end; s++) {
        const x = (s / STEPS) * plotW;
        const y = yOf(path.temps[s]);
        if (s === 0) c.moveTo(x, y);
        else c.lineTo(x, y);
      }
      c.stroke();

      c.strokeStyle = `rgba(${WARM}, ${warmA})`;
      c.beginPath();
      let open = false;
      for (let s = 0; s <= end; s++) {
        if (path.temps[s] >= THRESHOLD) {
          open = false;
          continue;
        }
        const x = (s / STEPS) * plotW;
        const y = yOf(path.temps[s]);
        if (!open) {
          c.moveTo(x, y);
          open = true;
        } else c.lineTo(x, y);
      }
      c.stroke();
    };

    const drawScene = (c: CanvasRenderingContext2D, p: number) => {
      c.clearRect(0, 0, W, H);

      const grown = ease(seg(p, 0, 0.62));
      const upto = Math.round(STEPS * grown);
      if (upto > 0) {
        paths.forEach((path, i) => {
          // Late traces trail the leaders slightly, so the fan feels alive.
          const lag = 1 - (i % 7) * 0.02;
          strokePath(c, path, Math.max(1, Math.round(upto * lag)), 0.16, 0.3);
        });
      }

      // The distribution the fan collapses into
      const built = ease(seg(p, 0.5, 0.88));
      if (built > 0) {
        const x0 = plotW + 26;
        const binH = (H - 34) / BINS;
        bins.forEach((count, i) => {
          const t = T_TOP - ((i + 0.5) / BINS) * (T_TOP - T_BOT);
          const w = (count / binMax) * histW * built;
          c.fillStyle =
            t < THRESHOLD
              ? `rgba(${WARM}, 0.55)`
              : `rgba(${COOL}, 0.32)`;
          c.fillRect(x0, 12 + i * binH + 1, w, Math.max(1, binH - 2));
        });
      }

      // The line that turns a distribution into a question
      const cut = ease(seg(p, 0.72, 1));
      if (cut > 0) {
        c.save();
        c.setLineDash([5, 6]);
        c.strokeStyle = `rgba(${WARM}, ${0.85 * cut})`;
        c.lineWidth = 1;
        c.beginPath();
        c.moveTo(0, yOf(THRESHOLD));
        c.lineTo(W * cut, yOf(THRESHOLD));
        c.stroke();
        c.restore();
      }
    };

    // After the entry draw, the finished scene is cached and only the narrow
    // band under the scan gets re-stroked each frame.
    const cacheBase = () => {
      if (!bctx) return;
      base.width = W * dpr;
      base.height = H * dpr;
      bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawScene(bctx, 1);
    };

    const drawSweep = (now: number) => {
      if (!bctx) return;
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(base, 0, 0, W, H);

      const phase = ((now % SWEEP_MS) / SWEEP_MS) * 1.25 - 0.125;
      const width = 0.1;
      ctx.save();
      ctx.beginPath();
      ctx.rect(Math.max(0, (phase - width) * plotW), 0, width * 2 * plotW, H);
      ctx.clip();
      paths.forEach((path) => strokePath(ctx, path, STEPS, 0.26, 0.48));
      ctx.restore();
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      histW = Math.min(Math.max(W * 0.2, 92), 180);
      plotW = W - histW - 26;
      if (entryDone) cacheBase();
    };

    const frame = (now: number) => {
      if (!running) return;
      if (!entryDone) {
        if (!entryAt) entryAt = now;
        const p = Math.min((now - entryAt) / DURATION, 1);
        drawScene(ctx, p);
        if (p >= 1) {
          entryDone = true;
          cacheBase();
        }
      } else {
        drawSweep(now);
      }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (running || reduced) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    if (reduced) {
      entryDone = true;
      drawScene(ctx, 1);
    } else {
      drawScene(ctx, 0);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) drawScene(ctx, entryDone ? 1 : 0);
    });
    ro.observe(canvas);

    let io: IntersectionObserver | undefined;
    if (!reduced) {
      io = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0.2 }
      );
      io.observe(canvas);
    }

    return () => {
      io?.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-[300px] w-full md:h-[420px]"
      role="img"
      aria-label="A thousand simulated overnight temperature paths for a single block, collapsing into a probability distribution cut by a damage threshold."
    />
  );
}
