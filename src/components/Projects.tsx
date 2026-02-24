"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

/* ── Phone Mockup (for Relay & TutorVerse) ── */
function PhoneMockup({ title, color }: { title: string; color: string }) {
  return (
    <div className="flex justify-center py-6">
      <motion.div
        className="relative"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Phone frame */}
        <div
          className="relative w-[140px] h-[280px] rounded-[28px] border-[3px] p-[3px] overflow-hidden"
          style={{ borderColor: color }}
        >
          {/* Notch */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-5 rounded-b-xl z-10"
            style={{ backgroundColor: color, opacity: 0.3 }}
          />

          {/* Screen */}
          <div className="w-full h-full rounded-[24px] bg-bg-secondary/80 flex flex-col items-center justify-center overflow-hidden relative">
            {/* Status bar dots */}
            <div className="absolute top-7 left-3 flex gap-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
            </div>

            {/* Animated loading lines */}
            <div className="space-y-3 px-4 w-full">
              {[0.8, 0.6, 0.9, 0.5, 0.7].map((width, i) => (
                <motion.div
                  key={i}
                  className="h-2 rounded-full"
                  style={{
                    width: `${width * 100}%`,
                    backgroundColor: color,
                    opacity: 0.15,
                  }}
                  animate={{ opacity: [0.1, 0.25, 0.1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
            </div>

            {/* App name watermark */}
            <motion.p
              className="absolute bottom-6 text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{ color, opacity: 0.3 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {title}
            </motion.p>

            {/* Bottom bar */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-10 h-1 rounded-full" style={{ backgroundColor: color, opacity: 0.2 }} />
          </div>
        </div>

        {/* Glow effect behind phone */}
        <div
          className="absolute -inset-4 rounded-[36px] -z-10 blur-2xl"
          style={{ backgroundColor: color, opacity: 0.06 }}
        />
      </motion.div>
    </div>
  );
}

/* ── Browser Mockup (for Blitz & Moodify) ── */
function BrowserMockup({ title, color }: { title: string; color: string }) {
  return (
    <div className="px-4 py-4">
      <motion.div
        className="relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Browser frame */}
        <div
          className="rounded-xl border-[2px] overflow-hidden"
          style={{ borderColor: color, opacity: 0.9 }}
        >
          {/* Browser toolbar */}
          <div className="flex items-center gap-2 px-3 py-2 border-b" style={{ borderColor: color, opacity: 0.8 }}>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <div
              className="flex-1 h-5 rounded-md mx-2 flex items-center justify-center"
              style={{ backgroundColor: color, opacity: 0.08 }}
            >
              <span
                className="text-[8px] font-mono"
                style={{ color, opacity: 0.5 }}
              >
                {title.toLowerCase()}.app
              </span>
            </div>
          </div>

          {/* Screen content */}
          <div className="bg-bg-secondary/80 p-4 min-h-[140px] relative">
            {/* Fake page layout */}
            <div className="space-y-3">
              {/* Header bar */}
              <motion.div
                className="h-3 rounded-full w-2/5"
                style={{ backgroundColor: color, opacity: 0.2 }}
                animate={{ opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Content grid */}
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="h-12 rounded-lg"
                    style={{ backgroundColor: color, opacity: 0.08 }}
                    animate={{ opacity: [0.06, 0.14, 0.06] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                  />
                ))}
              </div>

              {/* Text lines */}
              <div className="space-y-2">
                {[0.9, 0.7, 0.8].map((w, i) => (
                  <motion.div
                    key={i}
                    className="h-2 rounded-full"
                    style={{
                      width: `${w * 100}%`,
                      backgroundColor: color,
                      opacity: 0.1,
                    }}
                    animate={{ opacity: [0.08, 0.18, 0.08] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.25,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* App name watermark */}
            <motion.p
              className="absolute bottom-3 right-4 text-[9px] font-bold uppercase tracking-[0.2em]"
              style={{ color, opacity: 0.25 }}
              animate={{ opacity: [0.15, 0.35, 0.15] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {title}
            </motion.p>
          </div>
        </div>

        {/* Glow effect behind browser */}
        <div
          className="absolute -inset-3 rounded-2xl -z-10 blur-2xl"
          style={{ backgroundColor: color, opacity: 0.05 }}
        />
      </motion.div>
    </div>
  );
}

/* ── Project Card ── */
const PROJECT_COLORS: Record<string, string> = {
  RELAY: "#38bdf8",
  MOODIFY: "#a78bfa",
  Blitz: "#f97316",
  TutorVerse: "#34d399",
};

const PROJECT_TYPE: Record<string, "phone" | "browser"> = {
  RELAY: "phone",
  TutorVerse: "phone",
  MOODIFY: "browser",
  Blitz: "browser",
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const color = PROJECT_COLORS[project.title] || "#38bdf8";
  const type = PROJECT_TYPE[project.title] || "browser";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 800,
        }}
        className="glass-card overflow-hidden h-full hover:border-primary/50 transition-all duration-300 group cursor-default"
      >
        {/* Device mockup area */}
        <div className="border-b border-border/30">
          {type === "phone" ? (
            <PhoneMockup title={project.title} color={color} />
          ) : (
            <BrowserMockup title={project.title} color={color} />
          )}
        </div>

        {/* Info area */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-text-muted font-mono mt-1">
                {project.period}
              </p>
            </div>
            <ExternalLink
              size={18}
              className="text-text-muted group-hover:text-primary transition-colors shrink-0 mt-1"
              aria-hidden="true"
            />
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Highlight */}
          <div
            className="mb-4 p-3 rounded-lg border"
            style={{
              backgroundColor: `${color}08`,
              borderColor: `${color}20`,
            }}
          >
            <p className="text-xs font-medium" style={{ color }}>
              {project.highlight}
            </p>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-xs rounded-full bg-bg-secondary border border-border text-text-secondary font-mono"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="section-padding max-w-7xl mx-auto"
      aria-label="Projects"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          Selected work that demonstrates execution and real-world impact.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
