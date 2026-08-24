"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";

/**
 * Dubo Design System — Spinner
 *
 * Sizes: sm (16px) | default (24px) | lg (32px) | xl (40px)
 * Colors: default (--color-text-muted) | brand (--color-brand) | inherit (currentColor)
 *
 * CSS-only wave bars loader.
 * All visual properties driven by design tokens.
 */

const spinnerVariants = cva(
  ["inline-flex shrink-0 items-center justify-center align-middle", "gap-[max(1px,6.25%)]"].join(
    " "
  ),
  {
    variants: {
      size: {
        sm: "h-[var(--size-4)] w-[calc(var(--size-4)*1.1875)]",
        default: "h-[var(--size-6)] w-[calc(var(--size-6)*1.1875)]",
        lg: "h-[var(--size-8)] w-[calc(var(--size-8)*1.1875)]",
        xl: "h-[var(--size-10)] w-[calc(var(--size-10)*1.1875)]",
      },
      color: {
        default: "text-[color:var(--color-text-muted)]",
        brand: "text-[color:var(--color-brand)]",
        inherit: "text-current",
      },
    },
    defaultVariants: {
      size: "default",
      color: "default",
    },
  }
);

const spinnerKeyframes = `
.dubo-wave-bar {
  animation: dubo-wave-bars 1s ease-in-out infinite;
  background: currentColor;
  border-radius: 999px;
  display: block;
  flex: 1 1 0;
  height: 25%;
  min-width: 1px;
  will-change: height;
}

@keyframes dubo-wave-bars {
  0%,
  100% {
    height: 25%;
  }

  50% {
    height: 75%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .dubo-wave-bar {
    animation: none !important;
    height: var(--dubo-spinner-reduced-height, 50%);
    opacity: 0.72;
  }
}
`;

const WAVE_BAR_REDUCED_HEIGHTS = ["35%", "55%", "75%", "55%", "35%"] as const;

export interface SpinnerProps
  extends
    Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof spinnerVariants> {
  /** Accessible label for screen readers */
  label?: string;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, color, label = "Loading", style, ...props }, ref) => {
    return (
      <>
        <style>{spinnerKeyframes}</style>
        <span
          ref={ref}
          role="status"
          aria-live="polite"
          aria-label={label}
          className={cn(spinnerVariants({ size, color }), className)}
          style={style}
          {...props}
        >
          {WAVE_BAR_REDUCED_HEIGHTS.map((reducedHeight, index) => (
            <span
              key={index}
              aria-hidden="true"
              className="dubo-wave-bar"
              style={
                {
                  animationDelay: `${index * 0.1}s`,
                  "--dubo-spinner-reduced-height": reducedHeight,
                } as React.CSSProperties
              }
            />
          ))}
        </span>
      </>
    );
  }
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };
