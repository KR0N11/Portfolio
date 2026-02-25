"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  GraduationCap,
  Globe,
  Dumbbell,
  Mountain,
  CookingPot,
  Code2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5 },
  }),
};

/* ── Hobbies Image Carousel ── */
function HobbiesCarousel() {
  const hobbies = [
    {
      icon: Dumbbell,
      title: "Gym",
      subtitle: "Strength training & discipline",
      color: "#ef4444",
      // Replace these with actual images later
      image: null as string | null,
    },
    {
      icon: Mountain,
      title: "Bouldering",
      subtitle: "Problem solving on walls",
      color: "#22c55e",
      image: "/image/Bouldering.png",
    },
    {
      icon: CookingPot,
      title: "Cooking",
      subtitle: "Creating from scratch",
      color: "#fbbf24",
      image: null as string | null,
    },
  ];

  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAuto = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((p) => (p + 1) % hobbies.length);
    }, 5000);
  };

  useEffect(() => {
    startAuto();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goTo = (idx: number) => {
    setCurrent(idx);
    startAuto();
  };

  const prev = () => goTo((current - 1 + hobbies.length) % hobbies.length);
  const next = () => goTo((current + 1) % hobbies.length);

  const hobby = hobbies[current];
  const Icon = hobby.icon;

  return (
    <motion.div
      custom={7}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="sm:col-span-2 bg-[#141414] rounded-lg border border-white/[0.06] overflow-hidden"
    >
      <div className="p-4 pb-2">
        <p className="text-[#999] text-xs uppercase tracking-wider mb-3">
          When I&apos;m not coding
        </p>
      </div>

      {/* Carousel */}
      <div className="relative h-[220px] md:h-[260px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0"
          >
            {hobby.image ? (
              /* Has image */
              <div className="relative w-full h-full">
                <Image
                  src={hobby.image}
                  alt={hobby.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/60 to-transparent" />

                {/* Info overlay */}
                <div className="absolute bottom-4 left-4 right-4 z-10">
                  <div className="flex items-center gap-3 mb-1">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${hobby.color}20` }}
                    >
                      <Icon size={20} style={{ color: hobby.color }} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">
                        {hobby.title}
                      </h4>
                      <p className="text-[#bbb] text-xs">{hobby.subtitle}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Placeholder — add images later */
              <div
                className="w-full h-full flex flex-col items-center justify-center gap-4"
                style={{
                  background: `radial-gradient(ellipse at center, ${hobby.color}08 0%, #141414 70%)`,
                }}
              >
                <div
                  className="p-4 rounded-2xl"
                  style={{ backgroundColor: `${hobby.color}12` }}
                >
                  <Icon size={40} style={{ color: hobby.color }} />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {hobby.title}
                  </h4>
                  <p className="text-[#888] text-xs">{hobby.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 mt-2 text-[#444]">
                  <ImageIcon size={12} />
                  <span className="text-[10px] font-mono">
                    Image coming soon
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav arrows */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.08] text-white/50 hover:text-white hover:bg-black/70 transition-all cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/[0.08] text-white/50 hover:text-white hover:bg-black/70 transition-all cursor-pointer"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 py-3">
        {hobbies.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Left column — Photo */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden max-w-[280px] mx-auto md:mx-0 shadow-2xl">
                <Image
                  src="/image/me.jpg"
                  alt="Ping Chun Lui"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 70vw, 280px"
                  priority
                />
                {/* Subtle gradient at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#181818] to-transparent" />
              </div>
            </motion.div>

            {/* Right column — Info */}
            <div className="md:col-span-2 flex flex-col gap-5">
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

              {/* Info grid — 2 cols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Location + Map */}
                <motion.div
                  custom={2}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-[#141414] rounded-lg p-4 border border-white/[0.06] relative overflow-hidden"
                >
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
                  <p className="text-[#999] text-xs">DEC in Computer Science</p>
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

                {/* Hobbies Carousel — spans 2 cols */}
                <HobbiesCarousel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
