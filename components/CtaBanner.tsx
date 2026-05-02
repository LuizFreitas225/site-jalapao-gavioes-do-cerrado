import { getTranslations } from "next-intl/server";

import { buildWhatsAppHref } from "@/lib/whatsapp";

import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

export async function CtaBanner({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "ctaBanner" });
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const href = buildWhatsAppHref(tWa("afterRoutes"));

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
        <div className="flex justify-center lg:justify-end">
          <WhatsAppButton
            href={href}
            variant="ghost"
            className="w-full bg-brand-cream text-brand-navy shadow-lg shadow-brand-navy/20 sm:w-auto"
            ariaLabel={tA11y("whatsappAria")}
          >
            {t("primary")}
          </WhatsAppButton>
        </div>
      </div>
    </aside>
  );
}
