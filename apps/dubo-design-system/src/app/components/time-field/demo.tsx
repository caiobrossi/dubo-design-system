"use client";

import * as React from "react";
import { FloatingTimeField } from "@/components/ui/time-field";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";

export function TimeFieldFilledDemo() {
  const [value, setValue] = React.useState("09:30");

  return (
    <div className="w-full max-w-sm">
      <FloatingTimeField
        label="Horário de início"
        variant="filled"
        value={value}
        onChange={setValue}
        clearable
      />
    </div>
  );
}

export function TimeFieldOutlineDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <FloatingTimeField
        label="Horário de início"
        variant="outline"
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

export function TimeFieldMinuteStepDemo() {
  const [value, setValue] = React.useState("10:30");
  const [minuteStep, setMinuteStep] = React.useState<5 | 10 | 15>(5);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <p className="text-body-md font-medium text-default-font">Intervalo de minutos</p>
        <SegmentControl variant="header">
          <SegmentItem active={minuteStep === 5} onClick={() => setMinuteStep(5)}>
            5 min
          </SegmentItem>
          <SegmentItem active={minuteStep === 10} onClick={() => setMinuteStep(10)}>
            10 min
          </SegmentItem>
          <SegmentItem active={minuteStep === 15} onClick={() => setMinuteStep(15)}>
            15 min
          </SegmentItem>
        </SegmentControl>
      </div>

      <FloatingTimeField
        label="Horário de início"
        variant="filled"
        value={value}
        onChange={setValue}
        minuteStep={minuteStep}
        clearable
      />

      <p className="text-body-md text-subtext-color">
        Digite só números como <code>930</code> ou <code>26</code>. O campo formata e corrige o
        valor automaticamente para um horário válido.
      </p>
    </div>
  );
}
