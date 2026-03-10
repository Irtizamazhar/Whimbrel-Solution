import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Portfolio from "@/components/sections/Portfolio";
import Contact from "@/components/sections/Contact";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Read project case studies from Whimbrel Solution across fintech, healthcare, retail, logistics, and BI.",
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
};

export default function PortfolioPage() {
  return (
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
