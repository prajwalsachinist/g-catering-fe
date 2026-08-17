"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  className?: string;
  /** Total vertical travel across the element's scroll pass, in px. */
  distance?: number;
}

/**
 * Scroll-linked vertical drift for food imagery. The wrapper keeps its own
 * size; only the inner layer moves, so surrounding layout never shifts.
 */
export function Parallax({
  children,
  className,
  distance = 60,
}: ParallaxProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (prefersReduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
