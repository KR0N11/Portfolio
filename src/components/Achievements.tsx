"use client";

import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Dumbbell,
  Trophy,
  Target,
  Medal,
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

/* ── Pioneer Award Tile ── */
function PioneerAwardTile() {
  return (
    <motion.div
      custom={0}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:col-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/[0.04] rounded-full blur-3xl" />

      <div className="relative z-10 flex items-start gap-5">
        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/10 shrink-0">
          <Award size={28} className="text-amber-400" />
        </div>
        <div>
          <p className="text-[11px] text-white/25 font-mono uppercase tracking-widest mb-2">
            Award
          </p>
          <h3 className="text-xl font-bold text-white mb-1">Pioneer Award</h3>
          <p className="text-white/35 text-sm leading-relaxed">
            Recognized for pioneering innovation and leadership in software development.
          </p>
          {/* Placeholder for award image */}
          <div className="mt-4 w-full h-32 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
            <span className="text-white/15 text-xs font-mono">
              Award image placeholder
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Certifications Tile ── */
function CertificationsTile() {
  const certs = [
    {
      code: "PL-900",
      name: "Power Platform Fundamentals",
      issuer: "Microsoft",
      color: "#0078d4",
    },
    {
      code: "PL-400",
      name: "Power Platform Developer Associate",
      issuer: "Microsoft",
      color: "#0078d4",
    },
  ];

  return (
    <motion.div
      custom={1}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:col-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/10">
            <ShieldCheck size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-[11px] text-white/25 font-mono uppercase tracking-widest">
              Certifications
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {certs.map((cert, i) => (
            <motion.div
              key={cert.code}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition-colors"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <span
                className="font-mono text-sm font-bold px-3 py-1 rounded-lg"
                style={{
                  color: cert.color,
                  backgroundColor: `${cert.color}12`,
                }}
              >
                {cert.code}
              </span>
              <div>
                <p className="text-white/70 text-sm font-medium">
                  {cert.name}
                </p>
                <p className="text-white/25 text-xs">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for cert images */}
        <div className="mt-4 w-full h-24 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
          <span className="text-white/15 text-xs font-mono">
            Certificate images placeholder
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Gym Goals Tile ── */
function GymGoalsTile() {
  const goals = [
    {
      exercise: "Bench Press",
      current: "185 lbs",
      target: "225 lbs",
      progress: 82,
      icon: Target,
    },
    {
      exercise: "Squat",
      current: "225 lbs",
      target: "315 lbs",
      progress: 71,
      icon: Target,
    },
    {
      exercise: "Deadlift",
      current: "275 lbs",
      target: "405 lbs",
      progress: 68,
      icon: Target,
    },
  ];

  return (
    <motion.div
      custom={2}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:col-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-red-500/[0.03] rounded-full blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/10">
            <Dumbbell size={22} className="text-red-400" />
          </div>
          <div>
            <p className="text-[11px] text-white/25 font-mono uppercase tracking-widest">
              Gym Goals
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {goals.map((goal, i) => (
            <motion.div
              key={goal.exercise}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.12 }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-white/60 text-sm font-medium">
                  {goal.exercise}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-white/30 text-xs font-mono">
                    {goal.current}
                  </span>
                  <span className="text-white/15 text-xs">/</span>
                  <span className="text-red-400/60 text-xs font-mono">
                    {goal.target}
                  </span>
                </div>
              </div>
              <div className="w-full h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-red-500/50 to-red-400/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${goal.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Placeholder for gym progress images */}
        <div className="mt-4 w-full h-24 rounded-xl border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
          <span className="text-white/15 text-xs font-mono">
            Progress photos placeholder
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Achievements Section ── */
export default function Achievements() {
  return (
    <section
      id="achievements"
      className="section-padding max-w-5xl mx-auto"
      aria-label="Achievements"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
          05 &mdash; milestones
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Achievements
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <PioneerAwardTile />
        <CertificationsTile />
        <GymGoalsTile />

        {/* Extra space for future tiles */}
        <motion.div
          custom={3}
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="rounded-2xl bg-white/[0.03] border border-dashed border-white/[0.06] p-6 md:col-span-2 flex items-center justify-center min-h-[140px] group hover:bg-white/[0.04] transition-colors duration-500"
        >
          <div className="text-center">
            <Trophy size={24} className="text-white/10 mx-auto mb-2" />
            <p className="text-white/15 text-xs font-mono">
              More achievements coming soon
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
