import { NextResponse } from "next/server";

type Payload = {
  message?: string;
  history?: Array<{ role: "user" | "assistant"; content: string }>;
  language?: "roman-urdu" | "english";
  lead?: { name?: string; phone?: string; email?: string };
};

const SYSTEM_PROMPT = `
You are the official AI assistant for Whimbrel Solution (Pakistan software house).
Reply style:
- Roman Urdu + simple English
- Professional, clear, and helpful
- Avoid robotic one-liners; give practical next steps
- Keep answers concise (2-6 lines) unless user asks detail

Business context:
- Services: Custom Software, Mobile Apps, Web Development, AI/ML, Cloud & DevOps, UI/UX
- Typical timeline: MVP 4-8 weeks, mid-size product 8-16 weeks
- Process: discovery -> proposal -> sprint delivery -> QA -> launch/support
- Contact priority: WhatsApp +92 334 0007247

When user asks pricing:
- Explain cost depends on scope/features/timeline
- Ask 3 quick qualifiers: product type, must-have features, target deadline

If user asks unrelated unsafe content, politely refuse and bring back to business help.
`;

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
    normalized.includes("tell me your goal in one line")
  );
}

function smartLocalReply(message: string, language: "roman-urdu" | "english") {
  const text = message.toLowerCase().trim();
  const hasAny = (words: string[]) => words.some((word) => text.includes(word));

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
      ? "Yes, absolutely — we can build this for you. We regularly deliver CRM, dashboards, web apps, and custom software systems. Share these 4 details for a precise plan: key features, user roles, target timeline, and budget range."
      : "Ji bilkul — hum ye aap ke liye build kar sakte hain. Hum CRM, dashboards, web apps aur custom software systems regular basis par deliver karte hain. Accurate plan ke liye 4 cheezen share karein: key features, user roles, target timeline aur budget range.";
  }

  if (hasAny(["crm"])) {
    return language === "english"
      ? "Yes, we build custom CRM platforms. Typical CRM modules include leads, pipeline, follow-ups, tasks, reports, team roles, and WhatsApp/email integration."
      : "Ji, hum custom CRM platforms banate hain. Typical CRM modules me leads, pipeline, follow-ups, tasks, reports, team roles aur WhatsApp/email integration shamil hoti hain.";
  }

  if (hasAny(["hello", "hi", "assalam", "salam", "aoa"])) {
    return language === "english"
      ? "Hi! Welcome to Whimbrel Solution. Tell me your project idea, and I will guide you on the best service, timeline, and budget direction."
      : "Assalam o Alaikum! Whimbrel Solution me khush aamdeed. Aap project idea share karein, main best service, timeline aur budget direction suggest karta hoon.";
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
      ? "To give an accurate estimate, please share: (1) product type, (2) must-have features, (3) target deadline, and (4) expected user scale."
      : "Accurate estimate ke liye ye 4 cheezen share karein: (1) product type, (2) must-have features, (3) target deadline, aur (4) expected user scale.";
  }

  if (hasAny(["timeline", "time", "duration", "kitna time", "kab tak"])) {
    return language === "english"
      ? "Typical delivery range: MVP 4-8 weeks, medium product 8-16 weeks. Final timeline depends on features, integrations, and review cycles."
      : "Typical delivery range: MVP 4-8 weeks, medium product 8-16 weeks. Final timeline features, integrations aur review cycles par depend karti hai.";
  }

  if (hasAny(["contact", "whatsapp", "call", "email", "team se bat"])) {
    return language === "english"
      ? "You can contact our team directly on WhatsApp: +92 334 0007247, or email: hello@whimbrelsolution.com"
      : "Aap hamari team se direct WhatsApp par contact karein: +92 334 0007247, ya email karein: hello@whimbrelsolution.com";
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
      ? "We provide end-to-end software services: planning, UI/UX, development, testing, deployment, and support for web, mobile, AI, and cloud products."
      : "Hum end-to-end software services dete hain: planning, UI/UX, development, testing, deployment aur support — web, mobile, AI aur cloud products ke liye.";
  }

  return language === "english"
    ? "I can help with service selection, scope planning, timeline, budget, and implementation. Tell me what you want to build, and I will give you a direct actionable answer."
    : "Main service selection, scope planning, timeline, budget aur implementation me help kar sakta hoon. Aap batayein kya build karna hai, main aap ko direct actionable jawab deta hoon.";
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
      ? "Whimbrel Solution is a Pakistan-based software house. We build custom software, mobile apps, web platforms, AI solutions, and cloud systems for startups and businesses."
      : "Whimbrel Solution Pakistan based software house hai. Hum custom software, mobile apps, web platforms, AI solutions, aur cloud systems build karte hain.";
  }

  if (hasAny(["service", "services", "what do you do", "kya karte ho"])) {
    return language === "english"
      ? "Our core services are: Custom Software, Mobile Apps, Web Development, AI/ML, Cloud & DevOps, and UI/UX Design."
      : "Hamari core services hain: Custom Software, Mobile Apps, Web Development, AI/ML, Cloud & DevOps, aur UI/UX Design.";
  }

  if (hasAny(["price", "pricing", "cost", "budget", "quote", "estimate"])) {
    return language === "english"
      ? "Pricing depends on scope. Share these 3 things and I will suggest a realistic estimate: (1) product type, (2) must-have features, (3) target deadline."
      : "Pricing scope par depend karti hai. Ye 3 cheezen share karein to main realistic estimate de sakta hoon: (1) product type, (2) must-have features, (3) target deadline.";
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
      ? "You can contact us directly on WhatsApp: +92 334 0007247"
      : "Aap humein WhatsApp par directly contact kar sakte hain: +92 334 0007247";
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
      model: "claude-3-5-sonnet-latest",
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
        ? "If user asks for quote, give a compact estimate template with: scope assumptions, timeline range, budget range bands, and next step CTA."
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
