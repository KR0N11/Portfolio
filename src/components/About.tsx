"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Languages,
  Rocket,
  Code2,
  Zap,
  Target,
  MapPin,
  Dumbbell,
  Mountain,
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

/* ── Bento Card wrapper with tilt-on-hover ── */
function BentoCard({
  children,
  className = "",
  index = 0,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      className={`glass-card overflow-hidden hover:border-primary/50 transition-all duration-300 group ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ── Montreal Location Widget ── */
function LocationWidget() {
  return (
    <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden">
      {/* Animated dot grid background */}
      <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dot-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-3">
          <div className="relative">
            <MapPin className="text-primary" size={20} />
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            {"Montréal, QC"}
          </span>
        </div>
        <p className="text-text-secondary text-sm leading-relaxed">
          Based in Montréal — a city that runs on creativity, culture, and
          cold winters that build resilience.
        </p>
      </div>

      <div className="relative z-10 mt-4 flex items-center gap-4 text-text-muted text-xs font-mono">
        <span>45.5017° N</span>
        <span className="text-primary">•</span>
        <span>73.5673° W</span>
      </div>
    </div>
  );
}

/* ── Hobby Card ── */
function HobbyCard({
  icon,
  label,
  imageSrc,
  imageAlt,
}: {
  icon: React.ReactNode;
  label: string;
  imageSrc?: string;
  imageAlt: string;
}) {
  return (
    <div className="relative h-full min-h-[180px]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
          {icon}
        </div>
        <span className="text-white font-medium text-sm">{label}</span>
      </div>
    </div>
  );
}

const mindsetCards = [
  {
    icon: <Rocket className="text-primary" size={24} />,
    title: "Bias Toward Action",
    description:
      "I believe in execution over deliberation. Products ship and problems get solved through decisive action and rapid iteration.",
  },
  {
    icon: <Target className="text-primary" size={24} />,
    title: "Ship & Iterate",
    description:
      "Complex problems don\u2019t need perfect plans \u2014 they need motion, feedback loops, and relentless improvement.",
  },
];

const craftCards = [
  {
    icon: <Code2 className="text-primary" size={24} />,
    title: "Full-Stack Builder",
    description:
      "From Java-based LLMs and cloud architectures to Swift mobile apps and React frontends.",
  },
  {
    icon: <Zap className="text-primary" size={24} />,
    title: "AI & Automation",
    description:
      "Leveraging AI to automate workflows, build intelligent agents, and unlock productivity at scale.",
  },
];

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
          A software developer who ships products, solves hard problems, and
          moves fast with purpose.
        </p>
      </motion.div>

      {/* ── Row 1: Profile photo | Location + About text ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        {/* Profile photo */}
        <BentoCard className="md:col-span-2 rounded-2xl" index={0}>
          <div className="aspect-[3/4] relative">
            <Image
              src="/image/Profile_picture.jpg"
              alt="Ping Chun Lui"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </BentoCard>

        {/* Right column: Location + Info cards */}
        <div className="md:col-span-3 flex flex-col gap-4">
          {/* Location widget */}
          <BentoCard className="rounded-2xl" index={1}>
            <LocationWidget />
          </BentoCard>

          {/* Education + Trilingual row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BentoCard className="rounded-2xl p-6" index={2}>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <GraduationCap className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Education</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    DEC in Computer Science (Co-op) at Coll&egrave;ge LaSalle, Montr&eacute;al. Expected graduation 2026.
                  </p>
                </div>
              </div>
            </BentoCard>

            <BentoCard className="rounded-2xl p-6" index={3}>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Languages className="text-primary" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Trilingual</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    Fluent in English, French, and Chinese — seamless collaboration across international teams.
                  </p>
                </div>
              </div>
            </BentoCard>
          </div>
        </div>
      </div>

      {/* ── Row 2: Mindset | Hobbies | Craft ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Mindset column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted px-1">
            Mindset
          </h3>
          {mindsetCards.map((card, i) => (
            <BentoCard key={card.title} className="rounded-2xl p-6" index={4 + i}>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{card.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

        {/* Hobbies column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted px-1">
            Hobbies
          </h3>
          <BentoCard className="rounded-2xl flex-1" index={6}>
            <HobbyCard
              icon={<Mountain className="text-white" size={18} />}
              label="Bouldering"
              imageSrc="/image/bouldering.jpg"
              imageAlt="Bouldering with friends"
            />
          </BentoCard>
          <BentoCard className="rounded-2xl flex-1" index={7}>
            <HobbyCard
              icon={<Dumbbell className="text-white" size={18} />}
              label="Gym & Fitness"
              imageAlt="Gym and fitness"
            />
          </BentoCard>
        </div>

        {/* Craft column */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted px-1">
            Craft
          </h3>
          {craftCards.map((card, i) => (
            <BentoCard key={card.title} className="rounded-2xl p-6" index={8 + i}>
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{card.title}</h4>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>
      </div>
    </section>
  );
}
