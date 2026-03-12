"use client";

import { motion } from "framer-motion";
import SectionTag from "@/components/ui/SectionTag";
import { fadeUp, stagger } from "@/lib/animations";

const industries = [
  { name: "FinTech", description: "Financial technology solutions" },
  { name: "Healthcare", description: "Medical and health management systems" },
  { name: "Retail", description: "E-commerce and retail platforms" },
  { name: "Education", description: "EdTech and learning management systems" },
  { name: "Logistics", description: "Supply chain and logistics optimization" },
  { name: "Startups", description: "MVP development and scaling solutions" },
];

export default function IndustriesWeServe() {
  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mb-10 space-y-4 text-center sm:mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Industries" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-cormorant text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-tight text-text"
          >
            Industries We{" "}
            <span className="text-teal">Serve</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto max-w-2xl text-lg text-text-muted"
          >
            Delivering specialized solutions across diverse industry verticals
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {industries.map((industry) => (
            <motion.article
              key={industry.name}
              variants={fadeUp}
              className="rounded-2xl border border-navy-4 bg-navy-2/50 p-6 transition-all duration-300 hover:border-teal/30 hover:bg-navy-2/80 hover:shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
            >
              <h3 className="font-cormorant text-xl font-semibold text-text">
                {industry.name}
              </h3>
              <p className="mt-2 text-sm text-text-muted">
                {industry.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
