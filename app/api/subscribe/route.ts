import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { rateLimit } from "@/lib/rateLimit";

const SUBSCRIBERS_FILE = "data/subscribers.json";
const SUBSCRIBE_RATE_LIMIT = 5;

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
    const limit = rateLimit(request, SUBSCRIBE_RATE_LIMIT);
    if (!limit.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: limit.retryAfter ? { "Retry-After": String(limit.retryAfter) } : undefined }
      );
    }
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const dir = path.join(process.cwd(), "data");
    const filePath = path.join(process.cwd(), SUBSCRIBERS_FILE);

    let subscribers: string[] = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);
      subscribers = Array.isArray(parsed) ? parsed : [];
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }

    if (subscribers.includes(email)) {
      return NextResponse.json({ success: true, message: "Already subscribed." });
    }

    subscribers.push(email);
    await fs.writeFile(
      filePath,
      JSON.stringify(subscribers, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch {
    return NextResponse.json(
      { error: "Subscription failed. Please try again." },
      { status: 500 }
    );
  }
}
