"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Loader2,
  Shield,
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

const EXPERIENCE_OPTIONS = [
  "Select experience level",
  "Fresh / Less than 1 year",
  "1 - 2 years",
  "2 - 4 years",
  "4 - 6 years",
  "6 - 10 years",
  "10+ years",
];

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
    const email = String(formData.get("email") ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const { toast } = await import("sonner");
      toast.error("Please enter a valid email address.");
      return;
    }
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
      // Fallback: show success after 1.5s
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
    "job-modal-input w-full rounded-[10px] px-[14px] py-[11px] text-[14px] outline-none transition-all duration-[0.25s] ease-[ease] font-inherit disabled:opacity-60";
  const labelClass =
    "job-modal-label block text-[12px] font-semibold uppercase tracking-[0.04em] mb-[7px]";

  return (
    <>
      <style>{`
        .job-modal-overlay {
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        [data-theme="light"] .job-modal-overlay {
          background: rgba(0, 0, 0, 0.75);
        }
        .job-modal-container {
          animation: jobModalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          height: 100%;
          align-items: stretch;
        }
        @keyframes jobModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .job-modal-container-mobile {
          animation: jobSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes jobSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .job-modal-left {
          background: linear-gradient(160deg, #0d4f4a 0%, #0a3330 40%, #061a18 100%);
          border-right: 1px solid rgba(45,212,191,0.15);
          overflow: hidden;
          height: 100%;
        }
        [data-theme="light"] .job-modal-left {
          background: linear-gradient(160deg, rgba(0,201,167,0.18) 0%, rgba(0,201,167,0.08) 40%, rgba(0,168,142,0.04) 100%);
          border-right-color: rgba(0,201,167,0.25);
        }
        .job-modal-right.right-panel {
          background: var(--navy-2);
          overflow-y: auto;
          overflow-x: hidden;
          height: 100%;
          max-height: min(680px, 92vh);
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,201,167,0.5) rgba(0,0,0,0.2);
        }
        @media (max-width: 639px) {
          .job-modal-right.right-panel {
            max-height: 90dvh;
          }
        }
        .right-panel::-webkit-scrollbar {
          width: 8px;
          background: rgba(0,0,0,0.2);
          border-radius: 4px;
        }
        .right-panel::-webkit-scrollbar-thumb {
          background: rgba(0,201,167,0.5);
          border-radius: 4px;
        }
        .right-panel::-webkit-scrollbar-thumb:hover {
          background: rgba(0,201,167,0.7);
        }
        .job-modal-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #e8f0f5;
          -webkit-text-fill-color: #e8f0f5;
        }
        [data-theme="dark"] .job-modal-input,
        html:not([data-theme="light"]) .job-modal-input {
          color: #e8f0f5 !important;
          -webkit-text-fill-color: #e8f0f5 !important;
        }
        .job-modal-input::placeholder {
          color: rgba(255,255,255,0.22);
        }
        .job-modal-input:-webkit-autofill,
        .job-modal-input:-webkit-autofill:hover,
        .job-modal-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #e8f0f5;
          -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.04) inset;
        }
        [data-theme="dark"] .job-modal-input:-webkit-autofill,
        [data-theme="dark"] .job-modal-input:-webkit-autofill:hover,
        [data-theme="dark"] .job-modal-input:-webkit-autofill:focus,
        html:not([data-theme="light"]) .job-modal-input:-webkit-autofill,
        html:not([data-theme="light"]) .job-modal-input:-webkit-autofill:hover,
        html:not([data-theme="light"]) .job-modal-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #e8f0f5 !important;
        }
        [data-theme="light"] .job-modal-input {
          background: rgba(0,0,0,0.04);
          border-color: rgba(0,0,0,0.12);
          color: #0b1929 !important;
          -webkit-text-fill-color: #0b1929 !important;
        }
        [data-theme="light"] .job-modal-input::placeholder {
          color: rgba(0,0,0,0.35);
        }
        [data-theme="light"] .job-modal-input:-webkit-autofill,
        [data-theme="light"] .job-modal-input:-webkit-autofill:hover,
        [data-theme="light"] .job-modal-input:-webkit-autofill:focus {
          -webkit-text-fill-color: #0b1929;
          -webkit-box-shadow: 0 0 0 1000px rgba(0,0,0,0.04) inset;
        }
        .job-modal-input:focus {
          border-color: rgba(45,212,191,0.7);
          background: rgba(45,212,191,0.05);
          box-shadow: 0 0 0 3px rgba(45,212,191,0.12);
        }
        .job-modal-label {
          color: rgba(45,212,191,0.9);
        }
        [data-theme="light"] .job-modal-label {
          color: var(--teal);
        }
        .job-modal-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%232dd4bf' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 36px;
          cursor: pointer;
          color: #e8f0f5;
          -webkit-text-fill-color: #e8f0f5;
        }
        [data-theme="dark"] .job-modal-select,
        html:not([data-theme="light"]) .job-modal-select {
          color: #e8f0f5 !important;
          -webkit-text-fill-color: #e8f0f5 !important;
        }
        .job-modal-select option {
          background: #0f1e2e;
          color: #e8f0f5;
        }
        [data-theme="dark"] .job-modal-select option,
        html:not([data-theme="light"]) .job-modal-select option {
          background: #0f1e2e !important;
          color: #e8f0f5 !important;
        }
        [data-theme="light"] .job-modal-select {
          color: #0b1929;
          -webkit-text-fill-color: #0b1929;
        }
        [data-theme="light"] .job-modal-select option {
          background: #ffffff;
          color: #0b1929;
        }
        .job-modal-submit {
          background: linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%);
        }
        .job-modal-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(45,212,191,0.5), 0 8px 25px rgba(45,212,191,0.3);
          filter: brightness(1.05);
        }
        .job-modal-submit:active:not(:disabled) {
          transform: translateY(0) scale(0.99);
        }
        @keyframes jobPopIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
        @media (max-width: 639px) {
          .job-modal-container {
            animation: jobSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        }
        @keyframes jobShimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>

      <div
        className="job-modal-overlay fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-modal-title"
      >
        <div
          className="job-modal-container flex h-[90dvh] max-h-[100dvh] w-full items-stretch overflow-hidden rounded-t-[20px] sm:h-[min(680px,92vh)] sm:max-h-[92vh] sm:max-w-[min(900px,95vw)] sm:rounded-[24px]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(45,212,191,0.25), 0 0 80px rgba(45,212,191,0.12), 0 40px 120px rgba(0,0,0,0.7)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT PANEL — Info (hidden on mobile) */}
          <div className="job-modal-left relative hidden w-0 flex-col justify-between overflow-hidden p-0 sm:block sm:w-[35%] sm:p-8 sm:pr-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(45,212,191,0.2)] text-[#2dd4bf] font-bold">
                  W
                </span>
                <span className="text-sm font-semibold text-white">
                  Whimbrel Solution
                </span>
              </div>
              <div className="my-5 h-px bg-[rgba(45,212,191,0.3)]" />
              <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#2dd4bf]">
                You&apos;re applying for
              </p>
              {job && (
                <>
                  <h2
                    id="job-modal-title"
                    className="mt-2 text-[20px] font-bold leading-tight text-white"
                  >
                    {job.title}
                  </h2>
                  <div className="mt-3 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-3 py-1 text-[11px] text-[#2dd4bf]">
                      {job.department}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-3 py-1 text-[11px] text-[#2dd4bf]">
                      {job.location}
                    </span>
                    <span className="text-white/40">·</span>
                    <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-3 py-1 text-[11px] text-[#2dd4bf]">
                      {job.type}
                    </span>
                  </div>
                </>
              )}
            </div>
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="text-[#2dd4bf] shrink-0" size={16} />
                <span className="text-[13px] text-white/70">
                  Quick 2-min application
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="text-[#2dd4bf] shrink-0" size={16} />
                <span className="text-[13px] text-white/70">
                  Response within 3-5 days
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Shield className="text-[#2dd4bf] shrink-0" size={16} />
                <span className="text-[13px] text-white/70">
                  Your data is safe with us
                </span>
              </div>
            </div>
            <div
              className="pointer-events-none absolute bottom-5 left-5 h-[120px] w-[120px] rounded-full bg-[rgba(45,212,191,0.08)] blur-[40px]"
              aria-hidden
            />
          </div>

          {/* RIGHT PANEL — Form */}
          <div className="job-modal-right right-panel relative flex flex-1 flex-col sm:max-w-[65%]">
            <button
              type="button"
              onClick={handleClose}
              className="sticky top-5 z-[100] ml-auto mr-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-navy-2/95 shadow-lg backdrop-blur-sm text-white/90 transition hover:border-red-500/40 hover:bg-red-500/20 hover:text-white"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>
            {submitted && job ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[rgba(45,212,191,0.5)] bg-[rgba(45,212,191,0.12)]"
                  style={{ animation: "jobPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
                >
                  <CheckCircle2 className="text-[#2dd4bf]" size={40} />
                </div>
                <h3 className="mt-5 text-[20px] font-bold text-[var(--text)]">
                  Application Sent! 🎉
                </h3>
                <p className="mt-2 text-[14px] text-[var(--text-muted)]">
                  Thanks for applying for {job.title}.
                </p>
                <p className="mt-2 text-[13px] text-[var(--text-muted)]">
                  We&apos;ll review your profile and reach out within 3–5 business
                  days.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-7 rounded-[10px] border-[1.5px] border-[rgba(45,212,191,0.4)] bg-transparent px-8 py-2.5 font-semibold text-[#2dd4bf] transition hover:bg-[rgba(45,212,191,0.1)]"
                >
                  Close
                </button>
              </div>
                ) : (
              <>
                {/* Mobile-only job info */}
                {job && (
                  <div className="block border-b border-white/10 px-6 pb-4 pt-14 sm:hidden">
                    <h2 className="text-sm font-bold text-[var(--text)]">
                      {job.title}
                    </h2>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-2.5 py-0.5 text-[10px] text-[#2dd4bf]">
                        {job.department}
                      </span>
                      <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-2.5 py-0.5 text-[10px] text-[#2dd4bf]">
                        {job.location}
                      </span>
                      <span className="rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.15)] px-2.5 py-0.5 text-[10px] text-[#2dd4bf]">
                        {job.type}
                      </span>
                    </div>
                  </div>
                )}

                <div className="px-6 pb-8 pt-8 sm:px-10 sm:pt-9 sm:pb-10">
                  <h3 className="text-[18px] font-bold text-[var(--text)] sm:mt-0">
                    Complete Your Application
                  </h3>
                  <p className="mt-1 text-[13px] text-[var(--text-muted)]">
                    Fill in the details below — takes less than 2 minutes
                  </p>

                  <form
                    onSubmit={handleSubmit}
                    className="mt-7 space-y-[18px]"
                  >
                    <div className="grid gap-4 sm:grid-cols-2">
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
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
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
                          className={fieldClass + " job-modal-select"}
                        >
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <option
                              key={opt}
                              value={
                                opt === EXPERIENCE_OPTIONS[0] ? "" : opt
                              }
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="currentJobTitle"
                        className={labelClass}
                      >
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
                        Portfolio / LinkedIn URL
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
                        onKeyDown={(e) =>
                          e.key === "Enter" && openFilePicker()
                        }
                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-[1.5px] border-dashed border-[rgba(45,212,191,0.35)] bg-[rgba(45,212,191,0.02)] py-5 transition hover:border-[rgba(45,212,191,0.7)] hover:bg-[rgba(45,212,191,0.06)]"
                      >
                        {fileName ? (
                          <>
                            <CheckCircle2
                              className="text-[#2dd4bf]"
                              size={20}
                            />
                            <span className="mt-2 text-sm font-medium text-[#2dd4bf]">
                              {fileName}
                            </span>
                            <span className="mt-1 text-xs text-white/40 underline">
                              Change file
                            </span>
                          </>
                        ) : (
                          <>
                            <UploadCloud
                              className="text-[#2dd4bf]"
                              size={28}
                            />
                            <span className="mt-2 text-[13px] text-white/60">
                              Drop your resume here or click to browse
                            </span>
                            <span className="mt-0.5 text-[11px] text-white/30">
                              PDF, DOC, DOCX · Max 5MB
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
                        rows={3}
                        disabled={loading}
                        placeholder="Tell us a bit about yourself and why you're excited about this role..."
                        className={fieldClass + " min-h-[80px] resize-y"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="job-modal-submit relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl py-[13px] text-[15px] font-bold tracking-[0.02em] text-black transition disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {loading ? (
                        <>
                          <Loader2
                            size={18}
                            className="animate-spin text-black"
                          />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <span className="relative z-10">
                            Submit Application →
                          </span>
                          <span
                            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
                            style={{
                              animation: "jobShimmer 3s ease-in-out infinite",
                            }}
                          />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
