/*
  One looping ambient track shared by every page. Browsers only allow sound
  after a user gesture, so the first click or key press anywhere starts it.
  The mute choice is remembered per browser.
*/

const KEY = "pcl-muted";
let el: HTMLAudioElement | null = null;
let started = false;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((l) => l());

function audio() {
  if (!el && typeof window !== "undefined") {
    el = new Audio("/audio/ambient-1.mp3");
    el.loop = true;
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
