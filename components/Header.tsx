import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeaderNavDesktop } from "./HeaderNav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";

type Props = Readonly<{ locale: string }>;

export async function Header({ locale }: Props) {
  const t = await getTranslations({ locale });

  const links = [
    { href: "#top", label: t("nav.home") },
    { href: "#about", label: t("nav.about") },
    { href: "#routes", label: t("nav.routes") },
    { href: "#testimonials", label: t("nav.testimonials") },
    { href: "#contact", label: t("nav.contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-navy/10 bg-brand-cream/90 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
          aria-label={t("meta.title")}
        >
          <span className="relative h-11 w-36 shrink-0 overflow-hidden sm:h-12 sm:w-44">
            <Image
              src="/images/brand/logo-mark.png"
              alt={t("meta.title")}
              fill
              sizes="(max-width: 768px) 144px, 176px"
              priority
              className="object-contain object-left"
            />
          </span>
          <span className="hidden max-w-[12rem] font-display text-xs font-semibold leading-tight tracking-tight text-brand-navy sm:block md:max-w-xs md:text-sm">
            Jalapão Gaviões do Cerrado
          </span>
        </a>

        <HeaderNavDesktop
          links={links}
          ariaLabel={t("a11y.mainNavigation")}
        />

        <div className="flex items-center gap-3">
          <MobileNav
            items={links}
            openLabel={t("a11y.openMenu")}
            closeLabel={t("a11y.closeMenu")}
          />
          <LocaleSwitcher current={locale} ariaLabel={t("a11y.localeSwitcher")} />
        </div>
      </div>
    </header>
  );
}
