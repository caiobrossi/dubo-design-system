"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "dubo-design-system/lib/icons";

import { cn } from "dubo-design-system/lib/utils";

export interface WeekdayPickerItem {
  id: string;
  dayLabel: React.ReactNode;
  dayNumber: React.ReactNode;
  isToday?: boolean;
  disabled?: boolean;
}

export interface WeekdayPickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  items: WeekdayPickerItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
}

export function WeekdayPicker({
  items,
  selectedId,
  onSelect,
  onPrevious,
  onNext,
  previousLabel = "Previous week",
  nextLabel = "Next week",
  className,
  ...props
}: WeekdayPickerProps) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const itemRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const [pillStyle, setPillStyle] = React.useState<{ left: number; width: number } | null>(null);

  const selectedIndex = React.useMemo(
    () => items.findIndex((item) => item.id === selectedId),
    [items, selectedId]
  );

  const registerDayRef = React.useCallback((index: number, node: HTMLButtonElement | null) => {
    itemRefs.current[index] = node;
  }, []);

  const updatePillPosition = React.useCallback(() => {
    const container = containerRef.current;
    const activeElement = itemRefs.current[selectedIndex];

    if (!container || !activeElement || selectedIndex < 0) {
      setPillStyle(null);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeElement.getBoundingClientRect();

    setPillStyle({
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    });
  }, [selectedIndex]);

  React.useLayoutEffect(() => {
    updatePillPosition();
  }, [items, selectedId, updatePillPosition]);

  React.useEffect(() => {
    window.addEventListener("resize", updatePillPosition);
    return () => window.removeEventListener("resize", updatePillPosition);
  }, [updatePillPosition]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center gap-0 overflow-hidden rounded-[var(--radius-control-pill)] border",
        "border-[var(--color-border)] bg-[var(--color-bg-subtle)] p-[var(--space-1)]",
        className
      )}
      {...props}
    >
      {onPrevious ? (
        <button
          type="button"
          onClick={onPrevious}
          aria-label={previousLabel}
          className="z-10 flex size-[var(--height-control-md)] shrink-0 items-center justify-center rounded-full text-[color:var(--color-text-secondary)] transition-colors duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)] hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]"
        >
          <ChevronLeft className="size-[var(--icon-size-md)]" />
        </button>
      ) : null}

      {pillStyle ? (
        <motion.div
          className="absolute bottom-[var(--space-1)] top-[var(--space-1)] rounded-[var(--radius-scale-lg)] bg-[var(--color-bg-surface)] shadow-[var(--shadow-sm)]"
          initial={false}
          animate={{ left: pillStyle.left, width: pillStyle.width }}
          transition={{ type: "spring", stiffness: 500, damping: 32, mass: 0.8 }}
        />
      ) : null}

      <div className="relative z-10 flex min-w-0 flex-1 items-center justify-center gap-0">
        {items.map((item, index) => {
          const isSelected = item.id === selectedId;

          return (
            <button
              key={item.id}
              type="button"
              ref={(node) => registerDayRef(index, node)}
              onClick={() => onSelect(item.id)}
              disabled={item.disabled}
              aria-current={item.isToday ? "date" : undefined}
              aria-pressed={isSelected}
              className={cn(
                "flex min-h-[var(--weekday-picker-item-min-height,var(--height-control-lg))] min-w-0 flex-1 flex-col items-center justify-center rounded-[var(--radius-scale-lg)] px-[var(--space-2)] py-[var(--space-1)]",
                "transition-colors duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)]",
                !isSelected && !item.disabled && "hover:bg-[var(--color-hover)]",
                item.isToday && !isSelected && "bg-[var(--color-hover)]",
                item.disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]"
              )}
            >
              <span
                className={cn(
                  "text-body-md [font-weight:var(--font-weight-600)]",
                  isSelected
                    ? "text-[color:var(--color-text-primary)]"
                    : "text-[color:var(--color-text-secondary)]"
                )}
              >
                {item.dayNumber}
              </span>
              <span
                className={cn(
                  "text-body-sm [font-weight:var(--font-weight-400)]",
                  isSelected ? "text-[color:var(--color-brand)]" : "text-[color:var(--color-text-muted)]"
                )}
              >
                {item.dayLabel}
              </span>
            </button>
          );
        })}
      </div>

      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          aria-label={nextLabel}
          className="z-10 flex size-[var(--height-control-md)] shrink-0 items-center justify-center rounded-full text-[color:var(--color-text-secondary)] transition-colors duration-[var(--transition-fast)] [transition-timing-function:var(--transition-easing)] hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]"
        >
          <ChevronRight className="size-[var(--icon-size-md)]" />
        </button>
      ) : null}
    </div>
  );
}
