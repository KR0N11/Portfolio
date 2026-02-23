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
    const maxAge = 1.6;
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

      // Keep trail length manageable
      while (trail.current.length > maxTrailLength) {
        trail.current.shift();
      }

      const pts = trail.current;

      if (pts.length > 2) {
        // Draw the main glowing ribbon trail
        for (let i = 1; i < pts.length; i++) {
          const p = pts[i];
          const prev = pts[i - 1];
          const progress = 1 - p.age / maxAge;
          const alpha = progress * 0.7;
          const width = progress * 12 + 1;

          if (alpha < 0.01) continue;

          // Gradient from cyan to blue-violet along the trail
          const hue = 190 + (1 - progress) * 40;
          const lightness = 55 + progress * 15;
          const saturation = 80 + progress * 15;

          // Outer glow layer
          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.3})`;
          ctx.lineWidth = width + 8;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Mid glow layer
          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.5})`;
          ctx.lineWidth = width + 3;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Core bright line
          ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness + 15}%, ${alpha})`;
          ctx.lineWidth = width;
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }

        // Floating particles along the trail
        for (let i = 0; i < pts.length; i += 2) {
          const p = pts[i];
          const progress = 1 - p.age / maxAge;
          const alpha = progress * 0.8;
          const radius = progress * 4 + 1;

          if (alpha < 0.01) continue;

          const hue = 190 + (1 - progress) * 40;

          // Particle glow
          const pGrd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius * 3);
          pGrd.addColorStop(0, `hsla(${hue}, 90%, 75%, ${alpha * 0.6})`);
          pGrd.addColorStop(0.5, `hsla(${hue}, 90%, 65%, ${alpha * 0.2})`);
          pGrd.addColorStop(1, `hsla(${hue}, 90%, 60%, 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = pGrd;
          ctx.fill();

          // Bright core dot
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, 95%, 85%, ${alpha})`;
          ctx.fill();
        }
      }

      // Bright glow halo around current cursor
      if (mx > -9000 && my > -9000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 80);
        grd.addColorStop(0, "rgba(56,189,248,0.15)");
        grd.addColorStop(0.3, "rgba(56,189,248,0.06)");
        grd.addColorStop(0.6, "rgba(56,189,248,0.02)");
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.fillRect(mx - 80, my - 80, 160, 160);

        // Small bright cursor dot
        ctx.beginPath();
        ctx.arc(mx, my, 4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.6)";
        ctx.fill();

        ctx.beginPath();
        ctx.arc(mx, my, 2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.9)";
        ctx.fill();
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
