"use client";

/*
  The Road. The wanderer looks out at the tree; grass and mist move in the
  wind. Scrolling walks the camera forward. Each landmark is a way in: the
  wanderer is the profile, the tree holds the projects, the ruin keeps a lantern.
*/

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LivingImage from "@/components/LivingImage";
import Motes from "@/components/Motes";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Mark = {
  key: string;
  label: string;
  /** image-space position of the marker */
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
    at: [0.215, 0.52],
    eyebrow: "The wanderer",
    title: "Who walks this road",
    line: "Where I come from, what I work on, and what I do when the laptop is shut.",
    cta: "Look closer",
    href: "/profile",
  },
  {
    key: "tree",
    label: "Projects",
    at: [0.5, 0.2],
    eyebrow: "Ahead",
    title: "Great Works",
    line: "Eight things I built, each recorded while it runs.",
    cta: "Approach the tree",
    href: "/works",
  },
  {
    key: "lantern",
    label: "Contact",
    at: [0.603, 0.735],
    eyebrow: "Within reach",
    title: "The Lantern",
    line: "Leave word. A reply travels faster than most roads.",
    cta: "Send word",
    href: `mailto:${person.email}`,
  },
];

export default function Road() {
  const [sel, setSel] = useState("self");
  const [walk, setWalk] = useState(0);
  const [entering, setEntering] = useState<{ x: number; y: number } | null>(null);
  const touchY = useRef<number | null>(null);

  useEffect(() => {
    arrived();
  }, []);

  // Scroll, swipe or arrow keys walk the camera toward the tree.
  useEffect(() => {
    const step = (d: number) => setWalk((w) => Math.min(1, Math.max(0, w + d)));
    const onWheel = (e: WheelEvent) => step(e.deltaY / 2400);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp" || e.key === "PageDown") step(0.08);
      if (e.key === "ArrowDown" || e.key === "PageUp") step(-0.08);
    };
    const onTouchStart = (e: TouchEvent) => (touchY.current = e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) => {
      if (touchY.current == null) return;
      const y = e.touches[0].clientY;
      step((touchY.current - y) / 900);
      touchY.current = y;
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    if (walk > 0.92) setSel("tree");
  }, [walk]);

  const enter = (m: Mark) => {
    if (entering) return;
    setSel(m.key);
    if (m.href.startsWith("mailto:")) {
      window.location.href = m.href;
      return;
    }
    // Zoom toward the landmark as it sits on screen right now.
    const el = document.querySelector<HTMLElement>(`[data-mark="${m.key}"]`);
    const b = el?.getBoundingClientRect();
    setEntering(
      b
        ? { x: ((b.left + b.width / 2) / window.innerWidth) * 100, y: ((b.top + b.height / 2) / window.innerHeight) * 100 }
        : { x: 50, y: 50 },
    );
    passThrough(m.href, "dark");
  };

  const cur = MARKS.find((m) => m.key === sel)!;
  const origin = entering ? `${entering.x}% ${entering.y}%` : "50% 30%";
  const scale = entering ? 2.4 : 1 + walk * 0.32;

  return (
    <main className={s.road}>
      <h1 className="sr-only">The road: choose where to go</h1>
      <div className={s.breathe}>
        <LivingImage
          src="/art/road.jpg"
          mask="/art/road-mask.png"
          aspect={3840 / 2160}
          scene="road"
          focus={[0.24, 0.55]}
          stageStyle={{
            transformOrigin: origin,
            transform: `scale(${scale})`,
            transition: entering
              ? "transform 1200ms cubic-bezier(.3,0,.2,1)"
              : "transform 700ms cubic-bezier(.2,.8,.2,1)",
          }}
        >
          <Motes source={[0.05, 0.95, 0.6, 0.98]} count={20} drift={0.06} rise={0.22} />
          {MARKS.map((m) => (
            <button
              key={m.key}
              type="button"
              className={s.mark}
              data-mark={m.key}
              data-on={m.key === sel}
              style={{ left: `${m.at[0] * 100}%`, top: `${m.at[1] * 100}%` }}
              onMouseEnter={() => setSel(m.key)}
              onFocus={() => setSel(m.key)}
              onClick={() => enter(m)}
            >
              <span className="diamond" data-on={m.key === sel} data-pulse={m.key === sel} />
              <span>{m.label}</span>
            </button>
          ))}
        </LivingImage>
      </div>

      <div className={s.shade} aria-hidden="true" />

      <nav className="crumbs" aria-label="Back">
        <Link href="/">&larr; Return to the flame</Link>
      </nav>
      <nav className={s.quick} aria-label="Quick links">
        <Link href="/profile">Profile</Link>
        <Link href="/works">Projects</Link>
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

      <div className={s.meter} aria-hidden="true">
        <span>Scroll to walk</span>
        <div className={s.track}>
          <span className={s.head} style={{ left: `${walk * 100}%` }} />
          <span className={s.notch} style={{ left: "33%" }} />
          <span className={s.notch} style={{ left: "66%" }} />
          <span className={s.end} />
        </div>
        <span>Click a landmark</span>
      </div>
    </main>
  );
}
