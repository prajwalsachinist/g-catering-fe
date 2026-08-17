"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, UtensilsCrossed, X } from "lucide-react";

import { MenuCard } from "@/components/menu/menu-card";
import {
  countActiveFilters,
  emptyFilters,
  MenuFilters,
  type MenuFilterState,
} from "@/components/menu/menu-filters";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { categories, categoryMap } from "@/data/categories";
import { menuItems } from "@/data/menu";
import type { CategorySlug, DietTag, EventTypeSlug, MenuItem } from "@/types";

const categoryOrder = new Map(categories.map((c) => [c.slug, c.order]));

/** Reads the initial filter state out of the query string. */
function readParams(params: URLSearchParams): MenuFilterState {
  const category = params.get("category");
  const event = params.get("event");
  const diet = params.get("diet");

  const validCategory = categories.some((c) => c.slug === category);

  return {
    query: params.get("q") ?? "",
    category: validCategory ? (category as CategorySlug) : "all",
    diets: (diet?.split(",").filter(Boolean) ?? []) as DietTag[],
    event: event ? (event as EventTypeSlug) : "all",
  };
}

function matches(item: MenuItem, state: MenuFilterState): boolean {
  if (state.category !== "all" && item.category !== state.category) return false;
  if (state.event !== "all" && !item.eventTypes.includes(state.event)) return false;
  // Every selected dietary need must be satisfied, not just one of them.
  if (!state.diets.every((tag) => item.diet.includes(tag))) return false;

  const query = state.query.trim().toLowerCase();
  if (!query) return true;

  const haystack = [
    item.name,
    item.nameMarathi ?? "",
    item.description,
    categoryMap.get(item.category)?.name ?? "",
  ]
    .join(" ")
    .toLowerCase();

  return query.split(/\s+/).every((token) => haystack.includes(token));
}

export function MenuBrowser() {
  const searchParams = useSearchParams();

  // Seeded from the URL once. Kept in local state afterwards so typing in the
  // search box never costs a navigation; the URL is then updated in place so
  // the current view stays shareable.
  const [state, setState] = React.useState<MenuFilterState>(() =>
    readParams(new URLSearchParams(searchParams.toString())),
  );
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams();
    if (state.query.trim()) params.set("q", state.query.trim());
    if (state.category !== "all") params.set("category", state.category);
    if (state.event !== "all") params.set("event", state.event);
    if (state.diets.length) params.set("diet", state.diets.join(","));

    const query = params.toString();
    const url = query ? `?${query}` : window.location.pathname;

    const timer = window.setTimeout(() => {
      window.history.replaceState(null, "", url);
    }, 250);
    return () => window.clearTimeout(timer);
  }, [state]);

  const results = React.useMemo(
    () =>
      menuItems
        .filter((item) => matches(item, state))
        .sort(
          (a, b) =>
            (categoryOrder.get(a.category) ?? 0) -
              (categoryOrder.get(b.category) ?? 0) ||
            a.name.localeCompare(b.name),
        ),
    [state],
  );

  const activeCount = countActiveFilters(state);

  return (
    <div className="container-page pb-20">
      <div className="lg:grid lg:grid-cols-12 lg:gap-10">
        {/* Desktop filter rail */}
        <aside
          className="hidden lg:col-span-3 lg:block"
          aria-label="Menu filters"
        >
          <div className="sticky top-28">
            <SearchField
              value={state.query}
              onChange={(query) => setState({ ...state, query })}
            />
            <div className="mt-8">
              <MenuFilters
                state={state}
                onChange={setState}
                resultCount={results.length}
              />
            </div>
          </div>
        </aside>

        <div className="lg:col-span-9">
          {/* Mobile sticky filter bar */}
          <div className="sticky top-[4.25rem] z-30 -mx-5 mb-6 bg-ink/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8 lg:hidden">
            <div className="flex gap-2">
              <SearchField
                value={state.query}
                onChange={(query) => setState({ ...state, query })}
                className="flex-1"
              />
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="secondary" size="icon" className="shrink-0 relative">
                    <SlidersHorizontal aria-hidden="true" />
                    <span className="sr-only">
                      Open filters
                      {activeCount > 0 && `, ${activeCount} active`}
                    </span>
                    {activeCount > 0 && (
                      <span
                        aria-hidden="true"
                        className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-saffron text-[0.65rem] font-bold text-on-accent"
                      >
                        {activeCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="px-5 pt-2">
                  <SheetTitle className="mt-2">Filter the menu</SheetTitle>
                  <SheetDescription className="mt-1">
                    Narrow 48 dishes by category, dietary need or occasion.
                  </SheetDescription>
                  <div className="mt-6">
                    <MenuFilters
                      state={state}
                      onChange={setState}
                      resultCount={results.length}
                    />
                  </div>
                  <Button
                    className="mt-7 w-full"
                    size="lg"
                    onClick={() => setSheetOpen(false)}
                  >
                    Show {results.length}{" "}
                    {results.length === 1 ? "dish" : "dishes"}
                  </Button>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Cards below use <h3>; this keeps the outline h1 > h2 > h3. */}
          <h2 className="sr-only">All dishes</h2>

          {/* Result count, announced on change */}
          <p className="mb-5 text-sm text-muted" role="status" aria-live="polite">
            Showing{" "}
            <span className="font-semibold text-foreground">
              {results.length}
            </span>{" "}
            of {menuItems.length} dishes
          </p>

          {results.length > 0 ? (
            <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((item, index) => (
                <li key={item.id} className="h-full">
                  <MenuCard item={item} priority={index < 3} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="glass flex flex-col items-center rounded-[var(--radius-card)] px-6 py-16 text-center">
              <UtensilsCrossed
                className="size-8 text-subtle"
                aria-hidden="true"
              />
              <h2 className="mt-4 font-display text-xl font-semibold">
                Nothing matches that combination
              </h2>
              <p className="mt-2 max-w-sm text-sm text-muted">
                We cook well beyond what is listed here. Tell us what you need
                and we will build the menu around it.
              </p>
              <Button
                variant="secondary"
                className="mt-6"
                onClick={() => setState({ ...emptyFilters })}
              >
                <X aria-hidden="true" />
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SearchField({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}) {
  const id = React.useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="sr-only">
        Search the menu
      </label>
      <div className="relative">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle"
          aria-hidden="true"
        />
        <Input
          id={id}
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Search dishes..."
          className="pl-10"
        />
      </div>
    </div>
  );
}
