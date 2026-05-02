"use client";

import { useTransition } from "react";

import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/navigation";

const labels: Record<Locale, string> = {
  pt: "PT",
  en: "EN",
  es: "ES",
};

type Props = Readonly<{
  current: string;
  ariaLabel: string;
}>;

export function LocaleSwitcher({ current, ariaLabel }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  const onChange = (locale: string) => {
    if (!(routing.locales as readonly string[]).includes(locale)) return;
    const nextLocale = locale as Locale;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative">
      <label htmlFor="locale-switcher" className="sr-only">
        {ariaLabel}
      </label>
      <select
        id="locale-switcher"
        className="rounded-md border border-brand-navy/20 bg-white/90 px-2 py-1.5 text-sm font-medium text-brand-navy shadow-sm backdrop-blur hover:border-brand-navy/40 disabled:opacity-60"
        value={current}
        disabled={pending}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc}>
            {labels[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
