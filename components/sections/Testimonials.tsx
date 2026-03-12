"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote } from "lucide-react";
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
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        <div className="mb-8 space-y-5 sm:mb-10">
          <SectionTag label="Testimonials" />
          <h2 className="max-w-3xl font-cormorant text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.02] text-text">
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
              "testimonial-slider-card relative mx-auto w-[min(780px,92vw)] max-w-full rounded-2xl px-5 py-5 text-center shadow-[0_8px_40px_rgba(0,0,0,0.3)] sm:rounded-[24px] sm:px-8 sm:py-10 md:px-14 md:py-11",
              "border border-[rgba(45,212,191,0.15)] bg-[rgba(255,255,255,0.04)]",
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
                  className="mx-auto mb-4 h-10 w-10 text-[rgba(45,212,191,0.25)] sm:h-12 sm:w-12 [data-theme='light']:text-[rgba(13,148,136,0.3)]"
                  strokeWidth={1.2}
                  aria-hidden
                />
                {/* Stars */}
                <div className="mb-4 flex justify-center text-lg leading-none text-[#f59e0b] sm:mb-5 sm:text-[20px]">
                  {"★".repeat(item.stars)}
                </div>
                {/* Review text */}
                <p
                  className={cn(
                    "testimonial-quote-text mx-auto mb-5 max-w-[580px] text-[15px] italic leading-[1.75] sm:mb-6 sm:text-[clamp(1.05rem,1.8vw,1.25rem)] line-clamp-4",
                    "text-[rgba(255,255,255,0.88)] [data-theme='light']:text-[rgba(0,0,0,0.85)]",
                  )}
                >
                  &ldquo;{item.quote}&rdquo;
                </p>
                {/* Avatar + name + role/company */}
                <div className="flex flex-col items-center">
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
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators — 8px */}
          <div className="mt-6 flex items-center justify-center gap-2 sm:mt-8">
            {testimonials.map((_, dotIndex) => (
              <button
                key={dotIndex}
                onClick={() => setIndex(dotIndex)}
                aria-label={`Go to testimonial ${dotIndex + 1}`}
                className={cn(
                  "h-2 w-2 min-h-[8px] min-w-[8px] rounded-full transition-all",
                  dotIndex === index
                    ? "w-5 sm:w-7 bg-[#2dd4bf] shadow-[0_0_16px_rgba(45,212,191,0.4)] [data-theme='light']:bg-[#0d9488]"
                    : "bg-[rgba(255,255,255,0.2)] [data-theme='light']:bg-[rgba(0,0,0,0.15)]",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
