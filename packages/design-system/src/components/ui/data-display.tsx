import * as React from "react";
import { cn } from "@dubo/design-system-shared/lib/utils";

export interface DataDisplayProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "bordered" | "plain";
}

export interface DataDisplayItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: React.ReactNode;
  value: React.ReactNode;
  size?: "md" | "lg";
  align?: "center" | "start";
}

export function DataDisplay({ className, variant = "bordered", ...props }: DataDisplayProps) {
  return (
    <div
      role="list"
      className={cn(
        "overflow-hidden",
        variant === "bordered" &&
          "rounded-[var(--radius-scale-xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)]",
        "divide-y divide-[var(--color-border)]",
        className
      )}
      {...props}
    />
  );
}

export function DataDisplayItem({
  label,
  value,
  size = "md",
  align = "center",
  className,
  ...props
}: DataDisplayItemProps) {
  return (
    <div
      role="listitem"
      className={cn(
        "flex justify-between gap-[var(--space-4)] px-[var(--space-4)]",
        size === "md" ? "min-h-[var(--height-control-md)]" : "min-h-[var(--height-control-lg)]",
        align === "center" ? "items-center" : "items-start py-[var(--space-3)]",
        className
      )}
      {...props}
    >
      <div className="min-w-0 flex-1 text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
        {label}
      </div>
      <div className="min-w-0 flex-1 text-right text-body-lg [font-weight:var(--font-weight-500)] text-[color:var(--color-text-primary)]">
        {value}
      </div>
    </div>
  );
}
