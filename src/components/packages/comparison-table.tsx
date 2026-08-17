import { Check, Minus } from "lucide-react";

import { comparisonRows, packageTiers } from "@/data/packages";
import { formatRupees } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Two presentations of the same data.
 *
 * Below `lg` the tiers stack into cards. The obvious alternative - one wide
 * table in a horizontal scroller - was tried and rejected: a `min-width` wide
 * enough for three tiers expands the mobile layout viewport (Chrome sizes the
 * layout viewport to overflowing content), which drags every `position: fixed`
 * element out with it and breaks the sticky CTA bar. Stacking also just reads
 * better than panning a 672px table on a 360px phone.
 *
 * From `lg` up there is room for the real side-by-side comparison.
 */
export function ComparisonTable() {
  return (
    <>
      <div className="grid gap-5 sm:grid-cols-2 lg:hidden">
        {packageTiers.map((tier) => (
          <article
            key={tier.id}
            className={cn(
              "rounded-[var(--radius-card)] p-5",
              tier.popular ? "glass-strong border-saffron/40" : "glass",
            )}
          >
            <header className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
              <h3
                className={cn(
                  "font-display text-lg font-semibold",
                  tier.popular && "text-saffron",
                )}
              >
                {tier.name}
              </h3>
              <p className="text-sm text-muted">
                {formatRupees(tier.pricePerPlate)}
                <span className="text-xs"> / plate</span>
              </p>
            </header>

            <dl className="mt-4 space-y-2.5">
              {comparisonRows.map((row) => {
                const value = tier.features[row.id];
                return (
                  <div
                    key={row.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <dt className="text-muted">{row.label}</dt>
                    <dd className="shrink-0 text-right font-medium text-foreground/90">
                      {typeof value === "boolean" ? (
                        value ? (
                          <>
                            <Check
                              className="inline size-4 text-success"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Included</span>
                          </>
                        ) : (
                          <>
                            <Minus
                              className="inline size-4 text-subtle"
                              aria-hidden="true"
                            />
                            <span className="sr-only">Not included</span>
                          </>
                        )
                      ) : (
                        (value ?? "—")
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="glass overflow-hidden rounded-[var(--radius-card)]">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              What each package includes, compared side by side
            </caption>
            <thead>
              <tr className="border-b border-line">
                <th
                  scope="col"
                  className="w-2/5 px-5 py-4 text-left font-display text-sm font-semibold"
                >
                  What&apos;s included
                </th>
                {packageTiers.map((tier) => (
                  <th
                    key={tier.id}
                    scope="col"
                    className={cn(
                      "px-5 py-4 text-left font-display text-sm font-semibold",
                      tier.popular && "text-saffron",
                    )}
                  >
                    {tier.name}
                    <span className="mt-0.5 block text-xs font-normal text-muted">
                      {formatRupees(tier.pricePerPlate)} / plate
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr
                  key={row.id}
                  className={cn(
                    "border-b border-line/60",
                    index % 2 === 1 && "bg-surface/40",
                  )}
                >
                  <th
                    scope="row"
                    className="px-5 py-3.5 text-left font-normal text-muted"
                  >
                    {row.label}
                  </th>
                  {packageTiers.map((tier) => {
                    const value = tier.features[row.id];
                    return (
                      <td
                        key={tier.id}
                        className="px-5 py-3.5 text-foreground/90"
                      >
                        {typeof value === "boolean" ? (
                          value ? (
                            <>
                              <Check
                                className="size-4 text-success"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Included</span>
                            </>
                          ) : (
                            <>
                              <Minus
                                className="size-4 text-subtle"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Not included</span>
                            </>
                          )
                        ) : (
                          (value ?? "—")
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
