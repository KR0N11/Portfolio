"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

const PROJECT_COLORS: Record<string, string> = {
  RELAY: "#38bdf8",
  MOODIFY: "#a78bfa",
  Blitz: "#f97316",
  TutorVerse: "#34d399",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-8 hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
        {/* Number + Arrow */}
        <div className="flex items-start justify-between mb-6">
          <span
            className="text-4xl font-bold font-mono"
            style={{ color: `${color}40` }}
          >
            {num}
          </span>
          <div className="p-2 rounded-full border border-white/[0.06] text-white/20 group-hover:text-white/60 group-hover:border-white/[0.12] transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
          {project.title}
        </h3>
        <p className="text-[11px] text-white/20 font-mono mb-4">
          {project.period}
        </p>

        {/* Description */}
        <p className="text-white/35 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] rounded-full font-mono border"
              style={{
                borderColor: `${color}20`,
                color: `${color}90`,
                backgroundColor: `${color}08`,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding max-w-5xl mx-auto"
      aria-label="Projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
          04 &mdash; work
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Featured Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
