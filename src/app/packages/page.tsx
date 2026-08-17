import type { Metadata } from "next";
import Link from "next/link";
import { Info } from "lucide-react";

import { ComparisonTable } from "@/components/packages/comparison-table";
import { PricingCards } from "@/components/packages/pricing-cards";
import { Reveal } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { pricingNotes } from "@/data/packages";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Packages & Per-Plate Pricing",
  description:
    "Silver, Gold and Platinum catering packages from ₹399 per plate. Compare starters, mains, live counters, staffing and crockery side by side. Minimum 100 guests, Pune.",
  alternates: { canonical: "/packages" },
  openGraph: {
    title: "Packages & Per-Plate Pricing | Ganesh Catering",
    description:
      "Three per-plate tiers from ₹399, compared feature by feature.",
    url: "/packages",
  },
};

export default function PackagesPage() {
  return (
    <>
      <PageHero
        crumb="Packages"
        eyebrow="Per-plate pricing"
        title={
          <>
            Three tiers. No{" "}
            <span className="text-gradient-marigold">surprises</span> on the
            invoice.
          </>
        }
        description="Every package below is a starting point, not a straitjacket. Swap dishes between cuisines, add counters, or ask us to build something else entirely — the price moves with the menu, and we tell you before it does."
      />

      <section className="pb-8" aria-labelledby="tiers-heading">
        <div className="container-page">
          {/* Tier cards use <h3>; this keeps the outline h1 > h2 > h3. */}
          <h2 id="tiers-heading" className="sr-only">
            Package tiers
          </h2>
          <PricingCards />
        </div>
      </section>

      <section className="section-y" aria-labelledby="compare-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Side by side"
            title={<span id="compare-heading">What changes between tiers</span>}
            description="The differences that actually show up on the day: how many dishes, how many counters, and how many people we put on the floor."
          />
          <div className="mt-10">
            <ComparisonTable />
          </div>
        </div>
      </section>

      <section className="pb-20" aria-labelledby="notes-heading">
        <div className="container-page">
          <Reveal>
            <div className="glass rounded-[var(--radius-card)] p-6 sm:p-8">
              <h2
                id="notes-heading"
                className="flex items-center gap-2.5 font-display text-lg font-semibold"
              >
                <Info className="size-5 text-saffron" aria-hidden="true" />
                The fine print, up front
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {pricingNotes.map((note) => (
                  <li
                    key={note}
                    className="flex gap-2.5 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-saffron/70"
                    />
                    {note}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">
                  Working to a fixed budget? Tell us the number and we will
                  build a menu to it.
                </p>
                <Button asChild className="shrink-0">
                  <Link href="/contact">Get a custom quote</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([{ name: "Packages", path: "/packages" }])}
      />
    </>
  );
}
