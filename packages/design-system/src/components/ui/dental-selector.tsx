"use client";

import * as React from "react";
import { ChevronDown, X } from "@dubo/design-system-shared/lib/icons";
import { cn } from "@dubo/design-system-shared/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  FloatingComboboxTrigger,
} from "./combobox";
import { FloatingFieldTrigger } from "./field-trigger";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { ScrollArea } from "./scroll-area";

export type DentalQuadrant = 1 | 2 | 3 | 4;

export interface DentalToothOption {
  id: string;
  number: number;
  quadrant: DentalQuadrant;
  label?: string;
}

export interface DentalSurfaceOption {
  value: string;
  label: string;
  shortLabel?: string;
}

export const DENTAL_ADULT_FDI_TEETH: DentalToothOption[] = [
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String(18 - i),
    number: 18 - i,
    quadrant: 1 as const,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String(21 + i),
    number: 21 + i,
    quadrant: 2 as const,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String(31 + i),
    number: 31 + i,
    quadrant: 3 as const,
  })),
  ...Array.from({ length: 8 }, (_, i) => ({
    id: String(48 - i),
    number: 48 - i,
    quadrant: 4 as const,
  })),
];

export const DENTAL_SURFACE_OPTIONS: DentalSurfaceOption[] = [
  { value: "M", label: "Mesial", shortLabel: "M" },
  { value: "D", label: "Distal", shortLabel: "D" },
  { value: "O", label: "Occlusal", shortLabel: "O" },
  { value: "B", label: "Buccal", shortLabel: "B" },
  { value: "L", label: "Lingual", shortLabel: "L" },
];

const DEFAULT_QUADRANT_LABELS: Record<DentalQuadrant, string> = {
  1: "Upper right",
  2: "Upper left",
  3: "Lower left",
  4: "Lower right",
};

function useControllableOpen(
  open: boolean | undefined,
  onOpenChange: ((open: boolean) => void) | undefined
) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const resolvedOpen = open ?? uncontrolledOpen;
  const setResolvedOpen = React.useCallback(
    (next: boolean) => {
      onOpenChange?.(next);
      if (open === undefined) {
        setUncontrolledOpen(next);
      }
    },
    [onOpenChange, open]
  );

  return [resolvedOpen, setResolvedOpen] as const;
}

function getSelectedToothLabel(tooth: DentalToothOption) {
  return tooth.label ?? String(tooth.number);
}

function sortSelectedTeeth(ids: string[], lookup: Map<string, DentalToothOption>) {
  return ids.toSorted((leftId, rightId) => {
    const left = lookup.get(leftId);
    const right = lookup.get(rightId);

    if (!left || !right) return leftId.localeCompare(rightId);
    return left.number - right.number;
  });
}

export interface DentalToothSelectorProps {
  label: React.ReactNode;
  value: string[];
  onValueChange: (value: string[]) => void;
  teeth?: DentalToothOption[];
  quadrantLabels?: Partial<Record<DentalQuadrant, React.ReactNode>>;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  variant?: "outline" | "filled";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  maxVisibleSelections?: number;
  selectionSummaryFormatter?: (count: number) => string;
  displayValueFormatter?: (selectedLabels: string[]) => string;
  inline?: boolean;
  className?: string;
  triggerClassName?: string;
  triggerValueClassName?: string;
  triggerIconClassName?: string;
  contentClassName?: string;
  container?: HTMLElement | null;
}

export function DentalToothSelector({
  label,
  value,
  onValueChange,
  teeth = DENTAL_ADULT_FDI_TEETH,
  quadrantLabels,
  placeholder = "Select teeth",
  disabled = false,
  clearable = true,
  variant = "filled",
  open,
  onOpenChange,
  maxVisibleSelections = 3,
  selectionSummaryFormatter,
  displayValueFormatter,
  inline = false,
  className,
  triggerClassName,
  triggerValueClassName,
  triggerIconClassName,
  contentClassName,
  container,
}: DentalToothSelectorProps) {
  const [resolvedOpen, setResolvedOpen] = useControllableOpen(open, onOpenChange);

  const toothLookup = React.useMemo(
    () => new Map(teeth.map((tooth) => [tooth.id, tooth])),
    [teeth]
  );

  const groupedTeeth = React.useMemo(() => {
    const groups: Record<DentalQuadrant, DentalToothOption[]> = { 1: [], 2: [], 3: [], 4: [] };
    teeth.forEach((tooth) => groups[tooth.quadrant].push(tooth));
    return groups;
  }, [teeth]);

  const mergedQuadrantLabels = React.useMemo(
    () => ({ ...DEFAULT_QUADRANT_LABELS, ...quadrantLabels }),
    [quadrantLabels]
  );

  const displayValue = React.useMemo(() => {
    if (value.length === 0) return "";

    const sorted = sortSelectedTeeth(value, toothLookup);
    const selectedLabels = sorted
      .map((id) => toothLookup.get(id))
      .filter((tooth): tooth is DentalToothOption => Boolean(tooth))
      .map(getSelectedToothLabel);

    if (displayValueFormatter) {
      return displayValueFormatter(selectedLabels);
    }

    if (sorted.length <= maxVisibleSelections) {
      return selectedLabels.join(", ");
    }

    return selectionSummaryFormatter?.(sorted.length) ?? `${sorted.length} selected`;
  }, [displayValueFormatter, maxVisibleSelections, selectionSummaryFormatter, toothLookup, value]);

  const toggleTooth = React.useCallback(
    (toothId: string) => {
      const nextValue = value.includes(toothId)
        ? value.filter((id) => id !== toothId)
        : [...value, toothId];
      onValueChange(nextValue);
    },
    [onValueChange, value]
  );

  return (
    <Popover open={resolvedOpen} onOpenChange={setResolvedOpen}>
      <PopoverTrigger asChild>
        <div className={className}>
          <FloatingFieldTrigger
            variant={variant}
            label={inline ? null : label}
            aria-label={typeof label === "string" ? label : undefined}
            className={triggerClassName}
            valueClassName={triggerValueClassName}
            open={resolvedOpen}
            hasValue={inline || value.length > 0}
            clearable={false}
            disabled={disabled}
            triggerIcon={
              <ChevronDown
                className={cn(
                  "size-[var(--icon-size-md)] text-[color:var(--color-text-muted)] transition-transform duration-[var(--transition-fast)]",
                  resolvedOpen && "rotate-180",
                  triggerIconClassName
                )}
              />
            }
          >
            {displayValue || placeholder}
          </FloatingFieldTrigger>
        </div>
      </PopoverTrigger>
      <PopoverContent
        container={container}
        align="start"
        sideOffset={8}
        className={cn(
          "pointer-events-auto w-[var(--radix-popover-trigger-width)] max-w-[min(32rem,calc(100vw-var(--space-8)))] p-[var(--space-2)]",
          contentClassName
        )}
      >
        {clearable && value.length > 0 ? (
          <div className="flex justify-end border-b border-[var(--color-border)] pb-[var(--space-2)]">
            <button
              type="button"
              onClick={() => onValueChange([])}
              className="flex h-8 items-center gap-[var(--space-1)] rounded-[var(--radius-control-pill)] px-[var(--space-3)] text-body-md text-[color:var(--color-text-secondary)] transition-colors hover:bg-[var(--color-bg-subtle)] hover:text-[color:var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              <X className="size-[var(--icon-size-sm)]" />
              Limpar
            </button>
          </div>
        ) : null}
        <ScrollArea className="h-[18rem] w-full">
          <div className="flex flex-col gap-[var(--space-2)] pr-[var(--space-1)]">
            {([1, 2, 3, 4] as const).map((quadrant) => (
              <div key={quadrant} className="flex flex-col gap-[var(--space-2)]">
                <div className="px-[var(--space-3)] py-[var(--space-2)] text-body-sm [font-weight:var(--font-weight-400)] uppercase [letter-spacing:0em] text-[color:var(--color-text-muted)]">
                  {mergedQuadrantLabels[quadrant]}
                </div>
                <div className="grid grid-cols-4 gap-[var(--space-1)]">
                  {groupedTeeth[quadrant].map((tooth) => {
                    const selected = value.includes(tooth.id);

                    return (
                      <button
                        key={tooth.id}
                        type="button"
                        onClick={() => toggleTooth(tooth.id)}
                        className={cn(
                          "flex h-10 items-center justify-center rounded-[var(--radius-control-pill)] border px-[var(--space-2)]",
                          "text-body-md [font-weight:var(--font-weight-400)]",
                          "transition-[background-color,border-color,color,box-shadow] duration-[var(--transition-fast)]",
                          "[transition-timing-function:var(--transition-easing)]",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg-surface)]",
                          selected
                            ? "border-[var(--color-brand)] bg-[var(--color-brand)] text-[color:var(--color-text-on-brand)]"
                            : "border-[var(--color-border)] bg-[var(--color-bg-input)] text-[color:var(--color-text-primary)] hover:border-[var(--color-border-strong)] hover:bg-[var(--color-bg-input-hover)]"
                        )}
                      >
                        {tooth.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export interface DentalSurfaceSelectorProps {
  label: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  options?: DentalSurfaceOption[];
  placeholder?: string;
  disabled?: boolean;
  variant?: "outline" | "filled";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  multipleDisplay?: "summary" | "all";
  inline?: boolean;
  className?: string;
  contentClassName?: string;
  container?: HTMLElement | null;
}

export function DentalSurfaceSelector({
  label,
  value,
  onValueChange,
  options = DENTAL_SURFACE_OPTIONS,
  placeholder = "Select surfaces",
  disabled = false,
  variant = "filled",
  open,
  onOpenChange,
  multipleDisplay = "all",
  inline = false,
  className,
  contentClassName,
  container,
}: DentalSurfaceSelectorProps) {
  const labels = React.useMemo(
    () => Object.fromEntries(options.map((option) => [option.value, option.label])),
    [options]
  );
  const inlineLabels = React.useMemo(
    () =>
      Object.fromEntries(
        options.map((option) => [option.value, option.shortLabel || option.label])
      ),
    [options]
  );

  return (
    <Combobox
      multiple
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as string[])}
      open={open}
      onOpenChange={onOpenChange}
    >
      {inline ? (
        <ComboboxTrigger
          className={className}
          aria-label={label}
          placeholder={placeholder}
          labels={multipleDisplay === "all" ? inlineLabels : labels}
          multipleDisplay={multipleDisplay}
          disabled={disabled}
        />
      ) : (
        <FloatingComboboxTrigger
          variant={variant}
          className={className}
          label={label}
          placeholder={placeholder}
          labels={labels}
          multipleDisplay={multipleDisplay}
          disabled={disabled}
        />
      )}
      <ComboboxContent
        container={container}
        align="start"
        className={cn(
          "border border-[var(--color-border)] bg-[var(--color-bg-surface)] [backdrop-filter:none]",
          contentClassName
        )}
      >
        <ComboboxList>
          {options.map((option) => (
            <ComboboxItem key={option.value} value={option.value}>
              {option.label}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
