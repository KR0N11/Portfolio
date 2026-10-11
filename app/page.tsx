"use client";

/*
  The Gate. A knight kneels before a sword in the rock, the Ring overhead.
  Drag upward and he hauls on it, frame by frame: braces, leans back, hauls,
  trembling as it fights him, grit spitting from the rock. Let go early and he
  settles back. Pull far enough and it gives: light bursts from the stone, he
  rises with the blade and lifts it overhead, and the way opens.
*/

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Debris from "@/components/Debris";
import Knight, { type KnightApi } from "@/components/Knight";
import LivingImage, { REDRAW, type Live } from "@/components/LivingImage";
import Motes from "@/components/Motes";
import Sprite, { SPRITES } from "@/components/Sprite";
import { arrived, passThrough } from "@/components/Veil";
import { startAudio } from "@/lib/audio";
import { person } from "@/lib/content";
import s from "./gate.module.css";

const ART: [number, number] = [697, 225];
/** the knight's sprite sheet: frames side by side, and where a frame sits in the art */
const KNIGHT = { sheet: "/art/gate-knight.png", frames: 17, box: [266, 84, 124, 118] as [number, number, number, number] };
/** frames 0..STRAIN-1 follow the drag; the rest play once the sword comes free */
const STRAIN = 7;
/** the frame where the blade leaves the rock */
const CLEAR = STRAIN + 1;
const FRAME_MS = 90;
/** where the sword stands in the rock, in art pixels */
const ROCK: [number, number] = [358, 186];
/** drag distance (share of screen height) needed to free it */
const PULL_SPAN = 0.2;

export default function Gate() {
  const live = useRef<Live>({ flash: 0 });
  const knight = useRef<KnightApi | null>(null);
  const dust = useRef<((count: number, power: number) => void) | null>(null);
  const embers = useRef(0.5);
  const drag = useRef<{ y0: number } | null>(null);
  /** how far into the haul, 0..1: where the hand is, and where the knight is */
  const target = useRef(0);
  const haul = useRef(0);
  const freed = useRef(false);
  const [touched, setTouched] = useState(false);
  const [shake, setShake] = useState(false);
  const reduce = useRef(false);

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
      live.current.flash = Math.max(0, live.current.flash - dt * 0.6);
      if (!freed.current) {
        // Held: follows the hand. Let go: he settles back.
        const before = haul.current;
        haul.current += (target.current - haul.current) * Math.min(1, dt * (drag.current ? 14 : 5));
        knight.current?.frame(Math.round(haul.current * (STRAIN - 1)));
        // Near the end the blade fights back: he trembles a pixel at a time.
        if (drag.current && haul.current > 0.6) {
          if (now > nextShake) {
            knight.current?.nudge(Math.random() < 0.6 ? (Math.random() < 0.5 ? -1 : 1) : 0);
            nextShake = now + 50 + Math.random() * 60;
          }
        } else knight.current?.nudge(0);
        // Grit spits from the rock while he hauls.
        grit += Math.max(0, haul.current - before) * 14;
        if (grit >= 1) {
          dust.current?.(Math.floor(grit), 0.3);
          grit -= Math.floor(grit);
        }
        embers.current = 0.5 + 0.5 * haul.current;
      }
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
    knight.current?.nudge(0);
    if (reduce.current) {
      knight.current?.frame(KNIGHT.frames - 1);
      window.dispatchEvent(new Event(REDRAW));
      window.setTimeout(() => passThrough("/road", "dark"), 400);
      return;
    }
    // He tears it free, rises, and lifts it overhead, a frame at a time.
    for (let f = STRAIN; f < KNIGHT.frames; f++) {
      window.setTimeout(() => {
        knight.current?.frame(f);
        if (f === CLEAR) {
          live.current.flash = 1;
          dust.current?.(90, 1);
          setShake(true);
        }
      }, (f - STRAIN) * FRAME_MS);
    }
    embers.current = 1;
    // Hold on the raised sword for a beat before leaving.
    window.setTimeout(() => passThrough("/road", "dark"), (KNIGHT.frames - STRAIN) * FRAME_MS + 650);
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
    target.current = (1 - Math.exp(-2.4 * Math.min(p, 1))) / (1 - Math.exp(-2.4));
    if (reduce.current) knight.current?.frame(Math.round(target.current * (STRAIN - 1)));
    if (p >= 1) free();
  };
  const onUp = () => {
    if (!drag.current) return;
    drag.current = null;
    if (!freed.current) target.current = 0;
    if (reduce.current && !freed.current) knight.current?.frame(0);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    setTouched(true);
    target.current = 1;
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
          burst={ROCK}
          art={ART}
          scene="gate"
          focus={[0.5, 0.62]}
          live={live}
        >
          <Knight sheet={KNIGHT.sheet} frames={KNIGHT.frames} box={KNIGHT.box} art={ART} api={knight} />
          <Motes source={[0.4, 0.62, 0.74, 0.95]} count={18} intensity={embers} drift={0.01} rise={0.4} grid={ART} />
          <Debris origin={[ROCK[0] / ART[0], ROCK[1] / ART[1]]} grid={ART} emit={dust} />
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
