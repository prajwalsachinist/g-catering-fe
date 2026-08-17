"use client";

import { Phone } from "lucide-react";

import { WhatsAppIcon } from "@/components/site/icons";
import {
  defaultWhatsappMessage,
  telHref,
  whatsappHref,
} from "@/lib/site-config";

/**
 * Fixed call/WhatsApp bar for small screens. The matching bottom padding is
 * applied to <main> in the root layout so the bar never covers page content.
 */
export function MobileCtaBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 lg:hidden print:hidden"
      // The bar duplicates links available in the footer; it is a shortcut,
      // not the only path to them.
      aria-label="Quick contact"
      role="region"
    >
      <div className="glass-strong border-t border-line pb-[env(safe-area-inset-bottom)]">
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
          <a
            href={telHref}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-line-strong text-sm font-semibold text-foreground transition-colors active:bg-surface-2"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call now
          </a>
          <a
            href={whatsappHref(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-marigold text-sm font-semibold text-ink transition-transform active:scale-[0.98]"
          >
            <WhatsAppIcon className="size-4" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
