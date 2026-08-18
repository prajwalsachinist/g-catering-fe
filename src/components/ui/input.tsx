import * as React from "react";

import { cn } from "@/lib/utils";

const fieldBase = [
  // bg-[var(--panel-bg)] rather than bg-surface: --panel-bg is the token
  // that already tracks "readable content surface" per theme (translucent
  // dark in dark mode, solid white in light). --color-surface is tuned as a
  // warm decorative tan in light mode, which pushed the placeholder text
  // below AA when the two were mixed here.
  "w-full rounded-xl border border-line-strong bg-[var(--panel-bg)] px-4 py-3 text-sm text-foreground",
  "placeholder:text-subtle transition-colors duration-200",
  "hover:border-line-strong/80",
  "focus:border-saffron focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-[invalid=true]:border-danger",
  // Native date pickers follow the `color-scheme` set per theme on :root,
  // so nothing is hard-coded here.
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
