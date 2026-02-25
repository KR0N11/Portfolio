"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Globe,
  Dumbbell,
  Mountain,
  CookingPot,
  Code2,
  ImageIcon,
  Sparkles,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

/* ── Pokemon Card for Hobbies ── */
function PokemonCard({
  hobby,
  isActive,
}: {
  hobby: {
    icon: React.ElementType;
    title: string;
    subtitle: string;
    color: string;
    type: string;
    hp: number;
    attack: string;
    image: string | null;
  };
  isActive: boolean;
}) {
  const Icon = hobby.icon;
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -15, y: x * 15 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full"
      style={{
        perspective: "800px",
        transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Card */}
      <div
        className="relative rounded-xl overflow-hidden border-2 shadow-2xl"
        style={{
          borderColor: hobby.color,
          boxShadow: `0 0 30px ${hobby.color}30, 0 0 60px ${hobby.color}10`,
          background: `linear-gradient(145deg, ${hobby.color}15 0%, #1a1a1a 40%, ${hobby.color}08 100%)`,
        }}
      >
        {/* Holographic sheen overlay */}
        <div
          className="absolute inset-0 z-20 pointer-events-none opacity-20"
          style={{
            background: `linear-gradient(${105 + tilt.y * 3}deg, transparent 30%, ${hobby.color}40 50%, transparent 70%)`,
            transition: "background 0.15s ease-out",
          }}
        />

        {/* Top bar — name + HP */}
        <div className="flex items-center justify-between px-4 pt-3 pb-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-white font-bold text-sm">{hobby.title}</span>
            <span
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{ backgroundColor: `${hobby.color}25`, color: hobby.color }}
            >
              {hobby.type}
            </span>
          </div>
          <span className="text-white/60 text-xs font-bold">
            HP <span className="text-white text-sm">{hobby.hp}</span>
          </span>
        </div>

        {/* Image area */}
        <div className="mx-3 mt-1 mb-2 relative z-10">
          <div
            className="relative h-[140px] md:h-[160px] rounded-lg overflow-hidden border"
            style={{ borderColor: `${hobby.color}30` }}
          >
            {hobby.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={hobby.image}
                  alt={hobby.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </>
            ) : (
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-3"
                style={{
                  background: `radial-gradient(ellipse at center, ${hobby.color}12 0%, #111 70%)`,
                }}
              >
                <Icon size={44} style={{ color: hobby.color }} />
                <div className="flex items-center gap-1.5 text-[#555]">
                  <ImageIcon size={10} />
                  <span className="text-[9px] font-mono">Add photo later</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description / Attack */}
        <div className="px-4 pb-2 relative z-10">
          <p className="text-[#888] text-[10px] mb-2">{hobby.subtitle}</p>
          <div
            className="flex items-center justify-between py-2 border-t"
            style={{ borderColor: `${hobby.color}15` }}
          >
            <div className="flex items-center gap-2">
              <Sparkles size={12} style={{ color: hobby.color }} />
              <span className="text-white/80 text-xs font-semibold">
                {hobby.attack}
              </span>
            </div>
            <span className="text-white/40 text-xs font-mono">30</span>
          </div>
        </div>

        {/* Bottom */}
        <div className="px-4 pb-3 relative z-10">
          <p className="text-[#555] text-[8px] italic leading-relaxed">
            &quot;{hobby.subtitle}&quot; — Trainer: Ping Chun Lui
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Hobbies data ── */
const hobbies = [
  {
    icon: Dumbbell,
    title: "Gym",
    subtitle: "Strength training & discipline",
    color: "#ef4444",
    type: "FIRE",
    hp: 120,
    attack: "Power Lift",
    image: null as string | null,
  },
  {
    icon: Mountain,
    title: "Bouldering",
    subtitle: "Problem solving on walls",
    color: "#22c55e",
    type: "GRASS",
    hp: 100,
    attack: "Wall Climb",
    image: "/image/Bouldering.png",
  },
  {
    icon: CookingPot,
    title: "Cooking",
    subtitle: "Creating from scratch",
    color: "#fbbf24",
    type: "ELECTRIC",
    hp: 90,
    attack: "Flavor Blast",
    image: null as string | null,
  },
];

/* ── Main About Section — no profile pic, full-width tiles ── */
export default function About() {
  const stack = [
    { name: "React", color: "#61dafb" },
    { name: "Java", color: "#f89820" },
    { name: "Swift", color: "#fa7343" },
    { name: "Azure", color: "#0078d4" },
    { name: "Python", color: "#3776ab" },
    { name: "Firebase", color: "#ffca28" },
  ];

  const languages = [
    { lang: "EN", level: 100 },
    { lang: "FR", level: 90 },
    { lang: "ZH", level: 90 },
  ];

  return (
    <section id="about" className="relative" aria-label="About me">
      <div className="bg-[#181818] border-t border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-[4%] py-10 md:py-14">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-8"
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
            <p className="text-[#ddd] text-sm md:text-base leading-relaxed max-w-2xl">
              Software developer who ships products, solves hard problems,
              and moves fast with purpose. Specializing in AI agents, cloud
              architecture, and full-stack development from Montreal, Canada.
            </p>
          </motion.div>

          {/* Full-width tile grid — 4 cols on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* Location + Map — 2 cols */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#141414] rounded-xl p-5 md:p-6 border border-white/[0.06] relative overflow-hidden min-h-[180px]"
            >
              <div className="absolute inset-0 opacity-20">
                <svg
                  viewBox="0 0 300 200"
                  className="w-full h-full"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <path d="M0,130 Q50,115 100,130 Q150,145 200,125 Q250,110 300,120" fill="none" stroke="rgba(100,160,255,0.4)" strokeWidth="10" />
                  <path d="M0,145 Q60,130 120,145 Q180,160 240,135 Q270,122 300,130" fill="none" stroke="rgba(100,160,255,0.2)" strokeWidth="6" />
                  {[40, 65, 90, 115].map((y) => (
                    <line key={`h${y}`} x1="20" y1={y} x2="280" y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  ))}
                  {[60, 100, 140, 180, 220].map((x) => (
                    <line key={`v${x}`} x1={x} y1="20" x2={x} y2="125" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                  ))}
                  <path d="M80,45 Q120,20 170,30 Q200,38 220,55" fill="rgba(80,160,80,0.06)" stroke="rgba(80,160,80,0.12)" strokeWidth="1" />
                  <rect x="90" y="55" width="25" height="15" rx="2" fill="rgba(255,255,255,0.04)" />
                  <rect x="130" y="70" width="20" height="18" rx="2" fill="rgba(255,255,255,0.05)" />
                  <rect x="165" y="55" width="22" height="20" rx="2" fill="rgba(255,255,255,0.04)" />
                </svg>
              </div>

              {/* Scanner line */}
              <motion.div
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E50914]/40 to-transparent"
                animate={{ left: ["10%", "90%", "10%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-[#E50914]/5 to-transparent"
                animate={{ left: ["10%", "90%", "10%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Pulsing marker */}
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%]">
                <div className="relative">
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-[#E50914]/15"
                    animate={{ scale: [1, 2.5], opacity: [0.3, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[#E50914] border-2 border-[#E50914]/50" />
                </div>
              </motion.div>

              <div className="relative z-10 flex flex-col justify-end h-full">
                <MapPin size={18} className="text-[#E50914] mb-2" />
                <p className="text-white font-bold text-lg">Montr&eacute;al, QC</p>
                <p className="text-[#999] text-sm">Canada</p>
                <div className="flex gap-4 mt-2">
                  <span className="text-[11px] font-mono text-[#E50914]/70">45.5017&deg; N</span>
                  <span className="text-[11px] font-mono text-[#E50914]/70">73.5673&deg; W</span>
                </div>
              </div>
            </motion.div>

            {/* Education — 1 col */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#141414] rounded-xl p-5 md:p-6 border border-white/[0.06] flex flex-col justify-between min-h-[180px]"
            >
              <GraduationCap size={22} className="text-[#E50914] mb-3" />
              <div>
                <p className="text-white font-bold text-base mb-1">Coll&egrave;ge LaSalle</p>
                <p className="text-[#999] text-sm">DEC in Computer Science</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400/60" />
                  <span className="text-[#666] text-xs font-mono">Graduating 2026</span>
                </div>
              </div>
            </motion.div>

            {/* Languages — 1 col */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[#141414] rounded-xl p-5 md:p-6 border border-white/[0.06] flex flex-col justify-between min-h-[180px]"
            >
              <Globe size={22} className="text-[#E50914] mb-3" />
              <div>
                <p className="text-[#999] text-xs mb-3 uppercase tracking-wider font-medium">
                  Languages
                </p>
                <div className="space-y-2.5">
                  {languages.map((l) => (
                    <div key={l.lang} className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#999] w-6">{l.lang}</span>
                      <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
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
              </div>
            </motion.div>

            {/* Tech Stack — full width */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-4 bg-[#141414] rounded-xl p-5 md:p-6 border border-white/[0.06] min-h-[120px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code2 size={22} className="text-[#E50914]" />
                <p className="text-[#999] text-xs uppercase tracking-wider font-medium">
                  Core Stack
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {stack.map((s, i) => (
                  <motion.span
                    key={s.name}
                    className="px-3 py-1.5 text-xs rounded-lg font-mono border"
                    style={{
                      color: s.color,
                      backgroundColor: `${s.color}12`,
                      borderColor: `${s.color}20`,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06 }}
                  >
                    {s.name}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* "When I'm Not Coding" — Pokemon hobby tiles in own row */}
            <div className="md:col-span-4 pt-2">
              <motion.p
                custom={5}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-[#999] text-xs uppercase tracking-wider font-medium mb-4"
              >
                When I&apos;m not coding
              </motion.p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {hobbies.map((hobby, idx) => (
                  <motion.div
                    key={hobby.title}
                    custom={6 + idx}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <PokemonCard hobby={hobby} isActive={true} />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
