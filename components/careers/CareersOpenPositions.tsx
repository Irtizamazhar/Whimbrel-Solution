"use client";

import { useState } from "react";
import JobApplicationModal from "@/components/ui/JobApplicationModal";

export type Position = {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
};

export default function CareersOpenPositions({ positions }: { positions: Position[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Position | null>(null);

  const openModal = (job: Position) => {
    setSelectedJob({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
    });
    setModalOpen(true);
  };

  return (
    <>
      <section id="positions">
        <h2 className="mb-6 font-cormorant text-[clamp(1.375rem,3.5vw,2.675rem)]">Open Positions</h2>
        <div className="grid grid-cols-1 gap-4">
          {positions.map((job) => (
            <article
              key={job.title}
              className="rounded-2xl border border-teal/20 bg-navy-2 p-5 transition hover:border-teal/60 sm:p-6"
            >
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-cormorant text-lg leading-tight text-text sm:text-2xl">{job.title}</h3>
                <span className="rounded-full bg-teal/15 px-3 py-1 text-xs uppercase tracking-[0.12em] text-teal">
                  {job.department}
                </span>
              </div>
              <p className="mt-2 text-sm text-text-muted">
                {job.location} · {job.type}
              </p>
              <p className="mt-3 max-w-full text-sm text-text-muted sm:text-base">{job.description}</p>
              <button
                type="button"
                onClick={() => openModal(job)}
                className="mt-4 inline-flex min-h-[44px] min-w-[44px] items-center rounded-full border border-teal/60 px-5 py-2.5 text-sm font-semibold text-teal transition hover:bg-teal hover:text-navy"
                data-magnetic="true"
              >
                Apply Now
              </button>
            </article>
          ))}
        </div>
      </section>

      <JobApplicationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        jobTitle={selectedJob?.title ?? ""}
        department={selectedJob?.department ?? ""}
        location={selectedJob?.location ?? ""}
        type={selectedJob?.type ?? ""}
      />
    </>
  );
}
