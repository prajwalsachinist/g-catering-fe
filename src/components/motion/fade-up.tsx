import { cn } from "@/lib/utils";

interface FadeUpProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in milliseconds. Keep 0 for the LCP element. */
  delay?: number;
}

/**
 * CSS-only entrance animation for above-the-fold content.
 *
 * Unlike <Reveal>, this ships no JavaScript and does not wait for hydration,
 * so hero copy is painted on the first frame even if JS never arrives. Use
 * this above the fold and <Reveal> for scroll-linked sections further down.
 */
export function FadeUp({ children, className, delay = 0 }: FadeUpProps) {
  return (
    <div
      className={cn("reveal-up", className)}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
