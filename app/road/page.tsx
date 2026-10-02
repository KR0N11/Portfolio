"use client";

/*
  The Road. After the sword comes free: real footage of the Tarnished riding
  the ridge toward the Erdtree (a loop cut from the official Shadow of the
  Erdtree gameplay trailer), with a menu laid over it the way the game lays
  out its own. Arrow keys choose, Enter travels, Esc goes back to the sword.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Entry = { key: string; label: string; line: string; href: string };

const MENU: Entry[] = [
  {
    key: "profile",
    label: "Profile",
    line: "Where I come from, where I've worked, and what I do when the laptop is shut.",
    href: "/profile/",
  },
  {
    key: "works",
    label: "Projects",
    line: "Eight things I built, each recorded while it runs.",
    href: "/works/",
  },
  {
    key: "contact",
    label: "Contact",
    line: "Leave word. A reply travels faster than most roads.",
    href: `mailto:${person.email}`,
  },
];

export default function Road() {
  const [sel, setSel] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    arrived();
  }, []);

  const go = (i: number) => {
    const e = MENU[i];
    setSel(i);
    if (e.href.startsWith("mailto:")) {
      window.location.href = e.href;
      return;
    }
    if (leaving) return;
    setLeaving(true);
    passThrough(e.href, "dark");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") setSel((i) => (i + 1) % MENU.length);
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") setSel((i) => (i + MENU.length - 1) % MENU.length);
      if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) go(sel);
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className={s.road} data-leaving={leaving}>
      <h1 className="sr-only">The road: choose where to go</h1>
      <video
        className={s.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/art/landing.jpg"
        aria-hidden="true"
      >
        <source src="/art/landing-720.mp4" type="video/mp4" media="(max-width: 900px)" />
        <source src="/art/landing.mp4" type="video/mp4" />
      </video>
      <div className={s.shade} aria-hidden="true" />

      <nav className="crumbs" aria-label="Back">
        <Link href="/">&larr; Back to the sword</Link>
      </nav>

      <div className={s.menu}>
        <div className={s.who}>
          <div className={s.name}>{person.name}</div>
          <div className={s.role}>
            {person.role} · {person.home}
          </div>
        </div>
        <ul role="menu">
          {MENU.map((e, i) => (
            <li key={e.key} role="none">
              <button
                type="button"
                role="menuitem"
                className={s.item}
                data-on={i === sel}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                onClick={() => go(i)}
              >
                <span className="diamond" data-on={i === sel} data-pulse={i === sel} />
                {e.label}
              </button>
            </li>
          ))}
        </ul>
        <p className={s.line} key={sel}>
          {MENU[sel].line}
        </p>
      </div>

      <div className={s.keys} aria-hidden="true">
        <span>
          <kbd>&uarr;</kbd>
          <kbd>&darr;</kbd> Choose
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
