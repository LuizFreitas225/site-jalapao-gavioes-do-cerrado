type Props = Readonly<{ label: string; href?: string }>;

export function SkipLink({
  label,
  href = "#main-content",
}: Props) {
  return (
    <a
      href={href}
      className="fixed left-3 top-3 z-[200] -translate-y-24 rounded-md bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-navy shadow-lg outline-none ring-2 ring-brand-navy ring-offset-2 ring-offset-brand-cream transition focus:translate-y-0 focus-visible:translate-y-0"
    >
      {label}
    </a>
  );
}
