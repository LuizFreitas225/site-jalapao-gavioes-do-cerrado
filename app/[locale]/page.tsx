import { getTranslations } from "next-intl/server";

import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { CtaBanner } from "@/components/CtaBanner";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { JsonLdTravelAgency } from "@/components/JsonLdTravelAgency";
import { RoutesSection } from "@/components/RoutesSection";
import { SkipLink } from "@/components/SkipLink";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export default async function HomePage(
  props: Readonly<{ params: Promise<{ locale: string }> }>,
) {
  const { locale } = await props.params;
  const skip = await getTranslations({ locale, namespace: "a11y" });

  return (
    <>
      <JsonLdTravelAgency locale={locale} />
      <SkipLink label={skip("skipToContent")} />

      <Header locale={locale} />

      <main id="main-content" lang={locale} className="space-y-0">
        <Hero locale={locale} />
        <AboutSection locale={locale} />
        <RoutesSection locale={locale} />
        <CtaBanner locale={locale} />
        <TestimonialsSection locale={locale} />
        <ContactSection locale={locale} />
      </main>

      <Footer locale={locale} />
      <FloatingWhatsApp locale={locale} />
    </>
  );
}
