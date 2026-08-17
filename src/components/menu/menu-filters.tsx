"use client";

import { X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categories, dietTags, eventTypes } from "@/data/categories";
import type { CategorySlug, DietTag, EventTypeSlug } from "@/types";
import { cn } from "@/lib/utils";

export interface MenuFilterState {
  query: string;
  category: CategorySlug | "all";
  diets: DietTag[];
  event: EventTypeSlug | "all";
}

export const emptyFilters: MenuFilterState = {
  query: "",
  category: "all",
  diets: [],
  event: "all",
};

export function countActiveFilters(state: MenuFilterState): number {
  return (
    (state.category === "all" ? 0 : 1) +
    (state.event === "all" ? 0 : 1) +
    state.diets.length +
    (state.query.trim() ? 1 : 0)
  );
}

interface MenuFiltersProps {
  state: MenuFilterState;
  onChange: (next: MenuFilterState) => void;
  /** Number of items currently matching, shown inline in the sheet. */
  resultCount: number;
}

export function MenuFilters({
  state,
  onChange,
  resultCount,
}: MenuFiltersProps) {
  const active = countActiveFilters(state);

  function toggleDiet(tag: DietTag) {
    onChange({
      ...state,
      diets: state.diets.includes(tag)
        ? state.diets.filter((d) => d !== tag)
        : [...state.diets, tag],
    });
  }

  return (
    <div className="space-y-8">
      {/* Category */}
      <fieldset>
        <legend className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          Category
        </legend>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <FilterPill
            selected={state.category === "all"}
            onClick={() => onChange({ ...state, category: "all" })}
          >
            All
          </FilterPill>
          {categories.map((category) => (
            <FilterPill
              key={category.slug}
              selected={state.category === category.slug}
              onClick={() => onChange({ ...state, category: category.slug })}
            >
              {category.name}
            </FilterPill>
          ))}
        </div>
      </fieldset>

      {/* Diet */}
      <fieldset>
        <legend className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          Dietary needs
        </legend>
        <p className="mt-1.5 text-xs text-subtle">
          Selecting more than one shows dishes that meet all of them.
        </p>
        <div className="mt-3.5 flex flex-wrap gap-2">
          {dietTags.map((tag) => (
            <FilterPill
              key={tag.value}
              selected={state.diets.includes(tag.value)}
              onClick={() => toggleDiet(tag.value)}
              title={tag.description}
            >
              {tag.label}
            </FilterPill>
          ))}
        </div>
      </fieldset>

      {/* Occasion */}
      <fieldset>
        <legend className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-foreground">
          Occasion
        </legend>
        <div className="mt-3.5 flex flex-wrap gap-2">
          <FilterPill
            selected={state.event === "all"}
            onClick={() => onChange({ ...state, event: "all" })}
          >
            All
          </FilterPill>
          {eventTypes.map((event) => (
            <FilterPill
              key={event.slug}
              selected={state.event === event.slug}
              onClick={() => onChange({ ...state, event: event.slug })}
            >
              {event.name}
            </FilterPill>
          ))}
        </div>
      </fieldset>

      <div className="flex items-center justify-between gap-3 border-t border-line pt-5">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-semibold text-foreground">{resultCount}</span>{" "}
          {resultCount === 1 ? "dish" : "dishes"}
          {active > 0 && (
            <Badge variant="saffron" className="ml-2">
              {active} filter{active === 1 ? "" : "s"}
            </Badge>
          )}
        </p>
        {active > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onChange({ ...emptyFilters })}
          >
            <X aria-hidden="true" />
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}

function FilterPill({
  selected,
  onClick,
  children,
  title,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      title={title}
      className={cn(
        "rounded-full border px-3.5 py-2 text-sm transition-all duration-200",
        selected
          ? "border-saffron bg-saffron/15 font-medium text-saffron-bright"
          : "border-line-strong text-muted hover:border-line-strong/70 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
