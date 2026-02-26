"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Bot,
  Cloud,
  Code2,
  Users,
  Server,
  Hospital,
  Rocket,
} from "lucide-react";
import { experiences } from "@/data/portfolio";

/* ── Icon map ── */
const highlightIcons: Record<string, React.ElementType> = {
  ai: Bot,
  cloud: Cloud,
  code: Code2,
  mentor: Users,
  devops: Server,
  hospital: Hospital,
  ship: Rocket,
};

/* Condensed visual highlights per role */
const visualHighlights: {
  icon: string;
  label: string;
  color: string;
}[][] = [
  [
    { icon: "ai", label: "AI Agents & LLMs", color: "#8b5cf6" },
    { icon: "code", label: "AI Code Review Copilot", color: "#3b82f6" },
    { icon: "devops", label: "QMS & CI/CD Pipelines", color: "#10b981" },
    { icon: "mentor", label: "Mentoring Interns", color: "#f59e0b" },
  ],
  [
    { icon: "hospital", label: "Patient Registration (CHUM)", color: "#ef4444" },
    { icon: "cloud", label: "Azure DevOps Pipelines", color: "#3b82f6" },
    { icon: "ship", label: "On-Prem to Cloud Migration", color: "#10b981" },
  ],
];

/* ── Timeline Node ── */
function TimelineNode({
  exp,
  highlights,
  index,
  isLast,
}: {
  exp: (typeof experiences)[0];
  highlights: { icon: string; label: string; color: string }[];
  index: number;
  isLast: boolean;
}) {
  const isCurrent = exp.period.includes("Present");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      className="relative flex gap-6 md:gap-10"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0">
        {/* Dot */}
        <div className="relative">
          {isCurrent && (
            <div className="absolute -inset-2 rounded-full bg-[#E50914]/20 animate-ping" />
          )}
          <div
            className={`w-4 h-4 rounded-full border-2 z-10 relative ${
              isCurrent
                ? "bg-[#E50914] border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.5)]"
                : "bg-[#333] border-[#555]"
            }`}
          />
        </div>
        {/* Vertical line */}
        {!isLast && (
          <div className="w-[2px] flex-1 min-h-[40px] bg-gradient-to-b from-[#444] to-[#222]" />
        )}
      </div>

      {/* Content */}
      <div className="pb-12 flex-1 -mt-1">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="text-lg md:text-xl font-bold text-white">
            {exp.title}
          </h3>
          {isCurrent && (
            <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#E50914] text-white">
              Current
            </span>
          )}
        </div>

        <p className="text-[#E50914] text-sm font-medium mb-2">
          {exp.company}
        </p>

        {/* Period */}
        <div className="flex items-center gap-1.5 mb-5">
          <Calendar size={12} className="text-[#666]" />
          <span className="text-[#666] text-xs font-mono">{exp.period}</span>
        </div>

        {/* Visual highlight pills */}
        <div className="flex flex-wrap gap-2">
          {highlights.map((h, i) => {
            const Icon = highlightIcons[h.icon] || Code2;
            return (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.07 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] hover:bg-white/[0.07] transition-all group"
              >
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${h.color}18` }}
                >
                  <Icon size={14} style={{ color: h.color }} />
                </div>
                <span className="text-[#ccc] text-xs font-medium group-hover:text-white transition-colors">
                  {h.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto px-[4%]">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <p className="text-[#E50914] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Where I&apos;ve Worked
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Career Path
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="pl-2">
          {experiences.map((exp, i) => (
            <TimelineNode
              key={exp.company}
              exp={exp}
              highlights={visualHighlights[i] || []}
              index={i}
              isLast={i === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
