"use client";

/* A small speaker in the corner of every page. The first gesture anywhere starts the music. */

import { useEffect, useState, useSyncExternalStore } from "react";
import { isMuted, setMuted, startAudio, subscribeAudio } from "@/lib/audio";

export default function SoundToggle() {
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

  if (!mounted) return null;
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        setMuted(!muted);
      }}
      onPointerDown={(e) => e.stopPropagation()}
      aria-label={muted ? "Turn music on" : "Turn music off"}
      title="Music: “Elden Ring” by Tsukasa Saitoh (FromSoftware)"
      style={{
        position: "fixed",
        right: "var(--gutter)",
        bottom: "clamp(16px, 3vh, 28px)",
        zIndex: 90,
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "7px 12px",
        background: "rgba(5, 9, 12, 0.72)",
        border: "1px solid rgba(232, 182, 76, 0.25)",
        backdropFilter: "blur(4px)",
        cursor: "pointer",
        color: "var(--label)",
        fontFamily: "var(--caps)",
        fontSize: 12,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        textShadow: "0 1px 8px rgba(0,0,0,.9)",
      }}
    >
      <span aria-hidden="true" style={{ display: "flex", alignItems: "flex-end", gap: 2, height: 12 }}>
        {[5, 11, 8, 12].map((h, i) => (
          <span
            key={i}
            style={{
              width: 2,
              height: muted ? 2 : h,
              background: "var(--grace)",
              transition: "height 400ms ease",
              animation: muted ? "none" : `eq 1.${4 + i}s ease-in-out ${i * 0.2}s infinite alternate`,
            }}
          />
        ))}
      </span>
      {muted ? "Sound off" : "Sound on"}
    </button>
  );
}
