import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { FadeUp } from "@/components/motion/fade-up";

interface PageHeroProps {
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  /** Visible breadcrumb; mirrors the BreadcrumbList JSON-LD on each page. */
  crumb: string;
  children?: React.ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  crumb,
  children,
}: PageHeroProps) {
  return (
    <section className="relative isolate grain overflow-hidden pt-28 pb-12 sm:pt-32 lg:pt-36 lg:pb-16">
      <div
        aria-hidden="true"
        className="glow-marigold absolute inset-x-0 top-0 h-96"
      />

      <div className="container-page relative">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-1.5 text-sm text-subtle">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-saffron"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3.5" />
            </li>
            <li aria-current="page" className="text-muted">
              {crumb}
            </li>
          </ol>
        </nav>

        <FadeUp className="mt-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron">
            {eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl text-display leading-[1.0] tracking-[-0.03em]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </FadeUp>

        {children}
      </div>
    </section>
  );
}
