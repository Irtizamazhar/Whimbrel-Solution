"use client";

import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import SectionTag from "@/components/ui/SectionTag";

const contactMeta = [
  { label: "Location", value: "Islamabad, Pakistan" },
  { label: "WhatsApp", value: "+92 334 0007247" },
  { label: "Email", value: "info@whimbrelsolutions.com" },
  { label: "Hours", value: "Mon - Fri · 9:00 AM to 6:00 PM" },
];

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const service = String(data.get("service") ?? "").trim();
    const details = String(data.get("details") ?? "").trim();

    const text = [
      "Assalam o Alaikum,",
      "I submitted the Whimbrel contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Project Details: ${details}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/923340007247?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    setLoading(false);
    form.reset();
    toast.success("WhatsApp chat opened. Please tap send to deliver your message.");
  };

  return (
    <section id="contact" className="section-spacing">
      <div className="mx-auto grid w-full max-w-[1260px] gap-12 px-5 md:px-8 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <SectionTag label="Contact" />
          <h2 className="font-cormorant text-[clamp(2.2rem,5.5vw,3.6rem)] leading-[1.05] text-text">
            Let&apos;s Build Something Great
          </h2>
          <p className="text-lg leading-relaxed text-text-muted">
            Tell us about your idea, timeline, and goals. We will recommend the
            right strategy and team structure for delivery.
          </p>
          <div className="space-y-5">
            {contactMeta.map((item) => (
              <article key={item.label} className="border-b border-teal/20 pb-4">
                <p className="text-xs uppercase tracking-[0.2em] text-teal">{item.label}</p>
                <p className="mt-1 text-lg text-text">{item.value}</p>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          onSubmit={onSubmit}
          className="rounded-3xl border border-navy-4 bg-navy-2/75 p-6 md:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className="form-field">
              Name
              <input required name="name" placeholder="Your full name" />
            </label>
            <label className="form-field">
              Email
              <input required type="email" name="email" placeholder="you@company.com" />
            </label>
          </div>

          <label className="form-field mt-6">
            Phone
            <input required name="phone" placeholder="+92 ..." />
          </label>

          <label className="form-field mt-6">
            Service
            <select required name="service" defaultValue="">
              <option value="" disabled>
                Select a service
              </option>
              <option>Custom Software Development</option>
              <option>Mobile App Development</option>
              <option>Web Development</option>
              <option>AI Chatbot & Automation</option>
              <option>Cloud & DevOps</option>
              <option>UI/UX Design</option>
            </select>
          </label>

          <label className="form-field mt-6">
            Project Details
            <textarea
              required
              name="details"
              rows={5}
              placeholder="Share scope, timeline, and goals..."
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-navy transition hover:bg-teal-light disabled:cursor-not-allowed disabled:opacity-75 md:w-auto"
            style={{ clipPath: "polygon(0 0, calc(100% - 18px) 0, 100% 35%, 100% 100%, 0 100%)" }}
            data-magnetic="true"
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
