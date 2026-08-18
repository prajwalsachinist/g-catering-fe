import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";

import { Timeline } from "@/components/about/timeline";
import { Counter } from "@/components/motion/counter";
import { Parallax } from "@/components/motion/parallax";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { hygienePoints, stats, team } from "@/data/about";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Ganesh Catering started in 2009 with one tempo and two burners in Wadgaon Budruk. Sixteen years, 1,200 events and an FSSAI-licensed pure vegetarian kitchen later, the founder still tastes the dal.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Ganesh Catering",
    description:
      "From neighbourhood pujas in 2009 to 1,200 events across Pune — and a kitchen that has never handled meat.",
    url: "/about",
  },
};

const kitchenPhotos = [
  {
    src: "/images/about/kitchen-01.jpg",
    alt: "Hands kneading dough during morning preparation",
    caption: "Prep starts at four in the morning",
  },
  {
    src: "/images/about/kitchen-02.jpg",
    alt: "Whole and ground spices laid out on a wooden surface",
    caption: "Goda masala, roasted and ground in-house",
  },
  {
    src: "/images/about/kitchen-03.jpg",
    alt: "A warmly lit dining room set with tables",
    caption: "Set down before the first guest arrives",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumb="About"
        eyebrow={`Serving Pune since ${siteConfig.founded}`}
        title={
          <>
            One tempo, two burners, and a{" "}
            <span className="text-gradient-marigold">reputation</span> to build
          </>
        }
        description="Ganesh Catering has never advertised. Every wedding we cook for came from somebody who ate at the last one — which is a lovely way to grow, and a terrifying way to run a kitchen."
      />

      {/* Story */}
      <section className="pb-4" aria-labelledby="story-heading">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <h2 id="story-heading" className="sr-only">
                  Our story
                </h2>
                <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
                  <p>
                    In 2009 Ganesh Shinde was cooking satyanarayan puja meals
                    out of a rented kitchen in Wadgaon Budruk, carrying forty
                    plates up three floors by hand because the building had no
                    lift. His wife Sunita took the bookings on a phone that sat
                    on the windowsill for signal.
                  </p>
                  <p>
                    The food was the same food we serve now: Maharashtrian,
                    vegetarian, cooked the way it is cooked at home rather than
                    the way it photographs. What changed was everything around
                    it — a licensed commissary in 2015, cold-chain transport,
                    live counters, a second production unit for the IT campuses.
                  </p>
                  <p className="text-foreground/90">
                    What did not change: Ganesh still tastes the amti before it
                    leaves the kitchen, and we still turn down bookings we
                    cannot staff properly. Some things do not scale, and should
                    not.
                  </p>
                </div>
              </Reveal>

              <Stagger className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <StaggerItem key={stat.label}>
                    <p className="font-display text-3xl font-semibold text-gradient-marigold">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-xs leading-snug text-muted">
                      {stat.label}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {/* Kitchen photos */}
            <div className="lg:col-span-5">
              <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {kitchenPhotos.map((photo, index) => (
                  <StaggerItem key={photo.src}>
                    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line">
                      <Parallax distance={index === 1 ? 18 : 10}>
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          width={1200}
                          height={800}
                          loading="lazy"
                          sizes="(max-width: 1024px) 50vw, 30vw"
                          className="h-48 w-full object-cover sm:h-52"
                        />
                      </Parallax>
                      <figcaption className="bg-surface px-4 py-3 text-xs text-muted">
                        {photo.caption}
                      </figcaption>
                    </figure>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-y" aria-labelledby="timeline-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="How we got here"
            title={<span id="timeline-heading">Sixteen years, briefly</span>}
            description="The short version, including the year that nearly ended it."
          />
          <Timeline />
        </div>
      </section>

      {/* Team */}
      <section
        className="section-y warm-wash"
        aria-labelledby="team-heading"
      >
        <div className="container-page">
          <SectionHeading
            eyebrow="The kitchen"
            title={<span id="team-heading">Who actually cooks your food</span>}
            description="Four of the twenty-six people who will be at your event. The rest are just as particular."
          />

          <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <StaggerItem key={member.id} className="h-full">
                <article className="glass card-lift h-full overflow-hidden rounded-[var(--radius-card)]">
                  <div className="card-media relative aspect-4/5">
                    <Image
                      src={member.image}
                      alt=""
                      fill
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="bg-surface-2 object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-saffron">
                      {member.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {member.bio}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Hygiene & credentials */}
      <section className="section-y warm-wash" aria-labelledby="hygiene-heading">
        <div className="container-page">
          <SectionHeading
            eyebrow="Hygiene & credentials"
            title={
              <span id="hygiene-heading">
                The part nobody asks about until it goes wrong
              </span>
            }
            description="Food safety is not a selling point, it is the baseline. Here is exactly how we hold it."
          />

          <Reveal delay={0.08}>
            <div className="mt-10 flex flex-col gap-4 rounded-[var(--radius-card)] border border-saffron/25 bg-saffron/[0.06] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid size-12 shrink-0 place-items-center rounded-xl bg-saffron/15 text-saffron"
                >
                  <BadgeCheck className="size-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold">
                    FSSAI Licence {siteConfig.credentials.fssai}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">
                    Renewed annually · displayed at both production units ·
                    available for inspection
                  </p>
                </div>
              </div>
              <ShieldCheck
                className="hidden size-8 shrink-0 text-saffron/40 sm:block"
                aria-hidden="true"
              />
            </div>
          </Reveal>

          <Stagger className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hygienePoints.map((point) => (
              <StaggerItem key={point.title} className="h-full">
                <div className="glass h-full rounded-[var(--radius-card)] p-6">
                  <h3 className="font-display text-base font-semibold">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {point.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <div className="mt-12 text-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Talk to us about your event
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd([{ name: "About", path: "/about" }])} />
    </>
  );
}
