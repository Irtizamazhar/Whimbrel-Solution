"use client";

import Link from "next/link";
import {
  Code2,
  Smartphone,
  Globe,
  Bot,
  Cloud,
  Palette,
  Clock,
  Users,
  HeadphonesIcon,
  CheckCircle2,
  Search,
  LayoutDashboard,
  Rocket,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import type { ServicePageData } from "@/data/servicesData";

const TEAL = "59, 191, 176";

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  cloud: Cloud,
  palette: Palette,
};

const processSteps = [
  { title: "Discovery & Planning", description: "We align on goals, scope, and success metrics.", icon: Search },
  { title: "Design & Architecture", description: "Wireframes, UX flows, and technical design.", icon: LayoutDashboard },
  { title: "Development & Testing", description: "Sprints, code reviews, and quality assurance.", icon: Code2 },
  { title: "Launch & Support", description: "Deployment, monitoring, and ongoing improvements.", icon: Rocket },
];

const overviewCards = [
  { icon: Clock, label: "Fast Delivery", sub: "2-8 weeks timeline" },
  { icon: Users, label: "Expert Team", sub: "5+ years experience" },
  { icon: HeadphonesIcon, label: "Full Support", sub: "Post-launch maintenance" },
];

type ServiceDetailContentProps = {
  service: ServicePageData;
};

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const Icon = iconMap[service.iconKey] ?? Code2;

  return (
    <main className="pt-28">
      {/* SECTION 1 — Hero Banner */}
      <section
        className="relative overflow-hidden px-5 py-16 md:px-8 md:py-20"
        style={{
          background: `linear-gradient(135deg, rgba(${TEAL}, 0.12) 0%, transparent 60%)`,
        }}
      >
        <div className="mx-auto max-w-[1260px]">
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <nav className="mb-6">
                <Link
                  href="/services"
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--teal)]"
                >
                  Services <ChevronRight className="inline h-4 w-4" /> {service.title}
                </Link>
              </nav>
              <span className="mb-4 flex h-16 w-16 items-center justify-center text-[var(--teal)] [&>svg]:h-16 [&>svg]:w-16">
                <Icon />
              </span>
              <span
                className="inline-block rounded-full px-4 py-1.5 text-sm font-semibold tracking-wider text-[var(--teal)]"
                style={{
                  background: `rgba(${TEAL}, 0.15)`,
                  border: `1px solid rgba(${TEAL}, 0.4)`,
                  boxShadow: `0 0 20px rgba(${TEAL}, 0.2)`,
                }}
              >
                {service.number}
              </span>
              <h1 className="mt-4 font-cormorant text-[clamp(2.2rem,5vw,3.5rem)] font-bold leading-tight text-[var(--text)]">
                {service.title}
              </h1>
              <p className="mt-3 text-lg text-[var(--teal)]">{service.tagline}</p>
              <p className="mt-4 text-[var(--text)] opacity-90">{service.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-[var(--navy)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
                  style={{
                    background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                    boxShadow: "0 4px 20px rgba(59, 191, 176, 0.3)",
                  }}
                >
                  Start This Project <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#portfolio"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[var(--teal)] bg-transparent px-6 py-3.5 text-sm font-bold text-[var(--teal)] transition-all duration-300 hover:bg-[var(--teal)] hover:bg-opacity-10"
                >
                  View Portfolio <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <span
                className="flex h-[180px] w-[180px] items-center justify-center text-[var(--teal)] opacity-[0.06] [&>svg]:h-[180px] [&>svg]:w-[180px]"
                aria-hidden
              >
                <Icon />
              </span>
            </div>
          </div>
        </div>
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, transparent, rgba(${TEAL}, 0.4), transparent)` }}
        />
      </section>

      {/* SECTION 2 — Overview Cards */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1260px]">
          <div className="grid gap-6 sm:grid-cols-3">
            {overviewCards.map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.label}
                  className="group rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--teal)]/50"
                  style={{
                    background: "var(--navy-2)",
                    borderColor: `rgba(${TEAL}, 0.2)`,
                  }}
                >
                  <span className="flex h-12 w-12 items-center justify-center text-[var(--teal)] [&>svg]:h-8 [&>svg]:w-8">
                    <CardIcon />
                  </span>
                <h3 className="mt-4 font-cormorant text-xl font-bold text-[var(--text)]">
                  {card.label}
                </h3>
                <p className="mt-1 text-sm text-[var(--text-muted)]">{card.sub}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — What We Offer */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1260px]">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em]"
                style={{ color: "var(--teal)" }}
              >
                What We Offer
              </p>
              <h2 className="mt-3 font-cormorant text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-[var(--text)]">
                Everything you need, nothing you don&apos;t.
              </h2>
              <p className="mt-4 text-[var(--text)] opacity-90">
                We focus on deliverables that move the needle: clear scope, modern stack, and ongoing support so your product keeps improving after launch.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {service.features.map((f) => (
                <div
                  key={f.title}
                  className="group rounded-xl border-l-4 border-[var(--teal)] bg-[var(--navy-2)] p-5 transition-all duration-300 hover:shadow-[0_0_24px_rgba(59,191,176,0.12)]"
                  style={{ borderLeftColor: "var(--teal)" }}
                >
                  <CheckCircle2 className="h-6 w-6 text-[var(--teal)]" />
                  <h3 className="mt-3 font-cormorant text-lg font-bold text-[var(--text)]">
                    {f.title}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{f.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Our Process */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1260px]">
          <h2 className="font-cormorant text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[var(--text)]">
            How We Work
          </h2>
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-start md:gap-4">
            {processSteps.map((step, i) => {
              const StepIcon = step.icon;
              return (
              <div key={step.title} className="relative flex flex-1 flex-col items-center text-center md:items-start md:text-left">
                {i < processSteps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-6 hidden h-0.5 w-full border-b-2 border-dashed border-[var(--teal)] opacity-40 md:left-[calc(50%+28px)] md:block md:w-[calc(100%-56px)]"
                    aria-hidden
                  />
                )}
                <span
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-[var(--teal)]"
                  style={{
                    background: `rgba(${TEAL}, 0.15)`,
                    border: `2px solid rgba(${TEAL}, 0.4)`,
                  }}
                >
                  <StepIcon className="h-6 w-6" />
                </span>
                <span className="mt-4 block text-sm font-bold text-[var(--teal)]">
                  Step {i + 1}
                </span>
                <h3 className="mt-1 font-cormorant text-lg font-bold text-[var(--text)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tech Stack */}
      <section className="px-5 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[1260px]">
          <h2 className="font-cormorant text-[clamp(1.75rem,3vw,2.25rem)] font-bold text-[var(--text)]">
            Technologies We Use
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {service.tech.map((t) => (
              <span
                key={t}
                className="rounded-full px-5 py-2 text-sm font-semibold tracking-wide text-[var(--teal)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(59,191,176,0.25)]"
                style={{
                  background: `rgba(${TEAL}, 0.08)`,
                  border: `1px solid rgba(${TEAL}, 0.35)`,
                  boxShadow: "none",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA Banner */}
      <section className="px-5 pb-20 md:px-8 md:pb-28">
        <div className="mx-auto max-w-[1260px]">
          <div
            className="flex flex-col items-center justify-center rounded-2xl border px-8 py-16 text-center md:py-20"
            style={{
              background: `linear-gradient(135deg, rgba(${TEAL}, 0.15), rgba(0,0,0,0))`,
              borderColor: `rgba(${TEAL}, 0.2)`,
            }}
          >
            <h2 className="font-cormorant text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-[var(--text)]">
              Ready to Build Something Great?
            </h2>
            <p className="mt-4 max-w-xl text-[var(--text-muted)]">
              Let&apos;s discuss your project and find the best approach.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-[var(--navy)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02]"
              style={{
                background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                boxShadow: "0 8px 32px rgba(59, 191, 176, 0.35)",
              }}
            >
              Get a Free Consultation <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
