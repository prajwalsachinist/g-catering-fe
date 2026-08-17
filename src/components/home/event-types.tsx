import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Briefcase,
  Cake,
  Home,
  Landmark,
  Sparkles,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { eventTypes } from "@/data/categories";
import type { EventType } from "@/types";

const iconMap: Record<EventType["icon"], LucideIcon> = {
  wedding: Heart,
  temple: Landmark,
  home: Home,
  briefcase: Briefcase,
  cake: Cake,
  sparkles: Sparkles,
};

export function EventTypes() {
  return (
    <section className="section-y" aria-labelledby="occasions-heading">
      <div className="container-page">
        <SectionHeading
          eyebrow="What we cater"
          title={
            <span id="occasions-heading">
              Every occasion has its own rhythm
            </span>
          }
          description="A 1,500-guest wedding and a twenty-person housewarming need completely different things from a kitchen. We plan for both the same way."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {eventTypes.map((event) => {
            const Icon = iconMap[event.icon];
            return (
              <StaggerItem key={event.slug} className="h-full">
                <Link
                  href={`/menu?event=${event.slug}`}
                  className="group glass relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:border-saffron/35"
                >
                  <div className="relative h-44 overflow-hidden bg-surface-2">
                    <Image
                      src={event.image}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="media-fade absolute inset-0"
                    />
                    <span
                      aria-hidden="true"
                      className="media-chip absolute left-5 top-5 grid size-10 place-items-center rounded-full text-saffron"
                    >
                      <Icon className="size-5" />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5 pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-xl font-semibold leading-tight">
                          {event.name}
                        </h3>
                        <p
                          lang="mr"
                          className="mt-0.5 text-sm text-saffron"
                          aria-hidden="true"
                        >
                          {event.nameMarathi}
                        </p>
                      </div>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-5 shrink-0 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-saffron"
                      />
                    </div>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {event.description}
                    </p>

                    <p className="mt-4 border-t border-line pt-3 text-xs font-medium uppercase tracking-wider text-subtle">
                      {event.guestRange}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
