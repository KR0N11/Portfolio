"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const scrollToWork = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.015] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 text-center max-w-3xl mx-auto px-6">
        {/* Name */}
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          Ping Chun Lui
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-base sm:text-lg text-white/30 font-light tracking-[0.2em] uppercase mb-6"
        >
          Software Developer
        </motion.p>

        {/* Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="text-sm text-white/20 font-light italic tracking-wide mb-16"
        >
          The World Responds Only to Motion
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          onClick={scrollToWork}
          className="group inline-flex flex-col items-center gap-2 text-white/25 hover:text-white/50 transition-colors cursor-pointer"
          aria-label="Scroll to view my work"
        >
          <span className="text-xs font-medium tracking-[0.2em] uppercase">
            Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
