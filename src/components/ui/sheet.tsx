"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Sheet is a Dialog anchored to an edge. The `bottom` side is the mobile
 * filter surface on the menu and gallery pages; `right` drives the mobile
 * navigation drawer.
 */
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;
const SheetClose = DialogPrimitive.Close;

const SheetOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/70 backdrop-blur-sm data-[state=open]:anim-fade-in",
      className,
    )}
    {...props}
  />
));
SheetOverlay.displayName = "SheetOverlay";

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> {
  side?: "bottom" | "right";
}

const SheetContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  SheetContentProps
>(({ className, children, side = "bottom", ...props }, ref) => (
  <DialogPrimitive.Portal>
    <SheetOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed z-50 glass-strong shadow-2xl shadow-black/70",
        side === "bottom" && [
          "inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto",
          "rounded-t-3xl border-x-0 border-b-0",
          "pb-[max(1.5rem,env(safe-area-inset-bottom))]",
          "data-[state=open]:anim-sheet-up",
        ],
        side === "right" && [
          "inset-y-0 right-0 w-[min(22rem,85vw)] overflow-y-auto",
          "border-y-0 border-r-0",
          "data-[state=open]:anim-fade-in",
        ],
        className,
      )}
      {...props}
    >
      {side === "bottom" && (
        /* Grab handle - decorative, the close button below is the real control. */
        <div
          aria-hidden="true"
          className="sticky top-0 z-10 flex justify-center bg-transparent pt-3 pb-1"
        >
          <span className="h-1.5 w-10 rounded-full bg-line-strong" />
        </div>
      )}
      {children}
      <DialogPrimitive.Close
        className="absolute right-4 top-4 rounded-full p-2 text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
        aria-label="Close"
      >
        <X className="size-5" />
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
SheetContent.displayName = "SheetContent";

const SheetTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

const SheetDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
};
