"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillCategories } from "@/data/portfolio";
import ScrollRow from "./ScrollRow";

/* ── Skill Category Card (Netflix style) ── */
function SkillCategoryCard({
  category,
  isSelected,
  onClick,
}: {
  category: (typeof skillCategories)[0];
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <div className="flex-shrink-0 w-[220px] md:w-[260px]">
      <button
        onClick={onClick}
        className={`netflix-card w-full rounded-md overflow-hidden cursor-pointer transition-all duration-300 text-left ${
          isSelected ? "ring-2 ring-white" : ""
        }`}
      >
        <div
          className="relative h-[130px] md:h-[150px] flex flex-col justify-end p-4"
          style={{
            background: `linear-gradient(135deg, ${category.color}15 0%, ${category.color}05 50%, #181818 100%)`,
          }}
        >
          {/* Accent line */}
          <div
            className="absolute top-0 left-0 right-0 h-[3px]"
            style={{ backgroundColor: category.color }}
          />

          {/* Item count */}
          <span
            className="absolute top-3 right-3 text-xs font-mono px-2 py-0.5 rounded"
            style={{
              color: category.color,
              backgroundColor: `${category.color}15`,
            }}
          >
            {category.items.length}
          </span>

          <h3 className="text-sm font-bold text-white mb-1">
            {category.name}
          </h3>

          <div className="flex flex-wrap gap-1">
            {category.items.slice(0, 3).map((item, idx) => (
              <span key={item.name} className="text-[10px] text-[#999]">
                {item.name}
                {idx < 2 ? " ·" : ""}
              </span>
            ))}
            {category.items.length > 3 && (
              <span className="text-[10px] text-[#666]">
                +{category.items.length - 3}
              </span>
            )}
          </div>
        </div>
      </button>
    </div>
  );
}

/* ── Expanded Skills Detail ── */
function SkillsDetail({ category }: { category: (typeof skillCategories)[0] }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="overflow-hidden"
    >
      <div className="bg-[#181818] border-y border-white/[0.06] px-[4%] py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-5 rounded-full"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="text-lg font-bold text-white">{category.name}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {category.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#141414] border border-white/[0.06]"
              >
                {item.icon && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.icon}
                    alt={item.name}
                    className="w-5 h-5"
                    loading="lazy"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <span className="text-[#ccc] text-sm">{item.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <section id="skills" aria-label="Skills" className="section-padding">
      <ScrollRow
        title="Technical Skills"
        subtitle="Click a category to explore"
      >
        {skillCategories.map((cat, i) => (
          <SkillCategoryCard
            key={cat.name}
            category={cat}
            isSelected={selectedIdx === i}
            onClick={() =>
              setSelectedIdx(selectedIdx === i ? null : i)
            }
          />
        ))}
      </ScrollRow>

      <AnimatePresence>
        {selectedIdx !== null && (
          <SkillsDetail category={skillCategories[selectedIdx]} />
        )}
      </AnimatePresence>
    </section>
  );
}
