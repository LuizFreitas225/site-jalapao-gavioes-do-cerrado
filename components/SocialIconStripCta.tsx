import { getTranslations } from "next-intl/server";

import { instagramProfileUrl, tripAdvisorProfileUrl } from "@/lib/social";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { SocialIconStrip } from "./SocialIconStrip";

type Props = Readonly<{ locale: string }>;

export async function SocialIconStripCta({ locale }: Props) {
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tSocial = await getTranslations({ locale, namespace: "social" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  return (
    <SocialIconStrip
      variant="banner"
      whatsappHref={buildWhatsAppHref(tWa("afterRoutes"))}
      instagramHref={instagramProfileUrl()}
      tripAdvisorHref={tripAdvisorProfileUrl()}
      ariaWhatsApp={tA11y("whatsappAria")}
      ariaInstagram={tSocial("instagramAria")}
      ariaTripAdvisor={tSocial("tripAdvisorAria")}
    />
  );
}
