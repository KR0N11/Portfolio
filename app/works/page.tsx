"use client";

/*
  Projects. A menu of names on the left, lit like the grace menu; the selected
  one plays its recording on the right, with the facts, the stack and a link to
  the code. Arrow keys move through the menu, Esc goes back to the road, and
  the URL hash (#slug) keeps or sets the selection.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Sprite, { POINTER_COLORS, SPRITES } from "@/components/Sprite";
import { arrived } from "@/components/Veil";
import { sfx } from "@/lib/audio";
import { works } from "@/lib/content";
import s from "./works.module.css";


export default function Works() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const detailRef = useRef<HTMLElement>(null);
  const router = useRouter();

  useEffect(() => {
    arrived();
    setReduce(matchMedia("(prefers-reduced-motion: reduce)").matches);
    // Follow #slug on load and whenever it changes (links, back/forward).
    const sync = () => {
      const n = works.findIndex((w) => `#${w.slug}` === window.location.hash);
      if (n >= 0) setI(n);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const pick = useCallback(
    (n: number, focus = false) => {
      const k = (n + works.length) % works.length;
      if (k !== i) sfx("tick");
      setI(k);
      history.replaceState(null, "", `#${works[k].slug}`);
      if (focus) listRef.current?.querySelectorAll("button")[k]?.focus();
      // On narrow screens the list sits below the detail: bring the detail into view.
      else if (matchMedia("(max-width: 900px)").matches) detailRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [i],
  );

  const onKey = (e: React.KeyboardEvent) => {
    const step = ({ ArrowDown: 1, ArrowUp: -1 } as Record<string, number>)[e.key];
    if (step) {
      e.preventDefault();
      pick(i + step, true);
    }
  };

  // As at the grace: arrows choose from anywhere on the page, Esc leaves.
  useEffect(() => {
    const onKeys = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/road/");
      // The menu's own buttons handle arrows themselves (and keep focus in it).
      if (listRef.current?.contains(e.target as Node)) return;
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        pick(i + (e.key === "ArrowDown" ? 1 : -1), true);
      }
    };
    window.addEventListener("keydown", onKeys);
    return () => window.removeEventListener("keydown", onKeys);
  }, [router, pick, i]);

  const w = works[i];
  if (!w) return null;
  const base = `/clips/${w.slug}`;

  return (
    <main className={s.page}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road/">
          <Sprite rows={[...SPRITES.back]} />
          The road
        </Link>
        <span className="sep">/</span>
        <span className="here">Projects</span>
      </nav>

      <div className={s.layout}>
        <aside className={s.side}>
          <h1 className={s.heading}>Projects</h1>
          <p className={s.sub}>
            Things I built, shown running.
            <a className={s.jump} href="#all-projects">
              All {works.length}{" "}projects &darr;
            </a>
          </p>


        </aside>

        <section ref={detailRef} className={s.detail}>
          <div className={s.nameRow}>
            <h2 className={s.name} aria-live="polite">
              {w.name}
            </h2>
            <a className={s.code} href={w.repo} target="_blank" rel="noreferrer">
              View code
              <Sprite rows={[...SPRITES.out]} />
            </a>
          </div>
          <div className={s.kind}>{w.kind}</div>
          <p className={s.lede}>{w.what[0]}</p>

          <div
            className={`${s.frame} frame-px`}
            data-bright={!!w.bright}
            style={{ aspectRatio: w.aspect ?? 16 / 10, width: `min(100%, calc(52vh * ${w.aspect ?? 16 / 10}))` }}
          >
            {w.hasVideo ? (
              <video
                key={w.slug}
                className={s.media}
                src={`${base}/demo.mp4`}
                poster={`${base}/poster.webp`}
                autoPlay={!reduce}
                controls={reduce}
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={w.slug} className={s.media} src={`${base}/poster.webp`} alt={`${w.name} screenshot`} />
            )}
          </div>
          <div className={s.caption}>
            {w.recording}
          </div>

          <div className={s.info}>
            <p className={s.stack}>
              <span>Built with</span>
              {w.stack.join(" · ")}
            </p>
            <ul className={s.what}>
              {w.what.slice(1).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            {w.note && (
              <p className={s.note}>
                <span>About the recording</span>
                {/* `backticks` mark a command-line flag. */}
                {w.note.split("`").map((part, n) => (n % 2 ? <code key={n}>{part}</code> : part))}
              </p>
            )}
          </div>
        </section>

        {/* The projects as a menu, lit like the grace menu, with its button
            prompts under it. It comes after the detail in the page, so phones
            read the project first; on desktop the grid places it on the left. */}
        <div className={s.menu} id="all-projects">
          <ol ref={listRef} className={s.names} aria-label="Projects" onKeyDown={onKey}>
            {works.map((x, n) => (
              <li key={x.slug}>
                <button
                  type="button"
                  tabIndex={n === i ? 0 : -1}
                  aria-current={n === i}
                  data-on={n === i}
                  onClick={() => pick(n)}
                >
                  {n === i && <Sprite rows={[...SPRITES.pointer]} colors={POINTER_COLORS} className={s.cursor} />}
                  {x.name}
                  <span className="sr-only">, </span>
                  <span>{x.kind.split(" · ")[0]}</span>
                </button>
              </li>
            ))}
          </ol>
          <div className={s.keys} aria-hidden="true">
            <span>
              <kbd>&uarr;</kbd>
              <kbd>&darr;</kbd> Select
            </span>
            <span>
              <kbd>Esc</kbd> Back
            </span>
          </div>
        </div>
      </div>
      <div className="horizon" aria-hidden="true" />
    </main>
  );
}
