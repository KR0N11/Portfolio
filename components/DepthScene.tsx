"use client";

/*
  A still frame you can look into. The picture is paired with a depth map
  (Depth Anything V2, computed offline), and a fragment shader shifts every
  pixel by how near it is as the pointer moves, so the grass slides past the
  Tarnished and the sky stays far away. On top of that: wind in the near grass,
  a slow breath in the Site of Grace, drifting cloud.

  Children are laid out on a stage that covers the viewport in image space.
  Give a child `--d` (its depth, 0 far .. 1 near) and translate it by
  calc(var(--px) * (var(--d) - var(--focus))) to make it ride the same parallax.
*/

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  src: string;
  depth: string;
  aspect: number;
  focus: [number, number];
  /** Site of Grace position in image space: x, top of the beam, bottom of the beam */
  grace: [number, number, number];
  children?: ReactNode;
};

const FOCUS_DEPTH = 0.35;
const STRENGTH: [number, number] = [0.022, 0.014];

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
uniform sampler2D uDepth;
uniform vec2 uRes;
uniform vec2 uView;
uniform vec4 uRect;
uniform vec2 uOff;
uniform float uTime;
uniform vec3 uGrace;
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
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = p * 2.03 + 7.1; a *= 0.5; }
  return v;
}

void main() {
  vec2 css = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y) / uRes * uView;
  vec2 uv = (css - uRect.xy) / uRect.zw;
  // Pull in a little so shifted edges never show.
  uv = 0.5 + (uv - 0.5) * 0.955;
  float t = uTime;

  // Find the source pixel whose depth-shifted position lands here.
  vec2 p = uv;
  for (int i = 0; i < 5; i++) {
    float d = texture2D(uDepth, p).r;
    p = uv - uOff * (d - ${FOCUS_DEPTH.toFixed(2)});
  }
  float d = texture2D(uDepth, p).r;

  // Wind through the near grass, rolling left to right in gusts.
  float near = smoothstep(0.55, 0.85, d) * smoothstep(0.45, 0.7, uv.y);
  float gust = 0.5 + 0.5 * sin(uv.x * 3.0 - t * 0.8 + fbm(uv * 2.0 + t * 0.1) * 3.0);
  float sway = (fbm(vec2(uv.x * 18.0 - t * 1.1, uv.y * 3.0)) - 0.5) * (0.35 + 0.65 * gust);
  p.x += sway * 0.006 * near;

  // Cloud drifts slowly where the sky is.
  float sky = (1.0 - smoothstep(0.08, 0.16, d)) * (1.0 - smoothstep(0.3, 0.5, uv.y));
  vec2 flow = vec2(fbm(uv * vec2(3.0, 5.0) + vec2(t * 0.02, 0.0)), fbm(uv * 4.0 + vec2(3.1, t * 0.015))) - 0.5;
  p += flow * 0.01 * sky;

  vec3 col = texture2D(uImg, p).rgb;

  // The grace breathes: its beam and orb swell and settle.
  float breath = 0.55 + 0.45 * sin(t * 1.3) * (0.7 + 0.3 * noise(vec2(t * 2.0, 0.0)));
  vec2 g = vec2((p.x - uGrace.x) * uAspect, 0.0);
  float beam = exp(-pow(g.x / 0.012, 2.0)) * smoothstep(uGrace.y - 0.02, uGrace.y + 0.03, p.y) * (1.0 - smoothstep(uGrace.z - 0.04, uGrace.z, p.y));
  vec2 orb = vec2((p.x - uGrace.x) * uAspect, p.y - uGrace.y);
  float halo = exp(-dot(orb, orb) / 0.004);
  col += vec3(1.0, 0.72, 0.38) * (beam * 0.22 + halo * 0.2) * breath;

  gl_FragColor = vec4(col, 1.0);
}`;

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

function load(src: string) {
  return new Promise<HTMLImageElement>((res, rej) => {
    const i = new Image();
    i.decoding = "async";
    i.onload = () => res(i);
    i.onerror = rej;
    i.src = src;
  });
}

export default function DepthScene({ src, depth, aspect, focus, grace, children }: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rectRef = useRef<Rect | null>(null);
  const [rect, setRect] = useState<Rect | null>(null);
  const [ready, setReady] = useState(false);
  const fx = focus[0];
  const fy = focus[1];
  const [gx, gy0, gy1] = grace;

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const measure = () => {
      const r = cover(el.clientWidth, el.clientHeight, aspect, [fx, fy]);
      rectRef.current = r;
      setRect(r);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [aspect, fx, fy]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    if (!canvas || !frame) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return;
    const sh = (type: number, code: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, code);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.warn(gl.getShaderInfoLog(s));
      return s;
    };
    const vs = sh(gl.VERTEX_SHADER, VERT);
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
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
    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u("uRes");
    const uView = u("uView");
    const uRect = u("uRect");
    const uOff = u("uOff");
    const uTime = u("uTime");
    gl.uniform1i(u("uImg"), 0);
    gl.uniform1i(u("uDepth"), 1);
    gl.uniform3f(u("uGrace"), gx, gy0, gy1);
    gl.uniform1f(u("uAspect"), aspect);

    const textures: WebGLTexture[] = [];
    const upload = (unit: number, img: HTMLImageElement) => {
      const tex = gl.createTexture()!;
      textures.push(tex);
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    };

    // Pointer (or, with no pointer, a slow idle drift) steers the camera.
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    let lastMove = -1e9;
    const onMove = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1;
      target.y = (e.clientY / window.innerHeight) * 2 - 1;
      lastMove = performance.now();
    };
    const onTilt = (e: DeviceOrientationEvent) => {
      if (e.gamma == null || e.beta == null) return;
      target.x = Math.max(-1, Math.min(1, e.gamma / 25));
      target.y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      lastMove = performance.now();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("deviceorientation", onTilt);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let alive = true;
    let draw: ((now: number) => void) | null = null;

    Promise.all([load(src), load(depth)])
      .then(([img, dep]) => {
        if (!alive) return;
        if (img.naturalWidth > gl.getParameter(gl.MAX_TEXTURE_SIZE)) return;
        upload(0, img);
        upload(1, dep);
        let last = performance.now();
        draw = (now: number) => {
          if (!alive) return;
          const dt = Math.min(0.05, (now - last) / 1000);
          last = now;
          if (reduce) {
            // Reduced motion: hold the scene still, no drift or parallax.
            target.x = 0;
            target.y = 0;
          } else if (now - lastMove > 2500) {
            target.x = Math.sin(now / 5200) * 0.35;
            target.y = Math.sin(now / 7300) * 0.2;
          }
          const k = reduce ? 1 : Math.min(1, dt * 3);
          cur.x += (target.x - cur.x) * k;
          cur.y += (target.y - cur.y) * k;
          const ox = -cur.x * STRENGTH[0];
          const oy = -cur.y * STRENGTH[1];

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
          if (r) {
            gl.uniform2f(uRes, w, h);
            gl.uniform2f(uView, vw, vh);
            gl.uniform4f(uRect, r.left, r.top, r.width, r.height);
            gl.uniform2f(uOff, ox, oy);
            gl.uniform1f(uTime, reduce ? 10 : (now / 1000) % 1800);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            const st = stageRef.current;
            if (st) {
              // inside the scaled stage, this lands exactly on the shader's shift
              st.style.setProperty("--px", `${ox * r.width}px`);
              st.style.setProperty("--py", `${oy * r.height}px`);
            }
          }
          // Reduced motion draws once, then only again on resize.
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
    const onResize = () => {
      if (reduce && alive && draw) raf = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", onResize);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("deviceorientation", onTilt);
      document.removeEventListener("visibilitychange", onVis);
      textures.forEach((t) => gl.deleteTexture(t));
      gl.deleteBuffer(buf);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [src, depth, aspect, gx, gy0, gy1]);

  // The stage maps image space onto the (slightly zoomed) rendered frame.
  const stage: React.CSSProperties = rect
    ? {
        position: "absolute",
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
        // matches the shader's 0.955 pull-in, so image-space children line up
        transform: "scale(1.0471)",
        transformOrigin: "50% 50%",
      }
    : { position: "absolute", inset: 0 };

  return (
    <div ref={frameRef} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {rect && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt=""
          style={{ ...stage, objectFit: "cover", opacity: ready ? 0 : 1, transition: "opacity 600ms" }}
        />
      )}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: ready ? 1 : 0, transition: "opacity 600ms" }}
      />
      <div ref={stageRef} style={{ ...stage, ["--focus" as string]: FOCUS_DEPTH }}>
        {children}
      </div>
    </div>
  );
}
