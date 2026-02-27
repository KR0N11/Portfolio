"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-[4%]">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-[#E50914] text-xs font-semibold tracking-[0.3em] uppercase mb-2">
            What I work with
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Technical Skills
          </h2>
        </motion.div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.08, duration: 0.5 }}
              className="group relative rounded-xl bg-[#181818] border border-white/[0.04] overflow-hidden hover:border-white/[0.1] transition-all duration-300"
            >
              {/* Top accent bar */}
              <div
                className="h-[2px]"
                style={{ backgroundColor: cat.color }}
              />

              {/* Background glow on hover */}
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                style={{ background: cat.color }}
              />

              <div className="relative p-5">
                {/* Category name */}
                <div className="flex items-center gap-2.5 mb-5">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                    {cat.name}
                  </h3>
                </div>

                {/* Tech items — big icons */}
                <div className="grid grid-cols-3 gap-3">
                  {cat.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: catIdx * 0.05 + i * 0.03 }}
                      whileHover={{ scale: 1.08, y: -3 }}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/[0.06] transition-all duration-200 cursor-default"
                    >
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${cat.color}12` }}
                      >
                        {item.icon ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-6 h-6"
                            loading="lazy"
                            onError={(e) => {
                              const el = e.target as HTMLImageElement;
                              el.style.display = "none";
                              el.nextElementSibling?.classList.remove("hidden");
                            }}
                          />
                        ) : null}
                        <span
                          className={`text-xs font-bold font-mono ${item.icon ? "hidden" : ""}`}
                          style={{ color: cat.color }}
                        >
                          {item.abbr}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#999] text-center leading-tight font-medium">
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
