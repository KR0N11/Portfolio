"use client";

/*
  The Gate. A kneeling figure, the ring overhead, a sword in the ground.
  Drag the sword upward: the blade and the fist on it rise against the pull.
  Let go early and it sinks back. Pull it far enough and it comes free.
*/

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LivingImage, { type Live } from "@/components/LivingImage";
import Motes from "@/components/Motes";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./gate.module.css";

const IMG_H = 1240;
/** how far the sword can be worked loose by hand, in image pixels */
const MAX_LIFT = 26 / IMG_H;
/** how far it travels once it comes free */
const FREE_LIFT = 36 / IMG_H;
/** drag distance (share of screen height) needed to free it */
const PULL_SPAN = 0.2;

export default function Gate() {
  const live = useRef<Live>({ pull: 0, flash: 0 });
  const embers = useRef(0.5);
  const drag = useRef<{ y0: number } | null>(null);
  const target = useRef(0);
  const freed = useRef(false);
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    arrived();
  }, []);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const L = live.current;
      // Freed: fast. Held: follows the hand. Released: sinks back slowly.
      const rate = freed.current ? 9 : drag.current ? 18 : 5;
      L.pull += (target.current - L.pull) * Math.min(1, dt * rate);
      L.flash = Math.max(0, L.flash - dt * 0.5);
      embers.current = 0.5 + 0.5 * Math.min(1, L.pull / MAX_LIFT);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const free = () => {
    if (freed.current) return;
    freed.current = true;
    drag.current = null;
    target.current = FREE_LIFT;
    live.current.flash = 0.95;
    setShake(true);
    window.setTimeout(() => passThrough("/road", "dark"), 120);
  };

  const onDown = (e: React.PointerEvent) => {
    if (freed.current) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = { y0: e.clientY };
    setTouched(true);
  };
  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = Math.max(0, (d.y0 - e.clientY) / (window.innerHeight * PULL_SPAN));
    // Resistance: the first part of the pull moves it most, the rest fights back.
    target.current = (MAX_LIFT * (1 - Math.exp(-2.4 * Math.min(p, 1)))) / (1 - Math.exp(-2.4));
    if (p >= 1) free();
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (!freed.current) target.current = 0;
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setTouched(true);
    target.current = MAX_LIFT;
    window.setTimeout(free, 700);
  };

  return (
    <main className={s.gate} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <h1 className="sr-only">{person.name}, portfolio</h1>
      <div className={`${s.push} ${shake ? s.shake : ""}`}>
        <LivingImage
          src="/art/gate.jpg"
          mask="/art/gate-mask.png"
          aspect={3840 / 1240}
          scene="gate"
          focus={[0.5, 0.62]}
          live={live}
        >
          <Motes source={[0.4, 0.62, 0.74, 0.95]} count={18} intensity={embers} drift={0.01} rise={0.4} />
          <button type="button" className={s.sword} aria-label="Draw the sword" onKeyDown={onKey} />
        </LivingImage>
      </div>

      <div className={s.vignette} aria-hidden="true" />

      <header className={s.top}>
        <span className="title-card">{person.name}</span>
        <span className={s.pitch}>{person.pitch}</span>
      </header>

      <p className={s.hint} data-hidden={touched} aria-hidden="true">
        Drag the sword upward
      </p>

      <Link href="/road" className={s.skip} onPointerDown={(e) => e.stopPropagation()}>
        Skip
      </Link>
    </main>
  );
}
