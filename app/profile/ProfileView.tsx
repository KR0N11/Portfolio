"use client";

/*
  Who I am, where I've worked, what I do off the clock. A few plain lines up
  top, work kept compact, then pastimes with my own photos. Sections sit under
  a pixel rule, like a game's status screen; the quote is said in a dialogue
  box, and photos sit in pixel frames but stay sharp.
*/

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import Sprite, { SPRITES } from "@/components/Sprite";
import { arrived } from "@/components/Veil";
import { person, profile } from "@/lib/content";
import s from "./profile.module.css";

type Props = { gallery: Record<string, string[]>; portrait: string | null };

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  // Runs after every render so sections added later (or hot-reloaded) still fade in.
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>(
      "[data-reveal]:not([data-reveal='in'])",
    );
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

/* Clips load and play only while on screen, and never under reduced motion. */
function Clip({ src, alt }: { src: string; alt: string }) {
  const v = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const el = v.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()),
      {
        threshold: 0.25,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <video
      ref={v}
      src={src}
      poster={src.replace(/\.mp4$/, ".poster.jpg")}
      muted
      loop
      playsInline
      preload="none"
      aria-label={alt}
    />
  );
}

function Media({ src, alt }: { src: string; alt: string }) {
  return src.endsWith(".mp4") ? (
    <Clip src={src} alt={alt} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} loading="lazy" />
  );
}

function Photos({
  list,
  alt,
  alts = [],
}: {
  list: string[];
  alt: string;
  alts?: string[];
}) {
  if (!list.length) return null;
  return (
    <div className={s.photos} data-count={Math.min(list.length, 3)}>
      {list.slice(0, 3).map((src, i) => (
        <figure key={src} className={`${s.frame} frame-px`} data-video={src.endsWith(".mp4")}>
          <Media src={src} alt={alts[i] ?? `${alt}, ${i + 1}`} />
        </figure>
      ))}
    </div>
  );
}

export default function ProfileView({ gallery, portrait }: Props) {
  const ref = useReveal();

  const router = useRouter();

  useEffect(() => {
    arrived();
    // Esc leaves, as at the grace and in the projects.
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/road/");
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [router]);

  return (
    <main className={s.page} ref={ref}>
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road/">
          <Sprite rows={[...SPRITES.back]} />
          The road
        </Link>
        <span className="sep">/</span>
        <span className="here">Profile</span>
      </nav>

      <header className={s.hero}>
        <div className={s.heroInner} data-portrait={!!portrait}>
          <div>
            <h1 className={`${s.name} title-card`}>{person.name}</h1>
            <p className={s.role}>{person.pitch}</p>
            <p className={s.intro}>
              {profile.intro.map((t, i) =>
                typeof t === "string" ? t : <b key={i}>{t.em}</b>,
              )}
            </p>
            <figure className={`${s.say} win`}>
              <figcaption className={s.tag}>Ping</figcaption>
              <blockquote>{profile.quote}</blockquote>
            </figure>
          </div>
          {portrait && (
            <figure className={`${s.frame} ${s.portrait} frame-px`}>
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
              <img className={s.logo} src={c.logo} alt={c.name} />
              <p className={s.label}>{c.title}</p>
            </div>
            <div>
              <p className={s.body}>{c.body}</p>
              <Photos list={gallery[c.slug] ?? []} alt={c.name} />
            </div>
          </article>
        ))}
      </section>

      <section className={s.chapter}>
        <h2 className={s.band} data-reveal>
          Studied at
        </h2>
        <div className={s.schools}>
          {profile.schools.map((sc) => (
            <div key={sc.name} className={s.school} data-reveal>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={s.schoolLogo} src={sc.logo} alt={sc.name} />
              <span className={s.label}>{sc.field}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={s.chapter}>
        <h2 className={s.band} data-reveal>
          Off the clock
        </h2>
        <div className={s.pastimes}>
          {profile.pastimes.map((p) => (
            <article
              key={p.slug}
              className={s.item}
              data-slug={p.slug}
              data-reveal
            >
              <Photos list={gallery[p.slug] ?? []} alt={p.name} alts={p.alts} />
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
                {p.quote && (
                  <blockquote className={s.quote}>
                    &ldquo;{p.quote}&rdquo;
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>
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
          Music: &ldquo;Elden Ring&rdquo; by Tsukasa Saitoh. Elden Ring art,
          footage and music &copy; FromSoftware / Bandai Namco, used as a fan
          tribute.
        </p>
      </footer>
      <div className="horizon" aria-hidden="true" />
    </main>
  );
}
