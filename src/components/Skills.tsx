"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { skillCategories } from "@/data/portfolio";

/* ── Single Skill Item with Icon ── */
function SkillItem({
  item,
  color,
  delay,
}: {
  item: { name: string; icon: string | null; abbr: string };
  color: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.3 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg bg-[#141414] border border-white/[0.04] hover:border-white/[0.1] hover:bg-[#1a1a1a] transition-all group w-[80px] md:w-[90px]"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${color}10` }}
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
          style={{ color }}
        >
          {item.abbr}
        </span>
      </div>
      <span className="text-[10px] text-[#aaa] text-center leading-tight font-medium truncate w-full">
        {item.name}
      </span>
    </motion.div>
  );
}

/* ── Skill Category Section ── */
function SkillCategorySection({
  category,
  index,
  isOpen,
  onToggle,
}: {
  category: (typeof skillCategories)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="bg-[#181818] rounded-xl border border-white/[0.04] overflow-hidden"
    >
      {/* Header - always visible */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 md:p-5 cursor-pointer hover:bg-white/[0.02] transition-colors"
      >
        {/* Color accent */}
        <div
          className="w-1 h-10 rounded-full flex-shrink-0"
          style={{ backgroundColor: category.color }}
        />

        {/* Category info */}
        <div className="flex-1 text-left">
          <h3 className="text-sm md:text-base font-bold text-white">
            {category.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[11px] font-mono"
              style={{ color: category.color }}
            >
              {category.items.length} technologies
            </span>

            {/* Preview icons */}
            <div className="flex items-center -space-x-1 ml-2">
              {category.items.slice(0, 4).map((item) => (
                <div
                  key={item.name}
                  className="w-5 h-5 rounded-md flex items-center justify-center border border-[#282828]"
                  style={{ backgroundColor: `${category.color}10` }}
                >
                  {item.icon ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.icon}
                      alt=""
                      className="w-3 h-3"
                      loading="lazy"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span
                      className="text-[6px] font-bold"
                      style={{ color: category.color }}
                    >
                      {item.abbr}
                    </span>
                  )}
                </div>
              ))}
              {category.items.length > 4 && (
                <div className="w-5 h-5 rounded-md flex items-center justify-center bg-[#222] border border-[#282828]">
                  <span className="text-[7px] text-[#666]">
                    +{category.items.length - 4}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Expand icon */}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#666]"
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Expanded items grid */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-5 pt-1 border-t border-white/[0.04]">
              <div className="flex flex-wrap gap-2 mt-4">
                {category.items.map((item, i) => (
                  <SkillItem
                    key={item.name}
                    item={item}
                    color={category.color}
                    delay={i * 0.03}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ── Main Skills Section ── */
export default function Skills() {
  const [openCategories, setOpenCategories] = useState<Set<number>>(
    new Set([0])
  );

  const toggle = (idx: number) => {
    setOpenCategories((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  // Total count for the header
  const totalSkills = skillCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <section id="skills" aria-label="Skills" className="py-8 md:py-12">
      {/* Section header */}
      <div className="px-[4%] mb-6">
        <div className="flex items-center gap-4 mb-1">
          <h2 className="text-xl md:text-2xl font-bold text-white">
            Technical Skills
          </h2>
          <span className="text-[11px] font-mono text-[#E50914] bg-[#E50914]/10 px-2 py-0.5 rounded">
            {totalSkills}+
          </span>
        </div>
        <p className="text-[#999] text-xs">
          {skillCategories.length} categories &middot; Click to expand
        </p>
      </div>

      {/* Skills grid */}
      <div className="px-[4%] grid grid-cols-1 md:grid-cols-2 gap-3">
        {skillCategories.map((cat, i) => (
          <SkillCategorySection
            key={cat.name}
            category={cat}
            index={i}
            isOpen={openCategories.has(i)}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </section>
  );
}
