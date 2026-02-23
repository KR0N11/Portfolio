"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const trail = useRef<TrailPoint[]>([]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ontouchstart" in window &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const maxTrailLength = 80;
    const maxAge = 1.6; // longer life for smoother fade
    let lastTime = performance.now();
    let raf = 0;

    // Catmull-Rom spline interpolation for smooth curves
    const catmullRom = (
      p0: TrailPoint,
      p1: TrailPoint,
      p2: TrailPoint,
      p3: TrailPoint,
      t: number,
    ) => {
      const t2 = t * t;
      const t3 = t2 * t;
      return {
        x:
          0.5 *
          (2 * p1.x +
            (-p0.x + p2.x) * t +
            (2 * p0.x - 5 * p1.x + 4 * p2.x - p3.x) * t2 +
            (-p0.x + 3 * p1.x - 3 * p2.x + p3.x) * t3),
        y:
          0.5 *
          (2 * p1.y +
            (-p0.y + p2.y) * t +
            (2 * p0.y - 5 * p1.y + 4 * p2.y - p3.y) * t2 +
            (-p0.y + 3 * p1.y - 3 * p2.y + p3.y) * t3),
      };
    };

    // Easing function for smoother fade
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Add new point to the trail
      if (mx > -9000 && my > -9000) {
        const last = trail.current[trail.current.length - 1];
        if (!last || Math.hypot(mx - last.x, my - last.y) > 2) {
          trail.current.push({ x: mx, y: my, age: 0 });
        }
      }

      // Age and prune trail points
      for (let i = trail.current.length - 1; i >= 0; i--) {
        trail.current[i].age += dt;
        if (trail.current[i].age > maxAge) {
          trail.current.splice(i, 1);
        }
      }

      while (trail.current.length > maxTrailLength) {
        trail.current.shift();
      }

      const pts = trail.current;

      if (pts.length > 2) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Layer 1: Wide, very soft outer glow trail
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          const progress = easeOutCubic(1 - p.age / maxAge);
          const alpha = progress * 0.06;
          const size = progress * 16 + 4;

          if (alpha < 0.005) continue;

          const hue = 195 + (1 - progress) * 20;
          ctx.strokeStyle = `hsla(${hue}, 70%, 65%, ${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Layer 2: Medium glow trail
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          const progress = easeOutCubic(1 - p.age / maxAge);
          const alpha = progress * 0.12;
          const size = progress * 6 + 1.5;

          if (alpha < 0.005) continue;

          const hue = 195 + (1 - progress) * 20;
          ctx.strokeStyle = `hsla(${hue}, 75%, 68%, ${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Layer 3: Sharp core trail using Catmull-Rom spline
        if (pts.length >= 4) {
          for (let i = 1; i < pts.length - 2; i++) {
            const p0 = pts[i - 1];
            const p1 = pts[i];
            const p2 = pts[i + 1];
            const p3 = pts[i + 2];
            const progress = easeOutCubic(1 - p1.age / maxAge);
            const alpha = progress * 0.22;
            const size = progress * 2 + 0.5;

            if (alpha < 0.005) continue;

            const hue = 200 + (1 - progress) * 15;
            ctx.strokeStyle = `hsla(${hue}, 80%, 72%, ${alpha})`;
            ctx.lineWidth = size;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            const steps = 4;
            for (let s = 1; s <= steps; s++) {
              const pt = catmullRom(p0, p1, p2, p3, s / steps);
              ctx.lineTo(pt.x, pt.y);
            }
            ctx.stroke();
          }
        }

        // Soft radial glow dots at intervals along the trail for depth
        for (let i = 0; i < pts.length; i += 3) {
          const p = pts[i];
          const progress = easeOutCubic(1 - p.age / maxAge);
          const alpha = progress * 0.1;
          const radius = progress * 8 + 2;

          if (alpha < 0.005) continue;

          const hue = 200 + (1 - progress) * 15;
          const grd = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            radius,
          );
          grd.addColorStop(
            0,
            `hsla(${hue}, 80%, 75%, ${alpha * 1.5})`,
          );
          grd.addColorStop(0.5, `hsla(${hue}, 70%, 65%, ${alpha * 0.5})`);
          grd.addColorStop(1, `hsla(${hue}, 60%, 60%, 0)`);
          ctx.fillStyle = grd;
          ctx.fillRect(
            p.x - radius,
            p.y - radius,
            radius * 2,
            radius * 2,
          );
        }
      }

      // Ambient glow around current cursor position
      if (mx > -9000 && my > -9000) {
        // Outer ambient glow
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 160);
        grd.addColorStop(0, "rgba(56,189,248,0.06)");
        grd.addColorStop(0.3, "rgba(56,189,248,0.025)");
        grd.addColorStop(0.7, "rgba(56,189,248,0.008)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(mx - 160, my - 160, 320, 320);

        // Inner focused glow
        const inner = ctx.createRadialGradient(mx, my, 0, mx, my, 40);
        inner.addColorStop(0, "rgba(125,211,252,0.1)");
        inner.addColorStop(0.6, "rgba(56,189,248,0.03)");
        inner.addColorStop(1, "transparent");
        ctx.fillStyle = inner;
        ctx.fillRect(mx - 40, my - 40, 80, 80);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9998 }}
      aria-hidden="true"
    />
  );
}
