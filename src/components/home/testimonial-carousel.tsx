"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { eventTypeLabel } from "@/data/categories";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

/**
 * Scroll-snap carousel. The track is a natively scrollable region with
 * tabindex=0, so keyboard users can pan it with the arrow keys without any
 * custom key handling; the buttons are a pointer affordance on top of that.
 */
export function TestimonialCarousel() {
  const trackRef = React.useRef<HTMLUListElement>(null);
  const [index, setIndex] = React.useState(0);

  const scrollToIndex = React.useCallback((next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(next, testimonials.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, []);

  // Derive the active dot from scroll position rather than tracking it
  // separately, so dragging and button presses stay in agreement.
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.children) as HTMLElement[];
        const mid = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let best = Infinity;
        children.forEach((child, i) => {
          const centre = child.offsetLeft - track.offsetLeft + child.clientWidth / 2;
          const distance = Math.abs(centre - mid);
          if (distance < best) {
            best = distance;
            closest = i;
          }
        });
        setIndex(closest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="What our clients say"
      className="relative"
    >
      <ul
        ref={trackRef}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
      >
        {testimonials.map((testimonial, i) => (
          <li
            key={testimonial.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[38%]"
          >
            <figure className="glass flex h-full flex-col rounded-[var(--radius-card)] p-6 sm:p-7">
              <Quote
                aria-hidden="true"
                className="size-7 shrink-0 text-saffron/40"
              />

              <div
                className="mt-4 flex gap-0.5"
                role="img"
                aria-label={`Rated ${testimonial.rating} out of 5`}
              >
                {Array.from({ length: testimonial.rating }).map((_, s) => (
                  <Star
                    key={s}
                    className="size-4 fill-saffron text-saffron"
                    aria-hidden="true"
                  />
                ))}
              </div>

              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90 sm:text-base">
                {testimonial.quote}
              </blockquote>

              <figcaption className="mt-6 border-t border-line pt-4">
                <p className="font-display font-semibold">{testimonial.name}</p>
                <p className="mt-0.5 text-sm text-muted">
                  {testimonial.role} · {testimonial.location}
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-saffron">
                  {eventTypeLabel[testimonial.eventType]}
                </p>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        {/* Dots double as a progress indicator on mobile. */}
        <ul className="flex items-center gap-1.5" aria-hidden="true">
          {testimonials.map((testimonial, i) => (
            <li key={testimonial.id}>
              <span
                className={cn(
                  "block h-1.5 rounded-full transition-all duration-300",
                  i === index ? "w-6 bg-saffron" : "w-1.5 bg-line-strong",
                )}
              />
            </li>
          ))}
        </ul>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToIndex(index - 1)}
            disabled={index === 0}
            aria-label="Previous testimonial"
          >
            <ChevronLeft aria-hidden="true" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollToIndex(index + 1)}
            disabled={index === testimonials.length - 1}
            aria-label="Next testimonial"
          >
            <ChevronRight aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
