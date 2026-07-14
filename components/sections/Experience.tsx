import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ChromeText from "@/components/ChromeText";
import { experience } from "@/lib/content";

/*
  02 / Experience: vertical timeline of internships.
  A hairline rail runs down the left on desktop with a metallic
  rotate-45 node aligned to each entry; the current year is chrome,
  past years are outlined strokes. Rows glint on hover.
*/

const yearType =
  "font-display text-5xl font-extrabold leading-none tracking-tight md:text-6xl";

export default function Experience() {
  return (
    <Section id="experience" index="02" label="Experience" flip>
      <h2 className="sr-only">Experience</h2>

      <div className="relative">
        {/* Timeline rail (desktop only, decorative) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-white/15 to-transparent lg:block"
        />

        {/* NOTE: entries 2 and 3 (2025 "Previous Co.", 2024 "First Co.")
            are [INVENTED] placeholders. Edit them in lib/content.ts. */}
        <ol className="lg:pl-14">
          {experience.map((entry, i) => {
            const current = i === 0;
            const last = i === experience.length - 1;

            return (
              <li key={entry.year}>
                <Reveal delay={i * 0.12}>
                  <div className="group relative">
                    {/* Metallic node pinned to the rail (decorative) */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -left-14 top-[86px] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border border-white/40 bg-carbon transition-colors duration-500 group-hover:border-white/70 lg:block"
                    />

                    <article
                      className={`glint grid grid-cols-12 gap-6 py-10 transition-colors duration-500 group-hover:bg-white/[0.02] md:py-14 ${
                        last ? "" : "border-b border-white/8"
                      }`}
                    >
                      {/* Year */}
                      <div className="col-span-12 lg:col-span-3">
                        <div className="flex flex-wrap items-start gap-x-4 gap-y-3">
                          {current ? (
                            <ChromeText className={yearType}>
                              {entry.year}
                            </ChromeText>
                          ) : (
                            <span className={`text-stroke-strong ${yearType}`}>
                              {entry.year}
                            </span>
                          )}

                          {current && (
                            <span className="mt-1 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.25em] text-steel">
                              <span
                                aria-hidden
                                className="relative flex h-1.5 w-1.5"
                              >
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-silver/70 motion-reduce:animate-none" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-silver" />
                              </span>
                              Current
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="col-span-12 lg:col-span-9 lg:pt-1">
                        <h3 className="font-display text-2xl font-semibold text-silver transition-colors duration-500 group-hover:text-chrome md:text-3xl">
                          {entry.company}
                        </h3>
                        <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-steel md:text-xs">
                          {entry.role}
                        </p>

                        <ul className="mt-6 space-y-4 md:mt-8">
                          {entry.points.map((point) => (
                            <li key={point} className="flex items-start gap-4">
                              <span
                                aria-hidden
                                className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 border border-white/25"
                              />
                              <span className="max-w-prose text-sm leading-relaxed text-steel md:text-base">
                                {point}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
