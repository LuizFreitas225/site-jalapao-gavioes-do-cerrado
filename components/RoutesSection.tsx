import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { routes, type RouteId } from "@/content/routes";
import { buildWhatsAppHref } from "@/lib/whatsapp";

import { WhatsAppButton } from "./WhatsAppButton";

type Props = Readonly<{ locale: string }>;

const routeWaKey: Record<RouteId, "jalapao" | "chapada-mesas" | "serra-gerais"> = {
  jalapao: "jalapao",
  "chapada-mesas": "chapada-mesas",
  "serra-gerais": "serra-gerais",
};

export async function RoutesSection({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "routesSection" });
  const tWa = await getTranslations({ locale, namespace: "whatsappMessages" });
  const tLinks = await getTranslations({ locale, namespace: "links" });

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

                  <div className="mt-auto flex flex-col gap-3">
                    {route.pdfHref ? (
                      <div className="rounded-2xl border border-brand-gold/35 bg-brand-sand/50 p-4">
                        <p className="text-sm text-brand-earth/95">
                          {t(`items.${route.id}.pdfDescription`)}
                        </p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                          <a
                            href={route.pdfHref}
                            download
                            className="inline-flex items-center justify-center rounded-full bg-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-sand transition hover:bg-brand-earth"
                          >
                            {tLinks("downloadPdf")}
                          </a>
                          <a
                            href={route.pdfHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full border border-brand-navy/25 px-4 py-2.5 text-sm font-semibold text-brand-navy transition hover:border-brand-gold hover:text-brand-earth"
                          >
                            {tLinks("viewPdf")}
                            <span className="sr-only"> {tLinks("newTab")}</span>
                          </a>
                        </div>
                      </div>
                    ) : null}
                    <WhatsAppButton href={wa} ariaLabel={`${title} — WhatsApp`}>
                      {t("ctaRoute")}
                    </WhatsAppButton>
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
