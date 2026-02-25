"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Play, Info } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#141414]" />

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

        <div className="absolute bottom-0 left-0 right-0 h-[40%] netflix-gradient-bottom" />
      </div>

      {/* Two-column content */}
      <div className="relative z-10 w-full px-[4%] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-[68px]">
        {/* Left — Text */}
        <div className="order-2 md:order-1">
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

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none mb-5 whitespace-nowrap"
          >
            Ping Chun Lui
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="text-[#E50914] text-sm font-semibold tracking-wide uppercase">
              Software Developer
            </span>
            <span className="w-1 h-1 rounded-full bg-[#666]" />
            <span className="text-[#666] text-sm">Montr&eacute;al, QC</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-[#ddd] text-base md:text-lg leading-relaxed mb-8 max-w-xl"
          >
            Specializing in AI agents, cloud architecture, and full-stack
            development. Building products that move fast and solve real problems.
          </motion.p>

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

        {/* Right — Profile picture */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Glow behind photo */}
            <div className="absolute -inset-6 bg-[#E50914]/[0.06] rounded-full blur-3xl" />
            <div className="absolute -inset-10 bg-white/[0.02] rounded-full blur-3xl" />

            {/* Photo */}
            <div className="relative w-[260px] h-[340px] sm:w-[300px] sm:h-[390px] md:w-[340px] md:h-[440px] rounded-2xl overflow-hidden border-2 border-white/[0.08] shadow-2xl">
              <Image
                src="/image/me.jpg"
                alt="Ping Chun Lui"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 260px, 340px"
                priority
              />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#141414] to-transparent" />
              {/* Subtle vignette */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.3)]" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
