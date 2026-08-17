"use client";

import * as React from "react";

/**
 * Ambient saffron particle drift behind the hero.
 *
 * Deliberately Canvas 2D rather than React Three Fiber: the visual goal is a
 * slow warm particle field, and three.js would add roughly half a megabyte to
 * the critical path for a background effect. This costs ~1 KB and renders on
 * the compositor.
 *
 * It stands down completely when any of the following hold, falling back to
 * the static gradient underneath:
 *   - the user prefers reduced motion
 *   - the viewport is phone-sized (below 768px)
 *   - the device reports <= 4 cores or <= 4 GB of memory
 * It also pauses while the tab is hidden.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 768px)");

    // navigator.deviceMemory is Chromium-only; absence is treated as capable.
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowEnd =
      (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;

    const evaluate = () =>
      setActive(!reduced.matches && wide.matches && !lowEnd);

    evaluate();
    reduced.addEventListener("change", evaluate);
    wide.addEventListener("change", evaluate);
    return () => {
      reduced.removeEventListener("change", evaluate);
      wide.removeEventListener("change", evaluate);
    };
  }, []);

  React.useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let frame = 0;
    let running = true;
    let width = 0;
    let height = 0;
    // Cap DPR: past 2x the extra fill cost buys nothing visible here.
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      a: number;
      hue: number;
    };
    let particles: Particle[] = [];

    function seed() {
      // Scale count with area so wide monitors don't look sparse, but cap it.
      const count = Math.min(70, Math.round((width * height) / 26000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 2.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -0.06 - Math.random() * 0.22,
        a: 0.15 + Math.random() * 0.5,
        hue: 28 + Math.random() * 22,
      }));
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    }

    function draw() {
      if (!running) return;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around the edges so the field never empties out.
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const glow = ctx!.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        glow.addColorStop(0, `hsla(${p.hue}, 95%, 62%, ${p.a})`);
        glow.addColorStop(1, `hsla(${p.hue}, 95%, 62%, 0)`);
        ctx!.fillStyle = glow;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx!.fill();
      }

      frame = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    frame = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(frame);
      } else if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      // Purely decorative; nothing here conveys information.
      role="presentation"
    />
  );
}
