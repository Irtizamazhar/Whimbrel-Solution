"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { Linkedin, Instagram, Facebook } from "lucide-react";
import { toast } from "sonner";

const footerColumns = {
  company: [
    { label: "About", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "AI Chatbot & Automation", href: "/services/ai-solutions" },
    { label: "DevOps", href: "/services/devops" },
  ],
  academy: [
    { label: "IT Courses", href: "/enroll?tab=courses" },
    { label: "Internships", href: "/enroll?tab=internships" },
    { label: "Enroll Now", href: "/enroll" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/whimbrel-solution/", icon: Linkedin },
    { label: "Instagram", href: "https://www.instagram.com/whimbrelsolutions9?igsh=MWFsY21wODRjbGVmNQ==", icon: Instagram },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=100083014608497", icon: Facebook },
  ],
};

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Subscription failed.");
        return;
      }
      toast.success("Subscribed successfully!");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="newsletter-form flex flex-col gap-3 sm:flex-row sm:items-end">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="newsletter-email-input min-h-[44px] w-full min-w-0 flex-1 border-b border-navy-4 bg-transparent px-1 pb-3 pt-2 text-[15px] text-text outline-none placeholder:text-text-muted focus:border-teal sm:min-w-[220px] sm:px-2"
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full border border-teal/50 px-4 py-2.5 text-sm text-teal transition hover:bg-teal/10 disabled:opacity-60 min-h-[44px] sm:flex-shrink-0"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <footer className="site-footer border-t border-navy-4 bg-navy-2/60 pb-6 pt-10 sm:pb-8 sm:pt-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
        <div className="mb-8 border-b border-navy-4 pb-8 sm:mb-10 sm:pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-center sm:mt-8 sm:justify-start sm:gap-4 sm:text-left">
            <Link
              href={isContactPage ? "#location-map" : "/"}
              className="flex flex-wrap items-center gap-3 transition hover:opacity-95 sm:gap-4"
              scroll={isContactPage}
              onClick={() => {
                if (isContactPage) window.dispatchEvent(new CustomEvent("focusMap"));
              }}
            >
              <Image src="/whimbrel-logo-3.png" alt="Whimbrel logo" width={100} height={100} className="footer-logo-img h-20 w-20 sm:h-[100px] sm:w-[100px]" />
              <div className="min-w-0">
                <p className="font-cormorant text-xl text-text sm:text-3xl">Whimbrel Solution</p>
                <p className="text-xs text-text-muted sm:text-sm">
                  Premium digital engineering for world-class products.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 border-b border-navy-4 pb-8 sm:gap-8 sm:pb-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="w-full">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Company</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-2">
              {footerColumns.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted transition hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Services</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-2">
              {footerColumns.services.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted transition hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Academy</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-col sm:gap-2">
              {footerColumns.academy.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted transition hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Social</p>
            <ul className="flex flex-wrap items-center gap-3">
              {mounted
                ? footerColumns.social.map((item) => {
                    const Icon = item.icon;
                    return (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/30 bg-teal/5 text-teal transition hover:border-teal/60 hover:bg-teal/15 hover:text-teal"
                          aria-label={item.label}
                        >
                          <Icon size={20} />
                        </Link>
                      </li>
                    );
                  })
                : footerColumns.social.map((item) => (
                    <li key={item.label}>
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/30 bg-teal/5 text-teal"
                        aria-hidden
                      />
                    </li>
                  ))}
            </ul>
          </div>
          <div className="w-full">
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Newsletter</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center text-center gap-2 text-xs text-text-muted sm:mt-7 sm:gap-3 sm:text-sm">
          <p>© {new Date().getFullYear()} Whimbrel Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
