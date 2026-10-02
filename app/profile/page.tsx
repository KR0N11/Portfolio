"use client";

/*
  The status screen. Who I am, where I've served, what I do off the clock.
  No dates and no timeline on purpose.
*/

import Link from "next/link";
import { useEffect } from "react";
import Motes from "@/components/Motes";
import { arrived } from "@/components/Veil";
import { person, profile } from "@/lib/content";
import s from "./profile.module.css";

export default function Profile() {
  useEffect(() => {
    arrived();
  }, []);

  return (
    <main className={s.page}>
      <div className={s.backdrop} aria-hidden="true">
        <Motes source={[0.1, 0.9, 0.7, 1.05]} count={22} drift={0.02} rise={0.4} />
      </div>

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/road">&larr; The road</Link>
        <span className="sep">/</span>
        <span className="here">Status</span>
      </nav>

      <div className={s.sheet}>
        <section className={s.who}>
          <div className={s.eyebrow}>Character</div>
          <h1 className={s.name}>{person.name}</h1>
          <dl className={s.stats}>
            {profile.stats.map((st) => (
              <div key={st.label} className={s.stat}>
                <dt>{st.label}</dt>
                <dd>{st.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className={s.head}>Origin</h2>
          <p className={s.body}>{profile.origin}</p>
          <h2 className={s.head}>Now</h2>
          <p className={s.body}>{profile.now}</p>
          <p className={s.rule}>&ldquo;{profile.rule}&rdquo;</p>

          <div className={s.links}>
            <a href={`mailto:${person.email}`}>Email</a>
            <a href={person.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={person.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <Link href="/works">See the works &rarr;</Link>
          </div>
        </section>

        <section className={s.col}>
          <h2 className={s.head}>Served at</h2>
          <ul className={s.list}>
            {profile.served.map((c) => (
              <li key={c} className={s.place}>
                <span className="diamond" data-on="true" />
                {c}
              </li>
            ))}
          </ul>

          <h2 className={s.head}>Studied at</h2>
          <ul className={s.list}>
            {profile.schools.map((sc) => (
              <li key={sc.name} className={s.school}>
                <span className={s.itemName}>{sc.name}</span>
                <span className={s.itemNote}>{sc.field}</span>
              </li>
            ))}
          </ul>

          <h2 className={s.head}>Tools at hand</h2>
          <ul className={s.tags}>
            {profile.tools.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </section>

        <section className={s.col}>
          <h2 className={s.head}>Off the clock</h2>
          <ul className={s.list}>
            {profile.pastimes.map((p) => (
              <li key={p.name} className={s.pastime}>
                <span className={s.itemName}>{p.name}</span>
                <span className={s.itemNote}>{p.line}</span>
              </li>
            ))}
          </ul>

          <h2 className={s.head}>Drawn to</h2>
          <ul className={s.list}>
            {profile.interests.map((i) => (
              <li key={i} className={s.interest}>
                <span className="diamond" />
                {i}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
