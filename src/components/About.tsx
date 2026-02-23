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

/* ── Bento Card wrapper ── */
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

/* ── Montreal Map Widget ── */
function MapWidget() {
  return (
    <div className="h-full flex flex-col">
      {/* Map header */}
      <div className="p-4 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="relative">
            <MapPin className="text-primary" size={18} />
            <motion.div
              className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="text-primary text-sm font-semibold tracking-wide uppercase">
            Montréal, QC
          </span>
        </div>
        <p className="text-text-secondary text-xs leading-relaxed">
          A city that runs on creativity, culture, and cold winters that build resilience.
        </p>
      </div>

      {/* Embedded map */}
      <div className="flex-1 min-h-[180px] relative">
        <iframe
          title="Montreal location map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=-73.6517%2C45.4617%2C-73.4817%2C45.5417&layer=mapnik&marker=45.5017%2C-73.5673"
          className="w-full h-full border-0 rounded-b-2xl"
          style={{ minHeight: "180px", filter: "saturate(0.8) contrast(1.1)" }}
          loading="lazy"
        />
        {/* Dark mode overlay for map */}
        <div className="absolute inset-0 bg-bg/10 pointer-events-none rounded-b-2xl dark:mix-blend-multiply" />
      </div>

      {/* Coordinates footer */}
      <div className="absolute bottom-2 left-4 right-4 flex items-center gap-4 text-text-muted text-[10px] font-mono bg-bg-card/80 backdrop-blur-sm px-2 py-1 rounded-md w-fit">
        <span>45.5017° N</span>
        <span className="text-primary">•</span>
        <span>73.5673° W</span>
      </div>
    </div>
  );
}

/* ── Info Card (Education, Language) ── */
function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 h-full flex items-start gap-3">
      <div className="p-2 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-sm mb-1">{title}</h3>
        <p className="text-text-secondary text-xs leading-relaxed">
          {description}
        </p>
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
    <div className="relative h-full min-h-[160px]">
      {imageSrc && (
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center gap-2">
        <div className="p-2 rounded-lg bg-white/10 backdrop-blur-sm">
          {icon}
        </div>
        <span className="text-white font-medium text-sm">{label}</span>
      </div>
    </div>
  );
}

/* ── Compact Mindset/Craft Card ── */
function CompactCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 h-full flex items-start gap-3">
      <div className="p-2 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-sm mb-1">{title}</h4>
        <p className="text-text-secondary text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="section-padding max-w-7xl mx-auto"
      aria-label="About me"
    >
      {/* Section heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
          About <span className="text-gradient">Me</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          A software developer who ships products, solves hard problems, and
          moves fast with purpose.
        </p>
      </motion.div>

      {/* ── Row 1: Profile Photo | Map + Info ── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {/* Profile photo — 4 cols */}
        <BentoCard className="md:col-span-4 rounded-2xl" index={0}>
          <div className="aspect-[3/4] relative">
            <Image
              src="/image/Profile_picture.jpg"
              alt="Ping Chun Lui"
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </BentoCard>

        {/* Right side — 8 cols */}
        <div className="md:col-span-8 grid grid-rows-[1fr_auto] gap-4">
          {/* Montreal map widget */}
          <BentoCard className="rounded-2xl relative" index={1}>
            <MapWidget />
          </BentoCard>

          {/* Education + Language row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BentoCard className="rounded-2xl" index={2}>
              <InfoCard
                icon={<GraduationCap className="text-primary" size={20} />}
                title="Education"
                description="DEC in Computer Science (Co-op) at Collège LaSalle, Montréal. Expected graduation 2026."
              />
            </BentoCard>
            <BentoCard className="rounded-2xl" index={3}>
              <InfoCard
                icon={<Languages className="text-primary" size={20} />}
                title="Trilingual"
                description="Fluent in English, French, and Chinese — seamless collaboration across international teams."
              />
            </BentoCard>
          </div>
        </div>
      </div>

      {/* ── Row 2: Mindset | Hobbies | Craft — 3 even columns ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Mindset */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted px-1">
            Mindset
          </h3>
          <BentoCard className="rounded-2xl" index={4}>
            <CompactCard
              icon={<Rocket className="text-primary" size={20} />}
              title="Bias Toward Action"
              description="I believe in execution over deliberation. Products ship through decisive action and rapid iteration."
            />
          </BentoCard>
          <BentoCard className="rounded-2xl" index={5}>
            <CompactCard
              icon={<Target className="text-primary" size={20} />}
              title="Ship & Iterate"
              description="Complex problems don't need perfect plans — they need motion, feedback loops, and relentless improvement."
            />
          </BentoCard>
        </div>

        {/* Hobbies */}
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

        {/* Craft */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold tracking-widest uppercase text-text-muted px-1">
            Craft
          </h3>
          <BentoCard className="rounded-2xl" index={8}>
            <CompactCard
              icon={<Code2 className="text-primary" size={20} />}
              title="Full-Stack Builder"
              description="From Java-based LLMs and cloud architectures to Swift mobile apps and React frontends."
            />
          </BentoCard>
          <BentoCard className="rounded-2xl" index={9}>
            <CompactCard
              icon={<Zap className="text-primary" size={20} />}
              title="AI & Automation"
              description="Leveraging AI to automate workflows, build intelligent agents, and unlock productivity at scale."
            />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
