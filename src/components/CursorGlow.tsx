"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 20;
const BASE_SIZE = 8;

interface TrailPoint {
  x: number;
  y: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -100, y: -100 });
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

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trail.current.push({ x: -100, y: -100 });
    }

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
    const onLeave = () => {
      mouse.current.x = -100;
      mouse.current.y = -100;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const t = trail.current;
      t[0].x += (mouse.current.x - t[0].x) * 0.35;
      t[0].y += (mouse.current.y - t[0].y) * 0.35;

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const ease = 0.25 - i * 0.005;
        t[i].x += (t[i - 1].x - t[i].x) * Math.max(ease, 0.06);
        t[i].y += (t[i - 1].y - t[i].y) * Math.max(ease, 0.06);
      }

      for (let i = TRAIL_LENGTH - 1; i >= 0; i--) {
        const progress = i / TRAIL_LENGTH;
        const alpha = (1 - progress) * 0.35;
        const size = BASE_SIZE * (1 - progress * 0.6);

        ctx.beginPath();
        ctx.arc(t[i].x, t[i].y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 220, ${alpha})`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(t[0].x, t[0].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
