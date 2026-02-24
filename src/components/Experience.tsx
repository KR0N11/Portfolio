"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { experiences } from "@/data/portfolio";
import ScrollRow from "./ScrollRow";

/* ── Experience Card (Netflix style) ── */
function ExperienceCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const isPresent = exp.period.includes("Present");

  return (
    <div className="flex-shrink-0 w-[300px] md:w-[380px]">
      <div className="netflix-card rounded-md overflow-hidden bg-[#181818] h-full">
        {/* Header */}
        <div className="relative h-[80px] flex items-end p-4 bg-gradient-to-r from-[#E50914]/10 to-transparent border-b border-white/[0.04]">
          {isPresent && (
            <span className="absolute top-3 right-3 bg-[#E50914] text-white text-[9px] font-bold px-2 py-0.5 rounded uppercase">
              Current
            </span>
          )}
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/[0.06]">
              <Briefcase size={18} className="text-[#E50914]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{exp.title}</h3>
              <p className="text-[#999] text-sm">{exp.company}</p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4">
          {/* Period */}
          <div className="flex items-center gap-1.5 mb-3">
            <Calendar size={12} className="text-[#666]" />
            <span className="text-[#666] text-xs font-mono">{exp.period}</span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2">
            {exp.highlights.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + i * 0.06 }}
                className="flex items-start gap-2 text-[#bbb] text-xs leading-relaxed"
              >
                <ChevronRight
                  size={10}
                  className="text-[#E50914] mt-0.5 shrink-0"
                />
                <span>{h}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section
      id="experience"
      aria-label="Work experience"
      className="section-padding"
    >
      <ScrollRow title="Career Path" subtitle="Where I've worked">
        {experiences.map((exp, i) => (
          <ExperienceCard key={exp.company} exp={exp} index={i} />
        ))}
      </ScrollRow>
    </section>
  );
}
