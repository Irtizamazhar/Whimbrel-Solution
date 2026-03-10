import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Services from "@/components/sections/Services";
import Contact from "@/components/sections/Contact";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Whimbrel Solution services: custom software, mobile apps, web development, AI/ML, and DevOps.",
  alternates: {
    canonical: `${siteUrl}/services`,
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
