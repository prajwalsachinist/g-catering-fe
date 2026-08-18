import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full",
    "font-medium",
    // Transform is listed explicitly so the press/lift animate on the
    // compositor rather than being lumped into `transition-all`.
    "transition-[transform,box-shadow,background-color,border-color,color,filter]",
    "duration-300 ease-[var(--ease-out-expo)]",
    // Tactile press. motion-safe so reduced-motion users get no scaling.
    "motion-safe:active:scale-[0.97]",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    // Icons follow the label's motion on hover.
    "[&_svg]:transition-transform [&_svg]:duration-300",
    // Focus ring is defined globally in globals.css; this keeps it clear of
    // the pill edge on filled variants.
    "focus-visible:outline-offset-4",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-marigold text-on-accent font-semibold",
          "shadow-[0_8px_30px_-8px_var(--color-saffron)]",
          "hover:shadow-[var(--btn-hover-shadow)] hover:brightness-[1.06]",
          "motion-safe:hover:-translate-y-0.5",
        ],
        secondary: [
          "glass text-foreground",
          "hover:border-saffron/45 hover:bg-surface-2",
          "motion-safe:hover:-translate-y-0.5",
        ],
        outline: [
          "border border-line-strong text-foreground",
          "hover:border-saffron hover:bg-saffron/8 hover:text-saffron",
          "motion-safe:hover:-translate-y-0.5",
        ],
        ghost: "text-muted hover:bg-surface-2 hover:text-foreground",
        link: "text-saffron underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm [&_svg]:size-4",
        md: "h-11 px-6 text-sm [&_svg]:size-4",
        lg: "h-13 px-8 text-base [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
