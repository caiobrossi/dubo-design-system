"use client";

import * as React from "react";
import { Calendar } from "@/lib/icons";
import { DateRangeFilterChip } from "@/components/ui/date-range-filter-chip";

const presets = [
  { key: "today", label: "Hoje" },
  { key: "thisWeek", label: "Esta semana" },
  { key: "last7Days", label: "Últimos 7 dias" },
  { key: "last30Days", label: "Últimos 30 dias" },
  { key: "thisMonth", label: "Este mês" },
] as const;

function formatDisplayDate(date?: Date) {
  if (!date) return "";
  return date.toLocaleDateString("pt-PT");
}

export function DateRangeFilterChipDemo() {
  const [from, setFrom] = React.useState<Date | undefined>(new Date("2026-04-01"));
  const [to, setTo] = React.useState<Date | undefined>(new Date("2026-04-30"));
  const [activePreset, setActivePreset] =
    React.useState<(typeof presets)[number]["key"] | "custom">("thisMonth");

  const activeLabel = React.useMemo(() => {
    const fromLabel = formatDisplayDate(from);
    const toLabel = formatDisplayDate(to);
    if (fromLabel && toLabel) return `${fromLabel} - ${toLabel}`;
    return fromLabel || toLabel || "Todas as datas";
  }, [from, to]);

  return (
    <DateRangeFilterChip
      label="Todas as datas"
      activeLabel={activeLabel}
      active={Boolean(from || to)}
      icon={<Calendar />}
      fromLabel="De"
      toLabel="Até"
      fromValue={from}
      toValue={to}
      onFromChange={(date) => {
        setFrom(date);
        setActivePreset("custom");
      }}
      onToChange={(date) => {
        setTo(date);
        setActivePreset("custom");
      }}
      presets={presets.map((preset) => ({ ...preset }))}
      activePreset={activePreset === "custom" ? null : activePreset}
      onPresetSelect={(preset) => setActivePreset(preset)}
      onClear={() => {
        setFrom(undefined);
        setTo(undefined);
        setActivePreset("custom");
      }}
    />
  );
}

export function DateRangeFilterChipToolbarDemo() {
  const [from, setFrom] = React.useState<Date | undefined>();
  const [to, setTo] = React.useState<Date | undefined>();

  return (
    <DateRangeFilterChip
      label="Todas as datas"
      activeLabel="Todas as datas"
      active={Boolean(from || to)}
      icon={<Calendar />}
      fromLabel="De"
      toLabel="Até"
      fromValue={from}
      toValue={to}
      onFromChange={setFrom}
      onToChange={setTo}
      presets={presets.map((preset) => ({ ...preset }))}
      activePreset={null}
      onPresetSelect={() => undefined}
      onClear={() => {
        setFrom(undefined);
        setTo(undefined);
      }}
      size="lg"
    />
  );
}
