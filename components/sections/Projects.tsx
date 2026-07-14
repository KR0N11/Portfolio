"use client";

/*
  03 / Projects - bento grid of the four project entries.
  Flagship card spans 7 cols × 2 rows, two medium cards stack beside it,
  and a slim full-width bar closes the grid. Hover reads as tilting metal:
  the card lifts 4px, a glint band sweeps across, and the arrow catches
  the light. All entrance + hover motion collapses under reduced motion.
*/

import { motion, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import type { ReactNode } from "react";
import Section from "@/components/Section";
import { projects } from "@/lib/content";
import {
  DUR,
  EASE_METAL,
  fadeRise,
  staggerParent,
  VIEWPORT,
} from "@/lib/motion";

/* Reduced-motion fallbacks: plain near-instant fade, no stagger. */
const REDUCED_CARD: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

const REDUCED_PARENT: Variants = { hidden: {}, visible: {} };

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-5 w-5 shrink-0 text-iron transition duration-300 ease-out group-hover:rotate-45 group-hover:text-chrome"
    >
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

function CardHeader({ index }: { index: string }) {
  return (
    <div className="relative z-10 flex items-start justify-between gap-4">
      <span
        aria-hidden
        className="font-mono text-[10px] uppercase tracking-[0.25em] text-iron md:text-xs"
      >
        {index}
      </span>
      <ArrowUpRight />
    </div>
  );
}

function CardTitle({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-2xl font-bold text-silver transition-colors duration-300 group-hover:text-chrome md:text-3xl">
      {children}
    </h3>
  );
}

function CardDescription({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-prose text-sm leading-relaxed text-steel md:text-base">
      {children}
    </p>
  );
}

function TagList({
  tags,
  className = "",
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-steel transition-colors duration-300 group-hover:border-white/25"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Card({
  variants,
  lift,
  href,
  title,
  className = "",
  children,
}: {
  variants: Variants;
  lift: boolean;
  href: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} on GitHub`}
      variants={variants}
      whileHover={lift ? { y: -4 } : undefined}
      transition={{ duration: DUR.fast, ease: EASE_METAL }}
      className={`metal-panel brushed glint group relative flex cursor-pointer flex-col justify-between gap-6 overflow-hidden rounded-2xl p-7 md:p-9 ${className}`}
    >
      {children}
    </motion.a>
  );
}

export default function Projects() {
  const reduced = useReducedMotion();
  const cardVariants = reduced ? REDUCED_CARD : fadeRise;
  const parentVariants = reduced ? REDUCED_PARENT : staggerParent;
  const [flagship, second, third, fourth] = projects;

  return (
    <Section id="projects" index="03" label="Projects">
      <h2 className="sr-only">Projects</h2>

      <motion.div
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={VIEWPORT}
        className="grid auto-rows-auto grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12"
      >
        {/* Flagship - large card, 7 cols × 2 rows */}
        <Card
          variants={cardVariants}
          lift={!reduced}
          href={flagship.href}
          title={flagship.title}
          className="lg:col-span-7 lg:row-span-2 lg:min-h-[420px]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-24 -top-24 z-0 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08),transparent_70%)]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -right-3 z-0 select-none font-display text-[7rem] font-extrabold leading-none text-stroke md:text-[12rem]"
          >
            01
          </span>

          <CardHeader index="P.01" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <CardTitle>{flagship.title}</CardTitle>
              <CardDescription>{flagship.description}</CardDescription>
            </div>
            <TagList tags={flagship.tags} />
          </div>
        </Card>

        {/* Medium - right column, top */}
        <Card
          variants={cardVariants}
          lift={!reduced}
          href={second.href}
          title={second.title}
          className="lg:col-span-5"
        >
          <CardHeader index="P.02" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <CardTitle>{second.title}</CardTitle>
              <CardDescription>{second.description}</CardDescription>
            </div>
            <TagList tags={second.tags} />
          </div>
        </Card>

        {/* Medium - right column, bottom */}
        <Card
          variants={cardVariants}
          lift={!reduced}
          href={third.href}
          title={third.title}
          className="lg:col-span-5"
        >
          <CardHeader index="P.03" />
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <CardTitle>{third.title}</CardTitle>
              <CardDescription>{third.description}</CardDescription>
            </div>
            <TagList tags={third.tags} />
          </div>
        </Card>

        {/* Wide bar card - bottom of the grid */}
        <Card
          variants={cardVariants}
          lift={!reduced}
          href={fourth.href}
          title={fourth.title}
          className="lg:col-span-12"
        >
          <CardHeader index="P.04" />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-3">
              <CardTitle>{fourth.title}</CardTitle>
              <CardDescription>{fourth.description}</CardDescription>
            </div>
            <TagList tags={fourth.tags} className="shrink-0 md:justify-end" />
          </div>
        </Card>
      </motion.div>
    </Section>
  );
}
