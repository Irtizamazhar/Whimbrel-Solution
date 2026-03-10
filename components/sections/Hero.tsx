"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { fadeUp, stagger } from "@/lib/animations";

const particles = Array.from({ length: 15 }, (_, index) => ({
  id: index,
  left: `${(index * 11 + 7) % 100}%`,
  top: `${(index * 17 + 13) % 90}%`,
  delay: `${(index % 7) * 0.6}s`,
  duration: `${6 + (index % 5)}s`,
}));

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      <div className="hero-noise pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_42%,rgba(59,191,176,0.06),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,191,176,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,191,176,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
          }}
        />
      ))}

      <div className="relative mx-auto grid w-full max-w-[1260px] gap-14 px-5 md:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-3 rounded-full border border-teal/25 bg-teal-glow px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-muted"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
            Premium Software House · Pakistan
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-cormorant text-[clamp(3.1rem,9vw,5.5rem)] leading-[0.95] text-text"
          >
            We Engineer
            <br />
            <span className="text-teal italic">Digital</span>
            <br />
            Excellence
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="max-w-xl text-[clamp(1rem,2vw,1.15rem)] leading-relaxed text-text-muted"
          >
            Whimbrel Solution builds resilient digital products for startups and
            enterprises. We blend engineering precision with design elegance to
            accelerate growth and create lasting competitive advantage.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
            <Button href="#portfolio">View Our Work</Button>
            <Button href="#contact" variant="outline">
              Start a Project →
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative hidden min-h-[470px] lg:block"
        >
          <div className="absolute -right-8 top-3 text-[240px] font-cormorant text-white/5">
            W
          </div>
          <div className="absolute left-8 top-14 h-72 w-72 animate-float rounded-3xl border border-teal/25 bg-navy-2/70 p-5 shadow-[0_0_70px_rgba(59,191,176,0.12)]">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.16em] text-teal">System Health</p>
              <span className="h-2.5 w-2.5 rounded-full bg-teal" />
            </div>
            <div className="mt-4 rounded-xl border border-teal/25 bg-navy/55 p-3">
              <div className="mb-2 flex items-center gap-2">
                <Image src="/whimbrel-logo.png" alt="Whimbrel mark" width={22} height={22} />
                <span className="text-xs text-text">Whimbrel Solution</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 rounded-full bg-teal/20">
                  <span className="block h-full w-[78%] rounded-full bg-teal/75" />
                </div>
                <div className="h-2 rounded-full bg-teal/20">
                  <span className="block h-full w-[62%] rounded-full bg-teal/65" />
                </div>
                <div className="h-2 rounded-full bg-teal/20">
                  <span className="block h-full w-[89%] rounded-full bg-teal/80" />
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-teal/20 bg-navy/40 p-2">
                <p className="text-text-muted">Uptime</p>
                <p className="text-text">99.98%</p>
              </div>
              <div className="rounded-lg border border-teal/20 bg-navy/40 p-2">
                <p className="text-text-muted">Latency</p>
                <p className="text-text">42ms</p>
              </div>
            </div>
          </div>
          <div className="absolute right-3 top-36 h-48 w-48 animate-float rounded-2xl border border-teal/45 bg-navy-3/70 p-4 [animation-delay:-1.2s]">
            <p className="text-[10px] uppercase tracking-[0.18em] text-teal">Live Pipeline</p>
            <div className="mt-3 space-y-2">
              <div className="rounded-md border border-teal/20 bg-navy/45 px-2 py-1 text-[11px] text-text">
                Discovery ✓
              </div>
              <div className="rounded-md border border-teal/20 bg-navy/45 px-2 py-1 text-[11px] text-text">
                Design ✓
              </div>
              <div className="rounded-md border border-teal/35 bg-teal/10 px-2 py-1 text-[11px] text-teal">
                Development →
              </div>
            </div>
            <div className="mt-4 h-16 rounded-lg border border-teal/20 bg-navy/45 p-2">
              <div className="h-full w-full rounded bg-[linear-gradient(90deg,rgba(59,191,176,0.15),rgba(59,191,176,0.6),rgba(59,191,176,0.15))]" />
            </div>
          </div>
          <div className="absolute bottom-12 left-16 w-[75%] rounded-2xl border border-navy-4 bg-navy-2/90 p-5 shadow-[0_25px_90px_rgba(0,0,0,0.45)]">
            <div className="mb-3 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            </div>
            <pre className="overflow-hidden font-mono text-xs leading-relaxed text-text-muted">
              <code>
                {`const Product = () => {\n  return <Experience tier="premium" />\n}\n\nship({\n  speed: "fast",\n  quality: "world-class"\n})`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
