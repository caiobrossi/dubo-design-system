"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { FloatingDateField, type FloatingDateFieldProps } from "@/components/ui/date-field";
import { SegmentControl, SegmentItem } from "@/components/ui/segment-control";

type Story = StoryObj<FloatingDateFieldProps>;

const meta: Meta<FloatingDateFieldProps> = {
  title: "Components/DateField",
  component: FloatingDateField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DateField** — floating date entry field for Dubo forms.

Built for flows where users may either type the date directly or open the calendar to choose it visually.

### Features
- Floating label aligned with Input and Select
- Typing without manually inserting separators
- Supports \`dd/MM/yyyy\`, \`MM/dd/yyyy\`, and \`yyyy-MM-dd\`
- Calendar popup from the trailing icon
- Clearable and modal-safe via \`portalContainer\`
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
    dateFormat: {
      control: "select",
      options: ["dd/MM/yyyy", "MM/dd/yyyy", "yyyy-MM-dd"],
    },
    clearable: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    helpText: { control: "text" },
  },
  args: {
    variant: "filled",
    label: "Data",
    dateFormat: "dd/MM/yyyy",
    clearable: false,
    error: false,
    disabled: false,
    helpText: "",
  },
};

export default meta;

function PlaygroundDemo(args: FloatingDateFieldProps) {
  const [value, setValue] = useState<Date | undefined>();

  return (
    <div className="max-w-sm">
      <FloatingDateField {...args} value={value} onChange={setValue} />
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
  render: () => <PlaygroundDemo label="Data" variant="filled" clearable />,
};

export const Outline: Story = {
  name: "Outline",
  parameters: { controls: { disable: true } },
  render: () => <PlaygroundDemo label="Data" variant="outline" />,
};

function DuboSettingsDemo() {
  const [value, setValue] = useState<Date | undefined>(new Date(2026, 3, 1));
  const [dateFormat, setDateFormat] = useState<"dd/MM/yyyy" | "MM/dd/yyyy" | "yyyy-MM-dd">(
    "dd/MM/yyyy"
  );
  const [weekStartsOn, setWeekStartsOn] = useState<0 | 1 | 6>(1);

  return (
    <div className="flex max-w-md flex-col gap-4">
      <div className="flex flex-col gap-2">
        <span className="text-body-md font-medium text-default-font">dateFormat</span>
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
        <span className="text-body-md font-medium text-default-font">weekStartsOn</span>
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
        calendarProps={{ weekStartsOn }}
        clearable
      />
    </div>
  );
}

export const DuboSettings: Story = {
  name: "Dubo Settings",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Reference for product adapters such as AppointmentDateField: the field stays generic while the app passes dateFormat and weekStartsOn from user settings.",
      },
    },
  },
  render: () => <DuboSettingsDemo />,
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["date-field"].title}
      tokens={componentTokenDocs["date-field"].tokens}
    />
  ),
};
