"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import { teamMembers } from "@/lib/team";
import TeamMemberOverlay from "@/components/sections/TeamMemberOverlay";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

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
  const [cardsInView, setCardsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => setMounted(true), []);

  const observerCallback = useCallback<IntersectionObserverCallback>((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setCardsInView(true);
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-60px 0px -60px 0px",
      threshold: 0.15,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <section
      ref={sectionRef}
      className="team-section-redesign section-spacing py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        {/* Section header */}
        <div className="mb-10 space-y-3 sm:mb-14">
          <span className="team-section-label inline-block text-xs font-semibold uppercase tracking-[0.2em] text-teal [data-theme='light']:text-[#0d9488]">
            Our Experts
          </span>
          <h2 className="team-section-heading relative inline-block font-cormorant text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-text [data-theme='light']:text-[#111]">
            The Minds That Build the Magic.
            <span className="team-section-underline absolute bottom-0 left-0 h-0.5 w-full origin-left scale-x-100 bg-gradient-to-r from-teal to-teal/60 [data-theme='light']:from-[#0d9488] [data-theme='light']:to-[#0d9488]/70" />
          </h2>
          <p className="max-w-2xl text-base text-text-muted [data-theme='light']:text-[rgba(0,0,0,0.65)] sm:text-lg">
            A dedicated team of engineers, designers, and product specialists
            building premium digital products.
          </p>
        </div>

        {/* Cards grid: 1 / 2 / 3 / 5 columns */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 sm:gap-8">
          {teamMembers.map((member, index) => {
            const id = AVATAR_IDS[index] ?? "im";
            const initials = member.initials ?? getInitials(member.name);
            return (
              <article
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
                className={cn(
                  "team-card-new group relative flex flex-col overflow-hidden rounded-[20px] border border-[rgba(45,212,191,0.12)] bg-[rgba(255,255,255,0.04)] transition-all duration-300 ease-out",
                  "hover:-translate-y-[10px] hover:scale-[1.03] hover:border-teal/40 hover:shadow-[0_20px_50px_rgba(45,212,191,0.2)]",
                  cardsInView ? "team-card-visible opacity-100 translate-y-0" : "team-card-hidden opacity-0 translate-y-8",
                )}
                style={{
                  transitionDelay: cardsInView ? `${index * 100}ms` : "0ms",
                }}
              >
                {/* Top: gradient + avatar area */}
                <div
                  className="team-card-avatar-zone relative flex min-h-[160px] w-full flex-shrink-0 items-center justify-center overflow-hidden px-4 pt-8 pb-6"
                  data-avatar={id}
                  style={{
                    background: `linear-gradient(180deg, ${member.color}22 0%, ${member.color}08 50%, transparent 100%)`,
                  }}
                >
                  <div
                    className="team-card-avatar-overlay absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20"
                    aria-hidden
                  />
                  <div
                    className="team-card-avatar-ring relative z-10 flex h-[100px] w-[100px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-white/90 text-[28px] font-bold tracking-tight text-white shadow-lg [data-theme='light']:border-white/95"
                    data-avatar={id}
                    style={{ backgroundColor: member.color }}
                  >
                    {initials}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/30 to-transparent [data-theme='light']:via-[rgba(13,148,136,0.25)]" />

                {/* Content: flex-1 + mt-auto on button so all "View Profile" align at bottom */}
                <div className="team-card-content relative flex flex-1 flex-col border-t border-navy-4/50 p-5">
                  <div className="flex flex-1 flex-col">
                    <h3 className="team-card-name font-cormorant text-xl font-bold text-text sm:text-[1.35rem]">
                      {member.name}
                    </h3>
                    <p className="team-card-role mt-1.5 text-sm font-medium text-teal">
                      {member.role}
                    </p>

                    {/* Social icons: only for Mr. Irtiza Mazhar (index 0), LinkedIn + Email, visible on hover */}
                    {index === 0 && (
                      <div className="mt-4 mb-4 flex items-center justify-center gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <Link
                          href={member.linkedin || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="team-card-social-icon flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 bg-teal/5 text-teal transition hover:border-teal/60 hover:bg-teal/15"
                          aria-label="LinkedIn"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Linkedin size={18} />
                        </Link>
                        <Link
                          href="#"
                          className="team-card-social-icon flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 bg-teal/5 text-teal transition hover:border-teal/60 hover:bg-teal/15"
                          aria-label="Email"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Mail size={18} />
                        </Link>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(index);
                    }}
                    className="team-card-view-btn mt-auto w-full rounded-xl border border-teal/40 bg-teal/10 py-2.5 text-sm font-semibold text-teal transition hover:border-teal/60 hover:bg-teal/20"
                  >
                    View Profile
                  </button>
                </div>
              </article>
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
