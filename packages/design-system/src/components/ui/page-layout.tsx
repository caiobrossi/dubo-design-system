import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "dubo-design-system/lib/utils";

const pageLayoutVariants = cva("grid gap-[var(--space-2)]", {
  variants: {
    layout: {
      full: "grid-cols-1",
      halves: "grid-cols-1 lg:grid-cols-2",
      "sidebar-left": "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)]",
      "sidebar-right": "grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,1fr)]",
      "two-thirds-left": "grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]",
      "two-thirds-right": "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]",
      "fixed-sidebar-left": "grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)]",
      "fixed-sidebar-right": "grid-cols-1 lg:grid-cols-[minmax(0,1fr)_420px]",
    },
  },
  defaultVariants: {
    layout: "full",
  },
});

export interface PageLayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageLayoutVariants> {}

export const PageLayout = React.forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ className, layout, ...props }, ref) => (
    <div ref={ref} className={cn(pageLayoutVariants({ layout }), className)} {...props} />
  )
);
PageLayout.displayName = "PageLayout";
