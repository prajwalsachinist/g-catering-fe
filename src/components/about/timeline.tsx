import { Reveal } from "@/components/motion/reveal";
import { timeline } from "@/data/about";

/**
 * Vertical timeline with a single rail on the left at every breakpoint -
 * alternating left/right entries look elegant on a desktop but collapse
 * badly at 360px, and this content is read top to bottom either way.
 */
export function Timeline() {
  return (
    <ol className="relative mt-12 space-y-10 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-saffron/60 before:via-line-strong before:to-transparent">
      {timeline.map((entry, index) => (
        <li key={entry.year} className="relative pl-9">
          <Reveal delay={index * 0.04}>
            <span
              aria-hidden="true"
              className="absolute -left-9 top-1.5 ml-[1px] grid size-3.5 place-items-center rounded-full border-2 border-saffron bg-ink"
            >
              <span className="size-1 rounded-full bg-saffron" />
            </span>

            <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-saffron">
              {entry.year}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-snug">
              {entry.title}
            </h3>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              {entry.description}
            </p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
