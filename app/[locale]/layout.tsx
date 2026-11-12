import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";
import { routing, type Locale } from "@/i18n/routing";
import { getProductionBaseUrl, SITE_NAME } from "@/lib/constants";

type Props = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale } = await props.params;

  const t = await getTranslations({ locale, namespace: "meta" });
  const base = getProductionBaseUrl();
  const title = t("title");
  const description = t("description");
  const ogImageUrl = `${base}/images/routes/jalapao-cover.webp`;

  return {
    metadataBase: new URL(base),
    title: {
      default: title,
      template: `%s · ${SITE_NAME}`,
    },
    description,
    keywords: t("keywords"),
    robots: { index: true, follow: true },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        pt: "/pt",
        en: "/en",
        es: "/es",
        "x-default": "/pt",
      },
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title,
      description,
      locale:
        locale === "pt"
          ? "pt_BR"
          : locale === "es"
            ? "es_ES"
            : "en_US",
      alternateLocale: ["pt_BR", "en_US", "es_ES"],
      images: [{ url: ogImageUrl, width: 960, height: 960, alt: title }],
      url: `/${locale}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale as Locale} messages={{}}>
      <LocaleHtmlLang />
      {children}
    </NextIntlClientProvider>
  );
}
