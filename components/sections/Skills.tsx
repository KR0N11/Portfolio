"use client";

import { motion, useReducedMotion } from "framer-motion";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import { skills } from "@/lib/content";

/*
  Skills: a machined spec sheet, not progress bars.
  Three engraved columns of indexed line items, the Power Platform
  badge as a stamped plate, and an outlined-type conveyor marquee
  running the full inventory underneath.
*/

const marqueeText = skills.groups.flatMap((g) => g.items).join(" · ");

const marqueeLineClass =
  "shrink-0 select-none whitespace-nowrap font-display text-5xl font-extrabold leading-none text-stroke md:text-7xl";

export default function Skills() {
  const reduced = useReducedMotion();

  /* Running spec number across all groups: 04.1 … 04.11 */
  let specNumber = 0;

  return (
    <Section id="skills" index="04" label="Skills" flip>
      <h2 className="sr-only">Skills</h2>

      {/* Data plate: columns divided by hairlines */}
      <div className="grid divide-y divide-white/8 lg:grid-cols-3 lg:divide-x lg:divide-y-0">
        {skills.groups.map((group, gi) => (
          <Reveal
            key={group.label}
            delay={gi * 0.08}
            className="py-10 first:pt-0 last:pb-0 lg:px-8 lg:py-0 lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-steel md:text-xs">
              {group.label}
            </h3>
            <span
              aria-hidden
              className="mt-3 block h-px w-12 bg-gradient-to-r from-white/25 to-transparent"
            />

            <ul className="mt-6">
              {group.items.map((item) => {
                specNumber += 1;
                const spec = `04.${specNumber}`;
                return (
                  <li
                    key={item}
                    className="group border-b border-white/5 last:border-b-0"
                  >
                    <div className="flex items-baseline gap-4 py-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1">
                      <span
                        aria-hidden
                        className="font-mono text-xs text-iron"
                      >
                        {spec}
                      </span>
                      <span className="text-lg font-medium text-silver transition-colors duration-300 group-hover:text-chrome md:text-xl">
                        {item}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>

            {"highlight" in group && (
              <div className="glint metal-panel mt-8 rounded-lg px-4 py-3">
                {/* Brushed striations + corner rivets, engraved badge */}
                <span
                  aria-hidden
                  className="brushed pointer-events-none absolute inset-0"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                >
                  <span className="absolute left-1.5 top-1.5 h-[3px] w-[3px] rounded-full bg-white/20" />
                  <span className="absolute right-1.5 top-1.5 h-[3px] w-[3px] rounded-full bg-white/20" />
                  <span className="absolute bottom-1.5 left-1.5 h-[3px] w-[3px] rounded-full bg-white/20" />
                  <span className="absolute bottom-1.5 right-1.5 h-[3px] w-[3px] rounded-full bg-white/20" />
                </span>
                <span className="relative block font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-silver">
                  {group.highlight}
                </span>
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* Engraved conveyor: full-bleed outlined marquee */}
      <Reveal delay={0.15} className="-mx-6 mt-20 md:-mx-10 md:mt-28">
        <div
          aria-hidden
          className="overflow-hidden border-y border-white/5 py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] md:py-8"
        >
          <motion.div
            className="flex w-max"
            animate={reduced ? undefined : { x: ["0%", "-50%"] }}
            transition={
              reduced
                ? undefined
                : { duration: 45, ease: "linear", repeat: Infinity }
            }
          >
            <span className={marqueeLineClass}>
              {marqueeText}
              {" · "}
            </span>
            <span className={marqueeLineClass}>
              {marqueeText}
              {" · "}
            </span>
          </motion.div>
        </div>
      </Reveal>
    </Section>
  );
}
