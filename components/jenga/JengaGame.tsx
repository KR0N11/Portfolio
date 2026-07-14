"use client";

import { useCallback, useState } from "react";
import dynamic from "next/dynamic";
import Grain from "@/components/Grain";

/* three + rapier are client-only; loaded lazily so the main site never pays for them */
const Scene = dynamic(() => import("./Scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center">
      <span className="animate-pulse font-mono text-xs uppercase tracking-[0.35em] text-steel motion-reduce:animate-none">
        Loading physics…
      </span>
    </div>
  ),
});

export default function JengaGame() {
  const [toppled, setToppled] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const onTopple = useCallback(() => setToppled(true), []);

  function reset() {
    setToppled(false);
    setResetKey((k) => k + 1);
  }

  return (
    <main className="fixed inset-0 bg-carbon text-silver">
      <div className="h-full w-full">
        <Scene resetKey={resetKey} onTopple={onTopple} />
      </div>
      <Grain />

      {/* top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between p-5 md:p-8">
        <a
          href="/"
          className="pointer-events-auto -m-2 flex min-h-11 cursor-pointer items-center gap-3 p-2 font-mono text-[11px] uppercase tracking-[0.25em] text-steel transition-colors duration-300 hover:text-chrome"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l6-6m-6 6l6 6" />
          </svg>
          Back
        </a>
        <button
          type="button"
          onClick={reset}
          className="pointer-events-auto flex min-h-11 cursor-pointer items-center rounded-full border border-white/15 px-5 font-mono text-[11px] uppercase tracking-[0.25em] text-silver transition-colors duration-300 hover:border-white/40 hover:text-chrome"
        >
          Reset
        </button>
      </div>

      {/* toppled banner */}
      {toppled && (
        <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 -translate-y-1/2 text-center">
          <p className="chrome-text chrome-shimmer font-display text-5xl font-extrabold tracking-tight md:text-7xl">
            TOWER DOWN
          </p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.3em] text-steel">
            Happens to the best of us. Hit reset.
          </p>
        </div>
      )}

      {/* bottom HUD */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-5 md:p-8">
        <p className="max-w-xs font-mono text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-steel">
          Drag a block to pull it out.
          <br />
          Drag the space around it to orbit.
          <br />
          Don&apos;t topple the tower.
        </p>
        <p className="hidden font-mono text-[10px] uppercase tracking-[0.3em] text-iron sm:block">
          You found the easter egg
        </p>
      </div>
    </main>
  );
}
