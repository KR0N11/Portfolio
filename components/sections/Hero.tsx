"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import type { Variants } from "framer-motion";
import ChromeText from "@/components/ChromeText";
import MagneticButton from "@/components/MagneticButton";
import { identity } from "@/lib/content";
import { DUR, EASE_METAL } from "@/lib/motion";

/*
  Hero - the reveal. Name anchored low-left like an engraving,
  metadata plate top-right, and a huge turntable ring bleeding
  off the right edge with a slow-orbiting light spot.
*/
export default function Hero() {
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);

  /* Parallax as the hero scrolls away - transforms/opacity only. */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const ringY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* On-load staggered rise (not whileInView - this plays immediately). */
  const parent: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : 0.11,
        delayChildren: reduced ? 0 : 0.2,
      },
    },
  };
  const rise: Variants = {
    hidden: { opacity: 0, y: reduced ? 0 : 36 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.01 : DUR.slow, ease: EASE_METAL },
    },
  };

  /* Name: leading words in solid silver, final word gets the shimmer. */
  const words = identity.name.trim().split(/\s+/);
  const leadWords = words.slice(0, -1).join(" ");
  const lastWord = words.at(-1) ?? identity.name;

  /* Engraved plate: subline broken at punctuation, meaning untouched. */
  const sublineLines = identity.subline.split(/(?<=[.,])\s+/);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-dvh flex-col"
    >
      {/* ---------- background layer ---------- */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* top radial spotlight */}
        <div className="absolute -top-44 left-1/2 h-[38rem] w-[72rem] -translate-x-1/2 [background:radial-gradient(ellipse_at_center,rgba(255,255,255,0.055)_0%,transparent_62%)]" />

        {/* drifting silver blob */}
        <div className="absolute -left-40 top-[36%] h-[26rem] w-[26rem] rounded-full bg-silver opacity-[0.05] blur-[90px] animate-float md:-left-56 md:h-[38rem] md:w-[38rem]" />

        {/* turntable ring - hairline circle + orbiting conic light spot */}
        <motion.div
          style={reduced ? undefined : { y: ringY }}
          className="absolute -right-44 top-[14%] sm:-right-64 md:-right-80 md:top-[2%]"
        >
          <motion.div
            className="relative h-[30rem] w-[30rem] md:h-[54rem] md:w-[54rem] lg:h-[62rem] lg:w-[62rem]"
            animate={reduced ? undefined : { rotate: 360 }}
            transition={
              reduced
                ? undefined
                : { duration: 90, ease: "linear", repeat: Infinity }
            }
          >
            <div className="absolute inset-0 rounded-full border border-white/[0.07]" />
            <div className="absolute inset-0 rounded-full [background:conic-gradient(from_240deg,transparent_0deg,rgba(247,247,249,0.5)_20deg,rgba(247,247,249,0.08)_48deg,transparent_72deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%_-_2.5px),#000_calc(100%_-_1px))] [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%_-_2.5px),#000_calc(100%_-_1px))]" />
            <div className="absolute inset-8 rounded-full border border-white/[0.04] md:inset-14" />
          </motion.div>
        </motion.div>
      </div>

      {/* ---------- content ---------- */}
      <motion.div
        variants={parent}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pt-14 md:px-10"
      >
        {/* engraved metadata plate - top-right on desktop, leads on mobile */}
        <motion.div variants={rise} className="grid grid-cols-12 pt-10 md:pt-16">
          <p className="col-span-12 font-mono text-[10px] uppercase leading-[2] tracking-[0.18em] text-steel md:col-span-6 md:col-start-7 md:text-right md:text-[11px] md:tracking-[0.25em]">
            {sublineLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </motion.div>

        <div className="min-h-10 flex-1" />

        {/* name block - anchored low-left, parallaxes away on scroll */}
        <motion.div
          style={reduced ? undefined : { y: nameY, opacity: nameOpacity }}
          className="grid grid-cols-12 gap-x-6"
        >
          <div className="col-span-12 lg:col-span-11">
            <motion.div
              variants={rise}
              className="mb-5 flex items-center gap-4 md:mb-7"
            >
              <span
                aria-hidden
                className="h-px w-10 bg-gradient-to-r from-white/50 to-white/5 md:w-16"
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel md:text-xs">
                {identity.role}
              </span>
            </motion.div>

            <motion.h1
              variants={rise}
              className="font-display text-[clamp(3.2rem,11vw,8rem)] font-extrabold leading-[0.95] tracking-tight"
            >
              {leadWords && (
                <span className="block text-silver">{leadWords}</span>
              )}
              <ChromeText shimmer className="block">
                {lastWord}
              </ChromeText>
            </motion.h1>
          </div>

          <motion.p
            variants={rise}
            className="col-span-12 mt-6 max-w-lg text-base leading-relaxed text-steel md:mt-8 md:text-lg lg:col-span-8"
          >
            {identity.tagline}
          </motion.p>

          <motion.div
            variants={rise}
            className="col-span-12 mt-8 flex flex-wrap items-center gap-4 md:mt-10"
          >
            <MagneticButton href="#projects" variant="chrome">
              View Work
            </MagneticButton>
            <MagneticButton href="#contact" variant="ghost">
              Contact
            </MagneticButton>
          </motion.div>
        </motion.div>

        {/* scroll cue - bottom-right, counterweight to the name */}
        <motion.div
          variants={rise}
          className="mt-12 flex justify-end pb-7 md:mt-16 md:pb-9"
        >
          <div className="flex flex-col items-center gap-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-steel">
              Scroll
            </span>
            <motion.span
              aria-hidden
              className="block h-10 w-px origin-top bg-gradient-to-b from-white/60 via-white/25 to-transparent"
              animate={reduced ? undefined : { scaleY: [0.15, 1, 0.15] }}
              transition={
                reduced
                  ? undefined
                  : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
              }
            />
          </div>
        </motion.div>
      </motion.div>

      {/* hairline separating hero from the next section */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </section>
  );
}
