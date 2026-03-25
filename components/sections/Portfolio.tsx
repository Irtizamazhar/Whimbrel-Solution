"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import CountUp from "react-countup";
import {
  ClipboardList,
  Shirt,
  ShoppingCart,
  ShoppingBag,
  Tag,
  MessageSquare,
  BookOpen,
  House,
} from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { portfolioProjects, stats } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/animations";
import Button from "@/components/ui/Button";

const iconMap = {
  ClipboardList,
  Shirt,
  ShoppingCart,
  ShoppingBag,
  Tag,
  MessageSquare,
  BookOpen,
  House,
} as const;

function PortfolioCounter({
  value,
  suffix,
  decimals = 0,
}: {
  value: number;
  suffix: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
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

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-spacing is-compact">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-5 space-y-4 sm:mb-12 sm:space-y-5"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Portfolio" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-none whitespace-nowrap font-cormorant text-[clamp(1.5rem,3.5vw,2.8rem)] leading-[1.02] text-text"
          >
            Work That Speaks Louder Than Words.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {portfolioProjects.map((project) => {
            const projectWithBadge = project as typeof project & { badge?: string; iconLucide?: keyof typeof iconMap };
            const pillLabel = projectWithBadge.badge ?? project.category;
            const IconComponent = projectWithBadge.iconLucide ? iconMap[projectWithBadge.iconLucide] : null;
            return (
            <motion.div
              key={project.slug}
              variants={fadeUp}
              className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-navy-4 bg-navy-2 p-4 sm:min-h-[260px] sm:p-6"
              data-cursor="view"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                aria-label={`Open ${project.name} case study`}
                className="absolute inset-0 z-10"
              />
              <span className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
                {IconComponent && <IconComponent className="h-24 w-24" strokeWidth={1.5} />}
              </span>
              <span className="relative inline-flex rounded-full border border-teal/30 bg-teal-glow px-3 py-1 text-xs uppercase tracking-[0.16em] text-teal">
                {pillLabel}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-4 transition duration-300 group-hover:translate-y-0 sm:p-6">
                <h3 className="font-cormorant text-lg text-text sm:text-xl">{project.name}</h3>
                <p className="text-sm uppercase tracking-[0.14em] text-teal">{project.category}</p>
                <p className="mt-2 max-w-[95%] text-sm text-text-muted line-clamp-4">{project.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                  VIEW CASE STUDY →
                </p>
              </div>
              <span className="absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-teal/60 group-hover:shadow-[0_0_30px_rgba(59,191,176,0.2)]" />
            </motion.div>
          );
          })}
        </motion.div>

        {/* Project Statistics — below projects, light/dark aware */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: "-80px" }}
          className="portfolio-stats-section mt-16 rounded-2xl border border-navy-4 bg-navy-2/80 px-6 py-10 text-center [data-theme='light']:border-[rgba(0,0,0,0.08)] [data-theme='light']:bg-[rgba(0,0,0,0.03)] sm:mt-20 sm:px-10 sm:py-14"
        >
          <h3 className="font-cormorant text-[clamp(1.875rem,4.5vw,2.625rem)] font-bold leading-tight text-text [data-theme='light']:text-[#111]">
            Project{" "}
            <span className="bg-gradient-to-r from-teal to-teal-light bg-clip-text text-transparent [data-theme='light']:from-[#0d9488] [data-theme='light']:to-[#0f766e]">
              Statistics
            </span>
          </h3>
          <p className="mt-3 text-sm text-text-muted [data-theme='light']:text-[rgba(0,0,0,0.65)] sm:text-base">
            Numbers that showcase our commitment to excellence
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="portfolio-stat-item">
                <p className="font-cormorant text-[clamp(2.25rem,4vw,3.25rem)] font-bold leading-none text-teal [data-theme='light']:text-[#0d9488]">
                  <PortfolioCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    decimals={stat.suffix === "%" ? 0 : 0}
                  />
                </p>
                <p className="mt-2 text-sm font-medium text-text line-clamp-4 [data-theme='light']:text-[#111] sm:text-base">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA — Ready to Start Your Project */}
          <div className="mt-20 border-t border-navy-4 pt-14 [data-theme='light']:border-[rgba(0,0,0,0.08)] sm:mt-24 sm:pt-16">
            <h4 className="font-cormorant text-[clamp(1.625rem,3.5vw,2.225rem)] font-bold text-text [data-theme='light']:text-[#111]">
              Ready to Start Your Project?
            </h4>
            <p className="mx-auto mt-3 max-w-xl text-sm text-text-muted [data-theme='light']:text-[rgba(0,0,0,0.65)] sm:text-base">
              Let&apos;s discuss how we can help you achieve similar success with your digital transformation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button href="/contact">Start Your Project</Button>
              <Button href="/services" variant="outline">
                View Our Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
