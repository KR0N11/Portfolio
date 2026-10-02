"use client";

/*
  The Gate. A kneeling figure, a sleeping ring, a sword in the ground.
  Press and hold the blade (or tap it three times) and the light climbs from
  the hilt into the ring. At full draw the screen floods gold and the road opens.
*/

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import LivingImage, { type Live } from "@/components/LivingImage";
import Motes from "@/components/Motes";
import { arrived, passThrough } from "@/components/Veil";
import { person } from "@/lib/content";
import s from "./gate.module.css";

const HOLD_SECONDS = 1.9;
const PROMPTS = ["Draw the blade", "Hold fast", "It is coming free", "The way is open"];

export default function Gate() {
  const live = useRef<Live>({ draw: 0 });
  const glow = useRef(0.45);
  const holding = useRef(false);
  const target = useRef(0);
  const pressedAt = useRef(0);
  const done = useRef(false);
  const [stage, setStage] = useState(0);

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
      if (holding.current) {
        L.draw = Math.min(1, L.draw + dt / HOLD_SECONDS);
        target.current = L.draw;
      } else {
        // Settle toward the target: taps jump forward a third, a released hold
        // slips back to the last third it passed.
        const d = target.current - L.draw;
        L.draw += Math.sign(d) * Math.min(Math.abs(d), dt * (d > 0 ? 1.4 : 0.6));
      }
      glow.current = 0.45 + 0.55 * L.draw;
      const st = L.draw >= 0.999 ? 3 : Math.floor(L.draw * 3 + 1e-6);
      setStage((prev) => (prev === st ? prev : st));
      if (L.draw >= 0.999 && !done.current) {
        done.current = true;
        window.setTimeout(() => passThrough("/road", "gold"), 650);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const press = useCallback(() => {
    if (done.current) return;
    holding.current = true;
    pressedAt.current = performance.now();
  }, []);

  const release = useCallback(() => {
    if (!holding.current) return;
    holding.current = false;
    const L = live.current;
    const tap = performance.now() - pressedAt.current < 260;
    target.current = tap
      ? Math.min(1, Math.ceil((L.draw + 0.02) * 3) / 3)
      : L.draw >= 0.999
        ? 1
        : Math.floor(L.draw * 3 + 1e-6) / 3;
  }, []);

  const holdProps = {
    onPointerDown: (e: React.PointerEvent) => {
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
      press();
    },
    onPointerUp: release,
    onPointerCancel: release,
    onLostPointerCapture: release,
    onKeyDown: (e: React.KeyboardEvent) => {
      if ((e.key === " " || e.key === "Enter") && !e.repeat) {
        e.preventDefault();
        press();
      }
    },
    onKeyUp: (e: React.KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") release();
    },
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };

  return (
    <main className={s.gate}>
      <h1 className="sr-only">{person.name}, portfolio</h1>
      <div className={s.push}>
        <LivingImage src="/art/gate.jpg" aspect={962 / 536} scene="gate" focus={[0.45, 0.62]} live={live}>
          <Motes source={[0.36, 0.58, 0.72, 0.92]} count={30} intensity={glow} drift={0.015} rise={0.42} />
          <button
            type="button"
            className={s.sword}
            aria-label="Draw the blade: press and hold"
            {...holdProps}
          >
            <span className="diamond" data-pulse={stage < 3} data-on={stage > 0} />
          </button>
        </LivingImage>
      </div>

      <div className={s.vignette} aria-hidden="true" />

      <header className={s.top}>
        <span>{person.name}</span>
        <span>Portfolio</span>
      </header>

      <div className={s.bottom}>
        <button type="button" className={s.prompt} data-stage={stage} {...holdProps}>
          <span className={s.ring} aria-hidden="true">
            <span style={{ transform: `scale(${0.35 + stage * 0.22})` }} />
          </span>
          <span aria-live="polite">{PROMPTS[stage]}</span>
        </button>
        <div className={s.pips} aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span key={i} className="diamond" data-on={i < stage} />
          ))}
        </div>
        <div className={s.hint} aria-hidden="true">
          {stage === 0 ? "Press and hold the sword" : stage < 3 ? "Keep holding" : " "}
        </div>
      </div>

      <Link href="/road" className={s.skip}>
        Skip the ritual
      </Link>
    </main>
  );
}
