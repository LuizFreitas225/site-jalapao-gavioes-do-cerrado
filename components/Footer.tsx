import { getTranslations } from "next-intl/server";

import { buildWhatsAppHref } from "@/lib/whatsapp";

import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

export async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const year = new Date().getFullYear();
  const href = buildWhatsAppHref(tWa("default"));

  return (
    <footer className="border-t border-brand-navy/15 bg-brand-navy px-4 py-10 text-brand-sand sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <p className="font-display text-lg font-semibold text-brand-cream">
            Jalapão Gaviões do Cerrado
          </p>
          <p className="text-sm text-brand-sand">{t("tagline")}</p>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-sand/70">
            {t("rights", { year })}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <WhatsAppButton
            variant="ghost"
            className="border-white/55 text-brand-cream hover:bg-brand-gold hover:text-brand-navy"
            href={href}
            ariaLabel={tA11y("whatsappAria")}
          >
            WhatsApp
          </WhatsAppButton>
        </div>
      </div>
    </footer>
  );
}
