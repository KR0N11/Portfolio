"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, Building2, Sparkles } from "lucide-react";
import { experiences } from "@/data/portfolio";

/* ── Visual Timeline Card ── */
function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const isPresent = exp.period.includes("Present");
  const isLeft = index % 2 === 0;

  return (
    <div className="relative flex items-center w-full mb-12 md:mb-16 last:mb-0">
      {/* Center line dot */}
      <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 z-10">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 300 }}
          className="relative"
        >
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isPresent
                ? "bg-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.4)]"
                : "bg-[#252525] border-2 border-[#333]"
            }`}
          >
            <Briefcase size={18} className={isPresent ? "text-white" : "text-[#888]"} />
          </div>
          {isPresent && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E50914] opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#E50914]" />
            </span>
          )}
        </motion.div>
      </div>

      {/* Card — always right on mobile, alternating on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.15 + 0.1, duration: 0.5 }}
        className={`ml-20 md:ml-0 md:w-[45%] ${
          isLeft ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
        }`}
      >
        <div className="relative rounded-xl bg-[#181818] border border-white/[0.06] overflow-hidden hover:border-white/[0.12] transition-all duration-300 group">
          {/* Top accent */}
          <div
            className={`h-1 ${
              isPresent
                ? "bg-gradient-to-r from-[#E50914] to-[#ff4d56]"
                : "bg-gradient-to-r from-[#333] to-[#444]"
            }`}
          />

          <div className="p-5 md:p-6">
            {/* Header row */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">{exp.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Building2 size={13} className="text-[#666]" />
                  <span className="text-[#999] text-sm font-medium">{exp.company}</span>
                </div>
              </div>
              {isPresent && (
                <span className="flex items-center gap-1 bg-[#E50914]/15 text-[#E50914] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles size={10} />
                  Current
                </span>
              )}
            </div>

            {/* Period badge */}
            <div className="flex items-center gap-1.5 mb-4">
              <Calendar size={12} className="text-[#555]" />
              <span className="text-[#666] text-xs font-mono">{exp.period}</span>
            </div>

            {/* Visual tech/keyword tags instead of long text */}
            <div className="flex flex-wrap gap-2">
              {exp.highlights.map((h, i) => {
                // Extract short keyword phrase from each highlight
                const short = extractKeyPhrase(h);
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + i * 0.05 }}
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[#ccc] text-xs group-hover:border-white/[0.1] transition-colors"
                  >
                    {short}
                  </motion.span>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* Extract a concise keyword from a long highlight sentence */
function extractKeyPhrase(highlight: string): string {
  const map: Record<string, string> = {
    "AI Agents": "AI Agents",
    "AI Copilot": "AI Copilot",
    "Quality Management": "QMS & CI/CD",
    "Mentoring": "Mentoring Interns",
    "patient registration": "Patient Registration",
    "Azure DevOps": "Azure DevOps",
    "Dataverse": "Cloud Migration",
    "release pipelines": "Release Pipelines",
  };
  for (const [key, val] of Object.entries(map)) {
    if (highlight.includes(key)) return val;
  }
  // Fallback: first ~30 chars
  return highlight.length > 30 ? highlight.slice(0, 28) + "…" : highlight;
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="py-16 md:py-24"
    >
      <div className="max-w-4xl mx-auto px-[4%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[#E50914] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            Where I&apos;ve worked
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Career Path
          </h2>
        </motion.div>

        {/* Vertical timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-[2.75rem] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#E50914]/40 via-[#333] to-transparent" />

          {experiences.map((exp, i) => (
            <TimelineCard key={exp.company} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
