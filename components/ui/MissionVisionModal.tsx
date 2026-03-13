"use client";

import { useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Compass,
  Globe,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
  Shield,
} from "lucide-react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  type: "mission" | "vision";
};

const MISSION_POINTS = [
  {
    icon: Zap,
    title: "Speed Without Compromise",
    description:
      "We deliver fast — but never at the cost of quality. Every product ships with precision and purpose.",
  },
  {
    icon: Shield,
    title: "Reliability You Can Count On",
    description:
      "From architecture to deployment, we build systems that are secure, stable, and built to last.",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused Thinking",
    description:
      "We don't just build features — we build foundations that help your business scale with confidence.",
  },
];

const MISSION_VALUES = [
  "Integrity",
  "Quality",
  "Innovation",
  "Accountability",
  "Client-First",
  "Excellence",
];

const VISION_GOALS = [
  {
    icon: Globe,
    title: "Global Reach by 2027",
    description:
      "Expanding our client base across USA, UK, UAE, and beyond — delivering world-class digital products from Pakistan to the world.",
  },
  {
    icon: Star,
    title: "100+ Products Delivered",
    description:
      "Building a portfolio of 100+ successful digital products across fintech, healthcare, e-commerce, and AI industries.",
  },
  {
    icon: Users,
    title: "Empowering Local Talent",
    description:
      "Creating 500+ jobs and training the next generation of Pakistani engineers through our academy and internship programs.",
  },
];

const ROADMAP = [
  { year: "2023", milestone: "Founded in Islamabad", completed: true },
  { year: "2024", milestone: "10+ Projects Delivered", completed: true },
  { year: "2025", milestone: "Launched Whimbrel Academy", completed: true },
  { year: "2027", milestone: "Global Engineering Partner", completed: false },
];

export default function MissionVisionModal({ isOpen, onClose, type }: Props) {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClose = useCallback(() => onClose(), []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  if (!isOpen) return null;

  const isMission = type === "mission";

  return (
    <>
      <style>{`
        .mv-modal-overlay {
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        .mv-modal-card {
          max-width: 680px;
          width: 95vw;
          border-radius: 24px;
          background: #0b1520;
          border: 1px solid rgba(45,212,191,0.25);
          box-shadow: 0 0 0 1px rgba(45,212,191,0.1), 0 0 60px rgba(45,212,191,0.12), 0 40px 100px rgba(0,0,0,0.6);
          max-height: 90vh;
          overflow-y: auto;
          animation: mvModalIn 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .mv-modal-card::-webkit-scrollbar {
          width: 4px;
        }
        .mv-modal-card::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .mv-modal-card::-webkit-scrollbar-thumb {
          background: rgba(45,212,191,0.3);
          border-radius: 4px;
        }
        @keyframes mvModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 639px) {
          .mv-modal-card {
            max-height: 95vh;
            border-radius: 24px 24px 0 0;
            animation: mvSlideUp 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards;
          }
        }
        @keyframes mvSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .mv-modal-close:hover {
          border-color: rgba(239,68,68,0.5);
          background: rgba(239,68,68,0.1);
          color: #fca5a5;
        }
      `}</style>

      <div
        className="mv-modal-overlay fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mv-modal-title"
      >
        <div
          className="mv-modal-card"
          onClick={(e) => e.stopPropagation()}
        >
          {/* HEADER */}
          <div
            className="relative border-b border-[rgba(45,212,191,0.1)] px-6 pb-7 pt-9 sm:px-10 sm:pt-9 sm:pb-7"
            style={{
              background: "linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 100%)",
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="mv-modal-close absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-navy-2/80 text-white/80 transition sm:right-6 sm:top-6"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[rgba(45,212,191,0.2)] text-[#2dd4bf] sm:h-[52px] sm:w-[52px]">
              {isMission ? (
                <Target className="h-7 w-7 sm:h-[52px] sm:w-[52px]" />
              ) : (
                <Compass className="h-7 w-7 sm:h-[52px] sm:w-[52px]" />
              )}
            </div>
            <span className="mt-4 inline-block rounded-full border border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.1)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">
              {isMission ? "OUR MISSION" : "OUR VISION"}
            </span>
            <h2 id="mv-modal-title" className="mt-3 text-2xl font-bold text-white sm:text-[28px]">
              {isMission ? "Our Mission" : "Our Vision"}
            </h2>
            <p className="mt-1 text-[15px] italic text-[#2dd4bf]">
              {isMission
                ? "Building Digital Excellence That Matters"
                : "Where We're Headed — And Why It Matters"}
            </p>
          </div>

          {/* BODY */}
          <div className="px-6 py-8 sm:px-10 sm:py-8">
            {/* Part 1 — Statement */}
            <div className="relative">
              <span
                className="absolute -left-1 -top-2 font-serif text-7xl italic leading-none text-[#2dd4bf] opacity-[0.15] sm:text-8xl"
                aria-hidden
              >
                "
              </span>
              <p className="relative pl-6 text-lg italic leading-relaxed text-white sm:pl-8 sm:text-xl">
                {isMission
                  ? "Build dependable and scalable digital products that solve real business problems and accelerate growth."
                  : "Become a globally trusted engineering partner known for innovation, quality, and long-term value creation."}
              </p>
            </div>
            <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-[rgba(45,212,191,0.4)] to-transparent" />

            {/* Part 2 — Points / Goals */}
            <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
              {isMission ? "WHAT THIS MEANS FOR YOU" : "WHERE WE'RE GOING"}
            </p>
            <ul className="mt-4 space-y-5">
              {(isMission ? MISSION_POINTS : VISION_GOALS).map((item) => (
                <li key={item.title} className="flex gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[rgba(45,212,191,0.1)] text-[#2dd4bf]">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{item.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-white/70">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Part 3 — Pills (Mission) or Timeline (Vision) */}
            {isMission ? (
              <>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
                  CORE VALUES
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {MISSION_VALUES.map((v) => (
                    <span
                      key={v}
                      className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.08)] px-4 py-1.5 text-[13px] font-semibold text-[#2dd4bf]"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
                  OUR ROADMAP
                </p>
                <div className="mt-4 flex flex-col">
                  {ROADMAP.map((item, i) => (
                    <div key={item.year} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`z-[1] h-3 w-3 shrink-0 rounded-full ${
                            item.completed
                              ? "bg-[#2dd4bf]"
                              : "border-2 border-dashed border-[#2dd4bf] bg-transparent"
                          }`}
                        />
                        {i < ROADMAP.length - 1 && (
                          <div className="mt-0.5 h-14 w-px shrink-0 bg-[rgba(45,212,191,0.3)]" />
                        )}
                      </div>
                      <div className="pb-2">
                        <p className="text-xs font-bold text-[#2dd4bf]">{item.year}</p>
                        <p className="text-[14px] font-medium text-white">{item.milestone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* FOOTER */}
          <div className="flex flex-col gap-4 border-t border-[rgba(45,212,191,0.1)] px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <p className="text-xs text-white/45">Whimbrel Solution · Est. 2023</p>
            <Link
              href={isMission ? "/about" : "/contact"}
              onClick={handleClose}
              className="inline-flex w-fit items-center justify-center gap-1.5 rounded-[10px] border border-[rgba(45,212,191,0.5)] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#2dd4bf] transition hover:bg-[rgba(45,212,191,0.1)]"
            >
              {isMission ? "Learn More About Us →" : "Start Your Project →"}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
