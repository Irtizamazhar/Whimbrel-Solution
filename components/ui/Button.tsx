import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "outline";
  magnetic?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
};

const styles = {
  base: "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]",
  primary:
    "border-teal bg-teal text-navy shadow-[0_0_32px_rgba(59,191,176,0.28)] hover:bg-teal-light hover:shadow-[0_0_38px_rgba(59,191,176,0.35)]",
  outline:
    "border-teal/70 bg-transparent text-teal hover:bg-teal/10 hover:border-teal-light",
};

export default function Button({
  children,
  href,
  className,
  variant = "primary",
  magnetic = true,
  type = "button",
  onClick,
}: ButtonProps) {
  const dataProps = magnetic ? { "data-magnetic": "true" } : {};
  const classNames = cn(styles.base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={classNames} onClick={onClick} {...dataProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classNames} onClick={onClick} {...dataProps}>
      {children}
    </button>
  );
}
