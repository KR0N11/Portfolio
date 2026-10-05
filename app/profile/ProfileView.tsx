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
  // Runs after every render so sections added later (or hot-reloaded) still fade in.
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>("[data-reveal]:not([data-reveal='in'])");
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
  });
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

/* Skills: one wide panel per group, name on the left, skills across on the right. */
function SkillCards() {
  return (
    <div className={s.skills}>
      {profile.skills.map((g) => (
        <div key={g.group} className={s.skillCard} data-reveal>
          <h3>{g.group}</h3>
          <ul>
            {g.items.map(([name, icon, level]) => (
              <li key={name}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/skills/${icon}.svg`} alt="" loading="lazy" />
                <span>
                  {name}
                  {level && <em>{level}</em>}
                </span>
              </li>
            ))}
          </ul>
        </div>
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
            <blockquote className={`${s.quote} ${s.heroQuote}`}>&ldquo;{profile.quote}&rdquo;</blockquote>
          </div>
          {portrait && (
            <figure className={`${s.frame} ${s.portrait}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={portrait} alt={person.name} />
            </figure>
          )}
        </div>
      </header>

      <section className={`${s.chapter} ${s.wide}`}>
        <h2 className={s.band} data-reveal>
          Work
        </h2>
        {profile.served.map((c) => (
          <article key={c.slug} className={s.job} data-reveal>
            <div className={s.jobHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.logo} src={c.logo} alt={c.name} />
              <p className={s.title}>{c.title}</p>
            </div>
            <div>
              <p className={s.body}>{c.body}</p>
              <Photos list={gallery[c.slug] ?? []} alt={c.name} />
            </div>
          </article>
        ))}

      </section>

      <section className={`${s.chapter} ${s.wide}`}>
        <h2 className={s.band} data-reveal>
          Studied at
        </h2>
        <div className={s.schools}>
          {profile.schools.map((sc) => (
            <div key={sc.name} className={s.school} data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.schoolLogo} src={sc.logo} alt={sc.name} />
              <span>{sc.field}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={`${s.chapter} ${s.wide}`}>
        <h2 className={s.band} data-reveal>
          Skills
        </h2>
        <SkillCards />
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
              {p.body && <p className={s.body}>{p.body}</p>}
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
