import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const SUBSCRIBERS_FILE = "data/subscribers.json";

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

export async function POST(request: Request) {
  try {
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
