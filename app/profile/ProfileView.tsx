"use client";

/*
  The profile as one long walk down: who I am, where I've served, what I do
  off the clock. Each pastime reads like an item description in the game: a
  framed picture, a name, a line of flavour text, then the real reason.
  No game art on this page; the theme lives in the type, the gold and the embers.
*/

import Link from "next/link";
import { useEffect, useRef } from "react";
import Motes from "@/components/Motes";
import { arrived } from "@/components/Veil";
import { person, profile } from "@/lib/content";
import s from "./profile.module.css";

type Props = { gallery: Record<string, string[]>; portrait: string | null };

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.reveal = "in";
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Media({ src, alt }: { src: string; alt: string }) {
  return src.endsWith(".mp4") ? (
    <video src={src} autoPlay muted loop playsInline preload="metadata" aria-label={alt} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" />
  );
}

/** One framed picture, or a fanned pair when there are two or more. */
function Frame({ list, alt }: { list: string[]; alt: string }) {
  if (!list.length) return null;
  return (
    <div className={s.frames} data-count={Math.min(list.length, 2)}>
      {list.slice(0, 2).map((src, i) => (
        <figure key={src} className={s.frame}>
          <Media src={src} alt={`${alt}, ${i + 1}`} />
          <span className={s.corner} data-c="tl" />
          <span className={s.corner} data-c="br" />
        </figure>
      ))}
    </div>
  );
}

/** Thin gold rings, the only "Elden Ring" drawn on this page. */
function Sigil() {
  return (
    <svg className={s.sigil} viewBox="0 0 400 400" aria-hidden="true">
      <circle cx="200" cy="170" r="120" />
      <circle cx="150" cy="210" r="82" />
      <circle cx="252" cy="208" r="70" />
      <circle cx="200" cy="262" r="44" />
      <line x1="200" y1="20" x2="200" y2="390" />
    </svg>
  );
}

export default function ProfileView({ gallery, portrait }: Props) {
  const ref = useReveal();

  useEffect(() => {
    arrived();
  }, []);

  return (
    <main className={s.page} ref={ref}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road/">&larr; The road</Link>
        <span className="sep">/</span>
        <span className="here">Status</span>
      </nav>

      <header className={s.hero}>
        <div className={s.heroGlow} aria-hidden="true">
          <Sigil />
          <Motes source={[0.1, 0.9, 0.75, 1.05]} count={22} drift={0.02} rise={0.45} />
        </div>
        <div className={s.heroInner} data-portrait={!!portrait}>
          <div>
            <div className={s.eyebrow}>Status</div>
            <h1 className={s.name}>{person.name}</h1>
            <p className={s.role}>
              {person.role} · {person.home}
            </p>
            <p className={s.origin}>{profile.origin}</p>
            <blockquote className={s.quote}>&ldquo;{profile.quote}&rdquo;</blockquote>
          </div>
          {portrait && (
            <figure className={`${s.frame} ${s.portrait}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={person.name} />
              <span className={s.corner} data-c="tl" />
              <span className={s.corner} data-c="br" />
            </figure>
          )}
        </div>
        <div className={s.scroll} aria-hidden="true">
          Scroll
          <span />
        </div>
      </header>

      <section className={s.chapter}>
        <h2 className={s.chapterTitle} data-reveal>
          Served at
        </h2>
        {profile.served.map((c, i) => (
          <article key={c.slug} className={s.company} data-side={i % 2 ? "right" : "left"} data-reveal>
            <div className={s.plate}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.logo} alt={`${c.name} logo`} />
              <span className={s.corner} data-c="tl" />
              <span className={s.corner} data-c="br" />
            </div>
            <div className={s.companyText}>
              <h3>{c.name}</h3>
              <p className={s.flavor}>{c.line}</p>
              <p className={s.body}>{c.body}</p>
              <Frame list={gallery[c.slug] ?? []} alt={c.name} />
            </div>
          </article>
        ))}

        <div className={s.schools} data-reveal>
          <span className={s.eyebrow}>Studied at</span>
          {profile.schools.map((sc) => (
            <span key={sc.name} className={s.school}>
              {sc.name} <em>{sc.field}</em>
            </span>
          ))}
        </div>
      </section>

      <section className={s.chapter}>
        <h2 className={s.chapterTitle} data-reveal>
          Off the clock
        </h2>
        {profile.pastimes.map((p, n) => (
          <article key={p.slug} className={s.item} data-side={n % 2 ? "right" : "left"} data-reveal>
            <Frame list={gallery[p.slug] ?? []} alt={p.name} />
            <div className={s.itemText}>
              <div className={s.itemKind}>
                <span>{ROMAN[n]}</span> Pastime
              </div>
              <h3>{p.name}</h3>
              <p className={s.flavor}>{p.line}</p>
              {p.list && (
                <ol className={s.ranked}>
                  {p.list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              )}
              {p.also && <p className={s.also}>{p.also}</p>}
              <p className={s.body}>{p.body}</p>
              {p.companion && (
                <figure className={s.companion}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.companion.src} alt={p.companion.alt} loading="lazy" />
                  <figcaption>{p.companion.caption}</figcaption>
                </figure>
              )}
            </div>
          </article>
        ))}
      </section>

      <footer className={s.footer}>
        <div className={s.links}>
          <a href={`mailto:${person.email}`}>Email</a>
          <a href={person.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link href="/works/">See the works &rarr;</Link>
        </div>
        <p className={s.credit}>
          Music: &ldquo;Elden Ring&rdquo; by Tsukasa Saitoh. Elden Ring art, footage and music &copy; FromSoftware /
          Bandai Namco, used as a fan tribute.
        </p>
      </footer>
    </main>
  );
}
