"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { testimonials } from "@/lib/constants";
import { cn } from "@/lib/utils";

const CARD_WIDTH_DESKTOP = 320;
const CARD_GAP = 24;
const AUTO_SCROLL_MS = 2000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const n = testimonials.length;

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((current) => (current + dir + n) % n);
    },
    [n]
  );

  const goTo = useCallback((i: number) => {
    setIndex(i);
  }, []);

  // Measure container width for centering
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const { width } = entries[0]?.contentRect ?? {};
      setContainerWidth(width || 0);
    });
    ro.observe(el);
    setContainerWidth(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  // Auto-scroll cards every 2s; last card → first (infinite loop), pause on hover or when tab hidden
  const intervalRef = useRef<number | null>(null);
  const startAutoScroll = useCallback(() => {
    if (intervalRef.current || n === 0) return;
    intervalRef.current = window.setInterval(() => {
      setIndex((current) => (current + 1) % n); // last card (n-1) → 0 (first)
    }, AUTO_SCROLL_MS);
  }, [n]);
  const stopAutoScroll = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (paused) {
      stopAutoScroll();
      return;
    }
    startAutoScroll();
    return stopAutoScroll;
  }, [paused, startAutoScroll, stopAutoScroll]);

  // Pause auto-scroll when tab is hidden so it doesn't jump on return
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) stopAutoScroll();
      else if (!paused) startAutoScroll();
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [paused, startAutoScroll, stopAutoScroll]);

  // Responsive card width: one card on small screens, fixed on desktop
  const cardWidth =
    containerWidth > 0 && containerWidth < 400
      ? containerWidth - 32
      : CARD_WIDTH_DESKTOP;
  const slotWidth = cardWidth + CARD_GAP;
  // Start: show 3 cards (no centering); after that center active card so 3 cards visible
  const translateX =
    containerWidth > 0
      ? index === 0
        ? 0
        : -index * slotWidth + (containerWidth / 2 - cardWidth / 2)
      : 0;

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const endX = e.changedTouches[0].clientX;
    const delta = touchStartX.current - endX;
    if (Math.abs(delta) > 40) {
      if (delta > 0) go(1);
      else go(-1);
    }
  };

  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        <div className="mb-8 space-y-5 sm:mb-10">
          <SectionTag label="Testimonials" />
          <h2 className="max-w-3xl font-cormorant text-[clamp(1.375rem,3.5vw,2.675rem)] leading-[1.02] text-text">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="relative w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div ref={containerRef} className="w-full overflow-hidden">
            {/* Track: horizontal row of cards */}
            <div
            className="flex items-stretch gap-6 py-4 transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
          >
            {testimonials.map((item, i) => {
              const initial = item.name.trim().charAt(0).toUpperCase();
              const role = "role" in item ? (item as { role?: string }).role : null;
              const isActive = i === index;

              return (
                <div
                  key={i}
                  role="button"
                  tabIndex={0}
                  onClick={() => goTo(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      goTo(i);
                    }
                  }}
                  className={cn(
                    "testimonial-slider-card flex flex-shrink-0 cursor-pointer flex-col rounded-2xl px-5 py-5 text-center transition-all duration-500 ease-out sm:rounded-[24px] sm:px-8 sm:py-10",
                    "border border-[rgba(45,212,191,0.15)] bg-[rgba(255,255,255,0.04)]",
                    isActive
                      ? "z-10 scale-105 shadow-[0_12px_48px_rgba(0,0,0,0.4),0_0_0_1px_rgba(45,212,191,0.2)]"
                      : "scale-90 opacity-60 shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
                  )}
                  style={{ width: cardWidth }}
                  aria-label={`View testimonial by ${item.name}`}
                >
                  <Quote
                    className="mx-auto mb-4 h-10 w-10 text-[rgba(45,212,191,0.25)] sm:h-12 sm:w-12 [data-theme='light']:text-[rgba(13,148,136,0.3)]"
                    strokeWidth={1.2}
                    aria-hidden
                  />
                  <div className="mb-4 flex justify-center text-lg leading-none text-[#f59e0b] sm:mb-5 sm:text-[20px]">
                    {"★".repeat(item.stars)}
                  </div>
                  <p
                    className={cn(
                      "testimonial-quote-text mx-auto mb-5 max-w-[580px] text-[15px] italic leading-[1.75] sm:mb-6 sm:text-[clamp(1.05rem,1.8vw,1.25rem)] line-clamp-4",
                      "text-[rgba(255,255,255,0.88)] [data-theme='light']:text-[rgba(0,0,0,0.85)]",
                    )}
                  >
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-auto flex flex-col items-center">
                    <div
                      className={cn(
                        "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 text-base font-bold sm:h-12 sm:w-12 sm:text-lg",
                        "border-[rgba(45,212,191,0.4)] bg-gradient-to-br from-[rgba(45,212,191,0.2)] to-[rgba(45,212,191,0.05)] text-[#2dd4bf]",
                        "[data-theme='light']:border-[rgba(13,148,136,0.4)] [data-theme='light']:from-[rgba(13,148,136,0.15)] [data-theme='light']:to-[rgba(13,148,136,0.05)] [data-theme='light']:text-[#0d9488]",
                      )}
                    >
                      {initial}
                    </div>
                    <p className="testimonial-author-name mt-3 text-sm font-bold text-white sm:text-[15px] [data-theme='light']:text-[#111111]">
                      {item.name}
                    </p>
                    <p className="testimonial-author-role mt-0.5 text-xs text-[#2dd4bf] [data-theme='light']:text-[#0d9488]">
                      {role ? `${role}, ${item.company}` : item.company}
                    </p>
                  </div>
                </div>
              );
            })}
            </div>
          </div>

          {/* Pagination dots */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                className={cn(
                  "h-2 min-h-[8px] min-w-[8px] rounded-full transition-all",
                  dotIndex === index
                    ? "w-5 bg-[#2dd4bf] shadow-[0_0_16px_rgba(45,212,191,0.4)] sm:w-7 [data-theme='light']:bg-[#0d9488]"
                    : "w-2 bg-[rgba(255,255,255,0.2)] [data-theme='light']:bg-[rgba(0,0,0,0.15)]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
