export type CourseFilter = "All" | "Web Dev" | "Mobile" | "AI/ML" | "Design" | "Cloud" | "Programming";

export const COURSE_FILTERS: CourseFilter[] = [
  "All",
  "Web Dev",
  "Mobile",
  "AI/ML",
  "Design",
  "Cloud",
  "Programming",
];

export type Course = {
  id: string;
  category: string;
  icon: string;
  title: string;
  level: string;
  duration: string;
  lectures: string;
  price: string;
  original: string;
  description: string;
  topics: string[];
  badge: string;
  filter: CourseFilter;
};

export const COURSES: Course[] = [
  {
    id: "nextjs-react",
    category: "WEB DEVELOPMENT",
    icon: "Globe",
    title: "Complete Next.js & React Course",
    level: "Beginner to Advanced",
    duration: "8 Weeks",
    lectures: "60+ Lectures",
    price: "PKR 8,000",
    original: "PKR 15,000",
    description: "Master React and Next.js from scratch. Build 5 real projects.",
    topics: ["React Hooks", "Next.js 14", "Tailwind CSS", "TypeScript", "Deployment"],
    badge: "BESTSELLER",
    filter: "Web Dev",
  },
  {
    id: "react-native",
    category: "MOBILE DEVELOPMENT",
    icon: "Smartphone",
    title: "React Native — iOS & Android Apps",
    level: "Intermediate",
    duration: "6 Weeks",
    lectures: "45+ Lectures",
    price: "PKR 7,000",
    original: "PKR 12,000",
    description: "Build cross-platform mobile apps. Deploy to App Store and Play Store.",
    topics: ["React Native", "Expo", "Navigation", "Firebase", "App Store"],
    badge: "",
    filter: "Mobile",
  },
  {
    id: "ai-chatgpt",
    category: "ARTIFICIAL INTELLIGENCE",
    icon: "Bot",
    title: "AI & ChatGPT Integration Masterclass",
    level: "Beginner",
    duration: "4 Weeks",
    lectures: "30+ Lectures",
    price: "PKR 6,000",
    original: "PKR 10,000",
    description: "Build AI-powered apps using OpenAI API, LangChain and automation tools.",
    topics: ["OpenAI API", "LangChain", "Prompt Engineering", "n8n", "Chatbots"],
    badge: "NEW",
    filter: "AI/ML",
  },
  {
    id: "figma-uiux",
    category: "UI/UX DESIGN",
    icon: "Figma",
    title: "UI/UX Design with Figma",
    level: "Beginner to Advanced",
    duration: "5 Weeks",
    lectures: "40+ Lectures",
    price: "PKR 5,500",
    original: "PKR 9,000",
    description: "Master UI/UX in Figma. Wireframing, prototyping and real product design.",
    topics: ["Figma", "Wireframing", "Prototyping", "Design Systems", "Handoff"],
    badge: "",
    filter: "Design",
  },
  {
    id: "aws-devops",
    category: "CLOUD & DEVOPS",
    icon: "Cloud",
    title: "AWS Cloud & DevOps Bootcamp",
    level: "Intermediate",
    duration: "6 Weeks",
    lectures: "50+ Lectures",
    price: "PKR 9,000",
    original: "PKR 16,000",
    description: "AWS, Docker, Kubernetes and CI/CD pipelines. Real cloud deployments.",
    topics: ["AWS", "Docker", "Kubernetes", "Terraform", "CI/CD", "Linux"],
    badge: "",
    filter: "Cloud",
  },
  {
    id: "python",
    category: "PROGRAMMING",
    icon: "Code2",
    title: "Python Programming — Beginner to Pro",
    level: "Beginner",
    duration: "5 Weeks",
    lectures: "40+ Lectures",
    price: "PKR 4,500",
    original: "PKR 8,000",
    description: "Python from scratch — basics, OOP, APIs, automation and real projects.",
    topics: ["Python Basics", "OOP", "File I/O", "REST APIs", "Pandas", "Automation"],
    badge: "",
    filter: "Programming",
  },
  {
    id: "fullstack",
    category: "WEB DEVELOPMENT",
    icon: "Database",
    title: "Full Stack Web Development Bootcamp",
    level: "Beginner to Advanced",
    duration: "12 Weeks",
    lectures: "100+ Lectures",
    price: "PKR 15,000",
    original: "PKR 25,000",
    description: "Complete bootcamp — HTML, CSS, JS, React, Node.js, MongoDB and deployment.",
    topics: ["HTML/CSS", "JavaScript", "React", "Node.js", "MongoDB", "Git"],
    badge: "COMPLETE PACKAGE",
    filter: "Web Dev",
  },
  {
    id: "typescript",
    category: "PROGRAMMING",
    icon: "Shield",
    title: "TypeScript Mastery Course",
    level: "Intermediate",
    duration: "3 Weeks",
    lectures: "25+ Lectures",
    price: "PKR 3,500",
    original: "PKR 6,000",
    description: "TypeScript for modern web dev. Types, interfaces, generics with React.",
    topics: ["Types", "Interfaces", "Generics", "Classes", "React+TS", "Node+TS"],
    badge: "",
    filter: "Programming",
  },
  {
    id: "git-github",
    category: "PROGRAMMING",
    icon: "GitBranch",
    title: "Git & GitHub Complete Course",
    level: "Beginner",
    duration: "2 Weeks",
    lectures: "20+ Lectures",
    price: "PKR 2,000",
    original: "PKR 4,000",
    description: "Git version control and GitHub collaboration. Essential for every developer.",
    topics: ["Git Basics", "Branching", "Merging", "Pull Requests", "GitHub Actions"],
    badge: "FREE TRIAL",
    filter: "Programming",
  },
];

export type Internship = {
  id: string;
  icon: string;
  title: string;
  duration: string;
  type: string;
  stipend: string;
  badge: string;
  description: string;
  skills: string[];
  perks: string[];
};

export const INTERNSHIPS: Internship[] = [
  {
    id: "software-dev",
    icon: "Code2",
    title: "Software Development Internship",
    duration: "3 Months",
    type: "Remote / Hybrid",
    stipend: "Performance-Based Stipend",
    badge: "MOST POPULAR",
    description:
      "Work on real client projects using React, Next.js and Node.js. Learn professional coding, Git workflow and agile development process.",
    skills: ["React", "Next.js", "Node.js", "Git", "MongoDB"],
    perks: [
      "Internship Offer Letter",
      "Verified Certificate",
      "Letter of Recommendation",
      "Performance Stipend",
      "Portfolio Projects",
    ],
  },
  {
    id: "web-dev",
    icon: "Globe",
    title: "Web Development Internship",
    duration: "3 Months",
    type: "Remote / Hybrid",
    stipend: "Performance-Based Stipend",
    badge: "",
    description:
      "Build modern websites and web apps. Work with HTML, CSS, JavaScript, React and deploy live projects. Learn responsive design, APIs and real client deliverables.",
    skills: ["HTML/CSS", "JavaScript", "React", "Responsive Design", "Git"],
    perks: [
      "Internship Offer Letter",
      "Verified Certificate",
      "Letter of Recommendation",
      "Performance Stipend",
      "Web Portfolio Projects",
    ],
  },
  {
    id: "mobile-app",
    icon: "Smartphone",
    title: "Mobile App Development Internship",
    duration: "3 Months",
    type: "Remote",
    stipend: "Performance-Based Stipend",
    badge: "",
    description:
      "Build iOS and Android apps using React Native and Flutter. Work with real APIs and deploy live apps to both stores.",
    skills: ["React Native", "Flutter", "Firebase", "REST APIs", "Expo"],
    perks: [
      "Internship Offer Letter",
      "Verified Certificate",
      "Letter of Recommendation",
      "Performance Stipend",
      "App Store Deployment",
    ],
  },
  {
    id: "uiux-design",
    icon: "Figma",
    title: "UI/UX Design Internship",
    duration: "2 Months",
    type: "Remote",
    stipend: "Performance-Based Stipend",
    badge: "",
    description:
      "Design real product interfaces in Figma. User research, wireframing, prototyping and complete design systems for live products.",
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research", "Design Systems"],
    perks: [
      "Internship Offer Letter",
      "Verified Certificate",
      "Letter of Recommendation",
      "Performance Stipend",
      "Portfolio Case Studies",
    ],
  },
  {
    id: "ai-automation",
    icon: "Bot",
    title: "AI & Automation Internship",
    duration: "3 Months",
    type: "Remote",
    stipend: "Performance-Based Stipend",
    badge: "NEW",
    description:
      "Build AI chatbots and automation workflows using OpenAI, LangChain and n8n. Work on real automation projects for clients.",
    skills: ["Python", "OpenAI", "LangChain", "n8n", "Zapier"],
    perks: [
      "Internship Offer Letter",
      "Verified Certificate",
      "Letter of Recommendation",
      "Performance Stipend",
      "AI Portfolio Projects",
    ],
  },
];
