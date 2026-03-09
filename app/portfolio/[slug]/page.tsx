import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { portfolioProjects } from "@/lib/constants";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return portfolioProjects.map((project) => ({ slug: project.slug }));
}

type PortfolioDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PortfolioDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) return { title: "Case Study Not Found" };

  return {
    title: `${project.name} Case Study`,
    description: project.summary,
    alternates: {
      canonical: `${siteUrl}/portfolio/${slug}`,
    },
  };
}

export default async function PortfolioDetailPage({ params }: PortfolioDetailPageProps) {
  const { slug } = await params;
  const project = portfolioProjects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-navy text-text">
      <Navbar />
      <main className="pt-28">
        <section className="section-spacing">
          <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-teal">{project.category}</p>
            <h1 className="mt-3 font-cormorant text-[clamp(2.5rem,6vw,4.6rem)] leading-tight">
              {project.name}
            </h1>
            <p className="mt-4 max-w-3xl text-lg text-text-muted">{project.summary}</p>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <article className="rounded-xl border border-teal/20 bg-navy-2 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-teal">Timeline</p>
                <p className="mt-2 text-lg text-text">{project.timeline}</p>
              </article>
              <article className="rounded-xl border border-teal/20 bg-navy-2 p-4 md:col-span-2">
                <p className="text-xs uppercase tracking-[0.16em] text-teal">Tech Stack</p>
                <p className="mt-2 text-lg text-text">{project.stack}</p>
              </article>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <article className="rounded-xl border border-teal/20 bg-navy-2 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-teal">Challenge</p>
                <p className="mt-3 leading-relaxed text-text-muted">{project.challenge}</p>
              </article>
              <article className="rounded-xl border border-teal/20 bg-navy-2 p-5">
                <p className="text-xs uppercase tracking-[0.16em] text-teal">Solution</p>
                <p className="mt-3 leading-relaxed text-text-muted">{project.solution}</p>
              </article>
            </div>

            <article className="mt-4 rounded-xl border border-teal/20 bg-navy-2 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-teal">Impact</p>
              <p className="mt-3 leading-relaxed text-text">{project.impact}</p>
            </article>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:bg-teal-light"
              >
                Start Similar Project
              </Link>
              <Link
                href="/portfolio"
                className="rounded-full border border-teal/60 px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                Back to Portfolio
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
