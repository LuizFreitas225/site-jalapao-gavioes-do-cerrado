import { getTranslations } from "next-intl/server";

import { instagramProfileUrl, tripAdvisorProfileUrl } from "@/lib/social";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { SocialIconStrip } from "./SocialIconStrip";

type Props = Readonly<{ locale: string }>;

export async function SocialIconStripFooter({ locale }: Props) {
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tSocial = await getTranslations({ locale, namespace: "social" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <div className="flex flex-col items-stretch gap-3 sm:items-end">
      <p className="text-xs font-medium uppercase tracking-[0.16em] text-brand-sand/80">
        {tSocial("footerLabel")}
      </p>
      <SocialIconStrip
        variant="footer"
        whatsappHref={buildWhatsAppHref(tWa("default"))}
        instagramHref={instagramProfileUrl()}
        tripAdvisorHref={tripAdvisorProfileUrl()}
        ariaWhatsApp={tA11y("whatsappAria")}
        ariaInstagram={tSocial("instagramAria")}
        ariaTripAdvisor={tSocial("tripAdvisorAria")}
      />
    </div>
  );
}
