import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

import { Magnetic } from "@/components/motion/magnetic";
import { Reveal } from "@/components/motion/reveal";
import { WhatsAppBrandIcon } from "@/components/site/icons";
import { Button } from "@/components/ui/button";
import {
  defaultWhatsappMessage,
  siteConfig,
  telHref,
  whatsappHref,
} from "@/lib/site-config";

export function FinalCta() {
  return (
    <section className="section-y" aria-labelledby="final-cta-heading">
      <div className="container-page">
        <Reveal>
          <div className="glass-strong grain relative isolate overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              aria-hidden="true"
              className="glow-marigold absolute inset-x-0 top-0 h-full"
            />

            <div className="relative mx-auto max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
                Dates fill up fast
              </p>
              <h2
                id="final-cta-heading"
                className="mt-4 text-display leading-[1.02] tracking-[-0.03em]"
              >
                Tell us about your{" "}
                <span className="text-gradient-marigold">occasion</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Share your date, guest count and the kind of menu you have in
                mind. We will come back with a per-plate quote, usually the same
                day.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Magnetic>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">
                      Request a quote
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <a
                    href={whatsappHref(defaultWhatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppBrandIcon className="size-5" />
                    WhatsApp us
                  </a>
                </Button>
              </div>

              <p className="mt-8 text-sm text-subtle">
                Or call{" "}
                <a
                  href={telHref}
                  className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:text-saffron hover:underline"
                >
                  <Phone className="size-3.5" aria-hidden="true" />
                  {siteConfig.contact.phoneDisplay}
                </a>{" "}
                · {siteConfig.hours[0].days}, {siteConfig.hours[0].time}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
