import { getTranslations } from "next-intl/server";

import { instagramProfileUrl, tripAdvisorProfileUrl } from "@/lib/social";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { SocialIconStrip } from "./SocialIconStrip";

type Props = Readonly<{ locale: string }>;

export async function FloatingSocial({ locale }: Props) {
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tSocial = await getTranslations({ locale, namespace: "social" });
  const tA11y = await getTranslations({ locale, namespace: "a11y" });

  const whatsappHref = buildWhatsAppHref(tWa("default"));

  return (
    <nav
      aria-label={tSocial("floatingClusterAria")}
      className="fixed bottom-5 right-5 z-[60] lg:bottom-8 lg:right-8 print:hidden"
    >
      <SocialIconStrip
        variant="floating"
        whatsappHref={whatsappHref}
        instagramHref={instagramProfileUrl()}
        tripAdvisorHref={tripAdvisorProfileUrl()}
        ariaWhatsApp={tA11y("whatsappAria")}
        ariaInstagram={tSocial("instagramAria")}
        ariaTripAdvisor={tSocial("tripAdvisorAria")}
      />
    </nav>
  );
}
