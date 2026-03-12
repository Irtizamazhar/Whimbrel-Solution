"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe,
  Bot,
  Cloud,
  Palette,
  CheckCircle2,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { services } from "@/lib/constants";
import { fadeUp, stagger } from "@/lib/animations";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  cloud: Cloud,
  palette: Palette,
};

const gradientByNumber: Record<string, string> = {
  "01": "linear-gradient(135deg, #2dd4bf, #0d9488)",
  "02": "linear-gradient(135deg, #818cf8, #4f46e5)",
  "03": "linear-gradient(135deg, #38bdf8, #0284c7)",
  "04": "linear-gradient(135deg, #a78bfa, #7c3aed)",
  "05": "linear-gradient(135deg, #fb923c, #ea580c)",
  "06": "linear-gradient(135deg, #f472b6, #db2777)",
};

export default function Services() {
  return (
    <section id="services" className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mb-8 space-y-5 sm:mb-12"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Our Services" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl font-cormorant text-[clamp(2.4rem,6vw,3.65rem)] leading-[1.02] text-text"
          >
            We Don&apos;t Just Code. We Build Businesses.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => {
            const slug = "slug" in service ? service.slug : service.number;
            const features = "features" in service ? service.features : [];
            const technologies = "technologies" in service ? service.technologies : [];
            const Icon = iconMap[service.iconKey] ?? Code2;
            const gradient = gradientByNumber[service.number] ?? gradientByNumber["01"];
            return (
              <motion.article
                variants={fadeUp}
                key={service.number}
                className="h-full rounded-3xl"
              >
                <Link
                  href={`/services/${slug}`}
                  className="service-card-premium group relative flex h-full flex-col rounded-3xl border p-7 transition-all duration-300"
                >
                {/* Hover arrow + Number — top right */}
                <div className="absolute right-5 top-5 flex items-center gap-2">
                  <span className="service-card-number text-[13px] font-bold tracking-[0.05em]">
                    {service.number}
                  </span>
                  <span
                    className="service-card-chevron"
                    aria-hidden
                  >
                    <ChevronRight size={18} />
                  </span>
                </div>
                {/* 1. Top — Icon box (left) */}
                <div className="mb-5 flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-xl text-white" style={{ background: gradient }}>
                  <Icon size={24} />
                </div>

                {/* 2. Title */}
                <h3 className="service-card-title mb-2.5 text-[1.2rem] font-bold">
                  {service.title}
                </h3>

                {/* 3. Description */}
                <p className="service-card-desc mb-4 text-[14px] leading-[1.7]">
                  {service.description}
                </p>

                {/* 4. Key Features */}
                {features.length > 0 && (
                  <>
                    <p className="service-card-label mb-2.5 text-[12px] font-bold uppercase tracking-[0.06em]">
                      Key Features:
                    </p>
                    <ul className="space-y-1.5">
                      {features.map((feature) => (
                        <li
                          key={feature}
                          className="service-card-feature flex items-center gap-2"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 flex-shrink-0 text-teal" />
                          <span className="text-[13px]">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* 5. Technologies */}
                {technologies.length > 0 && (
                  <>
                    <p className="service-card-label mt-4 mb-2 text-[12px] font-bold uppercase tracking-[0.06em]">
                      Technologies:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {technologies.map((tech) => (
                        <span
                          key={tech}
                          className="service-card-pill rounded-md border px-2.5 py-1 text-[11px] font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </>
                )}

                </Link>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
