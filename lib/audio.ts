/*
  One looping ambient track shared by every page. Browsers only allow sound
  after a user gesture, so the first click or key press anywhere starts it.
  The mute choice is remembered per browser.
*/

const KEY = "pcl-muted";
/** The track opens with a few near-silent seconds; play from here and loop back here. */
const START_AT = 5;
let el: HTMLAudioElement | null = null;
let started = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

function audio() {
  if (!el && typeof window !== "undefined") {
    el = new Audio("/audio/elden-ring-theme.mp3");
    el.loop = false;
    el.addEventListener("ended", () => {
      if (!el) return;
      el.currentTime = START_AT;
      el.play().catch(() => {});
    });
    el.volume = 0;
    el.preload = "auto";
  }
  return el;
}

export function isMuted() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

function fadeTo(target: number, ms = 1800) {
  const a = audio();
  if (!a) return;
  const from = a.volume;
  const t0 = performance.now();
  const step = (now: number) => {
    const k = Math.min(1, (now - t0) / ms);
    a.volume = from + (target - from) * k;
    if (k < 1) requestAnimationFrame(step);
    else if (target === 0) a.pause();
  };
  requestAnimationFrame(step);
}

/** Call from any user gesture. Safe to call many times. */
export function startAudio() {
  const a = audio();
  if (!a || started || isMuted()) return;
  started = true;
  if (a.currentTime < START_AT) a.currentTime = START_AT;
  a.play()
    .then(() => fadeTo(0.45))
    .catch(() => {
      started = false;
    });
  notify();
}

export function setMuted(m: boolean) {
  try {
    localStorage.setItem(KEY, m ? "1" : "0");
  } catch {}
  if (m) {
    fadeTo(0, 500);
    started = false;
  } else {
    startAudio();
  }
  notify();
}

export function subscribeAudio(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

/*
  Menu sounds, synthesized so no game audio files are needed: a soft tick when
  the selection moves, a low bell on confirm, and a swell when a grace is found.
  They respect the same mute switch as the music.
*/
let ctx: AudioContext | null = null;

function tone(freq: number, start: number, dur: number, gain: number, type: OscillatorType = "sine") {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(start);
  o.stop(start + dur + 0.05);
}

export function sfx(kind: "tick" | "confirm" | "grace") {
  if (typeof window === "undefined" || isMuted()) return;
  try {
    ctx ??= new AudioContext();
    if (ctx.state === "suspended") ctx.resume();
    const t = ctx.currentTime;
    if (kind === "tick") tone(1450, t, 0.07, 0.035, "triangle");
    if (kind === "confirm") {
      tone(392, t, 0.9, 0.06);
      tone(587, t + 0.02, 0.8, 0.035);
    }
    if (kind === "grace") {
      [523, 659, 784, 1047].forEach((f, i) => tone(f, t + i * 0.09, 2.2, 0.03));
    }
  } catch {}
}
