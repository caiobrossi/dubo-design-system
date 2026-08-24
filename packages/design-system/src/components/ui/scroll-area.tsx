"use client";

import * as React from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — ScrollArea
 *
 * Custom scrollbar overlay built on @radix-ui/react-scroll-area.
 * Thin scrollbar that reuses shared spacing and neutral surface tokens.
 *
 * Scrollbar width: --space-1 default, --space-2 on hover
 * Thumb colors: --color-text-muted idle, --color-border-strong on hover
 * Supports both vertical and horizontal scrolling.
 *
 * All visual properties driven by design tokens.
 */

const ScrollArea = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
    /** Show horizontal scrollbar as well */
    orientation?: "vertical" | "horizontal" | "both";
  }
>(({ className, children, orientation = "vertical", onWheelCapture, ...props }, ref) => {
  const internalRef = React.useRef<HTMLDivElement | null>(null);

  const setRefs = React.useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref]
  );

  const handleWheelCapture = React.useCallback(
    (event: React.WheelEvent<HTMLDivElement>) => {
      onWheelCapture?.(event);
      if (event.defaultPrevented) return;

      const root = internalRef.current;
      if (!root) return;

      const viewport = root.querySelector("[data-radix-scroll-area-viewport]") as HTMLElement | null;
      if (!viewport) return;

      const canScrollVertically = orientation === "vertical" || orientation === "both";
      const canScrollHorizontally = orientation === "horizontal" || orientation === "both";

      if (canScrollVertically && viewport.scrollHeight > viewport.clientHeight && event.deltaY !== 0) {
        viewport.scrollTop += event.deltaY;
        event.stopPropagation();
        return;
      }

      if (canScrollHorizontally && viewport.scrollWidth > viewport.clientWidth && event.deltaX !== 0) {
        viewport.scrollLeft += event.deltaX;
        event.stopPropagation();
      }
    },
    [onWheelCapture, orientation]
  );

  return (
    <ScrollAreaPrimitive.Root
      ref={setRefs}
      className={cn("relative overflow-hidden", className)}
      onWheelCapture={handleWheelCapture}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      {(orientation === "vertical" || orientation === "both") && <ScrollBar orientation="vertical" />}
      {(orientation === "horizontal" || orientation === "both") && (
        <ScrollBar orientation="horizontal" />
      )}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = "ScrollArea";

const ScrollBar = React.forwardRef<
  React.ComponentRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = "vertical", ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      "flex touch-none select-none",
      "transition-[width,height,opacity] duration-[var(--transition-fast)]",
      "ease-[var(--transition-easing)]",
      orientation === "vertical" &&
        "h-full w-[var(--space-1)] border-l border-l-transparent p-[calc(var(--space-1)/4)] hover:w-[var(--space-2)]",
      orientation === "horizontal" &&
        "h-[var(--space-1)] w-full flex-col border-t border-t-transparent p-[calc(var(--space-1)/4)] hover:h-[var(--space-2)]",
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb
      className={cn(
        "relative flex-1 rounded-full",
        "bg-[var(--color-text-muted)]",
        "transition-colors duration-[var(--transition-fast)]",
        "hover:bg-[var(--color-border-strong)]"
      )}
    />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
));
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
