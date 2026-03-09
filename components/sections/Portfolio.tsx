"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionTag from "@/components/ui/SectionTag";
import { portfolioProjects } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/animations";

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 space-y-5"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Portfolio" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl font-cormorant text-[clamp(2.4rem,6vw,3.65rem)] leading-[1.02] text-text"
          >
            Selected products crafted for performance and scale.
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={stagger}
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {portfolioProjects.map((project) => (
            <motion.div
              key={project.name}
              variants={fadeUp}
              className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-navy-4 bg-navy-2 p-6"
              data-cursor="view"
            >
              <Link
                href={`/portfolio/${project.slug}`}
                aria-label={`Open ${project.name} case study`}
                className="absolute inset-0 z-10"
              />
              <span className="absolute inset-0 flex items-center justify-center text-8xl opacity-[0.08]">
                {project.icon}
              </span>
              <span className="relative inline-flex rounded-full border border-teal/30 bg-teal-glow px-3 py-1 text-xs uppercase tracking-[0.16em] text-teal">
                {project.category}
              </span>
              <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-0 left-0 right-0 translate-y-3 p-6 transition duration-300 group-hover:translate-y-0">
                <h3 className="font-cormorant text-3xl text-text">{project.name}</h3>
                <p className="text-sm uppercase tracking-[0.14em] text-teal">{project.category}</p>
                <p className="mt-2 max-w-[95%] text-sm text-text-muted">{project.summary}</p>
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.16em] text-teal">
                  View case study →
                </p>
              </div>
              <span className="absolute inset-0 rounded-2xl border border-transparent transition group-hover:border-teal/60 group-hover:shadow-[0_0_30px_rgba(59,191,176,0.2)]" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
