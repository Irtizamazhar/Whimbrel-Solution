import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import { siteUrl } from "@/lib/seo";

const serviceContent: Record<
  string,
  { title: string; description: string; bullets: string[] }
> = {
  "custom-software": {
    title: "Custom Software Development",
    description:
      "Purpose-built software systems tailored to your operations, growth model, and market requirements.",
    bullets: [
      "Domain-driven architecture and scalable backend",
      "Secure APIs and high-performance web interfaces",
      "Long-term maintenance and iterative delivery",
    ],
  },
  "mobile-apps": {
    title: "Mobile App Development",
    description:
      "Native-like mobile experiences for Android and iOS with robust backend integration.",
    bullets: [
      "Cross-platform development with premium UI",
      "Offline support and real-time sync options",
      "Analytics, crash tracking, and release automation",
    ],
  },
  "ai-solutions": {
    title: "AI Chatbot & Automation",
    description:
      "Intelligent AI chatbots, automation workflows, and smart assistants for your business.",
    bullets: [
      "AI chatbots trained on your business data (FAQs, services)",
      "Automation workflows and smart assistants",
      "24/7 Urdu + English support and lead collection",
    ],
  },
  devops: {
    title: "Cloud & DevOps",
    description:
      "Reliable cloud infrastructure, CI/CD pipelines, and observability to improve delivery velocity.",
    bullets: [
      "Infrastructure automation and secure deployments",
      "Monitoring, logging, and incident response setup",
      "Cost optimization and performance tuning",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(serviceContent).map((slug) => ({ slug }));
}

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceContent[slug];
  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: service.title,
    description: service.description,
    alternates: {
      canonical: `${siteUrl}/services/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailProps) {
  const { slug } = await params;
  const service = serviceContent[slug];
  if (!service) notFound();

  return (
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-28">
        <section className="section-spacing">
          <div className="mx-auto w-full max-w-[960px] px-5 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-teal">Service Detail</p>
            <h1 className="mt-3 font-cormorant text-[clamp(2.3rem,6vw,4rem)] leading-tight text-text">
              {service.title}
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-text-muted">
              {service.description}
            </p>

            <ul className="mt-8 grid gap-3 rounded-2xl border border-navy-4 bg-navy-2/60 p-6">
              {service.bullets.map((bullet) => (
                <li key={bullet} className="flex items-center gap-3 text-text">
                  <span className="h-2 w-2 rounded-full bg-teal" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="rounded-full border border-teal bg-teal px-6 py-3 text-sm font-semibold text-navy transition hover:bg-teal-light"
              >
                Start a Project
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-teal/60 px-6 py-3 text-sm font-semibold text-teal transition hover:bg-teal/10"
              >
                Back to Services
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
