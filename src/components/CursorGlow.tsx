"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen particle field that drifts gently and gets
 * pulled toward the cursor when it's nearby.
 */

const PARTICLE_COUNT = 180;
const ATTRACT_RADIUS = 160;
const ATTRACT_STRENGTH = 0.045;
const RETURN_STRENGTH = 0.015;
const DRIFT_SPEED = 0.15;
const PARTICLE_SIZE_MIN = 1;
const PARTICLE_SIZE_MAX = 2.5;

interface Particle {
  x: number;
  y: number;
  homeX: number;
  homeY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  driftAngle: number;
  driftSpeed: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

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

    let particles: Particle[] = [];
    let w = 0,
      h = 0;

    const init = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        particles.push({
          x,
          y,
          homeX: x,
          homeY: y,
          vx: 0,
          vy: 0,
          size:
            PARTICLE_SIZE_MIN +
            Math.random() * (PARTICLE_SIZE_MAX - PARTICLE_SIZE_MIN),
          alpha: 0.15 + Math.random() * 0.45,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: (0.5 + Math.random() * 0.5) * DRIFT_SPEED,
        });
      }
    };
    init();
    window.addEventListener("resize", init);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;

    const loop = () => {
      ctx.clearRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const p of particles) {
        /* gentle ambient drift */
        p.driftAngle += 0.002;
        const driftX = Math.cos(p.driftAngle) * p.driftSpeed;
        const driftY = Math.sin(p.driftAngle) * p.driftSpeed;

        /* attraction toward cursor */
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ATTRACT_RADIUS && dist > 0) {
          const force = (1 - dist / ATTRACT_RADIUS) * ATTRACT_STRENGTH;
          p.vx += dx * force;
          p.vy += dy * force;
        }

        /* spring back toward home */
        p.vx += (p.homeX - p.x) * RETURN_STRENGTH;
        p.vy += (p.homeY - p.y) * RETURN_STRENGTH;

        /* apply drift */
        p.vx += driftX * 0.05;
        p.vy += driftY * 0.05;

        /* damping */
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.x += p.vx;
        p.y += p.vy;

        /* draw */
        const proximity = dist < ATTRACT_RADIUS ? 1 - dist / ATTRACT_RADIUS : 0;
        const glow = p.alpha + proximity * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + proximity * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${glow})`;
        ctx.fill();

        /* draw faint connecting lines to nearby cursor */
        if (proximity > 0.2) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(56, 189, 248, ${proximity * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      /* subtle glow around cursor */
      if (mx > 0 && my > 0) {
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, 120);
        gradient.addColorStop(0, "rgba(56, 189, 248, 0.04)");
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, 120, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", init);
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
