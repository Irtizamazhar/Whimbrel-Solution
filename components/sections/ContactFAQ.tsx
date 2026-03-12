"use client";

import SectionTag from "@/components/ui/SectionTag";

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer:
      "Project timelines vary based on complexity and scope. Simple projects may take 1-3 months, while complex enterprise solutions can take 6-12 months. We provide detailed timelines during the consultation phase.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes! We serve clients across 15+ countries and have experience working with different time zones, cultures, and business requirements. We provide remote collaboration and support.",
  },
  {
    question: "What is your development process?",
    answer:
      "We follow an agile development methodology with regular client communication, iterative development, and continuous testing. This ensures transparency and allows for feedback throughout the project.",
  },
  {
    question: "Do you provide ongoing support and maintenance?",
    answer:
      "Absolutely! We offer comprehensive support and maintenance packages to ensure your software continues to perform optimally. This includes bug fixes, updates, and feature enhancements.",
  },
  {
    question: "Can you help with existing projects or legacy systems?",
    answer:
      "Yes, we specialize in legacy system modernization, code refactoring, and taking over existing projects. We can assess your current system and provide improvement recommendations.",
  },
  {
    question: "What technologies do you specialize in?",
    answer:
      "We work with a wide range of modern technologies including React, Node.js, Python, Java, cloud platforms (AWS, Azure), AI/ML frameworks, and mobile development tools.",
  },
];

export default function ContactFAQ() {
  return (
    <section id="faq" className="section-spacing scroll-mt-24">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <div className="mb-10 space-y-4">
          <SectionTag label="FAQ" />
          <h2 className="max-w-3xl font-cormorant text-[clamp(2.2rem,5.5vw,3.4rem)] leading-[1.05] text-text">
            Frequently Asked{" "}
            <span className="text-teal">Questions</span>
          </h2>
          <p className="max-w-2xl text-base text-text-muted">
            Quick answers to common questions about our services and process
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {faqItems.map((item, index) => (
            <article
              key={index}
              className="rounded-2xl border border-navy-4 bg-navy-2/80 p-6 transition hover:border-teal/30 hover:shadow-[0_0_24px_rgba(59,191,176,0.08)] [data-theme='light']:border-[rgba(0,0,0,0.08)] [data-theme='light']:bg-[#f7f7f7] [data-theme='light']:hover:border-teal/40"
            >
              <h3 className="text-lg font-bold text-text [data-theme='light']:text-[#111111]">
                {item.question}
              </h3>
              <p className="mt-3 leading-relaxed text-text-muted [data-theme='light']:text-[rgba(0,0,0,0.7)]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
