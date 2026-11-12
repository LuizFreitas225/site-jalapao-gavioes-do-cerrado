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
      className="relative isolate flex min-h-[min(92svh,56rem)] flex-col overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/images/hero/jalapao-fervedouro-aereo.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          quality={92}
          sizes="100vw"
          className="object-cover object-[center_35%] saturate-[1.03]"
        />
        {/* Gradiente inferior (+ leve vinil à esquerda): legibilidade sem “caixa” cobrindo o fervedouro. */}
        <div
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,34,56,0.96)_0%,rgba(21,34,56,0.82)_22%,rgba(21,34,56,0.36)_46%,transparent_74%)]"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,34,56,0.52)_0%,transparent_58%)] max-sm:bg-[linear-gradient(to_right,rgba(21,34,56,0.35)_0%,transparent_62%)]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto mt-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-12 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:flex-row lg:items-end lg:gap-12 lg:px-8 lg:pb-16">
        <div className="flex-1 space-y-6 text-brand-cream">
          <p className="inline-flex rounded-full border border-white/35 bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-sand backdrop-blur-sm [box-shadow:0_1px_0_rgb(255_255_255_/_0.12)]">
            {t("hero.kicker")}
          </p>
          <h1
            id="hero-heading"
            className="font-display text-4xl font-semibold leading-tight tracking-tight [text-shadow:0_2px_0_rgb(17_28_54_/_0.55),0_6px_28px_rgb(15_23_42_/_0.88),0_0_48px_rgb(15_23_42_/_0.45)] sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12] xl:text-6xl"
          >
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-lg font-medium leading-relaxed text-brand-cream [text-shadow:0_1px_0_rgb(17_28_54_/_0.5),0_4px_20px_rgb(15_23_42_/_0.9)]">
            {t("hero.subtitle")}
          </p>

          <div className="flex flex-wrap gap-4 pt-1">
            <WhatsAppButton
              href={whatsappHref}
              ariaLabel={`${t("hero.cta")} — WhatsApp`}
              className="shadow-lg shadow-brand-navy/40"
            >
              {t("hero.cta")}
            </WhatsAppButton>
            <a
              href="#routes"
              className="inline-flex items-center justify-center rounded-full border-2 border-white/85 bg-brand-navy/25 px-5 py-3 text-sm font-semibold text-brand-cream backdrop-blur-[2px] [text-shadow:0_1px_2px_rgb(15_23_42_/_0.9)] transition hover:border-brand-cream hover:bg-brand-navy/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              {t("nav.routes")}
            </a>
          </div>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-white/20 bg-brand-navy/50 p-5 text-sm text-brand-sand shadow-[0_12px_40px_-18px_rgb(0_0_0_/_0.55)] backdrop-blur-md lg:bg-brand-navy/45">
          <p className="font-semibold text-brand-cream">{t("contact.midPageCta")}</p>
          <p className="mt-2 text-brand-sand/90">{t("contact.midPageSubtitle")}</p>
        </div>
      </div>
    </section>
  );
}
