"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "dubo-design-system/lib/utils";

const Popover = PopoverPrimitive.Root;
const PopoverTrigger = PopoverPrimitive.Trigger;
const PopoverAnchor = PopoverPrimitive.Anchor;
const PopoverClose = PopoverPrimitive.Close;

interface PopoverContentProps
  extends React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
  showArrow?: boolean;
  container?: HTMLElement | null;
}

const PopoverContent = React.forwardRef<
  React.ComponentRef<typeof PopoverPrimitive.Content>,
  PopoverContentProps
>(
  (
    {
      className,
      align = "center",
      side = "bottom",
      sideOffset = 8,
      showArrow = false,
      container,
      children,
      ...props
    },
    ref
  ) => (
    <PopoverPrimitive.Portal container={container ?? undefined}>
      <PopoverPrimitive.Content
        ref={ref}
        align={align}
        side={side}
        sideOffset={sideOffset}
        className={cn(
          "z-[60] w-[var(--overlay-glass-width-default)] rounded-[var(--overlay-glass-radius)] p-[var(--space-4)]",
          "border-solid [border-width:var(--overlay-glass-border-width)] [border-color:var(--overlay-glass-border)]",
          "bg-[var(--overlay-glass-bg)]",
          "[backdrop-filter:var(--overlay-glass-blur)_var(--overlay-glass-saturate)]",
          "text-[color:var(--color-text-primary)]",
          "outline-none transform-gpu animate-dropdownScaleIn",
          className
        )}
        style={{
          boxShadow:
            "inset 0 0 0 var(--overlay-glass-border-width) var(--overlay-glass-border), var(--overlay-glass-shadow)",
        }}
        {...props}
      >
        {children}
        {showArrow ? (
          <PopoverPrimitive.Arrow
            className="fill-[var(--overlay-glass-bg)]"
            style={{
              width: "var(--space-3)",
              height: "calc(var(--space-3) / 2)",
            }}
          />
        ) : null}
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
);
PopoverContent.displayName = "PopoverContent";

const PopoverArrow = PopoverPrimitive.Arrow;

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor, PopoverClose, PopoverArrow };
