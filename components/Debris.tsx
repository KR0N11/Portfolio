"use client";

/*
  Dust and grit kicked up where the blade leaves the ground. A page calls
  `emit.current(count, power)`: small puffs while the sword is worked loose, a
  burst of dust and stone chips when it comes free. Every particle is a whole
  art pixel (chips are two), snapped to the art's grid, and falls under gravity.
*/

import { useEffect, useRef } from "react";

type Props = {
  /** where the blade meets the ground, as fractions of the box */
  origin: [number, number];
  /** the art's size in pixels */
  grid: [number, number];
  /** filled in by this component; call it to throw up debris */
  emit: React.RefObject<((count: number, power: number) => void) | null>;
};

type Bit = { x: number; y: number; vx: number; vy: number; age: number; life: number; size: number; color: string };

const DUST = ["#9fb8ad", "#c9c2a8", "#7f958c"];
const GRIT = ["#2a3634", "#3c4b48", "#56645f", "#1d2726", "#6d7f7a"];

export default function Debris({ origin, grid, emit }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [ox, oy] = origin;
  const [gw, gh] = grid;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const bits: Bit[] = [];
    let raf = 0;
    let last = performance.now();

    // positions and speeds in art pixels
    emit.current = (count: number, power: number) => {
      if (reduce) return;
      for (let i = 0; i < count; i++) {
        const chip = power > 0.6 && Math.random() < 0.55;
        const a = -Math.PI / 2 + (Math.random() - 0.5) * (chip ? 2.2 : 1.6);
        const v = (chip ? 22 : 10 + Math.random() * 14) * (0.5 + power);
        // chips start scattered over the broken rock, not in one clump
        bits.push({
          x: ox * gw + (Math.random() - 0.5) * (chip ? 12 : 5),
          y: oy * gh - Math.random() * (chip ? 4 : 2),
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          age: 0,
          life: chip ? 1.4 : 0.6 + Math.random() * 0.9,
          size: chip ? (Math.random() < 0.4 ? 3 : 2) : 1,
          color: chip ? GRIT[i % GRIT.length] : DUST[i % DUST.length],
        });
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };

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
      const cw = w / gw;
      const ch = h / gh;
      for (let i = bits.length - 1; i >= 0; i--) {
        const b = bits[i];
        b.age += dt;
        if (b.age >= b.life) {
          bits.splice(i, 1);
          continue;
        }
        // dust hangs in the air, grit drops
        b.vy += (b.size > 1 ? 70 : 18) * dt;
        b.vx *= 1 - dt * (b.size > 1 ? 0.5 : 2.2);
        b.x += b.vx * dt;
        b.y += b.vy * dt;
        const fade = 1 - b.age / b.life;
        ctx.globalAlpha = Math.ceil(fade * 3) / 3;
        ctx.fillStyle = b.color;
        ctx.fillRect(Math.floor(b.x) * cw, Math.floor(b.y) * ch, cw * b.size, ch * b.size);
      }
      ctx.globalAlpha = 1;
      raf = bits.length ? requestAnimationFrame(tick) : 0;
    };

    return () => {
      cancelAnimationFrame(raf);
      emit.current = null;
    };
  }, [ox, oy, gw, gh, emit]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", imageRendering: "pixelated" }}
    />
  );
}
