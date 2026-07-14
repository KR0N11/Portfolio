"use client";

/*
  05 / Beyond - the human specs. A palate cleanser before contact.
  Desktop: five vertical metal blades that widen on hover/focus to
  expose their note. Mobile: a compact divided list, notes visible.
  The "Coffee", "Keyboards" and "F1" entries are tagged [INVENTED]
  in lib/content.ts - swap them there, not here.
*/

import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import QuoteOfTheDay from "@/components/QuoteOfTheDay";
import { beyond } from "@/lib/content";

export default function Beyond() {
  return (
    <Section id="beyond" index="05" label="Beyond">
      <h2 className="sr-only">Beyond code</h2>

      {/* Desktop: interactive blades. flex-grow transition is the one
          allowed non-transform exception - bounded 5-item container. */}
      <ul className="hidden h-[380px] gap-3 lg:flex">
        {beyond.map((item, i) => (
          <li
            key={item.title}
            className="group min-w-0 flex-1 transition-[flex-grow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:grow-[2.5] focus-within:grow-[2.5]"
          >
            <Reveal delay={i * 0.08} className="h-full">
              <div
                tabIndex={0}
                className="metal-panel brushed glint relative h-full cursor-default overflow-hidden rounded-xl"
              >
                {/* top catchlight - brightens as the blade opens */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-within:opacity-100"
                />

                <div className="relative z-10 flex h-full flex-col items-start justify-between p-5">
                  <span
                    aria-hidden
                    className="font-mono text-xs tracking-[0.25em] text-iron"
                  >
                    05.{i + 1}
                  </span>
                  <span className="whitespace-nowrap font-display text-xl font-bold text-silver [writing-mode:vertical-rl] rotate-180">
                    {item.title}
                  </span>
                </div>

                <p className="absolute bottom-0 left-0 z-10 w-72 max-w-full translate-y-2 p-5 pl-16 text-sm leading-relaxed text-steel opacity-0 transition-[opacity,transform] delay-150 duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                  {item.note}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Mobile: stacked list, everything readable without interaction */}
      <ul className="divide-y divide-white/8 lg:hidden">
        {beyond.map((item, i) => (
          <li key={item.title}>
            <Reveal delay={i * 0.06} className="flex items-baseline gap-4 py-5">
              <span
                aria-hidden
                className="shrink-0 font-mono text-[10px] tracking-[0.25em] text-iron"
              >
                05.{i + 1}
              </span>
              <span className="shrink-0 font-display text-lg font-bold text-silver">
                {item.title}
              </span>
              <span className="min-w-0 flex-1 text-sm leading-relaxed text-steel">
                {item.note}
              </span>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* daily-rotating quote plate closes the section */}
      <Reveal delay={0.1} className="mt-14 md:mt-20">
        <QuoteOfTheDay />
      </Reveal>
    </Section>
  );
}
