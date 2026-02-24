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

// Mobile apps use phone frame, web apps use browser frame
const PROJECT_FRAME: Record<string, "phone" | "browser"> = {
  RELAY: "phone",
  MOODIFY: "browser",
  Blitz: "browser",
  TutorVerse: "phone",
};

/* ── Phone Frame Mockup ── */
function PhoneFrame({
  image,
  alt,
  color,
}: {
  image: string;
  alt: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-center py-8 px-4">
      <div
        className="relative w-[160px] h-[320px] md:w-[180px] md:h-[360px] rounded-[2rem] border-[3px] overflow-hidden shadow-2xl"
        style={{
          borderColor: `${color}30`,
          boxShadow: `0 20px 60px ${color}15, 0 0 0 1px ${color}10`,
        }}
      >
        {/* Phone notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0a0a0a] rounded-b-2xl z-10 border-b border-x"
          style={{ borderColor: `${color}20` }}
        />

        {/* Screen content */}
        <div className="relative w-full h-full bg-[#111]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="200px"
          />
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 z-10" />
      </div>
    </div>
  );
}

/* ── Browser Frame Mockup ── */
function BrowserFrame({
  image,
  alt,
  color,
}: {
  image: string;
  alt: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-center py-6 px-4">
      <div
        className="relative w-full max-w-[320px] rounded-xl border overflow-hidden shadow-2xl"
        style={{
          borderColor: `${color}20`,
          boxShadow: `0 20px 60px ${color}10, 0 0 0 1px ${color}08`,
        }}
      >
        {/* Browser toolbar */}
        <div
          className="flex items-center gap-2 px-3 py-2 border-b"
          style={{
            backgroundColor: `${color}08`,
            borderColor: `${color}15`,
          }}
        >
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div
            className="flex-1 h-5 rounded-md mx-2"
            style={{ backgroundColor: `${color}08` }}
          />
        </div>

        {/* Page content */}
        <div className="relative w-full aspect-[16/10] bg-[#111]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const frame = PROJECT_FRAME[project.title] || "browser";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="group"
    >
      <div className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden hover:bg-white/[0.05] transition-all duration-500 h-full flex flex-col">
        {/* Device Frame */}
        {image && (
          <div
            className="relative overflow-hidden border-b border-white/[0.06]"
            style={{
              background: `radial-gradient(ellipse at center, ${color}08 0%, transparent 70%)`,
            }}
          >
            {frame === "phone" ? (
              <PhoneFrame image={image} alt={`${project.title} screenshot`} color={color} />
            ) : (
              <BrowserFrame image={image} alt={`${project.title} screenshot`} color={color} />
            )}
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
