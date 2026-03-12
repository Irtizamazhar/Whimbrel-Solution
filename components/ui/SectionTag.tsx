import { cn } from "@/lib/utils";

type SectionTagProps = {
  label: string;
  className?: string;
};

export default function SectionTag({ label, className }: SectionTagProps) {
  return (
    <div className={cn("inline-flex items-center gap-3", className)}>
      <span className="section-tag-line h-px w-10 bg-teal/60" />
      <span className="section-tag-label text-sm font-bold uppercase tracking-[0.28em] text-teal">
        {label}
      </span>
    </div>
  );
}
