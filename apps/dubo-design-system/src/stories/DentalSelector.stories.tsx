import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import {
  DentalSurfaceSelector,
  DentalToothSelector,
  type DentalQuadrant,
} from "@/components/ui/dental-selector";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

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

function ToothSelectorDemo() {
  const [value, setValue] = React.useState<string[]>(["16", "15", "24"]);

  return (
    <div className="w-[320px]">
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

function SurfaceSelectorDemo() {
  const [value, setValue] = React.useState<string[]>(["M", "D", "B"]);

  return (
    <div className="w-[320px]">
      <DentalSurfaceSelector
        label="Surface"
        value={value}
        onValueChange={setValue}
        options={surfaceOptions}
      />
    </div>
  );
}

const meta = {
  title: "Components/DentalSelector",
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**DentalSelector** — Dubo dental-domain selection patterns for FDI teeth and tooth surfaces.

Use these when the product needs a clinical selector that still feels like the rest of the field family instead of falling back to one-off custom dropdowns.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj;

export const ToothSelector: Story = {
  render: () => <ToothSelectorDemo />,
};

export const SurfaceSelector: Story = {
  render: () => <SurfaceSelectorDemo />,
};

export const DesignTokens: Story = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["dental-selector"].title}
      tokens={componentTokenDocs["dental-selector"].tokens}
    />
  ),
};
