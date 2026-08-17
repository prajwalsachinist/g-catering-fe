import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase = [
  "w-full rounded-xl border border-line-strong bg-surface px-4 py-3 text-sm text-foreground",
  "placeholder:text-subtle transition-colors duration-200",
  "hover:border-line-strong/80",
  "focus:border-saffron focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-[invalid=true]:border-danger",
  // Native pickers render dark-on-dark in some browsers without this.
  "[color-scheme:dark]",
];

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type = "text", ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(fieldBase, "h-12", className)}
      {...props}
    />
  ),
);
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, rows = 4, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(fieldBase, "resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Input, Textarea, fieldBase };
