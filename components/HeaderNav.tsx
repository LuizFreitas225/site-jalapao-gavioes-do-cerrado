import type { NavItem } from "./MobileNav";

type Props = Readonly<{
  links: readonly NavItem[];
  ariaLabel: string;
}>;

export function HeaderNavDesktop({ links, ariaLabel }: Props) {
  return (
    <nav aria-label={ariaLabel} className="hidden lg:block">
      <ul className="flex flex-wrap items-center gap-2 text-sm font-medium text-brand-navy/85">
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className="rounded-md px-2 py-1 transition hover:bg-brand-sand hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
