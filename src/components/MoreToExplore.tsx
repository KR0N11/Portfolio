"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Trophy,
  Link2,
  ArrowRight,
  MessageSquare,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

interface ExploreCard {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  href: string;
  external?: boolean;
}

const cards: ExploreCard[] = [
  {
    title: "Guestbook",
    description: "Leave a message or say hello",
    icon: MessageSquare,
    color: "#a78bfa",
    href: "/guestbook",
    external: true,
  },
  {
    title: "Achievements",
    description: "Awards, certifications & milestones",
    icon: Trophy,
    color: "#f59e0b",
    href: "#achievements",
  },
  {
    title: "My Links",
    description: "Find me across the internet",
    icon: Link2,
    color: "#38bdf8",
    href: "#contact",
  },
];

export default function MoreToExplore() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-[4%] text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[#E50914] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            More to explore
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Discover More
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.a
                key={card.title}
                href={card.href}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="group relative rounded-xl bg-[#181818] border border-white/[0.04] p-6 text-left overflow-hidden hover:border-white/[0.1] transition-all duration-300 cursor-pointer block"
                onClick={(e) => {
                  if (!card.external) {
                    e.preventDefault();
                    document
                      .querySelector(card.href)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{ backgroundColor: card.color }}
                />

                {/* Background glow */}
                <div
                  className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl opacity-[0.04] group-hover:opacity-[0.08] transition-opacity"
                  style={{ background: card.color }}
                />

                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${card.color}15` }}
                  >
                    <Icon size={32} style={{ color: card.color }} />
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">
                    {card.title}
                  </h3>
                  <p className="text-[#888] text-xs leading-relaxed mb-4">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-medium group-hover:gap-2.5 transition-all" style={{ color: card.color }}>
                    <span>Explore</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Quick links row below */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <a
            href="https://github.com/KR0N11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181818] border border-white/[0.04] text-[#888] text-xs hover:text-white hover:border-white/[0.1] transition-all"
          >
            <Github size={14} />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ping-chun-lui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181818] border border-white/[0.04] text-[#888] text-xs hover:text-white hover:border-white/[0.1] transition-all"
          >
            <Linkedin size={14} />
            LinkedIn
          </a>
          <a
            href="mailto:kevinlui415@gmail.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#181818] border border-white/[0.04] text-[#888] text-xs hover:text-white hover:border-white/[0.1] transition-all"
          >
            <Mail size={14} />
            Email
          </a>
        </motion.div>
      </div>
    </section>
  );
}
