"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

type NavItem = Readonly<{ href: string; label: string }>;

type Props = Readonly<{
  items: readonly NavItem[];
  openLabel: string;
  closeLabel: string;
  /** Identificação do `<nav>` quando o painel está aberto (evita repetir texto de «Abrir menu» no `aria`). */
  menuNavAriaLabel: string;
}>;

/** Alinha backdrop e painel com a faixa do header (`py` + logo h-9 / sm:h-12). */
const PANEL_TOP =
  "top-[3.4375rem] sm:top-[4.6875rem]";

export function MobileNav({
  items,
  openLabel,
  closeLabel,
  menuNavAriaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  const overlay =
    mounted &&
    open &&
    typeof document !== "undefined" &&
    createPortal(
      <div className="lg:hidden">
        {/* Sombreia só a página abaixo do header — header continua legível */}
        <button
          type="button"
          className={`fixed inset-x-0 bottom-0 z-[90] bg-brand-navy/60 backdrop-blur-sm motion-safe:transition-opacity ${PANEL_TOP}`}
          aria-label={closeLabel}
          onClick={close}
        />
        <div
          role="dialog"
          id="mobile-navigation"
          aria-modal="true"
          aria-label={menuNavAriaLabel}
          className={`fixed inset-x-0 z-[91] max-h-[calc(100dvh-3.4375rem)] overflow-y-auto border-b border-brand-navy/15 bg-brand-cream px-4 py-4 shadow-[0_12px_40px_-8px_rgba(21,34,56,0.45)] motion-safe:transition-shadow sm:max-h-[calc(100dvh-4.6875rem)] ${PANEL_TOP}`}
        >
          <ul className="flex flex-col gap-1 text-base font-medium text-brand-navy">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="block rounded-lg px-3 py-3 ring-brand-gold hover:bg-brand-sand hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  onClick={close}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-brand-navy/25 bg-white/90 text-brand-navy shadow-sm transition hover:bg-brand-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-haspopup="true"
        aria-label={open ? closeLabel : openLabel}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <svg
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M6 18 18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      {overlay}
    </>
  );
}

export type { NavItem };
