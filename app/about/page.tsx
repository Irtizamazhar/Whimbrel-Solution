import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import AboutDetails from "@/components/sections/AboutDetails";
import Contact from "@/components/sections/Contact";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Whimbrel Solution, a Pakistan-based software house focused on premium product engineering.",
  alternates: {
    canonical: `${siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="bg-navy text-text">
      <Navbar />
      <main className="pt-24">
        <AboutDetails />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
