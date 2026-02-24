"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Trophy,
  Beaker,
  Rocket,
  Code2,
  User,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1] as [number, number, number, number],
    },
  }),
};

/* ── Name / Intro Widget ── */
function NameWidget() {
  return (
    <motion.div
      custom={0}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 md:p-8 md:col-span-2 md:row-span-2 hover:border-primary/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group"
    >
      {/* Animated gradient orb */}
      <motion.div
        className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="relative z-10">
        {/* Profile avatar placeholder */}
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
          <User className="text-primary" size={36} />
        </div>

        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-2"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ping Chun{" "}
          <span className="text-gradient">Lui</span>
        </motion.h3>
        <motion.p
          className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          A software developer who ships products, solves hard problems, and
          moves fast with purpose.
        </motion.p>
      </div>

      {/* Status badge */}
      <motion.div
        className="relative z-10 flex items-center gap-2 mt-6"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-xs text-text-muted font-mono">
          Available for opportunities
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Map Widget ── */
function MapWidget() {
  return (
    <motion.div
      custom={1}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-5 hover:border-primary/50 transition-all duration-300 relative overflow-hidden group"
    >
      {/* Stylized map background */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
        <svg viewBox="0 0 200 200" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Grid lines representing streets */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 18}
              x2="200"
              y2={i * 18}
              stroke="var(--color-primary)"
              strokeWidth="0.3"
              opacity="0.4"
            />
          ))}
          {Array.from({ length: 12 }).map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 18}
              y1="0"
              x2={i * 18}
              y2="200"
              stroke="var(--color-primary)"
              strokeWidth="0.3"
              opacity="0.4"
            />
          ))}
          {/* Diagonal avenues */}
          <line x1="20" y1="0" x2="180" y2="200" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.3" />
          <line x1="60" y1="0" x2="200" y2="160" stroke="var(--color-primary)" strokeWidth="0.5" opacity="0.3" />
          {/* River curve */}
          <path
            d="M0,120 Q60,100 100,130 Q140,160 200,140"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1.5"
            opacity="0.25"
          />
          {/* Key blocks */}
          <rect x="60" y="40" width="30" height="20" rx="3" fill="var(--color-primary)" opacity="0.08" />
          <rect x="100" y="70" width="40" height="25" rx="3" fill="var(--color-primary)" opacity="0.08" />
          <rect x="40" y="80" width="25" height="30" rx="3" fill="var(--color-primary)" opacity="0.06" />
        </svg>
      </div>

      {/* Pulsing location marker */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="relative">
          <div className="w-4 h-4 rounded-full bg-primary" />
          <motion.div
            className="absolute inset-0 rounded-full bg-primary"
            animate={{ scale: [1, 3], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[140px]">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="text-primary" size={16} />
          <span className="text-xs text-text-muted font-mono uppercase tracking-wider">
            Location
          </span>
        </div>
        <h3 className="text-lg font-bold">Montreal</h3>
        <p className="text-text-secondary text-xs">Quebec, Canada</p>
      </div>
    </motion.div>
  );
}

/* ── Mindset Widget ── */
function MindsetWidget() {
  const principles = [
    { text: "Ship first, iterate fast", delay: 0 },
    { text: "Execution over deliberation", delay: 0.15 },
    { text: "Motion creates opportunity", delay: 0.3 },
  ];

  return (
    <motion.div
      custom={2}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group md:col-span-2"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
          <Rocket className="text-amber-400" size={22} />
        </div>
        <h3 className="text-lg font-bold">Mindset</h3>
      </div>

      <div className="space-y-3">
        {principles.map((p, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-3 group/item"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + p.delay, duration: 0.5 }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-amber-400"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
            <span className="text-sm text-text-secondary group-hover/item:text-text transition-colors">
              {p.text}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Craft Widget ── */
function CraftWidget() {
  const stack = [
    { name: "React", color: "#61dafb" },
    { name: "Java", color: "#f89820" },
    { name: "Swift", color: "#fa7343" },
    { name: "Azure", color: "#0078d4" },
    { name: "Python", color: "#3776ab" },
    { name: "Firebase", color: "#ffca28" },
  ];

  return (
    <motion.div
      custom={3}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
          <Code2 className="text-violet-400" size={22} />
        </div>
        <h3 className="text-lg font-bold">Craft</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.map((s, i) => (
          <motion.span
            key={s.name}
            className="px-3 py-1.5 text-xs rounded-lg border font-mono"
            style={{
              borderColor: `${s.color}30`,
              color: s.color,
              backgroundColor: `${s.color}08`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.08 }}
            whileHover={{
              scale: 1.1,
              backgroundColor: `${s.color}20`,
            }}
          >
            {s.name}
          </motion.span>
        ))}
      </div>

      <p className="text-text-muted text-xs mt-4 font-mono">
        Full-stack across the entire stack
      </p>
    </motion.div>
  );
}

/* ── Education Widget ── */
function EducationWidget() {
  return (
    <motion.div
      custom={4}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
          <GraduationCap className="text-blue-400" size={22} />
        </div>
        <h3 className="text-lg font-bold">Education</h3>
      </div>

      <div>
        <p className="text-sm font-semibold">Coll&egrave;ge LaSalle</p>
        <p className="text-xs text-text-secondary mt-1">
          DEC in Computer Science (Co-op)
        </p>
        <motion.div
          className="mt-3 flex items-center gap-2"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-xs text-text-muted font-mono">
            Graduating 2026
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ── Science Club Widget ── */
function ScienceWidget() {
  return (
    <motion.div
      custom={5}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors">
          <Beaker className="text-emerald-400" size={22} />
        </div>
        <h3 className="text-lg font-bold">AI & Automation</h3>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed">
        Building intelligent agents, leveraging LLMs, and automating
        workflows at scale.
      </p>

      {/* Animated pulse dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-4 rounded-full bg-emerald-400"
            animate={{ scaleY: [0.3, 1, 0.3] }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Competitions Widget ── */
function CompetitionsWidget() {
  return (
    <motion.div
      custom={6}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-yellow-500/10 group-hover:bg-yellow-500/20 transition-colors">
          <Trophy className="text-yellow-400" size={22} />
        </div>
        <h3 className="text-lg font-bold">Certifications</h3>
      </div>

      <div className="space-y-2">
        {[
          { cert: "PL-900", name: "Power Platform Fundamentals" },
          { cert: "PL-400", name: "Power Platform Developer" },
        ].map((c, i) => (
          <motion.div
            key={c.cert}
            className="flex items-center gap-2 text-sm"
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.15 }}
          >
            <span className="text-yellow-400 font-mono text-xs font-bold">
              {c.cert}
            </span>
            <span className="text-text-secondary text-xs">{c.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Trilingual Widget ── */
function TrilingualWidget() {
  const langs = [
    { lang: "English", level: "Native", width: "100%" },
    { lang: "French", level: "Fluent", width: "90%" },
    { lang: "Chinese", level: "Fluent", width: "90%" },
  ];

  return (
    <motion.div
      custom={7}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02 }}
      className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group md:col-span-2"
    >
      <h3 className="text-lg font-bold mb-4">Languages</h3>
      <div className="space-y-3">
        {langs.map((l, i) => (
          <div key={l.lang}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-text-secondary">{l.lang}</span>
              <span className="text-text-muted font-mono">{l.level}</span>
            </div>
            <div className="h-1.5 rounded-full bg-primary/10 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary/60"
                initial={{ width: 0 }}
                whileInView={{ width: l.width }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main About Component ── */
export default function About() {
  return (
    <section
      id="about"
      className="section-padding max-w-7xl mx-auto"
      aria-label="About me"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          A snapshot of who I am, where I&apos;m from, and what drives me.
        </p>
      </motion.div>

      {/* Bento Widget Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
        {/* Row 1: Name (2 cols, 2 rows) | Map (1 col) | Craft (1 col) */}
        <NameWidget />
        <MapWidget />
        <CraftWidget />

        {/* Row 2: (Name continues) | Mindset (2 cols) */}
        <MindsetWidget />

        {/* Row 3: Education | Science | Competitions | Languages */}
        <EducationWidget />
        <ScienceWidget />
        <CompetitionsWidget />
        <TrilingualWidget />
      </div>
    </section>
  );
}
