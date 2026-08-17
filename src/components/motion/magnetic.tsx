"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum pull toward the pointer, in px. */
  strength?: number;
}

/**
 * Pulls its child gently toward the pointer on hover. Disabled entirely for
 * coarse pointers (touch) and for users who prefer reduced motion, so the
 * child stays exactly where it was laid out.
 */
export function Magnetic({
  children,
  className,
  strength = 12,
}: MagneticProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = React.useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  React.useEffect(() => {
    if (prefersReduced) {
      setEnabled(false);
      return;
    }
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [prefersReduced]);

  function handlePointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);
    // Normalise to the element's half-extent so the pull is proportional.
    x.set((offsetX / (rect.width / 2)) * strength);
    y.set((offsetY / (rect.height / 2)) * strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x: springX, y: springY, display: "inline-block" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      // Keyboard users never trigger the pull; make sure focus resets it too.
      onBlur={reset}
    >
      {children}
    </motion.span>
  );
}
