import Image from "next/image";
import { getMessages, getTranslations } from "next-intl/server";

import { routes, type RouteId } from "@/content/routes";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { RouteItineraryAccordion } from "./RouteItineraryAccordion";
import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

const routeWaKey: Record<RouteId, "jalapao" | "chapada-mesas" | "serra-gerais"> = {
  jalapao: "jalapao",
  "chapada-mesas": "chapada-mesas",
  "serra-gerais": "serra-gerais",
};

type RouteItemMessages = Readonly<{
  panels?: readonly { title: string; body: string }[];
}>;

export async function RoutesSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "routesSection" });
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tLinks = await getTranslations({ locale, namespace: "links" });
  const messages = await getMessages({ locale });
  const routesSectionBlock = messages.routesSection as unknown as {
    items: Record<RouteId, RouteItemMessages>;
  };
  const itemsByRoute = routesSectionBlock.items;

  return (
    <section
      id="routes"
      aria-labelledby="routes-heading"
      className="border-t border-brand-navy/10 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-6xl space-y-10">
        <div className="max-w-2xl space-y-3">
          <h2
            id="routes-heading"
            className="font-display text-3xl font-semibold text-brand-navy sm:text-4xl"
          >
            {t("title")}
          </h2>
          <p className="text-lg text-brand-earth/90">{t("lead")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {routes.map((route) => {
            const title = t(`items.${route.id}.title`);
            const description = t(`items.${route.id}.description`);
            const duration = t(route.durationsKey);
            const altCover = t(`items.${route.id}.altCover`);

            const message = tWa(routeWaKey[route.id]);
            const wa = buildWhatsAppHref(message);
            const itemExtra = itemsByRoute[route.id];
            const panels = itemExtra?.panels ?? [];

            return (
              <article
                key={route.id}
                className="flex flex-col overflow-hidden rounded-3xl border border-brand-navy/15 bg-brand-cream/60 shadow-[0_20px_40px_-32px_rgb(21,34,56)]"
              >
                <div className="relative h-52 w-full">
                  <Image
                    src={route.coverImage}
                    alt={altCover}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-brand-navy/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-brand-sand">
                    {duration}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <header className="space-y-2">
                    <h3 className="font-display text-2xl font-semibold text-brand-navy">
                      {title}
                    </h3>
                    <p className="text-sm text-brand-earth/90">{description}</p>
                  </header>

                  <ul className="space-y-2 text-sm text-brand-navy">
                    {route.highlightsKeys.map((key) => (
                      <li key={key} className="flex gap-2">
                        <span className="font-semibold text-brand-gold" aria-hidden>
                          ·
                        </span>
                        <span>{t(`highlights.${key}`)}</span>
                      </li>
                    ))}
                  </ul>

                  <RouteItineraryAccordion
                    groupAriaLabel={t("itineraryGroupAria", { routeName: title })}
                    panels={panels}
                  />

                  <div className="mt-auto flex flex-col gap-2">
                    <WhatsAppButton href={wa} ariaLabel={`${title} — WhatsApp`}>
                      {t("ctaRoute")}
                    </WhatsAppButton>
                    {route.pdfHref ? (
                      <a
                        href={route.pdfHref}
                        className="text-center text-sm font-semibold text-brand-navy underline-offset-4 hover:text-brand-earth hover:underline"
                        download
                      >
                        {tLinks("downloadPdf")}{" "}
                        <span className="sr-only">{tLinks("newTab")}</span>
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
