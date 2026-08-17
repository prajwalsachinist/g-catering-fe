import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
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

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface/40">
      <div className="container-page py-14 md:py-20">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. Serving weddings, mangalkarya, vastu shanti
              and corporate events across Pune since {siteConfig.founded}.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line-strong p-2.5 text-muted transition-colors hover:border-saffron hover:text-saffron"
                aria-label={`${siteConfig.name} on Instagram`}
              >
                <InstagramIcon className="size-4" />
              </a>
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line-strong p-2.5 text-muted transition-colors hover:border-saffron hover:text-saffron"
                aria-label={`${siteConfig.name} on Facebook`}
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={whatsappHref(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-line-strong p-2.5 text-muted transition-colors hover:border-saffron hover:text-saffron"
                aria-label="Message us on WhatsApp"
              >
                <WhatsAppIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav aria-labelledby="footer-pages" className="lg:col-span-2">
            <h2
              id="footer-pages"
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
            >
              Pages
            </h2>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-saffron"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Occasions */}
          <nav aria-labelledby="footer-events" className="lg:col-span-3">
            <h2
              id="footer-events"
              className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground"
            >
              Occasions
            </h2>
            <ul className="mt-4 space-y-2.5">
              {eventTypes.map((event) => (
                <li key={event.slug}>
                  <Link
                    href={`/menu?event=${event.slug}`}
                    className="text-sm text-muted transition-colors hover:text-saffron"
                  >
                    {event.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
              Get in touch
            </h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <a
                  href={telHref}
                  className="flex items-start gap-2.5 text-muted transition-colors hover:text-saffron"
                >
                  <Phone className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-start gap-2.5 break-all text-muted transition-colors hover:text-saffron"
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
          <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
            Areas we serve
          </h2>
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
