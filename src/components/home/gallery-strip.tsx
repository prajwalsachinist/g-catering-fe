import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { galleryImages } from "@/data/gallery";

export function GalleryStrip() {
  const strip = galleryImages.slice(0, 10);

  return (
    <section className="section-y" aria-labelledby="gallery-strip-heading">
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="From our events"
            title={<span id="gallery-strip-heading">Sixteen years, in pictures</span>}
            description="Field kitchens at sunrise, counters mid-service, and the moment before three hundred people sit down."
          />
          <Reveal delay={0.1}>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href="/gallery">
                Open the gallery
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* Full-bleed rail; scrolls horizontally on every breakpoint. */}
      <Reveal delay={0.15}>
        <ul className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:px-10">
          {strip.map((image) => (
            <li
              key={image.id}
              className="w-56 shrink-0 snap-start sm:w-64 lg:w-72"
            >
              <Link
                href={`/gallery?event=${image.eventType}`}
                className="group block overflow-hidden rounded-2xl border border-line"
              >
                <div className="relative aspect-3/4 bg-surface-2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 14rem, 18rem"
                    className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent"
                  />
                  <p className="absolute inset-x-4 bottom-4 text-sm font-medium leading-snug text-foreground">
                    {image.caption}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
