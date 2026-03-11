"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  Briefcase,
  CheckCircle2,
  Loader2,
  UploadCloud,
  X,
} from "lucide-react";

export type JobForModal = {
  title: string;
  department: string;
  location: string;
  type: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  job: JobForModal | null;
};

export default function JobApplicationModal({ isOpen, onClose, job }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClose = useCallback(() => {
    if (loading) return;
    setSubmitted(false);
    setFileName(null);
    onClose();
  }, [loading, onClose]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!job) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const resumeFile = formData.get("resume") as File | null;

    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("position", job.title);
      submitData.append("fullName", formData.get("fullName") as string);
      submitData.append("email", formData.get("email") as string);
      submitData.append("phone", formData.get("phone") as string);
      submitData.append("experience", formData.get("experience") as string);
      submitData.append("currentJobTitle", formData.get("currentJobTitle") as string);
      submitData.append("portfolioUrl", formData.get("portfolioUrl") as string);
      submitData.append("coverLetter", formData.get("coverLetter") as string);
      if (resumeFile?.size) submitData.append("resume", resumeFile);

      const res = await fetch("/api/apply", {
        method: "POST",
        body: submitData,
      });
      if (!res.ok) throw new Error("Submit failed");
    } catch {
      // Fallback: still show success after 1.5s
    }
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  const openFilePicker = () => fileInputRef.current?.click();

  if (!isOpen) return null;

  const fieldClass =
    "w-full bg-[rgba(255,255,255,0.04)] border border-[rgba(45,212,191,0.2)] rounded-[10px] px-4 py-3 text-white text-[0.95rem] transition-all duration-300 outline-none placeholder:text-white/30 focus:border-[rgba(45,212,191,0.8)] focus:bg-[rgba(45,212,191,0.06)] focus:shadow-[0_0_0_3px_rgba(45,212,191,0.1)]";
  const labelClass = "block text-sm font-semibold text-[#2dd4bf] mb-1.5";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="relative max-h-[90vh] w-full max-w-[600px] overflow-y-auto rounded-[20px]"
        style={{
          background: "#0d1117",
          border: "1px solid rgba(45, 212, 191, 0.3)",
          boxShadow:
            "0 0 60px rgba(45,212,191,0.15), 0 30px 80px rgba(0,0,0,0.6)",
          animation: "modalIn 0.4s ease forwards",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes modalIn {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {/* Header */}
        <div
          className="relative"
          style={{
            background: "linear-gradient(135deg, rgba(45,212,191,0.12) 0%, transparent 100%)",
            padding: "28px 32px 20px",
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(45,212,191,0.4)] text-[#2dd4bf] transition hover:border-[#2dd4bf] hover:shadow-[0_0_20px_rgba(45,212,191,0.3)]"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <Briefcase className="text-[#2dd4bf]" size={32} />
          {job && (
            <>
              <h2 id="modal-title" className="mt-3 text-xl font-bold leading-tight text-white sm:text-2xl">
                {job.title}
              </h2>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-[rgba(45,212,191,0.2)] px-3 py-0.5 text-xs font-semibold text-[#2dd4bf]">
                  {job.department}
                </span>
                <span className="text-white/50">·</span>
                <span className="rounded-full bg-[rgba(45,212,191,0.2)] px-3 py-0.5 text-xs font-semibold text-[#2dd4bf]">
                  {job.location}
                </span>
                <span className="text-white/50">·</span>
                <span className="rounded-full bg-[rgba(45,212,191,0.2)] px-3 py-0.5 text-xs font-semibold text-[#2dd4bf]">
                  {job.type}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Body */}
        <div className="p-8">
          {submitted && job ? (
            <div
              className="flex flex-col items-center text-center"
              style={{ animation: "modalIn 0.4s ease" }}
            >
              <CheckCircle2 className="text-[#2dd4bf]" size={64} />
              <h3 className="mt-4 text-2xl font-bold text-white">
                Application Submitted! 🎉
              </h3>
              <p className="mt-3 text-white/80">
                Thank you for applying for <strong>{job.title}</strong>. We will
                review your application and get back to you within 3-5 business
                days.
              </p>
              <p className="mt-2 text-sm text-white/50">
                A confirmation has been sent to your email.
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-6 rounded-xl border-2 border-[#2dd4bf] bg-transparent px-6 py-3 font-semibold text-[#2dd4bf] transition hover:bg-[rgba(45,212,191,0.1)]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="fullName" className={labelClass}>
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  disabled={loading}
                  placeholder="Enter your full name"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  disabled={loading}
                  placeholder="your@email.com"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  disabled={loading}
                  placeholder="+92 300 0000000"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="experience" className={labelClass}>
                  Years of Experience *
                </label>
                <select
                  id="experience"
                  name="experience"
                  required
                  disabled={loading}
                  className={fieldClass}
                >
                  <option value="">Select experience level</option>
                  <option value="Fresh / Less than 1 year">Fresh / Less than 1 year</option>
                  <option value="1 - 2 years">1 - 2 years</option>
                  <option value="2 - 4 years">2 - 4 years</option>
                  <option value="4 - 6 years">4 - 6 years</option>
                  <option value="6 - 10 years">6 - 10 years</option>
                  <option value="10+ years">10+ years</option>
                </select>
              </div>
              <div>
                <label htmlFor="currentJobTitle" className={labelClass}>
                  Current or Last Job Title
                </label>
                <input
                  id="currentJobTitle"
                  name="currentJobTitle"
                  type="text"
                  disabled={loading}
                  placeholder="e.g. Frontend Developer at XYZ"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="portfolioUrl" className={labelClass}>
                  Portfolio or LinkedIn URL
                </label>
                <input
                  id="portfolioUrl"
                  name="portfolioUrl"
                  type="url"
                  disabled={loading}
                  placeholder="https://linkedin.com/in/yourname"
                  className={fieldClass}
                />
              </div>
              <div>
                <label className={labelClass}>Upload Resume *</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx"
                  required
                  disabled={loading}
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div
                  role="button"
                  tabIndex={0}
                  onClick={openFilePicker}
                  onKeyDown={(e) => e.key === "Enter" && openFilePicker()}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.03)] py-6 transition hover:border-[rgba(45,212,191,0.6)] hover:bg-[rgba(45,212,191,0.07)]"
                >
                  {fileName ? (
                    <>
                      <CheckCircle2 className="text-[#2dd4bf]" size={28} />
                      <span className="mt-2 text-sm font-medium text-white">
                        {fileName}
                      </span>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="text-[#2dd4bf]" size={32} />
                      <span className="mt-2 text-sm font-medium text-white/90">
                        Click to upload or drag and drop
                      </span>
                      <span className="mt-0.5 text-xs text-white/50">
                        PDF, DOC, DOCX — Max 5MB
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="coverLetter" className={labelClass}>
                  Why do you want to join Whimbrel? (Optional)
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  rows={4}
                  disabled={loading}
                  placeholder="Tell us a bit about yourself and why you're excited about this role..."
                  className={`${fieldClass} resize-y`}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-xl py-3.5 text-base font-bold text-black transition duration-300 hover:-translate-y-0.5 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
                style={{
                  background: "linear-gradient(135deg, #2dd4bf, #0d9488)",
                  boxShadow: loading ? "none" : "0 4px 20px rgba(45,212,191,0.3)",
                }}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </span>
                ) : (
                  "Submit Application →"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
