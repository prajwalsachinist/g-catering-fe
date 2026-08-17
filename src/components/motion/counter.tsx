"use client";

import * as React from "react";

import { formatIndianNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Ease-out cubic - fast start, gentle settle. */
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Counts up to `value` the first time it scrolls into view.
 *
 * Hand-rolled requestAnimationFrame rather than a motion library: this is one
 * number tweening, and pulling Framer Motion in for it put the whole library
 * on the home and about routes.
 *
 * The true value is always in the DOM for assistive technology and crawlers;
 * only the animated copy is hidden from them.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      setDisplay(value);
      return;
    }

    let frame = 0;
    let start: number | null = null;

    const run = (now: number) => {
      if (start === null) start = now;
      const progress = Math.min((now - start) / durationMs, 1);
      setDisplay(Math.round(easeOut(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          io.unobserve(entry.target);
          setDisplay(0);
          frame = requestAnimationFrame(run);
        }
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">
        {prefix}
        {formatIndianNumber(display)}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {formatIndianNumber(value)}
        {suffix}
      </span>
    </span>
  );
}
