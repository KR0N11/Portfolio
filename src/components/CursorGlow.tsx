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

    const maxTrailLength = 50;
    const maxAge = 1.2; // seconds before a point fully fades
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

      // Add new point to the trail
      if (mx > -9000 && my > -9000) {
        const last = trail.current[trail.current.length - 1];
        // Only add point if cursor moved enough
        if (!last || Math.hypot(mx - last.x, my - last.y) > 3) {
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

      // Keep trail length manageable
      while (trail.current.length > maxTrailLength) {
        trail.current.shift();
      }

      const pts = trail.current;

      // Draw the trail as connected circles with fading opacity
      if (pts.length > 1) {
        // Draw trail line
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          const progress = 1 - p.age / maxAge; // 1 = newest, 0 = about to fade
          const alpha = progress * 0.5;
          const size = progress * 4 + 1;

          if (alpha < 0.01) continue;

          // Gradient from cyan to blue along the trail
          const hue = 190 + (1 - progress) * 30;
          const lightness = 60 + progress * 10;

          ctx.strokeStyle = `hsla(${hue}, 85%, ${lightness}%, ${alpha})`;
          ctx.lineWidth = size;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Draw glowing dots along the trail
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const progress = 1 - p.age / maxAge;
          const alpha = progress * 0.6;
          const radius = progress * 3 + 0.5;

          if (alpha < 0.01) continue;

          const hue = 190 + (1 - progress) * 30;

          ctx.beginPath();
          ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 90%, 70%, ${alpha})`;
          ctx.fill();
        }
      }

      // Glow around current cursor position
      if (mx > -9000 && my > -9000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        grd.addColorStop(0, "rgba(56,189,248,0.08)");
        grd.addColorStop(0.4, "rgba(56,189,248,0.03)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(mx - 120, my - 120, 240, 240);
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
