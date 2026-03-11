import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import ServiceDetailContent from "@/components/ServiceDetailContent";
import { getServiceBySlug, getAllServiceSlugs } from "@/data/servicesData";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) {
    return { title: "Service Not Found" };
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
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <ServiceDetailContent service={service} />
      <Footer />
    </div>
  );
}
