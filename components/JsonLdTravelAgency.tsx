import { CONTACT_EMAIL_FALLBACK, SITE_NAME, getProductionBaseUrl } from "@/lib/constants";
import { whatsappDigits } from "@/lib/whatsapp";

type Props = Readonly<{ locale: string }>;

export function JsonLdTravelAgency({ locale }: Props) {
  const url = `${getProductionBaseUrl()}/${locale}`;
  const whatsappHref = `https://wa.me/${whatsappDigits()}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: SITE_NAME,
    url,
    telephone: whatsappDigits(),
    ...(CONTACT_EMAIL_FALLBACK.includes("example")
      ? {}
      : { email: CONTACT_EMAIL_FALLBACK }),
    logo: `${getProductionBaseUrl()}/images/brand/logo-mark.png`,
    description:
      locale === "en"
        ? "Adventure travel agency focused on Jalapão, Chapada das Mesas, and Serra Gerais in Tocantins, Brazil."
        : locale === "es"
          ? "Agencia de viajes especializada en Jalapão, Chapada das Mesas y Serra Gerais, Tocantins, Brasil."
          : "Agência de viagens de aventura com roteiros no Jalapão, Chapada das Mesas e Serra Gerais, Tocantins.",
    priceRange: "$$–$$$",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Estado do Tocantins, Brasil",
    },
    knowsLanguage: ["pt-BR", "en", "es"],
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: whatsappHref,
    },
    sameAs: [whatsappHref],
  };

  return (
    <script
      key="jsonld-travel-agency"
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
