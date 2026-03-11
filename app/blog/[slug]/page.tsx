import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { getPostBySlug, getAllBlogSlugs } from "@/data/blog";
import { siteUrl } from "@/lib/seo";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="mx-auto w-full max-w-[800px] px-5 pb-16 pt-28 md:px-8">
        <Link
          href="/blog"
          className="mb-8 inline-block text-sm font-semibold uppercase tracking-[0.14em] text-teal transition hover:text-teal-light"
        >
          ← Back to Blog
        </Link>
        <article>
          <p className="text-xs font-semibold uppercase tracking-[0.17em] text-teal">
            {post.category}
          </p>
          <h1 className="mt-2 font-cormorant text-[clamp(2.2rem,5vw,3.5rem)] leading-tight text-text">
            {post.title}
          </h1>
          <div className="mt-4 flex items-center gap-4 text-sm text-text-muted">
            <span>{post.author}</span>
            <span>{post.date}</span>
          </div>
          <div className="mt-8 overflow-hidden rounded-xl border border-teal/20">
            <Image
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              className="h-56 w-full object-cover sm:h-72"
            />
          </div>
          <p className="mt-6 text-lg leading-relaxed text-text-muted">{post.excerpt}</p>
          <div className="mt-6 space-y-4 text-text-muted">
            {post.body.split("\n").map((para, i) => (
              <p key={i} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </article>
        <div className="mt-10 border-t border-navy-4 pt-8">
          <Link
            href="/contact"
            className="inline-flex rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:bg-teal-light"
          >
            Discuss with us
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
