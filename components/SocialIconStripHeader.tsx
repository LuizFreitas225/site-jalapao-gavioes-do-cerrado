import { getTranslations } from "next-intl/server";

import { instagramProfileUrl, tripAdvisorProfileUrl } from "@/lib/social";

import { SocialIconStrip } from "./SocialIconStrip";

type Props = Readonly<{ locale: string }>;

export async function SocialIconStripHeader({ locale }: Props) {
  const tSocial = await getTranslations({ locale, namespace: "social" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const instagramHref = instagramProfileUrl();
  const tripAdvisorHref = tripAdvisorProfileUrl();
  if (!instagramHref && !tripAdvisorHref) return null;

  return (
    <nav aria-label={tSocial("headerClusterAria")} className="flex shrink-0 items-center">
      <SocialIconStrip
        variant="header"
        showWhatsApp={false}
        instagramHref={instagramHref}
        tripAdvisorHref={tripAdvisorHref}
        ariaWhatsApp={tA11y("whatsappAria")}
        ariaInstagram={tSocial("instagramAria")}
        ariaTripAdvisor={tSocial("tripAdvisorAria")}
      />
    </nav>
  );
}
