import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { MenuCard } from "@/components/menu/menu-card";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { featuredMenuItems } from "@/data/menu";

export function MenuPreview() {
  const preview = featuredMenuItems.slice(0, 6);

  return (
    <section
      className="section-y bg-surface/30"
      aria-labelledby="menu-preview-heading"
    >
      <div className="container-page">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="From the kitchen"
            title={<span id="menu-preview-heading">A taste of the menu</span>}
            description="Forty-eight dishes across eight cuisines, every one of them vegetarian. Filter the full menu by diet, category or occasion."
            className="md:mb-0"
          />
          <Reveal delay={0.1}>
            <Button asChild variant="secondary" className="shrink-0">
              <Link href="/menu">
                See all 48 dishes
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <MenuCard item={item} />
            </StaggerItem>
          ))}
        </Stagger>

        {/* Category quick links */}
        <Reveal delay={0.15}>
          <ul className="mt-10 flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link
                  href={`/menu?category=${category.slug}`}
                  className="inline-flex items-center rounded-full border border-line-strong px-4 py-2 text-sm text-muted transition-colors hover:border-saffron hover:text-saffron"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
