"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Globe,
  Dumbbell,
  Mountain,
  CookingPot,
  Code2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

export default function About() {
  const stack = [
    { name: "React", color: "#61dafb" },
    { name: "Java", color: "#f89820" },
    { name: "Swift", color: "#fa7343" },
    { name: "Azure", color: "#0078d4" },
    { name: "Python", color: "#3776ab" },
    { name: "Firebase", color: "#ffca28" },
  ];

  const hobbies = [
    { icon: Dumbbell, name: "Gym", color: "#ef4444" },
    { icon: Mountain, name: "Bouldering", color: "#22c55e" },
    { icon: CookingPot, name: "Cooking", color: "#fbbf24" },
  ];

  const languages = [
    { lang: "EN", level: 100 },
    { lang: "FR", level: 90 },
    { lang: "ZH", level: 90 },
  ];

  return (
    <section id="about" className="relative" aria-label="About me">
      {/* Netflix-style detail panel */}
      <div className="bg-[#181818] border-t border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-[4%] py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Left column - Photo */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden max-w-[280px] mx-auto md:mx-0">
                <Image
                  src="/image/me.jpg"
                  alt="Ping Chun Lui"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 70vw, 280px"
                  priority
                />
              </div>
            </motion.div>

            {/* Right column - Info */}
            <div className="md:col-span-2 flex flex-col gap-6">
              {/* Header */}
              <motion.div
                custom={1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-[#46d369] font-bold text-sm">
                    Open to opportunities
                  </span>
                  <span className="text-[#999] text-sm">2026</span>
                  <span className="px-1.5 py-0.5 border border-[#999] text-[#999] text-[10px] rounded">
                    MTL
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  About Me
                </h2>
                <p className="text-[#ddd] text-sm md:text-base leading-relaxed max-w-xl">
                  Software developer who ships products, solves hard problems,
                  and moves fast with purpose. Specializing in AI agents, cloud
                  architecture, and full-stack development from Montreal, Canada.
                </p>
              </motion.div>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Location + Map */}
                <motion.div
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-lg p-4 border border-white/[0.06] relative overflow-hidden"
                >
                  {/* Mini map SVG */}
                  <div className="absolute inset-0 opacity-20">
                    <svg
                      viewBox="0 0 200 200"
                      className="w-full h-full"
                      preserveAspectRatio="xMidYMid slice"
                    >
                      <path
                        d="M0,130 Q40,120 80,130 Q120,140 160,125 Q180,118 200,122"
                        fill="none"
                        stroke="rgba(100,160,255,0.4)"
                        strokeWidth="8"
                      />
                      <line x1="30" y1="40" x2="170" y2="40" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="30" y1="60" x2="170" y2="60" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="30" y1="80" x2="170" y2="80" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="30" y1="100" x2="170" y2="100" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="50" y1="20" x2="50" y2="125" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="80" y1="20" x2="80" y2="128" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="110" y1="20" x2="110" y2="130" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                      <line x1="140" y1="20" x2="140" y2="126" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                    </svg>
                  </div>

                  {/* Scanner line */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E50914]/40 to-transparent"
                    animate={{ left: ["15%", "85%", "15%"] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="relative z-10">
                    <MapPin size={16} className="text-[#E50914] mb-2" />
                    <p className="text-white font-semibold text-sm">
                      Montr&eacute;al, QC
                    </p>
                    <p className="text-[#999] text-xs">Canada</p>
                    <div className="flex gap-3 mt-2">
                      <span className="text-[10px] font-mono text-[#E50914]/70">
                        45.5017&deg; N
                      </span>
                      <span className="text-[10px] font-mono text-[#E50914]/70">
                        73.5673&deg; W
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Education */}
                <motion.div
                  custom={3}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-lg p-4 border border-white/[0.06]"
                >
                  <GraduationCap size={16} className="text-[#E50914] mb-2" />
                  <p className="text-white font-semibold text-sm">
                    Coll&egrave;ge LaSalle
                  </p>
                  <p className="text-[#999] text-xs">
                    DEC in Computer Science
                  </p>
                  <p className="text-[#666] text-[11px] font-mono mt-2">
                    Graduating 2026
                  </p>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                  custom={4}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-lg p-4 border border-white/[0.06]"
                >
                  <Code2 size={16} className="text-[#E50914] mb-2" />
                  <p className="text-[#999] text-xs mb-3 uppercase tracking-wider">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {stack.map((s) => (
                      <span
                        key={s.name}
                        className="px-2 py-1 text-[11px] rounded font-mono"
                        style={{
                          color: s.color,
                          backgroundColor: `${s.color}15`,
                        }}
                      >
                        {s.name}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Languages */}
                <motion.div
                  custom={5}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-lg p-4 border border-white/[0.06]"
                >
                  <Globe size={16} className="text-[#E50914] mb-2" />
                  <p className="text-[#999] text-xs mb-3 uppercase tracking-wider">
                    Languages
                  </p>
                  <div className="space-y-2">
                    {languages.map((l) => (
                      <div key={l.lang} className="flex items-center gap-3">
                        <span className="text-[11px] font-mono text-[#999] w-5">
                          {l.lang}
                        </span>
                        <div className="flex-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full bg-[#E50914]/60"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${l.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Hobbies row */}
              <motion.div
                custom={6}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <p className="text-[#999] text-xs mb-2 uppercase tracking-wider">
                  When I&apos;m not coding
                </p>
                <div className="flex gap-3">
                  {hobbies.map((h) => {
                    const Icon = h.icon;
                    return (
                      <div
                        key={h.name}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-white/[0.06]"
                      >
                        <Icon size={14} style={{ color: h.color }} />
                        <span className="text-[#ccc] text-xs">{h.name}</span>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
