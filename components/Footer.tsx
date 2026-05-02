import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { SocialIconStripFooter } from "./SocialIconStripFooter";

const CADASTUR_VERIFY_URL = "https://cadastur.turismo.gov.br";
const HERO_IMAGE_COMMONS_URL =
  "https://commons.wikimedia.org/wiki/File:Fervedouro_Parque_Jalap%C3%A3o_02.jpg";

type Props = Readonly<{ locale: string }>;

export async function Footer({ locale }: Props) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-navy/15 bg-brand-navy px-4 py-10 text-brand-sand sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3 lg:max-w-lg">
          <p className="font-display text-lg font-semibold text-brand-cream">
            Jalapão Gaviões do Cerrado
          </p>
          <p className="text-sm text-brand-sand">{t("tagline")}</p>
          <div className="pt-1">
            <SocialIconStripFooter locale={locale} />
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-brand-sand/70">
            {t("rights", { year })}
          </p>
          <p className="max-w-xl text-[11px] leading-relaxed text-brand-sand/55">
            {t("heroPhotoCreditBefore")}{" "}
            <a
              href={HERO_IMAGE_COMMONS_URL}
              target="_blank"
              rel="noopener noreferrer license"
              aria-label={t("heroPhotoCreditLinkAria")}
              className="underline decoration-brand-sand/40 underline-offset-2 hover:text-brand-sand hover:decoration-brand-sand"
            >
              Wikimedia Commons
            </a>{" "}
            {t("heroPhotoCreditAfter")}
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:items-end sm:justify-end lg:items-end">
          <figure className="flex w-full max-w-[min(100%,380px)] flex-col gap-2 sm:ml-auto sm:items-end">
            <figcaption className="text-xs font-medium text-brand-sand/90">
              {t("cadasturCaption")}
            </figcaption>
            <a
              href={CADASTUR_VERIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg ring-2 ring-white/25 transition-opacity hover:opacity-95 hover:ring-white/45 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              <Image
                src="/images/cadastur-certificado.png"
                alt={t("cadasturAlt")}
                width={1024}
                height={736}
                className="h-auto w-full bg-white"
                sizes="(max-width: 640px) 100vw, 380px"
              />
            </a>
          </figure>
        </div>
      </div>
    </footer>
  );
}
