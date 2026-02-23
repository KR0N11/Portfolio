"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen water-ripple effect driven by cursor movement.
 * Renders white/gray ripples with mix-blend-mode so they
 * visually interact with (distort) page content underneath.
 */

const SCALE = 5;
const DAMPING = 0.96;

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const prev = useRef({ x: -1, y: -1 });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "ontouchstart" in window &&
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let cols = 0,
      rows = 0;
    let cur: Float32Array = new Float32Array(0);
    let prv: Float32Array = new Float32Array(0);
    let buf: HTMLCanvasElement;
    let bCtx: CanvasRenderingContext2D | null = null;
    let img: ImageData;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / SCALE);
      rows = Math.ceil(canvas.height / SCALE);
      cur = new Float32Array(cols * rows);
      prv = new Float32Array(cols * rows);
      buf = document.createElement("canvas");
      buf.width = cols;
      buf.height = rows;
      bCtx = buf.getContext("2d");
      img = new ImageData(cols, rows);
    };
    init();
    window.addEventListener("resize", init);

    const onMove = (e: MouseEvent) => {
      prev.current.x = mouse.current.x;
      prev.current.y = mouse.current.y;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const disturb = (
      cx: number,
      cy: number,
      radius: number,
      strength: number
    ) => {
      const r = Math.ceil(radius / SCALE);
      const sx = Math.floor(cx / SCALE);
      const sy = Math.floor(cy / SCALE);
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const x = sx + dx;
          const y = sy + dy;
          if (x > 0 && x < cols - 1 && y > 0 && y < rows - 1) {
            const d = Math.sqrt(dx * dx + dy * dy) / r;
            if (d < 1) {
              cur[y * cols + x] += strength * (1 - d * d);
            }
          }
        }
      }
    };

    let raf = 0;

    const loop = () => {
      if (mouse.current.x > 0 && prev.current.x > 0) {
        const dx = mouse.current.x - prev.current.x;
        const dy = mouse.current.y - prev.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 1) {
          disturb(
            mouse.current.x,
            mouse.current.y,
            12 + Math.min(speed * 0.3, 16),
            Math.min(speed * 2.5, 250)
          );
        }
      }

      const tmp = prv;
      prv = cur;
      cur = tmp;

      for (let y = 1; y < rows - 1; y++) {
        for (let x = 1; x < cols - 1; x++) {
          const i = y * cols + x;
          cur[i] =
            ((prv[i - 1] + prv[i + 1] + prv[i - cols] + prv[i + cols]) * 0.5 -
              cur[i]) *
            DAMPING;
        }
      }

      /* render heightmap — white crests, dark gray troughs */
      const d = img.data;
      for (let i = 0; i < cols * rows; i++) {
        const v = cur[i];
        const a = Math.min(Math.abs(v) / 50, 1);
        const p = i * 4;

        if (v > 0) {
          /* crest — white highlight */
          const brightness = 180 + Math.floor(a * 75);
          d[p] = brightness;
          d[p + 1] = brightness;
          d[p + 2] = brightness;
          d[p + 3] = Math.floor(a * 100);
        } else {
          /* trough — dark gray */
          const darkness = 40 + Math.floor(a * 30);
          d[p] = darkness;
          d[p + 1] = darkness;
          d[p + 2] = darkness;
          d[p + 3] = Math.floor(a * 80);
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (bCtx) {
        bCtx.putImageData(img, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(buf, 0, 0, canvas.width, canvas.height);
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 50, mixBlendMode: "soft-light" }}
      aria-hidden="true"
    />
  );
}
