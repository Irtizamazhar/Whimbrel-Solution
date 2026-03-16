export type TeamMember = {
  name: string;
  initials: string;
  number: string;
  role: string;
  image: string;
  linkedin: string;
  color: string;
  tags: string[];
  bio: string;
  skills: string[];
  showSocials?: boolean;
};

export const teamMembers: TeamMember[] = [
  {
    name: "Abid Farooq",
    initials: "AF",
    number: "01",
    role: "CEO — Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#2dd4bf",
    tags: ["Leadership", "Strategy"],
    bio: "Abid leads Whimbrel Solution with a clear vision for growth and client success. He sets company strategy, drives business development, and ensures we deliver world-class software solutions. With a focus on long-term partnerships and innovation, he guides the team to build products that help businesses scale with confidence.",
    skills: [],
    showSocials: false,
  },
  {
    name: "Zain Abbas Qurashi",
    initials: "ZA",
    number: "02",
    role: "COO — Chief Operating Officer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#a855f7",
    tags: ["Operations", "Leadership"],
    bio: "Zain oversees day-to-day operations and ensures smooth delivery across all projects. He coordinates teams, manages timelines, and maintains high quality standards. His focus on process excellence and client communication helps Whimbrel Solution run efficiently and meet deadlines without compromise.",
    skills: [],
    showSocials: false,
  },
  {
    name: "Irtiza Mazhar",
    initials: "IM",
    number: "03",
    role: "Full Stack Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#22c55e",
    tags: ["Full Stack", "Engineering"],
    bio: "Irtiza builds full stack web applications using modern technologies like React, Next.js, and Node.js. He works on both frontend and backend, from UI components to APIs and databases. His focus is on clean code, performance, and delivering reliable digital products that users love.",
    skills: ["React", "Next.js", "Node.js", "TypeScript"],
    showSocials: false,
  },
  {
    name: "Zainab Khan",
    initials: "ZK",
    number: "04",
    role: "Mobile Engineer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#0ea5e9",
    tags: ["Mobile", "iOS & Android"],
    bio: "Zainab builds mobile apps for iOS and Android using React Native and Flutter. She delivers fast, native-like experiences and integrates APIs, push notifications, and analytics. Her apps are used by thousands of users and are known for smooth performance and clear, intuitive design.",
    skills: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin"],
    showSocials: false,
  },
  {
    name: "Waleed Ahmed Khan",
    initials: "WA",
    number: "05",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#f97316",
    tags: ["Design", "Creative"],
    bio: "Waleed designs user interfaces and experiences that are both beautiful and easy to use. He works in Figma on wireframes, prototypes, and design systems, and runs user research to make sure every screen helps users achieve their goals. His designs have improved conversion and satisfaction across multiple client products.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems"],
    showSocials: false,
  },
];
