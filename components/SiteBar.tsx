"use client";

/*
  Top-right links on every page, so a visitor never has to dig for them:
  Projects, GitHub, LinkedIn, Email, and the music toggle. The toggle shows
  whether music is actually playing, not just whether it is allowed to.
*/

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { isPlaying, setMuted, subscribeAudio } from "@/lib/audio";
import { person } from "@/lib/content";

export default function SiteBar() {
  const playing = useSyncExternalStore(subscribeAudio, isPlaying, () => false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="sitebar" aria-label="Contact and links" onPointerDown={(e) => e.stopPropagation()}>
      <Link href="/works/">Projects</Link>
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
          data-muted={!playing}
          onClick={() => setMuted(playing)}
          aria-label={playing ? "Turn music off" : "Turn music on"}
          title="Music: “Elden Ring” by Tsukasa Saitoh"
        >
          <span aria-hidden="true">
            {[5, 11, 8, 12].map((h, i) => (
              <span key={i} style={{ height: playing ? h : 2, animationDelay: `${i * 0.2}s` }} />
            ))}
          </span>
          {playing ? "Sound on" : "Sound off"}
        </button>
      )}
    </nav>
  );
}
