import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { buildWhatsAppHref } from "@/lib/whatsapp";

import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

export async function Hero({ locale }: Props) {
  const t = await getTranslations({ locale });
  const whatsappHref = buildWhatsAppHref(t("whatsappMessages.hero"));

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero/cerrado-hero.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand-navy/92 via-brand-navy/75 to-brand-earth/82"
          aria-hidden
        />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-8 px-4 py-20 sm:py-28 lg:flex-row lg:items-end lg:gap-12 lg:px-8">
        <div className="flex-1 space-y-6 text-brand-cream">
          <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand backdrop-blur">
            {t("hero.kicker")}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-lg text-brand-sand">{t("hero.subtitle")}</p>

          <div className="flex flex-wrap gap-4">
            <WhatsAppButton
              href={whatsappHref}
              ariaLabel={`${t("hero.cta")} — WhatsApp`}
            >
              {t("hero.cta")}
            </WhatsAppButton>
            <a
              href="#routes"
              className="inline-flex items-center justify-center rounded-full border border-white/55 px-5 py-3 text-sm font-semibold text-brand-cream transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              {t("nav.routes")}
            </a>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-brand-navy/45 p-5 text-sm text-brand-sand backdrop-blur-md">
          <p className="font-semibold text-brand-cream">{t("contact.midPageCta")}</p>
          <p className="mt-2 text-brand-sand/90">{t("contact.midPageSubtitle")}</p>
        </div>
      </div>
    </section>
  );
}
