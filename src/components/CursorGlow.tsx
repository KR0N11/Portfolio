"use client";

import { useEffect, useRef } from "react";

/**
 * Full-screen water-ripple effect driven by cursor movement.
 *
 * Uses a 2-D wave-equation simulation at reduced resolution,
 * rendered as a translucent overlay so page content shows through.
 */

const SCALE = 5; // pixels per simulation cell (lower = sharper, heavier)
const DAMPING = 0.965;

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1, y: -1 });
  const prev = useRef({ x: -1, y: -1 });

  useEffect(() => {
    /* skip on touch-only devices */
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

    /* ---- state ---- */
    let cols = 0,
      rows = 0;
    let cur: Float32Array = new Float32Array(0);
    let prv: Float32Array = new Float32Array(0);
    let buf: HTMLCanvasElement; // off-screen buffer at sim resolution
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

    /* add a circular disturbance into the current buffer */
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

    /* ---- loop ---- */
    let raf = 0;

    const loop = () => {
      /* mouse disturbance — proportional to movement speed */
      if (mouse.current.x > 0 && prev.current.x > 0) {
        const dx = mouse.current.x - prev.current.x;
        const dy = mouse.current.y - prev.current.y;
        const speed = Math.sqrt(dx * dx + dy * dy);
        if (speed > 1) {
          disturb(
            mouse.current.x,
            mouse.current.y,
            16 + Math.min(speed * 0.5, 22),
            Math.min(speed * 5, 500)
          );
        }
      }

      /* wave equation step: swap buffers, then propagate */
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

      /* render heightmap to RGBA pixels */
      const d = img.data;
      for (let i = 0; i < cols * rows; i++) {
        const v = cur[i];
        const a = Math.min(Math.abs(v) / 35, 1);
        const p = i * 4;

        if (v > 0) {
          /* crest — bright sky-blue highlight */
          d[p] = 80 + Math.floor(a * 120); // R
          d[p + 1] = 200 + Math.floor(a * 55); // G
          d[p + 2] = 255; // B
          d[p + 3] = Math.floor(a * 150); // A
        } else {
          /* trough — deep blue shadow */
          d[p] = 10 + Math.floor(a * 30); // R
          d[p + 1] = 60 + Math.floor(a * 100); // G
          d[p + 2] = 180 + Math.floor(a * 75); // B
          d[p + 3] = Math.floor(a * 120); // A
        }
      }

      /* draw at sim resolution, then scale up with smoothing */
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
      style={{ zIndex: 9999 }}
      aria-hidden="true"
    />
  );
}
