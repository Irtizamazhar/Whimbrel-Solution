export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Expert Developers" },
  { value: 98, suffix: "%", label: "Client Satisfaction" },
];

export type ServiceItem = {
  number: string;
  iconKey: string;
  title: string;
  description: string;
  slug: string;
  features: string[];
  technologies: string[];
};

export const services: ServiceItem[] = [
  {
    number: "01",
    iconKey: "code",
    title: "Custom Software Development",
    description:
      "Scalable applications tailored for ambitious businesses — from enterprise systems to APIs and integrations.",
    slug: "custom-software",
    features: [
      "Enterprise Applications",
      "API Development",
      "Database Design",
      "System Integration",
    ],
    technologies: ["React", "Next.js", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    number: "02",
    iconKey: "smartphone",
    title: "Mobile App Development",
    description:
      "iOS and Android apps with polished UX, push notifications, and reliable backend integration.",
    slug: "mobile-apps",
    features: [
      "iOS & Android Apps",
      "Cross-platform Development",
      "Push Notifications",
      "App Store Deployment",
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
  },
  {
    number: "03",
    iconKey: "globe",
    title: "Web Development",
    description:
      "Fast, secure web platforms built to convert and scale — SEO, mobile responsive, and CMS-ready.",
    slug: "web-development",
    features: [
      "SEO Optimized",
      "Mobile Responsive",
      "Fast Performance",
      "CMS Integration",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind", "Stripe"],
  },
  {
    number: "04",
    iconKey: "bot",
    title: "AI Chatbot & Automation",
    description:
      "Intelligent chatbots and automation with GPT-4 and LLMs — workflows and smart assistants for your business.",
    slug: "ai-solutions",
    features: [
      "GPT-4 Integration",
      "CRM Automation",
      "WhatsApp & SMS Bots",
      "Lead Qualification",
    ],
    technologies: ["OpenAI", "LangChain", "Python", "n8n", "Zapier"],
  },
  {
    number: "05",
    iconKey: "cloud",
    title: "Cloud & DevOps",
    description:
      "Cloud infrastructure with CI/CD, Docker, and observability — reliable deployment and 99.9% uptime.",
    slug: "devops",
    features: [
      "AWS Infrastructure",
      "CI/CD Pipelines",
      "Docker & Kubernetes",
      "99.9% Uptime",
    ],
    technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Linux"],
  },
  {
    number: "06",
    iconKey: "palette",
    title: "UI/UX Design",
    description:
      "User journeys and interfaces — elegant, conversion-focused, and developer-ready handoff.",
    slug: "ui-ux",
    features: [
      "User Research",
      "Wireframing",
      "High-Fidelity UI",
      "Design Systems",
    ],
    technologies: ["Figma", "Adobe XD", "Framer", "Tailwind", "Lottie"],
  },
];

export const portfolioProjects = [
  {
    slug: "cts",
    name: "CTS",
    badge: "TESTING & ASSESSMENT",
    category: "TESTING & ASSESSMENT",
    iconLucide: "ClipboardList",
    summary: "Digital examination and assessment platform for Pakistan. Test management, HR solutions, result processing, and integrity-based examination systems.",
    timeline: "Completed",
    stack: "Web, CMS, Assessment Platforms",
    url: "https://cts.org.pk/",
    challenge:
      "CTS needed a reliable, professional platform for test registration, roll number slips, results, and project updates.",
    solution:
      "A clear, accessible website with important updates, downloadable results, roll number slips, and structured services for testing and assessment.",
    impact: "Central hub for candidates and institutions with fair, fast, and accurate testing services.",
  },
  {
    slug: "my-laundry-thai",
    name: "My Laundry",
    badge: "LAUNDRY & DELIVERY",
    category: "LAUNDRY & DELIVERY",
    iconLucide: "Shirt",
    summary: "On-demand laundry and shoe cleaning in Bangkok. Contactless pickup, next-day delivery, same-day express, and transparent pricing.",
    timeline: "Completed",
    stack: "Web, E-commerce, Delivery",
    url: "https://www.mylaundrythai.com/",
    challenge:
      "Customers needed a convenient, contactless laundry and shoe cleaning service with clear pricing and fast turnaround.",
    solution:
      "User-friendly online ordering, fixed prices by item, contactless pickup and return, same-day and next-day delivery options.",
    impact: "Laundry and shoe cleaning made as easy as ordering online with quality and convenience.",
  },
  {
    slug: "onmart",
    name: "OnMart",
    badge: "E-COMMERCE",
    category: "E-COMMERCE",
    iconLucide: "ShoppingCart",
    summary: "Digital mart and e-commerce platform with catalog, smart search, secure checkout, order tracking, and seller dashboard.",
    timeline: "Completed",
    stack: "Web, Mobile, E-commerce",
    challenge:
      "Building a modern, scalable mart experience for diverse product categories and smooth checkout.",
    solution:
      "A focused e-commerce platform with clear navigation, secure payments, and reliable delivery integration.",
    impact: "One-stop mart experience for customers with quality and convenience.",
  },
  {
    slug: "one-dollar-shop",
    name: "One Dollar Shop",
    badge: "VALUE RETAIL",
    category: "VALUE RETAIL",
    iconLucide: "Tag",
    summary: "Retail platform for quality everyday products at one-dollar pricing. Fast browsing, bulk ordering, seamless payment.",
    timeline: "Ongoing",
    stack: "Web, Retail, E-commerce",
    challenge:
      "Delivering a simple, trustworthy value-retail experience with clear pricing and wide product range.",
    solution:
      "Clean storefront, easy browsing by category, and straightforward checkout for one-dollar and value deals.",
    impact: "Accessible shopping for everyone with fixed low prices and variety.",
  },
  {
    slug: "mycrmsim",
    name: "myCRMSIM",
    badge: "MOBILE APP",
    category: "SMS GATEWAY APP",
    iconLucide: "MessageSquare",
    summary: "SMS gateway app connecting SIM to HighLevel CRM for unlimited SMS, iMessage and WhatsApp — no per-message fees or carrier restrictions.",
    timeline: "Completed",
    stack: "Mobile, Kotlin Native, HighLevel CRM",
    challenge:
      "Users needed a way to send bulk SMS and messages via CRM without per-message costs or carrier restrictions.",
    solution:
      "Mobile app that bridges physical SIM to HighLevel CRM for unlimited messaging, iMessage and WhatsApp integration.",
    impact: "Cost-effective, unrestricted messaging for businesses via their existing SIM and CRM.",
  },
  {
    slug: "surah-yaseen",
    name: "Surah Yaseen",
    badge: "QURAN & RELIGION",
    category: "QURAN & RELIGION",
    iconLucide: "BookOpen",
    summary: "Mobile app for reading and listening to Surah Yaseen. Arabic with Urdu/English translation, Qari audio, bookmarks, and offline support.",
    timeline: "Completed",
    stack: "Mobile,Kotlin Native, Audio",
    challenge:
      "Users wanted an accessible, ad-free way to read and listen to Surah Yaseen with translations and bookmarks.",
    solution:
      "Mobile app with Arabic text, Urdu/English translation, multiple Qari recitations, bookmarking, and offline mode.",
    impact: "Easy access to Surah Yaseen for reading and listening, with full offline support.",
  },
  {
    slug: "barayas-store",
    name: "Barayas.store",
    badge: "FASHION E-COMMERCE",
    category: "CLOTHING & RETAIL",
    iconLucide: "ShoppingBag",
    summary: "Premium Pakistani fashion e-commerce store featuring embroidered lawn, printed lawn collections. Complete online shopping experience with cart, order tracking, and secure payments.",
    timeline: "Completed",
    stack: "Web, E-commerce, WooCommerce",
    url: "https://barayas.store/",
    challenge:
      "Baraya's needed a modern, trustworthy e-commerce site for embroidered and printed lawn collections with clear categories and smooth checkout.",
    solution:
      "Full-featured store with shop by collection (Summer Muse, Flora Drop, Bloom Edit, Zayara Luxe, Naqsh, Canvas, Zarmina, Petal Drape), cart, secure payments, free shipping, and order tracking.",
    impact: "A complete online presence for Baraya's fashion collections with a professional, easy-to-shop experience.",
  },
];

export const testimonials = [
  {
    quote:
      "Whimbrel Solution delivered our CTS examination platform with precision. Testing, HR solutions, and result management — all built perfectly on time.",
    stars: 5,
    name: "Tariq Mehmood",
    role: "Director",
    company: "CTS Pakistan",
  },
  {
    quote:
      "They built My Laundry platform from scratch. Contactless pickup, next-day delivery, transparent pricing — everything worked flawlessly on launch day.",
    stars: 5,
    name: "James Tran",
    role: "Founder",
    company: "My Laundry Thai",
  },
  {
    quote:
      "OnMart e-commerce platform exceeded our expectations. Fast, beautiful, and our sales grew significantly after launch.",
    stars: 5,
    name: "Bilal Akram",
    role: "CEO",
    company: "OnMart",
  },
  {
    quote:
      "Our One Dollar Shop needed a clean retail experience. Whimbrel delivered exactly that — smooth browsing, bulk ordering, and great mobile experience.",
    stars: 5,
    name: "Kamran Shah",
    role: "Founder",
    company: "One Dollar Shop",
  },
  {
    quote:
      "Barayas.store is exactly what we envisioned. Beautiful collections, smooth checkout, and our customers love the shopping experience.",
    stars: 5,
    name: "Sana Baray",
    role: "Founder",
    company: "Barayas.store",
  },
  {
    quote:
      "Professional team, great communication, and premium delivery quality. From architecture to deployment — everything felt consistent and reliable.",
    stars: 5,
    name: "Ahmed Raza",
    role: "CEO",
    company: "PayEase",
  },
];
