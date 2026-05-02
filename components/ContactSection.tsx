import { getTranslations } from "next-intl/server";

import { CONTACT_EMAIL_FALLBACK } from "@/lib/constants";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

export async function ContactSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const href = buildWhatsAppHref(tWa("default"));

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-brand-navy/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.05fr_minmax(0,0.9fr)]">
        <div className="space-y-6">
          <h2
            id="contact-heading"
            className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="text-lg text-brand-earth/90">{t("lead")}</p>
          <div className="grid gap-3 text-sm font-medium text-brand-navy">
            <div className="rounded-2xl border border-brand-navy/15 bg-brand-cream px-5 py-5 sm:px-6 sm:py-6">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">
                {t("whatsappHint")}
              </p>
              <WhatsAppButton
                href={href}
                className="mt-4 min-h-[3.25rem] w-full rounded-2xl py-4 text-base font-semibold sm:min-h-14 sm:py-5 sm:text-lg"
                ariaLabel={tA11y("whatsappAria")}
              >
                {t("secondaryCta")}
              </WhatsAppButton>
            </div>
          </div>
        </div>
        <div className="space-y-6 rounded-3xl border border-brand-navy/10 bg-brand-sand/65 p-6">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">
              {t("emailLabel")}
            </p>
            <a
              className="mt-2 inline-flex break-all text-lg font-semibold text-brand-navy underline-offset-4 hover:text-brand-earth hover:underline"
              href={`mailto:${CONTACT_EMAIL_FALLBACK}`}
            >
              {CONTACT_EMAIL_FALLBACK}
            </a>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-brand-navy/60">
              {t("locationLabel")}
            </p>
            <p className="mt-2 text-base text-brand-earth/95">{t("location")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
