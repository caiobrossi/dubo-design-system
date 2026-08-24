"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "dubo-design-system/lib/utils";

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipArrow = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Arrow>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Arrow>
>(({ className, ...props }, ref) => (
  <TooltipPrimitive.Arrow
    ref={ref}
    className={cn("fill-[var(--color-bg-inverted)]", className)}
    width={10}
    height={5}
    {...props}
  />
));
TooltipArrow.displayName = "TooltipArrow";

const TooltipContent = React.forwardRef<
  React.ComponentRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
    showArrow?: boolean;
  }
>(({ className, sideOffset = 6, showArrow = true, children, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        "z-50 overflow-hidden",
        "px-[var(--space-3)] py-[calc(var(--space-3)/2)]",
        "text-body-sm [font-weight:var(--font-weight-400)]",
        "bg-[var(--color-bg-inverted)] text-[color:var(--color-text-inverted)]",
        "rounded-[var(--radius-control-soft)]",
        "transform-gpu will-change-[transform,opacity]",
        "data-[state=delayed-open]:animate-tooltipIn",
        "data-[state=instant-open]:animate-tooltipIn",
        "data-[state=closed]:animate-tooltipOut",
        className
      )}
      style={{ boxShadow: "var(--shadow-md)" }}
      {...props}
    >
      {children}
      {showArrow ? <TooltipArrow /> : null}
    </TooltipPrimitive.Content>
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipArrow, TooltipProvider };
