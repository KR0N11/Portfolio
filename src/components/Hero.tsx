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

      /* Minimal slow-drifting orbs — adds depth without competing with the ripple overlay */
      const orbs =
        theme === "dark"
          ? [
              { x: 0.25, y: 0.35, r: 260, c: "rgba(56, 189, 248, 0.04)" },
              { x: 0.7, y: 0.25, r: 300, c: "rgba(30, 100, 200, 0.035)" },
              { x: 0.5, y: 0.75, r: 240, c: "rgba(56, 189, 248, 0.03)" },
            ]
          : [
              { x: 0.2, y: 0.3, r: 200, c: "rgba(14, 165, 233, 0.08)" },
              { x: 0.7, y: 0.2, r: 250, c: "rgba(56, 189, 248, 0.06)" },
              { x: 0.5, y: 0.7, r: 180, c: "rgba(125, 211, 252, 0.07)" },
            ];

      orbs.forEach((orb, i) => {
        const cx = w * orb.x + Math.sin(time * 0.00025 + i * 2.2) * 70;
        const cy = h * orb.y + Math.cos(time * 0.0003 + i * 1.7) * 55;
        const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, orb.r);
        gradient.addColorStop(0, orb.c);
        gradient.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, orb.r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
    },
    [theme]
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
  const name = "Ping Chun Lui";

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
        {/* Name — large staggered letter reveal */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className={char === " " ? "inline" : "inline-block text-gradient"}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-lg sm:text-xl md:text-2xl text-text-muted font-light tracking-[0.25em] uppercase mb-8"
        >
          Software Developer
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="text-sm sm:text-base text-text-muted font-light italic tracking-wide mb-14"
        >
          The World Responds Only to Motion
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
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
