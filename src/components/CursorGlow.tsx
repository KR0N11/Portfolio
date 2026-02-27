"use client";

import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 60;
const ATTRACTION_RADIUS = 200;
const ATTRACTION_FORCE = 0.015;

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  size: number;
  alpha: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const particles = useRef<Particle[]>([]);

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

    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          baseX: x,
          baseY: y,
          size: Math.random() * 2.5 + 0.5,
          alpha: Math.random() * 0.25 + 0.04,
        });
      }
    };
    initParticles();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -1000;
      mouse.current.y = -1000;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACTION_RADIUS && mx > 0 && my > 0) {
          const force = (ATTRACTION_RADIUS - dist) / ATTRACTION_RADIUS;
          p.vx += dx * ATTRACTION_FORCE * force;
          p.vy += dy * ATTRACTION_FORCE * force;
        } else {
          // Gentle drift back to base with slight wander
          p.vx += (p.baseX - p.x) * 0.003;
          p.vy += (p.baseY - p.y) * 0.003;
          p.vx += (Math.random() - 0.5) * 0.02;
          p.vy += (Math.random() - 0.5) * 0.02;
        }

        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Alpha boost near cursor
        let drawAlpha = p.alpha;
        let drawSize = p.size;
        if (dist < ATTRACTION_RADIUS && mx > 0 && my > 0) {
          const proximity = 1 - dist / ATTRACTION_RADIUS;
          drawAlpha = p.alpha + proximity * 0.4;
          drawSize = p.size + proximity * 1.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(229, 80, 80, ${drawAlpha})`;
        ctx.fill();

        // Faint glow around particles near cursor
        if (dist < ATTRACTION_RADIUS * 0.5 && mx > 0 && my > 0) {
          const glowAlpha = (1 - dist / (ATTRACTION_RADIUS * 0.5)) * 0.06;
          ctx.beginPath();
          ctx.arc(p.x, p.y, drawSize * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(229, 9, 20, ${glowAlpha})`;
          ctx.fill();
        }

        // Lines between close particles near cursor
        if (dist < ATTRACTION_RADIUS * 0.8 && mx > 0 && my > 0) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const p2 = particles.current[j];
            const pdx = p2.x - p.x;
            const pdy = p2.y - p.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
            if (pdist < 90) {
              const lineAlpha = (1 - pdist / 90) * 0.1;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(229, 60, 60, ${lineAlpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

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
