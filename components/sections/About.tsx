import { about } from "@/lib/content";
import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ChromeText from "@/components/ChromeText";

/*
  01 / About - asymmetric split: a sticky display statement on the left,
  scrolling body copy on the right, and a row of engraved stat tiles below.
  Server component: all motion comes from <Reveal>; hovers are CSS-only.
*/

const ACCENT = "black boxes.";

export default function About() {
  const accentAt = about.heading.lastIndexOf(ACCENT);
  const lead = accentAt === -1 ? about.heading : about.heading.slice(0, accentAt).trimEnd();
  const accent = accentAt === -1 ? null : about.heading.slice(accentAt);

  return (
    <Section id="about" index="01" label="About">
      <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-8">
        {/* Left - display statement, pins while the copy scrolls past */}
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <Reveal>
            <h2 className="max-w-[16ch] font-display text-[clamp(2.2rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-silver">
              {accent ? (
                <>
                  {lead} <ChromeText className="block">{accent}</ChromeText>
                </>
              ) : (
                about.heading
              )}
            </h2>
            <span
              aria-hidden
              className="mt-8 block h-px w-24 bg-gradient-to-r from-white/40 to-transparent"
            />
          </Reveal>
        </div>

        {/* Right - staggered paragraphs, offset one column off the heading */}
        <div className="space-y-6 md:space-y-8 lg:col-span-6 lg:col-start-7">
          {about.paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <p
                className={
                  i === 0
                    ? "text-lg/relaxed text-silver"
                    : "leading-relaxed text-steel"
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Below - stat tiles, full width */}
      <div className="mt-16 grid gap-4 sm:grid-cols-3 md:mt-24">
        {about.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className="h-full">
            <div className="group metal-panel brushed glint h-full rounded-2xl p-7 transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1">
              <div aria-hidden className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-iron transition-colors duration-300 group-hover:text-steel">
                  A.{i + 1}
                </span>
                <span className="h-px flex-1 bg-white/8 transition-colors duration-300 group-hover:bg-white/15" />
              </div>
              <ChromeText
                as="div"
                className="mt-10 font-display text-5xl font-bold tracking-tight md:mt-12 md:text-6xl"
              >
                {stat.value}
              </ChromeText>
              <div className="mt-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.25em] text-steel md:text-xs">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
