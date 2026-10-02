"use client";

/*
  The title screen. A real loop from the Shadow of the Erdtree gameplay
  trailer: the Tarnished rides the ridge, crests the hill, and the tree comes
  into view. Like the game, it waits for any button. That first press also
  starts the music.
*/

import { useEffect, useRef, useState } from "react";
import { arrived, passThrough } from "@/components/Veil";
import { startAudio } from "@/lib/audio";
import { person } from "@/lib/content";
import s from "./title.module.css";

export default function Title() {
  const gone = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    arrived();
    // Phones in low-power mode may refuse to autoplay; show the title anyway.
    const fallback = window.setTimeout(() => setReady(true), 1500);
    const enter = (e: Event) => {
      if (gone.current) return;
      if (e instanceof KeyboardEvent && (e.metaKey || e.ctrlKey || e.altKey || e.key === "Tab")) return;
      if (e.target instanceof Element && e.target.closest("button")) return;
      gone.current = true;
      startAudio();
      passThrough("/road/", "dark");
    };
    window.addEventListener("pointerup", enter);
    window.addEventListener("keydown", enter);
    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener("pointerup", enter);
      window.removeEventListener("keydown", enter);
    };
  }, []);

  return (
    <main className={s.title}>
      <video
        className={s.video}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/art/landing.jpg"
        onPlaying={() => setReady(true)}
        aria-hidden="true"
      >
        <source src="/art/landing-720.mp4" type="video/mp4" media="(max-width: 900px)" />
        <source src="/art/landing.mp4" type="video/mp4" />
      </video>
      <div className={s.shade} aria-hidden="true" />

      <div className={s.center} data-ready={ready}>
        <h1 className={s.name}>{person.name}</h1>
        <p className={s.role}>
          {person.role} · {person.home}
        </p>
      </div>

      <p className={s.press} data-ready={ready}>
        Press any button
      </p>
    </main>
  );
}
