"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Trophy,
  Dumbbell,
  Mountain,
  CookingPot,
  Code2,
  Globe,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
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
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-8 md:col-span-2 md:row-span-2 flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="relative z-10">
        <motion.p
          className="text-white/30 text-sm font-mono mb-6 tracking-wider"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          &mdash; hello, i&apos;m
        </motion.p>

        <motion.h3
          className="text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ping Chun Lui
        </motion.h3>
        <motion.p
          className="text-white/40 text-base leading-relaxed max-w-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Software developer who ships products, solves hard problems, and
          moves fast with purpose.
        </motion.p>
      </div>

      <motion.div
        className="relative z-10 flex items-center gap-2 mt-8"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <div className="w-2 h-2 rounded-full bg-emerald-400" />
        <span className="text-xs text-white/30 font-mono">
          Open to opportunities
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ── Map Widget — Montreal ── */
function MapWidget() {
  return (
    <motion.div
      custom={1}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      {/* Montreal stylized map */}
      <div className="absolute inset-0 opacity-30 group-hover:opacity-40 transition-opacity duration-500">
        <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* St. Lawrence River */}
          <path
            d="M0,200 Q50,180 100,195 Q150,210 200,190 Q250,170 300,185"
            fill="none"
            stroke="rgba(100,160,255,0.3)"
            strokeWidth="12"
          />
          <path
            d="M0,215 Q60,195 120,210 Q180,225 240,200 Q270,188 300,195"
            fill="none"
            stroke="rgba(100,160,255,0.15)"
            strokeWidth="8"
          />

          {/* Major streets - grid pattern (downtown) */}
          {/* Horizontal streets */}
          <line x1="40" y1="60" x2="260" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="30" y1="85" x2="270" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="50" y1="110" x2="250" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="40" y1="135" x2="260" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="60" y1="160" x2="240" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />

          {/* Vertical streets */}
          <line x1="80" y1="40" x2="80" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="120" y1="30" x2="120" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="150" y1="35" x2="150" y2="185" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
          <line x1="180" y1="40" x2="180" y2="188" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="220" y1="45" x2="220" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

          {/* Ste-Catherine (main street, thicker) */}
          <line x1="30" y1="110" x2="270" y2="110" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />

          {/* Boulevard St-Laurent (diagonal) */}
          <line x1="150" y1="30" x2="160" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />

          {/* Mont Royal outline */}
          <path
            d="M100,55 Q130,20 170,30 Q200,38 210,60"
            fill="rgba(80,160,80,0.08)"
            stroke="rgba(80,160,80,0.15)"
            strokeWidth="1"
          />

          {/* Building blocks */}
          <rect x="85" y="65" width="30" height="15" rx="2" fill="rgba(255,255,255,0.04)" />
          <rect x="125" y="88" width="20" height="18" rx="2" fill="rgba(255,255,255,0.05)" />
          <rect x="155" y="65" width="22" height="20" rx="2" fill="rgba(255,255,255,0.04)" />
          <rect x="185" y="115" width="28" height="16" rx="2" fill="rgba(255,255,255,0.04)" />
          <rect x="95" y="138" width="18" height="18" rx="2" fill="rgba(255,255,255,0.03)" />
          <rect x="125" y="115" width="22" height="16" rx="2" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      {/* Pulsing location marker */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]"
      >
        <div className="relative">
          <motion.div
            className="absolute -inset-3 rounded-full bg-white/10"
            animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <div className="w-3 h-3 rounded-full bg-white border-2 border-white/50" />
        </div>
      </motion.div>

      <div className="relative z-10 flex flex-col justify-end h-full min-h-[160px]">
        <div className="flex items-center gap-2 mb-1">
          <MapPin className="text-white/50" size={14} />
          <span className="text-[11px] text-white/30 font-mono uppercase tracking-widest">
            Location
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white">Montr&eacute;al</h3>
        <p className="text-white/30 text-xs">QC, Canada</p>
      </div>
    </motion.div>
  );
}

/* ── Mindset / Hobbies Widget ── */
function MindsetWidget() {
  const hobbies = [
    { icon: Dumbbell, text: "Gym", color: "rgb(239, 68, 68)" },
    { icon: Mountain, text: "Bouldering", color: "rgb(34, 197, 94)" },
    { icon: CookingPot, text: "Cooking", color: "rgb(251, 191, 36)" },
  ];

  return (
    <motion.div
      custom={2}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:col-span-2 group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-5">
        When I&apos;m not coding
      </p>

      <div className="flex flex-col gap-4">
        {hobbies.map((h, i) => (
          <motion.div
            key={h.text}
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
          >
            <div
              className="p-2.5 rounded-xl transition-colors duration-300"
              style={{ backgroundColor: `${h.color}15` }}
            >
              <h.icon size={20} style={{ color: h.color }} />
            </div>
            <span className="text-white/60 text-sm font-medium">
              {h.text}
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
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="flex items-center gap-3 mb-5">
        <Code2 className="text-white/40" size={18} />
        <p className="text-xs text-white/25 font-mono uppercase tracking-widest">
          Stack
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {stack.map((s, i) => (
          <motion.span
            key={s.name}
            className="px-3 py-1.5 text-xs rounded-lg border font-mono"
            style={{
              borderColor: `${s.color}25`,
              color: `${s.color}cc`,
              backgroundColor: `${s.color}08`,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.06 }}
          >
            {s.name}
          </motion.span>
        ))}
      </div>
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
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <GraduationCap className="text-white/30 mb-4" size={20} />
      <p className="text-sm font-medium text-white/80">Coll&egrave;ge LaSalle</p>
      <p className="text-xs text-white/30 mt-1">DEC in Computer Science</p>
      <div className="flex items-center gap-2 mt-4">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
        <span className="text-[11px] text-white/25 font-mono">2026</span>
      </div>
    </motion.div>
  );
}

/* ── Certifications Widget ── */
function CertsWidget() {
  return (
    <motion.div
      custom={5}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <Trophy className="text-white/30 mb-4" size={20} />
      <div className="space-y-2.5">
        {[
          { cert: "PL-900", name: "Power Platform" },
          { cert: "PL-400", name: "Platform Developer" },
        ].map((c, i) => (
          <motion.div
            key={c.cert}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + i * 0.12 }}
          >
            <span className="text-amber-400/70 font-mono text-[11px] font-semibold">
              {c.cert}
            </span>
            <span className="text-white/30 text-xs">{c.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Languages Widget ── */
function LanguagesWidget() {
  const langs = [
    { lang: "EN", level: 100 },
    { lang: "FR", level: 90 },
    { lang: "ZH", level: 90 },
  ];

  return (
    <motion.div
      custom={6}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <Globe className="text-white/30 mb-4" size={20} />
      <div className="space-y-3">
        {langs.map((l, i) => (
          <div key={l.lang} className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-white/30 w-6">
              {l.lang}
            </span>
            <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-white/20"
                initial={{ width: 0 }}
                whileInView={{ width: `${l.level}%` }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.8 }}
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
      className="section-padding max-w-5xl mx-auto"
      aria-label="About me"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
          01 &mdash; about
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Get to know me
        </h2>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {/* Row 1: Name (2cols, 2rows) | Map | Craft */}
        <NameWidget />
        <MapWidget />
        <CraftWidget />

        {/* Row 2: Mindset/Hobbies (2 cols) */}
        <MindsetWidget />

        {/* Row 3: Education | Certs | Languages */}
        <EducationWidget />
        <CertsWidget />
        <LanguagesWidget />
      </div>
    </section>
  );
}
