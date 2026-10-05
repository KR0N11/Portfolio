/*
  One looping ambient track shared by every page. It starts only on a
  deliberate act (pulling the sword, choosing at the grace, or the sound
  button), never on a stray click or Tab. The mute choice is remembered.
*/

const KEY = "pcl-muted";
/** The track opens with a few near-silent seconds; play from here and loop back here. */
const START_AT = 5;
let el: HTMLAudioElement | null = null;
let started = false;
let playing = false;
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
    el.addEventListener("play", () => {
      playing = true;
      notify();
    });
    el.addEventListener("pause", () => {
      playing = false;
      notify();
    });
    el.volume = 0;
    el.preload = "none";
  }
  return el;
}

export function isPlaying() {
  return playing;
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

/** A short burst of filtered noise: soft and papery, like the game's cursor. */
function noise(start: number, dur: number, gain: number, freq: number, q = 1.2) {
  if (!ctx) return;
  const n = Math.ceil(ctx.sampleRate * dur);
  const buf = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const f = ctx.createBiquadFilter();
  f.type = "bandpass";
  f.frequency.value = freq;
  f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(gain, start);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  src.connect(f).connect(g).connect(ctx.destination);
  src.start(start);
}

/** A slow swell, for when a grace is found. */
function swell(freq: number, start: number, dur: number, gain: number) {
  if (!ctx) return;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = freq;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gain, start + dur * 0.35);
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
    if (kind === "tick") noise(t, 0.035, 0.09, 2500);
    if (kind === "confirm") {
      noise(t, 0.06, 0.08, 1800);
      tone(196, t, 0.7, 0.05);
      tone(98, t, 0.9, 0.04);
    }
    if (kind === "grace") {
      swell(110, t, 2.6, 0.05);
      swell(165, t + 0.05, 2.4, 0.025);
      swell(1320, t + 0.3, 1.8, 0.006);
      noise(t + 0.2, 1.6, 0.015, 4000, 0.6);
    }
  } catch {}
}
