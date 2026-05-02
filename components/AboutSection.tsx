import { getTranslations } from "next-intl/server";

type Props = Readonly<{ locale: string }>;

export async function AboutSection({ locale }: Props) {
  const t = await getTranslations({ locale });

  const bullets = [
    t("about.bullets.b1"),
    t("about.bullets.b2"),
    t("about.bullets.b3"),
    t("about.bullets.b4"),
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-brand-navy/10 bg-brand-cream px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_minmax(0,0.85fr)] lg:gap-14">
        <div className="space-y-4">
          <h2
            id="about-heading"
            className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl"
          >
            {t("about.title")}
          </h2>
          <p className="text-lg font-medium text-brand-navy/85">{t("about.lead")}</p>
          <p className="text-brand-earth/95">{t("about.p1")}</p>
          <p className="text-brand-earth/95">{t("about.p2")}</p>
        </div>
        <div className="space-y-4 rounded-3xl bg-brand-sand/80 p-6 shadow-inner shadow-brand-navy/5">
          <ul className="space-y-3 text-brand-earth">
            {bullets.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden
                  className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-gold ring-4 ring-brand-gold/35"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-sm text-brand-navy/70">{t("about.cadasturNote")}</p>
        </div>
      </div>
    </section>
  );
}
