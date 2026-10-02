"use client";

/*
  The full-screen wash used between places. A page calls `passThrough(href, tone)`:
  the veil rises, the route changes underneath it, and the veil falls once the
  next page has mounted. The layout keeps this component alive across routes.
*/

import { useRouter } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

type Tone = "gold" | "dark";
type State = { up: boolean; tone: Tone; href: string | null };

let state: State = { up: false, tone: "dark", href: null };
const listeners = new Set<() => void>();
const set = (next: Partial<State>) => {
  state = { ...state, ...next };
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

const RISE_MS = 900;

export function passThrough(href: string, tone: Tone = "dark") {
  if (state.href) return;
  set({ up: true, tone, href });
}

/* Called by a page once it has painted, so the veil can fall. */
export function arrived() {
  if (state.up && !state.href) set({ up: false });
}

export default function Veil() {
  const router = useRouter();
  const s = useSyncExternalStore(subscribe, () => state, () => state);

  useEffect(() => {
    if (!s.href) return;
    const href = s.href;
    const t = window.setTimeout(() => {
      if (href.startsWith("http") || href.startsWith("mailto:")) {
        window.location.href = href;
        set({ href: null, up: false });
        return;
      }
      router.push(href);
      set({ href: null });
      // Fallback in case the next page never reports in.
      window.setTimeout(() => set({ up: false }), 1400);
    }, RISE_MS);
    return () => window.clearTimeout(t);
  }, [s.href, router]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        pointerEvents: s.up ? "auto" : "none",
        opacity: s.up ? 1 : 0,
        transition: `opacity ${s.up ? RISE_MS : 1100}ms ease`,
        background:
          s.tone === "gold"
            ? "radial-gradient(circle at 50% 45%, #fff3cf 0%, #f3dc9a 30%, #c9922f 75%, #6b4512 100%)"
            : "radial-gradient(circle at 50% 50%, #2a1f0c 0%, #05090c 70%)",
      }}
    />
  );
}
