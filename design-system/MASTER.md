# Chrome Portfolio - Design Contract (source of truth)

One-page scroll portfolio. Aesthetic: **liquid metal** - chrome, silver, black.
High-end watch brand × Vercel × concept-car reveal. Dark only. Engineered, not decorated.

## Hard rules

1. Copy comes ONLY from `@/lib/content` - never write your own copy (micro-labels like "scroll" or aria-labels are fine).
2. Tailwind classes only; no styled-jsx, no CSS files, no new dependencies, no `next/image`, no external assets.
3. No emoji anywhere. Icons = inline SVG (stroke 1.5, `currentColor`).
4. Animate `transform`/`opacity` only. Every custom animation must respect reduced motion (`useReducedMotion` from framer-motion, or use `<Reveal>` which already does).
5. `"use client"` at top of any file using framer-motion hooks/`motion.*` directly. Composing only `Reveal`/`MagneticButton`/`ChromeText` + static markup = server component, no directive.
6. TypeScript strict. Default-export a no-props component.
7. Interactive elements: min 44px touch target, `cursor-pointer`, visible focus (global focus-visible style exists - don't remove outlines).
8. Body copy color: `text-silver` or `text-steel` only. `text-iron` is decorative-only (fails contrast).
9. Headings: the single `h1` lives in Hero. Every other section exposes exactly one `h2`.

## Tokens (Tailwind utilities available)

Colors: `void #050506` (deepest) · `carbon #0a0a0b` (page bg) · `graphite #131316` (panels) · `gunmetal #1b1b1f` (hover surfaces) · `silver #e8e8ec` (primary text) · `chrome #f7f7f9` (brightest) · `steel #98989f` (secondary text) · `iron #55555c` (decorative only).
Usage: `bg-carbon`, `text-silver`, `border-gunmetal`, etc. Borders/hairlines: `border-white/8`, `border-white/15`, brighter on hover `border-white/30`.

Fonts: `font-display` (Archivo - headings, big numbers), `font-sans` (Geist - body), `font-mono` (Geist Mono - labels, indices, tags).
Label style: `font-mono text-[10px] md:text-xs uppercase tracking-[0.25em] text-steel`.

## CSS classes (defined in globals.css)

- `chrome-text` - metal gradient clipped to text. Add `chrome-shimmer` to animate the light band (hero-level moments only; already reduced-motion safe).
- `text-stroke` - outlined transparent type for oversized numbers.
- `metal-panel` - elevated dark panel: gradient bg + hairline border + top catchlight. Cards/tiles use this.
- `brushed` - fine metal striations overlay; combine with `metal-panel`.
- `glint` - light band sweeps across on hover (needs `relative overflow-hidden`, both included).
- `animate-float` - slow ambient drift for background blobs.

## Shared components (import paths exact)

```tsx
import ChromeText from "@/components/ChromeText";
// <ChromeText as="h2" shimmer className="...">text</ChromeText> - shimmer default false

import Reveal from "@/components/Reveal";
// <Reveal delay={0.1} y={28} className="...">…</Reveal> - scroll rise+fade, reduced-motion safe

import MagneticButton from "@/components/MagneticButton";
// <MagneticButton href="#projects" variant="chrome" | "ghost" external>label</MagneticButton>

import Section from "@/components/Section";
// <Section id="about" index="01" label="About" flip>…</Section>
// Renders the oversized outlined index behind content + mono label row with hairline.
// flip mirrors the giant number to the right edge. Children render inside max-w-6xl px-6 md:px-10.
```

Motion vocabulary: `import { EASE_METAL, DUR, fadeRise, staggerParent, VIEWPORT } from "@/lib/motion";`
Hover motion on cards: `whileHover={{ y: -4 }}` with `transition={{ duration: 0.35, ease: EASE_METAL }}`. Subtle. Never scale past 1.02.

## Content module

`import { identity, nav, about, experience, projects, skills, beyond, contact } from "@/lib/content";`
Read `/Users/ping/portfolio/lib/content.ts` for exact shapes before coding.

## Layout system

- Sections 01-06 use the `Section` shell; alternate `flip` = 02 Experience, 04 Skills (giant number on the right).
- Page is asymmetric by design: no centered-stack sections except where specified. Use 12-col grids (`grid grid-cols-12`), offset starts (`col-start-2`), sticky columns where told.
- Breakpoints: design mobile-first; verify mentally at 375 / 768 / 1024 / 1440. No horizontal overflow: any full-bleed decorative element must not widen the page (use overflow-hidden wrappers, avoid 100vw).
- Spacing rhythm: 4/8 scale. Section vertical padding is handled by the shell.
- z-order inside sections: decorative absolutes `z-0` + `pointer-events-none` + `aria-hidden`, content `z-10`.
