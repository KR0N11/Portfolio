"use client";

/*
  The Road. The Tarnished sits at a Site of Grace at night (a 4K frame from the
  official Elden Ring Gameplay Preview, given depth so it moves with the
  pointer). Resting at grace in the game opens a menu, so that is the UI here:
  a grace menu on the left, the scene left alone. Arrow keys choose, Enter
  selects, Esc leaves.
*/

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import DepthScene from "@/components/DepthScene";
import Motes from "@/components/Motes";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Entry = { key: string; label: string; help: string; href: string };

const MENU: Entry[] = [
  {
    key: "profile",
    label: "Profile",
    help: "Where I come from, where I've worked, and what I do when the laptop is shut.",
    href: "/profile/",
  },
  {
    key: "works",
    label: "Projects",
    help: "Eight things I built, each recorded while it runs.",
    href: "/works/",
  },
  {
    key: "contact",
    label: "Contact",
    help: "Leave word. A reply travels faster than most roads.",
    href: `mailto:${person.email}`,
  },
  {
    key: "leave",
    label: "Leave",
    help: "Return to the sword.",
    href: "/",
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
    if (e.href === "/") {
      router.push("/");
      return;
    }
    if (leaving) return;
    setLeaving(true);
    passThrough(e.href, "dark");
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") setSel((i) => (i + 1) % MENU.length);
      if (e.key === "ArrowUp") setSel((i) => (i + MENU.length - 1) % MENU.length);
      if (e.key === "Enter" && !(e.target instanceof HTMLButtonElement)) go(sel);
      if (e.key === "Escape") router.push("/");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <main className={s.road} data-leaving={leaving}>
      <h1 className="sr-only">Site of Grace: choose where to go</h1>
      <div className={s.scene}>
        <DepthScene
          src="/art/grace.jpg"
          depth="/art/grace-depth.png"
          aspect={16 / 9}
          focus={[0.55, 0.45]}
          grace={[0.394, 0.42, 0.6]}
        >
          <Motes source={[0.3, 0.48, 0.66, 0.76]} count={18} drift={0.01} rise={0.35} />
        </DepthScene>
        <div className={s.shade} aria-hidden="true" />
      </div>

      <nav className={s.menu} aria-label="Site of Grace">
        <div className={s.place}>
          {person.name}
        </div>
        <ul>
          {MENU.map((e, i) => (
            <li key={e.key} data-gap={e.key === "leave"}>
              <button
                type="button"
                className={s.item}
                data-on={i === sel}
                onMouseEnter={() => setSel(i)}
                onFocus={() => setSel(i)}
                onClick={() => go(i)}
              >
                {e.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <p className={s.help} key={sel} aria-live="polite">
        {MENU[sel].help}
      </p>

      <div className={s.keys} aria-hidden="true">
        <span>
          <kbd>&uarr;</kbd>
          <kbd>&darr;</kbd> Select
        </span>
        <span>
          <kbd>Enter</kbd> Confirm
        </span>
        <span>
          <kbd>Esc</kbd> Leave
        </span>
      </div>
    </main>
  );
}
