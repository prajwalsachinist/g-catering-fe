import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Star, UtensilsCrossed } from "lucide-react";

import { ParticleField } from "@/components/home/particle-field";
import { Magnetic } from "@/components/motion/magnetic";
import { Parallax } from "@/components/motion/parallax";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";

const trustPoints = [
  { icon: ShieldCheck, label: "FSSAI licensed kitchen" },
  { icon: UtensilsCrossed, label: "Pure vegetarian" },
  { icon: Star, label: "1,200+ events served" },
];

export function Hero() {
  return (
    <section className="relative isolate grain overflow-hidden pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-24">
      {/* Ambient layers - all decorative */}
      <div
        aria-hidden="true"
        className="glow-marigold absolute inset-x-0 top-0 h-[38rem]"
      />
      <ParticleField className="absolute inset-0 -z-10 h-full w-full" />

      <div className="container-page relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-saffron/30 bg-saffron/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-saffron-bright">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-saffron opacity-75" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-saffron" />
                </span>
                Serving Pune since {siteConfig.founded}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-display-lg leading-[0.95] tracking-[-0.035em]">
                The food everyone
                <br />
                <span className="text-gradient-marigold">remembers</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                Weddings, mangalkarya, vastu shanti and corporate events across
                Pune. Maharashtrian roots, a kitchen that has never handled
                meat, and a team that treats your timings as seriously as your
                menu.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
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
            </Reveal>

            <Reveal delay={0.32}>
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
            </Reveal>
          </div>

          {/* Imagery */}
          <div className="lg:col-span-5">
            <Reveal delay={0.2} className="relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <Parallax
                  distance={28}
                  className="overflow-hidden rounded-[1.75rem] border border-line"
                >
                  <Image
                    src="/images/hero/hero-fallback.svg"
                    alt="A Maharashtrian wedding thali laid out under warm evening lighting"
                    width={1600}
                    height={1000}
                    priority
                    sizes="(max-width: 1024px) 90vw, 40vw"
                    className="h-full w-full object-cover"
                  />
                </Parallax>

                {/* Floating stat card */}
                <div className="glass-strong absolute -bottom-6 -left-2 w-44 rounded-2xl p-4 sm:left-auto sm:-right-6 sm:w-52">
                  <p className="font-display text-3xl font-semibold text-saffron">
                    4.9
                    <span className="ml-1 align-super text-sm text-muted">
                      /5
                    </span>
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    Average rating across 1,200+ events in Pune
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
