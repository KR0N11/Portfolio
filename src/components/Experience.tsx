"use client";

import { motion } from "framer-motion";
import { experiences } from "@/data/portfolio";

export default function Experience() {
  return (
    <section
      id="experience"
      className="section-padding max-w-5xl mx-auto"
      aria-label="Work experience"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-white/20 text-sm font-mono tracking-wider mb-3">
          03 &mdash; experience
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Where I&apos;ve worked
        </h2>
      </motion.div>

      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.15, duration: 0.6 }}
            className="rounded-2xl bg-white/[0.03] border border-white/[0.06] p-6 md:p-8 hover:bg-white/[0.05] transition-colors duration-500 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-5">
              <div>
                <h3 className="text-lg font-semibold text-white tracking-tight">
                  {exp.title}
                </h3>
                <p className="text-white/40 text-sm">{exp.company}</p>
              </div>
              <span className="text-[11px] text-white/20 font-mono shrink-0">
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
                  transition={{ delay: i * 0.15 + hi * 0.08 }}
                  className="flex items-start gap-3 text-white/30 text-sm leading-relaxed"
                >
                  <span className="w-1 h-1 rounded-full bg-white/20 mt-2 shrink-0" />
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
