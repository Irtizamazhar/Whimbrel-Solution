"use client";

import { useEffect, useCallback, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";
import type { TeamMember } from "@/lib/team";

type TeamMemberOverlayProps = {
  member: TeamMember;
  onClose: () => void;
};

function getOverlayBg(): string {
  if (typeof document === "undefined") return "#121A26";
  const theme = document.documentElement.getAttribute("data-theme");
  return theme === "light" ? "rgba(240, 245, 255, 0.98)" : "#121A26";
}

function getCloseButtonStyles(isLight: boolean) {
  return isLight
    ? {
        background: "rgba(0,0,0,0.08)",
        border: "1px solid rgba(0,0,0,0.12)",
        color: "rgba(0,0,0,0.6)",
      }
    : {
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.15)",
        color: "rgba(255,255,255,0.8)",
      };
}

export default function TeamMemberOverlay({
  member,
  onClose,
}: TeamMemberOverlayProps) {
  const [isLight, setIsLight] = useState(false);
  const [bg, setBg] = useState("#121A26");

  useEffect(() => {
    setBg(getOverlayBg());
    const theme = document.documentElement.getAttribute("data-theme");
    setIsLight(theme === "light");
    const observer = new MutationObserver(() => {
      setBg(getOverlayBg());
      setIsLight(document.documentElement.getAttribute("data-theme") === "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleEscape]);

  const hasSkills = member.skills.length > 0;
  const closeStyles = getCloseButtonStyles(isLight);
  const hasCustomImage = member.initials === "IM" || member.initials === "ZK";

  return (
    <div
      className="team-member-overlay-animate"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100dvh",
        maxHeight: "100%",
        zIndex: 99999,
        overflow: "hidden",
        backgroundColor: bg,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Profile: ${member.name}`}
    >
      {/* Close button — overlay pe fixed, scroll ke bahar */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        style={{
          position: "fixed",
          top: "16px",
          right: "16px",
          zIndex: 100000,
          width: "44px",
          height: "44px",
          minWidth: "44px",
          minHeight: "44px",
          borderRadius: "50%",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          ...closeStyles,
        }}
        className="team-overlay-close-hover"
        aria-label="Close profile"
      >
        <X size={20} />
      </button>

      {/* Scrollable area — scroll yahan hoga, scrollbar hidden */}
      <div
        className="team-member-overlay-scroll"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
        onClick={(e) => e.stopPropagation()}
      >
      {/* Content wrapper */}
      <div
        style={{
          position: "relative",
          maxWidth: "820px",
          margin: "0 auto",
          padding: "80px 24px 60px",
          minHeight: "100vh",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero — flex, gap 28px, mb 36px. Mobile: column, center. Avatar 90px mobile */}
        <div
          className="team-overlay-hero flex flex-col items-center gap-7 pb-9 text-center sm:flex-row sm:gap-[28px] sm:text-left"
          style={{ marginBottom: "36px", padding: 0 }}
        >
          <div
            className="h-[90px] w-[90px] flex-shrink-0 rounded-full text-2xl font-extrabold text-white sm:h-[110px] sm:w-[110px] sm:text-[36px]"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: hasCustomImage ? "transparent" : member.color,
              boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              border: "3px solid rgba(255,255,255,0.12)",
              overflow: "hidden",
            }}
          >
            {member.initials === "IM" ? (
              <Image
                src="/team-im-profile-v1.png"
                alt="Irtiza Mazhar"
                width={110}
                height={110}
                className="h-full w-full object-cover"
              />
            ) : member.initials === "ZK" ? (
              <img
                src={member.image}
                alt={member.name}
                className="h-full w-full object-cover"
              />
            ) : (
              member.initials
            )}
          </div>
          <div className="min-w-0 flex-1">
            <span className="team-overlay-badge mb-2.5 inline-block rounded-full border px-3 py-1 text-[11px] font-semibold">
              {member.number}
            </span>
            <h2 className="team-overlay-name font-extrabold leading-tight tracking-[-0.03em] [font-size:clamp(1.8rem,3vw,2.5rem)]">
              {member.name}
            </h2>
            <p className="team-overlay-role mt-1 text-base font-medium">
              {member.role}
            </p>
            <div className="team-overlay-tags mt-3 flex flex-wrap gap-2">
              {member.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="team-overlay-divider h-px w-full"
          style={{ margin: "0 0 32px" }}
        />

        {/* Bio + Skills — 2 col, gap 24px, mb 32px. Mobile: 1 col */}
        <div
          className="team-overlay-bio-grid mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"
          style={{ marginBottom: "32px", gap: "24px" }}
        >
          <div>
            <p className="team-overlay-label mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
              ABOUT
            </p>
            <p className="team-overlay-bio text-[15px] leading-[1.8]">
              {member.bio}
            </p>
          </div>
          {hasSkills && (
            <div>
              <p className="team-overlay-label mb-3 text-[11px] font-semibold uppercase tracking-[0.1em]">
                SKILLS
              </p>
              <div className="flex flex-wrap gap-2">
                {member.skills.map((skill) => (
                  <span
                    key={skill}
                    className="team-overlay-skill rounded-full border px-3.5 py-1.5 text-[13px] font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* CTA — borderRadius 16px, padding 32px */}
        <div className="team-overlay-cta rounded-2xl px-8 py-8 text-center">
          <h3 className="team-overlay-cta-heading text-base font-bold">
            Want to work with {member.name}?
          </h3>
          <p className="team-overlay-cta-sub mt-1.5 text-sm">
            Let&apos;s discuss your project today.
          </p>
          <Link
            href="/contact"
            className="team-overlay-cta-btn mt-5 inline-block rounded-[10px] border-0 px-7 py-3 font-bold text-black transition-all hover:-translate-y-0.5"
          >
            Start a Project →
          </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
