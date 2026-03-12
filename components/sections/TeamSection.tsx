"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 space-y-5 sm:mb-12"
        >
          <SectionTag label="Our Team" />
          <h1 className="font-cormorant text-[clamp(1.5rem,3.5vw,2.8rem)] leading-tight text-text">
            The Minds That Build the Magic.
          </h1>
          <p className="max-w-2xl text-base text-text-muted sm:text-lg">
            A dedicated team of engineers, designers, and product specialists
            building premium digital products.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
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
                    className="team-card-inner-circle flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full text-2xl font-bold tracking-[0.02em] text-white sm:h-[88px] sm:w-[88px] sm:text-[28px]"
                    data-avatar={id}
                    style={{ background: member.color }}
                  >
                    {initials}
                  </div>
                </div>
                <div className="border-t border-navy-4 p-5">
                  <h3 className="font-cormorant text-lg font-semibold text-text sm:text-xl">
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
