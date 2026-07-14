"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { identity, nav } from "@/lib/content";

/*
  Site chrome: a top bar (monogram + contact shortcut), a chrome
  scroll-progress hairline, and - on desktop - a fixed left rail of
  section indices whose tick grows on the active section.
*/
export default function NavRail() {
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const item of nav) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const initials = identity.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  return (
    <>
      {/* scroll progress hairline */}
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-gradient-to-r from-[#6a6a72] via-[#f2f2f4] to-[#8f8f98]"
        style={{ scaleX: progress }}
      />

      {/* top bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-carbon/60 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 md:px-10">
          <a
            href="#hero"
            aria-label="Back to top"
            className="-mx-2 flex h-14 items-center px-2 font-display text-sm font-bold tracking-widest text-chrome"
          >
            {initials}
          </a>
          <div className="flex items-center gap-6">
            <span className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-steel sm:flex">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-silver/60 motion-reduce:animate-none" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-silver" />
              </span>
              {identity.location}
            </span>
            <a
              href="#contact"
              className="-mx-2 flex h-14 items-center px-2 font-mono text-[10px] uppercase tracking-[0.25em] text-steel transition-colors duration-300 hover:text-chrome"
            >
              Contact
            </a>
          </div>
        </div>
      </header>

      {/* left rail - wide desktop only, where the 1152px container leaves
          real margin. Between lg and 2xl the top bar carries navigation. */}
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 2xl:left-10 2xl:flex"
      >
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group flex items-center gap-3 py-2"
            >
              <span
                className={`font-mono text-[10px] tracking-widest transition-colors duration-300 ${
                  isActive
                    ? "text-chrome"
                    : "text-steel group-hover:text-silver"
                }`}
              >
                {item.index}
              </span>
              <span
                aria-hidden
                className={`h-px transition-all duration-500 ${
                  isActive
                    ? "w-10 bg-gradient-to-r from-white/70 to-white/20"
                    : "w-4 bg-white/15 group-hover:w-7 group-hover:bg-white/30"
                }`}
              />
              <span
                className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-opacity duration-300 ${
                  isActive
                    ? "text-silver opacity-100"
                    : "opacity-0 group-hover:opacity-80 group-focus-visible:opacity-80"
                }`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}
