"use client";

import * as React from "react";
import {
  DentalSurfaceSelector,
  DentalToothSelector,
  type DentalQuadrant,
} from "@/components/ui/dental-selector";

const quadrantLabels: Record<DentalQuadrant, string> = {
  1: "Upper right",
  2: "Upper left",
  3: "Lower left",
  4: "Lower right",
};

const surfaceOptions = [
  { value: "M", label: "Mesial" },
  { value: "D", label: "Distal" },
  { value: "O", label: "Occlusal" },
  { value: "B", label: "Buccal" },
  { value: "L", label: "Lingual" },
];

export function DentalToothSelectorDemo() {
  const [value, setValue] = React.useState<string[]>(["16", "15", "24"]);

  return (
    <div className="w-full max-w-[320px]">
      <DentalToothSelector
        label="Teeth"
        value={value}
        onValueChange={setValue}
        quadrantLabels={quadrantLabels}
        selectionSummaryFormatter={(count: number) => `${count} teeth selected`}
      />
    </div>
  );
}

export function DentalSurfaceSelectorDemo() {
  const [value, setValue] = React.useState<string[]>(["M", "D", "B"]);

  return (
    <div className="w-full max-w-[320px]">
      <DentalSurfaceSelector
        label="Surface"
        value={value}
        onValueChange={setValue}
        options={surfaceOptions}
      />
    </div>
  );
}
