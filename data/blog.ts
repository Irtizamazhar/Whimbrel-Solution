export type BlogCategory = "Technology" | "Design" | "Company News";

export type BlogPost = {
  slug: string;
  title: string;
  category: BlogCategory;
  image: string;
  excerpt: string;
  body: string;
  author: string;
  date: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-we-architect-scalable-nextjs-platforms",
    title: "How We Architect Scalable Next.js Platforms",
    category: "Technology",
    image: "/blog/nextjs-architecture.svg",
    excerpt:
      "A practical guide to building high-performance App Router products with clean architecture and reliable deployment pipelines.",
    body: "We build Next.js products with a clear separation between data, UI, and API layers. Our default stack includes the App Router, server components for data-heavy pages, and client components only where interactivity is needed. We use TypeScript across the codebase and enforce consistent patterns for routing, loading states, and error handling. Deployment runs through CI/CD with automated checks and preview environments for every branch.\n\nWe structure apps around feature-based route segments and colocate data fetching with the components that need it. Server components handle initial data load and static content, while client components wrap only the interactive parts—forms, modals, and real-time updates. This keeps the JavaScript bundle small and improves time-to-interactive for users.\n\nCaching and revalidation are configured per route: static pages use long-lived cache, and dynamic routes use stale-while-revalidate so that content stays fresh without blocking the response. We rely on Next.js middleware for auth checks and redirects, and we keep API routes thin by delegating business logic to shared modules that can be tested in isolation.\n\nFinally, we run lint, type-check, and tests on every pull request, and we deploy preview URLs for each branch so that stakeholders can review before merge. This combination of clean architecture, strong typing, and automated pipelines lets us ship scalable Next.js platforms with confidence.",
    author: "Areeb Khan",
    date: "Mar 05, 2026",
  },
  {
    slug: "design-systems-that-keep-product-teams-fast",
    title: "Design Systems That Keep Product Teams Fast",
    category: "Design",
    image: "/blog/design-systems.svg",
    excerpt:
      "Why consistent components, tokens, and patterns reduce delivery friction and improve user trust across every screen.",
    body: "A shared design system reduces back-and-forth between design and development. We use tokens for spacing, typography, and colors so that theme changes propagate in one place. Components are documented and versioned so that product teams can ship features without reinventing patterns. The result is faster delivery and a more consistent experience for users.\n\nWe start with a small set of primitives—buttons, inputs, cards, and typography—and build compound components on top. Each component has clear props, usage notes, and accessibility guidelines. When a new product or feature needs a variant, we extend the system instead of creating one-off styles, so the UI stays coherent across web and mobile.\n\nDesign tokens are the single source of truth for spacing, radius, shadows, and motion. When we need a dark mode or a client rebrand, we update the tokens and the entire interface adapts. This approach has cut our design-to-dev handoff time and reduced visual regressions in production.",
    author: "Hiba Rauf",
    date: "Feb 22, 2026",
  },
  {
    slug: "whimbrel-solution-opens-new-islamabad-delivery-cell",
    title: "Whimbrel Solution Opens New Islamabad Delivery Cell",
    category: "Company News",
    image: "/blog/company-expansion.svg",
    excerpt:
      "We are expanding our engineering operations to support larger products and faster project turnaround for clients.",
    body: "We are expanding our engineering operations in Islamabad to support larger products and faster project turnaround. The new delivery cell will focus on full-stack development, QA, and DevOps so we can serve more clients without compromising quality. We are hiring for frontend, backend, and design roles.\n\nThe Islamabad office will work alongside our existing team to scale delivery capacity for enterprise and startup clients. We have invested in collaboration tools and agile practices so that distributed teams stay aligned. New joiners will get onboarding, mentorship, and clear growth paths in engineering and design.\n\nIf you are passionate about building products that scale and want to work with a team that values quality and delivery, check our Careers page for open positions. We look forward to growing with you.",
    author: "Team Whimbrel",
    date: "Feb 14, 2026",
  },
  {
    slug: "nodejs-api-security-checklist-for-production-teams",
    title: "Node.js API Security Checklist for Production Teams",
    category: "Technology",
    image: "/blog/node-security.svg",
    excerpt:
      "From auth hardening to rate limiting and observability, these patterns help teams ship secure backend services.",
    body: "Production Node.js APIs need auth hardening, input validation, rate limiting, and observability. We use JWT or session-based auth with secure cookies where appropriate, validate and sanitize all inputs, and apply rate limits per IP and per user. Logging and metrics help us detect anomalies and respond quickly. These patterns are part of our standard backend delivery.\n\nWe structure API code with clear layers: routes delegate to controllers, controllers call services, and services use repositories for data access. This keeps business logic testable and independent of HTTP or database details. Error handling is centralized so that clients receive consistent status codes and messages without leaking internal details.\n\nBefore every release we run security and dependency audits, and we keep dependencies up to date. For sensitive operations we add extra checks such as CAPTCHA or step-up auth. These habits help production teams ship and maintain secure Node.js backends.",
    author: "Bilal Ahmed",
    date: "Jan 30, 2026",
  },
  {
    slug: "from-wireframe-to-polished-interface-our-ui-workflow",
    title: "From Wireframe to Polished Interface: Our UI Workflow",
    category: "Design",
    image: "/blog/ui-workflow.svg",
    excerpt:
      "A walkthrough of our UI/UX process that balances visual quality, clarity, and measurable product outcomes.",
    body: "We start with discovery and wireframes to align on structure and flows. Then we move to high-fidelity design in Figma with a focus on accessibility and responsiveness. Design handoff includes specs and components so development can implement without guesswork. We iterate based on feedback and metrics so the final UI supports both clarity and conversion.\n\nWireframes are kept simple: layout, hierarchy, and key interactions. We avoid visual polish at this stage so that stakeholders focus on flow and content. Once the structure is approved, we apply the design system and produce high-fidelity screens with states, breakpoints, and component specs.\n\nHandoff includes a component inventory, spacing and typography tokens, and notes on animation and accessibility. Developers use this as a single reference, which reduces back-and-forth and keeps the built UI aligned with design. We also run periodic design reviews after launch to capture feedback and plan the next iteration.",
    author: "Sana Tariq",
    date: "Jan 18, 2026",
  },
  {
    slug: "inside-our-sprint-rituals-better-delivery-less-chaos",
    title: "Inside Our Sprint Rituals: Better Delivery, Less Chaos",
    category: "Company News",
    image: "/blog/sprint-rituals.svg",
    excerpt:
      "How we run planning, standups, and QA handoff to keep teams aligned and shipping consistently week after week.",
    body: "We run two-week sprints with clear planning, daily standups, and a defined QA handoff. Backlog refinement happens before sprint start so that scope is clear. Standups are short and focused on blockers. Before release we do a QA pass and sign-off so that only shippable work goes live. This keeps delivery predictable and reduces last-minute chaos.\n\nSprint planning starts with prioritised backlog items and capacity. We commit only to what the team can complete and test within the sprint. Each story has acceptance criteria and a clear owner. Mid-sprint we avoid adding new scope; instead we park new requests for the next refinement.\n\nWe close each sprint with a short retrospective: what went well, what to improve, and one concrete change for the next sprint. This habit keeps our rituals improving and helps the team stay aligned and shipping consistently.",
    author: "Operations Team",
    date: "Jan 04, 2026",
  },
];

export const blogFilters = ["All", "Technology", "Design", "Company News"] as const;

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}
