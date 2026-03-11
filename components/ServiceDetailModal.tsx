"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Code2,
  Smartphone,
  Globe,
  Bot,
  Cloud,
  Palette,
  X,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import type { ServiceDetail } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  cloud: Cloud,
  palette: Palette,
};

type ServiceDetailModalProps = {
  service: ServiceDetail | null;
  onClose: () => void;
};

const TEAL_RGB = "59, 191, 176";

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!service) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [service, onClose]);

  useEffect(() => {
    if (service) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [service]);

  if (!service) return null;

  const Icon = iconMap[service.iconKey] ?? Code2;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div
        className="service-detail-modal relative flex max-h-[95vh] w-[95vw] max-w-[680px] flex-col overflow-hidden rounded-2xl bg-[#0d1117] shadow-2xl"
        style={{
          border: `1px solid rgba(${TEAL_RGB}, 0.3)`,
          boxShadow: `0 0 40px rgba(${TEAL_RGB}, 0.15), 0 25px 60px rgba(0, 0, 0, 0.5)`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalEnter {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes featureFade {
            from { opacity: 0; transform: translateX(-8px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .service-detail-modal {
            animation: modalEnter 0.4s ease forwards;
          }
        `}</style>

        <div className="flex-1 overflow-y-auto">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(59,191,176,0.3)] bg-[#0d1117]/90 text-[var(--text)] transition-all duration-300 hover:border-[var(--teal)] hover:shadow-[0_0_20px_rgba(59,191,176,0.3)]"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Hero */}
          <div
            className="relative px-6 pt-10 pb-8"
            style={{
              background: `linear-gradient(135deg, rgba(${TEAL_RGB}, 0.15) 0%, rgba(0, 0, 0, 0) 100%)`,
            }}
          >
            <div className="flex flex-col items-center text-center">
              <span className="mb-4 flex h-14 w-14 items-center justify-center text-[var(--teal)] [&>svg]:h-14 [&>svg]:w-14">
                <Icon />
              </span>
              <span
                className="mb-3 inline-block rounded-full px-4 py-1 text-sm font-semibold tracking-wider text-[var(--teal)]"
                style={{
                  background: `rgba(${TEAL_RGB}, 0.15)`,
                  border: `1px solid rgba(${TEAL_RGB}, 0.4)`,
                  boxShadow: `0 0 16px rgba(${TEAL_RGB}, 0.2)`,
                }}
              >
                {service.number}
              </span>
              <h2
                id="service-modal-title"
                className="font-cormorant text-2xl font-bold text-[var(--text)] md:text-3xl"
              >
                {service.title}
              </h2>
              <p className="mt-2 text-sm italic text-[var(--teal)]">
                {service.tagline}
              </p>
            </div>
          </div>

          <div
            className="h-px w-full"
            style={{ background: `rgba(${TEAL_RGB}, 0.35)` }}
          />

          {/* Middle */}
          <div className="px-6 py-6">
            <p
              className="leading-relaxed text-[var(--text)]"
              style={{ opacity: 0.9 }}
            >
              {service.description}
            </p>

            <h3 className="mt-6 flex items-center gap-2 text-base font-semibold text-[var(--text)]">
              <span
                className="h-5 w-1 rounded-full"
                style={{ background: "var(--teal)" }}
              />
              What&apos;s Included
            </h3>
            <ul className="mt-3 space-y-2">
              {service.features.map((feature, i) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-colors duration-200 hover:bg-[rgba(59,191,176,0.08)]"
                  style={{
                    animation: "featureFade 0.35s ease forwards",
                    animationDelay: `${0.08 * i}s`,
                    animationFillMode: "both",
                  }}
                >
                  <CheckCircle2
                    className="h-5 w-5 shrink-0 text-[var(--teal)]"
                    style={{
                      filter: `drop-shadow(0 0 6px rgba(${TEAL_RGB}, 0.4))`,
                    }}
                  />
                  <span className="text-[var(--text)]">{feature}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-6 flex items-center gap-2 text-base font-semibold text-[var(--text)]">
              <span
                className="h-5 w-1 rounded-full"
                style={{ background: "var(--teal)" }}
              />
              Tech Stack
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {service.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3.5 py-1 text-xs font-semibold tracking-wide text-[var(--teal)] transition-all duration-200 hover:bg-[rgba(59,191,176,0.2)] hover:shadow-[0_0_12px_rgba(59,191,176,0.25)]"
                  style={{
                    background: `rgba(${TEAL_RGB}, 0.1)`,
                    border: `1px solid rgba(${TEAL_RGB}, 0.4)`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div
            className="border-t px-6 py-5"
            style={{ borderColor: `rgba(${TEAL_RGB}, 0.2)` }}
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-bold text-white transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              style={{
                background:
                  "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                boxShadow: "0 4px 20px rgba(59, 191, 176, 0.25)",
              }}
            >
              Start This Project →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
