import { NextResponse } from "next/server";

type Payload = {
  message?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  language?: "roman-urdu" | "english";
  lead?: { name?: string; phone?: string; email?: string };
};

const SYSTEM_PROMPT = `You are Whimbrel AI, a helpful assistant for Whimbrel Solution — a premium software house in Pakistan founded by Mr. Junaid. Answer questions about services (Web, Mobile, AI, Cloud, UI/UX), pricing, timelines, and project planning. Be helpful, professional, and concise. If asked in Urdu, reply in Urdu. If asked in English, reply in English.`;

function intentFirstReply(message: string, language: "roman-urdu" | "english") {
  const text = message.toLowerCase().trim();
  const hasAny = (words: string[]) => words.some((word) => text.includes(word));

  const asksHumanTeam = hasAny([
    "team se baat",
    "team say baat",
    "team se contact",
    "human agent",
    "real person",
    "call me",
    "call kar",
    "kese bat",
    "kaise bat",
    "talk to team",
    "talk to human",
    "speak to team",
  ]);

  if (asksHumanTeam) {
    return language === "english"
      ? "Absolutely. You can speak to our team directly on WhatsApp: +92 334 0007247. You can also email us at hello@whimbrelsolution.com. If you share your project type and timeline, our team will respond quickly."
      : "Bilkul. Aap hamari team se direct WhatsApp par baat kar sakte hain: +92 334 0007247. Ya email karein: hello@whimbrelsolution.com. Aap project type aur timeline bhej dein, team jaldi response degi.";
  }

  const asksNumber = hasAny([
    "number",
    "phone number",
    "contact number",
    "whatsapp number",
    "num",
  ]);
  if (asksNumber) {
    return language === "english"
      ? "Our WhatsApp number is +92 334 0007247. You can message us there for quick support."
      : "Hamara WhatsApp number +92 334 0007247 hai. Aap wahan direct message kar sakte hain.";
  }

  return null;
}

function isLowValueReply(text: string) {
  const normalized = text.toLowerCase();
  return (
    normalized.includes("i understand your question") ||
    normalized.includes("main aapka sawal samajh gaya") ||
    normalized.includes("share your project idea in 2-3 lines") ||
    normalized.includes("tell me your goal in one line") ||
    normalized.includes("i don't know") ||
    normalized.includes("i do not know") ||
    normalized.includes("tell me more about") ||
    normalized.includes("what do you want to build") ||
    normalized.includes("describe your project") ||
    normalized.includes("can you describe more") ||
    normalized.includes("share your use case") ||
    normalized.includes("what kind of project") ||
    normalized.includes("could you tell me more") ||
    normalized.includes("can you elaborate")
  );
}

function smartLocalReply(message: string, language: "roman-urdu" | "english") {
  const text = message.toLowerCase().trim();
  const hasAny = (words: string[]) => words.some((word) => text.includes(word));

  // ----- READY-MADE INSTANT ANSWERS (exact format, no follow-up) -----
  if (hasAny(["ai agent", "ai chatbot", "chatbot", "ai bot", "ai assistant"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a custom AI Agent for you.\n\n✅ Trained on your business data (website, FAQs, services)\n✅ 24/7 auto-reply in Urdu + English\n✅ Lead collection (name, email, phone)\n✅ Built-in appointment booking\n✅ Integrates on website, WhatsApp, or app\n\n📅 Timeline: 2–4 weeks\n💰 Cost: PKR 80,000 – 200,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye custom AI Agent banayega\n\n✅ Aapke business data par trained (website, FAQs, services)\n✅ 24/7 auto-reply in Urdu + English\n✅ Lead collection (name, email, phone)\n✅ Appointment booking system built-in\n✅ Website, WhatsApp, ya App par integrate hoga\n\n📅 Timeline: 2–4 weeks\n💰 Cost: PKR 80,000 – 200,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["e-commerce", "ecommerce", "online store", "shop", "store website"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build an E-Commerce platform for you.\n\n✅ Product listings, categories & smart filters\n✅ Cart & secure checkout\n✅ JazzCash, EasyPaisa, Stripe, COD payments\n✅ Admin dashboard — orders, inventory, sales\n✅ Mobile responsive + SEO optimized\n\n📅 Timeline: 3–6 weeks\n💰 Cost: PKR 80,000 – 200,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye E-Commerce platform banayega\n\n✅ Product listings, categories & smart filters\n✅ Cart & secure checkout system\n✅ JazzCash, EasyPaisa, Stripe, COD payments\n✅ Admin dashboard — orders, inventory, sales\n✅ Mobile responsive + SEO optimized\n\n📅 Timeline: 3–6 weeks\n💰 Cost: PKR 80,000 – 200,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["business website", "corporate website", "company website", "professional website"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a professional website for you.\n\n✅ Modern responsive design\n✅ Services, About, Contact pages\n✅ WhatsApp & social media integration\n✅ Google SEO setup\n✅ Fast speed + CMS for easy updates\n\n📅 Timeline: 1–3 weeks\n💰 Cost: PKR 30,000 – 100,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye professional website banayega\n\n✅ Modern responsive design\n✅ Services, About, Contact pages\n✅ WhatsApp & social media integration\n✅ Google SEO setup\n✅ Fast speed + CMS for easy updates\n\n📅 Timeline: 1–3 weeks\n💰 Cost: PKR 30,000 – 100,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["mobile app", "android app", "ios app", "app banwana"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a mobile app for you.\n\n✅ iOS + Android both platforms\n✅ Custom UI/UX design\n✅ Login, notifications, payments\n✅ Backend API + database\n✅ App Store & Play Store deployment\n\n📅 Timeline: 6–14 weeks\n💰 Cost: PKR 120,000 – 600,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye mobile app banayega\n\n✅ iOS + Android dono platforms\n✅ Custom UI/UX design\n✅ Login, notifications, payments\n✅ Backend API + database\n✅ App Store & Play Store deployment\n\n📅 Timeline: 6–14 weeks\n💰 Cost: PKR 120,000 – 600,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["hospital", "clinic system", "hospital system", "clinic software"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a Hospital System for you.\n\n✅ Patient registration & medical records\n✅ Doctor appointment scheduling\n✅ Billing & invoicing system\n✅ Pharmacy & inventory module\n✅ Multi-role access (admin, doctor, receptionist)\n\n📅 Timeline: 8–14 weeks\n💰 Cost: PKR 200,000 – 500,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye Hospital System banayega\n\n✅ Patient registration & medical records\n✅ Doctor appointment scheduling\n✅ Billing & invoicing system\n✅ Pharmacy & inventory module\n✅ Multi-role access (admin, doctor, receptionist)\n\n📅 Timeline: 8–14 weeks\n💰 Cost: PKR 200,000 – 500,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["school system", "lms", "school management", "education system"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a School Management System for you.\n\n✅ Student & teacher management\n✅ Attendance & timetable system\n✅ Online classes & course material\n✅ Exam & result management\n✅ Fee collection & parent portal\n\n📅 Timeline: 6–12 weeks\n💰 Cost: PKR 150,000 – 400,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye School Management System banayega\n\n✅ Student & teacher management\n✅ Attendance & timetable system\n✅ Online classes & course material\n✅ Exam & result management\n✅ Fee collection & parent portal\n\n📅 Timeline: 6–12 weeks\n💰 Cost: PKR 150,000 – 400,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["restaurant", "pos system", "pos", "restaurant system"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a Restaurant System for you.\n\n✅ Digital menu & table ordering\n✅ POS billing system\n✅ Kitchen order display screen\n✅ Inventory & stock tracking\n✅ Daily sales reports & analytics\n\n📅 Timeline: 3–6 weeks\n💰 Cost: PKR 80,000 – 180,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye Restaurant System banayega\n\n✅ Digital menu & table ordering\n✅ POS billing system\n✅ Kitchen order display screen\n✅ Inventory & stock tracking\n✅ Daily sales reports & analytics\n\n📅 Timeline: 3–6 weeks\n💰 Cost: PKR 80,000 – 180,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["logistics", "fleet", "fleet system", "delivery system", "tracking system"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a Fleet System for you.\n\n✅ Live GPS tracking\n✅ Driver & vehicle management\n✅ Route optimization\n✅ Real-time delivery status updates\n✅ Reports & analytics dashboard\n\n📅 Timeline: 6–10 weeks\n💰 Cost: PKR 150,000 – 350,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye Fleet System banayega\n\n✅ Live GPS tracking\n✅ Driver & vehicle management\n✅ Route optimization\n✅ Real-time delivery status updates\n✅ Reports & analytics dashboard\n\n📅 Timeline: 6–10 weeks\n💰 Cost: PKR 150,000 – 350,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["crm", "erp", "crm system", "erp system"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a CRM/ERP for you.\n\n✅ Customer & lead management\n✅ Sales pipeline tracking\n✅ Employee & HR module\n✅ Inventory & finance tracking\n✅ Custom reports & KPI dashboards\n\n📅 Timeline: 8–16 weeks\n💰 Cost: PKR 200,000 – 700,000+\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye CRM/ERP banayega\n\n✅ Customer & lead management\n✅ Sales pipeline tracking\n✅ Employee & HR module\n✅ Inventory & finance tracking\n✅ Custom reports & KPI dashboards\n\n📅 Timeline: 8–16 weeks\n💰 Cost: PKR 200,000 – 700,000+\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["portfolio website", "portfolio site", "portfolio banwana"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will build a portfolio website for you.\n\n✅ Clean modern design\n✅ About, Skills, Projects sections\n✅ Contact form integration\n✅ Mobile responsive\n✅ Fast loading + hosting setup\n\n📅 Timeline: 3–7 days\n💰 Cost: PKR 15,000 – 40,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye portfolio website banayega\n\n✅ Clean modern design\n✅ About, Skills, Projects sections\n✅ Contact form integration\n✅ Mobile responsive\n✅ Fast loading + hosting setup\n\n📅 Timeline: 3–7 days\n💰 Cost: PKR 15,000 – 40,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }
  if (hasAny(["ui ux", "ui/ux", "design", "figma design", "ux design"])) {
    return language === "english"
      ? "Absolutely! Whimbrel Solution will do UI/UX design for you.\n\n✅ Wireframes & user flow\n✅ High-fidelity Figma designs\n✅ Mobile + desktop responsive\n✅ Brand colors, typography, icons\n✅ Developer-ready design files\n\n📅 Timeline: 1–2 weeks\n💰 Cost: PKR 20,000 – 80,000\n\nWe can customize to your needs! Want to discuss further?"
      : "Bilkul! Whimbrel Solution aapke liye UI/UX design karega\n\n✅ Wireframes & user flow\n✅ High-fidelity Figma designs\n✅ Mobile + desktop responsive\n✅ Brand colors, typography, icons\n✅ Developer-ready design files\n\n📅 Timeline: 1–2 weeks\n💰 Cost: PKR 20,000 – 80,000\n\nApni zaroorat ke mutabiq customize bhi kar sakte hain! Kya aap is par aage baat karna chahte hain?";
  }

  const asksCanBuild =
    hasAny([
      "bana",
      "bna",
      "ban sakta",
      "banasakte",
      "build",
      "develop",
      "create",
      "kar sakte",
      "kr skte",
    ]) &&
    hasAny([
      "crm",
      "system",
      "software",
      "app",
      "web",
      "website",
      "portal",
      "dashboard",
      "platform",
      "lms",
      "erp",
    ]);

  if (asksCanBuild) {
    return language === "english"
      ? "Yes — we can build this. Typical scope: core features, admin panel, secure auth, and mobile-responsive UI. Estimated timeline: 4–12 weeks depending on complexity. Estimated cost: PKR 80,000 – 400,000+ (we’ll refine after details). Want a precise quote? Share: key features, user roles, and deadline."
      : "Ji bilkul — hum ye bana sakte hain. Typical scope: core features, admin panel, secure auth, mobile-responsive UI. Estimated timeline: 4–12 weeks. Estimated cost: PKR 80,000 – 400,000+ (details ke baad refine karenge). Precise quote chahiye? Key features, user roles aur deadline batao.";
  }

  if (hasAny(["crm"])) {
    return language === "english"
      ? "Great idea! Whimbrel can build a custom CRM for you. ✅ Leads & pipeline ✅ Tasks & follow-ups ✅ Reports & dashboards ✅ Team roles & permissions ✅ WhatsApp/Email integration. 📅 Estimated Timeline: 8–16 weeks. 💰 Estimated Cost: PKR 200,000 – 700,000+. Tell me your industry and we can refine the scope."
      : "Great idea! Whimbrel aap ke liye custom CRM bana sakta hai. ✅ Leads & pipeline ✅ Tasks & follow-ups ✅ Reports & dashboards ✅ Team roles & permissions ✅ WhatsApp/Email integration. 📅 Timeline: 8–16 weeks. 💰 Cost: PKR 200,000 – 700,000+. Apna industry batao, scope refine kar dete hain.";
  }

  if (hasAny(["hello", "hi", "assalam", "salam", "aoa", "hey"])) {
    return language === "english"
      ? "Assalam o Alaikum! Welcome to Whimbrel Solution! I'm Whimbrel AI — your personal tech consultant. Share your project idea — Website, App, AI Agent, System, or Store. I'll give you right away: complete features list, exact timeline, and budget estimate. What do you want to build?"
      : "Assalam o Alaikum! Whimbrel Solution mein khushamdeed! Main Whimbrel AI hun — aapka personal tech consultant! Apna project idea batao — Website, App, AI Agent, System, ya Store. Main FORAN dunga: Complete features list, Exact timeline, Budget estimate. Batao — kya banana chahte ho?";
  }

  if (hasAny(["thank", "jazak", "shukria", "shukriya"])) {
    return language === "english"
      ? "You are welcome. If you want, I can now help you with a quick project estimate in 1 minute."
      : "Aap ka bohat shukriya. Agar aap chahen to main 1 minute me quick project estimate format me help kar deta hoon.";
  }

  if (hasAny(["intern", "internship"])) {
    return language === "english"
      ? "Great! We offer internship perks including offer letter, completion certificate, recommendation letter (for top performers), stipends, and goodies. Share your stack and availability so the team can review quickly."
      : "Zabardast! Ham internships me offer letter, completion certificate, top performers ke liye recommendation letter, stipends aur goodies dete hain. Aap apna stack aur availability bhej dein, team quickly review karegi.";
  }

  if (hasAny(["job", "career", "position", "vacancy", "hiring"])) {
    return language === "english"
      ? "We are actively hiring for Frontend, Backend (Node.js), UI/UX, PM, and QA roles. Share your role, experience level, and portfolio/CV link, and we can guide you to apply."
      : "Hum Frontend, Backend (Node.js), UI/UX, PM aur QA roles ke liye hiring kar rahe hain. Aap role, experience level aur CV/portfolio link bhej dein, main apply process guide kar deta hoon.";
  }

  if (hasAny(["blog", "article", "post"])) {
    return language === "english"
      ? "Our blog covers technology, design, and company updates. If you want, I can suggest which article to start with based on your interest."
      : "Hamare blog me technology, design aur company updates hain. Aap batayein kis topic me interest hai, main best article recommend kar deta hoon.";
  }

  if (hasAny(["portfolio", "project", "payease", "shoplux", "medcore", "datavault", "learnflow", "fleettrack", "work", "projects"])) {
    return language === "english"
      ? "Our portfolio includes projects like PayEase, ShopLux, MedCore, DataVault, LearnFlow, FleetTrack and more. You can view case studies on our website or I can tell you about a specific project — which one interests you?"
      : "Hamare portfolio me PayEase, ShopLux, MedCore, DataVault, LearnFlow, FleetTrack jaisi projects hain. Aap website par case studies dekh sakte hain ya main kisi specific project ke baare me bata sakta hun — kis me interest hai?";
  }

  if (hasAny(["frontend", "react", "next", "next.js", "web app"])) {
    return language === "english"
      ? "For frontend/web products, we usually use Next.js + TypeScript + component-driven UI architecture for speed and maintainability."
      : "Frontend/web products ke liye hum aam tor par Next.js + TypeScript + component-driven UI architecture use karte hain taake speed aur maintainability dono achi rahein.";
  }

  if (hasAny(["backend", "api", "node", "database", "server"])) {
    return language === "english"
      ? "For backend systems, we build secure Node.js APIs with scalable database design, auth, monitoring, and deployment best practices."
      : "Backend systems ke liye hum secure Node.js APIs banate hain jisme scalable database design, auth, monitoring aur deployment best practices shamil hoti hain.";
  }

  if (hasAny(["mobile", "android", "ios", "app development"])) {
    return language === "english"
      ? "For mobile apps, we focus on performance, clean UX, and reliable backend integration. We can suggest a practical MVP roadmap if you share your app idea."
      : "Mobile apps ke liye hum performance, clean UX aur reliable backend integration par focus karte hain. Aap app idea share karein to main practical MVP roadmap suggest kar deta hoon.";
  }

  if (hasAny(["ui", "ux", "design", "figma"])) {
    return language === "english"
      ? "Our UI/UX process includes discovery, wireframes, high-fidelity design, and developer-ready handoff. Share your product type and I can suggest a design plan."
      : "Hamari UI/UX process me discovery, wireframes, high-fidelity design aur developer-ready handoff hota hai. Aap product type batayein, main design plan suggest kar deta hoon.";
  }

  if (hasAny(["ai", "machine learning", "ml", "chatbot", "automation"])) {
    return language === "english"
      ? "Yes, we build AI features such as chat assistants, workflow automation, and data-driven recommendations. Share your use-case and current data availability."
      : "Ji, hum AI features banate hain jaise chat assistants, workflow automation, aur data-driven recommendations. Aap apna use-case aur available data share karein.";
  }

  if (hasAny(["cloud", "devops", "aws", "azure", "deployment", "server"])) {
    return language === "english"
      ? "We provide cloud and DevOps support including CI/CD, monitoring, scalable hosting, and performance optimization."
      : "Hum cloud aur DevOps support dete hain jisme CI/CD, monitoring, scalable hosting aur performance optimization shamil hai.";
  }

  if (hasAny(["price", "pricing", "cost", "budget", "quote", "estimate"])) {
    return language === "english"
      ? "Here’s a quick guide: Simple website PKR 25K–60K (1–2 weeks), Business site PKR 40K–100K (2–3 weeks), E-commerce PKR 80K–200K (3–6 weeks), Mobile app basic PKR 120K–250K (4–8 weeks), CRM/ERP PKR 200K–700K+ (8–16 weeks), Portfolio site PKR 15K–40K (1 week). Tell me your project type and I’ll give you a specific range."
      : "Quick guide: Simple website PKR 25K–60K (1–2 weeks), Business site PKR 40K–100K (2–3 weeks), E-commerce PKR 80K–200K (3–6 weeks), Mobile app basic PKR 120K–250K (4–8 weeks), CRM/ERP PKR 200K–700K+ (8–16 weeks), Portfolio PKR 15K–40K (1 week). Apna project type batao, main specific range de dunga.";
  }

  if (hasAny(["timeline", "time", "duration", "kitna time", "kab tak"])) {
    return language === "english"
      ? "Typical delivery range: MVP 4-8 weeks, medium product 8-16 weeks. Final timeline depends on features, integrations, and review cycles."
      : "Typical delivery range: MVP 4-8 weeks, medium product 8-16 weeks. Final timeline features, integrations aur review cycles par depend karti hai.";
  }

  if (hasAny(["contact", "whatsapp", "call", "email", "team se bat"])) {
    return language === "english"
      ? "You can contact our team directly on WhatsApp: +92 334 0007247, or email: hello@whimbrelsolution.com. Working hours: Monday–Friday, 9 AM–6 PM (PKT)."
      : "Aap hamari team se direct WhatsApp par contact karein: +92 334 0007247, ya email karein: hello@whimbrelsolution.com. Working hours: Monday–Friday, 9 AM–6 PM (PKT).";
  }

  const asksWhat = hasAny(["kya", "what", "konsi", "kon sa", "which"]);
  const asksHow = hasAny(["kaise", "kese", "how"]);
  const asksWhen = hasAny(["kab", "when"]);
  const asksWhy = hasAny(["kyun", "why"]);
  const asksHowMuch = hasAny(["kitna", "how much"]);

  if (asksHowMuch) {
    return language === "english"
      ? "Cost depends on scope, but a basic MVP generally starts from a lower budget band and grows with complexity, integrations, and user roles. Share your features and timeline and I will give a practical range."
      : "Cost scope par depend karti hai, lekin basic MVP low budget band se start hota hai aur complexity, integrations, aur user roles ke saath barhta hai. Aap features aur timeline bhej dein, main practical range de deta hoon.";
  }

  if (asksWhen) {
    return language === "english"
      ? "Typical timelines are: simple MVP 4-8 weeks, medium platform 8-16 weeks. Final timeline is confirmed after scope freeze and technical discovery."
      : "Typical timelines yeh hain: simple MVP 4-8 weeks, medium platform 8-16 weeks. Final timeline scope freeze aur technical discovery ke baad confirm hoti hai.";
  }

  if (asksHow) {
    return language === "english"
      ? "Best way is: 1) share your idea and must-have features, 2) we prepare scope and estimate, 3) development starts in sprints with weekly updates, 4) QA + launch + support."
      : "Best tareeqa yeh hai: 1) aap idea aur must-have features share karein, 2) hum scope aur estimate banayen, 3) sprint-based development weekly updates ke saath start ho, 4) QA + launch + support.";
  }

  if (asksWhy) {
    return language === "english"
      ? "Because a custom solution gives better control, scalability, and integration with your exact workflow. It helps reduce manual work and improves long-term efficiency."
      : "Is liye kyun ke custom solution aap ko better control, scalability aur aapke exact workflow ke mutabiq integration deta hai. Is se manual work kam hota hai aur long-term efficiency improve hoti hai.";
  }

  if (asksWhat) {
    return language === "english"
      ? "We provide end-to-end software services: planning, UI/UX, development, testing, deployment, and support for web, mobile, AI, and cloud products. I'm Whimbrel AI — how can I help you today?"
      : "Hum end-to-end software services dete hain: planning, UI/UX, development, testing, deployment aur support — web, mobile, AI aur cloud products ke liye. Main Whimbrel AI hun — aaj main aapki kya madad kar sakta hun?";
  }

  return language === "english"
    ? "I can help with services, scope, timeline, budget, and bookings. Tell me what you need, or we can connect you with our team: WhatsApp +92 334 0007247."
    : "Main services, scope, timeline, budget aur bookings me help kar sakta hun. Batayein aapko kya chahiye, ya hamari team se connect karein: WhatsApp +92 334 0007247.";
}

function fallbackReply(message: string, language: "roman-urdu" | "english") {
  const text = message.toLowerCase().trim();
  const hasAny = (words: string[]) => words.some((word) => text.includes(word));

  if (
    hasAny([
      "whimbrel",
      "who are you",
      "about company",
      "about whimbrel",
      "kya hai",
      "kya ha",
      "what is",
    ])
  ) {
    return language === "english"
      ? "Whimbrel Solution is a Premium Software House based in Islamabad, Pakistan. Our CEO/Founder is Mr. Junaid (AI Engineer). We build custom software, mobile apps, web platforms, AI solutions, and cloud systems for startups and businesses. Website: https://whimbrelsolution.netlify.app"
      : "Whimbrel Solution Islamabad, Pakistan ki ek Premium Software House hai. CEO/Founder Mr. Junaid (AI Engineer) hain. Hum custom software, mobile apps, web platforms, AI solutions aur cloud systems build karte hain. Website: https://whimbrelsolution.netlify.app";
  }

  if (hasAny(["service", "services", "what do you do", "kya karte ho"])) {
    return language === "english"
      ? "Our services: (1) Custom Software Development – scalable apps for startups & enterprises. (2) Mobile App Development – iOS & Android with premium UX. (3) Web Development – fast, secure, conversion-focused sites. (4) AI Chatbot & Automation – intelligent chatbots, automation workflows, and smart assistants. (5) Cloud & DevOps – CI/CD, infrastructure, monitoring. (6) UI/UX Design – elegant interfaces for retention and trust. Which one interests you?"
      : "Hamari services: (1) Custom Software Development – startups aur enterprises ke liye scalable apps. (2) Mobile App Development – iOS & Android premium UX ke sath. (3) Web Development – fast, secure, conversion-focused sites. (4) AI Chatbot & Automation – intelligent chatbots, automation workflows, smart assistants. (5) Cloud & DevOps – CI/CD, infrastructure, monitoring. (6) UI/UX Design – elegant interfaces. Kis me interest hai?";
  }

  if (hasAny(["price", "pricing", "cost", "budget", "quote", "estimate"])) {
    return language === "english"
      ? "Quick pricing guide: Simple website PKR 25K–60K, Business site PKR 40K–100K, E-commerce PKR 80K–200K, Mobile app PKR 120K–600K+, CRM/ERP PKR 200K–700K+, Portfolio PKR 15K–40K. Tell me your project type for a specific estimate."
      : "Quick guide: Simple website PKR 25K–60K, Business site PKR 40K–100K, E-commerce PKR 80K–200K, Mobile app PKR 120K–600K+, CRM/ERP PKR 200K–700K+, Portfolio PKR 15K–40K. Apna project type batao, main specific estimate de dunga.";
  }

  if (hasAny(["timeline", "time", "duration", "kitna time", "kitna waqt"])) {
    return language === "english"
      ? "Typical timeline: MVP 4-8 weeks, medium product 8-16 weeks. Exact timing depends on features and integrations."
      : "Typical timeline: MVP 4-8 weeks, medium product 8-16 weeks. Exact timing features aur integrations par depend karta hai.";
  }

  if (hasAny(["process", "kaise", "workflow", "steps"])) {
    return language === "english"
      ? "Our process is simple: discovery call -> scope/proposal -> sprint development -> QA/testing -> launch & support."
      : "Hamara process simple hai: discovery call -> scope/proposal -> sprint development -> QA/testing -> launch & support.";
  }

  if (hasAny(["contact", "whatsapp", "call", "email"])) {
    return language === "english"
      ? "You can contact us directly on WhatsApp: +92 334 0007247, or email: hello@whimbrelsolution.com. We're here Monday–Friday, 9 AM–6 PM (PKT)."
      : "Aap humein WhatsApp par directly contact kar sakte hain: +92 334 0007247, ya email: hello@whimbrelsolution.com. Hum Monday–Friday, 9 AM–6 PM (PKT) available hain.";
  }

  return smartLocalReply(message, language);
}

function formatHistory(history: Payload["history"]) {
  return (history ?? [])
    .slice(-10)
    .map((item) => `${item.role.toUpperCase()}: ${item.content}`)
    .join("\n");
}

async function askClaude(prompt: string) {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": key,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      temperature: 0.6,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as {
    content?: Array<{ type: string; text?: string }>;
  };
  const text = data.content?.find((item) => item.type === "text")?.text?.trim();
  return text || null;
}

async function askGemini(prompt: string) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: `${SYSTEM_PROMPT}\n\n${prompt}` }] }],
        generationConfig: { temperature: 0.6 },
      }),
    },
  );

  if (!response.ok) return null;
  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  return text || null;
}

async function askOpenAI(prompt: string) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: `${SYSTEM_PROMPT}\n\n${prompt}`,
      temperature: 0.6,
    }),
  });

  if (!response.ok) return null;
  const data = (await response.json()) as { output_text?: string };
  return data.output_text?.trim() || null;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    const message = body.message?.trim();
    const language = body.language === "english" ? "english" : "roman-urdu";
    if (!message) {
      return NextResponse.json({ reply: "Please type a valid question." }, { status: 400 });
    }

    const directIntentReply = intentFirstReply(message, language);
    if (directIntentReply) {
      return NextResponse.json({ reply: directIntentReply });
    }

    const leadContext = body.lead?.name
      ? `LEAD: Name=${body.lead.name}, Phone=${body.lead.phone ?? "N/A"}, Email=${body.lead.email ?? "N/A"}`
      : "LEAD: Unknown";
    const quoteRequested = /(quote|estimate|pricing|price|budget|cost)/i.test(message);

    const prompt = [
      `LANGUAGE: ${language}`,
      leadContext,
      quoteRequested
        ? "Give a direct estimate: use the PRICING GUIDE in your instructions. Reply with project type, timeline range, and PKR range. Do NOT ask user to describe more first — give an initial estimate immediately."
        : "",
      formatHistory(body.history),
      `USER: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");

    const modelReply =
      (await askGemini(prompt)) ??
      (await askClaude(prompt)) ??
      (await askOpenAI(prompt));

    const reply =
      modelReply && !isLowValueReply(modelReply)
        ? modelReply
        : fallbackReply(message, language);

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { reply: "Assistant temporarily unavailable. Please try again shortly." },
      { status: 500 },
    );
  }
}
