"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ExternalLink } from "lucide-react";
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

const PROJECT_FRAME: Record<string, "phone" | "browser"> = {
  RELAY: "phone",
  MOODIFY: "browser",
  Blitz: "browser",
  TutorVerse: "phone",
};

/* ── Phone Frame — zoomed in ── */
function PhoneFrame({
  image,
  alt,
  color,
  size = "md",
}: {
  image: string;
  alt: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: "w-[90px] h-[180px] rounded-[14px] border-[2px]",
    md: "w-[130px] h-[260px] rounded-[20px] border-[2.5px]",
    lg: "w-[180px] h-[360px] rounded-[28px] border-[3px]",
  };
  return (
    <motion.div
      animate={{ rotateY: [0, 3, 0, -3, 0], rotateX: [0, -2, 0, 2, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className={`relative ${dims[size]} overflow-hidden shadow-2xl`}
      style={{
        borderColor: `${color}40`,
        boxShadow: `0 20px 60px ${color}25, 0 0 0 1px ${color}10`,
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[35%] h-3 bg-[#0a0a0a] rounded-b-xl z-10"
        style={{ borderBottom: `1px solid ${color}15` }}
      />
      <Image src={image} alt={alt} fill className="object-cover object-top" sizes="250px" />
      <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full bg-white/20 z-10" />
    </motion.div>
  );
}

/* ── Browser Frame — zoomed in ── */
function BrowserFrame({
  image,
  alt,
  color,
  size = "md",
}: {
  image: string;
  alt: string;
  color: string;
  size?: "sm" | "md" | "lg";
}) {
  const widths = { sm: "max-w-[220px]", md: "max-w-[340px]", lg: "max-w-[480px]" };
  return (
    <motion.div
      animate={{ rotateY: [0, 2, 0, -2, 0], rotateX: [0, -1.5, 0, 1.5, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      className={`relative w-full ${widths[size]} rounded-xl border overflow-hidden shadow-2xl`}
      style={{
        borderColor: `${color}25`,
        boxShadow: `0 20px 60px ${color}20, 0 0 0 1px ${color}08`,
      }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-2 border-b"
        style={{ backgroundColor: `${color}08`, borderColor: `${color}15` }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/60" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/60" />
        </div>
        <div className="flex-1 h-4 rounded-md mx-2 bg-white/[0.04]" />
      </div>
      <div className="relative aspect-[16/10]">
        <Image src={image} alt={alt} fill className="object-cover object-top" sizes="500px" />
      </div>
    </motion.div>
  );
}

/* ── Featured (Big) Card ── */
function FeaturedCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const frame = PROJECT_FRAME[project.title] || "browser";
  const isNew = project.period.includes("2025") || project.period.includes("2026");

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative rounded-xl overflow-hidden bg-[#181818] border border-white/[0.04] group cursor-pointer"
      onClick={onClick}
    >
      <div
        className="relative h-[380px] md:h-[480px] flex items-center justify-center overflow-hidden"
        style={{
          perspective: "1000px",
          background: `radial-gradient(ellipse at 50% 60%, ${color}12 0%, #141414 70%)`,
        }}
      >
        {image &&
          (frame === "phone" ? (
            <PhoneFrame image={image} alt={project.title} color={color} size="lg" />
          ) : (
            <BrowserFrame image={image} alt={project.title} color={color} size="lg" />
          ))}

        <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

        {isNew && (
          <span className="absolute top-4 left-4 bg-[#E50914] text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider z-10">
            New
          </span>
        )}

        <span
          className="absolute bottom-16 left-5 text-[80px] font-black leading-none opacity-[0.06]"
          style={{ color }}
        >
          01
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            {project.title}
          </h3>
          <span className="text-[11px] font-mono text-[#666]">{project.period}</span>
        </div>

        <p className="text-[#bbb] text-sm leading-relaxed mb-3 max-w-md">
          {project.description}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex flex-wrap gap-1.5 flex-1">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] rounded font-mono"
                style={{ color, backgroundColor: `${color}10` }}
              >
                {t}
              </span>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-4 py-1.5 bg-white text-black rounded-md font-semibold text-xs hover:bg-white/80 transition-colors flex-shrink-0">
            <Play size={12} fill="black" />
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Small Card ── */
function SmallCard({
  project,
  index,
  onClick,
}: {
  project: (typeof projects)[0];
  index: number;
  onClick: () => void;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const frame = PROJECT_FRAME[project.title] || "browser";
  const num = String(index + 2).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="netflix-card rounded-lg overflow-hidden bg-[#181818] border border-white/[0.04] group cursor-pointer flex"
      onClick={onClick}
    >
      <div
        className="relative w-[170px] md:w-[200px] flex-shrink-0 flex items-center justify-center overflow-hidden py-3"
        style={{
          perspective: "600px",
          background: `radial-gradient(ellipse at center, ${color}10 0%, #141414 80%)`,
        }}
      >
        {image &&
          (frame === "phone" ? (
            <PhoneFrame image={image} alt={project.title} color={color} size="sm" />
          ) : (
            <BrowserFrame image={image} alt={project.title} color={color} size="sm" />
          ))}

        <span
          className="absolute bottom-1 left-2 text-[40px] font-black leading-none opacity-[0.06]"
          style={{ color }}
        >
          {num}
        </span>
      </div>

      <div className="flex-1 p-4 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-sm font-bold text-white truncate">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono text-[#555]">{project.period}</span>
        </div>
        <p className="text-[#999] text-xs leading-relaxed line-clamp-2 mb-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-1.5 py-0.5 text-[9px] rounded font-mono"
              style={{ color: `${color}99`, backgroundColor: `${color}08` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Detail Modal ── */
function DetailModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0];
  onClose: () => void;
}) {
  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const image = PROJECT_IMAGES[project.title];
  const frame = PROJECT_FRAME[project.title] || "browser";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[#181818] rounded-xl overflow-hidden shadow-2xl border border-white/[0.06]"
      >
        <div
          className="relative h-[220px] md:h-[300px] flex items-center justify-center"
          style={{
            perspective: "800px",
            background: `radial-gradient(ellipse at 50% 60%, ${color}15 0%, #181818 70%)`,
          }}
        >
          {image &&
            (frame === "phone" ? (
              <PhoneFrame image={image} alt={project.title} color={color} size="md" />
            ) : (
              <BrowserFrame image={image} alt={project.title} color={color} size="md" />
            ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-transparent to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-[#181818] border border-white/[0.1] text-white/60 hover:text-white transition-colors cursor-pointer z-10"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 md:p-8 -mt-8 relative z-10">
          <span className="text-[#999] text-xs font-mono">{project.period}</span>
          <h3 className="text-2xl font-bold text-white mb-2 mt-1">{project.title}</h3>
          <p className="text-[#ccc] text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-md font-mono"
                style={{ color, backgroundColor: `${color}10` }}
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-md font-semibold text-sm hover:bg-white/80 transition-colors">
              <ExternalLink size={15} />
              View Project
            </button>
            <button className="px-5 py-2.5 rounded-md bg-[#333] text-white text-sm font-medium hover:bg-[#444] transition-colors">
              Source Code
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main Projects Section — auto-rotating featured ── */
export default function Projects() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextFeatured = useCallback(() => {
    setFeaturedIdx((p) => (p + 1) % projects.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextFeatured, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextFeatured]);

  const featured = projects[featuredIdx];
  const rest = projects.filter((_, i) => i !== featuredIdx);

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="py-8 md:py-12"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="px-[4%] mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">Featured Projects</h2>
            <p className="text-[#999] text-xs mt-1">My latest work</p>
          </div>
          {/* Project dots */}
          <div className="flex items-center gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => setFeaturedIdx(i)}
                className={`rounded-full transition-all duration-300 cursor-pointer ${
                  i === featuredIdx
                    ? "w-6 h-1.5 bg-[#E50914]"
                    : "w-1.5 h-1.5 bg-white/15 hover:bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="px-[4%]">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                <FeaturedCard project={featured} onClick={() => setSelectedIdx(featuredIdx)} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3">
            {rest.map((project, i) => {
              const realIdx = projects.indexOf(project);
              return (
                <SmallCard key={project.title} project={project} index={i} onClick={() => setSelectedIdx(realIdx)} />
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIdx !== null && (
          <DetailModal project={projects[selectedIdx]} onClose={() => setSelectedIdx(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
