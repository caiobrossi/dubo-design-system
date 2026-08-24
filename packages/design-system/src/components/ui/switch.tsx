"use client";

import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";
import { fieldBodyLgClass } from "@dubo/design-system-shared/components/ui/field-styles";

/**
 * Dubo Design System — Switch
 *
 * Built on @radix-ui/react-switch.
 * Toggle control with 3 sizes (sm, md, lg) matching track heights 16px, 20px, 24px.
 * Includes label and description support.
 *
 * Reuses shared heights, label roles, focus, and motion tokens.
 * Switch-specific tokens are limited to track widths, thumb widths, and the 3D shadow recipes.
 */

/* ── Track variants (cva) ── */

const switchTrackVariants = cva(
  [
    /* Base track */
    "group peer inline-flex shrink-0 cursor-pointer items-center justify-start overflow-hidden rounded-full",
    "px-[var(--switch-track-padding,2px)] py-[var(--switch-track-padding,2px)]",
    /* Unchecked bg — uses border-input color as muted bg */
    "bg-[var(--color-border-input,var(--color-border-strong,#d4d4d4))]",
    /* Transition */
    "transition-[background-color,justify-content] duration-[var(--transition-fast,200ms)]",
    "[transition-timing-function:var(--transition-easing,cubic-bezier(0.25,0.46,0.45,0.94))]",
    /* Focus */
    "focus-visible:outline-none focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring,#3b82f6)]",
    "focus-visible:ring-offset-[var(--focus-ring-offset,2px)]",
    /* Checked — green (success) matching Dubo switch */
    "data-[state=checked]:justify-end",
    "data-[state=checked]:bg-[var(--color-success,#16a34a)]",
    "data-[state=checked]:hover:bg-[var(--color-success,#16a34a)]",
    /* Disabled */
    "disabled:cursor-not-allowed",
    "disabled:opacity-[var(--disabled-opacity,0.4)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--size-4,16px)] w-[var(--switch-track-width-sm,28px)]",
        default: "h-[var(--size-5,20px)] w-[var(--switch-track-width-md,36px)]",
        lg: "h-[var(--size-6,24px)] w-[var(--switch-track-width-lg,51px)]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

/* ── Thumb variants (cva) ── */

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full",
    "bg-[var(--color-text-on-brand,#ffffff)]",
    "transition-all duration-[var(--transition-fast,200ms)]",
    "[transition-timing-function:var(--transition-easing,cubic-bezier(0.25,0.46,0.45,0.94))]",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--size-3,12px)] w-[var(--switch-thumb-w-sm,14px)]",
        default: "h-[var(--size-4,16px)] w-[var(--switch-thumb-w-md,18px)]",
        lg: "h-[var(--size-5,20px)] w-[var(--switch-thumb-w-lg,27px)]",
      },
    },
    defaultVariants: {
      size: "lg",
    },
  }
);

/* ── Switch component ── */

export interface SwitchProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>,
    VariantProps<typeof switchTrackVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitive.Root>, SwitchProps>(
  ({ className, size, label, description, id, disabled, ...props }, ref) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;
    const descriptionId = description ? `${switchId}-description` : undefined;

    const track = (
      <div className="relative inline-flex">
        <SwitchPrimitive.Root
          ref={ref}
          id={switchId}
          disabled={disabled}
          aria-describedby={descriptionId}
          className={cn(switchTrackVariants({ size }), className)}
          {...props}
        >
          <SwitchPrimitive.Thumb
            className={cn(switchThumbVariants({ size }))}
            style={{ boxShadow: "var(--switch-thumb-shadow)" }}
          />
        </SwitchPrimitive.Root>
        {/* Inner 3D shadow overlay — pointer-events-none so it doesn't block clicks */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{ boxShadow: "var(--switch-track-inner-shadow)" }}
        />
      </div>
    );

    if (!label && !description) return track;

    return (
      <div className="flex w-full items-start justify-between gap-[var(--space-3)]">
        <div className="flex flex-col gap-[var(--space-1)]">
          {label && (
            <label
              htmlFor={switchId}
              className={cn(
                "cursor-pointer select-none",
                fieldBodyLgClass,
                "text-[color:var(--color-text-primary)]",
                disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]"
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              id={descriptionId}
              className="text-body-sm [font-weight:var(--font-weight-400,400)] text-[color:var(--color-text-secondary)]"
            >
              {description}
            </p>
          )}
        </div>
        <div className="shrink-0 pt-[2px]">{track}</div>
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch, switchTrackVariants, switchThumbVariants };
