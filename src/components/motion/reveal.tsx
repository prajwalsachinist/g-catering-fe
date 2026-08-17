"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Scroll reveals backed by a single shared IntersectionObserver and CSS
 * transitions. The animation itself lives in globals.css.
 *
 * This replaced a Framer Motion implementation: these wrappers appear around
 * almost every section on every page, so the library ended up on the critical
 * path site-wide and dominated blocking time. Framer Motion is still used
 * where it earns its keep - see components/motion/parallax.tsx.
 *
 * Safety property: the hidden state is scoped to `.js` on <html>, so if
 * scripts never run the content is simply visible.
 */

let observer: IntersectionObserver | null = null;

function sharedObserver(): IntersectionObserver {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-revealed");
        // One-shot: scrolling back up should not replay the entrance.
        observer?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
  );
  return observer;
}

function useReveal(ref: React.RefObject<HTMLElement | null>) {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect the user's preference, and degrade safely where
    // IntersectionObserver is unavailable.
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      el.classList.add("is-revealed");
      return;
    }

    const io = sharedObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, [ref]);
}

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Extra delay in seconds, kept for call-site compatibility. */
  delay?: number;
}

export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div
      ref={ref}
      className={cn("reveal", className)}
      style={delay ? { transitionDelay: `${Math.round(delay * 1000)}ms` } : undefined}
    >
      {children}
    </div>
  );
}

export function Stagger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref} className={cn("reveal-stagger", className)}>
      {children}
    </div>
  );
}

/**
 * Plain wrapper - sequencing comes from :nth-child rules on the parent, so
 * this ships no JavaScript at all.
 */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
