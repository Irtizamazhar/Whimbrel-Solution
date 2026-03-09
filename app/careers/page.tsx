import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Coins,
  FileText,
  Gift,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Whimbrel Solution. Explore open positions, team culture, and internship perks.",
  alternates: {
    canonical: `${siteUrl}/careers`,
  },
};

const benefits = [
  {
    title: "Remote Work",
    description: "Flexible remote-first environment designed around output and ownership.",
    Icon: BriefcaseBusiness,
  },
  {
    title: "Competitive Salary",
    description: "Market-competitive compensation with growth-focused performance reviews.",
    Icon: Coins,
  },
  {
    title: "Growth Opportunities",
    description: "Mentorship, certifications, and clear progression paths across engineering roles.",
    Icon: Sparkles,
  },
  {
    title: "Great Culture",
    description: "Respectful, collaborative, and product-minded teams that value craftsmanship.",
    Icon: Users,
  },
];

const positions = [
  {
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Lead modern frontend architecture using Next.js, TypeScript, and reusable design systems.",
  },
  {
    title: "Backend Engineer (Node.js)",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description:
      "Build scalable APIs, optimize databases, and improve system reliability across production services.",
  },
  {
    title: "UI/UX Designer",
    department: "Design",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Design intuitive, high-converting interfaces backed by user research and product thinking.",
  },
  {
    title: "Project Manager",
    department: "Delivery",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Coordinate cross-functional teams, manage timelines, and ensure high-quality delivery outcomes.",
  },
  {
    title: "QA Engineer",
    department: "Quality Assurance",
    location: "Remote",
    type: "Full-time",
    description:
      "Own test planning, automation coverage, and release confidence for web and mobile products.",
  },
];

const internshipPerks = [
  {
    title: "Internship Offer Letter",
    description: "Receive a formal offer letter to kickstart your professional journey with us.",
    Icon: FileText,
  },
  {
    title: "Internship Certificate",
    description: "Get a verified certificate upon successful completion of your internship.",
    Icon: BadgeCheck,
  },
  {
    title: "Letter of Recommendation",
    description: "Outstanding interns receive a recommendation letter to boost their career.",
    Icon: Star,
  },
  {
    title: "Performance-Based Stipends",
    description: "Earn stipends based on your performance and project contributions.",
    Icon: Coins,
  },
  {
    title: "Exclusive Goodies & Gifts",
    description: "Receive goodies and appreciation gifts as recognition for your efforts.",
    Icon: Gift,
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-navy text-text">
      <Navbar />

      <main className="mx-auto w-full max-w-[1260px] px-5 pb-16 pt-28 md:px-8">
        <section className="mb-16">
          <h1 className="font-cormorant text-[clamp(2.6rem,7vw,4.8rem)] leading-none">
            Join Our Team
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-text-muted">Build the future with us</p>
          <Link
            href="#positions"
            className="mt-7 inline-flex rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:brightness-110"
            data-magnetic="true"
          >
            View Open Positions
          </Link>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-cormorant text-[clamp(2.1rem,5vw,3.2rem)]">Why Join Us</h2>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-teal/20 bg-navy-2 p-5 transition hover:border-teal/60 hover:shadow-[0_0_24px_rgba(0,201,167,0.14)]"
                data-cursor="view"
              >
                <item.Icon className="text-teal" size={23} />
                <h3 className="mt-4 font-cormorant text-3xl leading-tight text-text">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-center font-cormorant text-[clamp(2.1rem,5vw,3.2rem)]">
            Internship <span className="text-teal">Perks</span>
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-text-muted">
            We value our interns and offer a range of benefits to support their growth and
            experience.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {internshipPerks.map((perk) => (
              <article
                key={perk.title}
                className="rounded-2xl border border-teal/20 bg-navy-2 p-6 transition hover:-translate-y-1 hover:border-teal/60 hover:shadow-[0_0_24px_rgba(0,201,167,0.14)]"
                data-cursor="view"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal/12 text-teal">
                  <perk.Icon size={22} />
                </span>
                <h3 className="mt-4 font-cormorant text-3xl leading-tight text-text">{perk.title}</h3>
                <p className="mt-2 text-text-muted">{perk.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="positions">
          <h2 className="mb-6 font-cormorant text-[clamp(2.1rem,5vw,3.2rem)]">Open Positions</h2>
          <div className="space-y-4">
            {positions.map((job) => (
              <article
                key={job.title}
                className="rounded-2xl border border-teal/20 bg-navy-2 p-6 transition hover:border-teal/60"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-cormorant text-4xl leading-none text-text">{job.title}</h3>
                  <span className="rounded-full bg-teal/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-teal">
                    {job.department}
                  </span>
                </div>
                <p className="mt-2 text-sm text-text-muted">
                  {job.location} · {job.type}
                </p>
                <p className="mt-3 max-w-3xl text-text-muted">{job.description}</p>
                <Link
                  href={`/contact?position=${encodeURIComponent(job.title)}`}
                  className="mt-4 inline-flex rounded-full border border-teal/60 px-5 py-2 text-sm font-semibold text-teal transition hover:bg-teal hover:text-navy"
                  data-magnetic="true"
                >
                  Apply Now
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
