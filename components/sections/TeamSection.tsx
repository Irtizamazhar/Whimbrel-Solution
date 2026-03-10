"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { teamMembers } from "@/lib/team";

export default function TeamSection() {
  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 space-y-5"
        >
          <SectionTag label="Our Team" />
          <h1 className="font-cormorant text-[clamp(2.2rem,5.5vw,3.6rem)] leading-tight text-text">
            Meet the people behind Whimbrel Solution
          </h1>
          <p className="max-w-2xl text-lg text-text-muted">
            A dedicated team of engineers, designers, and product specialists
            building premium digital products.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teamMembers.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group overflow-hidden rounded-2xl border border-navy-4 bg-navy-2/75 transition hover:border-teal/40 hover:shadow-[0_0_36px_rgba(59,191,176,0.12)]"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent opacity-80" />
                <Link
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/60 bg-navy/80 text-teal transition hover:bg-teal hover:text-navy"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <Linkedin size={18} />
                </Link>
              </div>
              <div className="border-t border-navy-4 p-4">
                <h3 className="font-cormorant text-xl font-semibold text-text">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-text-muted">{member.role}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
