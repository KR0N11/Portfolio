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
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const cards = [
  {
    icon: <Rocket className="text-primary" size={28} />,
    title: "Bias Toward Action",
    description:
      "I believe in execution over deliberation. Products ship, problems get solved, and complex systems come alive through decisive action and rapid iteration.",
    span: "md:col-span-2",
  },
  {
    icon: <Code2 className="text-primary" size={28} />,
    title: "Full-Stack Builder",
    description:
      "From Java-based LLMs and cloud architectures to Swift mobile apps and React frontends, I build across the entire stack.",
    span: "md:col-span-1",
  },
  {
    icon: <GraduationCap className="text-primary" size={28} />,
    title: "Education",
    description:
      "DEC in Computer Science (Co-op Program) at Coll\u00e8ge LaSalle, Montreal. Expected graduation 2026.",
    span: "md:col-span-1",
  },
  {
    icon: <Languages className="text-primary" size={28} />,
    title: "Trilingual",
    description:
      "Fluent in English, French, and Chinese \u2014 enabling seamless collaboration across international teams and diverse communities.",
    span: "md:col-span-1",
  },
  {
    icon: <Zap className="text-primary" size={28} />,
    title: "AI & Automation",
    description:
      "Passionate about leveraging AI to automate workflows, build intelligent agents, and unlock productivity gains at scale.",
    span: "md:col-span-1",
  },
  {
    icon: <Target className="text-primary" size={28} />,
    title: "Philosophy",
    description:
      "Ship first, iterate fast. Complex problems don't need perfect plans \u2014 they need motion, feedback loops, and relentless improvement.",
    span: "md:col-span-2",
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

      {/* Profile + Montreal intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12"
      >
        {/* Profile photo */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <div className="glass-card overflow-hidden rounded-2xl aspect-[3/4] relative group">
            <Image
              src="/image/Profile_picture.jpg"
              alt="Ping Chun Lui"
              fill
              className="object-cover object-top scale-110 group-hover:scale-115 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
            />
          </div>
        </div>

        {/* Montreal intro + bouldering */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="glass-card p-6 md:p-8 hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="text-primary" size={20} />
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">
                Montr\u00e9al, QC
              </span>
            </div>
            <p className="text-text-secondary leading-relaxed">
              Based in Montr\u00e9al — a city that runs on creativity, culture, and
              cold winters that build resilience. The energy here fuels how I
              work: fast-paced, multicultural, and always building something
              new. When I&apos;m not shipping code, you&apos;ll find me
              bouldering with friends, exploring the city, or automating
              something that probably didn&apos;t need automating.
            </p>
          </div>

          {/* Bouldering photo */}
          <div className="glass-card overflow-hidden rounded-2xl flex-1 min-h-[200px] relative group">
            <Image
              src="/image/bouldering.jpg"
              alt="Bouldering with friends"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <span className="absolute bottom-4 left-4 text-white/80 text-sm font-medium">
              Bouldering crew
            </span>
          </div>
        </div>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            custom={i}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className={`glass-card p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group ${card.span}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 transition-colors">
                {card.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{card.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
