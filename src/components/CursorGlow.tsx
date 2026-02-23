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

    const maxTrailLength = 70;
    const maxAge = 1.4;
    let lastTime = performance.now();
    let raf = 0;

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Add new point
      if (mx > -9000 && my > -9000) {
        const last = trail.current[trail.current.length - 1];
        if (!last || Math.hypot(mx - last.x, my - last.y) > 2) {
          trail.current.push({ x: mx, y: my, age: 0 });
        }
      }

      // Age and prune
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
        // --- Soft wide underglow (single smooth path) ---
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // Build smooth Bézier path through midpoints
        const drawSmoothPath = () => {
          ctx.beginPath();
          ctx.moveTo(pts[0].x, pts[0].y);
          for (let i = 0; i < pts.length - 1; i++) {
            const curr = pts[i];
            const next = pts[i + 1];
            const midX = (curr.x + next.x) / 2;
            const midY = (curr.y + next.y) / 2;
            ctx.quadraticCurveTo(curr.x, curr.y, midX, midY);
          }
          const last = pts[pts.length - 1];
          ctx.lineTo(last.x, last.y);
        };

        // Layer 1: Wide soft ambient glow
        drawSmoothPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
        ctx.lineWidth = 28;
        ctx.stroke();

        // Layer 2: Medium glow for depth
        drawSmoothPath();
        ctx.strokeStyle = "rgba(56, 189, 248, 0.06)";
        ctx.lineWidth = 14;
        ctx.stroke();

        // --- Per-segment trail with fading width & opacity ---
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          const progress = 1 - p.age / maxAge;
          // Cubic ease-out for smoother fade
          const eased = progress * progress * (3 - 2 * progress);
          const alpha = eased * 0.3;
          const width = eased * 4 + 0.5;

          if (alpha < 0.005) continue;

          const hue = 195 + (1 - progress) * 25;
          const lightness = 62 + progress * 10;

          // Soft glow behind the line
          ctx.strokeStyle = `hsla(${hue}, 80%, ${lightness}%, ${alpha * 0.4})`;
          ctx.lineWidth = width + 6;
          ctx.lineCap = "round";
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Core line
          ctx.strokeStyle = `hsla(${hue}, 85%, ${lightness + 8}%, ${alpha})`;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // --- Subtle shimmer dots (sparse, soft) ---
        for (let i = 0; i < pts.length; i += 4) {
          const p = pts[i];
          const progress = 1 - p.age / maxAge;
          const eased = progress * progress;
          const alpha = eased * 0.25;
          const radius = eased * 1.5 + 0.5;

          if (alpha < 0.01) continue;

          const hue = 195 + (1 - progress) * 25;

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 90%, 80%, ${alpha})`;
          ctx.fill();
        }
      }

      // Soft ambient glow around cursor
      if (mx > -9000 && my > -9000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 100);
        grd.addColorStop(0, "rgba(56,189,248,0.07)");
        grd.addColorStop(0.3, "rgba(56,189,248,0.03)");
        grd.addColorStop(0.7, "rgba(56,189,248,0.01)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(mx - 100, my - 100, 200, 200);
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
