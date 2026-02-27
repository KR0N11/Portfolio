"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Globe,
  Dumbbell,
  Mountain,
  CookingPot,
  ImageIcon,
  Sparkles,
  Layers,
  Disc,
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
            className="relative h-[120px] md:h-[140px] rounded-lg overflow-hidden border"
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
  {
    icon: Layers,
    title: "Pokemon Cards",
    subtitle: "Collecting & trading rare cards",
    color: "#a78bfa",
    type: "PSYCHIC",
    hp: 110,
    attack: "Rare Pull",
    image: null as string | null,
  },
  {
    icon: Disc,
    title: "Ping Pong",
    subtitle: "Fast reflexes & strategy",
    color: "#38bdf8",
    type: "WATER",
    hp: 95,
    attack: "Spin Serve",
    image: null as string | null,
  },
];

/* ── 3D Cylinder Carousel ── */
function HobbiesCarousel() {
  const [current, setCurrent] = useState(0);
  const total = hobbies.length;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 3500);
    return () => clearInterval(timer);
  }, [total]);

  const anglePerItem = 360 / total;
  const radius = 380;

  return (
    <motion.div
      custom={5}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="md:col-span-4 pt-6"
    >
      <p className="text-[#999] text-xs uppercase tracking-wider font-medium mb-8">
        When I&apos;m not coding
      </p>

      {/* 3D Cylinder container */}
      <div
        className="relative w-full h-[360px] md:h-[400px] overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
          animate={{ rotateY: -(current * anglePerItem) }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {hobbies.map((hobby, idx) => {
            const angle = idx * anglePerItem;
            return (
              <div
                key={hobby.title}
                className="absolute w-[200px] md:w-[220px]"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <PokemonCard hobby={hobby} isActive={idx === current} />
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* Carousel dots */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {hobbies.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              i === current
                ? "w-6 h-1.5 bg-[#E50914]"
                : "w-1.5 h-1.5 bg-white/15 hover:bg-white/25"
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main About Section ── */
export default function About() {
  const stack = [
    { name: "AI Agents", color: "#E50914" },
    { name: "Cloud", color: "#0078d4" },
    { name: "Full-Stack", color: "#61dafb" },
    { name: "Java", color: "#f89820" },
    { name: "Python", color: "#3776ab" },
    { name: "Azure", color: "#0078d4" },
  ];

  const languages = [
    { lang: "EN", level: 100 },
    { lang: "FR", level: 90 },
    { lang: "ZH", level: 90 },
  ];

  return (
    <section id="about" className="relative" aria-label="About me">
      <div className="bg-[#181818] border-t border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-[4%] py-14 md:py-20">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-10"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
            {/* Location + Real Map — 2 cols (all black/grey, no waypoint, keep dot) */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-2 bg-[#141414] rounded-xl border border-white/[0.06] relative overflow-hidden min-h-[220px]"
            >
              {/* OpenStreetMap — black & grey, no marker in URL */}
              <div className="absolute inset-0">
                <iframe
                  title="Montreal Map"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-73.63,45.47,-73.52,45.53&layer=mapnik"
                  className="w-full h-full border-0"
                  style={{
                    filter: "grayscale(1) invert(1) brightness(0.55) contrast(1.4)",
                  }}
                  loading="lazy"
                />
              </div>

              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />

              {/* Scanner line */}
              <motion.div
                className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#E50914]/40 to-transparent z-10"
                animate={{ left: ["10%", "90%", "10%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-[#E50914]/5 to-transparent z-10"
                animate={{ left: ["10%", "90%", "10%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Pulsing dot only (no waypoint marker icon) */}
              <motion.div className="absolute top-[40%] left-1/2 -translate-x-1/2 z-10">
                <div className="relative">
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-[#E50914]/20"
                    animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity }}
                  />
                  <div className="w-3 h-3 rounded-full bg-[#E50914] border-2 border-white/20 shadow-lg shadow-red-500/30" />
                </div>
              </motion.div>

              {/* Info overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin size={16} className="text-[#E50914]" />
                  <p className="text-white font-bold text-lg">Montr&eacute;al, QC</p>
                </div>
                <p className="text-[#999] text-sm mb-1">Canada</p>
                <div className="flex gap-4">
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

            {/* What I Build With — orbiting tags */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-4 bg-[#141414] rounded-xl p-6 md:p-8 border border-white/[0.06] min-h-[300px] relative overflow-hidden"
            >
              <p className="text-[#999] text-xs uppercase tracking-wider font-medium mb-2 relative z-10">
                What I Build With
              </p>

              {/* Orbit container */}
              <div className="relative w-full h-[240px] flex items-center justify-center">
                {/* Center icon */}
                <div className="absolute z-10 w-14 h-14 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center">
                  <span className="text-[#E50914] text-xl font-bold">&lt;/&gt;</span>
                </div>

                {/* Orbit ring visual */}
                <div className="absolute w-[320px] h-[320px] md:w-[420px] md:h-[420px] rounded-full border border-white/[0.04]" />
                <div className="absolute w-[200px] h-[200px] md:w-[270px] md:h-[270px] rounded-full border border-white/[0.03]" />

                {/* Orbiting tags — spread out more */}
                {stack.map((s, i) => {
                  const total = stack.length;
                  const angle = (i / total) * 360;
                  const orbitRadius = i % 2 === 0 ? 160 : 120;
                  const mdOrbitRadius = i % 2 === 0 ? 200 : 140;
                  const duration = 25 + i * 4;

                  return (
                    <motion.div
                      key={s.name}
                      className="absolute"
                      style={{ width: 0, height: 0 }}
                      animate={{ rotate: [angle, angle + 360] }}
                      transition={{ duration, repeat: Infinity, ease: "linear" }}
                    >
                      <motion.span
                        className="absolute px-3 py-1.5 text-xs rounded-full font-mono border whitespace-nowrap shadow-lg hidden md:block"
                        style={{
                          color: s.color,
                          backgroundColor: `${s.color}15`,
                          borderColor: `${s.color}30`,
                          boxShadow: `0 0 20px ${s.color}10`,
                          top: `-${mdOrbitRadius}px`,
                          left: "-35px",
                        }}
                        animate={{ rotate: [-(angle), -(angle + 360)] }}
                        transition={{ duration, repeat: Infinity, ease: "linear" }}
                        whileHover={{ scale: 1.2, zIndex: 20 }}
                      >
                        {s.name}
                      </motion.span>
                      <motion.span
                        className="absolute px-3 py-1.5 text-xs rounded-full font-mono border whitespace-nowrap shadow-lg md:hidden"
                        style={{
                          color: s.color,
                          backgroundColor: `${s.color}15`,
                          borderColor: `${s.color}30`,
                          boxShadow: `0 0 20px ${s.color}10`,
                          top: `-${orbitRadius}px`,
                          left: "-35px",
                        }}
                        animate={{ rotate: [-(angle), -(angle + 360)] }}
                        transition={{ duration, repeat: Infinity, ease: "linear" }}
                        whileHover={{ scale: 1.2, zIndex: 20 }}
                      >
                        {s.name}
                      </motion.span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* "When I'm Not Coding" — 3D Cylinder carousel */}
            <HobbiesCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
