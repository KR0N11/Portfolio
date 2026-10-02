"use client";

/*
  The Road. A short, quiet loop of the Tarnished walking toward the Erdtree
  (from the official Elden Ring gameplay preview). Landmarks sit on the
  footage: the wanderer is the profile, the tree holds the projects, the tower
  keeps a lantern for contact. Hover to read, click to travel. Arrow keys
  choose, Enter travels, Esc goes back to the sword.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Mark = {
  key: string;
  label: string;
  /** spot in the footage, 0..1 */
  at: [number, number];
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
    at: [0.5, 0.44],
    eyebrow: "The wanderer",
    title: "Who walks this road",
    line: "Where I come from, where I've worked, and what I do when the laptop is shut.",
    cta: "Look closer",
    href: "/profile/",
  },
  {
    key: "tree",
    label: "Projects",
    at: [0.56, 0.16],
    eyebrow: "Ahead, in the light",
    title: "Great Works",
    line: "Eight things I built, each recorded while it runs.",
    cta: "Approach the tree",
    href: "/works/",
  },
  {
    key: "lantern",
    label: "Contact",
    at: [0.72, 0.43],
    eyebrow: "Within reach",
    title: "The Lantern",
    line: "Leave word. A reply travels faster than most roads.",
    cta: "Send word",
    href: `mailto:${person.email}`,
  },
];

const VW = 1920;
const VH = 1080;
export default function Road() {
  const [sel, setSel] = useState("self");
  const [entering, setEntering] = useState<{ x: number; y: number } | null>(null);
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const markRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    arrived();
  }, []);

  // Pin each marker to the footage as it is drawn with object-fit: cover.
  useEffect(() => {
    let raf = 0;
    const place = () => {
      const v = videoRef.current;
      if (v) {
        const W = v.clientWidth;
        const H = v.clientHeight;
        const sc = Math.max(W / VW, H / VH);
        const ox = (W - VW * sc) / 2;
        const oy = (H - VH * sc) / 2;
        for (const m of MARKS) {
          const el = markRefs.current[m.key];
          if (!el) continue;
          const [x, y] = m.at;
          // Keep every marker on screen, even where a narrow phone crops the footage.
          const half = el.offsetWidth / 2 + 12;
          const px = Math.min(W - half, Math.max(half, ox + x * VW * sc));
          const py = Math.min(H - 60, Math.max(el.offsetHeight + 110, oy + y * VH * sc));
          el.style.left = `${px}px`;
          el.style.top = `${py}px`;
        }
      }
      raf = requestAnimationFrame(place);
    };
    raf = requestAnimationFrame(place);
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
        <video
          ref={videoRef}
          className={s.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/art/road-poster.jpg"
          aria-hidden="true"
        >
          <source src="/art/road-720.mp4" type="video/mp4" media="(max-width: 900px)" />
          <source src="/art/road.mp4" type="video/mp4" />
        </video>
        <div className={s.shade} aria-hidden="true" />
        {MARKS.map((m) => (
          <button
            key={m.key}
            ref={(el) => {
              markRefs.current[m.key] = el;
            }}
            type="button"
            className={s.mark}
            data-on={m.key === sel}
            onMouseEnter={() => setSel(m.key)}
            onFocus={() => setSel(m.key)}
            onClick={() => enter(m)}
          >
            <span className="diamond" data-on={m.key === sel} data-pulse={m.key === sel} />
            <span>{m.label}</span>
          </button>
        ))}
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
