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
 * custom key handling; the buttons and dots are pointer/click affordances on
 * top of that.
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
  // separately, so dragging, dot clicks and button presses stay in agreement.
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
        className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 pt-1"
      >
        {testimonials.map((testimonial, i) => (
          <li
            key={testimonial.id}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${testimonials.length}`}
            className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-[38%]"
          >
            <figure className="glass card-lift relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] p-6 sm:p-7">
              {/* Colour accent so the card reads as more than a grey outline. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1 bg-gradient-marigold"
              />

              <span
                aria-hidden="true"
                className="grid size-11 shrink-0 place-items-center rounded-full bg-gradient-marigold text-on-accent shadow-[0_8px_20px_-8px_var(--color-saffron)]"
              >
                <Quote className="size-5" fill="currentColor" />
              </span>

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

              <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <span
                  aria-hidden="true"
                  className="grid size-10 shrink-0 place-items-center rounded-full border border-saffron/30 bg-saffron/10 font-display text-sm font-semibold text-saffron"
                >
                  {testimonial.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-display font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {testimonial.role} · {testimonial.location}
                  </p>
                </div>
                <span className="ml-auto shrink-0 rounded-full border border-saffron/30 bg-saffron/15 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-saffron-bright">
                  {eventTypeLabel[testimonial.eventType]}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-8 flex items-center justify-between gap-4">
        {/* Dots double as a progress indicator and a jump-to-slide control. */}
        <ul className="flex items-center gap-1.5">
          {testimonials.map((testimonial, i) => (
            <li key={testimonial.id}>
              <button
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to testimonial ${i + 1} of ${testimonials.length}`}
                aria-current={i === index}
                className="p-1.5"
              >
                <span
                  className={cn(
                    "block h-1.5 rounded-full transition-all duration-300",
                    i === index
                      ? "w-7 bg-gradient-marigold shadow-[0_0_0_3px_color-mix(in_oklab,var(--color-saffron)_18%,transparent)]"
                      : "w-1.5 bg-line-strong hover:bg-saffron/50",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <p className="text-xs text-subtle tabular-nums">
            {index + 1} / {testimonials.length}
          </p>
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
    </div>
  );
}
