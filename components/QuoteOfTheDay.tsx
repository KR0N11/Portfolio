"use client";

import { useEffect, useState } from "react";
import { quotes } from "@/lib/content";

/*
  One quote per day, rotating through lib/content.ts. The index is
  computed client-side after mount so the static build never bakes in
  a stale day.
*/
export default function QuoteOfTheDay() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const day = Math.floor(Date.now() / 86_400_000);
    setIndex(day % quotes.length);
  }, []);

  const quote = quotes[index];

  return (
    <figure className="metal-panel brushed glint relative overflow-hidden rounded-2xl p-8 md:p-12">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-4 select-none font-display text-[10rem] font-extrabold leading-none text-stroke"
      >
        &rdquo;
      </span>
      <div className="relative z-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-steel">
          Quote of the day
        </p>
        <blockquote className="mt-6 max-w-3xl font-display text-xl font-medium leading-snug text-silver md:text-2xl">
          {quote.text}
        </blockquote>
        <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-steel">
          <span aria-hidden className="mr-3 inline-block h-px w-8 -translate-y-1 bg-white/30" />
          {quote.by}
        </figcaption>
      </div>
    </figure>
  );
}
