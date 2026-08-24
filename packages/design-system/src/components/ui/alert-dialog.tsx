"use client";

/**
 * AlertDialog — Confirmation dialog for destructive actions and important decisions.
 *
 * Built on @radix-ui/react-alert-dialog. Blocks interaction until the user
 * confirms or cancels. NOT the same as Alert (inline notification).
 *
 * Sub-components:
 * - AlertDialog (root)
 * - AlertDialogTrigger
 * - AlertDialogPortal
 * - AlertDialogOverlay
 * - AlertDialogContent
 * - AlertDialogHeader
 * - AlertDialogFooter
 * - AlertDialogTitle
 * - AlertDialogDescription
 * - AlertDialogAction (uses buttonVariants destructive)
 * - AlertDialogCancel (uses buttonVariants outline)
 *
 * All styling values are provided via CSS design tokens.
 */

import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { modalTitleClass } from "@dubo/design-system-shared/components/ui/modal-typography";
import { cn } from "@dubo/design-system-shared/lib/utils";
import { buttonVariants } from "./button";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-50",
      "bg-[var(--overlay-bg)] [backdrop-filter:var(--overlay-blur)]",
      "data-[state=open]:animate-overlayIn",
      "data-[state=closed]:animate-overlayOut",
      className
    )}
    ref={ref}
    {...props}
  />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      className={cn(
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        "flex w-[calc(100vw-32px)] max-w-md flex-col gap-6 p-6",
        "bg-[var(--color-bg-surface)]",
        "rounded-[32px] transform-gpu",
        "data-[state=open]:animate-modalIn",
        className
      )}
      style={{ boxShadow: "var(--shadow-lg)" }}
      ref={ref}
      {...props}
    />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-2", className)} {...props} />
);
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end gap-3", className)}
    {...props}
  />
);
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title className={cn(modalTitleClass, className)} ref={ref} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    className={cn("text-body-lg text-[color:var(--color-text-secondary)]", className)}
    ref={ref}
    {...props}
  />
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Action
    className={cn(buttonVariants({ variant: "destructive" }), className)}
    ref={ref}
    {...props}
  />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Cancel
    className={cn(buttonVariants({ variant: "outline" }), className)}
    ref={ref}
    {...props}
  />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
