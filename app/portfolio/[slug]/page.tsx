import type { Metadata } from "next";
import Image from "next/image";
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
  const isCtsProject = project.slug === "cts";
  const isLaundryProject = project.slug === "my-laundry-thai";
  const isMyCrmSimProject = project.slug === "mycrmsim";
  const isBarayasProject = project.slug === "barayas-store";
  const isEleveInteriorProject = project.slug === "eleve-interior";
  const isOnmartProject = project.slug === "onmart";
  const isSurahYaseenProject = project.slug === "surah-yaseen";
  const generatedBannerStyles: Record<string, string> = {
    "one-dollar-shop":
      "linear-gradient(135deg, rgba(251,146,60,0.22), rgba(245,158,11,0.1) 45%, rgba(11,30,46,0.95))",
  };
  const hasGeneratedBanner = project.slug in generatedBannerStyles;
  const hasImageBanner =
    isCtsProject ||
    isLaundryProject ||
    isMyCrmSimProject ||
    isBarayasProject ||
    isEleveInteriorProject ||
    isOnmartProject ||
    isSurahYaseenProject;

  return (
    <div className="min-h-screen bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-28">
        <section className="section-spacing !pt-8">
          <div className="mx-auto w-full max-w-[1100px] px-5 md:px-8">
            {isCtsProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/cts-banner-v3.png"
                  alt="CTS banner"
                  width={1200}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isLaundryProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/my-laundry-banner-v2.png"
                  alt="My Laundry banner"
                  width={1200}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isMyCrmSimProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/mycrmsim-banner-v1.png"
                  alt="myCRMSIM banner"
                  width={1200}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isBarayasProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/barayas-banner-v1.png"
                  alt="Barayas banner"
                  width={1200}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isEleveInteriorProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/eleve-interior-banner-v1.png"
                  alt="Eleve Interior banner"
                  width={1200}
                  height={520}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isOnmartProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/onmart-banner-v1.png"
                  alt="OnMart Ramadan Bazaar hero banner"
                  width={1200}
                  height={560}
                  className="h-auto w-full object-cover"
                  priority
                />
              </div>
            )}
            {isSurahYaseenProject && (
              <div className="mb-6 overflow-hidden rounded-2xl border border-teal/20 bg-navy-2">
                <Image
                  src="/surah-yaseen-banner-v1.png"
                  alt="Surah Yaseen app banner"
                  width={1200}
                  height={500}
                  className="h-[clamp(220px,36vw,460px)] w-full object-cover"
                  priority
                />
              </div>
            )}
            {!hasImageBanner && hasGeneratedBanner && (
              <div
                className="mb-6 overflow-hidden rounded-2xl border border-teal/20 p-8 sm:p-10"
                style={{ background: generatedBannerStyles[project.slug] }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-teal/90">{project.category}</p>
                <h2 className="mt-3 font-cormorant text-[clamp(1.6rem,4vw,2.8rem)] leading-tight text-white">
                  {project.name}
                </h2>
                <p className="mt-3 max-w-3xl text-sm text-white/75 sm:text-base">
                  Premium case study banner crafted for {project.name}.
                </p>
              </div>
            )}
            <p className="text-xs uppercase tracking-[0.2em] text-teal">{project.category}</p>
            <h1 className="mt-3 font-cormorant text-[clamp(2.375rem,6vw,4.475rem)] leading-tight">
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
              {"url" in project && project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:bg-teal-light"
                >
                  Visit live site →
                </a>
              )}
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
