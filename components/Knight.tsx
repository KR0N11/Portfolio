"use client";

/*
  The knight: a pixel sprite sheet laid on the scene's stage, one frame at a
  time. The sheet's frames sit side by side; the box says where a frame goes
  in the art, in art pixels. Because the stage is scaled by a whole number,
  every sprite pixel lands on the art's grid.

  A page drives it through `api`: `frame(i)` shows frame i, `nudge(dx)` shifts
  it sideways by whole art pixels (a tremble).
*/

import { useEffect, useRef } from "react";

export type KnightApi = { frame: (i: number) => void; nudge: (dx: number) => void };

type Props = {
  sheet: string;
  frames: number;
  /** where a frame sits in the art: x, y, width, height in art pixels */
  box: [number, number, number, number];
  /** the art's size in pixels */
  art: [number, number];
  api: React.RefObject<KnightApi | null>;
};

export default function Knight({ sheet, frames, box, art, api }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [x, y, w, h] = box;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    api.current = {
      frame: (i) => {
        el.style.backgroundPosition = `${(Math.max(0, Math.min(frames - 1, i)) / (frames - 1)) * 100}% 0`;
      },
      nudge: (dx) => {
        el.style.transform = dx ? `translateX(${(dx / w) * 100}%)` : "";
      },
    };
    return () => {
      api.current = null;
    };
  }, [api, frames, w]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        left: `${(x / art[0]) * 100}%`,
        top: `${(y / art[1]) * 100}%`,
        width: `${(w / art[0]) * 100}%`,
        height: `${(h / art[1]) * 100}%`,
        backgroundImage: `url(${sheet})`,
        backgroundSize: `${frames * 100}% 100%`,
        backgroundPosition: "0 0",
        imageRendering: "pixelated",
        pointerEvents: "none",
      }}
    />
  );
}
