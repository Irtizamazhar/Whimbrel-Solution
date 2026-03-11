export type ServicePageFeature = {
  title: string;
  description: string;
};

export type ServicePageData = {
  slug: string;
  number: string;
  iconKey: string;
  title: string;
  tagline: string;
  description: string;
  features: ServicePageFeature[];
  tech: string[];
};

export const servicesPageData: ServicePageData[] = [
  {
    slug: "custom-software",
    number: "01",
    iconKey: "code",
    title: "Custom Software Development",
    tagline: "Built exactly for your business. No compromises.",
    description:
      "We engineer custom software systems from scratch — tailored to your workflows, users, and growth goals. From SaaS platforms to enterprise tools, we build with precision.",
    features: [
      { title: "Scalable Architecture", description: "Systems designed to grow with your business" },
      { title: "API Development", description: "Robust REST and GraphQL APIs for any integration" },
      { title: "Database Design", description: "Optimized schemas for performance at scale" },
      { title: "Security First", description: "Built-in auth, encryption, and data protection" },
      { title: "Agile Delivery", description: "Weekly sprints with transparent progress updates" },
      { title: "Long-term Support", description: "Ongoing maintenance and feature development" },
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "TypeScript"],
  },
  {
    slug: "mobile-apps",
    number: "02",
    iconKey: "smartphone",
    title: "Mobile App Development",
    tagline: "Apps that users actually love to use.",
    description:
      "We build beautiful, high-performance iOS and Android apps that deliver native-like experiences. From concept to App Store — we handle everything.",
    features: [
      { title: "Cross-Platform", description: "One codebase for iOS and Android with React Native" },
      { title: "Native Performance", description: "Smooth 60fps animations and fast load times" },
      { title: "Offline Support", description: "Apps that work even without internet connection" },
      { title: "Push Notifications", description: "Smart alerts that re-engage your users" },
      { title: "App Store Launch", description: "Full deployment to App Store and Play Store" },
      { title: "Analytics Built-in", description: "Track user behavior and app performance" },
    ],
    tech: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin", "REST APIs", "Redux"],
  },
  {
    slug: "web-development",
    number: "03",
    iconKey: "globe",
    title: "Web Development",
    tagline: "Fast, beautiful, and built to convert.",
    description:
      "We craft modern web platforms optimized for performance, SEO, and conversions. From landing pages to full web apps — every pixel has a purpose.",
    features: [
      { title: "SEO Optimized", description: "Core Web Vitals and search ranking built-in" },
      { title: "Blazing Fast", description: "Optimized loading for every device and network" },
      { title: "Mobile First", description: "Perfect experience on phones, tablets, and desktops" },
      { title: "CMS Integration", description: "Easy content management for your team" },
      { title: "E-Commerce Ready", description: "Shopify, WooCommerce, and custom cart solutions" },
      { title: "Analytics & Tracking", description: "Full visibility into traffic and conversions" },
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Shopify", "Stripe", "Vercel"],
  },
  {
    slug: "ai-solutions",
    number: "04",
    iconKey: "bot",
    title: "AI Chatbot & Automation",
    tagline: "Automate the work. Amplify the results.",
    description:
      "We build intelligent AI chatbots and automation workflows that save time, reduce costs, and create smarter customer experiences around the clock.",
    features: [
      { title: "GPT-4 Powered", description: "Smart conversations using latest language models" },
      { title: "CRM Integration", description: "Connect to HighLevel, HubSpot, and Salesforce" },
      { title: "WhatsApp & SMS", description: "Automated messaging across all channels" },
      { title: "Workflow Automation", description: "Eliminate repetitive tasks with smart pipelines" },
      { title: "Lead Qualification", description: "AI that qualifies and routes leads automatically" },
      { title: "24/7 Operation", description: "Your business runs even while you sleep" },
    ],
    tech: ["OpenAI", "LangChain", "Python", "n8n", "HighLevel", "Zapier", "Twilio"],
  },
  {
    slug: "devops",
    number: "05",
    iconKey: "cloud",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that never sleeps.",
    description:
      "We design and manage cloud infrastructure that is reliable, secure, and cost-optimized. Your product stays online and scales automatically when you need it.",
    features: [
      { title: "Cloud Architecture", description: "AWS, GCP, and Azure infrastructure design" },
      { title: "CI/CD Pipelines", description: "Automated testing and deployment workflows" },
      { title: "Containerization", description: "Docker and Kubernetes for scalable deployments" },
      { title: "Monitoring", description: "Real-time alerts and uptime dashboards" },
      { title: "Security", description: "Hardened servers, SSL, and compliance setup" },
      { title: "Cost Optimization", description: "Reduce cloud bills without losing performance" },
    ],
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    slug: "ui-ux",
    number: "06",
    iconKey: "palette",
    title: "UI/UX Design",
    tagline: "Design that earns trust and drives action.",
    description:
      "We craft interfaces that are not just beautiful — they are strategic. Every design decision is backed by user research, usability testing, and conversion goals.",
    features: [
      { title: "User Research", description: "Deep understanding of your users and their needs" },
      { title: "Wireframing", description: "Clear information architecture before visual design" },
      { title: "High-Fidelity UI", description: "Pixel-perfect Figma designs ready for development" },
      { title: "Prototyping", description: "Interactive prototypes for testing and feedback" },
      { title: "Design System", description: "Consistent component library for your entire product" },
      { title: "Dev Handoff", description: "Clean Figma files with specs and style guide" },
    ],
    tech: ["Figma", "Adobe XD", "Framer", "Tailwind CSS", "Lottie", "Storybook"],
  },
];

export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return servicesPageData.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return servicesPageData.map((s) => s.slug);
}
