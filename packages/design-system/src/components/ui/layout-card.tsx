import * as React from "react";

import { cn } from "@dubo/design-system-shared/lib/utils";

export type LayoutCardProps = React.HTMLAttributes<HTMLDivElement>;

export const LayoutCard = React.forwardRef<HTMLDivElement, LayoutCardProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "min-w-0 rounded-[var(--radius-scale-3xl)] [border-width:0.5px] [border-style:solid] border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4",
        className
      )}
      {...props}
    />
  )
);

LayoutCard.displayName = "LayoutCard";
