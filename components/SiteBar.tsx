"use client";

/*
  Top-right links on every page, so a visitor never has to dig for them:
  GitHub, LinkedIn, Email, and the music toggle. The first click or key
  press anywhere starts the music (browsers block sound before a gesture).
*/

import { useEffect, useState, useSyncExternalStore } from "react";
import { isMuted, setMuted, startAudio, subscribeAudio } from "@/lib/audio";
import { person } from "@/lib/content";

export default function SiteBar() {
  const muted = useSyncExternalStore(subscribeAudio, isMuted, () => false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const go = () => startAudio();
    window.addEventListener("pointerdown", go);
    window.addEventListener("keydown", go);
    return () => {
      window.removeEventListener("pointerdown", go);
      window.removeEventListener("keydown", go);
    };
  }, []);

  return (
    <nav className="sitebar" aria-label="Contact and links" onPointerDown={(e) => e.stopPropagation()}>
      <a href={person.github} target="_blank" rel="noreferrer">
        GitHub
      </a>
      <a href={person.linkedin} target="_blank" rel="noreferrer">
        LinkedIn
      </a>
      <a href={`mailto:${person.email}`} title={person.email}>
        Email
      </a>
      {mounted && (
        <button
          type="button"
          className="sound"
          data-muted={muted}
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Turn music on" : "Turn music off"}
          title="Music: “Elden Ring” by Tsukasa Saitoh"
        >
          <span aria-hidden="true">
            {[5, 11, 8, 12].map((h, i) => (
              <span key={i} style={{ height: muted ? 2 : h, animationDelay: `${i * 0.2}s` }} />
            ))}
          </span>
          {muted ? "Sound off" : "Sound on"}
        </button>
      )}
    </nav>
  );
}
