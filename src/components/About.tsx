"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Languages,
  Rocket,
  Code2,
  Zap,
  Target,
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
