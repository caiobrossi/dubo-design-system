"use client";

import * as React from "react";

import { Button } from "dubo-design-system/components/ui/button";
import { DatePicker } from "dubo-design-system/components/ui/date-picker";
import { FilterChip } from "dubo-design-system/components/ui/filter-chip";
import { Separator } from "dubo-design-system/components/ui/separator";

export type DateRangeFilterPreset<TPreset extends string = string> = {
  key: TPreset;
  label: string;
};

export interface DateRangeFilterChipProps<TPreset extends string = string> {
  label: string;
  activeLabel: string;
  active: boolean;
  icon?: React.ReactNode;
  fromLabel: string;
  toLabel: string;
  fromValue?: Date;
  toValue?: Date;
  onFromChange: (date?: Date) => void;
  onToChange: (date?: Date) => void;
  presets: DateRangeFilterPreset<TPreset>[];
  activePreset?: TPreset | null;
  onPresetSelect: (preset: TPreset) => void;
  onClear?: () => void;
  clearLabel?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  contentClassName?: string;
  dateFormat?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function DateRangeFilterChip<TPreset extends string = string>({
  label,
  activeLabel,
  active,
  icon,
  fromLabel,
  toLabel,
  fromValue,
  toValue,
  onFromChange,
  onToChange,
  presets,
  activePreset,
  onPresetSelect,
  onClear,
  clearLabel = "Clear",
  open,
  onOpenChange,
  contentClassName = "w-[min(28rem,calc(100vw-var(--space-8)))] max-w-[calc(100vw-var(--space-8))] p-[var(--space-3)]",
  dateFormat = "dd/MM/yyyy",
  size = "default",
  className,
}: DateRangeFilterChipProps<TPreset>) {
  return (
    <FilterChip
      label={label}
      activeLabel={activeLabel}
      active={active}
      persistent
      icon={icon}
      onClear={onClear}
      open={open}
      onOpenChange={onOpenChange}
      size={size}
      className={className}
      contentClassName={contentClassName}
    >
      <div className="flex w-full flex-col gap-[var(--space-3)] lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-[var(--space-3)]">
          <div className="flex flex-col gap-[var(--space-2)]">
            <span className="text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              {fromLabel}
            </span>
            <DatePicker
              variant="filled"
              className="w-full"
              dateFormat={dateFormat}
              value={fromValue}
              onChange={onFromChange}
            />
          </div>
          <div className="flex flex-col gap-[var(--space-2)]">
            <span className="text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              {toLabel}
            </span>
            <DatePicker
              variant="filled"
              className="w-full"
              dateFormat={dateFormat}
              value={toValue}
              onChange={onToChange}
            />
            {onClear ? (
              <Button
                type="button"
                variant="destructive"
                size="sm"
                rounded
                onClick={onClear}
                className="h-8 self-start"
              >
                {clearLabel}
              </Button>
            ) : null}
          </div>
        </div>

        <Separator orientation="vertical" className="mx-[var(--space-1)] hidden h-auto lg:block" />
        <Separator orientation="horizontal" className="lg:hidden" />

        <div className="flex min-w-[12rem] flex-col gap-[var(--space-1)]">
          {presets.map((preset) => (
            <Button
              key={preset.key}
              type="button"
              variant="ghost"
              size="default"
              rounded={false}
              onClick={() => onPresetSelect(preset.key)}
              className={[
                "w-full justify-start rounded-[var(--radius-control-input)] px-[var(--space-3)] text-left text-body-lg [font-weight:var(--font-weight-400)]",
                activePreset === preset.key
                  ? "bg-[var(--color-brand-subtle)] text-[color:var(--color-brand)]"
                  : "",
              ]
                .join(" ")
                .trim()}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      </div>
    </FilterChip>
  );
}
