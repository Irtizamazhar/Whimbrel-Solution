import type { Metadata } from "next";
import { Suspense } from "react";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import ContactMap from "@/components/sections/ContactMap";
import ContactFAQ from "@/components/sections/ContactFAQ";
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
    <div className="bg-navy text-text min-w-0 overflow-x-hidden">
      <Navbar />
      <main className="pt-24">
        <Suspense fallback={<div className="section-spacing" />}>
          <Contact />
        </Suspense>
        <div id="location-map" className="section-spacing min-h-[480px] scroll-mt-32 relative z-0">
          <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
            <h2 className="mb-4 font-cormorant text-lg text-text">Location</h2>
            <ContactMap />
          </div>
        </div>
        <ContactFAQ />
      </main>
      <Footer />
    </div>
  );
}
