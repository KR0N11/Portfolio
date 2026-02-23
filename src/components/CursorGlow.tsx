"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
}

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const particles = useRef<Particle[]>([]);
  const frameCount = useRef(0);

  useEffect(() => {
    /* skip on touch-only devices */
    if (typeof window !== "undefined" && "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches) {
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
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;

    const loop = () => {
      frameCount.current++;

      /* smooth follow */
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.12;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.12;

      /* move glow div */
      glow.style.transform = `translate(${smooth.current.x - 200}px, ${smooth.current.y - 200}px)`;

      /* spawn particles every few frames */
      if (frameCount.current % 3 === 0 && mouse.current.x > 0) {
        const hue = 195 + Math.random() * 30; /* blue range */
        particles.current.push({
          x: mouse.current.x + (Math.random() - 0.5) * 30,
          y: mouse.current.y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.3,
          life: 0,
          maxLife: 40 + Math.random() * 30,
          size: 1.5 + Math.random() * 2,
          hue,
        });
      }

      /* draw particles */
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current = particles.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.005;

        const progress = p.life / p.maxLife;
        const alpha = progress < 0.3 ? progress / 0.3 : 1 - (progress - 0.3) / 0.7;
        const size = p.size * (1 - progress * 0.5);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${alpha * 0.6})`;
        ctx.fill();
        return true;
      });

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
      {/* particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9999 }}
        aria-hidden="true"
      />
    </>
  );
}
