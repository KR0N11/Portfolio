"use client";

import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  Dumbbell,
  Target,
  Trophy,
} from "lucide-react";
import ScrollRow from "./ScrollRow";

/* ── Achievement Card Base ── */
function AchievementCard({
  children,
  accentColor,
}: {
  children: React.ReactNode;
  accentColor: string;
}) {
  return (
    <div className="flex-shrink-0 w-[260px] md:w-[300px]">
      <div className="netflix-card rounded-md overflow-hidden bg-[#181818] h-full">
        <div
          className="h-[3px]"
          style={{ backgroundColor: accentColor }}
        />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

/* ── Pioneer Award Card ── */
function PioneerAwardCard() {
  return (
    <AchievementCard accentColor="#f59e0b">
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Award size={20} className="text-amber-400" />
        </div>
        <div>
          <p className="text-[10px] text-[#666] uppercase tracking-widest mb-0.5">
            Award
          </p>
          <h3 className="text-base font-bold text-white">Pioneer Award</h3>
        </div>
      </div>
      <p className="text-[#999] text-xs leading-relaxed mb-3">
        Recognized for pioneering innovation and leadership in software
        development.
      </p>
      <div className="w-full h-20 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
        <span className="text-[#444] text-[10px] font-mono">
          Image placeholder
        </span>
      </div>
    </AchievementCard>
  );
}

/* ── Certification Card ── */
function CertCard({
  code,
  name,
  color,
}: {
  code: string;
  name: string;
  color: string;
}) {
  return (
    <AchievementCard accentColor={color}>
      <div className="flex items-start gap-3 mb-3">
        <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}15` }}>
          <ShieldCheck size={20} style={{ color }} />
        </div>
        <div>
          <p className="text-[10px] text-[#666] uppercase tracking-widest mb-0.5">
            Certification
          </p>
          <h3 className="text-base font-bold text-white">{code}</h3>
        </div>
      </div>
      <p className="text-[#999] text-xs leading-relaxed mb-3">{name}</p>
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-[#666] font-mono">Microsoft</span>
        <span
          className="text-[10px] font-bold px-2 py-0.5 rounded"
          style={{
            color: color,
            backgroundColor: `${color}15`,
          }}
        >
          Verified
        </span>
      </div>
      <div className="mt-3 w-full h-16 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
        <span className="text-[#444] text-[10px] font-mono">
          Certificate placeholder
        </span>
      </div>
    </AchievementCard>
  );
}

/* ── Gym Goals Card ── */
function GymGoalsCard() {
  const goals = [
    { exercise: "Bench Press", current: "185 lbs", target: "225 lbs", progress: 82 },
    { exercise: "Squat", current: "225 lbs", target: "315 lbs", progress: 71 },
    { exercise: "Deadlift", current: "275 lbs", target: "405 lbs", progress: 68 },
  ];

  return (
    <AchievementCard accentColor="#ef4444">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-red-500/10">
          <Dumbbell size={20} className="text-red-400" />
        </div>
        <div>
          <p className="text-[10px] text-[#666] uppercase tracking-widest mb-0.5">
            Personal
          </p>
          <h3 className="text-base font-bold text-white">Gym Goals</h3>
        </div>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.exercise}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#ccc] text-xs">{goal.exercise}</span>
              <div className="flex items-center gap-1.5">
                <span className="text-[#999] text-[10px] font-mono">
                  {goal.current}
                </span>
                <span className="text-[#444] text-[10px]">/</span>
                <span className="text-red-400/70 text-[10px] font-mono">
                  {goal.target}
                </span>
              </div>
            </div>
            <div className="w-full h-1 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-red-500/50 to-red-400/70"
                initial={{ width: 0 }}
                whileInView={{ width: `${goal.progress}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 w-full h-14 rounded-lg border border-dashed border-white/[0.08] bg-white/[0.02] flex items-center justify-center">
        <span className="text-[#444] text-[10px] font-mono">
          Progress photos placeholder
        </span>
      </div>
    </AchievementCard>
  );
}

/* ── Coming Soon Card ── */
function ComingSoonCard() {
  return (
    <AchievementCard accentColor="#333">
      <div className="flex flex-col items-center justify-center h-[180px] text-center">
        <Trophy size={24} className="text-[#333] mb-3" />
        <p className="text-[#444] text-xs font-mono">
          More achievements
          <br />
          coming soon
        </p>
      </div>
    </AchievementCard>
  );
}

/* ── Main Achievements Section ── */
export default function Achievements() {
  return (
    <section
      id="achievements"
      aria-label="Achievements"
      className="section-padding"
    >
      <ScrollRow title="Achievements & Awards" subtitle="Milestones reached">
        <PioneerAwardCard />
        <CertCard
          code="PL-900"
          name="Microsoft Power Platform Fundamentals"
          color="#0078d4"
        />
        <CertCard
          code="PL-400"
          name="Microsoft Power Platform Developer Associate"
          color="#0078d4"
        />
        <GymGoalsCard />
        <ComingSoonCard />
      </ScrollRow>
    </section>
  );
}
