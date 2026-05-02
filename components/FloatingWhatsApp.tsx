import { getTranslations } from "next-intl/server";

import { buildWhatsAppHref } from "@/lib/whatsapp";

type Props = Readonly<{ locale: string }>;

export async function FloatingWhatsApp({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const href = buildWhatsAppHref(t("default"));

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-3 rounded-full bg-brand-gold px-4 py-3 text-brand-navy shadow-lg shadow-brand-navy/30 transition hover:bg-brand-amber hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy lg:bottom-8 lg:right-8"
      aria-label={tA11y("whatsappAria")}
    >
      <span className="inline text-sm font-semibold sm:hidden" aria-hidden>
        WA
      </span>
      <span className="hidden text-sm font-semibold sm:inline">WhatsApp</span>
    </a>
  );
}
