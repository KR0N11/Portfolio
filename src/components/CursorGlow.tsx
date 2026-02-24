"use client";

import { useEffect, useRef } from "react";

const TRAIL_LENGTH = 20;
const BASE_SIZE = 8;
const PARTICLE_COUNT = 60;
const ATTRACTION_RADIUS = 200;
const ATTRACTION_FORCE = 0.015;

interface TrailPoint {
  x: number;
  y: number;
}

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
  const mouse = useRef({ x: -100, y: -100 });
  const trail = useRef<TrailPoint[]>([]);
  const particles = useRef<Particle[]>([]);
  const scrollOffset = useRef(0);

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

    // Initialize floating particles spread across the page
    const initParticles = () => {
      particles.current = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particles.current.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          baseX: x,
          baseY: y,
          size: Math.random() * 2 + 0.5,
          alpha: Math.random() * 0.3 + 0.05,
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
    const onScroll = () => {
      scrollOffset.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // -- Trail --
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

      // Main cursor dot
      ctx.beginPath();
      ctx.arc(t[0].x, t[0].y, 4, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.fill();

      // -- Particles with cursor attraction --
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];

        // Distance to cursor
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACTION_RADIUS && mx > 0 && my > 0) {
          // Pull toward cursor
          const force = (ATTRACTION_RADIUS - dist) / ATTRACTION_RADIUS;
          p.vx += dx * ATTRACTION_FORCE * force;
          p.vy += dy * ATTRACTION_FORCE * force;
        } else {
          // Drift back to base position (with gentle wander)
          p.vx += (p.baseX - p.x) * 0.002;
          p.vy += (p.baseY - p.y) * 0.002;
        }

        // Damping
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around screen
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        // Alpha boost near cursor
        let drawAlpha = p.alpha;
        if (dist < ATTRACTION_RADIUS && mx > 0 && my > 0) {
          const proximity = 1 - dist / ATTRACTION_RADIUS;
          drawAlpha = p.alpha + proximity * 0.4;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 220, ${drawAlpha})`;
        ctx.fill();

        // Draw faint lines between close particles near cursor
        if (dist < ATTRACTION_RADIUS * 0.8 && mx > 0 && my > 0) {
          for (let j = i + 1; j < particles.current.length; j++) {
            const p2 = particles.current[j];
            const pdx = p2.x - p.x;
            const pdy = p2.y - p.y;
            const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
            if (pdist < 80) {
              const lineAlpha = (1 - pdist / 80) * 0.12;
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(200, 200, 220, ${lineAlpha})`;
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
      window.removeEventListener("scroll", onScroll);
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
