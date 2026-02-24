"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { skillCategories } from "@/data/portfolio";

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

function fibSphere(count: number, index: number) {
  const phi = Math.acos(1 - (2 * (index + 0.5)) / count);
  const theta = Math.PI * (1 + Math.sqrt(5)) * index;
  return {
    x: Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

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
      ctx.strokeStyle = "rgba(255,255,255,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();

      /* latitude lines */
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = cy - r * Math.sin(latRad);
        const lr = r * Math.cos(latRad);
        ctx.strokeStyle = "rgba(255,255,255,0.03)";
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.ellipse(cx, y, lr, lr * 0.25, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      /* longitude lines */
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI + rot;
        const lw = r * Math.sin(angle);
        const alpha = Math.abs(Math.sin(angle)) * 0.06 + 0.02;
        ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
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
            ? `${item.color}18`
            : "rgba(255,255,255,0.03)",
          border: `1px solid ${highlighted ? `${item.color}40` : "rgba(255,255,255,0.06)"}`,
          boxShadow: highlighted
            ? `0 0 12px ${item.color}22`
            : "none",
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
          color: highlighted ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)",
        }}
      >
        {item.name}
      </span>
    </div>
  );
}

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
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        <button
          onClick={() => setActiveCategory(null)}
          className="px-3 py-1.5 text-xs rounded-full border transition-all duration-300 cursor-pointer"
          style={{
            borderColor: !activeCategory
              ? "rgba(255,255,255,0.3)"
              : "rgba(255,255,255,0.06)",
            background: !activeCategory
              ? "rgba(255,255,255,0.1)"
              : "transparent",
            color: !activeCategory ? "#fff" : "rgba(255,255,255,0.3)",
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
                activeCategory === cat.name ? `${cat.color}60` : "rgba(255,255,255,0.06)",
              background:
                activeCategory === cat.name ? `${cat.color}20` : "transparent",
              color:
                activeCategory === cat.name
                  ? cat.color
                  : "rgba(255,255,255,0.3)",
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

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
            ? Math.min(1, (pos.z + 0.6) * 1.2) * (highlighted ? 1 : 0.2)
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
