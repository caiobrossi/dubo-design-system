"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@dubo/design-system-shared/lib/icons";
import { cn } from "@dubo/design-system-shared/lib/utils";
import { useDesignSystemLabel } from "@dubo/design-system-shared/lib/labels";
import { modalTitleClass } from "@dubo/design-system-shared/components/ui/modal-typography";

/**
 * Dubo Design System -- Dialog (modal)
 *
 * Built on `@radix-ui/react-dialog` following shadcn/ui compound-component API.
 *
 * Size variants (DialogContent):
 *   sm      -- 384px  -- simple confirmations, small forms
 *   default -- 512px  -- standard dialogs
 *   lg      -- 672px  -- complex content, large forms
 *   xl      -- 768px  -- richer forms and patient-style workflows
 *
 * Sub-components:
 *   Dialog, DialogTrigger, DialogPortal, DialogClose,
 *   DialogOverlay, DialogContent, DialogHeader, DialogBody, DialogFooter,
 *   DialogTitle, DialogDescription
 *
 * Tokens used:
 * +------------------------------+-----------------------------------+
 * | Token / Primitive            | Usage                             |
 * +------------------------------+-----------------------------------+
 * | --color-bg-surface           | Dialog background                 |
 * | --overlay-bg                 | Overlay background                |
 * | --overlay-blur               | Overlay backdrop blur             |
 * | --color-text-primary         | Title text                        |
 * | --color-text-secondary       | Description text                  |
 * | --color-text-muted           | Close button icon                 |
 * | --color-hover                | Close button hover bg             |
 * | --shadow-lg                  | Dialog shadow                     |
 * | --focus-ring                 | Focus ring                        |
 * | --transition-fast            | Animation duration                |
 * | --radius-scale-3xl           | Dialog border-radius (32px)       |
 * +------------------------------+-----------------------------------+
 */

/* -- Root -- */
const Dialog = DialogPrimitive.Root;

/* -- Trigger -- */
const DialogTrigger = DialogPrimitive.Trigger;

/* -- Portal -- */
const DialogPortal = DialogPrimitive.Portal;

/* -- Close -- */
const DialogClose = DialogPrimitive.Close;

/* -- Overlay -- */
const DialogOverlay = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50",
      "bg-[var(--overlay-bg)] [backdrop-filter:var(--overlay-blur)]",
      "data-[state=open]:animate-overlayIn",
      "data-[state=closed]:animate-overlayOut",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = "DialogOverlay";

/* -- Content variants -- */
const dialogContentVariants = cva(
  [
    // Base styles
    "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
    "flex w-full max-h-[85vh] flex-col overflow-hidden",
    "pointer-events-auto",
    "bg-[var(--color-bg-surface)]",
    "rounded-[var(--radius-scale-3xl)]",
    "transform-gpu",
    "data-[state=open]:animate-modalIn",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "max-w-sm", // 384px -- simple confirmations, small forms
        default: "max-w-lg", // 512px -- standard dialogs
        lg: "max-w-2xl", // 672px -- complex content, large forms
        xl: "max-w-3xl", // 768px -- patient-style workflows
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

/* -- Content -- */
export interface DialogContentProps
  extends
    React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>,
    VariantProps<typeof dialogContentVariants> {
  /** Show the close button in the top-right corner */
  showCloseButton?: boolean;
  /** Allow overlays such as popovers and pickers to extend past the dialog frame */
  allowOverflow?: boolean;
}

const DialogContent = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  DialogContentProps
>(({ className, size, children, showCloseButton = true, allowOverflow = false, ...props }, ref) => {
  const closeLabel = useDesignSystemLabel("close");

  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          dialogContentVariants({ size }),
          allowOverflow ? "overflow-visible" : "overflow-hidden",
          "shadow-[var(--shadow-lg)]",
          className
        )}
        {...props}
      >
        <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-[inherit]">
          {children}
        </div>
        {showCloseButton ? (
          <DialogPrimitive.Close
            className={cn(
              "absolute right-4 top-4 z-20",
              "flex size-8 items-center justify-center rounded-full",
              "text-[color:var(--color-text-muted)]",
              "transition-colors duration-[var(--transition-fast)]",
              "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
              "disabled:pointer-events-none"
            )}
          >
            <X className="size-4" />
            <span className="sr-only">{closeLabel}</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});
DialogContent.displayName = "DialogContent";

/* -- Header -- */
const DialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sticky?: boolean; bordered?: boolean }
>(({ className, sticky = false, bordered = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex shrink-0 flex-col gap-1.5 bg-[var(--color-bg-surface)] px-4 py-4 text-center sm:text-left",
      bordered && "border-b border-[var(--color-border)]",
      sticky && "sticky top-0 z-10",
      className
    )}
    {...props}
  />
));
DialogHeader.displayName = "DialogHeader";

/* -- Body -- */
const DialogBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { scrollable?: boolean }
>(({ className, scrollable = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "min-h-0 flex-1 bg-transparent px-6 py-6",
      scrollable && "overflow-y-auto",
      className
    )}
    {...props}
  />
));
DialogBody.displayName = "DialogBody";

/* -- Footer -- */
const DialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { sticky?: boolean; bordered?: boolean }
>(({ className, sticky = false, bordered = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex shrink-0 flex-col-reverse gap-2 bg-[var(--color-bg-surface)] px-4 py-4 sm:flex-row sm:justify-end",
      bordered && "border-t border-[var(--color-border)]",
      sticky && "sticky bottom-0 z-10",
      className
    )}
    {...props}
  />
));
DialogFooter.displayName = "DialogFooter";

/* -- Title -- */
const DialogTitle = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={cn(modalTitleClass, className)} {...props} />
));
DialogTitle.displayName = "DialogTitle";

/* -- Description -- */
const DialogDescription = React.forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn(
      "text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]",
      className
    )}
    {...props}
  />
));
DialogDescription.displayName = "DialogDescription";

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  dialogContentVariants,
};
