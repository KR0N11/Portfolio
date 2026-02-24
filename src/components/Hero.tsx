"use client";

import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-end pb-[12%] overflow-hidden"
    >
      {/* Background with subtle animated gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#141414]" />

        {/* Subtle color accents */}
        <motion.div
          className="absolute top-[10%] right-[20%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "radial-gradient(circle, #E50914, transparent)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.05, 0.03] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent)" }}
          animate={{ scale: [1.1, 1, 1.1], opacity: [0.02, 0.04, 0.02] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Bottom gradient fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-[40%] netflix-gradient-bottom" />
        {/* Left gradient for text readability */}
        <div className="absolute inset-0 netflix-gradient-left" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-[4%] max-w-3xl">
        {/* Category tag */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center gap-2 mb-4"
        >
          <div className="w-1 h-6 bg-[#E50914] rounded-full" />
          <span className="text-sm text-[#999] tracking-[0.3em] uppercase font-medium">
            Portfolio
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-[0.9] mb-5"
        >
          Ping Chun
          <br />
          Lui
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-[#ddd] text-base md:text-lg leading-relaxed mb-8 max-w-xl"
        >
          Software Developer specializing in AI agents, cloud architecture,
          and full-stack development. Building products that move fast
          and solve real problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex items-center gap-3"
        >
          <button
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-md font-semibold text-sm md:text-base hover:bg-white/80 transition-colors cursor-pointer"
          >
            <Play size={20} fill="black" />
            View Projects
          </button>
          <button
            onClick={() => {
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 px-6 md:px-8 py-2.5 md:py-3 bg-[#6d6d6eb3] text-white rounded-md font-semibold text-sm md:text-base hover:bg-[#6d6d6e66] transition-colors cursor-pointer"
          >
            <Info size={20} />
            More Info
          </button>
        </motion.div>
      </div>
    </section>
  );
}
