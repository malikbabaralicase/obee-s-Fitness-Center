import Link from "next/link";
import { Instagram, Facebook, Youtube, MapPin, Phone } from "lucide-react";
import { BUSINESS, NAV_LINKS, SOCIALS } from "@/lib/constants";

const SOCIAL_ICONS = { instagram: Instagram, facebook: Facebook, youtube: Youtube } as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-hairline-dark bg-black">
      {/* Main row — everything on one horizontal line, wrapping only when it must */}
      <div className="container-content flex flex-wrap items-center justify-between gap-x-10 gap-y-6 py-8">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 bg-accent" aria-hidden />
          <span className="text-lg font-bold uppercase tracking-[0.28em] text-on-dark">
            {BUSINESS.shortName}
          </span>
        </div>

        {/* Nav — inline */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-body-sm font-bold text-on-dark-mute transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact — inline */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-body-sm text-on-dark-mute">
          <a
            href={`tel:${BUSINESS.phoneHref}`}
            className="flex items-center gap-2 transition-colors hover:text-accent"
          >
            <Phone size={15} className="shrink-0 text-accent" />
            {BUSINESS.phoneDisplay}
          </a>
          <span className="flex items-center gap-2">
            <MapPin size={15} className="shrink-0 text-accent" />
            {BUSINESS.address.city}, {BUSINESS.address.country}
          </span>
        </div>

        {/* Socials */}
        <ul className="flex items-center gap-3">
          {SOCIALS.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon as keyof typeof SOCIAL_ICONS];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-hairline-dark text-on-dark-mute transition-colors hover:border-accent hover:text-accent"
                >
                  <Icon size={16} />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Legal bar */}
      <div className="border-t border-hairline-dark bg-elevated">
        <div className="container-content flex flex-col items-center justify-between gap-1 py-4 text-utility-xs uppercase tracking-[0.15em] text-mute sm:flex-row">
          <span>
            © {year} {BUSINESS.name}. All rights reserved.
          </span>
          <span>Premium digital experience.</span>
        </div>
      </div>
    </footer>
  );
}
