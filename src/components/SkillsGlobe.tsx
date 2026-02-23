"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { skillCategories } from "@/data/portfolio";

/* ── flatten all skills with category metadata ── */
interface GlobeItem {
  name: string;
  icon: string | null;
  abbr: string;
  category: string;
  color: string;
}

function flatten(): GlobeItem[] {
  const out: GlobeItem[] = [];
  for (const cat of skillCategories) {
    for (const item of cat.items) {
      out.push({ ...item, category: cat.name, color: cat.color });
    }
  }
  return out;
}

/* ── fibonacci sphere for even point distribution ── */
function fibSphere(count: number, index: number) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

/* ── wireframe globe canvas ── */
function useGlobeCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  rotation: React.RefObject<number>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const r = Math.min(w, h) * 0.38;
      const rot = rotation.current;

      ctx.clearRect(0, 0, w, h);

      /* outer circle */
      ctx.strokeStyle = "rgba(56,189,248,0.18)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      /* latitude lines */
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = cy - r * Math.sin(latRad);
        const lr = r * Math.cos(latRad);
        ctx.strokeStyle = "rgba(56,189,248,0.08)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(cx, y, lr, lr * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* longitude lines */
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + rot;
        const lw = r * Math.sin(angle);
        const alpha = Math.abs(Math.sin(angle)) * 0.14 + 0.04;
        ctx.strokeStyle = `rgba(56,189,248,${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(lw), r, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef, rotation]);
}

/* ── icon with CDN image + text fallback ── */
function TechIcon({
  item,
  style,
  highlighted,
}: {
  item: GlobeItem;
  style: React.CSSProperties;
  highlighted: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center gap-1 transition-opacity duration-300"
      style={style}
      title={item.name}
    >
      <div
        className="rounded-xl flex items-center justify-center backdrop-blur-sm transition-all duration-300"
        style={{
          width: 44,
          height: 44,
          background: highlighted
            ? `${item.color}22`
            : "rgba(255,255,255,0.05)",
          border: `1.5px solid ${highlighted ? item.color : "rgba(255,255,255,0.1)"}`,
          boxShadow: highlighted
            ? `0 0 16px ${item.color}44, 0 0 4px ${item.color}22`
            : "none",
          filter: highlighted ? "none" : "brightness(0.8)",
        }}
      >
        {item.icon && !imgError ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.icon}
            alt={item.name}
            width={26}
            height={26}
            loading="lazy"
            onError={() => setImgError(true)}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <span
            className="text-xs font-bold"
            style={{ color: item.color }}
          >
            {item.abbr}
          </span>
        )}
      </div>
      <span
        className="text-[10px] font-medium whitespace-nowrap transition-colors duration-300"
        style={{
          color: highlighted ? "#f1f5f9" : "rgba(148,163,184,0.7)",
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

/* ── main globe component ── */
export default function SkillsGlobe() {
  const items = useMemo(flatten, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotation = useRef(0);
  const dragStart = useRef<{ x: number; rot: number } | null>(null);
  const autoSpeed = useRef(0.003);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; z: number; scale: number }[]
  >([]);

  useGlobeCanvas(canvasRef, rotation);

  /* animation loop: update icon positions */
  useEffect(() => {
    let raf = 0;
    const update = () => {
      if (!dragStart.current) {
        rotation.current += autoSpeed.current;
      }

      const container = containerRef.current;
      if (!container) {
        raf = requestAnimationFrame(update);
        return;
      }

      const rect = container.getBoundingClientRect();
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const radius = Math.min(rect.width, rect.height) * 0.34;
      const perspective = 600;
      const rot = rotation.current;

      const next = items.map((_, i) => {
        const pt = fibSphere(items.length, i);
        /* apply Y rotation */
        const cosR = Math.cos(rot);
        const sinR = Math.sin(rot);
        const rx = pt.x * cosR - pt.z * sinR;
        const rz = pt.x * sinR + pt.z * cosR;
        const ry = pt.y;

        const scale = perspective / (perspective + rz * radius);
        return {
          x: cx + rx * radius * scale,
          y: cy + ry * radius * scale,
          z: rz,
          scale,
        };
      });

      setPositions(next);
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [items]);

  /* drag interaction */
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragStart.current = { x: e.clientX, rot: rotation.current };
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      rotation.current = dragStart.current.rot + dx * 0.005;
    },
    [],
  );

  const onPointerUp = useCallback(() => {
    dragStart.current = null;
  }, []);

  const categories = useMemo(
    () => skillCategories.map((c) => ({ name: c.name, color: c.color })),
    [],
  );

  return (
    <div className="w-full">
      {/* category filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-3 py-1.5 text-xs rounded-full border transition-all duration-300 cursor-pointer"
          style={{
            borderColor: !activeCategory
              ? "var(--color-primary)"
              : "var(--color-border)",
            background: !activeCategory
              ? "var(--color-primary)"
              : "transparent",
            color: !activeCategory ? "#fff" : "var(--color-text-secondary)",
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() =>
              setActiveCategory(activeCategory === cat.name ? null : cat.name)
            }
            className="px-3 py-1.5 text-xs rounded-full border transition-all duration-300 cursor-pointer"
            style={{
              borderColor:
                activeCategory === cat.name ? cat.color : "var(--color-border)",
              background:
                activeCategory === cat.name ? cat.color : "transparent",
              color:
                activeCategory === cat.name
                  ? "#fff"
                  : "var(--color-text-secondary)",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* globe container */}
      <div
        ref={containerRef}
        className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] select-none"
        style={{ cursor: dragStart.current ? "grabbing" : "grab" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          aria-hidden="true"
        />

        {positions.map((pos, i) => {
          const item = items[i];
          const highlighted =
            !activeCategory || item.category === activeCategory;
          const visible = pos.z > -0.6;
          const opacity = visible
            ? Math.min(1, (pos.z + 0.6) * 1.2) * (highlighted ? 1 : 0.25)
            : 0;

          return (
            <TechIcon
              key={item.name}
              item={item}
              highlighted={highlighted}
              style={{
                left: pos.x - 22,
                top: pos.y - 28,
                opacity,
                transform: `scale(${pos.scale * 0.85})`,
                zIndex: Math.round(pos.z * 100) + 100,
                pointerEvents: visible ? "auto" : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
