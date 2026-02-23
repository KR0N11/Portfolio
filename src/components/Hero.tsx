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
        // Starry deep-space with gentle glowing particles
        const starCount = 120;
        for (let i = 0; i < starCount; i++) {
          const seed = i * 7919;
          const x = ((seed * 13) % w);
          const y = ((seed * 17) % h);
          const twinkle =
            0.3 + 0.7 * Math.abs(Math.sin(time * 0.001 + i * 0.5));
          const size = ((seed % 3) + 1) * twinkle;

          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(148, 163, 184, ${0.2 + twinkle * 0.6})`;
          ctx.fill();
        }

        // Floating glow orbs
        for (let i = 0; i < 5; i++) {
          const cx = w * (0.15 + (i * 0.18));
          const cy =
            h * 0.5 +
            Math.sin(time * 0.0005 + i * 1.5) * h * 0.15;
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
        // Soft, slow-moving gradient orbs for light mode
        const orbs = [
          { x: 0.2, y: 0.3, r: 200, color: "rgba(14, 165, 233, 0.08)" },
          { x: 0.7, y: 0.2, r: 250, color: "rgba(56, 189, 248, 0.06)" },
          { x: 0.5, y: 0.7, r: 180, color: "rgba(125, 211, 252, 0.07)" },
          { x: 0.85, y: 0.6, r: 220, color: "rgba(14, 165, 233, 0.05)" },
          { x: 0.1, y: 0.8, r: 160, color: "rgba(56, 189, 248, 0.06)" },
        ];

        orbs.forEach((orb, i) => {
          const cx =
            w * orb.x + Math.sin(time * 0.0003 + i * 2) * 60;
          const cy =
            h * orb.y + Math.cos(time * 0.0004 + i * 1.5) * 50;
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
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
          {headline.split("").map((char, i) => (
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
