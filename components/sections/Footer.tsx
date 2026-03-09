import Image from "next/image";
import Link from "next/link";

const footerColumns = {
  company: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  services: [
    { label: "Custom Software", href: "/services/custom-software" },
    { label: "Mobile Apps", href: "/services/mobile-apps" },
    { label: "AI Solutions", href: "/services/ai-solutions" },
    { label: "DevOps", href: "/services/devops" },
  ],
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com" },
    { label: "Instagram", href: "https://www.instagram.com" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-navy-4 bg-navy-2/60 pb-8 pt-14">
      <div className="mx-auto w-full max-w-[1260px] px-5 md:px-8">
        <div className="mb-10 border-b border-navy-4 pb-10">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-teal/50 to-transparent" />
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Image src="/whimbrel-logo.svg" alt="Whimbrel logo" width={46} height={46} />
            <div>
              <p className="font-cormorant text-3xl text-text">Whimbrel Solution</p>
              <p className="text-sm text-text-muted">
                Premium digital engineering for world-class products.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 border-b border-navy-4 pb-10 md:grid-cols-2 lg:grid-cols-4">
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
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Email address"
                className="w-full border-b border-navy-4 bg-transparent pb-2 text-text outline-none placeholder:text-text-muted focus:border-teal"
              />
              <button
                type="button"
                className="rounded-full border border-teal/50 px-4 py-2 text-sm text-teal transition hover:bg-teal/10"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-3 text-sm text-text-muted">
          <p>© {new Date().getFullYear()} Whimbrel Solution. All rights reserved.</p>
          <p>Made in Pakistan 🇵🇰</p>
        </div>
      </div>
    </footer>
  );
}
