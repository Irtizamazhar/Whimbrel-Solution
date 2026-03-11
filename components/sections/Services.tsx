"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Smartphone,
  Globe,
  Bot,
  Cloud,
  Palette,
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

export default function Services() {
  return (
    <section id="services" className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mb-12 space-y-5"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Services" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl font-cormorant text-[clamp(2.4rem,6vw,3.65rem)] leading-[1.02] text-text"
          >
            Full-stack capabilities for ambitious digital products.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service) => (
            <motion.article
              variants={fadeUp}
              key={service.number}
              className="group relative overflow-hidden rounded-2xl border border-navy-4 bg-navy-2/75 p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_36px_rgba(59,191,176,0.12)]"
              data-cursor="view"
            >
              <span className="font-cormorant text-4xl text-teal">{service.number}</span>
              <span className="mt-4 flex h-12 w-12 items-center justify-center text-teal [&>svg]:h-8 [&>svg]:w-8">
                {(() => {
                  const Icon = iconMap[service.iconKey] ?? Code2;
                  return <Icon className="h-8 w-8" />;
                })()}
              </span>
              <h3 className="mt-3 font-cormorant text-[clamp(1.4rem,2.3vw,1.65rem)] text-text">
                {service.title}
              </h3>
              <p className="mt-2 text-text-muted">{service.description}</p>

              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-teal transition-all duration-300 group-hover:w-full" />
              <span className="absolute right-3 top-3 h-16 w-16 rounded-full bg-teal/0 blur-2xl transition group-hover:bg-teal/20" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
