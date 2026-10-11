"use client";

/*
  The Gate. A kneeling figure, the ring overhead, a sword in the ground.
  Drag the sword upward: the knight hauls on it. The blade and his hands rise
  first, his arm, head and back follow less and less while his knee stays
  planted; he leans back and trembles as it fights him, and dust spits from
  the ground. Let go early and it sinks back. Pull it far enough and it tears
  free in a burst of dust and stone.
*/

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LivingImage, { REDRAW, type Live } from "@/components/LivingImage";
import Debris from "@/components/Debris";
import Motes from "@/components/Motes";
import Sprite, { SPRITES } from "@/components/Sprite";
import { arrived, passThrough } from "@/components/Veil";
import { startAudio } from "@/lib/audio";
import { person } from "@/lib/content";
import s from "./gate.module.css";

const ART: [number, number] = [697, 225];
/** the sword sprite: where it sits in the art, and the rock surface at the blade */
const SWORD = { src: "/art/gate-sword.png", at: [352, 154] as [number, number], size: [11, 40] as [number, number], ground: 187 };
/** how far the sword can be worked loose by hand, in art pixels */
const MAX_LIFT = 5 / ART[1];
/** once free it clears the rock: 6 pixels are buried, so it rises past that */
const FREE_LIFT = 9 / ART[1];
/** drag distance (share of screen height) needed to free it */
const PULL_SPAN = 0.2;

export default function Gate() {
  const live = useRef<Live>({ pull: 0, flash: 0, shake: 0 });
  const dust = useRef<((count: number, power: number) => void) | null>(null);
  const embers = useRef(0.5);
  const drag = useRef<{ y0: number } | null>(null);
  const target = useRef(0);
  const freed = useRef(false);
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const reduce = useRef(false);

  /** Reduced motion has no animation loop: jump straight to the target and ask for one frame. */
  const settle = () => {
    if (!reduce.current) return;
    live.current.pull = target.current;
    live.current.flash = 0;
    window.dispatchEvent(new Event(REDRAW));
  };

  useEffect(() => {
    arrived();
  }, []);

  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce.current) return;
    let raf = 0;
    let last = performance.now();
    let nextShake = 0;
    let grit = 0;
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const L = live.current;
      // Freed: fast. Held: follows the hand. Released: sinks back slowly.
      const rate = freed.current ? 9 : drag.current ? 18 : 5;
      const before = L.pull;
      L.pull += (target.current - L.pull) * Math.min(1, dt * rate);
      L.flash = Math.max(0, L.flash - dt * 0.5);
      // Near the limit the blade fights back: the knight trembles a pixel at a time.
      if (drag.current && !freed.current && L.pull > MAX_LIFT * 0.55) {
        if (now > nextShake) {
          L.shake = (Math.random() < 0.5 ? -1 : 1) * (Math.random() < 0.7 ? 1 : 0) / ART[0];
          nextShake = now + 50 + Math.random() * 60;
        }
      } else L.shake = 0;
      // Grit spits from the ground while the blade moves up through it.
      grit += Math.max(0, L.pull - before) * ART[1] * 5;
      if (grit >= 1 && !freed.current) {
        dust.current?.(Math.floor(grit), 0.3);
        grit -= Math.floor(grit);
      }
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
    startAudio();
    target.current = FREE_LIFT;
    live.current.flash = 1;
    live.current.shake = 0;
    dust.current?.(90, 1);
    settle();
    setShake(true);
    // Hold on the torn-free sword and the dust for a beat before leaving.
    window.setTimeout(() => passThrough("/road", "dark"), 520);
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
    settle();
    if (p >= 1) free();
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (!freed.current) target.current = 0;
    settle();
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setTouched(true);
    target.current = MAX_LIFT;
    settle();
    window.setTimeout(free, 700);
  };

  return (
    <main className={s.gate} onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
      <h1 className="sr-only">{person.name}, portfolio</h1>
      <div className={`${s.push} ${shake ? s.shake : ""}`}>
        <LivingImage
          src="/art/gate.png"
          mask="/art/gate-mask.png"
          fog="/art/gate-fog.png"
          sword={SWORD}
          art={ART}
          scene="gate"
          focus={[0.5, 0.62]}
          live={live}
        >
          <Motes source={[0.4, 0.62, 0.74, 0.95]} count={18} intensity={embers} drift={0.01} rise={0.4} grid={ART} />
          <Debris origin={[358 / ART[0], SWORD.ground / ART[1]]} grid={ART} emit={dust} />
          <button type="button" className={s.sword} aria-label="Draw the sword" onKeyDown={onKey} />
        </LivingImage>
      </div>

      <div className={s.vignette} aria-hidden="true" />

      <header className={s.top}>
        <span className="title-card">{person.name}</span>
        <span className={s.pitch}>{person.pitch}</span>
      </header>

      <p className={`${s.hint} win`} data-hidden={touched} aria-hidden="true">
        <Sprite rows={[...SPRITES.up]} className={s.blink} />
        Drag the sword upward
      </p>

      <Link href="/road" className={s.skip} onPointerDown={(e) => e.stopPropagation()}>
        Skip
        <Sprite rows={[...SPRITES.play]} />
      </Link>
    </main>
  );
}
