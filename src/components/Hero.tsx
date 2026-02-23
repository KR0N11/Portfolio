"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.clearRect(0, 0, w, h);

      if (theme === "dark") {
        const starCount = 120;
        for (let i = 0; i < starCount; i++) {
          const seed = i * 7919;
          const x = (seed * 13) % w;
          const y = (seed * 17) % h;
          const twinkle =
            0.3 + 0.7 * Math.abs(Math.sin(time * 0.001 + i * 0.5));
          const size = ((seed % 3) + 1) * twinkle;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${0.2 + twinkle * 0.6})`;
          ctx.fill();
        }

        for (let i = 0; i < 5; i++) {
          const cx = w * (0.15 + i * 0.18);
          const cy = h * 0.5 + Math.sin(time * 0.0005 + i * 1.5) * h * 0.15;
          const radius = 80 + Math.sin(time * 0.0008 + i) * 30;
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
          gradient.addColorStop(0, "rgba(56, 189, 248, 0.08)");
          gradient.addColorStop(0.5, "rgba(56, 189, 248, 0.03)");
          gradient.addColorStop(1, "rgba(56, 189, 248, 0)");
          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      } else {
        const orbs = [
          { x: 0.2, y: 0.3, r: 200, color: "rgba(14, 165, 233, 0.08)" },
          { x: 0.7, y: 0.2, r: 250, color: "rgba(56, 189, 248, 0.06)" },
          { x: 0.5, y: 0.7, r: 180, color: "rgba(125, 211, 252, 0.07)" },
          { x: 0.85, y: 0.6, r: 220, color: "rgba(14, 165, 233, 0.05)" },
          { x: 0.1, y: 0.8, r: 160, color: "rgba(56, 189, 248, 0.06)" },
        ];

        orbs.forEach((orb, i) => {
          const cx = w * orb.x + Math.sin(time * 0.0003 + i * 2) * 60;
          const cy = h * orb.y + Math.cos(time * 0.0004 + i * 1.5) * 50;
          const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
          gradient.addColorStop(0, orb.color);
          gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.beginPath();
          ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        });
      }
    },
    [theme],
  );

  useEffect(() => {
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

    const animate = (time: number) => {
      draw(ctx, canvas.width, canvas.height, time);
      animationRef.current = requestAnimationFrame(animate);
    };
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ── Kinetic Orbit ── Canvas-based infinity loop with trailing particles ── */
function KineticOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = 280;
    const H = 100;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = `${W}px`;
    canvas.style.height = `${H}px`;
    ctx.scale(dpr, dpr);

    const cx = W / 2;
    const cy = H / 2;
    const a = 100; // horizontal radius
    const b = 28; // vertical radius

    // Lemniscate of Bernoulli parametric
    const lemnX = (t: number) => {
      const s = Math.sin(t);
      const c = Math.cos(t);
      return cx + (a * c) / (1 + s * s);
    };
    const lemnY = (t: number) => {
      const s = Math.sin(t);
      const c = Math.cos(t);
      return cy + (b * s * c) / (1 + s * s);
    };

    const isDark = theme === "dark";
    const primaryR = isDark ? 56 : 14;
    const primaryG = isDark ? 189 : 165;
    const primaryB = 248;

    const TRAIL_LEN = 60;
    const trail: { x: number; y: number }[] = [];

    let startTime: number | null = null;

    const animate = (time: number) => {
      if (startTime === null) startTime = time;
      const elapsed = time - startTime;
      ctx.clearRect(0, 0, W, H);

      const speed = 0.0012;
      const t = elapsed * speed;

      // Current position on lemniscate
      const px = lemnX(t);
      const py = lemnY(t);

      trail.push({ x: px, y: py });
      if (trail.length > TRAIL_LEN) trail.shift();

      // Draw the faint lemniscate path
      ctx.beginPath();
      for (let i = 0; i <= 200; i++) {
        const angle = (i / 200) * Math.PI * 2;
        const x = lemnX(angle);
        const y = lemnY(angle);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.08)`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Draw trailing particles
      for (let i = 0; i < trail.length; i++) {
        const progress = i / trail.length;
        const alpha = progress * 0.6;
        const r = 1.5 + progress * 2;

        ctx.beginPath();
        ctx.arc(trail[i].x, trail[i].y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, ${alpha})`;
        ctx.fill();
      }

      // Draw main orb with glow
      const glowRadius = 20;
      const glow = ctx.createRadialGradient(px, py, 0, px, py, glowRadius);
      glow.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.4)`);
      glow.addColorStop(0.5, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.1)`);
      glow.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);
      ctx.beginPath();
      ctx.arc(px, py, glowRadius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();

      // Main orb
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgb(${primaryR}, ${primaryG}, ${primaryB})`;
      ctx.fill();

      // Bright center
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.fill();

      // Secondary orb (opposite phase)
      const t2 = t + Math.PI;
      const px2 = lemnX(t2);
      const py2 = lemnY(t2);

      const glow2 = ctx.createRadialGradient(px2, py2, 0, px2, py2, 14);
      glow2.addColorStop(0, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.25)`);
      glow2.addColorStop(1, `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0)`);
      ctx.beginPath();
      ctx.arc(px2, py2, 14, 0, Math.PI * 2);
      ctx.fillStyle = glow2;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(px2, py2, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${primaryR}, ${primaryG}, ${primaryB}, 0.7)`;
      ctx.fill();

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animRef.current);
  }, [theme]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 1.2 }}
      className="flex justify-center my-6 sm:my-8"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="max-w-full"
      />
    </motion.div>
  );
}

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.6 + i * 0.04,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export default function Hero() {
  const headline = "The World Responds Only to Motion";

  const scrollToWork = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      <AnimatedBackground />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main headline with staggered letter reveal */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-2">
          {headline.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={
                char === " " ? "inline" : "inline-block text-gradient"
              }
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Kinetic infinity orbit */}
        <KineticOrbit />

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light tracking-wide mb-12"
        >
          Ping Chun Lui{" "}
          <span className="text-primary font-normal">|</span> Software
          Developer
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          onClick={scrollToWork}
          className="group inline-flex flex-col items-center gap-2 text-text-muted hover:text-primary transition-colors cursor-pointer"
          aria-label="Scroll to view my work"
        >
          <span className="text-sm font-medium tracking-widest uppercase">
            View My Work
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown
              size={28}
              className="group-hover:text-primary transition-colors"
            />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
