"use client";

import * as React from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { eventTypes, eventTypeLabel } from "@/data/categories";
import { galleryImages } from "@/data/gallery";
import type { EventTypeSlug } from "@/types";
import { cn } from "@/lib/utils";

type Filter = EventTypeSlug | "all";

export function GalleryGrid() {
  const searchParams = useSearchParams();
  const initial = searchParams.get("event");
  const validInitial = eventTypes.some((e) => e.slug === initial);

  const [filter, setFilter] = React.useState<Filter>(
    validInitial ? (initial as EventTypeSlug) : "all",
  );
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);

  const images = React.useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((image) => image.eventType === filter),
    [filter],
  );

  // Keep the URL shareable without paying for a navigation per click.
  React.useEffect(() => {
    const url = filter === "all" ? window.location.pathname : `?event=${filter}`;
    window.history.replaceState(null, "", url);
  }, [filter]);

  const active = openIndex === null ? null : images[openIndex];

  const step = React.useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null) return current;
        // Wrap around so the lightbox never dead-ends.
        return (current + delta + images.length) % images.length;
      });
    },
    [images.length],
  );

  return (
    <div className="container-page pb-20">
      {/* Filters */}
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <FilterPill
          selected={filter === "all"}
          onClick={() => setFilter("all")}
        >
          All events
        </FilterPill>
        {eventTypes.map((event) => (
          <FilterPill
            key={event.slug}
            selected={filter === event.slug}
            onClick={() => setFilter(event.slug)}
          >
            {event.name}
          </FilterPill>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted" role="status" aria-live="polite">
        Showing{" "}
        <span className="font-semibold text-foreground">{images.length}</span>{" "}
        {images.length === 1 ? "photograph" : "photographs"}
      </p>

      {/* Masonry via CSS columns; each tile keeps its natural aspect ratio. */}
      <div className="mt-6 gap-4 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setOpenIndex(index)}
            className="group card-lift relative mb-4 block w-full overflow-hidden rounded-2xl border border-line break-inside-avoid"
            aria-label={`Open photograph: ${image.caption}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={
                image.aspect === "portrait"
                  ? 900
                  : image.aspect === "square"
                    ? 1000
                    : 1200
              }
              height={
                image.aspect === "portrait"
                  ? 1200
                  : image.aspect === "square"
                    ? 1000
                    : 800
              }
              loading={index < 3 ? "eager" : "lazy"}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
            />
            <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 text-left">
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {image.caption}
                </span>
                <span className="mt-0.5 block text-xs uppercase tracking-wider text-saffron">
                  {eventTypeLabel[image.eventType]}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="grid size-8 shrink-0 place-items-center rounded-full bg-ink/70 text-foreground opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
              >
                <Expand className="size-4" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <DialogContent
          className="max-w-4xl border-line bg-surface/95 p-3 sm:p-4"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
        >
          {active && (
            <>
              <DialogTitle className="sr-only">{active.caption}</DialogTitle>
              <DialogDescription className="sr-only">
                {active.alt}. Photograph {(openIndex ?? 0) + 1} of{" "}
                {images.length}. Use the left and right arrow keys to move
                between photographs.
              </DialogDescription>

              <div className="relative overflow-hidden rounded-xl bg-ink">
                <Image
                  src={active.src}
                  alt={active.alt}
                  width={1400}
                  height={1000}
                  sizes="(max-width: 1024px) 95vw, 56rem"
                  className="max-h-[70dvh] w-full object-contain"
                  priority
                />
              </div>

              <div className="mt-3 flex items-center justify-between gap-4 px-1 pb-1">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {active.caption}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-wider text-saffron">
                    {eventTypeLabel[active.eventType]} ·{" "}
                    {(openIndex ?? 0) + 1}/{images.length}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => step(-1)}
                    aria-label="Previous photograph"
                  >
                    <ChevronLeft aria-hidden="true" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => step(1)}
                    aria-label="Next photograph"
                  >
                    <ChevronRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FilterPill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-sm transition-all duration-200",
        selected
          ? "border-saffron bg-saffron/15 font-medium text-saffron-bright"
          : "border-line-strong text-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
