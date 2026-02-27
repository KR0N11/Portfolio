"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { skillCategories } from "@/data/portfolio";

export default function SkillsMobile() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2" role="list" aria-label="Skills categories">
      {skillCategories.map((cat, i) => (
        <motion.div
          key={cat.name}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="rounded-2xl bg-white/[0.03] border border-white/[0.06] overflow-hidden"
          role="listitem"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
            aria-expanded={openIndex === i}
            aria-controls={`skills-${i}`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm font-medium text-white/70">{cat.name}</span>
            </div>
            <motion.div
              animate={{ rotate: openIndex === i ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={16} className="text-white/20" />
            </motion.div>
          </button>

          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                id={`skills-${i}`}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border"
                      style={{
                        borderColor: `${cat.color}25`,
                        color: `${cat.color}cc`,
                        backgroundColor: `${cat.color}08`,
                      }}
                    >
                      {item.icon && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                          src={item.icon}
                          alt=""
                          width={14}
                          height={14}
                          className="inline-block"
                          loading="lazy"
                        />
                      )}
                      {item.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
