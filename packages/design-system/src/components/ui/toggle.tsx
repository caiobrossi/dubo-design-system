"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Toggle (Button)
 *
 * Built on @radix-ui/react-toggle.
 * Pill-shaped toggle button with pressed/active state.
 *
 * Variants: default (ghost-like) | outline (with border) | choice (answer/filter pill)
 * Sizes:    sm (32px) | default (40px) | lg (48px)
 * Shape:    pill (border-radius: 9999px)
 *
 * Uses shared control heights, spacing, label roles, and interaction tokens:
 *   --color-hover (hover bg)
 *   --color-pressed (active bg)
 *   --color-brand-subtle (pressed/on bg)
 *   --color-brand (pressed/on border/text)
 *   --color-text-on-brand (choice pressed text)
 *   --color-text-primary, --color-text-secondary (text)
 *   --color-border, --color-border-interactive (borders)
 *   --disabled-opacity (disabled state)
 *   --focus-ring, --focus-ring-offset (focus)
 *   --transition-fast, --transition-easing (animation)
 */

const toggleVariants = cva(
  [
    // Base
    "inline-flex items-center justify-center whitespace-nowrap select-none",
    "gap-[var(--space-2)]",
    "rounded-full" /* pill — 9999px */,
    "transition-all",
    "duration-[var(--transition-fast)]",
    "[transition-timing-function:var(--transition-easing)]",
    "[box-shadow:0px_1px_1px_0px_rgba(0,0,0,0.14),inset_0px_1px_1px_0px_rgba(255,255,255,0.22),inset_0px_-1px_1px_0px_rgba(0,0,0,0.06)]",
    "hover:scale-[1.02]",
    "active:scale-[0.98]",
    // Focus
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring)]",
    "focus-visible:ring-offset-[var(--focus-ring-offset)]",
    // Disabled
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
    // Icon sizing
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    "data-[state=on]:[box-shadow:0px_1px_1px_0px_rgba(0,0,0,0.16),inset_0px_1px_1px_0px_rgba(255,255,255,0.18),inset_0px_-1px_1px_0px_rgba(0,0,0,0.08),0_6px_18px_rgba(15,23,42,0.08)]",
    "disabled:hover:scale-100 disabled:active:scale-100",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-transparent",
          "text-[color:var(--color-text-secondary)]",
          "hover:bg-[var(--color-hover)]",
          "hover:text-[color:var(--color-text-primary)]",
          "active:bg-[var(--color-pressed)]",
        ].join(" "),
        outline: [
          "bg-transparent",
          "text-[color:var(--color-text-secondary)]",
          "border border-[var(--color-border)]",
          "hover:bg-[var(--color-hover)]",
          "hover:text-[color:var(--color-text-primary)]",
          "active:bg-[var(--color-pressed)]",
        ].join(" "),
        choice: [
          "border border-[var(--color-border-interactive)]",
          "bg-[var(--color-bg-subtle)]",
          "text-[color:var(--color-text-secondary)]",
          "hover:bg-[var(--color-hover)]",
          "data-[state=on]:border-[var(--color-brand)]",
          "data-[state=on]:bg-[var(--color-brand)]",
          "data-[state=on]:text-[color:var(--color-text-on-brand)]",
        ].join(" "),
      },
      size: {
        sm: "h-[var(--height-control-sm)] px-[var(--space-3)] text-body-sm [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-sm)]",
        default:
          "h-[var(--height-control-md)] px-[var(--space-4)] text-body-md [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-md)]",
        lg: "h-[var(--height-control-lg)] px-[var(--space-5)] text-body-md [font-weight:var(--font-weight-400)] [&_svg]:size-[var(--icon-size-lg)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ToggleProps
  extends
    React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
