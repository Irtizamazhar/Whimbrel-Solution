"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Award,
  Bot,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  DollarSign,
  Figma,
  GitBranch,
  Globe,
  GraduationCap,
  Headphones,
  Monitor,
  Shield,
  Smartphone,
  Users,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import EnrollModal, { type EnrollModalItem } from "@/components/ui/EnrollModal";
import {
  COURSES,
  COURSE_FILTERS,
  INTERNSHIPS,
  type Course,
  type CourseFilter,
} from "@/data/enroll";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Globe,
  Smartphone,
  Bot,
  Figma,
  Cloud,
  Code2,
  Database,
  Shield,
  GitBranch,
};

export default function EnrollPage() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"courses" | "internships">("courses");
  const [courseFilter, setCourseFilter] = useState<CourseFilter>("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState<EnrollModalItem | null>(null);

  useEffect(() => {
    if (tabParam === "internships") setActiveTab("internships");
    else if (tabParam === "courses") setActiveTab("courses");
  }, [tabParam]);

  const openEnrollModal = (item: EnrollModalItem) => {
    setModalItem(item);
    setModalOpen(true);
  };

  const filteredCourses =
    courseFilter === "All"
      ? COURSES
      : COURSES.filter((c) => c.filter === courseFilter);

  return (
    <div className="enroll-page min-h-screen bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        {/* SECTION 1 — HERO */}
        <section
          className="enroll-hero relative overflow-hidden py-20"
          style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.1) 0%, transparent 60%)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <GraduationCap
              size={300}
              className="enroll-hero-icon text-white opacity-[0.04]"
              aria-hidden
            />
          </div>
          <div className="relative mx-auto max-w-[1280px] px-4 text-center sm:px-5 md:px-6 xl:px-10">
            <p className="enroll-hero-label text-xs font-semibold uppercase tracking-[0.15em] text-[#2dd4bf]">
              WHIMBREL ACADEMY
            </p>
            <h1 className="enroll-hero-title mt-4 font-cormorant text-[clamp(2.5rem,6vw,5rem)] font-bold leading-tight text-white">
              Learn. Build. Launch.
            </h1>
            <p className="enroll-hero-sub mx-auto mt-5 max-w-[600px] text-base text-text-muted">
              Join our IT courses and internship programs. Get hands-on experience,
              expert mentorship, and industry certificates that employers value.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("courses");
                  setTimeout(() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-[0.9rem] font-bold text-black transition hover:brightness-110 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
                  boxShadow: "0 0 20px rgba(45,212,191,0.3)",
                }}
              >
                Browse Courses →
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("internships");
                  setTimeout(() => document.getElementById("internships")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(45,212,191,0.5)] bg-transparent px-6 py-3 text-[0.9rem] font-semibold text-[#2dd4bf] transition hover:bg-[rgba(45,212,191,0.1)]"
              >
                View Internships →
              </button>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
              {[
                { value: "500+", label: "Students" },
                { value: "15+", label: "Courses" },
                { value: "100%", label: "Practical" },
                { value: "Certificates", label: "Included" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="enroll-stat-value text-2xl font-bold text-[#2dd4bf] sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="enroll-stat-label mt-1 text-sm text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — TABS */}
        <div className="enroll-tabs-wrap border-t border-navy-4/80 bg-navy-2/40">
          <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-5 md:px-6 xl:px-10">
            <div className="flex flex-wrap items-center justify-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("courses")}
                className={`rounded-[10px] px-8 py-3 text-sm font-bold transition ${
                  activeTab === "courses"
                    ? "enroll-tab-active border border-[rgba(45,212,191,0.5)] bg-[rgba(45,212,191,0.15)] text-[#2dd4bf]"
                    : "enroll-tab-inactive border border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                📚 IT Courses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("internships")}
                className={`rounded-[10px] px-8 py-3 text-sm font-bold transition ${
                  activeTab === "internships"
                    ? "enroll-tab-active border border-[rgba(45,212,191,0.5)] bg-[rgba(45,212,191,0.15)] text-[#2dd4bf]"
                    : "enroll-tab-inactive border border-white/10 bg-transparent text-white/50 hover:border-white/25 hover:text-white"
                }`}
              >
                🎓 Internships
              </button>
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}
        {activeTab === "courses" && (
          <section id="courses" className="section-spacing scroll-mt-24">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
              <h2 className="enroll-section-title font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white">
                IT Courses
              </h2>
              <p className="enroll-section-sub mt-2 text-sm text-text-muted">
                Self-paced courses with hands-on projects and certificates
              </p>
              <div className="mt-6 overflow-x-auto pb-2">
                <div className="flex gap-2 min-w-0">
                  {COURSE_FILTERS.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setCourseFilter(f)}
                      className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition ${
                        courseFilter === f
                          ? "enroll-pill-active border border-[#2dd4bf] bg-[rgba(45,212,191,0.15)] text-[#2dd4bf]"
                          : "enroll-pill-inactive border border-white/10 bg-transparent text-text-muted hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    onEnroll={() =>
                      openEnrollModal({
                        title: course.title,
                        price: course.price,
                        isInternship: false,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {activeTab === "internships" && (
          <section id="internships" className="section-spacing scroll-mt-24">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
              <h2 className="enroll-section-title font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white">
                Internship Programs
              </h2>
              <p className="enroll-section-sub mt-2 text-sm text-text-muted">
                Real experience on live projects with mentorship and certificates
              </p>
              <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
                {INTERNSHIPS.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    onApply={() =>
                      openEnrollModal({
                        title: internship.title,
                        isInternship: true,
                      })
                    }
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* WHY LEARN WITH US */}
        <section className="enroll-why-section section-spacing border-t border-navy-4/80">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
            <h2 className="enroll-section-title font-cormorant text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white">
              Why Learn With Whimbrel?
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                {
                  icon: Monitor,
                  title: "Live Projects",
                  desc: "Work on real client projects, not just theory",
                },
                {
                  icon: Users,
                  title: "Expert Mentors",
                  desc: "Learn from senior engineers with 5+ years experience",
                },
                {
                  icon: Award,
                  title: "Certificates",
                  desc: "Get industry-recognized certificates on completion",
                },
                {
                  icon: Briefcase,
                  title: "Career Support",
                  desc: "Resume review, portfolio guidance and job tips",
                },
                {
                  icon: Headphones,
                  title: "Lifetime Support",
                  desc: "Get help whenever you need it — even after you complete your course",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="enroll-why-card rounded-2xl border border-[rgba(45,212,191,0.15)] bg-navy-2/80 p-6 transition hover:border-[rgba(45,212,191,0.35)] hover:shadow-[0_0_30px_rgba(45,212,191,0.08)]"
                >
                  <div className="enroll-why-icon flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(45,212,191,0.1)] text-[#2dd4bf]">
                    <item.icon size={24} />
                  </div>
                  <h3 className="enroll-why-title mt-4 text-lg font-bold text-white">{item.title}</h3>
                  <p className="enroll-why-desc mt-2 text-sm text-text-muted">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="section-spacing">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
            <div
              className="enroll-cta-banner rounded-[20px] border border-[rgba(45,212,191,0.2)] p-12 text-center"
              style={{
                background: "linear-gradient(135deg, rgba(45,212,191,0.12), transparent)",
              }}
            >
              <h2 className="enroll-cta-title font-cormorant text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
                Not Sure Which Path to Choose?
              </h2>
              <p className="enroll-cta-sub mx-auto mt-3 max-w-xl text-sm text-text-muted">
                Talk to our advisor — we&apos;ll guide you to the right course or
                internship for your goals.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold text-black transition hover:brightness-110 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
                    boxShadow: "0 0 20px rgba(45,212,191,0.3)",
                  }}
                >
                  Get Free Counseling →
                </Link>
                <a
                  href="https://wa.me/923340007247"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="enroll-cta-outline inline-flex items-center justify-center gap-2 rounded-lg border border-[rgba(45,212,191,0.5)] bg-transparent px-6 py-3 text-sm font-semibold text-[#2dd4bf] transition hover:bg-[rgba(45,212,191,0.1)]"
                >
                  WhatsApp Us →
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <EnrollModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        item={modalItem}
      />
    </div>
  );
}

function CourseCard({
  course,
  onEnroll,
}: {
  course: Course;
  onEnroll: () => void;
}) {
  const IconComponent = ICON_MAP[course.icon] ?? Globe;
  return (
    <article
      className="enroll-course-card relative flex flex-col rounded-2xl border border-[rgba(45,212,191,0.15)] bg-navy-2/80 p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(45,212,191,0.4)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      style={{ padding: "24px" }}
    >
      {course.badge && (
        <span
          className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl px-2.5 py-1 text-[10px] font-bold tracking-wider text-black"
          style={{
            background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
          }}
        >
          {course.badge}
        </span>
      )}
      <p className="enroll-card-cat text-[10px] font-semibold uppercase tracking-widest text-[#2dd4bf]">
        {course.category}
      </p>
      <h3 className="enroll-card-title mt-2 text-[17px] font-bold text-white">{course.title}</h3>
      <p className="enroll-card-meta mt-2 flex items-center gap-2 text-xs text-text-muted">
        <span>{course.level}</span>
        <span>·</span>
        <span>{course.duration}</span>
      </p>
      <p className="enroll-card-desc mt-3 text-[13px] leading-relaxed text-text-muted">
        {course.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {course.topics.map((t) => (
          <span
            key={t}
            className="enroll-topic-pill rounded-full border border-[rgba(45,212,191,0.2)] bg-[rgba(45,212,191,0.08)] px-2.5 py-0.5 text-[11px] text-[#2dd4bf]"
          >
            {t}
          </span>
        ))}
      </div>
      <div className="enroll-course-price-wrap mt-5 flex items-end justify-between gap-2 pt-5">
        <div>
          {course.original && (
            <p className="enroll-price-original text-xs text-text-muted line-through">{course.original}</p>
          )}
          <p className="enroll-price-current text-[22px] font-bold text-[#2dd4bf]">{course.price}</p>
          <p className="enroll-cert-badge mt-0.5 flex items-center gap-1 text-xs text-amber-400/90">
            <Award size={12} />
            Certificate Included
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onEnroll}
        className="enroll-btn-enroll mt-5 w-full rounded-[10px] border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.1)] py-2.5 text-[13px] font-semibold text-[#2dd4bf] transition hover:border-transparent hover:bg-gradient-to-br hover:from-[#2dd4bf] hover:to-[#0d9488] hover:text-black"
      >
        Enroll Now
      </button>
    </article>
  );
}

function InternshipCard({
  internship,
  onApply,
}: {
  internship: (typeof INTERNSHIPS)[number];
  onApply: () => void;
}) {
  const IconComponent = ICON_MAP[internship.icon] ?? Code2;
  return (
    <article
      className="enroll-intern-card relative rounded-[20px] border border-[rgba(45,212,191,0.2)] bg-navy-2/80 p-8 transition duration-300 hover:-translate-y-1.5 hover:border-[rgba(45,212,191,0.5)] hover:shadow-[0_0_40px_rgba(45,212,191,0.1)]"
      style={{ padding: "32px" }}
    >
      {internship.badge && (
        <span
          className="absolute right-0 top-0 rounded-bl-xl rounded-tr-2xl px-2.5 py-1 text-[10px] font-bold tracking-wider text-black"
          style={{
            background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
          }}
        >
          {internship.badge}
        </span>
      )}
      <div className="enroll-intern-icon-wrap flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(45,212,191,0.15)] text-[#2dd4bf]">
        <IconComponent size={24} />
      </div>
      <h3 className="enroll-intern-title mt-5 text-[20px] font-bold text-white">{internship.title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="enroll-intern-pill rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.1)] px-2.5 py-0.5 text-xs text-[#2dd4bf]">
          {internship.duration}
        </span>
        <span className="enroll-intern-pill enroll-intern-pill-type rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.1)] px-2.5 py-0.5 text-xs text-[#2dd4bf]">
          {internship.type}
        </span>
      </div>
      <p className="enroll-intern-stipend mt-2 flex items-center gap-1.5 text-xs text-amber-400/90">
        <DollarSign size={14} />
        {internship.stipend}
      </p>
      <p className="enroll-intern-desc mt-4 text-[14px] leading-relaxed text-text-muted">
        {internship.description}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {internship.skills.map((s) => (
          <span
            key={s}
            className="enroll-skill-pill rounded-full border border-[rgba(45,212,191,0.2)] bg-[rgba(45,212,191,0.08)] px-2.5 py-0.5 text-[11px] text-[#2dd4bf]"
          >
            {s}
          </span>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        {internship.perks.map((perk) => (
          <div key={perk} className="flex items-center gap-2">
            <CheckCircle2 size={14} className="shrink-0 text-[#2dd4bf]" />
            <span className="enroll-perk-text text-[13px] text-white">{perk}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={onApply}
        className="mt-6 w-full rounded-xl py-3 text-[14px] font-bold tracking-wide text-black transition hover:brightness-110 hover:-translate-y-0.5 hover:shadow-[0_0_25px_rgba(45,212,191,0.4)]"
        style={{
          background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
        }}
      >
        Apply Now
      </button>
    </article>
  );
}
