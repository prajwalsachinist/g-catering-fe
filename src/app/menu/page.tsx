import type { Metadata } from "next";
import { Suspense } from "react";

import { MenuBrowser } from "@/components/menu/menu-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { menuItems } from "@/data/menu";
import { breadcrumbJsonLd, menuJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Catering Menu",
  description:
    "Browse 48 vegetarian dishes across Maharashtrian thali, Punjabi, South Indian, Chinese, live counters, sweets and beverages. Filter by Jain, vegan or no-onion-garlic and by occasion.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Catering Menu | Ganesh Catering",
    description:
      "48 vegetarian dishes across eight cuisines, filterable by dietary need and occasion.",
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <>
      <PageHero
        crumb="Menu"
        eyebrow={`${menuItems.length} dishes · 8 cuisines`}
        title={
          <>
            Build the menu your{" "}
            <span className="text-gradient-marigold">guests</span> will talk
            about
          </>
        }
        description="Everything here is vegetarian. Filter by dietary need to see exactly what suits your guests, or by occasion to see what we usually serve at it. Nothing on this page is fixed — we build the final menu with you."
      />

      {/* useSearchParams needs a Suspense boundary for static prerendering. */}
      <Suspense fallback={<MenuSkeleton />}>
        <MenuBrowser />
      </Suspense>

      <JsonLd data={menuJsonLd()} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Menu", path: "/menu" }])} />
    </>
  );
}

function MenuSkeleton() {
  return (
    <div className="container-page pb-20" aria-hidden="true">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        <div className="hidden lg:col-span-3 lg:block">
          <div className="h-12 rounded-xl bg-surface-2" />
          <div className="mt-8 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-9 rounded-full bg-surface-2" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-9">
          <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="h-80 rounded-[var(--radius-card)] bg-surface-2"
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
