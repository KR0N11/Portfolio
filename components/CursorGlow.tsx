"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

/*
  A soft light that trails the cursor - the "torch on metal" effect.
  Mounts only for mouse users; skipped on touch and reduced motion.
*/
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  const mx = useMotionValue(-1000);
  const my = useMotionValue(-1000);
  const x = useSpring(mx, { stiffness: 120, damping: 24, mass: 0.4 });
  const y = useSpring(my, { stiffness: 120, damping: 24, mass: 0.4 });

  useEffect(() => {
    if (reduced || !window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    /* Offset by half the glow size so the light centers on the cursor. */
    const move = (e: PointerEvent) => {
      mx.set(e.clientX - 320);
      my.set(e.clientY - 320);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, mx, my]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[40rem] w-[40rem] rounded-full mix-blend-screen"
      style={{
        x,
        y,
        background:
          "radial-gradient(closest-side, rgb(255 255 255 / 0.055), transparent 70%)",
      }}
    />
  );
}
