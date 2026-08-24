"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "dubo-design-system/lib/utils";

/**
 * Dubo Design System — Slider
 *
 * Range input for continuous numeric values.
 * Exposes compound parts for custom composition:
 *   Slider.Track
 *   Slider.Range
 *   Slider.Thumb
 *
 * Default root rendering already includes Track + Range + Thumb.
 */

interface SliderRangeProps extends React.ComponentProps<typeof SliderPrimitive.Range> {
  className?: string;
}

const SliderRange = React.forwardRef<HTMLSpanElement, SliderRangeProps>(function SliderRange(
  { className, ...props },
  ref
) {
  return (
    <SliderPrimitive.Range
      ref={ref}
      className={cn("absolute h-full rounded-full bg-[var(--color-brand)]", className)}
      {...props}
    />
  );
});

interface SliderThumbProps extends React.ComponentProps<typeof SliderPrimitive.Thumb> {
  className?: string;
}

const SliderThumb = React.forwardRef<HTMLSpanElement, SliderThumbProps>(function SliderThumb(
  { className, ...props },
  ref
) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      className={cn(
        "block h-5 w-5 rounded-full border border-[var(--color-brand)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-md)] transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
});

interface SliderTrackProps extends React.ComponentProps<typeof SliderPrimitive.Track> {
  className?: string;
}

const SliderTrack = React.forwardRef<HTMLSpanElement, SliderTrackProps>(function SliderTrack(
  { className, children, ...props },
  ref
) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      className={cn("relative h-1.5 w-full rounded-full bg-[var(--color-hover)]", className)}
      {...props}
    >
      {children ?? <SliderRange />}
    </SliderPrimitive.Track>
  );
});

interface SliderRootProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
  className?: string;
}

const SliderRoot = React.forwardRef<HTMLSpanElement, SliderRootProps>(function SliderRoot(
  { className, children, ...props },
  ref
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn("relative flex h-5 w-full touch-none select-none items-center", className)}
      {...props}
    >
      {children ?? (
        <>
          <SliderTrack />
          <SliderThumb />
        </>
      )}
    </SliderPrimitive.Root>
  );
});

SliderRange.displayName = "SliderRange";
SliderThumb.displayName = "SliderThumb";
SliderTrack.displayName = "SliderTrack";
SliderRoot.displayName = "Slider";

export const Slider = Object.assign(SliderRoot, {
  Range: SliderRange,
  Thumb: SliderThumb,
  Track: SliderTrack,
});
