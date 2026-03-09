"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Globe, ShieldCheck, Sparkles, Users } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { slideFromLeft, slideFromRight } from "@/lib/animations";

const features = [
  {
    title: "Expert Team",
    description: "Led by senior engineers and product specialists building reliable systems.",
    Icon: Users,
  },
  {
    title: "Global Reach",
    description: "Serving clients across regions with localized execution and support.",
    Icon: Globe,
  },
  {
    title: "Proven Delivery",
    description: "Dozens of successful products shipped with strong quality standards.",
    Icon: ShieldCheck,
  },
  {
    title: "Cutting-edge Tech",
    description: "Modern stacks across web, mobile, AI, and cloud infrastructure.",
    Icon: Sparkles,
  },
];

export default function About() {
  return (
    <section id="about" className="section-spacing">
      <div className="mx-auto grid w-full max-w-[1260px] items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        <motion.div
          variants={slideFromLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-6"
        >
          <SectionTag label="About Us" />
          <h2 className="font-cormorant text-[clamp(2.2rem,5.8vw,3.7rem)] leading-[1.05] text-text">
            About <span className="text-teal">Whimbrel Solution</span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-text-muted">
            Whimbrel Solution is a trusted software partner delivering modern digital
            platforms across web, mobile, cloud, and AI. With a client-first approach,
            we help ambitious businesses scale with confidence and speed.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-xl border border-teal/20 bg-navy-2/70 p-3"
              >
                <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-teal/15 text-teal">
                  <feature.Icon size={16} />
                </div>
                <h3 className="font-semibold text-text">{feature.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/about"
            className="inline-flex rounded-md border border-teal bg-teal px-5 py-2 text-sm font-semibold text-navy transition hover:bg-teal-light"
            data-magnetic="true"
          >
            Learn More About Us
          </Link>
        </motion.div>

        <motion.div
          variants={slideFromRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          <div className="overflow-hidden rounded-3xl border border-teal/25 bg-[linear-gradient(140deg,#0f1e2e_0%,#13283f_55%,#0f1e2e_100%)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            <div className="relative h-[360px] overflow-hidden rounded-2xl border border-teal/20 bg-[radial-gradient(circle_at_25%_20%,rgba(59,191,176,0.26),transparent_45%)]">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80"
                alt="Professional founder portrait"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,22,40,0.1),rgba(10,22,40,0.45))]" />
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent)]" />
              <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-navy/60 px-3 py-1 text-xs text-teal">
                <Image src="/whimbrel-logo.svg" alt="Whimbrel mark" width={16} height={16} />
                WHIMBREL SOLUTION
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-teal/20 bg-navy/70 p-4 backdrop-blur">
                <p className="font-semibold text-text">Mr. Kaptan</p>
                <p className="text-sm text-text-muted">Founder & CEO, AI Engineer</p>
                <p className="mt-2 text-sm text-text-muted">
                  Leading innovation in digital transformation, software delivery,
                  and AI-powered business products.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
