"use client";

import * as React from "react";
import { FloatingDateField } from "@/components/ui/date-field";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";

type DuboDateFormat = "dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd";
type WeekStart = 0 | 1 | 6;

function toIsoDateString(value?: Date) {
  if (!value || Number.isNaN(value.getTime())) return "—";
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function DateFieldFilledDemo() {
  const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 3, 1));

  return (
    <div className="w-full max-w-sm">
      <FloatingDateField
        label="Data"
        variant="filled"
        value={value}
        onChange={setValue}
        clearable
      />
    </div>
  );
}

export function DateFieldOutlineDemo() {
  const [value, setValue] = React.useState<Date | undefined>(undefined);

  return (
    <div className="w-full max-w-sm">
      <FloatingDateField label="Data" variant="outline" value={value} onChange={setValue} />
    </div>
  );
}

export function DateFieldDuboSettingsDemo() {
  const [value, setValue] = React.useState<Date | undefined>(new Date(2026, 3, 1));
  const [dateFormat, setDateFormat] = React.useState<DuboDateFormat>("dd/MM/yyyy");
  const [weekStartsOn, setWeekStartsOn] = React.useState<WeekStart>(1);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-body-md font-medium text-default-font">Formato de data</p>
        <SegmentControl variant="header">
          <SegmentItem
            active={dateFormat === "dd/MM/yyyy"}
            onClick={() => setDateFormat("dd/MM/yyyy")}
          >
            DD/MM/YYYY
          </SegmentItem>
          <SegmentItem
            active={dateFormat === "MM/dd/yyyy"}
            onClick={() => setDateFormat("MM/dd/yyyy")}
          >
            MM/DD/YYYY
          </SegmentItem>
          <SegmentItem
            active={dateFormat === "yyyy-MM-dd"}
            onClick={() => setDateFormat("yyyy-MM-dd")}
          >
            YYYY-MM-DD
          </SegmentItem>
        </SegmentControl>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-body-md font-medium text-default-font">Primeiro dia da semana</p>
        <SegmentControl variant="header">
          <SegmentItem active={weekStartsOn === 1} onClick={() => setWeekStartsOn(1)}>
            Monday
          </SegmentItem>
          <SegmentItem active={weekStartsOn === 0} onClick={() => setWeekStartsOn(0)}>
            Sunday
          </SegmentItem>
          <SegmentItem active={weekStartsOn === 6} onClick={() => setWeekStartsOn(6)}>
            Saturday
          </SegmentItem>
        </SegmentControl>
      </div>

      <FloatingDateField
        label="Data"
        variant="filled"
        value={value}
        onChange={setValue}
        dateFormat={dateFormat}
        clearable
        calendarProps={{ weekStartsOn }}
      />

      <p className="text-body-md text-subtext-color">
        Na app Dubo, o adapter lê `settings.dateFormat` e `settings.weekStartsOn`, mostra o campo
        nesse formato e continua a guardar a data em ISO: <code>{toIsoDateString(value)}</code>
      </p>
    </div>
  );
}
