"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });

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

    /* ── wave grid settings ── */
    const cols = 70;
    const rows = 40;
    const spacing = 22;
    let time = 0;
    let raf = 0;

    const loop = () => {
      time += 0.012;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      /* smooth cursor follow */
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.08;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.08;

      const mx = smooth.current.x;
      const my = smooth.current.y;

      /* center the grid on cursor */
      const gridW = cols * spacing;
      const gridH = rows * spacing;
      const offsetX = mx - gridW / 2;
      const offsetY = my - gridH / 2;

      /* compute 3D points projected to 2D */
      const points: { sx: number; sy: number; z: number }[][] = [];

      for (let r = 0; r < rows; r++) {
        points[r] = [];
        for (let c = 0; c < cols; c++) {
          const wx = offsetX + c * spacing;
          const wy = offsetY + r * spacing;

          /* distance from cursor */
          const dx = wx - mx;
          const dy = wy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          /* wave height: ripples emanating from cursor */
          const wave1 = Math.sin(dist * 0.025 - time * 3) * 35;
          const wave2 = Math.sin(dist * 0.04 + time * 2) * 15;
          const falloff = Math.max(0, 1 - dist / 350);
          const z = (wave1 + wave2) * falloff * falloff;

          /* isometric-ish 3D projection */
          const tiltX = 0.65;
          const tiltScale = 0.5;
          const sx = wx;
          const sy = wy - z * tiltScale + (r - rows / 2) * spacing * (tiltX - 1) * 0.3;

          points[r][c] = { sx, sy, z };
        }
      }

      /* draw wireframe lines */
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          /* fade by distance from cursor */
          const dx = p.sx - mx;
          const dy = p.sy - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const alpha = Math.max(0, 1 - dist / 320) * 0.35;

          if (alpha < 0.01) continue;

          /* color based on height */
          const hue = 200 + p.z * 0.5;
          const lightness = 55 + p.z * 0.3;
          const color = `hsla(${hue}, 80%, ${lightness}%, ${alpha})`;

          ctx.strokeStyle = color;
          ctx.lineWidth = 0.6;

          /* horizontal line to right neighbor */
          if (c < cols - 1) {
            const pn = points[r][c + 1];
            const dn = Math.sqrt((pn.sx - mx) ** 2 + (pn.sy - my) ** 2);
            const an = Math.max(0, 1 - dn / 320) * 0.35;
            if (an > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p.sx, p.sy);
              ctx.lineTo(pn.sx, pn.sy);
              ctx.stroke();
            }
          }

          /* vertical line to bottom neighbor */
          if (r < rows - 1) {
            const pn = points[r + 1][c];
            const dn = Math.sqrt((pn.sx - mx) ** 2 + (pn.sy - my) ** 2);
            const an = Math.max(0, 1 - dn / 320) * 0.35;
            if (an > 0.01) {
              ctx.beginPath();
              ctx.moveTo(p.sx, p.sy);
              ctx.lineTo(pn.sx, pn.sy);
              ctx.stroke();
            }
          }
        }
      }

      /* subtle glow under cursor */
      const grd = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
      grd.addColorStop(0, "rgba(56,189,248,0.06)");
      grd.addColorStop(0.5, "rgba(56,189,248,0.02)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(mx - 200, my - 200, 400, 400);

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
