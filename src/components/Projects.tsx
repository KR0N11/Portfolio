"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Plus, ChevronDown, ThumbsUp } from "lucide-react";
import { projects } from "@/data/portfolio";
import ScrollRow from "./ScrollRow";

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

const PROJECT_FRAME: Record<string, "phone" | "browser"> = {
  RELAY: "phone",
  MOODIFY: "browser",
  Blitz: "browser",
  TutorVerse: "phone",
};

/* ── Netflix Project Card ── */
function ProjectCard({
  project,
  index,
  onExpand,
}: {
  project: (typeof projects)[0];
  index: number;
  onExpand: (idx: number) => void;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const frame = PROJECT_FRAME[project.title] || "browser";
  const isNew =
    project.period.includes("2025") || project.period.includes("2026");

  return (
    <div className="flex-shrink-0 w-[280px] md:w-[320px]">
      <div className="netflix-card rounded-md overflow-hidden bg-[#181818] group cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          {image ? (
            <>
              {frame === "phone" ? (
                /* Phone frame inside card */
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#111]">
                  <div
                    className="relative w-[80px] h-[160px] rounded-[14px] border-2 overflow-hidden shadow-lg"
                    style={{ borderColor: `${color}40` }}
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2.5 bg-[#0a0a0a] rounded-b-lg z-10" />
                    <Image
                      src={image}
                      alt={project.title}
                      fill
                      className="object-cover object-top"
                      sizes="80px"
                    />
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-6 h-0.5 rounded-full bg-white/20 z-10" />
                  </div>
                </div>
              ) : (
                /* Browser frame inside card */
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#111] p-4">
                  <div
                    className="relative w-full max-w-[260px] rounded-lg border overflow-hidden shadow-lg"
                    style={{ borderColor: `${color}25` }}
                  >
                    <div
                      className="flex items-center gap-1.5 px-2.5 py-1.5 border-b"
                      style={{
                        backgroundColor: `${color}08`,
                        borderColor: `${color}15`,
                      }}
                    >
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                        <div className="w-1.5 h-1.5 rounded-full bg-white/15" />
                      </div>
                      <div
                        className="flex-1 h-3 rounded mx-1"
                        style={{ backgroundColor: `${color}08` }}
                      />
                    </div>
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={image}
                        alt={project.title}
                        fill
                        className="object-cover object-top"
                        sizes="260px"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent opacity-80" />
            </>
          ) : (
            <div className="w-full h-full bg-[#1a1a1a]" />
          )}

          {/* New badge */}
          {isNew && (
            <span className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 rounded">
              NEW
            </span>
          )}

          {/* Title overlay on image */}
          <div className="absolute bottom-2 left-3 right-3">
            <h3
              className="text-lg font-bold drop-shadow-lg"
              style={{ color: color }}
            >
              {project.title}
            </h3>
          </div>
        </div>

        {/* Info panel - visible on hover */}
        <div className="p-3 opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-[200px] transition-all duration-300 overflow-hidden">
          {/* Action buttons */}
          <div className="flex items-center gap-2 mb-2">
            <button className="p-1.5 rounded-full bg-white text-black hover:bg-white/80 transition-colors">
              <Play size={14} fill="black" />
            </button>
            <button className="p-1.5 rounded-full border border-[#999]/40 text-white hover:border-white transition-colors">
              <Plus size={14} />
            </button>
            <button className="p-1.5 rounded-full border border-[#999]/40 text-white hover:border-white transition-colors">
              <ThumbsUp size={14} />
            </button>
            <button
              onClick={() => onExpand(index)}
              className="p-1.5 rounded-full border border-[#999]/40 text-white hover:border-white transition-colors ml-auto"
            >
              <ChevronDown size={14} />
            </button>
          </div>

          {/* Period */}
          <p className="text-[#999] text-[11px] font-mono mb-1">
            {project.period}
          </p>

          {/* Brief description */}
          <p className="text-[#ccc] text-xs leading-relaxed line-clamp-2 mb-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] text-[#999] before:content-['·'] before:mr-1 first:before:content-none"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Expanded Detail Row (like Netflix's inline expand) ── */
function ExpandedDetail({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <div className="bg-[#181818] border-y border-white/[0.06] px-[4%] py-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left - Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[#46d369] font-bold text-sm">
                Featured
              </span>
              <span className="text-[#999] text-sm">{project.period}</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-[#ddd] text-sm leading-relaxed mb-4">
              {project.description}
            </p>
            {project.highlight && (
              <p className="text-[#999] text-xs leading-relaxed mb-4">
                <span className="text-[#777]">Highlight: </span>
                {project.highlight}
              </p>
            )}
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-[11px] rounded font-mono border"
                  style={{
                    borderColor: `${color}30`,
                    color: `${color}`,
                    backgroundColor: `${color}10`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="md:col-span-1">
            {image && (
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <Image
                  src={image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                />
              </div>
            )}
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="block mx-auto mt-6 p-2 rounded-full border border-[#999]/30 text-[#999] hover:text-white hover:border-white transition-colors cursor-pointer"
        >
          <ChevronDown size={18} className="rotate-180" />
        </button>
      </div>
    </motion.div>
  );
}

/* ── Main Projects Section ── */
export default function Projects() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <section id="projects" aria-label="Projects" className="section-padding">
      <ScrollRow title="Featured Projects" subtitle="My latest work">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            index={i}
            onExpand={(idx) =>
              setExpandedIdx(expandedIdx === idx ? null : idx)
            }
          />
        ))}
      </ScrollRow>

      {/* Expanded Detail */}
      <AnimatePresence>
        {expandedIdx !== null && (
          <ExpandedDetail
            project={projects[expandedIdx]}
            onClose={() => setExpandedIdx(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
