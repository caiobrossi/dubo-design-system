"use client";

import * as React from "react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@dubo/design-system-shared/lib/utils";

/**
 * Dubo Design System — Separator
 *
 * Orientations: horizontal | vertical
 * Label support: optional centered text divider
 *
 * Uses shared border, spacing, and caption typography tokens. Decorative by default.
 */

export interface SeparatorProps extends React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> {
  /** Optional label text displayed in the center of the separator */
  label?: string;
}

const Separator = React.forwardRef<
  React.ComponentRef<typeof SeparatorPrimitive.Root>,
  SeparatorProps
>(({ className, orientation = "horizontal", decorative = true, label, ...props }, ref) => {
  if (label && orientation === "horizontal") {
    return (
      <div
        role={decorative ? "none" : "separator"}
        aria-orientation={orientation}
        className={cn("flex items-center gap-[var(--space-4)]", className)}
      >
        <SeparatorPrimitive.Root
          decorative
          orientation="horizontal"
          className="h-px flex-1 bg-[var(--color-border)]"
        />
        <span className="shrink-0 text-body-sm [font-weight:var(--font-weight-400)] text-[color:var(--color-text-muted)]">
          {label}
        </span>
        <SeparatorPrimitive.Root
          decorative
          orientation="horizontal"
          className="h-px flex-1 bg-[var(--color-border)]"
        />
      </div>
    );
  }

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-[var(--color-border)]",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      {...props}
    />
  );
});

Separator.displayName = "Separator";

export { Separator };
