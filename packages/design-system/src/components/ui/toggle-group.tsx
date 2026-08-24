"use client";

import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";
import { cn } from "@dubo/design-system-shared/lib/utils";
import { toggleVariants } from "@dubo/design-system-shared/components/ui/toggle";

/**
 * Dubo Design System — Toggle Group
 *
 * Built on @radix-ui/react-toggle-group.
 * Groups multiple toggle buttons for single or multiple selection.
 * Pill-shaped items matching Toggle component styling.
 *
 * Types: single | multiple
 * Orientations: horizontal | vertical
 * Variants & sizes inherited from Toggle via context.
 *
 * Reuses Toggle tokens and adds shared spacing for the group gap.
 */

/* ── Context for passing variant/size to items ── */

type ToggleGroupContextValue = VariantProps<typeof toggleVariants>;

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  variant: "default",
  size: "default",
});

/* ── ToggleGroup ── */

type ToggleGroupProps = (React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> & {
  type: "single" | "multiple";
}) &
  VariantProps<typeof toggleVariants> & {
    orientation?: "horizontal" | "vertical";
  };

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  ToggleGroupProps
>(({ className, variant, size, orientation = "horizontal", children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn(
      "flex gap-[var(--space-1)]",
      orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-center",
      className
    )}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

/* ── ToggleGroupItem ── */

export interface ToggleGroupItemProps
  extends
    React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {}

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  ToggleGroupItemProps
>(({ className, variant, size, children, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: variant ?? context.variant,
          size: size ?? context.size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem, type ToggleGroupProps };
