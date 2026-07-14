"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import type { ReactNode } from "react";

const spring = { stiffness: 180, damping: 16, mass: 0.2 };

/*
  Anchor styled as a button that leans toward the cursor.
  The label counter-translates slightly for a layered, weighty feel.
  Magnetism is skipped on touch devices and under reduced motion.
*/
export default function MagneticButton({
  href,
  children,
  variant = "chrome",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "chrome" | "ghost";
  className?: string;
  external?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring);
  const y = useSpring(my, spring);
  /* Label counter-drifts 20% behind the shell for a layered, weighty feel. */
  const lx = useTransform(x, (v) => v * -0.2);
  const ly = useTransform(y, (v) => v * -0.2);

  function onPointerMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - (rect.left + rect.width / 2)) * 0.35);
    my.set((e.clientY - (rect.top + rect.height / 2)) * 0.35);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  const styles =
    variant === "chrome"
      ? "glint bg-gradient-to-b from-[#f2f2f4] via-[#c9c9d1] to-[#9a9aa3] text-carbon font-medium"
      : "border border-white/15 text-silver hover:border-white/40 hover:bg-white/[0.04]";

  return (
    <motion.a
      ref={ref}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x, y }}
      className={`inline-flex h-12 min-w-32 cursor-pointer select-none items-center justify-center gap-2 rounded-full px-7 text-sm tracking-wide transition-colors duration-300 ${styles} ${className}`}
    >
      <motion.span
        style={{ x: lx, y: ly }}
        className="inline-flex items-center gap-2"
      >
        {children}
      </motion.span>
    </motion.a>
  );
}
