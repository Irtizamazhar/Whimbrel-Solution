"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckCircle2, Clock3, Loader2, Lock, UploadCloud, X } from "lucide-react";

type JobApplicationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  department: string;
  location: string;
  type: string;
};

type FormValues = {
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  currentJobTitle: string;
  portfolioUrl: string;
  motivation: string;
};

type FormErrors = Partial<Record<keyof FormValues | "resume", string>>;

const EXPERIENCE_OPTIONS = [
  "Select experience level",
  "0-1 years",
  "1-3 years",
  "3-5 years",
  "5-8 years",
  "8+ years",
];

const INITIAL_FORM: FormValues = {
  fullName: "",
  email: "",
  phone: "+92 300 0000000",
  experience: "",
  currentJobTitle: "",
  portfolioUrl: "",
  motivation: "",
};

const ACCEPTED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function JobApplicationModal({
  isOpen,
  onClose,
  jobTitle,
  department,
  location,
  type,
}: JobApplicationModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>("");
  const [values, setValues] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [shakeField, setShakeField] = useState<string>("");

  const resetModalState = useCallback(() => {
    setSubmitted(false);
    setLoading(false);
    setValues(INITIAL_FORM);
    setErrors({});
    setResumeFile(null);
    setFilePreview("");
    setIsDragging(false);
    setShakeField("");
  }, []);

  const handleClose = useCallback(() => {
    if (loading) return;
    resetModalState();
    onClose();
  }, [loading, onClose, resetModalState]);

  useEffect(() => {
    if (!isOpen) return;
    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) {
      resetModalState();
    }
  }, [isOpen, resetModalState]);

  const setFieldValue = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  };

  const triggerFieldShake = (field: string) => {
    setShakeField(field);
    window.setTimeout(() => setShakeField(""), 350);
  };

  const handleResumeFile = (file: File | null) => {
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setErrors((previous) => ({ ...previous, resume: "Only PDF, DOC or DOCX files are allowed." }));
      triggerFieldShake("resume");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setErrors((previous) => ({ ...previous, resume: "Resume must be 5MB or smaller." }));
      triggerFieldShake("resume");
      return;
    }
    setResumeFile(file);
    setErrors((previous) => ({ ...previous, resume: undefined }));

    const reader = new FileReader();
    reader.onload = () => setFilePreview(String(reader.result ?? ""));
    reader.readAsDataURL(file);
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};
    if (!values.fullName.trim()) nextErrors.fullName = "Full name is required.";
    if (!values.email.trim()) nextErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) nextErrors.phone = "Phone number is required.";
    else if (!/^\+?[0-9()\-\s]{10,20}$/.test(values.phone.trim())) {
      nextErrors.phone = "Enter a valid phone number.";
    }
    if (!values.experience.trim()) nextErrors.experience = "Select your experience level.";
    if (!resumeFile) nextErrors.resume = "Resume is required.";
    if (values.portfolioUrl.trim()) {
      try {
        const parsed = new URL(values.portfolioUrl.trim());
        if (!["http:", "https:"].includes(parsed.protocol)) {
          nextErrors.portfolioUrl = "URL must start with http:// or https://";
        }
      } catch {
        nextErrors.portfolioUrl = "Enter a valid portfolio or LinkedIn URL.";
      }
    }
    return nextErrors;
  };

  const fieldHasError = useMemo(
    () => (field: keyof FormValues | "resume") => Boolean(errors[field]),
    [errors]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    const firstErrorField = Object.keys(validationErrors)[0];
    if (firstErrorField) {
      triggerFieldShake(firstErrorField);
      return;
    }

    setLoading(true);
    const payload = {
      jobTitle,
      department,
      location,
      type,
      ...values,
      resume: resumeFile?.name ?? "",
      resumeBytes: resumeFile?.size ?? 0,
      hasFilePreview: Boolean(filePreview),
    };

    // Replace with API call when backend endpoint is ready.
    console.log("Job application payload:", payload);

    await new Promise((resolve) => setTimeout(resolve, 1300));
    setLoading(false);
    setSubmitted(true);
  };

  if (!isOpen) return null;

  const labelClass =
    "mb-2 block text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]";
  const inputClass =
    "job-modal-input w-full rounded-xl border px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition-all";

  return (
    <>
      <style>{`
        .job-modal-root {
          --bg-deep: #091818;
          --bg-panel: #0c1f1f;
          --bg-surface: #0f2424;
          --bg-input: #0d2828;
          --accent: #00e5c0;
          --accent-hover: #00ffcc;
          --accent-dim: rgba(0, 229, 192, 0.15);
          --text-primary: #ffffff;
          --text-secondary: #7ab8b0;
          --text-muted: #4a8080;
          --border: rgba(0, 229, 192, 0.2);
          --border-focus: rgba(0, 229, 192, 0.6);
          --error: #ff4d6d;
        }
        [data-theme="light"] .job-modal-root {
          --bg-deep: #edf8f7;
          --bg-panel: #e6f5f3;
          --bg-surface: #f4fbfa;
          --bg-input: #ffffff;
          --accent: #0cae94;
          --accent-hover: #089981;
          --accent-dim: rgba(12, 174, 148, 0.12);
          --text-primary: #0e2e2b;
          --text-secondary: #3f6e68;
          --text-muted: #6b8e89;
          --border: rgba(12, 174, 148, 0.22);
          --border-focus: rgba(12, 174, 148, 0.52);
          --error: #e11d48;
        }
        .job-modal-overlay {
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(8px);
        }
        [data-theme="light"] .job-modal-overlay {
          background: rgba(8, 22, 20, 0.42);
        }
        .job-modal-shell {
          animation: modalFadeSlide 400ms ease-out forwards;
          border: 1px solid var(--border);
          box-shadow: 0 0 0 1px rgba(0, 229, 192, 0.1), 0 32px 80px rgba(0, 0, 0, 0.55);
          background: linear-gradient(160deg, #0a1a1a 0%, #0d2020 100%);
        }
        [data-theme="light"] .job-modal-shell {
          box-shadow: 0 0 0 1px rgba(12, 174, 148, 0.14), 0 26px 56px rgba(16, 50, 45, 0.18);
          background: linear-gradient(155deg, #eef9f7 0%, #e8f7f5 100%);
        }
        @keyframes modalFadeSlide {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .job-modal-input {
          background: rgba(13, 40, 40, 0.75);
          border-color: var(--border);
        }
        [data-theme="light"] .job-modal-input {
          background: var(--bg-input);
        }
        .job-modal-input::placeholder {
          color: var(--text-muted);
        }
        .job-modal-input:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 3px rgba(0, 229, 192, 0.18);
        }
        .job-modal-input.error {
          border-color: var(--error);
          box-shadow: 0 0 0 3px rgba(255, 77, 109, 0.15);
        }
        .job-modal-shake {
          animation: modalFieldShake 280ms linear;
        }
        @keyframes modalFieldShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-4px); }
          40%, 80% { transform: translateX(4px); }
        }
        .job-upload-zone {
          border: 1.5px dashed var(--border-focus);
          background: rgba(0, 229, 192, 0.03);
        }
        [data-theme="light"] .job-upload-zone {
          background: rgba(12, 174, 148, 0.04);
        }
        .job-upload-zone:hover {
          border-color: var(--accent-hover);
          background: rgba(0, 229, 192, 0.06);
        }
        .job-upload-zone.dragging {
          animation: jobUploadPulse 900ms ease-in-out infinite;
        }
        @keyframes jobUploadPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 229, 192, 0.28); }
          50% { box-shadow: 0 0 0 10px rgba(0, 229, 192, 0); }
        }
        .job-close:hover svg {
          transform: rotate(90deg);
        }
        .job-close svg {
          transition: transform 220ms ease;
        }
        .job-submit:hover:not(:disabled) {
          transform: scale(1.02);
          box-shadow: 0 0 24px rgba(0, 229, 192, 0.45);
        }
        .job-submit:active:not(:disabled) {
          transform: scale(0.99);
        }
        .job-success-check {
          animation: checkPop 360ms ease-out forwards;
        }
        @keyframes checkPop {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div
        className="job-modal-root job-modal-overlay fixed inset-0 z-[9999] flex items-end justify-center md:items-center md:p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-application-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) handleClose();
        }}
      >
        <div
          className="job-modal-shell flex h-[100dvh] w-full max-w-[1020px] overflow-hidden rounded-none md:h-[min(92vh,760px)] md:rounded-3xl"
          onClick={(event) => event.stopPropagation()}
        >
          <aside className="hidden w-[30%] shrink-0 border-r border-[var(--border)] bg-[var(--bg-panel)] p-6 lg:flex lg:flex-col">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--accent-dim)] font-bold text-[var(--accent)]">
                W
              </span>
              <span className="text-sm font-semibold text-[var(--text-primary)]">Whimbrel Solution</span>
            </div>
            <div className="my-5 h-px bg-[var(--border)]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[var(--accent)]">
              You&apos;re applying for
            </p>
            <h2
              id="job-application-title"
              className="mt-2 text-[1.7rem] font-bold leading-tight text-[var(--text-primary)]"
            >
              {jobTitle}
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {[department, location, type].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--border-focus)] px-3 py-1 text-[11px] font-semibold text-[var(--accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto space-y-3 pt-8">
              <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <CheckCircle2 size={16} className="text-[var(--accent)]" /> Quick 2-min application
              </p>
              <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Clock3 size={16} className="text-[var(--accent)]" /> Response within 3-5 days
              </p>
              <p className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                <Lock size={16} className="text-[var(--accent)]" /> Your data is safe with us
              </p>
            </div>
          </aside>

          <section className="flex min-w-0 flex-1 flex-col bg-[var(--bg-surface)] lg:w-[70%]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4 lg:hidden">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--accent)]">
                  You&apos;re applying for
                </p>
                <h2 className="text-base font-bold text-[var(--text-primary)]">{jobTitle}</h2>
              </div>
              <span className="rounded-full border border-[var(--border-focus)] px-2 py-0.5 text-[10px] text-[var(--accent)]">
                {type}
              </span>
            </div>

            <button
              type="button"
              aria-label="Close application modal"
              onClick={handleClose}
              className="job-close absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--bg-panel)]/85 text-[var(--text-primary)] transition hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <X size={18} />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-16 md:px-8 md:pb-8 md:pt-8">
              {submitted ? (
                <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center">
                  <span className="job-success-check flex h-20 w-20 items-center justify-center rounded-full border border-[var(--border-focus)] bg-[var(--accent-dim)]">
                    <CheckCircle2 size={40} className="text-[var(--accent)]" />
                  </span>
                  <h3 className="mt-5 text-2xl font-bold text-white">Application Submitted!</h3>
                  <p className="mt-2 max-w-md text-sm text-[var(--text-secondary)]">
                    Thanks for applying to {jobTitle}. Our hiring team will review your profile and get back to you soon.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="mt-7 rounded-full border border-[var(--border-focus)] px-6 py-2 text-sm font-semibold text-[var(--accent)] transition hover:bg-[var(--accent-dim)]"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <header className="mb-6">
                    <h3 className="text-[22px] font-bold text-[var(--text-primary)]">Complete Your Application</h3>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      Fill in the details below - takes less than 2 minutes
                    </p>
                  </header>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className={shakeField === "fullName" ? "job-modal-shake" : ""}>
                        <label htmlFor="fullName" className={labelClass}>
                          Full Name <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          id="fullName"
                          aria-required="true"
                          value={values.fullName}
                          onChange={(event) => setFieldValue("fullName", event.target.value)}
                          placeholder="Enter your full name"
                          className={`${inputClass} ${fieldHasError("fullName") ? "error" : ""}`}
                        />
                        {errors.fullName && <p className="mt-1 text-xs text-[var(--error)]">{errors.fullName}</p>}
                      </div>

                      <div className={shakeField === "email" ? "job-modal-shake" : ""}>
                        <label htmlFor="email" className={labelClass}>
                          Email Address <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          id="email"
                          aria-required="true"
                          value={values.email}
                          onChange={(event) => setFieldValue("email", event.target.value)}
                          placeholder="your@email.com"
                          className={`${inputClass} ${fieldHasError("email") ? "error" : ""}`}
                        />
                        {errors.email && <p className="mt-1 text-xs text-[var(--error)]">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className={shakeField === "phone" ? "job-modal-shake" : ""}>
                        <label htmlFor="phone" className={labelClass}>
                          Phone Number <span className="text-[var(--accent)]">*</span>
                        </label>
                        <input
                          id="phone"
                          aria-required="true"
                          value={values.phone}
                          onChange={(event) => setFieldValue("phone", event.target.value)}
                          placeholder="+92 300 0000000"
                          className={`${inputClass} ${fieldHasError("phone") ? "error" : ""}`}
                        />
                        {errors.phone && <p className="mt-1 text-xs text-[var(--error)]">{errors.phone}</p>}
                      </div>

                      <div className={shakeField === "experience" ? "job-modal-shake" : ""}>
                        <label htmlFor="experience" className={labelClass}>
                          Years of Experience <span className="text-[var(--accent)]">*</span>
                        </label>
                        <select
                          id="experience"
                          aria-required="true"
                          value={values.experience}
                          onChange={(event) => setFieldValue("experience", event.target.value)}
                          className={`${inputClass} cursor-pointer ${fieldHasError("experience") ? "error" : ""}`}
                        >
                          {EXPERIENCE_OPTIONS.map((option) => (
                            <option key={option} value={option === EXPERIENCE_OPTIONS[0] ? "" : option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        {errors.experience && (
                          <p className="mt-1 text-xs text-[var(--error)]">{errors.experience}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="currentJobTitle" className={labelClass}>
                        Current or Last Job Title
                      </label>
                      <input
                        id="currentJobTitle"
                        value={values.currentJobTitle}
                        onChange={(event) => setFieldValue("currentJobTitle", event.target.value)}
                        placeholder="e.g. Frontend Developer at XYZ"
                        className={inputClass}
                      />
                    </div>

                    <div className={shakeField === "portfolioUrl" ? "job-modal-shake" : ""}>
                      <label htmlFor="portfolioUrl" className={labelClass}>
                        Portfolio / LinkedIn URL
                      </label>
                      <input
                        id="portfolioUrl"
                        value={values.portfolioUrl}
                        onChange={(event) => setFieldValue("portfolioUrl", event.target.value)}
                        placeholder="https://linkedin.com/in/yourname"
                        className={`${inputClass} ${fieldHasError("portfolioUrl") ? "error" : ""}`}
                      />
                      {errors.portfolioUrl && (
                        <p className="mt-1 text-xs text-[var(--error)]">{errors.portfolioUrl}</p>
                      )}
                    </div>

                    <div className={shakeField === "resume" ? "job-modal-shake" : ""}>
                      <label className={labelClass}>
                        Upload Resume <span className="text-[var(--accent)]">*</span>
                      </label>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(event) => handleResumeFile(event.target.files?.[0] ?? null)}
                      />
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            fileInputRef.current?.click();
                          }
                        }}
                        onDragEnter={(event) => {
                          event.preventDefault();
                          setIsDragging(true);
                        }}
                        onDragOver={(event) => event.preventDefault()}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={(event) => {
                          event.preventDefault();
                          setIsDragging(false);
                          handleResumeFile(event.dataTransfer.files?.[0] ?? null);
                        }}
                        className={`job-upload-zone flex min-h-[138px] cursor-pointer flex-col items-center justify-center rounded-xl px-4 text-center transition ${
                          isDragging ? "dragging" : ""
                        } ${fieldHasError("resume") ? "border-[var(--error)]" : ""}`}
                      >
                        {resumeFile ? (
                          <>
                            <CheckCircle2 size={24} className="text-[var(--accent)]" />
                            <p className="mt-2 break-all text-sm font-semibold text-[var(--text-primary)]">
                              {resumeFile.name}
                            </p>
                            <p className="mt-1 text-xs text-[var(--text-secondary)]">
                              {(resumeFile.size / 1024 / 1024).toFixed(2)} MB uploaded
                            </p>
                          </>
                        ) : (
                          <>
                            <UploadCloud size={26} className="text-[var(--accent)]" />
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                              Drop your resume here or click to browse
                            </p>
                            <p className="mt-1 text-xs text-[var(--text-muted)]">
                              PDF, DOC, DOCX · Max 5MB
                            </p>
                          </>
                        )}
                      </div>
                      {errors.resume && <p className="mt-1 text-xs text-[var(--error)]">{errors.resume}</p>}
                    </div>

                    <div>
                      <label htmlFor="motivation" className={labelClass}>
                        Why do you want to join Whimbrel? (Optional)
                      </label>
                      <textarea
                        id="motivation"
                        rows={4}
                        value={values.motivation}
                        onChange={(event) => setFieldValue("motivation", event.target.value)}
                        placeholder="Tell us a bit about yourself and why you're excited about this role..."
                        className={`${inputClass} min-h-[118px] resize-y`}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="job-submit flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-4 text-sm font-bold text-[#032c27] transition disabled:cursor-not-allowed disabled:opacity-80"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Application →"
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
