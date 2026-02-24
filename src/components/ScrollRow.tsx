"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function ScrollRow({ title, subtitle, children }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  }, []);

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    // Check after children render
    const timer = setTimeout(checkScroll, 100);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [checkScroll, children]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div
      className="relative py-4 md:py-6"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Row Header */}
      <div className="px-[4%] mb-2 md:mb-3">
        <h2 className="text-base md:text-xl font-bold text-white">
          {title}
        </h2>
        {subtitle && (
          <p className="text-[#999] text-xs mt-0.5">{subtitle}</p>
        )}
      </div>

      <div className="relative">
        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-0 bottom-0 z-20 w-10 md:w-14 flex items-center justify-center bg-gradient-to-r from-[#141414]/90 to-transparent transition-opacity duration-200 cursor-pointer ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll left"
          >
            <ChevronLeft className="text-white" size={32} />
          </button>
        )}

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-1.5 md:gap-2 overflow-x-auto scrollbar-hide px-[4%] scroll-smooth"
        >
          {children}
        </div>

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-0 bottom-0 z-20 w-10 md:w-14 flex items-center justify-center bg-gradient-to-l from-[#141414]/90 to-transparent transition-opacity duration-200 cursor-pointer ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label="Scroll right"
          >
            <ChevronRight className="text-white" size={32} />
          </button>
        )}
      </div>
    </div>
  );
}
