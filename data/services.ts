export type ServiceDetail = {
  number: string;
  iconKey: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  tech: string[];
};

export const servicesDetail: ServiceDetail[] = [
  {
    number: "01",
    iconKey: "code",
    title: "Custom Software Development",
    tagline: "Tailored solutions built for your exact business needs.",
    description:
      "We design and develop custom software from the ground up — built around your workflows, your users, and your growth goals. Whether it is an enterprise platform, a SaaS product, or an internal tool, we engineer it with precision and scalability in mind. Our process covers discovery, architecture, development, testing, and post-launch support.",
    features: [
      "End-to-end product development",
      "Domain-driven architecture design",
      "Scalable and maintainable codebase",
      "API integrations and third-party services",
      "Agile delivery with weekly updates",
      "Post-launch support and maintenance",
    ],
    tech: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    number: "02",
    iconKey: "smartphone",
    title: "Mobile App Development",
    tagline: "iOS and Android apps users love to use.",
    description:
      "We build high-performance mobile applications for iOS and Android that are fast, intuitive, and beautifully designed. From consumer apps to enterprise mobility solutions, we cover the full mobile product lifecycle — ideation, UI/UX, development, QA, and App Store deployment.",
    features: [
      "iOS and Android development",
      "React Native and Flutter expertise",
      "Smooth UI with native-like performance",
      "Push notifications and offline support",
      "App Store and Play Store deployment",
      "Ongoing updates and version management",
    ],
    tech: ["React Native", "Flutter", "Firebase", "REST APIs", "Swift", "Kotlin"],
  },
  {
    number: "03",
    iconKey: "globe",
    title: "Web Development",
    tagline: "Fast, secure, and conversion-focused web platforms.",
    description:
      "We build modern web platforms that are blazing fast, secure, and optimized for conversions. From landing pages to complex web applications, we use the latest technologies to deliver exceptional digital experiences. Every website we build is SEO-ready, mobile-responsive, and engineered for performance.",
    features: [
      "Custom website and web app development",
      "SEO optimization and Core Web Vitals",
      "Mobile-first responsive design",
      "CMS integration (headless or traditional)",
      "E-commerce and payment integration",
      "Performance monitoring and optimization",
    ],
    tech: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Shopify", "Stripe"],
  },
  {
    number: "04",
    iconKey: "bot",
    title: "AI Chatbot & Automation",
    tagline: "Intelligent automation that works while you sleep.",
    description:
      "We design and deploy AI-powered chatbots and automation workflows that reduce manual effort, improve response times, and create smarter customer experiences. From GPT-powered assistants to automation pipelines, we help businesses scale operations without scaling headcount.",
    features: [
      "Custom AI chatbot development",
      "GPT-4 and LLM integration",
      "Business process automation",
      "CRM and helpdesk integration",
      "WhatsApp, SMS, and web chat support",
      "Analytics and conversation reporting",
    ],
    tech: ["OpenAI", "LangChain", "Python", "n8n", "HighLevel", "Zapier"],
  },
  {
    number: "05",
    iconKey: "cloud",
    title: "Cloud & DevOps",
    tagline: "Reliable infrastructure built for scale and speed.",
    description:
      "We architect, deploy, and manage cloud infrastructure that is secure, reliable, and cost-efficient. Our DevOps team sets up CI/CD pipelines, containerized deployments, monitoring, and auto-scaling so your product stays online and performs at its best every single day.",
    features: [
      "Cloud architecture on AWS, GCP, or Azure",
      "CI/CD pipeline setup and automation",
      "Docker and Kubernetes deployment",
      "Infrastructure as Code with Terraform",
      "Uptime monitoring and alerting",
      "Security hardening and compliance",
    ],
    tech: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Linux"],
  },
  {
    number: "06",
    iconKey: "palette",
    title: "UI/UX Design",
    tagline: "Design that converts visitors into loyal users.",
    description:
      "We craft elegant, user-centered interfaces that look stunning and feel intuitive. Our design process starts with understanding your users and business goals, then moves to wireframes, high-fidelity prototypes, and final handoff-ready designs. Every pixel is intentional.",
    features: [
      "User research and persona development",
      "Wireframing and information architecture",
      "High-fidelity UI design in Figma",
      "Interactive prototypes for testing",
      "Design system and component library",
      "Developer handoff with style guide",
    ],
    tech: ["Figma", "Adobe XD", "Framer", "Tailwind CSS", "Storybook"],
  },
];
