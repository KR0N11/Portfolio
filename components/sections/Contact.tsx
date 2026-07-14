import Section from "@/components/Section";
import Reveal from "@/components/Reveal";
import ChromeText from "@/components/ChromeText";
import MagneticButton from "@/components/MagneticButton";
import { contact, identity } from "@/lib/content";

/*
  06 / Contact - the finale. Centered composition (the one section allowed
  to be), giant mailto centerpiece, then the site footer. This file owns
  the end of the page.

  NOTE: contact.email / contact.github / contact.linkedin are placeholders -
  set the real values in lib/content.ts.
*/

function GitHubIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M14.82 0H1.18C.53 0 0 .52 0 1.15v13.7C0 15.48.53 16 1.18 16h13.64c.65 0 1.18-.52 1.18-1.15V1.15C16 .52 15.47 0 14.82 0ZM4.74 13.63H2.37V6h2.37v7.63ZM3.56 4.96a1.38 1.38 0 1 1 0-2.75 1.38 1.38 0 0 1 0 2.75Zm10.08 8.67h-2.37V9.92c0-.88-.02-2.02-1.23-2.02-1.24 0-1.43.96-1.43 1.96v3.77H6.24V6h2.28v1.04h.03c.32-.6 1.09-1.23 2.25-1.23 2.4 0 2.84 1.58 2.84 3.63v4.19Z" />
    </svg>
  );
}

export default function Contact() {
  return (
    <>
      <Section id="contact" index="06" label="Contact" tightBottom>
        <div className="relative pt-8 pb-16 md:pt-12 md:pb-24">
          {/* Faint radial spotlight behind the heading */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 flex items-start justify-center overflow-hidden"
          >
            <div className="animate-float -mt-20 h-[24rem] w-[24rem] shrink-0 rounded-full bg-[radial-gradient(closest-side,rgba(247,247,249,0.07),transparent_72%)] md:-mt-28 md:h-[32rem] md:w-[44rem]" />
          </div>

          <div className="relative z-10">
            <Reveal>
              <ChromeText
                as="h2"
                shimmer
                className="block text-center font-display text-[clamp(2.6rem,7vw,5rem)] font-extrabold leading-[1.05] tracking-tight"
              >
                {contact.heading}
              </ChromeText>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mx-auto mt-6 max-w-xl text-center text-base leading-relaxed text-steel md:text-lg">
                {contact.sub}
              </p>
            </Reveal>

            {/* The centerpiece: one email, treated like an engraving */}
            <Reveal delay={0.2} className="mt-14 flex justify-center md:mt-20">
              <a
                href={`mailto:${contact.email}`}
                className="group glint inline-flex min-h-14 cursor-pointer items-center px-3 py-3"
              >
                <span className="relative">
                  <span className="break-all font-display text-[clamp(1.3rem,6.5vw,2.25rem)] font-semibold tracking-tight text-silver transition-colors duration-300 group-hover:text-chrome md:text-4xl">
                    {contact.email}
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-white/80 via-white/40 to-white/5 transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100 md:-bottom-3"
                  />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.3} className="mt-12 md:mt-16">
              <div className="flex flex-wrap items-center justify-center gap-4">
                <MagneticButton href={contact.github} variant="ghost" external>
                  <GitHubIcon />
                  GitHub
                </MagneticButton>
                <MagneticButton href={contact.linkedin} variant="ghost" external>
                  <LinkedInIcon />
                  LinkedIn
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* Site footer - end of the page */}
      <footer className="border-t border-white/8">
        <Reveal y={12}>
          <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row md:px-10">
            <p className="text-center font-mono text-[11px] uppercase tracking-[0.2em] text-steel sm:text-left">
              {contact.footer}
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <p className="text-sm text-steel">© 2026 {identity.name}</p>
              {/* easter egg: the cube leads to /jenga (or type "jenga" anywhere) */}
              <a
                href="/jenga"
                aria-label="A little game"
                title="?"
                className="inline-flex min-h-11 min-w-11 cursor-pointer items-center justify-center text-iron transition-colors duration-300 hover:text-chrome"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3zm0 0v6m8-1.5L12 12 4 7.5M12 21v-9"
                  />
                </svg>
              </a>
              <a
                href="#hero"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-2 font-mono text-[11px] uppercase tracking-[0.2em] text-steel transition-colors duration-300 hover:text-chrome"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-3.5 w-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 19V5m0 0l-6 6m6-6l6 6"
                  />
                </svg>
                Back to top
              </a>
            </div>
          </div>
        </Reveal>
      </footer>
    </>
  );
}
