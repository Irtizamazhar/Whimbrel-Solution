"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import SectionTag from "@/components/ui/SectionTag";
import { teamMembers } from "@/lib/team";
import TeamMemberOverlay from "@/components/sections/TeamMemberOverlay";
import { createPortal } from "react-dom";

const getInitials = (name: string) => {
  const words = name.split(/\s+/).filter((w) => w.length > 0);
  const meaningful = words.filter((w) => !/^(Mr|Ms|Dr)\.?$/i.test(w.trim()));
  const lastTwo = meaningful.slice(-2);
  return lastTwo
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const AVATAR_IDS = ["im", "sa", "ah", "zk", "of"] as const;

export default function TeamSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

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
            The Minds That Build the Magic.
          </h1>
          <p className="max-w-2xl text-lg text-text-muted">
            A dedicated team of engineers, designers, and product specialists
            building premium digital products.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {teamMembers.map((member, index) => {
            const id = AVATAR_IDS[index] ?? "im";
            const initials = member.initials ?? getInitials(member.name);
            return (
              <motion.article
                key={member.name}
                data-avatar={id}
                role="button"
                tabIndex={0}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedIndex(index);
                  }
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="team-card team-card-clickable group overflow-hidden rounded-2xl border transition-all duration-300 ease-out"
              >
                <div
                  className="team-card-avatar relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden"
                  data-avatar={id}
                >
                  <div
                    className="team-card-inner-circle flex h-[88px] w-[88px] flex-shrink-0 items-center justify-center rounded-full text-[28px] font-bold tracking-[0.02em] text-white"
                    data-avatar={id}
                    style={{ background: member.color }}
                  >
                    {initials}
                  </div>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
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
                  <p className="team-card-hint mt-2 text-xs font-semibold text-teal opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    View Profile →
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {mounted &&
        selectedIndex !== null &&
        typeof document !== "undefined" &&
        createPortal(
          <TeamMemberOverlay
            member={teamMembers[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
          />,
          document.body
        )}
    </section>
  );
}
