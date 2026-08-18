import type { Metadata } from "next";
import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { EnquiryForm } from "@/components/contact/enquiry-form";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { WhatsAppBrandIcon } from "@/components/site/icons";
import { PageHero } from "@/components/site/page-hero";
import { Button } from "@/components/ui/button";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import {
  defaultWhatsappMessage,
  mailHref,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact & Enquiry",
  description:
    "Get a per-plate catering quote for your Pune event. Call +91 98220 12345, message us on WhatsApp, or send the enquiry form with your date and guest count.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Enquiry | Ganesh Catering",
    description:
      "Tell us your date and guest count — we usually quote the same day.",
    url: "/contact",
  },
};

const mapSrc = `https://www.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=en&z=15&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        crumb="Contact"
        eyebrow="Same-day quotes"
        title={
          <>
            Tell us the date, and the{" "}
            <span className="text-gradient-marigold">guest count</span>
          </>
        }
        description="Those two things decide almost everything else. Send them across and we will come back with a per-plate figure — no deposit, no obligation, no salesperson calling you twice a week."
      />

      <section className="pb-20" aria-labelledby="enquiry-heading">
        <div className="container-page">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Form */}
            <div className="lg:col-span-7">
              <h2 id="enquiry-heading" className="sr-only">
                Enquiry form
              </h2>
              <Suspense fallback={<FormSkeleton />}>
                <EnquiryForm />
              </Suspense>
            </div>

            {/* Direct contact */}
            <div className="lg:col-span-5">
              <Reveal>
                <div className="glass rounded-[var(--radius-card)] p-6 sm:p-7">
                  <h2 className="font-display text-lg font-semibold">
                    Rather just talk?
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Most of our bookings start with a five-minute phone call.
                  </p>

                  <div className="mt-5 flex flex-col gap-3">
                    <Button asChild size="lg">
                      <a
                        href={whatsappHref(defaultWhatsappMessage)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <WhatsAppBrandIcon className="size-5" />
                        Message on WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="secondary" size="lg">
                      <a href={telHref}>
                        <Phone aria-hidden="true" />
                        {siteConfig.contact.phoneDisplay}
                      </a>
                    </Button>
                  </div>

                  <dl className="mt-7 space-y-5 border-t border-line pt-6 text-sm">
                    <div className="flex gap-3">
                      <dt className="shrink-0">
                        <span className="sr-only">Address</span>
                        <MapPin
                          className="size-4 text-saffron"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <address className="not-italic text-muted">
                          {siteConfig.address.street}
                          <br />
                          {siteConfig.address.locality},{" "}
                          {siteConfig.address.city}{" "}
                          {siteConfig.address.postalCode}
                        </address>
                      </dd>
                    </div>

                    <div className="flex gap-3">
                      <dt className="shrink-0">
                        <span className="sr-only">Email</span>
                        <Mail
                          className="size-4 text-saffron"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd>
                        <a
                          href={mailHref}
                          className="break-all text-muted transition-colors hover:text-saffron"
                        >
                          {siteConfig.contact.email}
                        </a>
                      </dd>
                    </div>

                    <div className="flex gap-3">
                      <dt className="shrink-0">
                        <span className="sr-only">Business hours</span>
                        <Clock
                          className="size-4 text-saffron"
                          aria-hidden="true"
                        />
                      </dt>
                      <dd className="text-muted">
                        {siteConfig.hours.map((slot) => (
                          <span key={slot.days} className="block">
                            {slot.days}
                            <span className="text-foreground/80">
                              {" "}
                              · {slot.time}
                            </span>
                          </span>
                        ))}
                        <span className="mt-1.5 block text-xs text-subtle">
                          During wedding season we answer well past closing.
                        </span>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>

              {/* Map */}
              <Reveal delay={0.08}>
                <div className="mt-5 overflow-hidden rounded-[var(--radius-card)] border border-line">
                  <iframe
                    src={mapSrc}
                    title={`Map showing ${siteConfig.name} in ${siteConfig.address.locality}, ${siteConfig.address.city}`}
                    width="100%"
                    height="300"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    // .map-embed inverts the light-only Google tiles for the
                    // dark theme and leaves them alone in the light one.
                    className="map-embed block w-full"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "Contact", path: "/contact" }])} />
    </>
  );
}

function FormSkeleton() {
  return (
    <div
      className="glass rounded-[var(--radius-card)] p-6 sm:p-8"
      aria-hidden="true"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={i === 0 || i === 7 ? "sm:col-span-2" : ""}>
            <div className="mb-2 h-4 w-24 rounded bg-surface-2" />
            <div className={i === 7 ? "h-24 rounded-xl bg-surface-2" : "h-12 rounded-xl bg-surface-2"} />
          </div>
        ))}
      </div>
      <div className="mt-7 h-12 w-48 rounded-full bg-surface-2" />
    </div>
  );
}
