"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SkillsMobile from "./SkillsMobile";

const SkillsGlobe = dynamic(() => import("./SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] flex items-center justify-center text-white/20">
      Loading...
    </div>
  ),
});

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section
      id="skills"
      className="section-padding max-w-5xl mx-auto"
      aria-label="Skills"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12"
      >
        <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
          02 &mdash; skills
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
          Tech Stack
        </h2>
        <p className="text-white/30 text-sm max-w-lg">
          {isMobile
            ? "Tap a category to explore."
            : "Drag the globe to explore. Filter by category."}
        </p>
      </motion.div>

      {isMobile ? <SkillsMobile /> : <SkillsGlobe />}
    </section>
  );
}
