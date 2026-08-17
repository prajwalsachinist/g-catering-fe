"use client";

import * as React from "react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum pull toward the pointer, in px. */
  strength?: number;
}

/**
 * Pulls its child gently toward the pointer on hover.
 *
 * Written against the DOM directly rather than with a spring library: the
 * effect is a short transform on two call-to-action buttons, and it is not
 * worth shipping an animation runtime for. Easing comes from a CSS
 * transition, and the transform is written straight to style so pointer
 * moves never trigger a React render.
 *
 * Disabled for coarse pointers (touch) and for reduced-motion users, so the
 * child stays exactly where it was laid out.
 */
export function Magnetic({
  children,
  className,
  strength = 12,
}: MagneticProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const enabledRef = React.useRef(false);

  React.useEffect(() => {
    const media = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => {
      enabledRef.current = media.matches;
      if (!media.matches && ref.current) {
        ref.current.style.transform = "";
      }
    };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  function handlePointerMove(event: React.PointerEvent<HTMLSpanElement>) {
    const el = ref.current;
    if (!enabledRef.current || !el) return;
    const rect = el.getBoundingClientRect();
    // Normalise to the element's half-extent so the pull is proportional.
    const x = ((event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength;
    const y = ((event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength;
    el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        transition: "transform 0.35s var(--ease-out-expo)",
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      // Keyboard users never trigger the pull; make sure focus resets it too.
      onBlur={reset}
    >
      {children}
    </span>
  );
}
