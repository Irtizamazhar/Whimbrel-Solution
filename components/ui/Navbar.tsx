"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import Button from "./Button";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/", path: "/" },
  { label: "About", href: "/about", path: "/about" },
  { label: "Services", href: "/services", path: "/services" },
  { label: "Team", href: "/team", path: "/team" },
  { label: "Portfolio", href: "/portfolio", path: "/portfolio" },
  { label: "Blog", href: "/blog", path: "/blog" },
  { label: "Careers", href: "/careers", path: "/careers" },
  { label: "Contact", href: "/contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

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
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300 overflow-x-hidden",
        scrolled && "nav-scrolled border-navy-4/90 backdrop-blur-xl",
      )}
    >
      <nav className="relative mx-auto flex h-24 w-full max-w-[1280px] items-center px-4 sm:px-5 md:px-6 xl:px-10">
        {/* Logo: center on mobile, left from lg */}
        <div className="flex flex-1 items-center justify-center lg:justify-start">
          <Link
            href="/"
            className="group flex items-center gap-2.5"
            aria-label="Whimbrel Solution home"
            data-magnetic="true"
          >
            <img
              src="/whimbrel-logo.png"
              alt="Whimbrel Solution"
              width={180}
              height={90}
              className="h-32 w-auto max-h-40 object-contain object-center brightness-110 contrast-110 sm:h-40 sm:max-h-[11rem] lg:object-left"
              fetchPriority="high"
            />
          </Link>
        </div>

        {/* Nav links + Theme + Button: single row, only from lg so theme never wraps above Contact */}
        <div className="hidden flex-nowrap items-center gap-3 lg:flex xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-link group relative inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap text-[13px] font-medium tracking-[0.01em] transition-colors duration-200 xl:text-[0.95rem]",
                "text-white/85 hover:text-white",
                isActive(item) && "nav-link-active !text-[#2dd4bf] !font-semibold [data-theme='light']:!text-[#0d9488]",
              )}
              data-cursor="link"
              data-magnetic="true"
            >
              {item.label}
              <span
                className={cn(
                  "nav-link-underline absolute -bottom-1 left-0 h-px bg-teal transition-all duration-300",
                  "[data-theme='light']:bg-[#0d9488]",
                  isActive(item) ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
          <div className="ml-2 flex shrink-0 items-center gap-3 xl:ml-4 xl:gap-5">
            <ThemeToggle />
            <Button href="/contact" variant="outline">
              Get a Quote
            </Button>
          </div>
        </div>

        {/* Hamburger: below lg, left side */}
        <button
          className="absolute left-5 top-1/2 inline-flex h-11 min-h-[44px] w-11 min-w-[44px] -translate-y-1/2 items-center justify-center rounded-full border border-teal/60 text-teal lg:left-8 lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          data-magnetic="true"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <>
            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[99998] bg-black/45 lg:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={false}
              animate={{ opacity: open ? 1 : 0, y: open ? 0 : "-100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="nav-mobile-overlay fixed inset-0 z-[99999] flex flex-col items-center justify-center px-6 py-20 lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile menu"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="absolute right-5 top-5 z-10 flex h-12 min-h-[44px] w-12 min-w-[44px] items-center justify-center rounded-full border border-teal/60 text-teal transition hover:bg-teal/10"
                aria-label="Close menu"
                data-magnetic="true"
              >
                <X size={22} />
              </button>
              <nav className="flex flex-1 flex-col items-center justify-center gap-7">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-[1.4rem] font-bold text-white/90 transition hover:text-white",
                      isActive(item) && "!text-teal [data-theme='light']:!text-[#0d9488]",
                    )}
                    data-cursor="link"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-8">
                <ThemeToggle />
                <Button
                  href="/contact"
                  variant="primary"
                  className="mt-6 min-h-[44px] w-full min-w-[200px]"
                  magnetic={false}
                  onClick={() => setOpen(false)}
                >
                  Get a Quote
                </Button>
              </div>
            </motion.div>
          </>,
          document.body,
        )}
    </header>
  );
}
