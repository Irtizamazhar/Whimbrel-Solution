"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Portfolio from "@/components/sections/Portfolio";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

export default function Home() {
  const [loading, setLoading] = useState(true);

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
              className="relative flex h-32 w-32 items-center justify-center"
            >
              <motion.span
                className="absolute inset-0 rounded-full border border-teal/35"
                animate={{ rotate: 360, opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-[14px] rounded-full bg-teal/20 blur-xl"
                animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.45, 0.75, 0.45] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/whimbrel-logo.svg"
                  alt="Whimbrel logo"
                  width={92}
                  height={92}
                  priority
                />
              </motion.div>
            </motion.div>
            <motion.p
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1 }}
              className="font-cormorant text-3xl tracking-[0.12em] text-text"
            >
              WHIMBREL
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-navy text-text">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <About />
          <Services />
          <Portfolio />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
}
