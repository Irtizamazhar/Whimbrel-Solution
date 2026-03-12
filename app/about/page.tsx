import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import AboutDetails from "@/components/sections/AboutDetails";
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
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <AboutDetails />
      </main>
      <Footer />
    </div>
  );
}
