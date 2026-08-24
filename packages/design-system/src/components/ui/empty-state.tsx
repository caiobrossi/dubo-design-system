"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@dubo/design-system-shared/lib/utils";

const emptyStateVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      compact: "gap-[var(--space-3)]",
      default: "gap-[var(--space-4)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const illustrationContainerVariants = cva(["flex shrink-0 items-center justify-center"], {
  variants: {
    size: {
      compact: "h-[var(--size-32)] w-[var(--size-32)]",
      default: "h-[var(--size-32)] w-[var(--size-32)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const contentVariants = cva("flex flex-col items-center", {
  variants: {
    size: {
      compact: "gap-[var(--space-1)]",
      default: "gap-[var(--space-2)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type EmptyStateSize = "compact" | "default";

type EmptyStateVisualProps =
  | {
      illustration: React.ReactNode;
      imageSrc?: never;
      imageAlt?: never;
    }
  | {
      illustration?: never;
      imageSrc: string;
      imageAlt?: string;
    };

type EmptyStateBaseProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof emptyStateVariants> & {
    title: React.ReactNode;
    description?: React.ReactNode;
    action?: React.ReactNode;
  };

export type EmptyStateProps = EmptyStateBaseProps & EmptyStateVisualProps;

const imageDimensionsBySize: Record<EmptyStateSize, number> = {
  compact: 128,
  default: 128,
};

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      className,
      size = "default",
      illustration,
      imageSrc,
      imageAlt = "",
      title,
      description,
      action,
      ...props
    },
    ref
  ) => {
    const resolvedSize: EmptyStateSize = size ?? "default";
    const imageDimension = imageDimensionsBySize[resolvedSize];

    return (
      <div
        ref={ref}
        className={cn(emptyStateVariants({ size: resolvedSize }), className)}
        {...props}
      >
        <div className={illustrationContainerVariants({ size: resolvedSize })}>
          {illustration ? (
            <div className="flex h-full w-full items-center justify-center">{illustration}</div>
          ) : imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt}
              width={imageDimension}
              height={imageDimension}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-contain"
            />
          ) : null}
        </div>

        <div className={contentVariants({ size: resolvedSize })}>
          <p className="text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            {title}
          </p>
          {description ? (
            <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>

        {action ? <div className="flex items-center justify-center">{action}</div> : null}
      </div>
    );
  }
);

EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };
