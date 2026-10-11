"use client";

/*
  The Road. The Tarnished sits at a Site of Grace at night (a frame from the
  official Elden Ring Gameplay Preview, redrawn as pixel art and given depth so
  it moves with the pointer). Resting at grace in the game opens a menu, so that is the UI here:
  a grace menu on the left, the scene left alone. Arrow keys choose, Enter
  selects, Esc leaves.
*/

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import DepthScene from "@/components/DepthScene";
import Motes from "@/components/Motes";
import Sprite, { POINTER_COLORS, SPRITES } from "@/components/Sprite";
import { arrived, passThrough } from "@/components/Veil";
import { sfx } from "@/lib/audio";
import { person } from "@/lib/content";
import s from "./road.module.css";

type Entry = { key: string; label: string; help: string; href: string };

const ART: [number, number] = [400, 225];

const MENU: Entry[] = [
  {
    key: "profile",
    label: "Profile",
    help: "Where I've worked, and what I do off the clock.",
    href: "/profile/",
  },
  {
    key: "works",
    label: "Projects",
    help: "Eight projects, each recorded while it runs.",
    href: "/works/",
  },
  {
    key: "contact",
    label: "Contact",
    help: `Copy my email: ${person.email}`,
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
  const [found, setFound] = useState<"hidden" | "show" | "done">("hidden");
  const [narrow, setNarrow] = useState(false);
  const [copied, setCopied] = useState(0);
  const btns = useRef<(HTMLButtonElement | null)[]>([]);
  const router = useRouter();
  const ready = found === "done";

  useEffect(() => {
    arrived();
    const mq = window.matchMedia("(max-width: 720px)");
    setNarrow(mq.matches);
    // "Lost Grace Discovered", once per visit, the way the game does it.
    let seen = false;
    try {
      seen = sessionStorage.getItem("pcl-grace") === "1";
      sessionStorage.setItem("pcl-grace", "1");
    } catch {}
    if (seen) {
      setFound("done");
      return;
    }
    const a = window.setTimeout(() => {
      setFound("show");
      sfx("grace");
    }, 400);
    const b = window.setTimeout(() => setFound("done"), 2700);
    // Any key or click skips the banner, so nobody waits on it.
    const skip = () => setFound((f) => (f === "show" ? "done" : f));
    window.addEventListener("pointerdown", skip);
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  const pick = (i: number, focus = false) => {
    if (i !== sel) {
      sfx("tick");
      setCopied(0);
    }
    setSel(i);
    if (focus) btns.current[i]?.focus();
  };

  const go = (i: number) => {
    const e = MENU[i];
    setSel(i);
    sfx("confirm");
    if (e.href.startsWith("mailto:")) {
      // Like picking up an item: copy the address and say so, no mail app needed.
      if (!navigator.clipboard) {
        window.location.href = e.href;
        return;
      }
      navigator.clipboard.writeText(person.email).then(
        () => setCopied(Date.now()),
        () => (window.location.href = e.href),
      );
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
    if (!copied) return;
    const t = window.setTimeout(() => setCopied(0), 2600);
    return () => window.clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Keys aimed at the top links belong to them.
      if ((e.target as HTMLElement).closest?.("a, .sitebar") || !ready) return;
      const inMenu = !!(e.target as HTMLElement).closest?.("nav");
      if (e.key === "ArrowDown") {
        e.preventDefault();
        pick((sel + 1) % MENU.length, inMenu);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        pick((sel + MENU.length - 1) % MENU.length, inMenu);
      }
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
          src="/art/grace.png"
          depth="/art/grace-depth.png"
          art={ART}
          focus={narrow ? [0.53, 0.5] : [0.5, 0.45]}
          grace={[0.394, 0.42, 0.6]}
        >
          <Motes source={[0.3, 0.48, 0.66, 0.76]} count={18} drift={0.01} rise={0.35} grid={ART} />
        </DepthScene>
        <div className={s.shade} aria-hidden="true" />
      </div>

      {found === "show" && (
        <div className={s.found} aria-live="polite">
          <span>Lost Grace Discovered</span>
        </div>
      )}

      <nav className={`${s.menu} win`} data-ready={ready} inert={!ready} aria-label="Site of Grace">
        <div className={`${s.place} title-card`}>{person.name}</div>
        <ul>
          {MENU.map((e, i) => (
            <li key={e.key} data-gap={e.key === "leave"}>
              <button
                ref={(el) => {
                  btns.current[i] = el;
                }}
                type="button"
                tabIndex={i === sel ? 0 : -1}
                className={s.item}
                data-on={i === sel}
                onMouseEnter={() => pick(i)}
                onFocus={() => pick(i)}
                onClick={() => go(i)}
              >
                {i === sel && <Sprite rows={[...SPRITES.pointer]} colors={POINTER_COLORS} className={s.cursor} />}
                {e.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {ready && (
        <p className={`${s.help} win`} key={copied ? `c${copied}` : sel}>
          {copied ? (
            <>
              {person.email} <span className={s.got}>Copied</span>
            </>
          ) : (
            MENU[sel].help
          )}
        </p>
      )}
      <p className="sr-only" role="status">
        {copied ? `${person.email} copied to the clipboard` : ""}
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
