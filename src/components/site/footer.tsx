import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookBrandIcon,
  InstagramBrandIcon,
  WhatsAppBrandIcon,
} from "@/components/site/icons";
import { Logo } from "@/components/site/logo";
import { eventTypes } from "@/data/categories";
import {
  defaultWhatsappMessage,
  mailHref,
  navLinks,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/site-config";

function ColumnHeading({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
    >
      <span
        aria-hidden="true"
        className="h-3 w-1 shrink-0 rounded-full bg-gradient-marigold"
      />
      {children}
    </h2>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line-strong/50 bg-surface/60">
      {/* Brand hairline, matching the header's scrolled state. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-marigold"
      />
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. Serving weddings, mangalkarya, vastu shanti
              and corporate events across Pune since {siteConfig.founded}.
            </p>
            {/* Brand marks carry their own colour, so no bordered wrapper. */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
                aria-label={`${siteConfig.name} on Instagram`}
              >
                <InstagramBrandIcon className="size-9" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
                aria-label={`${siteConfig.name} on Facebook`}
              >
                <FacebookBrandIcon className="size-9" />
              </a>
              <a
                href={whatsappHref(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full transition-transform duration-200 hover:-translate-y-0.5 hover:brightness-110"
                aria-label="Message us on WhatsApp"
              >
                <WhatsAppBrandIcon className="size-9" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-pages" className="lg:col-span-2">
            <ColumnHeading id="footer-pages">Pages</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-saffron-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Occasions */}
          <nav aria-labelledby="footer-events" className="lg:col-span-3">
            <ColumnHeading id="footer-events">Occasions</ColumnHeading>
            <ul className="mt-4 space-y-2.5">
              {eventTypes.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/menu?event=${event.slug}`}
                    className="text-sm text-muted transition-colors hover:text-saffron-bright"
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <ColumnHeading>Get in touch</ColumnHeading>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={telHref}
                  className="flex items-start gap-2.5 text-muted transition-colors hover:text-saffron-bright"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-start gap-2.5 break-all text-muted transition-colors hover:text-saffron-bright"
                >
                  <Mail className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <address className="not-italic">
                  {siteConfig.address.street},<br />
                  {siteConfig.address.locality}, {siteConfig.address.city}{" "}
                  {siteConfig.address.postalCode}
                </address>
              </li>
              <li className="flex items-start gap-2.5 text-muted">
                <Clock className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                <span>
                  {siteConfig.hours.map((h) => (
                    <span key={h.days} className="block">
                      {h.days}: {h.time}
                    </span>
                  ))}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Service areas */}
        <div className="mt-12 border-t border-line pt-8">
          <ColumnHeading>Areas we serve</ColumnHeading>
          <p className="mt-3 text-sm leading-relaxed text-subtle">
            {siteConfig.serviceAreas.join(" · ")} and across Pune district.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-line pt-8 text-xs text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalName}. All rights reserved.
          </p>
          <p>
            FSSAI Licence {siteConfig.credentials.fssai} · Pure vegetarian
            kitchen
          </p>
        </div>
      </div>
    </footer>
  );
}
