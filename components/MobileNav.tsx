"use client";

import { useState } from "react";

type NavItem = Readonly<{ href: string; label: string }>;

type Props = Readonly<{
  items: readonly NavItem[];
  openLabel: string;
  closeLabel: string;
}>;

export function MobileNav({ items, openLabel, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center rounded-md border border-brand-navy/25 bg-white/90 px-3 py-2 text-sm font-semibold text-brand-navy shadow-sm transition hover:bg-brand-sand lg:hidden"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((v) => !v)}
      >
        {open ? closeLabel : openLabel}
      </button>
      <div
        id="mobile-navigation"
        className={
          open
            ? "absolute left-0 right-0 top-full z-50 border-b border-brand-navy/10 bg-brand-cream/98 p-4 shadow-lg lg:hidden"
            : "hidden"
        }
      >
        <ul className="flex flex-col gap-2 text-base font-medium text-brand-navy">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-md px-2 py-2 hover:bg-brand-sand"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export type { NavItem };
