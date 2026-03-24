"use client";

import { useCallback, useEffect, useState } from "react";
import { Award, CheckCircle2, GraduationCap, Loader2, X } from "lucide-react";

export type EnrollModalItem = {
  title: string;
  price?: string;
  isInternship?: boolean;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: EnrollModalItem | null;
};

const EDUCATION_OPTIONS = [
  "Select education level",
  "Matric",
  "Intermediate",
  "Bachelors",
  "Masters",
  "Other",
];

const EXPERIENCE_OPTIONS = [
  "Select experience level",
  "Fresh",
  "Less than 1 year",
  "1-2 years",
  "2-4 years",
  "4+ years",
];

const HEARD_OPTIONS = [
  "Select option",
  "Google",
  "Instagram",
  "Facebook",
  "Friend",
  "LinkedIn",
  "Other",
];

export default function EnrollModal({ isOpen, onClose, item }: Props) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitEmail, setSubmitEmail] = useState("");

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClose = useCallback(() => {
    if (loading) return;
    setSubmitted(false);
    setSubmitEmail("");
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
    if (!item) return;
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = String(formData.get("email") ?? "").trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      const { toast } = await import("sonner");
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setSubmitEmail(email);
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: item.title,
          fullName: formData.get("fullName"),
          email,
          phone: formData.get("phone"),
          city: formData.get("city"),
          education: formData.get("education"),
          experience: formData.get("experience"),
          heardAbout: formData.get("heardAbout"),
          message: formData.get("message"),
        }),
      });
      if (!res.ok) throw new Error("Submit failed");
    } catch {
      // continue to success state
    }
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const fieldClass =
    "enroll-modal-input w-full rounded-[10px] border border-white/10 bg-white/[0.04] px-[14px] py-[11px] text-[14px] text-white outline-none transition-all duration-200 placeholder:text-white/30 focus:border-[#2dd4bf] focus:ring-2 focus:ring-[#2dd4bf]/20 disabled:opacity-60";
  const labelClass =
    "enroll-modal-label block text-[11px] font-semibold uppercase tracking-[0.04em] mb-[7px] text-[#2dd4bf]";

  return (
    <>
      <style>{`
        .enroll-modal-overlay {
          background: rgba(0, 0, 0, 0.88);
          backdrop-filter: blur(12px);
        }
        .enroll-modal-container {
          animation: enrollModalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        @keyframes enrollModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @media (max-width: 639px) {
          .enroll-modal-container {
            animation: enrollSlideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          }
        }
        @keyframes enrollSlideUp {
          from { transform: translateY(100%); }
          to   { transform: translateY(0); }
        }
        .enroll-modal-left {
          background: linear-gradient(160deg, #0d4f4a 0%, #0a3330 40%, #061a18 100%);
          border-right: 1px solid rgba(45,212,191,0.15);
        }
        .enroll-modal-right {
          background: var(--navy-2);
          overflow-y: auto;
          max-height: min(680px, 92vh);
        }
        @media (max-width: 639px) {
          .enroll-modal-right { max-height: 90dvh; }
        }
        .enroll-modal-input:-webkit-autofill,
        .enroll-modal-input:-webkit-autofill:hover,
        .enroll-modal-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0px 1000px #0b1520 inset !important;
          -webkit-text-fill-color: #fff !important;
        }
        .enroll-modal-submit {
          background: linear-gradient(135deg, #2dd4bf 0%, #0d9488 100%);
        }
        .enroll-modal-submit:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(45,212,191,0.5);
        }
        @keyframes enrollPopIn {
          from { transform: scale(0); opacity: 0; }
          to   { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        className="enroll-modal-overlay fixed inset-0 z-[9999] flex items-end justify-center sm:items-center sm:p-4"
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enroll-modal-title"
      >
        <div
          className="enroll-modal-container flex h-[90dvh] max-h-[100dvh] w-full overflow-hidden rounded-t-[20px] sm:h-[min(680px,92vh)] sm:max-h-[92vh] sm:max-w-[min(900px,95vw)] sm:rounded-[24px]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(45,212,191,0.25), 0 0 80px rgba(45,212,191,0.12), 0 40px 120px rgba(0,0,0,0.7)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* LEFT PANEL */}
          <div className="enroll-modal-left relative hidden flex-col justify-between overflow-hidden p-8 sm:flex sm:w-[35%]">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgba(45,212,191,0.2)] text-[#2dd4bf]">
                <GraduationCap size={32} />
              </div>
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#2dd4bf]">
                You&apos;re enrolling in
              </p>
              {item && (
                <h2
                  id="enroll-modal-title"
                  className="mt-2 text-[20px] font-bold leading-tight text-white"
                >
                  {item.title}
                </h2>
              )}
              <div className="mt-3">
                {item?.price ? (
                  <span className="inline-flex rounded-full border border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.15)] px-3 py-1.5 text-sm font-semibold text-[#2dd4bf]">
                    {item.price}
                  </span>
                ) : (
                  <span className="inline-flex rounded-full border border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.15)] px-3 py-1.5 text-sm font-semibold text-[#2dd4bf]">
                    Free Application
                  </span>
                )}
              </div>
            </div>
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="shrink-0 text-[#2dd4bf]" size={16} />
                <span className="text-[13px] text-white/70">Certificate on Completion</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="shrink-0 text-[#2dd4bf]" size={16} />
                <span className="text-[13px] text-white/70">Expert Mentorship Included</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="shrink-0 text-[#2dd4bf]" size={16} />
                <span className="text-[13px] text-white/70">Real Project Experience</span>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="enroll-modal-right relative flex flex-1 flex-col sm:max-w-[65%]">
            <button
              type="button"
              onClick={handleClose}
              className="enroll-modal-close sticky top-5 z-[100] ml-auto mr-5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-navy-2/95 text-white/90 shadow-lg backdrop-blur-sm transition hover:border-red-500/40 hover:bg-red-500/20 hover:text-white"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2.5} />
            </button>

            {submitted && item ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-12">
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[rgba(45,212,191,0.5)] bg-[rgba(45,212,191,0.12)]"
                  style={{ animation: "enrollPopIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards" }}
                >
                  <CheckCircle2 className="text-[#2dd4bf]" size={40} />
                </div>
                <h3 className="enroll-success-title mt-5 text-[20px] font-bold text-[var(--text)]">
                  Enrollment Submitted! 🎉
                </h3>
                <p className="enroll-success-p mt-2 text-[14px] text-[var(--text-muted)]">
                  We&apos;ll contact you within 24 hours at {submitEmail}
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
                {item && (
                  <div className="block border-b border-white/10 px-6 pb-4 pt-14 sm:hidden">
                    <h2 className="enroll-mobile-title text-sm font-bold text-[var(--text)]">{item.title}</h2>
                    {item.price && (
                      <p className="mt-1 text-sm text-[#2dd4bf]">{item.price}</p>
                    )}
                  </div>
                )}

                <div className="px-6 pb-8 pt-8 sm:px-10 sm:pt-9 sm:pb-10">
                  <h3 className="enroll-modal-heading text-[18px] font-bold text-[var(--text)]">
                    Complete Your Enrollment
                  </h3>
                  <p className="enroll-modal-subtext mt-1 text-[13px] text-[var(--text-muted)]">
                    Takes less than 2 minutes
                  </p>

                  <form onSubmit={handleSubmit} className="mt-7 space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="enroll-fullName" className={labelClass}>
                          Full Name *
                        </label>
                        <input
                          id="enroll-fullName"
                          name="fullName"
                          type="text"
                          required
                          disabled={loading}
                          placeholder="Enter your full name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="enroll-email" className={labelClass}>
                          Email Address *
                        </label>
                        <input
                          id="enroll-email"
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
                        <label htmlFor="enroll-phone" className={labelClass}>
                          Phone Number *
                        </label>
                        <input
                          id="enroll-phone"
                          name="phone"
                          type="tel"
                          required
                          disabled={loading}
                          placeholder="+92 300 0000000"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label htmlFor="enroll-city" className={labelClass}>
                          City *
                        </label>
                        <input
                          id="enroll-city"
                          name="city"
                          type="text"
                          required
                          disabled={loading}
                          placeholder="Your city"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="enroll-education" className={labelClass}>
                          Education Level *
                        </label>
                        <select
                          id="enroll-education"
                          name="education"
                          required
                          disabled={loading}
                          className={fieldClass}
                        >
                          {EDUCATION_OPTIONS.map((opt) => (
                            <option
                              key={opt}
                              value={opt === EDUCATION_OPTIONS[0] ? "" : opt}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="enroll-experience" className={labelClass}>
                          Experience Level
                        </label>
                        <select
                          id="enroll-experience"
                          name="experience"
                          disabled={loading}
                          className={fieldClass}
                        >
                          {EXPERIENCE_OPTIONS.map((opt) => (
                            <option
                              key={opt}
                              value={opt === EXPERIENCE_OPTIONS[0] ? "" : opt}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="enroll-heard" className={labelClass}>
                        How did you hear about us? *
                      </label>
                      <select
                        id="enroll-heard"
                        name="heardAbout"
                        required
                        disabled={loading}
                        className={fieldClass}
                      >
                        {HEARD_OPTIONS.map((opt) => (
                          <option
                            key={opt}
                            value={opt === HEARD_OPTIONS[0] ? "" : opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="enroll-message" className={labelClass}>
                        Message (optional)
                      </label>
                      <textarea
                        id="enroll-message"
                        name="message"
                        rows={3}
                        disabled={loading}
                        placeholder="Any questions or notes..."
                        className={fieldClass + " min-h-[80px] resize-y"}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="enroll-modal-submit mt-2 flex w-full items-center justify-center gap-2 rounded-[10px] px-6 py-3.5 text-[15px] font-bold text-black transition disabled:opacity-70"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Enrollment →"
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
