"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import { stats } from "@/lib/constants";

function Counter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <span ref={ref}>
      {inView ? (
        <CountUp end={value} suffix={suffix} duration={2} decimals={decimals} />
      ) : (
        <>0{suffix}</>
      )}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="border-y border-navy-4/80 bg-navy-2/65">
      <div className="mx-auto grid w-full max-w-[1260px] gap-0 px-5 md:grid-cols-4 md:px-8">
        {stats.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: index * 0.08 }}
            className="group relative border-b border-navy-4/70 px-6 py-9 text-center transition hover:bg-teal-glow md:border-b-0 md:border-r md:last:border-r-0"
            data-cursor="view"
          >
            <p className="font-cormorant text-5xl leading-none text-text">
              <Counter
                value={item.value}
                suffix={item.suffix}
                decimals={item.suffix === "%" ? 0 : 0}
              />
            </p>
            <p className="mt-2 text-sm tracking-wide text-text-muted">{item.label}</p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
