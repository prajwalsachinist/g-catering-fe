import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Heading level, so each page keeps a single h1 and a sane outline. */
  as?: "h1" | "h2" | "h3";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
          {align === "center" && (
            <span
              aria-hidden="true"
              className="hidden h-px w-8 bg-saffron/50 sm:inline-block"
            />
          )}
          {eyebrow}
          <span
            aria-hidden="true"
            className="hidden h-px w-8 bg-saffron/50 sm:inline-block"
          />
        </p>
      )}
      <Tag
        className={cn(
          "text-balance",
          Tag === "h1"
            ? "text-display-lg leading-[0.98] tracking-[-0.03em]"
            : "text-display-sm leading-[1.08]",
        )}
      >
        {title}
      </Tag>
      {description && (
        <div className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
          {description}
        </div>
      )}
    </Reveal>
  );
}
