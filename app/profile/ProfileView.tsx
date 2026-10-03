"use client";

/*
  Who I am, where I've worked, what I do off the clock. Work comes first and
  stays compact; pastimes follow, each with my own photos. Section titles sit
  on a smoky black band, the way the game titles its screens.
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
      { rootMargin: "0px 0px -8% 0px" },
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

function Photos({ list, alt }: { list: string[]; alt: string }) {
  if (!list.length) return null;
  return (
    <div className={s.photos} data-count={Math.min(list.length, 3)}>
      {list.slice(0, 3).map((src, i) => (
        <figure key={src} className={s.frame} data-video={src.endsWith(".mp4")}>
          <Media src={src} alt={`${alt}, ${i + 1}`} />
        </figure>
      ))}
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

      <header className={s.hero}>
        <div className={s.heroGlow} aria-hidden="true">
          <Motes source={[0.1, 0.9, 0.75, 1.05]} count={18} drift={0.02} rise={0.45} />
        </div>
        <div className={s.heroInner} data-portrait={!!portrait}>
          <div>
            <h1 className={`${s.name} title-card`}>{person.name}</h1>
            <p className={s.role}>{person.pitch}</p>
            <p className={s.intro}>{profile.intro}</p>
            <div className={s.heroLinks}>
              <Link href="/works/">See the projects &rarr;</Link>
              <a href={`mailto:${person.email}`}>{person.email}</a>
            </div>
          </div>
          {portrait && (
            <figure className={`${s.frame} ${s.portrait}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={person.name} />
            </figure>
          )}
        </div>
      </header>

      <section className={s.chapter}>
        <h2 className={s.band} data-reveal>
          Work
        </h2>
        {profile.served.map((c) => (
          <article key={c.slug} className={s.job} data-reveal>
            <div className={s.jobHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.logo} src={c.logo} alt={`${c.name} logo`} />
              <div>
                <h3>{c.name}</h3>
                <p className={s.title}>{c.title}</p>
              </div>
            </div>
            <div>
              <p className={s.body}>{c.body}</p>
              <ul className={s.stack} aria-label="Built with">
                {c.stack.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Photos list={gallery[c.slug] ?? []} alt={c.name} />
            </div>
          </article>
        ))}

        <div className={s.schools} data-reveal>
          <span className={s.schoolsLabel}>Studied at</span>
          {profile.schools.map((sc) => (
            <span key={sc.name} className={s.school}>
              {sc.name} <em>{sc.field}</em>
            </span>
          ))}
        </div>
      </section>

      <section className={s.chapter}>
        <h2 className={s.band} data-reveal>
          Off the clock
        </h2>
        {profile.pastimes.map((p, n) => (
          <article key={p.slug} className={s.item} data-side={n % 2 ? "right" : "left"} data-reveal>
            <Photos list={gallery[p.slug] ?? []} alt={p.name} />
            <div className={s.itemText}>
              <h3>{p.name}</h3>
              {p.line && <p className={s.line}>{p.line}</p>}
              {p.list && (
                <ol className={s.ranked}>
                  {p.list.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ol>
              )}
              {p.also && <p className={s.also}>{p.also}</p>}
              <p className={s.body}>{p.body}</p>
              {p.quote && <blockquote className={s.quote}>&ldquo;{p.quote}&rdquo;</blockquote>}
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
          <a href={`mailto:${person.email}`}>{person.email}</a>
          <a href={person.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={person.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <Link href="/works/">Projects &rarr;</Link>
        </div>
        <p className={s.credit}>
          Music: &ldquo;Elden Ring&rdquo; by Tsukasa Saitoh. Elden Ring art, footage and music &copy; FromSoftware /
          Bandai Namco, used as a fan tribute. Hachiware &copy; Nagano.
        </p>
      </footer>
    </main>
  );
}
