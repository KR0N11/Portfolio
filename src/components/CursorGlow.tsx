"use client";

import { useEffect, useRef } from "react";

interface TrailPoint {
  x: number;
  y: number;
}

const TRAIL_LENGTH = 28;
const EASE = 0.18;

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const trail = useRef<TrailPoint[]>([]);
  const hasMoved = useRef(false);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ontouchstart" in window &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas || !glow) return;

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
      if (!hasMoved.current) hasMoved.current = true;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;

    const loop = () => {
      /* smooth follow for glow */
      smooth.current.x += (mouse.current.x - smooth.current.x) * EASE;
      smooth.current.y += (mouse.current.y - smooth.current.y) * EASE;

      glow.style.transform = `translate(${smooth.current.x - 200}px, ${smooth.current.y - 200}px)`;

      if (!hasMoved.current) {
        raf = requestAnimationFrame(loop);
        return;
      }

      /* build trail — each point eases toward the one ahead of it */
      if (trail.current.length === 0) {
        for (let i = 0; i < TRAIL_LENGTH; i++) {
          trail.current.push({ x: mouse.current.x, y: mouse.current.y });
        }
      }

      /* head follows mouse directly */
      trail.current[0].x = mouse.current.x;
      trail.current[0].y = mouse.current.y;

      /* each subsequent point eases toward the previous one */
      for (let i = 1; i < trail.current.length; i++) {
        const prev = trail.current[i - 1];
        const cur = trail.current[i];
        const ease = 0.35 - i * 0.008; /* slower ease toward tail */
        cur.x += (prev.x - cur.x) * Math.max(ease, 0.06);
        cur.y += (prev.y - cur.y) * Math.max(ease, 0.06);
      }

      /* draw smooth trail */
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const len = trail.current.length;
      if (len < 2) {
        raf = requestAnimationFrame(loop);
        return;
      }

      /* draw a tapered, fading ribbon using line segments */
      for (let i = 0; i < len - 1; i++) {
        const t = i / (len - 1); /* 0 = head, 1 = tail */
        const a = trail.current[i];
        const b = trail.current[i + 1];

        /* opacity: strong at head, fading toward tail */
        const alpha = (1 - t) * 0.45;

        /* width: thick at head, thin at tail */
        const width = (1 - t) * 18 + 1;

        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);

        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
        ctx.lineWidth = width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      /* soft glow circle at the cursor tip */
      const head = trail.current[0];
      const gradient = ctx.createRadialGradient(
        head.x,
        head.y,
        0,
        head.x,
        head.y,
        22
      );
      gradient.addColorStop(0, "rgba(56, 189, 248, 0.25)");
      gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.08)");
      gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.beginPath();
      ctx.arc(head.x, head.y, 22, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

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
    <>
      {/* soft radial glow */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56,189,248,0.08) 0%, rgba(56,189,248,0.03) 40%, transparent 70%)",
          zIndex: 9998,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      {/* trail canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      />
    </>
  );
}
