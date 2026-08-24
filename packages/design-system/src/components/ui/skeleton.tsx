import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Skeleton
 *
 * Variants: text (rectangle) | circle | card (rounded rectangle)
 *
 * Shimmer/pulse animation for loading placeholders.
 * Uses shared surface radius and sizing tokens for the default shapes.
 * Width and height are configurable via className or style props.
 */

const skeletonVariants = cva(["animate-pulse", "bg-[var(--color-hover)]"].join(" "), {
  variants: {
    variant: {
      text: "h-[var(--size-5)] w-full rounded-[var(--radius-control-input)]",
      circle: "size-[var(--size-10)] rounded-full",
      card: "h-[var(--size-24)] w-full rounded-[var(--radius-scale-xl)]",
    },
  },
  defaultVariants: {
    variant: "text",
  },
});

export interface SkeletonProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(skeletonVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
