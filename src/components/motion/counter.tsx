"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

import { formatIndianNumber } from "@/lib/utils";

interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/**
 * Counts up to `value` the first time it scrolls into view. The final value
 * is always present in the DOM as the element's text, so screen readers and
 * search crawlers see the real number rather than a partial tween.
 */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1600,
  className,
}: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = React.useState(prefersReduced ? value : 0);

  React.useEffect(() => {
    if (!inView || prefersReduced) return;

    const controls = animate(0, value, {
      duration: durationMs / 1000,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, prefersReduced, value, durationMs]);

  return (
    <span ref={ref} className={className}>
      {/* The animated value is hidden from assistive tech mid-tween... */}
      <span aria-hidden="true">
        {prefix}
        {formatIndianNumber(display)}
        {suffix}
      </span>
      {/* ...while the true value is announced once. */}
      <span className="sr-only">
        {prefix}
        {formatIndianNumber(value)}
        {suffix}
      </span>
    </span>
  );
}
