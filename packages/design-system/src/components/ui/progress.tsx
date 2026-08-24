"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";

/**
 * Dubo Design System — Progress
 *
 * Linear progress bar with animated fill.
 *
 * Variants:
 * - default — brand color fill (--color-brand)
 * - success — green fill (--color-success)
 * - warning — amber fill (--color-warning)
 * - danger  — red fill (--color-danger)
 * - brand   — same as default (--color-brand)
 *
 * Sizes: sm (4px), default (8px), lg (12px)
 *
 * Features:
 * - Animated fill transition (--transition-fast)
 * - Indeterminate mode (CSS animation shimmer)
 * - Optional label and percentage display
 * - Full pill radius via --radius-control-pill
 *
 * Tokens used:
 * - --color-brand, --color-success, --color-warning, --color-danger (fill colors)
 * - --color-bg-subtle (track bg)
 * - --color-text-primary, --color-text-secondary (label/percentage text)
 * - --transition-fast (fill animation duration)
 * - --radius-control-pill (track + fill border radius)
 */

const progressTrackVariants = cva(
  [
    "relative w-full overflow-hidden",
    "rounded-[var(--radius-control-pill)]",
    "bg-[var(--color-bg-subtle)]",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-1",
        default: "h-2",
        lg: "h-3",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const progressFillVariants = cva(
  [
    "h-full rounded-[var(--radius-control-pill)]",
    "transition-all duration-[var(--transition-fast)] ease-out",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-[var(--color-brand)]",
        brand: "bg-[var(--color-brand)]",
        success: "bg-[var(--color-success)]",
        warning: "bg-[var(--color-warning)]",
        danger: "bg-[var(--color-danger)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface ProgressProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressTrackVariants>,
    VariantProps<typeof progressFillVariants> {
  /** Progress value from 0 to 100 */
  value?: number;
  /** Maximum value (default 100) */
  max?: number;
  /** Show indeterminate animation (overrides value) */
  indeterminate?: boolean;
  /** Show label text above the bar */
  label?: string;
  /** Show percentage text */
  showPercentage?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant,
      size,
      indeterminate = false,
      label,
      showPercentage = false,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div ref={ref} className={cn("flex w-full flex-col gap-1.5", className)} {...props}>
        {(label || showPercentage) && (
          <div className="flex items-center justify-between">
            {label && (
              <span className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
                {label}
              </span>
            )}
            {showPercentage && (
              <span className="text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}
        <div
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label ?? "Progress"}
          className={progressTrackVariants({ size })}
        >
          <div
            className={cn(
              progressFillVariants({ variant }),
              indeterminate && "animate-progress-indeterminate w-1/2"
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = "Progress";

export { Progress, progressTrackVariants, progressFillVariants };
