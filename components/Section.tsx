import type { ReactNode } from "react";
import Reveal from "./Reveal";

/*
  Section shell: oversized outlined index number (01, 02, …) bleeding
  behind the content, plus a mono label with a hairline rule.
  `flip` mirrors the number to the right edge so sections alternate.
*/
export default function Section({
  id,
  index,
  label,
  flip = false,
  tightBottom = false,
  className = "",
  children,
}: {
  id: string;
  index: string;
  label: string;
  flip?: boolean;
  /* Drop the shell's bottom padding; the section supplies its own end spacing. */
  tightBottom?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative scroll-mt-20 ${className}`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute top-8 select-none font-display text-[clamp(7rem,16vw,13rem)] font-extrabold leading-none text-stroke ${
          flip ? "right-0 md:right-6" : "left-0 md:left-6"
        }`}
      >
        {index}
      </div>

      <div
        className={`relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10 ${
          tightBottom ? "pt-24 md:pt-36" : "py-24 md:py-36"
        }`}
      >
        <Reveal>
          <div className={`mb-14 flex items-center gap-6 md:mb-20 ${flip ? "flex-row-reverse" : ""}`}>
            <span className="font-mono text-xs uppercase tracking-[0.35em] text-steel">
              {index} / {label}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
