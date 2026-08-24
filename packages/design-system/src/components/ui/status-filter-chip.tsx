"use client";

import * as React from "react";
import { ChevronDown } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";

type StatusFilterChipTone = "neutral" | "warning" | "danger" | "success" | "brand";

const toneClasses: Record<StatusFilterChipTone, string> = {
  neutral: "bg-[var(--color-text-muted)]",
  warning: "bg-[var(--color-warning)]",
  danger: "bg-[var(--color-danger)]",
  success: "bg-[var(--color-success)]",
  brand: "bg-[var(--color-brand)]",
};

export interface StatusFilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: React.ReactNode;
  tone?: StatusFilterChipTone;
  open?: boolean;
  showChevron?: boolean;
}

const StatusFilterChip = React.forwardRef<HTMLButtonElement, StatusFilterChipProps>(
  (
    {
      className,
      label,
      tone = "neutral",
      open = false,
      showChevron = true,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        data-state={open ? "open" : "closed"}
        className={cn(
          "inline-flex h-[var(--height-control-sm)] items-center gap-[var(--space-2)] rounded-full",
          "border border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)]",
          "px-[var(--space-3)]",
          "text-body-md [font-weight:var(--font-weight-500)]",
          "text-[color:var(--color-text-primary)]",
          "transition-all duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
          "hover:bg-[var(--color-hover)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
          "disabled:pointer-events-none disabled:opacity-[var(--disabled-opacity)]",
          className
        )}
        {...props}
      >
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-[var(--space-2)] shrink-0 rounded-full",
            toneClasses[tone]
          )}
        />
        <span className="truncate">{label}</span>
        {showChevron ? (
          <ChevronDown
            className={cn(
              "size-[var(--icon-size-sm)] shrink-0 text-[color:var(--color-text-secondary)] transition-transform duration-[var(--transition-fast)]",
              open && "rotate-180"
            )}
          />
        ) : null}
      </button>
    );
  }
);

StatusFilterChip.displayName = "StatusFilterChip";

export { StatusFilterChip };
