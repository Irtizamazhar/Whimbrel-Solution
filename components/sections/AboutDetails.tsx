import Image from "next/image";
import { CircleCheckBig, Eye, Lightbulb } from "lucide-react";

const values = ["Innovation", "Collaboration", "Excellence", "Transparency"];

const journey = [
  { year: "2023", title: "Company Founded", note: "Started with a vision to deliver premium digital products." },
  { year: "2023", title: "First Major Project", note: "Delivered enterprise platform with measurable business impact." },
  { year: "2024", title: "Global Expansion", note: "Scaled delivery support for international clients and teams." },
  { year: "2025", title: "AI Capability Boost", note: "Introduced practical AI solutions into product delivery." },
];

export default function AboutDetails() {
  return (
    <section className="section-spacing">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <div className="rounded-3xl border border-teal/20 bg-navy-2 p-8 text-center md:p-12">
          <h1 className="font-cormorant text-[clamp(2.4rem,6vw,4.2rem)] text-text">About Whimbrel Solution</h1>
          <p className="mt-3 text-lg text-text-muted">
            Innovating digital solutions for a smarter future.
          </p>
        </div>

        <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
          <article className="space-y-4">
            <h2 className="font-cormorant text-5xl text-text">Our Story</h2>
            <p className="leading-relaxed text-text-muted">
              Whimbrel Solution started with a clear mission: bridge the gap between business
              needs and practical technology execution. From day one, our focus has been
              performance, usability, and measurable outcomes.
            </p>
            <p className="leading-relaxed text-text-muted">
              Today we partner with startups and enterprises to build resilient software
              products in web, mobile, cloud, and AI domains.
            </p>
          </article>
          <div className="overflow-hidden rounded-2xl border border-teal/20">
            <Image
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80"
              alt="Whimbrel team office"
              width={1200}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-center font-cormorant text-5xl text-text">Our Mission & Vision</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article className="rounded-2xl border border-teal/20 bg-navy-2 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/15 text-teal">
                <CircleCheckBig size={18} />
              </div>
              <h3 className="text-xl font-semibold text-text">Our Mission</h3>
              <p className="mt-2 text-text-muted">
                Build dependable and scalable digital products that solve real business
                problems and accelerate growth.
              </p>
            </article>
            <article className="rounded-2xl border border-teal/20 bg-navy-2 p-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/15 text-teal">
                <Eye size={18} />
              </div>
              <h3 className="text-xl font-semibold text-text">Our Vision</h3>
              <p className="mt-2 text-text-muted">
                Become a globally trusted engineering partner known for innovation,
                quality, and long-term value creation.
              </p>
            </article>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-center font-cormorant text-5xl text-text">Our Core Values</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <article
                key={value}
                className="rounded-xl border border-teal/20 bg-navy-2 p-5 text-center"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <Lightbulb size={16} />
                </div>
                <h3 className="font-semibold text-text">{value}</h3>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-center font-cormorant text-5xl text-text">Meet Our Leadership</h2>
          <article className="mx-auto mt-6 max-w-2xl rounded-2xl border border-teal/20 bg-navy-2 p-6 text-center">
            <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-teal/15 text-2xl font-bold text-teal">
              HK
            </div>
            <h3 className="mt-4 text-2xl font-semibold text-text">Mr.Irtiza Mazhar</h3>
            <p className="text-sm text-text-muted">Founder & CEO, AI Engineer</p>
            <p className="mt-3 text-text-muted">
              Leading innovation in software delivery, AI implementation, and digital
              transformation for growth-focused organizations.
            </p>
          </article>
        </div>

        <div className="mt-12">
          <h2 className="text-center font-cormorant text-5xl text-text">Our Journey</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {journey.map((item) => (
              <article key={`${item.year}-${item.title}`} className="rounded-xl border border-teal/20 bg-navy-2 p-5">
                <p className="text-sm font-semibold text-teal">{item.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-text">{item.title}</h3>
                <p className="mt-2 text-text-muted">{item.note}</p>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
