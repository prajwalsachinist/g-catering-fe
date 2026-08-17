import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Wordmark with a stylised thali mark - concentric rings around a centred
 * flame, echoing the plate motif used across the imagery.
 */
export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        className="size-9 shrink-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="logo-marigold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-turmeric)" />
            <stop offset="55%" stopColor="var(--color-saffron)" />
            <stop offset="100%" stopColor="var(--color-marigold)" />
          </linearGradient>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="none"
          stroke="url(#logo-marigold)"
          strokeWidth="1.5"
          opacity="0.55"
        />
        <circle
          cx="20"
          cy="20"
          r="13"
          fill="url(#logo-marigold)"
          opacity="0.12"
        />
        {/* Flame */}
        <path
          d="M20 10c3.2 3.6 5.4 6.4 5.4 9.8a5.4 5.4 0 1 1-10.8 0c0-3.4 2.2-6.2 5.4-9.8Z"
          fill="url(#logo-marigold)"
        />
        <path
          d="M20 18.5c1.3 1.5 2.1 2.6 2.1 3.9a2.1 2.1 0 1 1-4.2 0c0-1.3.8-2.4 2.1-3.9Z"
          fill="var(--color-ink)"
          opacity="0.65"
        />
      </svg>
      {showText && (
        <span className="font-display text-lg font-semibold leading-none tracking-tight">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
