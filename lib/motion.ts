import type { Variants } from "framer-motion";

/* One easing + duration vocabulary for the whole site. */
export const EASE_METAL = [0.16, 1, 0.3, 1] as const;

export const DUR = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

/* Standard scroll-reveal: rise + fade. Use with whileInView. */
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.base, ease: EASE_METAL },
  },
};

/* Parent container that staggers its fadeRise children. */
export const staggerParent: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

export const VIEWPORT = { once: true, amount: 0.25 } as const;
