"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";

/**
 * Dubo Design System — Alert (v2)
 *
 * Grid-based alert component inspired by ReUI patterns.
 * Composable sub-components: Alert, AlertTitle, AlertDescription, AlertAction.
 *
 * Variants: default | destructive | info | success | warning | invert
 *
 * Key changes from v1:
 * - CSS Grid layout with automatic icon column detection
 * - data-slot selectors instead of data-alert-* attributes
 * - Removed AlertIcon sub-component — pass any icon as direct child of Alert
 * - Removed border-left accent style — uses subtle bg + border per variant
 * - onClose moved out — use AlertAction with a close button for flexibility
 * - Supports responsive action placement (stacks on mobile, inline on sm+)
 */

const ALERT_TOKEN_FAMILIES = {
  destructive: "danger",
  info: "info1",
  success: "success",
  warning: "warning",
} as const;

const alertVariants = cva(
  [
    "relative w-full text-body-md",
    "border",
    "rounded-[var(--radius-control-soft)]",
    "px-[var(--space-4)] py-[var(--space-3)]",
    "grid gap-y-[var(--space-1)]",
    "grid-cols-[0_1fr]",
    "has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr]",
    "has-[>svg]:gap-x-[var(--space-3)]",
    "items-center",
    "[&>svg:not([class*=size-])]:size-[var(--icon-size-lg)]",
    // When both title AND description are present, align top + shift icon down
    "has-[>[data-slot=alert-title]+[data-slot=alert-description]]:items-start",
    "has-[>[data-slot=alert-title]+[data-slot=alert-description]]:[&_svg]:translate-y-0.5",
    // Action column placement when title+description exist
    "has-[>[data-slot=alert-title]+[data-slot=alert-description]]:[&_[data-slot=alert-action]]:sm:row-end-3",
    "transition-all duration-[var(--transition-fast)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-[var(--color-bg-surface)]",
          "border-[var(--color-border)]",
          "text-[color:var(--color-text-primary)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--color-text-secondary)]",
        ].join(" "),
        destructive: [
          "[&>svg]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-title]]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--alert-tone)]",
        ].join(" "),
        info: [
          "[&>svg]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-title]]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--alert-tone)]",
        ].join(" "),
        success: [
          "[&>svg]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-title]]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--alert-tone)]",
        ].join(" "),
        warning: [
          "[&>svg]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-title]]:text-[color:var(--alert-tone)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--alert-tone)]",
        ].join(" "),
        invert: [
          "bg-[var(--color-bg-inverted)]",
          "border-[var(--color-bg-inverted)]",
          "text-[color:var(--color-on-dark)]",
          "[&_[data-slot=alert-description]]:text-[color:var(--color-on-dark)]/70",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function getAlertVisualStyles(
  variant: NonNullable<AlertProps["variant"]>
): React.CSSProperties | undefined {
  if (variant === "default" || variant === "invert") {
    return undefined;
  }

  const family = ALERT_TOKEN_FAMILIES[variant];
  const bgToken = `var(--badge-${family}-soft-bg)`;
  const borderToken = `var(--badge-${family}-soft-border)`;
  const textToken = `var(--badge-${family}-soft-text)`;

  return {
    backgroundColor: bgToken,
    borderColor: borderToken,
    borderWidth: "0.5px",
    color: textToken,
    boxShadow: `0px 1px 2px 0px rgb(0 0 0 / 0.05), inset 0px 0px 0px 0.5px ${borderToken}`,
    ["--alert-tone" as string]: textToken,
  };
}

// ── Alert (root) ──

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", style, ...props }, ref) => {
    const resolvedVariant = variant ?? "default";
    const visualStyles = getAlertVisualStyles(resolvedVariant);

    return (
      <div
        ref={ref}
        data-slot="alert"
        role="alert"
        className={cn(alertVariants({ variant: resolvedVariant }), className)}
        style={{ ...visualStyles, ...style }}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

// ── AlertTitle ──

const AlertTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-1 min-h-4",
        "text-body-md",
        "[font-weight:var(--font-weight-600)]",
        "tracking-tight",
        className
      )}
      {...props}
    />
  )
);
AlertTitle.displayName = "AlertTitle";

// ── AlertDescription ──

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(
        "col-start-2 grid justify-items-start gap-[var(--space-1)]",
        "text-body-md",
        "[font-weight:var(--font-weight-400)]",
        className
      )}
      {...props}
    />
  )
);
AlertDescription.displayName = "AlertDescription";

// ── AlertAction ──

const AlertAction = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      data-slot="alert-action"
      className={cn(
        "flex gap-[var(--space-2)]",
        "max-sm:col-start-2 max-sm:mt-[var(--space-2)] max-sm:justify-start",
        "sm:col-start-3 sm:row-start-1 sm:justify-end sm:self-center",
        className
      )}
      {...props}
    />
  )
);
AlertAction.displayName = "AlertAction";

export { Alert, AlertTitle, AlertDescription, AlertAction, alertVariants };
