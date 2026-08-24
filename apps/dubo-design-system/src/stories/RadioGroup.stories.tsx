"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { RadioGroup, RadioGroupItem, type RadioGroupProps } from "@/components/ui/radio-group";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup as unknown as Meta<RadioGroupProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**RadioGroup** — Dubo Design System radio selection component.

Built on \`@radix-ui/react-radio-group\`. Reuses the shared field-selection, label, and description tokens used across Dubo form controls.

### Shared tokens
| Token | Usage |
|---|---|
| \`--color-border-input\` | Unchecked border |
| \`--color-border-active\` | Hover + checked border |
| \`--color-bg-active\` | Inner dot fill |
| \`--color-danger\` | Invalid state |
| \`--type-body-md-* + --font-weight-400\` | Group label styling |
| \`--label-*\` | Item label text styling |
| \`--description-*\` | Description and help text styling |
        `,
      },
    },
  },
  argTypes: {
    horizontal: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    label: { control: "text" },
    helpText: { control: "text" },
  },
  args: {
    horizontal: false,
    error: false,
  },
} satisfies Meta<RadioGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-1">
      <RadioGroupItem value="option-1" label="Option 1" />
      <RadioGroupItem value="option-2" label="Option 2" />
      <RadioGroupItem value="option-3" label="Option 3" />
    </RadioGroup>
  ),
};

// ─── With Group Label ─────────────────────────────────────────────────────────

export const WithGroupLabel: Story = {
  name: "With Group Label",
  render: () => (
    <RadioGroup defaultValue="email" label="Notification method">
      <RadioGroupItem value="email" label="Email" />
      <RadioGroupItem value="sms" label="SMS" />
      <RadioGroupItem value="push" label="Push notification" />
    </RadioGroup>
  ),
};

// ─── With Description ─────────────────────────────────────────────────────────

export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <RadioGroup defaultValue="standard" label="Appointment type">
      <RadioGroupItem
        value="standard"
        label="Standard"
        description="Regular 30-minute appointment"
      />
      <RadioGroupItem
        value="extended"
        label="Extended"
        description="60-minute comprehensive session"
      />
      <RadioGroupItem
        value="emergency"
        label="Emergency"
        description="Urgent same-day appointment"
      />
    </RadioGroup>
  ),
};

// ─── Horizontal ───────────────────────────────────────────────────────────────

export const Horizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="day" label="View" horizontal>
      <RadioGroupItem value="day" label="Day" />
      <RadioGroupItem value="week" label="Week" />
      <RadioGroupItem value="month" label="Month" />
    </RadioGroup>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="active" label="Status" disabled>
      <RadioGroupItem value="active" label="Active" />
      <RadioGroupItem value="inactive" label="Inactive" />
      <RadioGroupItem value="archived" label="Archived" />
    </RadioGroup>
  ),
};

// ─── Disabled Item ────────────────────────────────────────────────────────────

export const DisabledItem: Story = {
  name: "Disabled Item",
  render: () => (
    <RadioGroup defaultValue="free" label="Plan">
      <RadioGroupItem value="free" label="Free" description="Basic features" />
      <RadioGroupItem value="pro" label="Pro" description="All features" />
      <RadioGroupItem value="enterprise" label="Enterprise" description="Coming soon" disabled />
    </RadioGroup>
  ),
};

// ─── Invalid / Error ──────────────────────────────────────────────────────────

export const Invalid: Story = {
  name: "Invalid / Error",
  render: () => (
    <RadioGroup label="Gender" error errorMessage="Please select an option">
      <RadioGroupItem value="male" label="Male" invalid />
      <RadioGroupItem value="female" label="Female" invalid />
      <RadioGroupItem value="other" label="Other" invalid />
    </RadioGroup>
  ),
};

// ─── With Help Text ───────────────────────────────────────────────────────────

export const WithHelpText: Story = {
  name: "With Help Text",
  render: () => (
    <RadioGroup
      defaultValue="email"
      label="Preferred contact"
      helpText="We will only use this for appointment reminders"
    >
      <RadioGroupItem value="email" label="Email" />
      <RadioGroupItem value="phone" label="Phone" />
      <RadioGroupItem value="sms" label="SMS" />
    </RadioGroup>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["radio-group"].title}
      tokens={componentTokenDocs["radio-group"].tokens}
    />
  ),
};
