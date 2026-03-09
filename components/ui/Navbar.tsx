"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/", path: "/" },
  { label: "About", href: "/about", path: "/about" },
  { label: "Services", href: "/services", path: "/services" },
  { label: "Portfolio", href: "/portfolio", path: "/portfolio" },
  { label: "Contact", href: "/contact", path: "/contact" },
  { label: "Blog", href: "/blog", path: "/blog" },
  { label: "Careers", href: "/careers", path: "/careers" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (item: (typeof navItems)[number]) => {
    if (!item.path) return false;
    if (item.path === "/") return pathname === "/";
    return pathname === item.path || pathname.startsWith(`${item.path}/`);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        scrolled && "nav-scrolled border-navy-4/90 backdrop-blur-xl",
      )}
    >
      <nav className="relative mx-auto flex h-20 w-full max-w-[1260px] items-center justify-center px-5 md:px-8 lg:justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Whimbrel Solution home"
          data-magnetic="true"
        >
          <Image
            src="/whimbrel-logo.svg"
            alt="Whimbrel Solution logo"
            width={44}
            height={44}
            priority
          />
          <span className="hidden leading-none sm:block">
            <span className="nav-brand-title block font-cormorant text-2xl uppercase tracking-[0.08em] text-text">
              Whimbrel
            </span>
            <span className="nav-brand-subtitle block text-[10px] font-semibold uppercase tracking-[0.24em] text-teal">
              Solution
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-10 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="nav-link group relative text-sm tracking-wide text-text-muted transition hover:text-text"
              data-cursor="link"
              data-magnetic="true"
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-teal transition-all duration-300",
                  isActive(item) ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Button href="/contact" variant="outline">
            Get a Quote
          </Button>
        </div>

        <button
          className="absolute left-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-teal/60 text-teal md:left-8 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          data-magnetic="true"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-30 bg-black/45 lg:hidden"
        onClick={() => setOpen(false)}
      />

      <motion.div
        initial={false}
        animate={{ x: open ? "0%" : "-100%" }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 top-0 z-40 h-screen w-80 max-w-[86vw] border-r border-navy-4 bg-navy p-7 lg:hidden"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute left-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal/60 text-teal transition hover:bg-teal/10"
          aria-label="Close menu"
          data-magnetic="true"
        >
          <X size={18} />
        </button>
        <div className="mt-24 flex flex-col gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "text-lg text-text-muted transition hover:text-text",
                isActive(item) && "text-teal",
              )}
              data-cursor="link"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <ThemeToggle />
          </div>
          <Button
            href="/contact"
            variant="primary"
            className="mt-4"
            magnetic={false}
          >
            Get a Quote
          </Button>
        </div>
      </motion.div>
    </header>
  );
}
