"use client";

/*
  The Road. The Tarnished sits in the grass at a Site of Grace at night: a 4K
  frame from the official Elden Ring Gameplay Preview. With its depth map the
  frame becomes a small 3D scene: move the pointer and the grass slides past
  him while the forest stays far off. The landmarks ride the same parallax:
  the Tarnished is the profile, the grace holds the projects, the hill keeps a
  lantern for contact. Arrow keys choose, Enter travels, Esc goes back.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DepthScene from "@/components/DepthScene";
import Motes from "@/components/Motes";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Mark = {
  key: string;
  label: string;
  /** spot in the image, 0..1 */
  at: [number, number];
  /** depth there (0 far, 1 near), so the marker moves with the scene */
  depth: number;
  eyebrow: string;
  title: string;
  line: string;
  cta: string;
  href: string;
};

const MARKS: Mark[] = [
  {
    key: "self",
    label: "Profile",
    at: [0.655, 0.165],
    depth: 0.47,
    eyebrow: "The Tarnished",
    title: "Who rests at this grace",
    line: "Where I come from, where I've worked, and what I do when the laptop is shut.",
    cta: "Look closer",
    href: "/profile/",
  },
  {
    key: "tree",
    label: "Projects",
    at: [0.394, 0.39],
    depth: 0.12,
    eyebrow: "The Site of Grace",
    title: "Great Works",
    line: "Eight things I built, each recorded while it runs.",
    cta: "Approach the tree",
    href: "/works/",
  },
  {
    key: "lantern",
    label: "Contact",
    at: [0.86, 0.3],
    depth: 0.14,
    eyebrow: "Up the hill",
    title: "The Lantern",
    line: "Leave word. A reply travels faster than most roads.",
    cta: "Send word",
    href: `mailto:${person.email}`,
  },
];

export default function Road() {
  const [sel, setSel] = useState("self");
  const [entering, setEntering] = useState<{ x: number; y: number } | null>(null);
  const router = useRouter();
  const markRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    arrived();
  }, []);

  // Keep every landmark on screen: nudge it back in when a narrow or short
  // viewport crops the scene (the nudge relaxes to 0 when there is room).
  useEffect(() => {
    let raf = 0;
    const keep = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const top = 96;
      const bottom = H - (W < 720 ? 230 : 250);
      for (const el of Object.values(markRefs.current)) {
        if (!el) continue;
        const r = el.getBoundingClientRect();
        let nx = Number(el.dataset.nx || 0);
        let ny = Number(el.dataset.ny || 0);
        if (r.right > W - 12) nx -= r.right - (W - 12);
        else if (r.left < 12) nx += 12 - r.left;
        else if (nx < 0) nx = Math.min(0, nx + (W - 12 - r.right));
        else if (nx > 0) nx = Math.max(0, nx - (r.left - 12));
        if (r.top < top) ny += top - r.top;
        else if (r.bottom > bottom) ny -= r.bottom - bottom;
        else if (ny > 0) ny = Math.max(0, ny - (r.top - top));
        else if (ny < 0) ny = Math.min(0, ny + (bottom - r.bottom));
        el.dataset.nx = String(nx);
        el.dataset.ny = String(ny);
        el.style.setProperty("--nx", `${nx}px`);
        el.style.setProperty("--ny", `${ny}px`);
      }
      raf = requestAnimationFrame(keep);
    };
    raf = requestAnimationFrame(keep);
    return () => cancelAnimationFrame(raf);
  }, []);

  const enter = (m: Mark) => {
    if (entering) return;
    setSel(m.key);
    if (m.href.startsWith("mailto:")) {
      window.location.href = m.href;
      return;
    }
    const b = markRefs.current[m.key]?.getBoundingClientRect();
    setEntering(
      b
        ? { x: ((b.left + b.width / 2) / window.innerWidth) * 100, y: ((b.top + b.height / 2) / window.innerHeight) * 100 }
        : { x: 50, y: 50 },
    );
    passThrough(m.href, "dark");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const i = MARKS.findIndex((m) => m.key === sel);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") setSel(MARKS[(i + 1) % MARKS.length].key);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") setSel(MARKS[(i + MARKS.length - 1) % MARKS.length].key);
      if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) enter(MARKS[i]);
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const cur = MARKS.find((m) => m.key === sel)!;

  return (
    <main className={s.road}>
      <h1 className="sr-only">The road: choose where to go</h1>
      <div
        className={s.scene}
        style={{
          transformOrigin: entering ? `${entering.x}% ${entering.y}%` : "50% 50%",
          transform: entering ? "scale(2.2)" : "scale(1)",
        }}
      >
        <DepthScene
          src="/art/grace.jpg"
          depth="/art/grace-depth.png"
          aspect={16 / 9}
          focus={[0.5, 0.45]}
          grace={[0.394, 0.42, 0.6]}
        >
          <div className={s.shade} aria-hidden="true" />
          <Motes source={[0.3, 0.48, 0.66, 0.76]} count={18} drift={0.01} rise={0.35} />
          {MARKS.map((m) => (
            <button
              key={m.key}
              ref={(el) => {
                markRefs.current[m.key] = el;
              }}
              type="button"
              className={s.mark}
              data-on={m.key === sel}
              style={{ left: `${m.at[0] * 100}%`, top: `${m.at[1] * 100}%`, ["--d" as string]: m.depth }}
              onMouseEnter={() => setSel(m.key)}
              onFocus={() => setSel(m.key)}
              onClick={() => enter(m)}
            >
              <span className={s.glint} aria-hidden="true" />
              <span className={s.label}>{m.label}</span>
            </button>
          ))}
        </DepthScene>
      </div>

      <nav className="crumbs" aria-label="Back">
        <Link href="/">&larr; Back to the sword</Link>
      </nav>
      <nav className={s.quick} aria-label="Quick links">
        <Link href="/profile/">Profile</Link>
        <Link href="/works/">Projects</Link>
        <a href={`mailto:${person.email}`}>Contact</a>
      </nav>

      {/* The game's own interaction prompt: a dark band across the bottom. */}
      <button type="button" className={s.prompt} onClick={() => enter(cur)} key={cur.key}>
        <span className={s.promptTitle}>{cur.title}</span>
        <span className={s.promptLine}>{cur.line}</span>
        <span className={s.promptAction}>
          <kbd>Enter</kbd> {cur.cta}
        </span>
      </button>

      <div className={s.keys} aria-hidden="true">
        <span>
          <kbd>&larr;</kbd>
          <kbd>&rarr;</kbd> Choose
        </span>
        <span>
          <kbd>Esc</kbd> Back
        </span>
      </div>
    </main>
  );
}
