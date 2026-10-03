"use client";

/*
  The Road. A still from the official Elden Ring gameplay trailer, upscaled to
  4K: the Tarnished at sunset beside a Site of Grace. With its depth map the
  frame becomes a small 3D scene: move the pointer and the grass slides past
  him while the sky stays far off. The landmarks ride the same parallax: the
  Tarnished is the profile, the grace holds the projects, the cliff keeps a
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
    at: [0.526, 0.13],
    depth: 0.35,
    eyebrow: "The Tarnished",
    title: "Who rests at this grace",
    line: "Where I come from, where I've worked, and what I do when the laptop is shut.",
    cta: "Look closer",
    href: "/profile/",
  },
  {
    key: "tree",
    label: "Projects",
    at: [0.396, 0.22],
    depth: 0.1,
    eyebrow: "The Site of Grace",
    title: "Great Works",
    line: "Eight things I built, each recorded while it runs.",
    cta: "Approach the tree",
    href: "/works/",
  },
  {
    key: "lantern",
    label: "Contact",
    at: [0.83, 0.19],
    depth: 0.17,
    eyebrow: "On the cliff",
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
          grace={[0.396, 0.29, 0.54]}
        >
          <div className={s.shade} aria-hidden="true" />
          <Motes source={[0.37, 0.42, 0.42, 0.56]} count={16} drift={0.01} rise={0.3} />
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
              <span className="diamond" data-on={m.key === sel} data-pulse={m.key === sel} />
              <span>{m.label}</span>
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

      <section className={s.panel} aria-live="polite">
        <div className={s.eyebrow}>{cur.eyebrow}</div>
        <h2 className={s.title}>{cur.title}</h2>
        <p className={s.line}>{cur.line}</p>
        <button type="button" className={s.cta} onClick={() => enter(cur)}>
          {cur.cta} &rarr;
        </button>
      </section>

      <div className={s.keys} aria-hidden="true">
        <span>
          <kbd>&larr;</kbd>
          <kbd>&rarr;</kbd> Choose
        </span>
        <span>
          <kbd>Enter</kbd> Travel
        </span>
        <span>
          <kbd>Esc</kbd> Back
        </span>
      </div>
    </main>
  );
}
