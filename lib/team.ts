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
};

export const teamMembers: TeamMember[] = [
  {
    name: "Mr. Irtiza Mazhar",
    initials: "IM",
    number: "01",
    role: "Founder & CEO, AI Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#2dd4bf",
    tags: ["Leadership", "AI/ML", "5+ Years"],
    bio: "Visionary leader and AI engineer driving innovation at Whimbrel Solution. Specializes in digital transformation and helping businesses build world-class products with precision, speed, and strategic thinking.",
    skills: [],
  },
  {
    name: "Sarah Ahmed",
    initials: "SA",
    number: "02",
    role: "Lead Developer",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#6366f1",
    tags: ["Full Stack", "Engineering", "4+ Years"],
    bio: "Full stack developer with deep expertise in React and Node.js. Passionate about clean code, scalable architecture, and delivering exceptional digital products.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS"],
  },
  {
    name: "Ali Hassan",
    initials: "AH",
    number: "03",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#22c55e",
    tags: ["Design", "Creative", "3+ Years"],
    bio: "Creative UI/UX designer crafting elegant interfaces that convert visitors into loyal users. Expert in Figma prototyping, user research, and design systems.",
    skills: ["Figma", "UI Design", "UX Research", "Prototyping", "Design Systems", "Tailwind CSS"],
  },
  {
    name: "Zainab Khan",
    initials: "ZK",
    number: "04",
    role: "Mobile Engineer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#0ea5e9",
    tags: ["Mobile", "iOS & Android", "3+ Years"],
    bio: "Mobile engineer specialized in React Native and Flutter. Builds high-performance cross-platform apps with native-like experiences for both iOS and Android.",
    skills: ["React Native", "Flutter", "Firebase", "Swift", "Kotlin", "REST APIs"],
  },
  {
    name: "Omar Farooq",
    initials: "OF",
    number: "05",
    role: "Backend & DevOps",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80",
    linkedin: "https://www.linkedin.com",
    color: "#f97316",
    tags: ["Backend", "Cloud", "4+ Years"],
    bio: "Backend engineer and DevOps specialist managing cloud infrastructure on AWS. Expert in CI/CD pipelines, Docker, and building reliable systems that scale.",
    skills: ["Node.js", "AWS", "Docker", "Kubernetes", "PostgreSQL", "GitHub Actions"],
  },
];
