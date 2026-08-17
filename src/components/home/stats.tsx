import { CalendarCheck, HandPlatter, Leaf, ThermometerSnowflake } from "lucide-react";

import { Counter } from "@/components/motion/counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { stats } from "@/data/about";

const reasons = [
  {
    icon: Leaf,
    title: "A genuinely vegetarian kitchen",
    description:
      "No meat, fish or egg has ever entered our premises. Jain, vegan and no-onion-garlic menus are cooked on separate stoves with separate utensils.",
  },
  {
    icon: CalendarCheck,
    title: "We finish when we said we would",
    description:
      "Service starts at the time on the contract. Sixteen years of muhurat timings have taught us what happens when a caterer runs late.",
  },
  {
    icon: ThermometerSnowflake,
    title: "Cold chain that actually holds",
    description:
      "Refrigerated transport for dairy, chutneys and cut vegetables, held below 5°C right up to the moment service begins.",
  },
  {
    icon: HandPlatter,
    title: "Staffed properly, not thinly",
    description:
      "One server for every 15–40 guests depending on your tier. Nobody should have to hunt for a second helping at their own function.",
  },
];

export function Stats() {
  return (
    <section className="section-y" aria-labelledby="why-heading">
      <div className="container-page">
        {/* Counters */}
        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <div className="text-center lg:text-left">
                <p className="font-display text-4xl font-semibold tracking-tight text-gradient-marigold sm:text-5xl">
                  <Counter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </p>
                <p className="mt-2 text-sm text-muted">{stat.label}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <div className="mt-20">
          <SectionHeading
            eyebrow="Why choose us"
            title={
              <span id="why-heading">
                The unglamorous things that decide the day
              </span>
            }
            description="Anybody can photograph a buffet. These are the parts you only notice when they go wrong."
          />

          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {reasons.map(({ icon: Icon, title, description }) => (
              <StaggerItem key={title} className="h-full">
                <div className="glass flex h-full gap-4 rounded-[var(--radius-card)] p-6">
                  <span
                    aria-hidden="true"
                    className="grid size-11 shrink-0 place-items-center rounded-xl border border-saffron/25 bg-saffron/10 text-saffron"
                  >
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 text-center text-sm text-subtle">
            FSSAI licensed · Pure vegetarian · Serving all of Pune district
          </p>
        </Reveal>
      </div>
    </section>
  );
}
