"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";

type BlogCategory = "Technology" | "Design" | "Company News";

const filters = ["All", "Technology", "Design", "Company News"] as const;

const posts: Array<{
  title: string;
  category: BlogCategory;
  image: string;
  excerpt: string;
  author: string;
  date: string;
}> = [
  {
    title: "How We Architect Scalable Next.js Platforms",
    category: "Technology",
    image: "/blog/nextjs-architecture.svg",
    excerpt:
      "A practical guide to building high-performance App Router products with clean architecture and reliable deployment pipelines.",
    author: "Areeb Khan",
    date: "Mar 05, 2026",
  },
  {
    title: "Design Systems That Keep Product Teams Fast",
    category: "Design",
    image: "/blog/design-systems.svg",
    excerpt:
      "Why consistent components, tokens, and patterns reduce delivery friction and improve user trust across every screen.",
    author: "Hiba Rauf",
    date: "Feb 22, 2026",
  },
  {
    title: "Whimbrel Solution Opens New Islamabad Delivery Cell",
    category: "Company News",
    image: "/blog/company-expansion.svg",
    excerpt:
      "We are expanding our engineering operations to support larger products and faster project turnaround for clients.",
    author: "Team Whimbrel",
    date: "Feb 14, 2026",
  },
  {
    title: "Node.js API Security Checklist for Production Teams",
    category: "Technology",
    image: "/blog/node-security.svg",
    excerpt:
      "From auth hardening to rate limiting and observability, these patterns help teams ship secure backend services.",
    author: "Bilal Ahmed",
    date: "Jan 30, 2026",
  },
  {
    title: "From Wireframe to Polished Interface: Our UI Workflow",
    category: "Design",
    image: "/blog/ui-workflow.svg",
    excerpt:
      "A walkthrough of our UI/UX process that balances visual quality, clarity, and measurable product outcomes.",
    author: "Sana Tariq",
    date: "Jan 18, 2026",
  },
  {
    title: "Inside Our Sprint Rituals: Better Delivery, Less Chaos",
    category: "Company News",
    image: "/blog/sprint-rituals.svg",
    excerpt:
      "How we run planning, standups, and QA handoff to keep teams aligned and shipping consistently week after week.",
    author: "Operations Team",
    date: "Jan 04, 2026",
  },
];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return posts;
    return posts.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-navy text-text">
      <Navbar />

      <main className="mx-auto w-full max-w-[1260px] px-5 pb-16 pt-28 md:px-8">
        <section className="mb-10">
          <h1 className="font-cormorant text-[clamp(2.6rem,7vw,4.8rem)] leading-none">
            Our Blog
          </h1>
          <span className="mt-3 block h-1 w-28 rounded-full bg-teal" />
          <p className="mt-5 max-w-2xl text-lg text-text-muted">
            Insights, updates and stories from our team
          </p>
        </section>

        <section className="mb-8 flex flex-wrap gap-3">
          {filters.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeFilter === tab
                  ? "border-teal bg-teal text-navy"
                  : "border-teal/20 bg-navy-2 text-text-muted hover:text-text"
              }`}
            >
              {tab}
            </button>
          ))}
        </section>

        <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.title}
              className="group rounded-2xl border border-teal/20 bg-navy-2 p-4 transition duration-300 hover:-translate-y-1 hover:border-teal/60 hover:shadow-[0_0_28px_rgba(0,201,167,0.18)]"
              data-cursor="view"
            >
              <div className="mb-4 overflow-hidden rounded-xl border border-teal/20">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={640}
                  height={360}
                  className="h-44 w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="text-xs font-semibold uppercase tracking-[0.17em] text-teal">
                {post.category}
              </p>
              <h3 className="mt-2 font-cormorant text-3xl leading-tight text-text">{post.title}</h3>
              <p className="mt-2 overflow-hidden text-text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link
                href="/contact"
                className="mt-4 inline-block text-sm font-semibold text-teal transition hover:text-text"
              >
                Read More →
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
