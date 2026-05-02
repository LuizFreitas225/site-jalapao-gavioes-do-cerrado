type Panel = Readonly<{ title: string; body: string }>;

type Props = Readonly<{
  heading: string;
  groupAriaLabel: string;
  intro?: string;
  panels: readonly Panel[];
}>;

export function RouteItineraryAccordion({
  heading,
  groupAriaLabel,
  intro,
  panels,
}: Props) {
  if (!panels.length) return null;

  return (
    <div className="space-y-2" role="group" aria-label={groupAriaLabel}>
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-navy/55">
        {heading}
      </p>
      {intro ? (
        <p className="text-xs leading-relaxed text-brand-earth/85">{intro}</p>
      ) : null}
      <div className="space-y-2">
        {panels.map((panel, i) => (
          <details
            key={`${panel.title}-${i}`}
            className="group overflow-hidden rounded-xl border border-brand-navy/15 bg-white/90 text-left shadow-sm open:shadow-md motion-reduce:transition-none"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-2 px-4 py-3 text-sm font-semibold text-brand-navy outline-none marker:content-none [&::-webkit-details-marker]:hidden">
              <span>{panel.title}</span>
              <span
                aria-hidden
                className="shrink-0 text-xs text-brand-gold transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              >
                ▼
              </span>
            </summary>
            <div className="border-t border-brand-navy/10 px-4 py-3 text-sm leading-relaxed text-brand-earth/95 whitespace-pre-line">
              {panel.body}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
