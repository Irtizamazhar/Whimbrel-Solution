"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SectionTag from "@/components/ui/SectionTag";
import { testimonials } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused]);

  const visibleTestimonials = Array.from({ length: visibleCount }, (_, offset) => {
    const itemIndex = (index + offset) % testimonials.length;
    return testimonials[itemIndex];
  });

  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <div className="mb-10 space-y-5">
          <SectionTag label="Testimonials" />
          <h2 className="max-w-3xl font-cormorant text-[clamp(2.4rem,6vw,3.65rem)] leading-[1.02] text-text">
            Trusted by teams building category-defining products.
          </h2>
        </div>

        <div
          className="overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <motion.div
            key={index}
            initial={{ opacity: 0.75, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "grid gap-5",
              visibleCount === 1
                ? "grid-cols-1"
                : visibleCount === 2
                  ? "grid-cols-2"
                  : "grid-cols-3",
            )}
          >
            {visibleTestimonials.map((item, i) => (
              <article
                key={`${item.name}-${i}`}
                className="min-h-[240px] w-full rounded-2xl border border-navy-4 bg-navy-2/80 p-6 transition duration-300 hover:border-teal/60 hover:shadow-[0_0_28px_rgba(59,191,176,0.14)]"
                data-cursor="view"
              >
                <p className="text-lg leading-relaxed text-text">“{item.quote}”</p>
                <p className="mt-6 text-sm uppercase tracking-[0.18em] text-teal">
                  {"★".repeat(item.stars)}
                </p>
                <p className="mt-4 font-semibold text-text">{item.name}</p>
                <p className="text-sm text-text-muted">{item.company}</p>
              </article>
            ))}
          </motion.div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          {testimonials.map((_, dotIndex) => (
            <button
              key={dotIndex}
              className={`h-2 rounded-full transition ${
                dotIndex === index % testimonials.length
                  ? "w-7 bg-teal"
                  : "w-2 bg-navy-4"
              }`}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to testimonial ${dotIndex + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
