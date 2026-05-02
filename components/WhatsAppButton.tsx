import type { ReactNode } from "react";

type Props = Readonly<{
  href: string;
  className?: string;
  children: ReactNode;
  ariaLabel: string;
  variant?: "primary" | "secondary" | "ghost";
}>;

export function WhatsAppButton({
  href,
  className = "",
  children,
  ariaLabel,
  variant = "primary",
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const variants: Record<NonNullable<Props["variant"]>, string> = {
    primary:
      "bg-brand-gold text-brand-navy hover:bg-brand-amber focus-visible:outline-brand-navy shadow-md shadow-brand-navy/15",
    secondary:
      "border-2 border-brand-gold bg-transparent text-brand-cream hover:bg-brand-gold hover:text-brand-navy focus-visible:outline-brand-cream",
    ghost:
      "border border-brand-navy/25 bg-white/80 text-brand-navy hover:border-brand-gold focus-visible:outline-brand-gold",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variants[variant]} ${className}`}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
