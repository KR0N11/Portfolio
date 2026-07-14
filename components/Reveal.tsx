"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { DUR, EASE_METAL, VIEWPORT } from "@/lib/motion";

/*
  Scroll-triggered rise + fade. Wrap any block in it.
  Under prefers-reduced-motion it renders content with a plain fade.
*/
export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{
        duration: reduced ? 0.01 : DUR.base,
        delay: reduced ? 0 : delay,
        ease: EASE_METAL,
      }}
    >
      {children}
    </motion.div>
  );
}
