"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { testimonials } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused]);

  const go = (dir: -1 | 1) => {
    setIndex((current) => (current + dir + testimonials.length) % testimonials.length);
  };

  const item = testimonials[index];
  const initial = item.name.trim().charAt(0).toUpperCase();
  const role = "role" in item ? (item as { role?: string }).role : null;

  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <div className="mb-10 space-y-5">
          <SectionTag label="Testimonials" />
          <h2 className="max-w-3xl font-cormorant text-[clamp(2.4rem,6vw,3.65rem)] leading-[1.02] text-text">
            What Our Clients Say
          </h2>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Slider card container */}
          <div
            className={cn(
              "testimonial-slider-card relative mx-auto w-[min(780px,92vw)] rounded-[24px] px-8 py-10 text-center shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:px-14 sm:py-11",
              "border border-[rgba(45,212,191,0.15)] bg-[rgba(255,255,255,0.04)]",
              "max-sm:px-6 max-sm:py-6",
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative"
              >
                {/* Quote icon */}
                <Quote
                  className="mx-auto mb-4 h-12 w-12 text-[rgba(45,212,191,0.25)] [data-theme='light']:text-[rgba(13,148,136,0.3)]"
                  strokeWidth={1.2}
                  aria-hidden
                />
                {/* Stars */}
                <div className="mb-5 flex justify-center text-[20px] leading-none text-[#f59e0b]">
                  {"★".repeat(item.stars)}
                </div>
                {/* Review text */}
                <p
                  className={cn(
                    "testimonial-quote-text mx-auto mb-6 max-w-[580px] text-[clamp(1.05rem,1.8vw,1.25rem)] italic leading-[1.75] max-sm:mb-5 max-sm:text-[0.95rem]",
                    "text-[rgba(255,255,255,0.88)] [data-theme='light']:text-[rgba(0,0,0,0.85)]",
                  )}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                {/* Avatar + name + role/company */}
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold max-sm:h-10 max-sm:w-10 max-sm:text-base",
                      "border-[rgba(45,212,191,0.4)] bg-gradient-to-br from-[rgba(45,212,191,0.2)] to-[rgba(45,212,191,0.05)] text-[#2dd4bf]",
                      "[data-theme='light']:border-[rgba(13,148,136,0.4)] [data-theme='light']:from-[rgba(13,148,136,0.15)] [data-theme='light']:to-[rgba(13,148,136,0.05)] [data-theme='light']:text-[#0d9488]",
                    )}
                  >
                    {initial}
                  </div>
                  <p className="testimonial-author-name mt-3 text-[15px] font-bold text-white [data-theme='light']:text-[#111111]">
                    {item.name}
                  </p>
                  <p className="testimonial-author-role mt-0.5 text-[12px] text-[#2dd4bf] [data-theme='light']:text-[#0d9488]">
                    {role ? `${role}, ${item.company}` : item.company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons - desktop: absolute outside; mobile: inside */}
            <button
              type="button"
              onClick={() => go(-1)}
              className={cn(
                "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition hover:scale-110 max-sm:left-2 max-sm:h-10 max-sm:w-10 max-sm:translate-x-0 sm:-left-14 sm:-translate-x-full",
                "border-[rgba(45,212,191,0.25)] bg-[rgba(255,255,255,0.05)] text-[rgba(45,212,191,0.8)] hover:border-[rgba(45,212,191,0.5)] hover:bg-[rgba(45,212,191,0.15)]",
                "[data-theme='light']:border-[rgba(0,0,0,0.12)] [data-theme='light']:bg-[rgba(0,0,0,0.04)] [data-theme='light']:text-[#0d9488] [data-theme='light']:hover:bg-[rgba(13,148,136,0.1)]",
              )}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className={cn(
                "absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border transition hover:scale-110 max-sm:right-2 max-sm:h-10 max-sm:w-10 max-sm:translate-x-0 sm:-right-14 sm:translate-x-full",
                "border-[rgba(45,212,191,0.25)] bg-[rgba(255,255,255,0.05)] text-[rgba(45,212,191,0.8)] hover:border-[rgba(45,212,191,0.5)] hover:bg-[rgba(45,212,191,0.15)]",
                "[data-theme='light']:border-[rgba(0,0,0,0.12)] [data-theme='light']:bg-[rgba(0,0,0,0.04)] [data-theme='light']:text-[#0d9488] [data-theme='light']:hover:bg-[rgba(13,148,136,0.1)]",
              )}
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 max-sm:h-5 max-sm:w-5" />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                className={cn(
                  "rounded-full transition-all",
                  dotIndex === index
                    ? "h-2 w-7 bg-[#2dd4bf] shadow-[0_0_16px_rgba(45,212,191,0.4)] [data-theme='light']:bg-[#0d9488]"
                    : "h-2 w-2 bg-[rgba(255,255,255,0.2)] [data-theme='light']:bg-[rgba(0,0,0,0.15)]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
