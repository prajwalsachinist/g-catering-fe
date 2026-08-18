import Link from "next/link";
import { Check, Star } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { packageTiers } from "@/data/packages";
import { formatRupees } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function PricingCards() {
  return (
    <Stagger className="grid gap-6 lg:grid-cols-3">
      {packageTiers.map((tier) => (
        <StaggerItem key={tier.id} className="h-full">
          <article
            className={cn(
              "card-lift relative flex h-full flex-col rounded-[var(--radius-card)] p-6 sm:p-8",
              tier.popular
                ? "glass-strong border-saffron/40 shadow-[0_24px_70px_-40px_var(--color-saffron)]"
                : "glass",
            )}
          >
            {tier.popular && (
              <Badge
                variant="saffron"
                className="absolute -top-3 left-6 border-saffron bg-gradient-marigold font-semibold text-on-accent"
              >
                <Star className="size-3 fill-current" aria-hidden="true" />
                Most booked
              </Badge>
            )}

            <h3 className="font-display text-2xl font-semibold">{tier.name}</h3>
            <p className="mt-1 text-sm text-saffron">{tier.tagline}</p>

            <p className="mt-6 flex items-baseline gap-1.5">
              <span className="font-display text-4xl font-semibold tracking-tight">
                {formatRupees(tier.pricePerPlate)}
              </span>
              <span className="text-sm text-muted">per plate</span>
            </p>
            <p className="mt-1.5 text-xs uppercase tracking-wider text-subtle">
              Minimum {tier.minGuests} guests · excl. 5% GST
            </p>

            <p className="mt-5 text-sm leading-relaxed text-muted">
              {tier.description}
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
              {tier.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-2.5 text-sm">
                  <Check
                    className="mt-0.5 size-4 shrink-0 text-saffron"
                    aria-hidden="true"
                  />
                  <span className="text-foreground/90">{highlight}</span>
                </li>
              ))}
            </ul>

            <Button
              asChild
              className="mt-8 w-full"
              variant={tier.popular ? "primary" : "secondary"}
              size="lg"
            >
              <Link href={`/contact?package=${tier.id}`}>
                Enquire about {tier.name}
              </Link>
            </Button>
          </article>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
