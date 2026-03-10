import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import TeamSection from "@/components/sections/TeamSection";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Team",
  description:
    "Meet the team behind Whimbrel Solution — engineers, designers, and product specialists building premium digital products.",
  alternates: {
    canonical: `${siteUrl}/team`,
  },
};

export default function TeamPage() {
  return (
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
}
