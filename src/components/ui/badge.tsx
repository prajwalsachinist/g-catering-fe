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
        /* Diet badges. The diet-* tokens carry theme-specific values so each
           label/chip pairing clears AA in both light and dark. */
        veg: "border-diet-veg/40 bg-diet-veg/10 text-diet-veg",
        jain: "border-diet-jain/40 bg-diet-jain/10 text-diet-jain",
        vegan: "border-diet-veg/30 bg-diet-veg/10 text-diet-veg",
        "no-onion-garlic": "border-diet-nog/50 bg-diet-nog/15 text-diet-nog",
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
