"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig, telHref } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer whenever navigation completes.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "glass-strong border-b border-line py-2"
          : "border-b border-transparent py-4",
      )}
    >
      <div className="container-page flex items-center justify-between gap-4">
        <Link
          href="/"
          className="rounded-lg transition-opacity hover:opacity-85"
          aria-label={`${siteConfig.name} - home`}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-saffron"
                      : "text-muted hover:text-foreground",
                  )}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-4 -bottom-0.5 h-px bg-saffron"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            asChild
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex lg:hidden xl:inline-flex"
          >
            <a href={telHref}>
              <Phone aria-hidden="true" />
              <span className="hidden xl:inline">
                {siteConfig.contact.phoneDisplay}
              </span>
              <span className="xl:hidden">Call</span>
            </a>
          </Button>

          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/contact">Get a quote</Link>
          </Button>

          {/* Mobile navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation menu"
              >
                <Menu aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-6">
              <SheetTitle className="mb-6">
                <Logo />
              </SheetTitle>
              <nav aria-label="Mobile">
                <ul className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <SheetClose asChild>
                        <Link
                          href={link.href}
                          aria-current={isActive(link.href) ? "page" : undefined}
                          className={cn(
                            "block rounded-xl px-4 py-3 text-base font-medium transition-colors",
                            isActive(link.href)
                              ? "bg-saffron/12 text-saffron"
                              : "text-muted hover:bg-surface-2 hover:text-foreground",
                          )}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-8 flex flex-col gap-3">
                <Button asChild>
                  <Link href="/contact">Get a quote</Link>
                </Button>
                <Button asChild variant="outline">
                  <a href={telHref}>
                    <Phone aria-hidden="true" />
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
