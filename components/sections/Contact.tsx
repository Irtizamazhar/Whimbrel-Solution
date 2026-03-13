"use client";

import { FormEvent, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const SERVICE_OPTIONS = [
  "Select a service",
  "Custom Software Development",
  "Mobile App Development",
  "Web Development",
  "AI Chatbot & Automation",
  "Cloud & DevOps",
  "UI/UX Design",
];

const INFO_CARDS = [
  {
    icon: Mail,
    label: "EMAIL US",
    value: "info@whimbrelsolutions.com",
    sub: "Send us an email anytime",
    href: "mailto:info@whimbrelsolutions.com",
  },
  {
    icon: Phone,
    label: "CALL US",
    value: "+92 336 3893891",
    sub: "Mon–Fri · 9am to 6pm",
    ptcl: "PTCL: (051-2000109)",
    href: "https://wa.me/923363893891",
  },
  {
    icon: MapPin,
    label: "VISIT US",
    value: "Office No.09 3rd Floor United Plaza Fazl-e-Haq Road Blue Area Islamabad",
    sub: "Come say hello at our office",
    href: "#location-map",
  },
  {
    icon: Clock,
    label: "HOURS",
    value: "Mon–Fri: 9AM–6PM",
    sub: "Pakistan Standard Time",
    href: null as string | null,
  },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const position = searchParams.get("position");
  const isContactPage = pathname === "/contact";

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    const text = [
      "Assalam o Alaikum,",
      "I submitted the Whimbrel contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      position ? `Applying for position: ${position}` : `Service: ${service}`,
      `Project Details: ${details}`,
    ].join("\n");
    const whatsappUrl = `https://wa.me/923363893891?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setLoading(false);
    form.reset();
    setSubmitted(true);
    toast.success("WhatsApp chat opened. Please tap send to deliver your message.");
  };

  return (
    <>
      <style>{`
        .contact-section-blob-1 {
          position: absolute;
          top: -100px;
          left: -100px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: rgba(45,212,191,0.06);
          filter: blur(80px);
          pointer-events: none;
        }
        .contact-section-blob-2 {
          position: absolute;
          bottom: -100px;
          right: -100px;
          width: 500px;
          height: 500px;
          border-radius: 50%;
          background: rgba(45,212,191,0.04);
          filter: blur(100px);
          pointer-events: none;
        }
        [data-theme="light"] .contact-section-blob-1,
        [data-theme="light"] .contact-section-blob-2 {
          background: rgba(13,148,136,0.05);
        }
        .contact-get-in-touch-banner {
          background: linear-gradient(135deg, #0d4f4a 0%, #0a3330 50%, #061a18 100%);
          color: #fff;
        }
        [data-theme="light"] .contact-get-in-touch-banner {
          background: linear-gradient(135deg, #0d9488 0%, #0f766e 55%, #115e59 100%);
          color: #fff;
        }
        .contact-left-pill {
          background: rgba(45,212,191,0.1);
          border: 1px solid rgba(45,212,191,0.3);
          color: #2dd4bf;
        }
        [data-theme="light"] .contact-left-pill {
          background: rgba(13,148,136,0.08);
          border: 1px solid rgba(13,148,136,0.25);
          color: #0d9488;
        }
        .contact-form-card input,
        .contact-form-card select,
        .contact-form-card textarea {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 15px;
          color: #fff;
          font-size: 14px;
          width: 100%;
          transition: all 0.25s ease;
        }
        .contact-form-card input::placeholder,
        .contact-form-card textarea::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .contact-form-card input:focus,
        .contact-form-card select:focus,
        .contact-form-card textarea:focus {
          outline: none;
          border-color: rgba(45,212,191,0.7);
          background: rgba(45,212,191,0.05);
          box-shadow: 0 0 0 3px rgba(45,212,191,0.1);
        }
        .contact-form-card input:-webkit-autofill,
        .contact-form-card input:-webkit-autofill:hover,
        .contact-form-card input:-webkit-autofill:focus,
        .contact-form-card textarea:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #0b1520 inset !important;
          -webkit-text-fill-color: #ffffff !important;
        }
        [data-theme="light"] .contact-form-card {
          background: #ffffff !important;
          border: 1px solid rgba(13,148,136,0.15) !important;
          box-shadow: 0 8px 40px rgba(0,0,0,0.08) !important;
        }
        [data-theme="light"] .contact-form-card input,
        [data-theme="light"] .contact-form-card select,
        [data-theme="light"] .contact-form-card textarea {
          background: rgba(0,0,0,0.03);
          border-color: rgba(0,0,0,0.1);
          color: #111;
        }
        [data-theme="light"] .contact-form-card input::placeholder,
        [data-theme="light"] .contact-form-card textarea::placeholder {
          color: rgba(0,0,0,0.4);
        }
        [data-theme="light"] .contact-form-card input:focus,
        [data-theme="light"] .contact-form-card select:focus,
        [data-theme="light"] .contact-form-card textarea:focus {
          border-color: rgba(13,148,136,0.6);
          background: rgba(13,148,136,0.04);
          box-shadow: 0 0 0 3px rgba(13,148,136,0.12);
        }
        [data-theme="light"] .contact-form-card input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #f0fdfa inset !important;
          -webkit-text-fill-color: #111 !important;
        }
        .contact-info-card:hover::before {
          opacity: 1;
        }
        .contact-info-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #2dd4bf, transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .contact-info-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(45,212,191,0.15);
        }
        .contact-info-card:hover {
          border-color: rgba(45,212,191,0.4);
          background: rgba(45,212,191,0.04);
          box-shadow: 0 12px 40px rgba(45,212,191,0.1);
          transform: translateY(-6px);
        }
        [data-theme="light"] .contact-info-card::before {
          background: linear-gradient(90deg, transparent, #0d9488, transparent);
        }
        [data-theme="light"] .contact-info-card {
          background: #ffffff !important;
          border: 1px solid rgba(13,148,136,0.2) !important;
          box-shadow: 0 4px 24px rgba(0,0,0,0.06) !important;
        }
        [data-theme="light"] .contact-info-card:hover {
          border-color: rgba(13,148,136,0.5) !important;
          box-shadow: 0 8px 32px rgba(13,148,136,0.12) !important;
          transform: translateY(-6px);
        }
        [data-theme="light"] .contact-info-card .contact-card-label {
          color: rgba(0,0,0,0.4) !important;
        }
        [data-theme="light"] .contact-info-card .contact-card-value {
          color: #0d9488 !important;
          font-weight: 600;
        }
        [data-theme="light"] .contact-info-card .contact-card-sub {
          color: rgba(0,0,0,0.45) !important;
        }
        [data-theme="light"] .contact-info-card .contact-card-icon-wrap {
          background: rgba(13,148,136,0.08) !important;
          border: 1px solid rgba(13,148,136,0.2) !important;
          color: #0d9488 !important;
        }
        .contact-left-benefit-icon {
          background: rgba(45,212,191,0.1);
          color: #2dd4bf;
        }
        [data-theme="light"] .contact-left-benefit-icon {
          background: rgba(13,148,136,0.08);
          color: #0d9488;
        }
        [data-theme="light"] .contact-left-heading {
          color: #111111 !important;
        }
        [data-theme="light"] .contact-left-heading .contact-left-heading-accent {
          color: #0d9488 !important;
        }
        [data-theme="light"] .contact-left-subtext {
          color: rgba(0,0,0,0.55) !important;
        }
        [data-theme="light"] .contact-left-benefit-text {
          color: rgba(0,0,0,0.65) !important;
        }
        [data-theme="light"] .contact-form-heading {
          color: #111111 !important;
        }
        [data-theme="light"] .contact-form-sub {
          color: rgba(0,0,0,0.5) !important;
        }
        [data-theme="light"] .contact-connect-heading {
          color: #111 !important;
        }
        [data-theme="light"] .contact-connect-sub {
          color: rgba(0,0,0,0.6) !important;
        }
        [data-theme="light"] .contact-connect-accent {
          color: #0d9488 !important;
        }
        [data-theme="light"] .contact-success-title,
        [data-theme="light"] .contact-success-p {
          color: #111 !important;
        }
        [data-theme="light"] .contact-success-small {
          color: rgba(0,0,0,0.5) !important;
        }
        [data-theme="light"] .contact-position-badge {
          color: #0d9488 !important;
        }
        [data-theme="light"] .contact-position-badge span {
          color: #111 !important;
        }
        .contact-form-card label {
          color: #2dd4bf;
        }
        [data-theme="light"] .contact-form-card label {
          color: #0d9488;
        }
        @keyframes contactShimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      <section
        id="contact"
        className="relative overflow-hidden py-0"
      >
        {/* GET IN TOUCH BANNER — only on Contact page */}
        {isContactPage && (
        <div className="contact-get-in-touch-banner py-16 text-center sm:py-20">
          <div className="mx-auto max-w-[800px] px-4 sm:px-6">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-[2.75rem]">
              Get In Touch
            </h2>
            <p className="mt-4 text-base text-white/90 sm:text-lg [data-theme='light']:text-white/95">
              Ready to transform your business? Let&apos;s discuss your project and
              explore how we can help you achieve your goals.
            </p>
          </div>
        </div>
        )}

        <div className="relative bg-navy py-[60px] [data-theme='light']:bg-[#f5f9fc]">
          <div className="contact-section-blob-1" aria-hidden />
          <div className="contact-section-blob-2" aria-hidden />

        <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-5 md:px-6 xl:px-10">
          {/* Contact page: Multiple Ways to Connect first, then form below */}
          {isContactPage && (
            <>
              <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 [data-theme='light']:rounded-2xl [data-theme='light']:bg-white [data-theme='light']:py-10 [data-theme='light']:shadow-sm">
                <h3 className="text-2xl font-bold tracking-tight text-white contact-connect-heading sm:text-3xl [data-theme='light']:text-[#111]">
                  Multiple Ways to{" "}
                  <span className="contact-connect-accent text-[#2dd4bf] [data-theme='light']:text-[#0d9488]">
                    Connect
                  </span>
                </h3>
                <p className="mt-3 text-sm text-white/55 contact-connect-sub [data-theme='light']:text-[rgba(0,0,0,0.6)] sm:text-base">
                  Choose the most convenient way to reach out to us
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 lg:mt-10 lg:grid-cols-4">
                {INFO_CARDS.map((card, index) => {
                  const Icon = card.icon;
                  const valueEl = card.href ? (
                    <span className="contact-card-value block text-[15px] font-semibold text-[#2dd4bf] transition hover:underline">
                      {card.value}
                    </span>
                  ) : (
                    <p className="contact-card-value text-[15px] font-semibold text-[#2dd4bf]">
                      {card.value}
                    </p>
                  );
                  const content = (
                    <>
                      <div
                        className="contact-card-icon-wrap mb-5 flex h-12 w-12 min-h-[44px] min-w-[44px] items-center justify-center rounded-xl text-[#2dd4bf]"
                        style={{
                          background: "rgba(45,212,191,0.1)",
                          border: "1px solid rgba(45,212,191,0.2)",
                        }}
                      >
                        <Icon size={22} strokeWidth={2} />
                      </div>
                      <p className="contact-card-label mb-2 text-[10px] font-semibold uppercase tracking-[0.1em] text-white/40">
                        {card.label}
                      </p>
                      {valueEl}
                      <p className="contact-card-sub mt-1.5 text-[12px] text-white/40">{card.sub}</p>
                      {"ptcl" in card && card.ptcl && (
                        <p className="contact-card-value mt-1.5 text-[13px] font-semibold text-[#2dd4bf] [data-theme='light']:text-[#0d9488]">
                          {card.ptcl}
                        </p>
                      )}
                    </>
                  );
                  const cardClass =
                    "contact-info-card relative overflow-hidden rounded-[18px] p-6 transition duration-300 sm:p-7";
                  return card.href ? (
                    <a
                      key={index}
                      href={card.href}
                      target={card.href.startsWith("http") ? "_blank" : undefined}
                      rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className={cardClass}
                    >
                      {content}
                    </a>
                  ) : (
                    <article key={index} className={cardClass}>
                      {content}
                    </article>
                  );
                })}
              </div>
            </>
          )}

          {/* Two column: form first on mobile, side by side on lg. Contact page: info cards above, then form */}
          <div className={`grid gap-10 lg:grid-cols-[2fr_3fr] lg:gap-14 ${isContactPage ? "mt-16" : "mt-0"}`}>
            {/* LEFT COLUMN — order-2 on mobile so form appears first */}
            <div className="order-2 space-y-6 lg:order-1">
              <h2 className="font-cormorant text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.15] tracking-[-0.03em] text-white contact-left-heading [data-theme='light']:text-[#111111]">
                Let&apos;s Build Something
                <br />
                <span className="contact-left-heading-accent bg-gradient-to-r from-[#2dd4bf] to-[#0d9488] bg-clip-text text-transparent [data-theme='light']:bg-none [data-theme='light']:bg-transparent [data-theme='light']:text-[#0d9488]">
                  Extraordinary.
                </span>
              </h2>
              <p className="mt-4 text-base leading-[1.75] text-white/55 contact-left-subtext [data-theme='light']:text-[rgba(0,0,0,0.55)]">
                Tell us about your idea and we&apos;ll help you build it. Free
                consultation — no commitment required.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <span className="contact-left-benefit-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <CheckCircle2 size={16} strokeWidth={2} />
                  </span>
                  <span className="text-sm text-white/70 contact-left-benefit-text [data-theme='light']:text-[rgba(0,0,0,0.65)]">Free initial consultation</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="contact-left-benefit-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Clock size={16} strokeWidth={2} />
                  </span>
                  <span className="text-sm text-white/70 contact-left-benefit-text [data-theme='light']:text-[rgba(0,0,0,0.65)]">Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="contact-left-benefit-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                    <Shield size={16} strokeWidth={2} />
                  </span>
                  <span className="text-sm text-white/70 contact-left-benefit-text [data-theme='light']:text-[rgba(0,0,0,0.65)]">100% confidential & secure</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Form card (order-1 on mobile so form is on top) */}
            <div
              className="contact-form-card order-1 rounded-2xl border py-7 px-5 backdrop-blur-md lg:order-2 sm:px-6 sm:p-8 md:p-10 md:px-11 md:rounded-[24px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderColor: "rgba(45,212,191,0.15)",
                boxShadow:
                  "0 0 60px rgba(45,212,191,0.06), 0 24px 60px rgba(0,0,0,0.3)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center py-6 text-center"
                >
                  <CheckCircle2
                    className="text-[#2dd4bf]"
                    size={56}
                    strokeWidth={2}
                  />
                  <h3 className="mt-6 text-xl font-bold text-white contact-success-title [data-theme='light']:text-[#111]">
                    Message Sent! 🎉
                  </h3>
                  <p className="mt-2 text-[15px] text-white/60 contact-success-p [data-theme='light']:text-[rgba(0,0,0,0.6)]">
                    Thanks! We&apos;ll get back to you within 24 hours.
                  </p>
                  <p className="mt-1 text-sm text-white/35 contact-success-small [data-theme='light']:text-[rgba(0,0,0,0.4)]">
                    Check your inbox for a confirmation.
                  </p>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-white contact-form-heading [data-theme='light']:text-[#111111]">
                    Send Us a Message
                  </h3>
                  <p className="mt-1 text-[13px] text-white/40 contact-form-sub [data-theme='light']:text-[rgba(0,0,0,0.5)]">
                    We&apos;ll get back to you within one business day.
                  </p>
                  <form onSubmit={onSubmit} className="mt-7 space-y-4">
                    {position && (
                      <p
                        className="contact-position-badge rounded-lg border px-3 py-2 text-sm"
                        style={{
                          borderColor: "rgba(45,212,191,0.3)",
                          background: "rgba(45,212,191,0.08)",
                          color: "#2dd4bf",
                        }}
                      >
                        Applying for:{" "}
                        <span className="font-semibold text-white">
                          {position}
                        </span>
                      </p>
                    )}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2dd4bf]">
                          Full Name *
                        </label>
                        <input
                          required
                          name="name"
                          placeholder="Your full name"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2dd4bf]">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          name="email"
                          placeholder="you@company.com"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2dd4bf]">
                          Phone Number
                        </label>
                        <input
                          name="phone"
                          placeholder="+92 ..."
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2dd4bf]">
                          Service
                        </label>
                        <select
                          name="service"
                          defaultValue=""
                          required={!position}
                          disabled={loading}
                        >
                          {SERVICE_OPTIONS.map((opt, i) => (
                            <option
                              key={opt}
                              value={i === 0 ? "" : opt}
                              disabled={i === 0}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#2dd4bf]">
                        Project Details
                      </label>
                      <textarea
                        name="details"
                        rows={4}
                        placeholder="Share scope, timeline, and goals..."
                        required
                        disabled={loading}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="relative mt-2 w-full overflow-hidden rounded-xl border-none py-3.5 text-[15px] font-bold text-black transition hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(45,212,191,0.45)] disabled:cursor-not-allowed disabled:opacity-80"
                      style={{
                        background:
                          "linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%)",
                      }}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 size={18} className="animate-spin" />
                          Sending...
                        </span>
                      ) : (
                        <>
                          <span className="relative z-10">Send Message →</span>
                          <span
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            style={{
                              animation:
                                "contactShimmer 3s ease-in-out infinite",
                            }}
                          />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>

        </div>
        </div>
      </section>
    </>
  );
}
