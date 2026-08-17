import Link from "next/link";
import { ArrowLeft, UtensilsCrossed } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navLinks } from "@/lib/site-config";

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[70dvh] items-center overflow-hidden">
      <div
        aria-hidden="true"
        className="glow-marigold absolute inset-x-0 top-0 h-96"
      />
      <div className="container-page relative py-24 text-center">
        <UtensilsCrossed
          className="mx-auto size-10 text-saffron/70"
          aria-hidden="true"
        />
        <p className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.2em] text-saffron">
          404
        </p>
        <h1 className="mt-4 text-display leading-[1.02] tracking-[-0.03em]">
          This dish is not on the menu
        </h1>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted">
          The page you were looking for has moved or never existed. The kitchen
          is still open, though.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft aria-hidden="true" />
              Back to home
            </Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/menu">Browse the menu</Link>
          </Button>
        </div>

        <nav aria-label="Site pages" className="mt-12">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted underline-offset-4 transition-colors hover:text-saffron hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
