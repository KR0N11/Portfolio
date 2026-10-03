"use client";

/*
  The profile as one long walk down: who I am, where I've served, what I do
  off the clock. Few words, big pictures. Sections fade in as they arrive.
*/

import Link from "next/link";
import { useEffect, useRef } from "react";
import Motes from "@/components/Motes";
import { arrived } from "@/components/Veil";
import { person, profile } from "@/lib/content";
import s from "./profile.module.css";

type Props = { gallery: Record<string, string[]>; portrait: string | null };

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
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return ref;
}

function Photos({ list, alt }: { list: string[]; alt: string }) {
  if (!list.length) return null;
  return (
    <div className={s.photos} data-count={Math.min(list.length, 4)}>
      {list.map((src, i) =>
        src.endsWith(".mp4") ? (
          <video key={src} src={src} autoPlay muted loop playsInline preload="metadata" aria-label={`${alt}, clip ${i + 1}`} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt={`${alt}, photo ${i + 1}`} loading="lazy" />
        ),
      )}
    </div>
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

      {/* Opening frame */}
      <header className={s.hero}>
        <div className={s.heroGlow} aria-hidden="true">
          {portrait && <div className={s.blur} style={{ backgroundImage: `url(${portrait})` }} />}
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
          </div>
          {portrait && (
            <figure className={s.portrait}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={person.name} />
            </figure>
          )}
        </div>
        <div className={s.scroll} aria-hidden="true">
          Scroll
          <span />
        </div>
      </header>

      {/* Companies */}
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
              <p>{c.line}</p>
              <Photos list={gallery[c.slug] ?? []} alt={c.name} />
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

      {/* Pastimes */}
      <section className={s.chapter}>
        <h2 className={s.chapterTitle} data-reveal>
          Off the clock
        </h2>
      </section>
      {profile.pastimes.map((p, n) => {
        const backdrop = (gallery[p.slug] ?? []).find((src) => !src.endsWith(".mp4"));
        return (
        <section key={p.slug} className={s.pastime}>
          {backdrop && <div className={s.blur} style={{ backgroundImage: `url(${backdrop})` }} aria-hidden="true" />}
          <div className={s.pastimeInner} data-side={n % 2 ? "right" : "left"} data-reveal>
            <div className={s.pastimeText}>
            <h3>{p.name}</h3>
            <p>{p.line}</p>
            {p.list && (
              <ol className={s.ranked}>
                {p.list.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ol>
            )}
            {p.also && <p className={s.also}>{p.also}</p>}
            </div>
            <Photos list={gallery[p.slug] ?? []} alt={p.name} />
          </div>
        </section>
        );
      })}

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
