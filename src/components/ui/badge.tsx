import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "border-line-strong bg-surface-2 text-muted",
        saffron: "border-saffron/40 bg-saffron/10 text-saffron-bright",
        outline: "border-line-strong text-muted",
        /* Diet badges. Each pairing is AA-compliant on the card surface. */
        veg: "border-success/40 bg-success/10 text-success",
        jain: "border-turmeric/40 bg-turmeric/10 text-turmeric",
        vegan: "border-success/30 bg-success/5 text-success",
        "no-onion-garlic": "border-kokum/50 bg-kokum/15 text-[#f0879f]",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
