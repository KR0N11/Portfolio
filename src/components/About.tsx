"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Dumbbell,
  Mountain,
  CookingPot,
  Code2,
  Globe,
  ChevronLeft,
  ChevronRight,
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

/* ── Profile / Intro Widget with Photo ── */
function ProfileWidget() {
  return (
    <motion.div
      custom={0}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] md:col-span-2 md:row-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="flex flex-col h-full">
        {/* Profile picture */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src="/image/me.jpg"
            alt="Ping Chun Lui"
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
        </div>

        {/* Info overlay at bottom */}
        <div className="p-6 -mt-16 relative z-10">
          <motion.p
            className="text-white/30 text-sm font-mono mb-2 tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            &mdash; hello, i&apos;m
          </motion.p>

          <motion.h3
            className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Ping Chun Lui
          </motion.h3>
          <motion.p
            className="text-white/40 text-sm leading-relaxed max-w-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Software developer who ships products, solves hard problems, and
            moves fast with purpose.
          </motion.p>

          <motion.div
            className="flex items-center gap-2 mt-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-white/30 font-mono">
              Open to opportunities
            </span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Map Widget — Montreal with Coordinates + Scanner Line ── */
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
        <svg
          viewBox="0 0 300 300"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
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

          {/* Street grid */}
          <line x1="40" y1="60" x2="260" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="30" y1="85" x2="270" y2="85" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="50" y1="110" x2="250" y2="110" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="40" y1="135" x2="260" y2="135" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="60" y1="160" x2="240" y2="160" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" />
          <line x1="80" y1="40" x2="80" y2="185" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />
          <line x1="120" y1="30" x2="120" y2="190" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="150" y1="35" x2="150" y2="185" stroke="rgba(255,255,255,0.1)" strokeWidth="1.2" />
          <line x1="180" y1="40" x2="180" y2="188" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          <line x1="220" y1="45" x2="220" y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />

          {/* Mont Royal */}
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

      {/* Vertical scanner line */}
      <motion.div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent"
        animate={{ left: ["20%", "80%", "20%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-cyan-400/5 to-transparent"
        animate={{ left: ["20%", "80%", "20%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing location marker */}
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]">
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
        {/* Coordinates */}
        <div className="flex items-center gap-3 mt-2">
          <span className="text-[10px] font-mono text-cyan-400/60">
            45.5017&deg; N
          </span>
          <span className="text-[10px] font-mono text-cyan-400/60">
            73.5673&deg; W
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Hobbies Carousel Widget ── */
function HobbiesCarousel() {
  const hobbies = [
    {
      icon: Dumbbell,
      title: "Gym",
      description: "Strength training & discipline",
      color: "rgb(239, 68, 68)",
      gradient: "from-red-500/20 to-red-900/10",
    },
    {
      icon: Mountain,
      title: "Bouldering",
      description: "Problem solving on walls",
      color: "rgb(34, 197, 94)",
      gradient: "from-green-500/20 to-green-900/10",
      image: "/image/Bouldering.png",
    },
    {
      icon: CookingPot,
      title: "Cooking",
      description: "Creating from scratch",
      color: "rgb(251, 191, 36)",
      gradient: "from-yellow-500/20 to-yellow-900/10",
    },
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoScroll = () => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % hobbies.length);
    }, 4000);
  };

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAutoScroll();
  };

  const prev = () => goTo((current - 1 + hobbies.length) % hobbies.length);
  const next = () => goTo((current + 1) % hobbies.length);

  return (
    <motion.div
      custom={2}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="rounded-2xl bg-white/[0.03] border border-white/[0.06] md:col-span-2 relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500"
    >
      <div className="p-6">
        <p className="text-xs text-white/25 font-mono uppercase tracking-widest mb-4">
          When I&apos;m not coding
        </p>

        {/* Carousel container */}
        <div className="relative h-[200px] overflow-hidden rounded-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <div
                className={`h-full rounded-xl bg-gradient-to-br ${hobbies[current].gradient} border border-white/[0.06] flex items-center justify-between p-6 relative overflow-hidden`}
              >
                {/* Background image if exists */}
                {hobbies[current].image && (
                  <div className="absolute inset-0">
                    <Image
                      src={hobbies[current].image!}
                      alt={hobbies[current].title}
                      fill
                      className="object-cover opacity-30"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/80 to-[#0a0a0a]/40" />
                  </div>
                )}

                <div className="relative z-10">
                  <div
                    className="p-3 rounded-xl inline-block mb-3"
                    style={{ backgroundColor: `${hobbies[current].color}15` }}
                  >
                    {(() => {
                      const Icon = hobbies[current].icon;
                      return <Icon size={28} style={{ color: hobbies[current].color }} />;
                    })()}
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-1">
                    {hobbies[current].title}
                  </h4>
                  <p className="text-white/40 text-sm">
                    {hobbies[current].description}
                  </p>
                </div>

                {/* Large faded icon in background */}
                <div className="absolute right-6 bottom-4 opacity-[0.06]">
                  {(() => {
                    const Icon = hobbies[current].icon;
                    return <Icon size={120} style={{ color: hobbies[current].color }} />;
                  })()}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] text-white/50 hover:text-white hover:bg-black/60 transition-all cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.1] text-white/50 hover:text-white hover:bg-black/60 transition-all cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {hobbies.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 cursor-pointer ${
                i === current
                  ? "w-6 h-1.5 bg-white/40"
                  : "w-1.5 h-1.5 bg-white/15 hover:bg-white/25"
              }`}
            />
          ))}
        </div>
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
        {/* Row 1: Profile with photo (2cols, 2rows) | Map | Craft */}
        <ProfileWidget />
        <MapWidget />
        <CraftWidget />

        {/* Row 2: Hobbies Carousel (2 cols) */}
        <HobbiesCarousel />

        {/* Row 3: Education | Languages */}
        <EducationWidget />
        <LanguagesWidget />
      </div>
    </section>
  );
}
