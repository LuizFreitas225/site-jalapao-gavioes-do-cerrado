import { getTranslations } from "next-intl/server";

import { SocialIconStripCta } from "./SocialIconStripCta";

type Props = Readonly<{ locale: string }>;

export async function CtaBanner({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "ctaBanner" });
  const tSocial = await getTranslations({ locale, namespace: "social" });

  return (
    <aside
      aria-labelledby="cta-banner-heading"
      className="border-y border-brand-gold/50 bg-brand-navy px-4 py-12 text-brand-cream sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-8 text-center lg:flex-row lg:items-center lg:text-left">
        <div className="flex-1 space-y-3">
          <h2
            id="cta-banner-heading"
            className="font-display text-3xl font-semibold sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="text-base text-brand-sand">{t("subtitle")}</p>
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-sand/70">
            {tSocial("ctaClusterLabel")}
          </p>
          <SocialIconStripCta locale={locale} />
        </div>
      </div>
    </aside>
  );
}
