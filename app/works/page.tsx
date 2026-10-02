"use client";

/*
  Inventory. Every project is an item: pick one on the left and watch it run on
  the right, with its description underneath like an item's lore.
  Arrow keys move through the list; the URL hash keeps the selection.
*/

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import Motes from "@/components/Motes";
import { arrived } from "@/components/Veil";
import { works } from "@/lib/content";
import s from "./works.module.css";

export default function Works() {
  const [i, setI] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    arrived();
    const fromHash = works.findIndex((w) => `#${w.slug}` === window.location.hash);
    if (fromHash >= 0) setI(fromHash);
  }, []);

  const pick = useCallback((n: number, focus = false) => {
    const k = (n + works.length) % works.length;
    setI(k);
    history.replaceState(null, "", `#${works[k].slug}`);
    if (focus) listRef.current?.querySelectorAll("button")[k]?.focus();
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      pick(i + 1, true);
    }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      pick(i - 1, true);
    }
  };

  useEffect(() => {
    listRef.current
      ?.querySelectorAll("button")
      [i]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [i]);

  const w = works[i];
  if (!w) return null;
  const base = `/clips/${w.slug}`;

  return (
    <main className={s.page}>
      <div className={s.backdrop} aria-hidden="true">
        <Motes source={[0.2, 0.8, -0.05, 0.3]} count={20} drift={-0.08} rise={-0.9} />
      </div>

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road">&larr; The road</Link>
        <span className="sep">/</span>
        <span className="here">The golden tree</span>
      </nav>

      <div className={s.layout}>
        <aside className={s.side}>
          <div className={s.eyebrow}>Inventory</div>
          <h1 className={s.title}>Great Works</h1>
          <p className={s.sub}>Things I built, and how they behave. Pick one to watch it run.</p>

          <ul ref={listRef} className={s.list} onKeyDown={onKey} aria-label="Projects">
            {works.map((x, n) => (
              <li key={x.slug}>
                <button
                  type="button"
                  className={s.item}
                  data-on={n === i}
                  aria-current={n === i}
                  onClick={() => pick(n)}
                >
                  <span className={s.thumb}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={`/clips/${x.slug}/poster.jpg`} alt="" loading="lazy" />
                  </span>
                  <span className={s.itemText}>
                    <span className={s.itemName}>{x.name}</span>
                    <span className={s.itemKind}>{x.kind.split(" · ")[0]}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <section className={s.detail} aria-live="polite">
          <div className={s.frame}>
            {w.hasVideo ? (
              <video
                key={w.slug}
                className={s.media}
                src={`${base}/demo.mp4`}
                poster={`${base}/poster.jpg`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={w.slug} className={s.media} src={`${base}/poster.jpg`} alt={`${w.name} screenshot`} />
            )}
            <span className={s.corner} data-c="tl" />
            <span className={s.corner} data-c="tr" />
            <span className={s.corner} data-c="bl" />
            <span className={s.corner} data-c="br" />
          </div>
          <div className={s.caption}>{w.recording}</div>

          <div className={s.lore}>
            <div className={s.kind}>{w.kind}</div>
            <h2 className={s.name}>{w.name}</h2>
            <p className={s.flavor}>{w.flavor}</p>
            <ul className={s.what}>
              {w.what.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
            <div className={s.foot}>
              <ul className={s.stack} aria-label="Built with">
                {w.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a className={s.source} href={w.repo} target="_blank" rel="noreferrer">
                Source &#8599;
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
