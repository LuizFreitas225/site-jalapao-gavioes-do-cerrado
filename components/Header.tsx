import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { HeaderNavDesktop } from "./HeaderNav";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileNav } from "./MobileNav";
import { SocialIconStripHeader } from "./SocialIconStripHeader";

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
      <div className="relative mx-auto flex max-w-6xl flex-nowrap items-center justify-between gap-1.5 px-3 py-2 sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
        <a
          href="#top"
          className="flex min-w-0 max-w-[min(100%,11.5rem)] items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold sm:max-w-none sm:gap-3"
          aria-label={t("meta.title")}
        >
          <span className="relative h-9 w-[7.125rem] shrink-0 overflow-hidden sm:h-12 sm:w-44">
            <Image
              src="/images/brand/logo-mark.png"
              alt={t("meta.title")}
              fill
              sizes="(max-width: 640px) 114px, 176px"
              priority
              className="object-contain object-left"
            />
          </span>
          <span className="hidden font-display text-xs font-semibold leading-tight tracking-tight text-brand-navy sm:block md:max-w-xs md:text-sm lg:max-w-[12rem]">
            Jalapão Gaviões do Cerrado
          </span>
        </a>

        <HeaderNavDesktop
          links={links}
          ariaLabel={t("a11y.mainNavigation")}
        />

        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
          <SocialIconStripHeader locale={locale} />
          <MobileNav
            items={links}
            openLabel={t("a11y.openMenu")}
            closeLabel={t("a11y.closeMenu")}
            menuNavAriaLabel={t("a11y.mainNavigation")}
          />
          <LocaleSwitcher current={locale} ariaLabel={t("a11y.localeSwitcher")} />
        </div>
      </div>
    </header>
  );
}
