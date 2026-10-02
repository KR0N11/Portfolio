"use client";

/*
  Embers of grace drifting upward. Positions are fractions of the parent box,
  so the same field works on the stage of any scene.
*/

import { useEffect, useRef } from "react";

type Props = {
  /** where they rise from, as fractions of the box: [x0, x1, y0, y1] */
  source: [number, number, number, number];
  count?: number;
  /** 0..1, read every frame so a page can brighten them live */
  intensity?: React.RefObject<number>;
  /** horizontal drift per rise, as a fraction of width (wind) */
  drift?: number;
  /** how far each ember travels, as a fraction of height */
  rise?: number;
};

type Mote = { x: number; y: number; age: number; life: number; size: number; wob: number };

export default function Motes({ source, count = 28, intensity, drift = 0.02, rise = 0.32 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [x0, x1, y0, y1] = source;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const spawn = (m?: Mote): Mote => {
      const fresh = {
        x: x0 + Math.random() * (x1 - x0),
        y: y0 + Math.random() * (y1 - y0),
        age: 0,
        life: 6 + Math.random() * 6,
        size: 0.8 + Math.random() * 1.6,
        wob: Math.random() * Math.PI * 2,
      };
      return m ? Object.assign(m, fresh) : fresh;
    };
    const motes = Array.from({ length: count }, () => {
      const m = spawn();
      m.age = Math.random() * m.life;
      return m;
    });

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const k = intensity?.current ?? 0.6;
      ctx.globalCompositeOperation = "lighter";
      for (const m of motes) {
        m.age += dt * (0.7 + k * 0.6);
        if (m.age >= m.life) spawn(m);
        const p = m.age / m.life;
        const fade = Math.min(1, p * 6) * (1 - p);
        const px = (m.x + drift * p + Math.sin(m.wob + m.age * 0.9) * 0.004) * w;
        const py = (m.y - rise * p) * h;
        const r = m.size * (0.8 + k * 0.6);
        const a = fade * (0.35 + 0.65 * k);
        const g = ctx.createRadialGradient(px, py, 0, px, py, r * 5);
        g.addColorStop(0, `rgba(255,236,180,${a})`);
        g.addColorStop(0.25, `rgba(232,182,76,${a * 0.6})`);
        g.addColorStop(1, "rgba(232,182,76,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, r * 5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [x0, x1, y0, y1, count, intensity, drift, rise]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}
