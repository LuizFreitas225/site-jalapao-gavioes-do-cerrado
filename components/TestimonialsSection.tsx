import { getMessages } from "next-intl/server";

type Props = Readonly<{ locale: string }>;

type TestimonialCopy = Readonly<{ name: string; role: string; quote: string }>;

export async function TestimonialsSection({ locale }: Props) {
  const messages = await getMessages({ locale });
  const testimonials = messages.testimonials as unknown as {
    title: string;
    lead: string;
    items: readonly TestimonialCopy[];
  };

  const { title, lead, items } = testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="border-t border-brand-navy/10 bg-brand-sand/65 px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-2xl space-y-3">
          <h2
            id="testimonials-heading"
            className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl"
          >
            {title}
          </h2>
          <p className="text-lg text-brand-earth/90">{lead}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, index) => {
            const initials = item.name
              .split(/\s+/g)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <figure
                key={`${item.name}-${index}`}
                className="flex h-full flex-col rounded-3xl border border-brand-navy/15 bg-brand-cream/90 p-6 shadow-inner shadow-brand-navy/5"
              >
                <blockquote className="flex flex-1 flex-col gap-3">
                  <p className="text-base text-brand-earth/95">“{item.quote}”</p>
                  <figcaption className="mt-auto flex items-center gap-3 text-sm font-semibold text-brand-navy">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-navy font-display text-sm text-brand-cream ring-4 ring-brand-gold/55"
                      aria-hidden
                    >
                      {initials}
                    </span>
                    <div>
                      <span className="block">{item.name}</span>
                      <span className="block text-xs font-medium text-brand-navy/65">
                        {item.role}
                      </span>
                    </div>
                  </figcaption>
                </blockquote>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
