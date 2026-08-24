"use client";

import * as React from "react";
import { ChevronDown, X } from "@dubo/design-system-shared/lib/icons";
import { cva, type VariantProps } from "class-variance-authority";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@dubo/design-system-shared/components/ui/popover";
import { cn } from "@dubo/design-system-shared/lib/utils";

const filterChipVariants = cva(
  [
    "inline-flex items-center gap-[var(--space-2)]",
    "select-none whitespace-nowrap",
    "rounded-full",
    "border",
    "transition-all duration-[var(--transition-fast)]",
    "outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-[var(--focus-ring)]",
    "focus-visible:ring-offset-[var(--focus-ring-offset)]",
    "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
  ],
  {
    variants: {
      size: {
        sm: "h-[var(--height-control-sm)] px-[var(--space-2)] text-body-md [font-weight:var(--font-weight-400)]",
        default:
          "h-[var(--height-control-md)] px-[var(--space-3)] text-body-lg [font-weight:var(--font-weight-400)]",
        lg: "h-[var(--height-control-lg)] px-[var(--space-4)] text-body-lg [font-weight:var(--font-weight-400)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface FilterChipProps extends VariantProps<typeof filterChipVariants> {
  label: string;
  activeLabel?: React.ReactNode;
  active?: boolean;
  persistent?: boolean;
  onClear?: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  sideOffset?: number;
  align?: "start" | "center" | "end";
  contentClassName?: string;
}

const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      activeLabel,
      active = false,
      persistent = false,
      onClear,
      children,
      icon,
      disabled = false,
      className,
      size,
      open,
      onOpenChange,
      sideOffset = 6,
      align = "start",
      contentClassName,
    },
    ref
  ) => {
    // `persistent` only means "no X clear affordance" (the filter always has
    // *some* value, e.g. "All professionals", so there's nothing to fully
    // clear back to) — it must not also suppress the active/selected visual
    // styling, otherwise a persistent chip can never look selected even when
    // its underlying filter genuinely isn't at the default value. This
    // previously zeroed out `showActive` for every persistent chip with a
    // real `active` condition (professional/category/type filters across
    // labs, suppliers, inventory, patient-groups and patients pages).
    const showActive = active;
    const showClear = showActive && !persistent && Boolean(onClear);

    return (
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger
          ref={ref}
          disabled={disabled}
          className={cn(
            filterChipVariants({ size }),
            !showActive && [
              "border-[var(--color-border-interactive)]",
              "bg-[var(--color-bg-surface)]",
              "text-[color:var(--color-text-secondary)]",
              "hover:bg-[var(--color-hover)]",
            ],
            showActive && [
              "border-[var(--color-brand)]",
              "bg-[var(--color-brand-subtle)]",
              "text-[color:var(--color-brand)]",
            ],
            className
          )}
        >
          {icon ? (
            <span className="shrink-0 [&_svg]:size-[var(--icon-size-md)]">{icon}</span>
          ) : null}
          <span className="truncate">{active && activeLabel ? activeLabel : label}</span>

          {showClear ? (
            <span
              role="button"
              tabIndex={0}
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onClear?.();
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.stopPropagation();
                  event.preventDefault();
                  onClear?.();
                }
              }}
              className={cn(
                "inline-flex size-[var(--size-4)] shrink-0 items-center justify-center rounded-full",
                "cursor-pointer text-[color:var(--color-brand)]",
                "transition-colors duration-[var(--transition-fast)]",
                "hover:text-[color:var(--color-text-primary)]"
              )}
              aria-label={`Clear ${label} filter`}
            >
              <X className="size-[var(--icon-size-sm)]" />
            </span>
          ) : (
            <ChevronDown className="size-[var(--icon-size-sm)] shrink-0 text-[color:var(--color-text-muted)] opacity-60" />
          )}
        </PopoverTrigger>

        <PopoverContent
          align={align}
          sideOffset={sideOffset}
          className={cn("min-w-[220px] p-[var(--space-2)]", contentClassName)}
        >
          {children}
        </PopoverContent>
      </Popover>
    );
  }
);

FilterChip.displayName = "FilterChip";

export { FilterChip, filterChipVariants };
