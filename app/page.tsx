"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Technology from "@/components/sections/Technology";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

function getLoaderLogoSrc(): string {
  if (typeof document === "undefined") return "/whimbrel-logo-dark.png";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "/whimbrel-logo.png"
    : "/whimbrel-logo-dark.png";
}

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loaderLogo, setLoaderLogo] = useState("/whimbrel-logo-dark.png");

  useEffect(() => {
    setLoaderLogo(getLoaderLogoSrc());
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 320);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="fixed inset-0 z-[130] flex flex-col items-center justify-center gap-4 bg-navy"
          >
          <motion.div
              initial={{ opacity: 1, scale: 1, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.12 }}
              className="relative flex h-40 w-40 items-center justify-center sm:h-48 sm:w-48"
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-teal/35"
                animate={{ rotate: 360, opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-[18px] rounded-full bg-teal/20 blur-xl sm:inset-6"
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="relative h-28 w-28 sm:h-36 sm:w-36"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src={loaderLogo}
                  alt="Whimbrel logo"
                  fill
                  sizes="(max-width: 640px) 112px, 144px"
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="text-center"
            >
              <p className="font-cormorant text-3xl tracking-[0.12em] text-text sm:text-4xl">
                WHIMBREL
              </p>
              <p
                className="font-cormorant text-2xl tracking-[0.2em] text-teal sm:text-3xl"
                style={{
                  textShadow: "0 0 24px rgba(59, 191, 176, 0.8), 0 0 48px rgba(59, 191, 176, 0.4)",
                }}
              >
                SOLUTION
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-navy text-text min-w-0 overflow-x-hidden">
        <Navbar />
        <main>
          <Hero />
          <Technology />
          <About />
          <Portfolio />
          <Testimonials />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
