"use client";

/*
  A still frame that breathes. The picture never changes; a fragment shader
  moves what would move in the world (clouds, mist, grass in the wind, the
  light of the ring) and leaves the figure alone.

  The image is laid out on a "stage" sized to cover the viewport, so anything
  passed as children can be positioned in image space with plain percentages
  and stays pinned to the right spot at every screen size.
*/

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

export type Scene = "gate" | "road" | "still";

export type Live = { draw: number };

type Props = {
  src: string;
  /** width / height of the source image */
  aspect: number;
  scene: Scene;
  /** image-space point to keep in view when the screen is narrower or taller than the image */
  focus: [number, number];
  live?: React.RefObject<Live>;
  stageClassName?: string;
  stageStyle?: React.CSSProperties;
  children?: ReactNode;
};

const VERT = `
attribute vec2 a;
varying vec2 vUv;
void main() {
  vUv = vec2(a.x * 0.5 + 0.5, 0.5 - a.y * 0.5);
  gl_Position = vec4(a, 0.0, 1.0);
}`;

const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uImg;
uniform float uTime;
uniform float uDraw;
uniform float uScene;
uniform float uAspect;

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
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}
float seg(vec2 p, vec2 a, vec2 b, out float h) {
  vec2 pa = p - a, ba = b - a;
  h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * h);
}

vec3 gate(vec2 uv, float t) {
  vec2 p = vec2(uv.x * uAspect, uv.y);
  vec2 rc = vec2(0.4397 * uAspect, 0.401);
  float rr = 0.2146;
  float d = length(p - rc);

  // Clouds churn above the horizon; the ring itself holds still.
  float sky = 1.0 - smoothstep(0.48, 0.72, uv.y);
  float hold = smoothstep(rr * 0.8, rr * 1.55, d);
  vec2 flow = vec2(fbm(uv * 2.5 + vec2(t * 0.035, 0.0)),
                   fbm(uv * 2.5 + vec2(3.7, t * 0.03))) - 0.5;
  vec2 s = uv + flow * 0.016 * sky * hold;
  vec3 col = texture2D(uImg, s).rgb;

  // A second, slower cloud layer drifting across.
  float cl = fbm(vec2(uv.x * 2.6 - t * 0.025, uv.y * 4.5 + t * 0.004));
  col = mix(col, vec3(0.2, 0.28, 0.28), smoothstep(0.5, 0.86, cl) * sky * hold * 0.38);

  // Ground mist rolling past the body.
  float gb = smoothstep(0.68, 0.8, uv.y) * (1.0 - smoothstep(0.93, 1.0, uv.y));
  float gm = fbm(vec2(uv.x * 3.0 + t * 0.03, uv.y * 7.0 - t * 0.01));
  col = mix(col, vec3(0.6, 0.68, 0.64), gb * smoothstep(0.5, 0.9, gm) * 0.3);

  // The ring breathes on a 4.5 s cycle and wakes as the blade is drawn.
  float breath = 0.5 + 0.5 * sin(t * 1.396);
  float band = exp(-pow((d - rr) / 0.035, 2.0));
  float inner = exp(-d * d / (rr * rr) * 1.6);
  float lit = 0.2 + 0.8 * uDraw;
  col += vec3(1.0, 0.78, 0.42) * (band * 0.32 + inner * 0.16) * lit * (0.65 + 0.35 * breath);

  // Light climbs from the hilt into the ring's spine.
  vec2 P0 = vec2(0.4636 * uAspect, 0.75);
  vec2 P1 = vec2(0.4397 * uAspect, 0.615);
  vec2 P2 = vec2(0.4397 * uAspect, -0.05);
  float L1 = length(P1 - P0), L2 = length(P2 - P1);
  float h1, h2;
  float d1 = seg(p, P0, P1, h1);
  float d2 = seg(p, P1, P2, h2);
  float along = d1 < d2 ? h1 * L1 : L1 + h2 * L2;
  float bd = min(d1, d2);
  float reach = uDraw * (L1 + L2);
  float shown = 1.0 - smoothstep(reach - 0.03, reach, along);
  float flick = 0.8 + 0.2 * noise(vec2(along * 40.0, t * 9.0));
  float core = exp(-pow(bd / 0.0028, 2.0));
  float glow = exp(-pow(bd / 0.016, 2.0));
  col += vec3(1.0, 0.9, 0.66) * (core * 1.3 + glow * 0.35) * shown * flick * step(0.001, uDraw);

  // The hilt answers the hand.
  float hilt = exp(-dot(p - P0, p - P0) / 0.0009);
  col += vec3(1.0, 0.82, 0.5) * hilt * (0.25 * breath + 0.9 * uDraw);

  return col * (1.0 + 0.28 * uDraw);
}

vec3 road(vec2 uv, float t) {
  vec2 s = uv;

  // The veils hanging in the sky move like cloth.
  float sky = 1.0 - smoothstep(0.04, 0.26, uv.y);
  vec2 flow = vec2(fbm(uv * vec2(3.0, 4.0) + vec2(t * 0.05, t * 0.02)),
                   fbm(uv * vec2(3.0, 4.0) + vec2(4.1, -t * 0.04))) - 0.5;
  s += flow * 0.007 * sky;

  // Grass: the foreground band, reaching higher at the edges of the frame.
  float grass = smoothstep(0.58, 0.8, uv.y);
  grass = max(grass, smoothstep(0.5, 0.72, uv.y) * (1.0 - smoothstep(0.1, 0.3, uv.x)));
  grass = max(grass, smoothstep(0.56, 0.74, uv.y) * smoothstep(0.62, 0.82, uv.x));
  // ...but never the wanderer.
  vec2 c = (uv - vec2(0.455, 0.77)) / vec2(0.068, 0.26);
  grass *= smoothstep(0.85, 1.3, length(c));

  // Gusts roll left to right; each blade answers a little late.
  float gust = 0.5 + 0.5 * sin(uv.x * 4.0 - t * 0.9 + fbm(uv * 3.0 + t * 0.1) * 3.0);
  float n = fbm(vec2(uv.x * 14.0 - t * 1.1, uv.y * 3.0)) - 0.5;
  float sway = (n + 0.25 * sin(t * 1.7 + uv.x * 22.0)) * (0.35 + 0.65 * gust);
  float tip = 1.0 - smoothstep(0.75, 1.0, uv.y) * 0.5;
  s.x += sway * 0.014 * grass * tip;
  s.y += abs(sway) * 0.002 * grass;

  vec3 col = texture2D(uImg, s).rgb;

  // Mist drifting over the plain.
  float band = smoothstep(0.38, 0.5, uv.y) * (1.0 - smoothstep(0.6, 0.8, uv.y));
  float m = fbm(vec2(uv.x * 2.2 - t * 0.018, uv.y * 6.0) + fbm(uv * 3.0 + t * 0.01));
  col = mix(col, vec3(0.86, 0.84, 0.76), band * smoothstep(0.45, 0.85, m) * 0.35);

  // The tree's light.
  float g = exp(-length((uv - vec2(0.47, 0.02)) * vec2(uAspect, 1.0)) * 3.2);
  col += vec3(1.0, 0.78, 0.4) * g * (0.14 + 0.07 * sin(t * 1.05));
  return col;
}

void main() {
  float t = uTime;
  vec3 col;
  if (uScene < 0.5) col = gate(vUv, t);
  else if (uScene < 1.5) col = road(vUv, t);
  else col = texture2D(uImg, vUv).rgb;
  gl_FragColor = vec4(col, 1.0);
}`;

const SCENE_ID: Record<Scene, number> = { gate: 0, road: 1, still: 2 };
const MAX_BACKING = 1680;

type Rect = { left: number; top: number; width: number; height: number };

function cover(w: number, h: number, aspect: number, [fx, fy]: [number, number]): Rect {
  if (w / h > aspect) {
    const height = w / aspect;
    const top = Math.min(0, Math.max(h - height, h / 2 - fy * height));
    return { left: 0, top, width: w, height };
  }
  const width = h * aspect;
  const left = Math.min(0, Math.max(w - width, w / 2 - fx * width));
  return { left, top: 0, width, height: h };
}

export default function LivingImage({
  src,
  aspect,
  scene,
  focus,
  live,
  stageClassName,
  stageStyle,
  children,
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const fx = focus[0];
  const fy = focus[1];

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => setRect(cover(el.clientWidth, el.clientHeight, aspect, [fx, fy]));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect, fx, fy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uDraw = gl.getUniformLocation(prog, "uDraw");
    gl.uniform1f(gl.getUniformLocation(prog, "uScene"), SCENE_ID[scene]);
    gl.uniform1f(gl.getUniformLocation(prog, "uAspect"), aspect);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let alive = true;
    let lastDraw = -1;
    let frame: ((now: number) => void) | null = null;

    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      if (!alive) return;
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);

      frame = (now: number) => {
        if (!alive) return;
        const w = Math.min(MAX_BACKING, Math.round(canvas.clientWidth * Math.min(window.devicePixelRatio, 1.5)));
        const h = Math.round((w * canvas.clientHeight) / Math.max(1, canvas.clientWidth));
        if (w > 0 && h > 0 && (canvas.width !== w || canvas.height !== h)) {
          canvas.width = w;
          canvas.height = h;
          gl.viewport(0, 0, w, h);
          lastDraw = -1;
        }
        const draw = live?.current?.draw ?? 0;
        if (!reduce || draw !== lastDraw) {
          gl.uniform1f(uTime, reduce ? 12 : (now / 1000) % 1800);
          gl.uniform1f(uDraw, draw);
          gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
          lastDraw = draw;
        }
        if (frame) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame((now) => {
        frame?.(now);
        setReady(true);
      });
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && alive && frame) {
        lastDraw = -1;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [src, scene, aspect, live]);

  return (
    <div ref={frameRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        className={stageClassName}
        style={{
          position: "absolute",
          left: rect?.left ?? 0,
          top: rect?.top ?? 0,
          width: rect?.width ?? "100%",
          height: rect?.height ?? "100%",
          ...stageStyle,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: ready ? 1 : 0,
            transition: "opacity 600ms ease",
          }}
        />
        {children}
      </div>
    </div>
  );
}
