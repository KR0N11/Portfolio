"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/portfolio";

export default function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="py-8 md:py-12">
      <div className="px-[4%] mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-white">
          Technical Skills
        </h2>
      </div>

      <div className="px-[4%] grid grid-cols-2 md:grid-cols-3 gap-4">
        {skillCategories.map((cat, catIdx) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.06, duration: 0.4 }}
            className="bg-[#181818] rounded-xl border border-white/[0.04] p-4 md:p-5"
          >
            {/* Category header */}
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-1 h-5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <h3 className="text-sm font-bold text-white">{cat.name}</h3>
            </div>

            {/* Icon grid */}
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item, i) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: catIdx * 0.05 + i * 0.03 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="flex flex-col items-center gap-1.5 p-2 rounded-lg hover:bg-white/[0.03] transition-colors w-[60px]"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${cat.color}10` }}
                  >
                    {item.icon ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="w-5 h-5"
                        loading="lazy"
                        onError={(e) => {
                          const el = e.target as HTMLImageElement;
                          el.style.display = "none";
                          el.nextElementSibling?.classList.remove("hidden");
                        }}
                      />
                    ) : null}
                    <span
                      className={`text-[10px] font-bold font-mono ${item.icon ? "hidden" : ""}`}
                      style={{ color: cat.color }}
                    >
                      {item.abbr}
                    </span>
                  </div>
                  <span className="text-[9px] text-[#888] text-center leading-tight truncate w-full">
                    {item.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
