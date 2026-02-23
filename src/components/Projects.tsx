"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink } from "lucide-react";
import { projects } from "@/data/portfolio";

/* ── iPhone Frame ── */
function PhoneFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="flex justify-center py-6 px-4">
      <div className="relative w-[160px] sm:w-[180px] mx-auto">
        {/* Phone shell */}
        <motion.div
          className="relative rounded-[28px] border-[3px] border-[#2a2a2e] dark:border-[#3a3a3e] bg-black shadow-2xl overflow-hidden"
          whileHover={{ scale: 1.04, y: -6 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {/* Notch / Dynamic Island */}
          <div className="relative z-20 flex justify-center pt-2 pb-1 bg-black">
            <div className="w-20 h-[22px] bg-black rounded-full" />
          </div>
          {/* Screen */}
          <div className="relative aspect-[9/19] overflow-hidden bg-[#1a1a1e]">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 160px, 180px"
              priority
            />
          </div>
          {/* Home indicator */}
          <div className="flex justify-center py-2 bg-black">
            <div className="w-24 h-1 bg-white/20 rounded-full" />
          </div>
        </motion.div>
        {/* Reflection/glow effect */}
        <div className="absolute -inset-4 bg-primary/10 rounded-[40px] blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

/* ── Browser Frame ── */
function BrowserFrame({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="px-4 pt-4 pb-2 relative">
      <motion.div
        className="relative rounded-lg border border-border/50 overflow-hidden bg-[#1a1a1e] shadow-lg"
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Browser toolbar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[#2a2a2e] dark:bg-[#1e1e22] border-b border-border/30">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          {/* URL bar */}
          <div className="flex-1 mx-2">
            <div className="bg-[#1a1a1e] dark:bg-[#141416] rounded-md px-3 py-1 text-[10px] text-text-muted font-mono truncate">
              localhost:3000
            </div>
          </div>
        </div>
        {/* Screen content */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
      </motion.div>
      {/* Glow */}
      <div className="absolute -inset-3 bg-primary/10 rounded-2xl blur-2xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
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

  const isPhone = project.device === "phone";

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
        {/* Device mockup */}
        {project.image && (
          <div className="relative overflow-hidden bg-bg-secondary/30">
            {isPhone ? (
              <PhoneFrame src={project.image} alt={`${project.title} screenshot`} />
            ) : (
              <BrowserFrame src={project.image} alt={`${project.title} screenshot`} />
            )}
          </div>
        )}

        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
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
          <div className="mb-5 p-3 rounded-lg bg-primary/5 border border-primary/10">
            <p className="text-xs text-primary font-medium">
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
