import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const APPLICATIONS_FILE = "data/applications.json";
const MAX_RESUME_SIZE = 5 * 1024 * 1024; // 5MB

type ApplicationRecord = {
  id: string;
  position: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentJobTitle: string;
  portfolioUrl: string;
  coverLetter: string;
  resumeFileName: string | null;
  submittedAt: string;
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const position = String(formData.get("position") ?? "").trim();
    const fullName = String(formData.get("fullName") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const experience = String(formData.get("experience") ?? "").trim();
    const currentJobTitle = String(formData.get("currentJobTitle") ?? "").trim();
    const portfolioUrl = String(formData.get("portfolioUrl") ?? "").trim();
    const coverLetter = String(formData.get("coverLetter") ?? "").trim();

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Full name, email, and phone are required." },
        { status: 400 }
      );
    }

    const resumeFile = formData.get("resume") as File | null;
    let resumeFileName: string | null = null;
    if (resumeFile && resumeFile.size > 0) {
      if (resumeFile.size > MAX_RESUME_SIZE) {
        return NextResponse.json(
          { error: "Resume must be 5MB or less." },
          { status: 400 }
        );
      }
      resumeFileName = resumeFile.name;
      // Optionally save file to disk (e.g. /tmp or uploads) — on serverless often skipped
      // Here we only store the filename in the application record.
    }

    const record: ApplicationRecord = {
      id: `app-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      position,
      fullName,
      email,
      phone,
      experience,
      currentJobTitle,
      portfolioUrl,
      coverLetter,
      resumeFileName,
      submittedAt: new Date().toISOString(),
    };

    const dir = path.join(process.cwd(), "data");
    const filePath = path.join(process.cwd(), APPLICATIONS_FILE);
    let applications: ApplicationRecord[] = [];
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(data);
      applications = Array.isArray(parsed) ? parsed : [];
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
    applications.push(record);
    await fs.writeFile(
      filePath,
      JSON.stringify(applications, null, 2),
      "utf-8"
    );

    return NextResponse.json({ success: true, id: record.id });
  } catch {
    return NextResponse.json(
      { error: "Application could not be submitted. Please try again." },
      { status: 500 }
    );
  }
}
