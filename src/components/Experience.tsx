"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding max-w-7xl mx-auto"
      aria-label="Work experience"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl">
          Where I&apos;ve shipped real products and solved real problems.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div
          className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border"
          aria-hidden="true"
        />

        <div className="space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative pl-12 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-2 md:left-6 top-1 w-5 h-5 rounded-full bg-primary border-4 border-bg flex items-center justify-center">
                <Briefcase size={10} className="text-bg" />
              </div>

              {/* Card */}
              <div className="glass-card p-6 md:p-8 hover:border-primary/50 transition-all duration-300 group">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-text-muted font-mono shrink-0">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3" role="list">
                  {exp.highlights.map((h, hi) => (
                    <motion.li
                      key={hi}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + hi * 0.1 }}
                      className="flex items-start gap-3 text-text-secondary text-sm leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                      {h}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
