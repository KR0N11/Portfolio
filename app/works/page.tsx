"use client";

/*
  Inventory. Projects sit in a grid of square tiles like the game's inventory;
  the selected one plays its recording in the detail panel, with the facts,
  the stack and a link to the code. Arrow keys move through the grid and the
  URL hash (#slug) keeps or sets the selection.
*/

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { arrived } from "@/components/Veil";
import { sfx } from "@/lib/audio";
import { works } from "@/lib/content";
import s from "./works.module.css";

const COLS = 4;

export default function Works() {
  const [i, setI] = useState(0);
  const [reduce, setReduce] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const detailRef = useRef<HTMLElement>(null);

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
      if (focus) gridRef.current?.querySelectorAll("button")[k]?.focus();
      // On narrow screens the detail sits below the grid: bring it into view.
      else if (matchMedia("(max-width: 900px)").matches) detailRef.current?.scrollIntoView({ behavior: "smooth" });
    },
    [i],
  );

  const onKey = (e: React.KeyboardEvent) => {
    const step = ({ ArrowRight: 1, ArrowLeft: -1, ArrowDown: COLS, ArrowUp: -COLS } as Record<string, number>)[e.key];
    if (step) {
      e.preventDefault();
      pick(i + step, true);
    }
  };

  const w = works[i];
  if (!w) return null;
  const base = `/clips/${w.slug}`;

  return (
    <main className={s.page}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road/">&larr; The road</Link>
        <span className="sep">/</span>
        <span className="here">Projects</span>
      </nav>

      <div className={s.layout}>
        <aside className={s.side}>
          <h1 className={s.heading}>Projects</h1>
          <p className={s.sub}>Things I built, shown running.</p>

          <div ref={gridRef} className={s.grid} onKeyDown={onKey} role="listbox" aria-label="Projects">
            {works.map((x, n) => (
              <button
                key={x.slug}
                type="button"
                role="option"
                aria-selected={n === i}
                tabIndex={n === i ? 0 : -1}
                className={s.tile}
                data-on={n === i}
                onClick={() => pick(n)}
                title={x.name}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/clips/${x.slug}/tile.jpg`} alt="" loading="lazy" />
                <span className={s.tileName}>{x.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <section ref={detailRef} className={s.detail}>
          <div className={s.frame} style={{ aspectRatio: w.aspect ?? 16 / 10 }}>
            {w.hasVideo ? (
              <video
                key={w.slug}
                className={s.media}
                src={`${base}/demo.mp4`}
                poster={`${base}/poster.jpg`}
                autoPlay={!reduce}
                controls={reduce}
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={w.slug} className={s.media} src={`${base}/poster.jpg`} alt={`${w.name} screenshot`} />
            )}
          </div>
          <div className={s.caption}>{w.recording}</div>

          <div className={s.info}>
            <div className={s.nameRow}>
              <h2 className={s.name} aria-live="polite">
                {w.name}
              </h2>
              <a className={s.code} href={w.repo} target="_blank" rel="noreferrer">
                View code &#8599;
              </a>
            </div>
            <div className={s.kind}>{w.kind}</div>
            <p className={s.stack}>
              <span>Built with</span>
              {w.stack.join(" · ")}
            </p>
            <ul className={s.what}>
              {w.what.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
