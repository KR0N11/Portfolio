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

        {/* Right — Profile picture (faded into background) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Soft atmospheric glow behind photo */}
            <div className="absolute -inset-16 bg-[#E50914]/[0.04] rounded-full blur-[80px]" />
            <div className="absolute -inset-20 bg-white/[0.015] rounded-full blur-[100px]" />

            {/* Photo with fade-out edges */}
            <div className="relative w-[280px] h-[380px] sm:w-[320px] sm:h-[430px] md:w-[380px] md:h-[500px]">
              <Image
                src="/image/me.jpg"
                alt="Ping Chun Lui"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 280px, 380px"
                priority
                style={{
                  maskImage: "radial-gradient(ellipse 70% 65% at 50% 35%, black 30%, transparent 72%)",
                  WebkitMaskImage: "radial-gradient(ellipse 70% 65% at 50% 35%, black 30%, transparent 72%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
