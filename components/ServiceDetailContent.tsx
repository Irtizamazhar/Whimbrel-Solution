"use client";

import Link from "next/link";
import {
  Code2,
  Smartphone,
  Globe,
  Bot,
  Cloud,
  Palette,
  Figma,
  Clock,
  Users,
  Shield,
  ChevronRight,
  ChevronLeft,
  Zap,
  Lock,
  Database,
  GitBranch,
  HeadphonesIcon,
  WifiOff,
  Bell,
  Store,
  BarChart2,
  Search,
  FileText,
  ShoppingCart,
  Link as LinkIcon,
  MessageSquare,
  Workflow,
  UserCheck,
  Box,
  Activity,
  TrendingDown,
  LayoutDashboard,
  Monitor,
  Play,
  Package,
  Send,
  type LucideIcon,
} from "lucide-react";
import type { ServicePageData } from "@/data/servicesData";

const TEAL = "59, 191, 176";

const serviceIconMap: Record<string, LucideIcon> = {
  code: Code2,
  smartphone: Smartphone,
  globe: Globe,
  bot: Bot,
  cloud: Cloud,
  palette: Palette,
};

const gradientBySlug: Record<string, string> = {
  "custom-software": "linear-gradient(135deg, #2dd4bf, #0d9488)",
  "mobile-apps": "linear-gradient(135deg, #818cf8, #4f46e5)",
  "web-development": "linear-gradient(135deg, #38bdf8, #0284c7)",
  "ai-solutions": "linear-gradient(135deg, #a78bfa, #7c3aed)",
  devops: "linear-gradient(135deg, #fb923c, #ea580c)",
  "ui-ux": "linear-gradient(135deg, #f472b6, #db2777)",
};

const iconBySlug: Record<string, LucideIcon> = {
  "custom-software": Code2,
  "mobile-apps": Smartphone,
  "web-development": Globe,
  "ai-solutions": Bot,
  devops: Cloud,
  "ui-ux": Figma,
};

const featureIconMap: Record<string, LucideIcon> = {
  code: Code2,
  zap: Zap,
  lock: Lock,
  database: Database,
  gitBranch: GitBranch,
  headphones: HeadphonesIcon,
  smartphone: Smartphone,
  wifiOff: WifiOff,
  bell: Bell,
  store: Store,
  barChart: BarChart2,
  search: Search,
  fileText: FileText,
  shoppingCart: ShoppingCart,
  bot: Bot,
  link: LinkIcon,
  messageSquare: MessageSquare,
  workflow: Workflow,
  userCheck: UserCheck,
  clock: Clock,
  cloud: Cloud,
  box: Box,
  activity: Activity,
  shield: Shield,
  trendingDown: TrendingDown,
  users: Users,
  layout: LayoutDashboard,
  monitor: Monitor,
  play: Play,
  package: Package,
  send: Send,
};

const statCards = [
  { icon: Clock, label: "Timeline", value: "2–8 Weeks" },
  { icon: Users, label: "Team Size", value: "2–5 Experts" },
  { icon: Shield, label: "Support", value: "Post-Launch Care" },
];

const processSteps = [
  { title: "Discovery", description: "We understand your goals and requirements" },
  { title: "Design", description: "Architecture, UI planning, and prototyping" },
  { title: "Build", description: "Agile development with weekly updates" },
  { title: "Launch", description: "Deployment, testing, and ongoing support" },
];

type ServiceDetailContentProps = {
  service: ServicePageData;
};

export default function ServiceDetailContent({ service }: ServiceDetailContentProps) {
  const Icon = iconBySlug[service.slug] ?? serviceIconMap[service.iconKey] ?? Code2;
  const gradient = gradientBySlug[service.slug] ?? gradientBySlug["custom-software"];

  return (
    <main className="min-h-screen overflow-x-hidden pt-24 sm:pt-28">
      {/* SECTION 1 — Hero */}
      <section
        className="relative overflow-hidden px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-20 xl:px-10"
        style={{
          background: `linear-gradient(135deg, rgba(${TEAL}, 0.1) 0%, transparent 70%)`,
        }}
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="relative flex flex-col items-center gap-8 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
            <div className="max-w-2xl">
              <nav className="mb-4">
                <Link
                  href="/services"
                  className="text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--teal)]"
                >
                  Services <ChevronRight className="inline h-4 w-4" /> {service.title}
                </Link>
              </nav>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="service-detail-number-badge">
                  {service.number}
                </span>
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "14px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    background: gradient,
                  }}
                >
                  <Icon size={28} color="white" />
                </div>
              </div>
              <h1 className="mt-4 font-cormorant text-[clamp(1.875rem,5vw,3.125rem)] font-bold leading-tight text-[var(--text)]">
                {service.title}
              </h1>
              <p className="mt-3 text-lg italic text-[var(--teal)]">{service.tagline}</p>
              <p className="mt-4 text-[var(--text-muted)]">{service.description}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-bold text-[var(--navy)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02] sm:w-auto"
                  style={{
                    background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                    boxShadow: `0 4px 20px rgba(${TEAL}, 0.3)`,
                  }}
                >
                  Start This Project <ChevronRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex min-h-[44px] items-center justify-center gap-1.5 rounded-xl border-2 border-[var(--teal)] bg-transparent px-4 py-2.5 text-sm font-bold text-[var(--teal)] transition-all duration-300 hover:bg-[var(--teal)]/10 sm:w-auto"
                >
                  <ChevronLeft className="h-4 w-4" /> Back to Services
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <span
                className="flex h-[200px] w-[200px] items-center justify-center text-[var(--teal)] opacity-[0.05] [&>svg]:h-[200px] [&>svg]:w-[200px]"
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

      {/* SECTION 2 — Three stat cards */}
      <section className="px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-20 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
            {statCards.map((card) => {
              const CardIcon = card.icon;
              return (
                <div
                  key={card.label}
                  className="rounded-[14px] border p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--teal)]/50"
                  style={{
                    background: "var(--navy-2)",
                    borderColor: `rgba(${TEAL}, 0.2)`,
                  }}
                >
                  <span className="flex h-12 w-12 items-center justify-center text-[var(--teal)] [&>svg]:h-8 [&>svg]:w-8">
                    <CardIcon />
                  </span>
                  <h3 className="mt-4 font-cormorant text-base font-bold text-[var(--text)]">
                    {card.label}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">{card.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — What We Offer */}
      <section className="px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-20 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--teal)]"
              >
                What We Offer
              </p>
              <h2 className="mt-3 font-cormorant text-[clamp(1.375rem,3vw,2.125rem)] font-bold leading-tight text-[var(--text)]">
                Everything you need, built right.
              </h2>
              <p className="mt-4 text-[var(--text)] opacity-90">
                We focus on deliverables that move the needle: clear scope, modern stack, and ongoing support so your product keeps improving after launch.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 sm:gap-5">
              {service.features.map((f) => {
                const FeatureIcon = featureIconMap[f.iconKey] ?? Code2;
                return (
                  <div
                    key={f.title}
                    className="rounded-xl border-l-[3px] border-[var(--teal)] bg-[var(--navy-2)] p-4 transition-all duration-300 hover:translate-x-1 hover:bg-[var(--navy-3)] hover:shadow-[0_0_24px_rgba(59,191,176,0.12)] sm:p-5"
                  >
                    <FeatureIcon className="h-5 w-5 text-[var(--teal)] sm:h-6 sm:w-6" />
                    <h3 className="mt-2 font-cormorant text-xs font-bold text-[var(--text)] sm:mt-3 sm:text-sm">
                      {f.title}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-muted)] sm:text-sm">{f.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — Our Process */}
      <section className="px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-20 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="text-center font-cormorant text-[clamp(1.375rem,3vw,2.125rem)] font-bold text-[var(--text)]">
            How We Work
          </h2>
          <div className="mt-8 flex flex-col gap-6 sm:gap-8 md:mt-10 md:flex-row md:items-start md:justify-between md:gap-4">
            {processSteps.map((step, i) => (
              <div
                key={step.title}
                className="relative flex flex-1 flex-col items-center text-center md:items-start md:text-left"
              >
                {i < processSteps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-14 hidden h-0.5 w-full -translate-x-1/2 border-b-2 border-dashed border-[var(--teal)] opacity-40 md:left-[calc(50%+28px)] md:block md:w-[calc(100%-56px)] md:translate-x-0"
                    aria-hidden
                  />
                )}
                <div className="flex flex-col items-center md:flex-row md:items-start md:gap-4">
                  <span
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-[var(--teal)]"
                    style={{
                      background: `rgba(${TEAL}, 0.15)`,
                      border: `2px solid rgba(${TEAL}, 0.4)`,
                    }}
                  >
                    {i + 1}
                  </span>
                  <div className="mt-4 md:mt-0">
                    <h3 className="font-cormorant text-sm font-bold text-[var(--text)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-[var(--text-muted)]">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — Tech Stack */}
      <section className="px-4 py-12 sm:px-5 sm:py-16 md:px-6 md:py-20 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          <h2 className="font-cormorant text-[clamp(1.375rem,3vw,2.125rem)] font-bold text-[var(--text)]">
            Technologies We Use
          </h2>
          <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
            {service.tech.map((t) => (
              <span
                key={t}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-[var(--teal)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_16px_rgba(59,191,176,0.25)] sm:px-[18px] sm:py-2 sm:text-sm"
                style={{
                  background: `rgba(${TEAL}, 0.08)`,
                  border: `1px solid rgba(${TEAL}, 0.3)`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA Banner */}
      <section className="px-4 pb-16 md:px-6 md:pb-28 xl:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div
            className="flex flex-col items-center justify-center rounded-2xl border px-4 py-12 text-center sm:px-6 sm:py-16 md:rounded-[20px] md:px-8 md:py-20"
            style={{
              background: `linear-gradient(135deg, rgba(${TEAL}, 0.12), transparent)`,
              borderColor: `rgba(${TEAL}, 0.2)`,
            }}
          >
            <h2 className="font-cormorant text-[clamp(1.625rem,3vw,2.375rem)] font-bold text-[var(--text)]">
              Ready to Start?
            </h2>
            <p className="mt-4 max-w-xl text-[var(--text-muted)]">
              Tell us about your project and we will get back within 24 hours.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold text-[var(--navy)] transition-all duration-300 hover:brightness-110 hover:scale-[1.02] hover:shadow-[0_8px_32px_rgba(59,191,176,0.35)]"
              style={{
                background: "linear-gradient(135deg, var(--teal), var(--teal-dark))",
                boxShadow: "0 8px 32px rgba(59, 191, 176, 0.35)",
              }}
            >
              Get a Free Quote <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
