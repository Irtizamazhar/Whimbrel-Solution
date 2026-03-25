"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { blogPosts, blogFilters } from "@/data/blog";

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState<(typeof blogFilters)[number]>("All");

  const filteredPosts = useMemo(() => {
    if (activeFilter === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />

      <main className="mx-auto w-full max-w-[1260px] px-5 pb-16 pt-28 md:px-8">
        <section className="mb-10">
          <h1 className="font-cormorant text-[clamp(1.45rem,4.4vw,2.7rem)] leading-none">
            Our Blog
          </h1>
          <span className="mt-3 block h-1 w-28 rounded-full bg-teal" />
          <p className="mt-5 max-w-2xl text-lg text-text-muted">
            Insights, updates and stories from our team
          </p>
        </section>

        <section className="mb-8 flex flex-wrap gap-3">
          {blogFilters.map((tab) => (
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
              key={post.slug}
              className="group rounded-2xl border border-teal/20 bg-navy-2 p-4 transition duration-300 hover:-translate-y-1 hover:border-teal/60 hover:shadow-[0_0_28px_rgba(0,201,167,0.18)]"
              data-cursor="view"
            >
              <Link href={`/blog/${post.slug}`} className="block">
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
                <h3 className="mt-2 font-cormorant text-xl leading-tight text-text">
                  {post.title}
                </h3>
                <p className="mt-2 overflow-hidden text-text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between text-sm text-text-muted">
                  <span>{post.author}</span>
                  <span>{post.date}</span>
                </div>
                <span className="mt-4 inline-block text-sm font-semibold text-teal transition group-hover:text-text">
                  Read More →
                </span>
              </Link>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
