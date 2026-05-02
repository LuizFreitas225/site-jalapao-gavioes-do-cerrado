"use client";

import { useLocale } from "next-intl";
import { useEffect } from "react";

/** Sincroniza `lang` do `<html>` com o locale da rota (layout raiz usa fallback estático). */
export function LocaleHtmlLang() {
  const locale = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
