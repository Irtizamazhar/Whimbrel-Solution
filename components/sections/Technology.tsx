"use client";

import { motion } from "framer-motion";
import { Cloud } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFlutter,
  SiPython,
  SiOpenai,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiFirebase,
  SiFigma,
  SiShopify,
  SiStripe,
  SiTypescript,
  SiKotlin,
  SiTailwindcss,
} from "react-icons/si";
import SectionTag from "@/components/ui/SectionTag";
import { fadeUp, stagger } from "@/lib/animations";

const technologies: Array<{
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
}> = [
  { name: "React.js", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Flutter", Icon: SiFlutter, color: "#02569B" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "OpenAI / LLMs", Icon: SiOpenai, color: "#412991" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "AWS", Icon: Cloud, color: "#FF9900" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
  { name: "Shopify", Icon: SiShopify, color: "#7AB55C" },
  { name: "Stripe", Icon: SiStripe, color: "#635BFF" },
  { name: "React Native", Icon: SiReact, color: "#61DAFB" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Kotlin", Icon: SiKotlin, color: "#7F52FF" },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
];

export default function Technology() {
  return (
    <section id="technology" className="section-spacing border-t border-navy-4/60">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          variants={stagger}
          className="mb-10 space-y-4"
        >
          <motion.div variants={fadeUp}>
            <SectionTag label="Testing & Assessment" />
          </motion.div>
          <motion.h2
            variants={fadeUp}
            className="font-cormorant text-[clamp(2.2rem,5.5vw,3.5rem)] font-semibold uppercase leading-[1.05] tracking-wide text-text"
          >
            Technologies We Use
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-wrap justify-center gap-3"
        >
          {technologies.map((tech) => {
            const Icon = tech.Icon;
            return (
              <motion.div
                key={tech.name}
                variants={fadeUp}
                className="group flex items-center gap-2.5 rounded-full border border-navy-4/80 bg-navy-2/80 px-4 py-2.5 transition duration-300 hover:border-teal/30 hover:shadow-[0_0_20px_rgba(59,191,176,0.1)]"
                data-cursor="view"
              >
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy-3/80 [&>svg]:h-4 [&>svg]:w-4"
                  style={{ color: tech.color }}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-text">{tech.name}</span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
