"use client";

import * as React from "react";
import { WeekdayPicker } from "@/components/ui/weekday-picker";

const baseItems = [
  { id: "mon", dayNumber: "11", dayLabel: "Mon" },
  { id: "tue", dayNumber: "12", dayLabel: "Tue" },
  { id: "wed", dayNumber: "13", dayLabel: "Wed", isToday: true },
  { id: "thu", dayNumber: "14", dayLabel: "Thu" },
  { id: "fri", dayNumber: "15", dayLabel: "Fri" },
  { id: "sat", dayNumber: "16", dayLabel: "Sat" },
  { id: "sun", dayNumber: "17", dayLabel: "Sun" },
];

export function WeekdayPickerWithNavigationDemo() {
  const [selectedId, setSelectedId] = React.useState("wed");

  return (
    <WeekdayPicker
      items={baseItems}
      selectedId={selectedId}
      onSelect={setSelectedId}
      onPrevious={() => undefined}
      onNext={() => undefined}
    />
  );
}

export function WeekdayPickerSimpleDemo() {
  const [selectedId, setSelectedId] = React.useState("fri");

  return <WeekdayPicker items={baseItems} selectedId={selectedId} onSelect={setSelectedId} />;
}
