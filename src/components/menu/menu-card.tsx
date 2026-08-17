import Image from "next/image";
import { Flame } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { categoryMap, dietLabel } from "@/data/categories";
import type { MenuItem } from "@/types";
import { cn } from "@/lib/utils";

interface MenuCardProps {
  item: MenuItem;
  /** Cards above the fold on the menu grid opt out of lazy loading. */
  priority?: boolean;
  className?: string;
}

export function MenuCard({ item, priority = false, className }: MenuCardProps) {
  const category = categoryMap.get(item.category);

  return (
    <article
      className={cn(
        "group glass relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)]",
        "transition-all duration-500 ease-[var(--ease-out-expo)]",
        "hover:-translate-y-1 hover:border-saffron/35 hover:shadow-[0_20px_50px_-24px_var(--color-saffron)]",
        className,
      )}
    >
      <div className="relative aspect-4/3 overflow-hidden bg-surface-2">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent"
        />
        {category && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[0.7rem] font-medium text-foreground backdrop-blur-sm">
            {category.name}
          </span>
        )}
        {item.spiceLevel !== undefined && item.spiceLevel > 0 && (
          <span
            className="absolute right-3 top-3 flex items-center gap-0.5 rounded-full bg-ink/70 px-2 py-1 backdrop-blur-sm"
            title={`Spice level ${item.spiceLevel} of 3`}
          >
            <span className="sr-only">Spice level {item.spiceLevel} of 3</span>
            {Array.from({ length: item.spiceLevel }).map((_, i) => (
              <Flame
                key={i}
                className="size-3 text-marigold"
                aria-hidden="true"
              />
            ))}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-tight">
            {item.name}
          </h3>
          {item.nameMarathi && (
            <span
              lang="mr"
              className="shrink-0 text-sm text-subtle"
              aria-hidden="true"
            >
              {item.nameMarathi}
            </span>
          )}
        </div>

        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {item.diet.map((tag) => (
            <li key={tag}>
              <Badge variant={tag}>{dietLabel[tag]}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
