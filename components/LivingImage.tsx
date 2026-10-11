"use client";

/*
  A still frame that breathes. The picture never changes; a fragment shader
  moves only what would move in the world and leaves the rest alone. Which
  pixels may move comes from a hand-made mask image per scene:
    R = the body (gate: the knight's upper body, fists on the hilt included,
        rises with the sword as one piece and unfolds through the hips; the
        knee stays planted)
    G = gate: the fists, which stay in front of the sword's grip
    B = the foreground figure and ground, which drifting fog passes behind
  An optional fog layer (RGBA, tiling sideways) drifts across the scene, and an
  optional sword sprite is drawn on top and slides up out of the rock.

  The picture is pixel art. The stage that covers the viewport is scaled by a
  whole number, so every art pixel is the same number of screen pixels, and
  the shader samples one texel per art pixel: whatever moves, moves in whole
  pixels. Children are positioned in image space with plain percentages.
*/

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type Scene = "gate" | "road";

/** Fired by a page to ask for one frame when reduced motion has stopped the loop. */
export const REDRAW = "living-image:redraw";

/**
 * Values a page can change every frame. `pull` is the sword lift in image heights,
 * `shake` a sideways tremble of the straining figure in image widths.
 */
export type Live = { pull: number; flash: number; shake?: number };

type Props = {
  src: string;
  mask: string;
  /** optional drifting fog layer, same size as the art */
  fog?: string;
  /** optional sword sprite and where its top-left sits in the art, in art pixels */
  sword?: { src: string; at: [number, number]; size: [number, number]; ground: number };
  /** the art's size in pixels */
  art: [number, number];
  scene: Scene;
  /** image-space point to keep in view when the screen is narrower or taller than the image */
  focus: [number, number];
  live?: React.RefObject<Live>;
  stageStyle?: React.CSSProperties;
  children?: ReactNode;
};

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D uImg;
uniform sampler2D uMask;
uniform sampler2D uFog;
uniform float uHasFog;
uniform float uShake;
uniform sampler2D uSword;
uniform vec4 uSwordRect;   // x, y, w, h in art pixels
uniform float uGround;     // the rock's surface at the blade, in art pixels
uniform vec2 uRes;    // canvas size in device pixels
uniform vec2 uView;   // frame size in css pixels
uniform vec4 uRect;   // stage left, top, width, height in css pixels
uniform float uTime;
uniform float uScene;
uniform float uPull;
uniform float uFlash;
uniform vec2 uTex;    // art size in pixels


float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

// Firelight in the art flickers a little; nothing else changes colour.
vec3 flicker(vec3 col, vec2 uv, float t) {
  float warm = smoothstep(0.1, 0.4, col.r - col.b);
  float f = 0.5 + 0.5 * sin(t * 1.3 + noise(uv * 6.0 + t * 0.4) * 3.0);
  return col * (1.0 + warm * 0.06 * f);
}

// Light steps down in a few flat rings, as a pixel artist would draw it.
float rings(float a, float n) { return floor(clamp(a, 0.0, 1.0) * n) / n; }

vec3 gate(vec2 uv, float t) {
  vec4 mk = texture2D(uMask, uv);
  float px = uPull * uTex.y;                 // how far the sword has come up, in art pixels

  // The upper body, fists and sword rise together as one piece, so nothing in
  // it tears; the hips unfold under it. Solve o = lift(uv + o) so pixels land right.
  // Seed the search with the full lift, or pixels the body rises into (sky
  // above it) would never find it.
  float full = px / uTex.y;
  float o = full * max(texture2D(uMask, uv).r, texture2D(uMask, uv + vec2(0.0, full)).r);
  for (int i = 0; i < 4; i++) {
    o = floor(texture2D(uMask, uv + vec2(0.0, o)).r * px + 0.5) / uTex.y;
  }
  // Straining, he leans back a little and trembles.
  vec4 at = texture2D(uMask, uv + vec2(0.0, o));
  float lean = floor(at.r * min(px, 8.0) * 0.25 + 0.5) / uTex.x;
  vec2 s = uv + vec2(lean + uShake * at.r, o);
  vec3 col = texture2D(uImg, s).rgb;
  float front = texture2D(uMask, s).b;
  float hands = texture2D(uMask, s).g;

  // The sword slides up out of the rock; the rock hides what is still buried,
  // and the hands stay in front of the grip.
  vec2 p = uv * uTex;
  // the sword moves with the fists: up by the pull, back by the lean
  vec2 shift = vec2(floor(min(px, 8.0) * 0.25 + 0.5), floor(px + 0.5));
  vec2 q = (p - uSwordRect.xy + shift) / uSwordRect.zw;
  if (uSwordRect.z > 0.0 && q.x >= 0.0 && q.x < 1.0 && q.y >= 0.0 && q.y < 1.0 && p.y < uGround) {
    vec4 sw = texture2D(uSword, q);
    if (sw.a > 0.5 && !(hands > 0.6 && front > 0.5)) { col = sw.rgb; front = 1.0; }
  }

  // A fog bank drifts across, a pixel at a time, behind the knight and the near ground.
  if (uHasFog > 0.5) {
    float drift = floor(t * 1.5) / uTex.x;
    vec4 f = texture2D(uFog, vec2(fract(uv.x + drift), uv.y));
    col = mix(col, f.rgb, f.a * (1.0 - step(0.5, front)));
  }

  // When the blade tears free, light bursts from the rock behind him: a ragged
  // flare in a few steps. The knight stays solid, lit only along his edges.
  vec2 base = vec2(uSwordRect.x + 6.0, uGround);
  vec2 dv = (p - base) * vec2(1.0, 1.4);
  float ray = 0.75 + 0.35 * abs(sin(atan(dv.y, dv.x) * 5.0 + 0.6));
  float glow = rings(1.0 - length(dv) / (42.0 * ray), 4.0) * uFlash;
  float knight = step(0.05, at.r);
  if (knight < 0.5) {
    col += glow * vec3(1.0, 0.86, 0.6) * 0.95;
  } else {
    float edge = 0.0;
    edge = max(edge, 1.0 - step(0.05, texture2D(uMask, s + vec2(1.0, 0.0) / uTex).r));
    edge = max(edge, 1.0 - step(0.05, texture2D(uMask, s + vec2(-1.0, 0.0) / uTex).r));
    edge = max(edge, 1.0 - step(0.05, texture2D(uMask, s + vec2(0.0, -1.0) / uTex).r));
    col += glow * edge * vec3(1.0, 0.86, 0.6) * 0.8;
  }

  return flicker(col, uv, t);
}

vec3 road(vec2 uv, float t) {
  vec4 mk = texture2D(uMask, uv);

  // The veils hanging in the sky move like cloth.
  vec2 flow = vec2(fbm(uv * vec2(3.0, 4.0) + vec2(t * 0.05, t * 0.02)),
                   fbm(uv * vec2(3.0, 4.0) + vec2(4.1, -t * 0.04))) - 0.5;
  vec2 s = uv + flow * 0.005 * mk.g;

  // Gusts roll across the field; each blade answers a little late.
  float gust = 0.5 + 0.5 * sin(uv.x * 4.0 - t * 0.9 + fbm(uv * 3.0 + t * 0.1) * 3.0);
  float n = fbm(vec2(uv.x * 22.0 - t * 1.2, uv.y * 4.0)) - 0.5;
  float sway = (n + 0.25 * sin(t * 1.7 + uv.x * 30.0)) * (0.35 + 0.65 * gust);
  s.x += sway * 0.0055 * mk.r;
  s.y += abs(sway) * 0.0012 * mk.r;

  vec3 col = texture2D(uImg, s).rgb;

  // Mist drifting across the middle distance.
  float band = smoothstep(0.55, 0.66, uv.y) * (1.0 - smoothstep(0.72, 0.84, uv.y));
  float m = fbm(vec2(uv.x * 3.0 - t * 0.02, uv.y * 8.0) + fbm(uv * 3.0 + t * 0.01));
  col = mix(col, vec3(0.78, 0.74, 0.64), band * smoothstep(0.5, 0.9, m) * 0.22);

  return flicker(col, uv, t);
}

void main() {
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uRes * uView;
  vec2 uv = (css - uRect.xy) / uRect.zw;
  // One sample per art pixel: snap to the texel centre.
  uv = (floor(uv * uTex) + 0.5) / uTex;
  vec3 col = uScene < 0.5 ? gate(uv, uTime) : road(uv, uTime);
  if (uScene > 0.5) col += uFlash * vec3(1.0, 0.96, 0.88);
  gl_FragColor = vec4(col, 1.0);
}`;

type Rect = { left: number; top: number; width: number; height: number };

/**
 * Cover the frame with the art at a whole-number scale, keeping `focus` in view.
 * `margin` (a share of the art) is kept hidden past every edge, for scenes that shift.
 */
export function cover(w: number, h: number, [aw, ah]: [number, number], [fx, fy]: [number, number], margin = 0): Rect {
  const cell = Math.max(1, Math.ceil(Math.max(w / aw, h / ah) * (1 + margin)));
  const width = aw * cell;
  const height = ah * cell;
  const mx = Math.min((width * margin) / 2, (width - w) / 2);
  const my = Math.min((height * margin) / 2, (height - h) / 2);
  const left = Math.round(Math.min(-mx, Math.max(w - width + mx, w / 2 - fx * width)));
  const top = Math.round(Math.min(-my, Math.max(h - height + my, h / 2 - fy * height)));
  return { left, top, width, height };
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export default function LivingImage({ src, mask, fog, sword, art, scene, focus, live, stageStyle, children }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef<Rect | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const fx = focus[0];
  const fy = focus[1];
  const [aw, ah] = art;

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const r = cover(el.clientWidth, el.clientHeight, [aw, ah], [fx, fy]);
      rectRef.current = r;
      setRect(r);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aw, ah, fx, fy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const compile = (type: number, code: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, code);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    const textures: WebGLTexture[] = [];
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(prog, name);
    const uRes = u("uRes");
    const uView = u("uView");
    const uRect = u("uRect");
    const uTime = u("uTime");
    const uPull = u("uPull");
    const uFlash = u("uFlash");
    gl.uniform1f(u("uScene"), scene === "gate" ? 0 : 1);
    gl.uniform1i(u("uImg"), 0);
    gl.uniform1i(u("uMask"), 1);
    gl.uniform1i(u("uFog"), 2);
    gl.uniform1i(u("uSword"), 3);
    gl.uniform4f(u("uSwordRect"), sword?.at[0] ?? 0, sword?.at[1] ?? 0, sword?.size[0] ?? 0, sword?.size[1] ?? 0);
    gl.uniform1f(u("uGround"), sword?.ground ?? 0);
    gl.uniform1f(u("uHasFog"), fog ? 1 : 0);
    gl.uniform2f(u("uTex"), aw, ah);
    const uShake = u("uShake");

    const upload = (unit: number, img: HTMLImageElement, format: number = gl.RGB) => {
      const tex = gl.createTexture()!;
      textures.push(tex);
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texImage2D(gl.TEXTURE_2D, 0, format, format, gl.UNSIGNED_BYTE, img);
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let alive = true;
    let draw: ((now: number) => void) | null = null;

    Promise.all([loadImage(src), loadImage(mask), fog ? loadImage(fog) : null, sword ? loadImage(sword.src) : null])
      .then(([img, mk, fg, sw]) => {
        if (!alive) return;
        // Phones with small texture limits keep the plain image underneath.
        if (img.naturalWidth > gl.getParameter(gl.MAX_TEXTURE_SIZE)) return;
        upload(0, img);
        upload(1, mk);
        if (fg) upload(2, fg, gl.RGBA);
        if (sw) upload(3, sw, gl.RGBA);

        let lastKey = "";
        draw = (now: number) => {
          if (!alive) return;
          const r = rectRef.current;
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          const vw = frame.clientWidth;
          const vh = frame.clientHeight;
          const w = Math.round(vw * dpr);
          const h = Math.round(vh * dpr);
          if (canvas.width !== w || canvas.height !== h) {
            canvas.width = w;
            canvas.height = h;
            gl.viewport(0, 0, w, h);
          }
          const L = live?.current;
          const key = `${w}x${h}:${r?.left},${r?.top}:${L?.pull}:${L?.flash}:${L?.shake}`;
          if (r && (!reduce || key !== lastKey)) {
            gl.uniform2f(uRes, w, h);
            gl.uniform2f(uView, vw, vh);
            gl.uniform4f(uRect, r.left, r.top, r.width, r.height);
            gl.uniform1f(uTime, reduce ? 20 : (now / 1000) % 1800);
            gl.uniform1f(uPull, L?.pull ?? 0);
            gl.uniform1f(uFlash, L?.flash ?? 0);
            gl.uniform1f(uShake, L?.shake ?? 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            lastKey = key;
          }
          // Reduced motion: no loop. Draw again only on resize or a "redraw" event.
          if (!reduce) raf = requestAnimationFrame(draw!);
        };
        raf = requestAnimationFrame((now) => {
          draw?.(now);
          setReady(true);
        });
      })
      .catch(() => {});

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && alive && draw && !reduce) raf = requestAnimationFrame(draw);
    };
    const redraw = () => {
      if (reduce && alive && draw) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", redraw);
    window.addEventListener(REDRAW, redraw);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", redraw);
      window.removeEventListener(REDRAW, redraw);
      // Free what we made but keep the context: React may mount this canvas
      // again (dev double-mount, back navigation), and a lost context never
      // comes back, which left the scene frozen on return.
      textures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src, mask, fog, sword, scene, live, aw, ah]);

  const stage: React.CSSProperties = {
    position: "absolute",
    left: rect?.left ?? 0,
    top: rect?.top ?? 0,
    width: rect?.width ?? "100%",
    height: rect?.height ?? "100%",
  };

  return (
    <div ref={frameRef} style={{ position: "absolute", inset: 0, overflow: "hidden", ...stageStyle }}>
      <div style={stage}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", imageRendering: "pixelated" }}
        />
      </div>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          opacity: ready ? 1 : 0,
          transition: "opacity 600ms ease",
        }}
      />
      <div style={stage}>{children}</div>
    </div>
  );
}
