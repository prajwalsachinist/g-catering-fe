import type { Metadata } from "next";
import { Suspense } from "react";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { galleryImages } from "@/data/gallery";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photographs from weddings, mangalkarya, vastu shanti pujas, corporate offsites and house parties catered by Ganesh Catering across Pune.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery | Ganesh Catering",
    description:
      "Field kitchens, live counters and full thalis from events across Pune.",
    url: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        crumb="Gallery"
        eyebrow={`${galleryImages.length} photographs`}
        title={
          <>
            Sixteen years of{" "}
            <span className="text-gradient-marigold">service</span>, one frame
            at a time
          </>
        }
        description="Sunrise prep in a field kitchen, a dosa counter mid-rush, and the quiet minute before three hundred people sit down to eat. Filter by the kind of event you are planning."
      />

      <Suspense fallback={<GallerySkeleton />}>
        <GalleryGrid />
      </Suspense>

      <JsonLd data={breadcrumbJsonLd([{ name: "Gallery", path: "/gallery" }])} />
    </>
  );
}

function GallerySkeleton() {
  return (
    <div className="container-page pb-20" aria-hidden="true">
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-10 w-28 rounded-full bg-surface-2" />
        ))}
      </div>
      <div className="mt-11 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="mb-4 rounded-2xl bg-surface-2"
            style={{ height: i % 3 === 0 ? 320 : i % 3 === 1 ? 240 : 280 }}
          />
        ))}
      </div>
    </div>
  );
}
