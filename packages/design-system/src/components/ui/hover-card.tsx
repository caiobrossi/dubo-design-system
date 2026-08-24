"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — HoverCard
 *
 * Rich preview popup that appears on hover over a trigger element.
 * Built on Radix HoverCard primitive with frosted glass styling.
 *
 * Reuses shared overlay, glass, spacing, and surface tokens.
 *
 * Sub-components:
 * - HoverCard — root wrapper (openDelay, closeDelay)
 * - HoverCardTrigger — the element that triggers the popup on hover
 * - HoverCardContent — the floating popup content
 */

const HoverCard = HoverCardPrimitive.Root;

const HoverCardTrigger = HoverCardPrimitive.Trigger;

/* ── Content ── */
const HoverCardContent = React.forwardRef<
  React.ComponentRef<typeof HoverCardPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof HoverCardPrimitive.Content> & {
    /** Use frosted glass effect instead of solid background */
    glass?: boolean;
  }
>(({ className, align = "center", sideOffset = 6, glass = false, ...props }, ref) => (
  <HoverCardPrimitive.Portal>
    <HoverCardPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-80 overflow-hidden",
        "rounded-[var(--radius-scale-xl)]",
        "p-[var(--space-5)]",
        "shadow-[var(--shadow-lg)]",
        "outline-none",
        /* Animation */
        "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
        "data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2",
        "data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2",
        /* Variant: solid or glass */
        glass
          ? [
              "bg-[var(--glass-bg-light)]",
              "border-[0.5px] border-[var(--glass-border-light)]",
              "[backdrop-filter:var(--glass-blur-md)_var(--glass-saturate)]",
            ].join(" ")
          : ["bg-[var(--color-bg-surface)]", "border border-[var(--color-border)]"].join(" "),
        className
      )}
      {...props}
    />
  </HoverCardPrimitive.Portal>
));
HoverCardContent.displayName = "HoverCardContent";

export { HoverCard, HoverCardTrigger, HoverCardContent };
