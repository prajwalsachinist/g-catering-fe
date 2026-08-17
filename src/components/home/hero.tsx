import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, UtensilsCrossed } from "lucide-react";

import { DishOrbit } from "@/components/home/dish-orbit";
import { FadeUp } from "@/components/motion/fade-up";
import { Magnetic } from "@/components/motion/magnetic";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const trustPoints = [
  { icon: ShieldCheck, label: "FSSAI licensed kitchen" },
  { icon: UtensilsCrossed, label: "Pure vegetarian" },
  // Carries the rating that used to sit on a floating card over the hero.
  { icon: Star, label: "4.9/5 across 1,200+ events" },
];

export function Hero() {
  return (
    <section className="relative isolate grain overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Ambient layer - decorative */}
      <div
        aria-hidden="true"
        className="glow-marigold absolute inset-x-0 top-0 h-[38rem]"
      />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <FadeUp>
              <p className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-saffron-bright">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-saffron opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-saffron" />
                </span>
                Serving Pune since {siteConfig.founded}
              </p>
            </FadeUp>

            {/* delay 0 on the h1: it is the LCP element. */}
            <FadeUp>
              <h1 className="mt-6 text-display-lg leading-[0.95] tracking-[-0.035em]">
                The food everyone
                <br />
                <span className="text-gradient-marigold">remembers</span>
              </h1>
            </FadeUp>

            <FadeUp delay={120}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Weddings, mangalkarya, vastu shanti and corporate events across
                Pune. Maharashtrian roots, a kitchen that has never handled
                meat, and a team that treats your timings as seriously as your
                menu.
              </p>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Magnetic>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">
                      Plan your event
                      <ArrowRight aria-hidden="true" />
                    </Link>
                  </Button>
                </Magnetic>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  <Link href="/menu">Explore the menu</Link>
                </Button>
              </div>
            </FadeUp>

            <FadeUp delay={280}>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                {trustPoints.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-sm text-subtle"
                  >
                    <Icon
                      className="size-4 text-saffron/80"
                      aria-hidden="true"
                    />
                    {label}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>

          {/* Imagery */}
          <div className="lg:col-span-5">
            <FadeUp delay={160}>
              <DishOrbit />
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
