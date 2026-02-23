"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import SkillsMobile from "./SkillsMobile";

const SkillsGlobe = dynamic(() => import("./SkillsGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[480px] flex items-center justify-center text-text-muted">
      Loading skills...
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
      className="section-padding max-w-7xl mx-auto"
      aria-label="Skills"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8 md:mb-12"
      >
        <p className="text-primary text-sm font-semibold tracking-widest uppercase mb-2">
          Tech Stack
        </p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Skills</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          {isMobile
            ? "Tap a category to explore the skills within."
            : "Drag the globe to explore. Filter by category."}
        </p>
      </motion.div>

      {isMobile ? <SkillsMobile /> : <SkillsGlobe />}
    </section>
  );
}
