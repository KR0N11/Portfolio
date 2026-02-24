"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/portfolio";

const PROJECT_COLORS: Record<string, string> = {
  RELAY: "#38bdf8",
  MOODIFY: "#a78bfa",
  Blitz: "#f97316",
  TutorVerse: "#34d399",
};

const PROJECT_IMAGES: Record<string, string> = {
  RELAY: "/image/relay_2.png",
  MOODIFY: "/image/moodify_pic.jpg",
  Blitz: "/image/blitz_pic.png",
  TutorVerse: "/image/Tutorverse_1.png",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
        {/* Screenshot */}
        {image && (
          <div className="relative w-full aspect-[16/10] overflow-hidden border-b border-white/[0.06]">
            <Image
              src={image}
              alt={`${project.title} screenshot`}
              fill
              className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-60" />
            {/* Number overlay */}
            <span
              className="absolute bottom-3 left-4 text-3xl font-bold font-mono"
              style={{ color: `${color}50` }}
            >
              {num}
            </span>
          </div>
        )}

        {/* Info */}
        <div className="p-6 md:p-7 flex flex-col flex-1">
          {/* Title + Arrow */}
          <div className="flex items-start justify-between mb-1">
            <h3 className="text-lg font-semibold text-white tracking-tight">
              {project.title}
            </h3>
            <div className="p-1.5 rounded-full border border-white/[0.06] text-white/20 group-hover:text-white/60 group-hover:border-white/[0.12] transition-all duration-300">
              <ArrowUpRight size={14} />
            </div>
          </div>
          <p className="text-[11px] text-white/20 font-mono mb-3">
            {project.period}
          </p>

          {/* Description */}
          <p className="text-white/35 text-sm leading-relaxed mb-5 flex-1">
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
