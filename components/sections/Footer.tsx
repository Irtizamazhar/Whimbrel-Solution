"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
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
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
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
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        className="w-full border-b border-navy-4 bg-transparent pb-2 text-text outline-none placeholder:text-text-muted focus:border-teal"
        required
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading}
        className="rounded-full border border-teal/50 px-4 py-2 text-sm text-teal transition hover:bg-teal/10 disabled:opacity-60"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isContactPage = pathname === "/contact";

  return (
    <footer className="border-t border-navy-4 bg-navy-2/60 pb-6 pt-10 sm:pb-8 sm:pt-14">
      <div className="mx-auto w-full max-w-[1260px] px-4 sm:px-5 md:px-8">
        <div className="mb-8 border-b border-navy-4 pb-8 sm:mb-10 sm:pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <Link
              href={isContactPage ? "#location-map" : "/"}
              className="flex flex-wrap items-center gap-3 transition opacity-90 hover:opacity-100 sm:gap-4"
              scroll={isContactPage}
              onClick={() => {
                if (isContactPage) window.dispatchEvent(new CustomEvent("focusMap"));
              }}
            >
              <Image src="/whimbrel-logo.png" alt="Whimbrel logo" width={40} height={40} className="h-9 w-9 sm:h-[46px] sm:w-[46px]" />
              <div className="min-w-0">
                <p className="font-cormorant text-xl text-text sm:text-3xl">Whimbrel Solution</p>
                <p className="text-xs text-text-muted sm:text-sm">
                  Premium digital engineering for world-class products.
                </p>
              </div>
            </Link>
          </div>
        </div>

        <div className="grid gap-6 border-b border-navy-4 pb-8 sm:gap-8 sm:pb-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Company</p>
            <ul className="space-y-2">
              {footerColumns.company.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-text-muted transition hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Services</p>
            <ul className="space-y-2">
              {footerColumns.services.map((item) => (
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
            <ul className="space-y-2">
              {footerColumns.social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted transition hover:text-text"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm uppercase tracking-[0.18em] text-teal">Newsletter</p>
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 text-xs text-text-muted sm:mt-7 sm:gap-3 sm:text-sm">
          <p>© {new Date().getFullYear()} Whimbrel Solution. All rights reserved.</p>
          <p>Made in Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
