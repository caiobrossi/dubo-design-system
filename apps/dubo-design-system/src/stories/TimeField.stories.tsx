"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { FloatingTimeField, type FloatingTimeFieldProps } from "@/components/ui/time-field";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";

type Story = StoryObj<FloatingTimeFieldProps>;

const meta: Meta<FloatingTimeFieldProps> = {
  title: "Components/TimeField",
  component: FloatingTimeField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**TimeField** — floating time input for scheduling-style flows.

Built for fast manual typing and a secondary popup picker with hour/minute lists.

### Features
- Type only digits and let the field insert \`:\`
- Invalid values are clamped into valid hours/minutes
- Popup time selector from the trailing clock icon
- Minute-step control for 5, 10, or 15 minute grids
- Same floating label rhythm as Input, Select, and DateField
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    label: { control: "text" },
    clearable: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    helpText: { control: "text" },
    minuteStep: {
      control: "select",
      options: [5, 10, 15],
    },
  },
  args: {
    variant: "filled",
    label: "Horário de início",
    clearable: false,
    error: false,
    disabled: false,
    helpText: "",
    minuteStep: 5,
  },
};

export default meta;

function PlaygroundDemo(args: FloatingTimeFieldProps) {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-sm">
      <FloatingTimeField {...args} value={value} onChange={setValue} />
    </div>
  );
}

export const Playground: Story = {
  name: "Playground",
  render: (args) => <PlaygroundDemo {...args} />,
};

export const Filled: Story = {
  name: "Filled",
  parameters: { controls: { disable: true } },
  render: () => <PlaygroundDemo label="Horário de início" variant="filled" clearable />,
};

export const Outline: Story = {
  name: "Outline",
  parameters: { controls: { disable: true } },
  render: () => <PlaygroundDemo label="Horário de início" variant="outline" />,
};

function MinuteStepDemo() {
  const [value, setValue] = useState("10:30");
  const [minuteStep, setMinuteStep] = useState<5 | 10 | 15>(5);

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-body-md font-medium text-default-font">minuteStep</span>
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
    </div>
  );
}

export const MinuteSteps: Story = {
  name: "Minute Steps",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "The popup can follow different minute grids without changing the field semantics or manual typing behavior.",
      },
    },
  },
  render: () => <MinuteStepDemo />,
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["time-field"].title}
      tokens={componentTokenDocs["time-field"].tokens}
    />
  ),
};
