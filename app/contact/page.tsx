import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your software project with Whimbrel Solution. Contact our team via form, email, or WhatsApp.",
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-navy text-text">
      <Navbar />
      <main className="pt-24">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
