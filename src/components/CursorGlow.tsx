"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen aggressive particle field with smooth trails,
 * strong cursor attraction, and explosive energy.
 */

const PARTICLE_COUNT = 300;
const ATTRACT_RADIUS = 280;
const ATTRACT_STRENGTH = 0.12;
const RETURN_STRENGTH = 0.008;
const DRIFT_SPEED = 0.25;
const PARTICLE_SIZE_MIN = 1;
const PARTICLE_SIZE_MAX = 3.5;
const LINE_DISTANCE = 120;
const REPEL_RADIUS = 50;
const REPEL_STRENGTH = 0.8;
const TRAIL_ALPHA = 0.12;

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
  hue: number;
  trail: { x: number; y: number }[];
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const prevMouse = useRef({ x: -9999, y: -9999 });
  const mouseSpeed = useRef(0);

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
          alpha: 0.2 + Math.random() * 0.5,
          driftAngle: Math.random() * Math.PI * 2,
          driftSpeed: (0.5 + Math.random() * 0.5) * DRIFT_SPEED,
          hue: 190 + Math.random() * 30,
          trail: [],
        });
      }
    };
    init();
    window.addEventListener("resize", init);

    const onMove = (e: MouseEvent) => {
      prevMouse.current.x = mouse.current.x;
      prevMouse.current.y = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      const dx = mouse.current.x - prevMouse.current.x;
      const dy = mouse.current.y - prevMouse.current.y;
      mouseSpeed.current = Math.sqrt(dx * dx + dy * dy);
    };
    const onLeave = () => {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
      mouseSpeed.current = 0;
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;

    const loop = () => {
      /* Semi-transparent clear for motion blur trail effect */
      ctx.fillStyle = "rgba(6, 12, 26, 0.15)";
      ctx.fillRect(0, 0, w, h);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const speed = Math.min(mouseSpeed.current, 60);
      const dynamicRadius = ATTRACT_RADIUS + speed * 3;
      const dynamicStrength = ATTRACT_STRENGTH + speed * 0.003;

      for (const p of particles) {
        /* ambient drift */
        p.driftAngle += 0.003;
        const driftX = Math.cos(p.driftAngle) * p.driftSpeed;
        const driftY = Math.sin(p.driftAngle) * p.driftSpeed;

        /* distance to cursor */
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        /* strong attraction to cursor */
        if (dist < dynamicRadius && dist > 0) {
          const force = (1 - dist / dynamicRadius) * dynamicStrength;
          p.vx += dx * force;
          p.vy += dy * force;

          /* inner repulsion — particles scatter when too close */
          if (dist < REPEL_RADIUS) {
            const repelForce = (1 - dist / REPEL_RADIUS) * REPEL_STRENGTH;
            p.vx -= (dx / dist) * repelForce;
            p.vy -= (dy / dist) * repelForce;
          }
        }

        /* spring back to home */
        p.vx += (p.homeX - p.x) * RETURN_STRENGTH;
        p.vy += (p.homeY - p.y) * RETURN_STRENGTH;

        /* drift */
        p.vx += driftX * 0.08;
        p.vy += driftY * 0.08;

        /* damping */
        p.vx *= 0.94;
        p.vy *= 0.94;

        p.x += p.vx;
        p.y += p.vy;

        /* store trail positions */
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 6) p.trail.shift();

        /* draw trail */
        if (p.trail.length > 1) {
          for (let t = 0; t < p.trail.length - 1; t++) {
            const trailAlpha = (t / p.trail.length) * TRAIL_ALPHA * p.alpha;
            const trailSize = p.size * (t / p.trail.length) * 0.6;
            ctx.beginPath();
            ctx.arc(p.trail[t].x, p.trail[t].y, trailSize, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${trailAlpha})`;
            ctx.fill();
          }
        }

        /* draw main particle */
        const proximity = dist < dynamicRadius ? 1 - dist / dynamicRadius : 0;
        const glow = p.alpha + proximity * 0.6;
        const particleSize = p.size + proximity * 3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleSize, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 85%, 72%, ${glow})`;
        ctx.fill();

        /* bright core */
        if (proximity > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, particleSize * 0.4, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 90%, ${proximity * 0.8})`;
          ctx.fill();
        }

        /* connecting lines — more aggressive */
        if (proximity > 0.1) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `hsla(${p.hue}, 80%, 70%, ${proximity * 0.15})`;
          ctx.lineWidth = proximity * 1.5;
          ctx.stroke();
        }
      }

      /* inter-particle connections for nearby particles near cursor */
      for (let i = 0; i < particles.length; i++) {
        const pi = particles[i];
        const piDist = Math.sqrt((mx - pi.x) ** 2 + (my - pi.y) ** 2);
        if (piDist > dynamicRadius * 0.6) continue;

        for (let j = i + 1; j < particles.length; j++) {
          const pj = particles[j];
          const pjDist = Math.sqrt((mx - pj.x) ** 2 + (my - pj.y) ** 2);
          if (pjDist > dynamicRadius * 0.6) continue;

          const interDist = Math.sqrt((pi.x - pj.x) ** 2 + (pi.y - pj.y) ** 2);
          if (interDist < LINE_DISTANCE) {
            const alpha = (1 - interDist / LINE_DISTANCE) * 0.12;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.strokeStyle = `hsla(200, 80%, 70%, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      /* pulsing glow around cursor */
      if (mx > 0 && my > 0) {
        const pulseSize = 160 + Math.sin(Date.now() * 0.003) * 30 + speed * 2;
        const gradient = ctx.createRadialGradient(mx, my, 0, mx, my, pulseSize);
        gradient.addColorStop(0, `rgba(56, 189, 248, ${0.06 + speed * 0.001})`);
        gradient.addColorStop(0.5, `rgba(56, 189, 248, ${0.02 + speed * 0.0005})`);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(mx, my, pulseSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }

      mouseSpeed.current *= 0.9;
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
