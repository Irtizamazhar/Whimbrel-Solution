export type ServicePageFeature = {
  iconKey: string;
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
    description: "Scalable, domain-driven software tailored to your operations.",
    features: [
      { iconKey: "code", title: "Scalable Architecture", description: "Systems designed to grow with your business" },
      { iconKey: "zap", title: "Fast Development", description: "Agile sprints with weekly progress updates" },
      { iconKey: "lock", title: "Security First", description: "Built-in auth, encryption and data protection" },
      { iconKey: "database", title: "Database Design", description: "Optimized schemas for high performance" },
      { iconKey: "gitBranch", title: "API Development", description: "Robust REST and GraphQL APIs" },
      { iconKey: "headphones", title: "Long-term Support", description: "Maintenance and feature updates" },
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "MongoDB", "AWS", "Docker", "TypeScript"],
  },
  {
    slug: "mobile-apps",
    number: "02",
    iconKey: "smartphone",
    title: "Mobile App Development",
    tagline: "Apps that users actually love to use.",
    description: "High-performance iOS and Android apps with polished experiences.",
    features: [
      { iconKey: "smartphone", title: "Cross-Platform", description: "iOS and Android from one codebase" },
      { iconKey: "zap", title: "Native Performance", description: "Smooth 60fps and fast load times" },
      { iconKey: "wifiOff", title: "Offline Support", description: "Works even without internet" },
      { iconKey: "bell", title: "Push Notifications", description: "Smart alerts that re-engage users" },
      { iconKey: "store", title: "App Store Launch", description: "Full deployment to both stores" },
      { iconKey: "barChart", title: "Analytics", description: "Track user behavior and performance" },
    ],
    tech: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin", "REST APIs", "Redux"],
  },
  {
    slug: "web-development",
    number: "03",
    iconKey: "globe",
    title: "Web Development",
    tagline: "Fast, beautiful, and built to convert.",
    description: "Modern web platforms optimized for performance and SEO.",
    features: [
      { iconKey: "search", title: "SEO Optimized", description: "Core Web Vitals and rankings built-in" },
      { iconKey: "zap", title: "Blazing Fast", description: "Optimized loading for every device" },
      { iconKey: "smartphone", title: "Mobile First", description: "Perfect on phones, tablets, desktops" },
      { iconKey: "fileText", title: "CMS Integration", description: "Easy content management for your team" },
      { iconKey: "shoppingCart", title: "E-Commerce", description: "Shopify and custom cart solutions" },
      { iconKey: "barChart", title: "Analytics", description: "Full visibility into traffic and conversions" },
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Shopify", "Stripe", "Vercel"],
  },
  {
    slug: "ai-solutions",
    number: "04",
    iconKey: "bot",
    title: "AI Chatbot & Automation",
    tagline: "Automate the work. Amplify the results.",
    description: "Intelligent AI tools that save time and scale your operations.",
    features: [
      { iconKey: "bot", title: "GPT-4 Powered", description: "Smart conversations using latest AI models" },
      { iconKey: "link", title: "CRM Integration", description: "Connect to HighLevel, HubSpot, Salesforce" },
      { iconKey: "messageSquare", title: "WhatsApp & SMS", description: "Automated messaging on all channels" },
      { iconKey: "workflow", title: "Automation", description: "Eliminate repetitive tasks with pipelines" },
      { iconKey: "userCheck", title: "Lead Qualification", description: "AI that qualifies leads automatically" },
      { iconKey: "clock", title: "24/7 Operation", description: "Your business runs while you sleep" },
    ],
    tech: ["OpenAI", "LangChain", "Python", "n8n", "HighLevel", "Zapier", "Twilio"],
  },
  {
    slug: "devops",
    number: "05",
    iconKey: "cloud",
    title: "Cloud & DevOps",
    tagline: "Infrastructure that never sleeps.",
    description: "Reliable cloud infrastructure built for scale and security.",
    features: [
      { iconKey: "cloud", title: "Cloud Architecture", description: "AWS, GCP, and Azure design" },
      { iconKey: "gitBranch", title: "CI/CD Pipelines", description: "Automated testing and deployment" },
      { iconKey: "box", title: "Containerization", description: "Docker and Kubernetes deployments" },
      { iconKey: "activity", title: "Monitoring", description: "Real-time alerts and uptime dashboards" },
      { iconKey: "shield", title: "Security", description: "Hardened servers and compliance setup" },
      { iconKey: "trendingDown", title: "Cost Optimization", description: "Reduce cloud bills intelligently" },
    ],
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux", "Nginx"],
  },
  {
    slug: "ui-ux",
    number: "06",
    iconKey: "palette",
    title: "UI/UX Design",
    tagline: "Design that earns trust and drives action.",
    description: "User-centered interfaces that are beautiful and strategic.",
    features: [
      { iconKey: "users", title: "User Research", description: "Deep understanding of your users" },
      { iconKey: "layout", title: "Wireframing", description: "Clear information architecture first" },
      { iconKey: "monitor", title: "High-Fidelity UI", description: "Pixel-perfect Figma designs" },
      { iconKey: "play", title: "Prototyping", description: "Interactive prototypes for testing" },
      { iconKey: "package", title: "Design System", description: "Consistent component library" },
      { iconKey: "send", title: "Dev Handoff", description: "Clean files with full specs" },
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
