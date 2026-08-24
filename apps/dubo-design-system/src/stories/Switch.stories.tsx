"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch, type SwitchProps } from "@/components/ui/switch";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Switch",
  component: Switch as unknown as Meta<SwitchProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Switch** — Dubo Design System toggle control built on \`@radix-ui/react-switch\`.

Reuses shared sizing and semantic tokens for heights, color, and typography. Switch-specific tokens are limited to track widths, thumb widths, and the 3D shadow treatment.

### Sizes
| Size | Track height | Track width | Thumb (w \u00d7 h) |
|---|---|---|---|
| \`sm\` | var(--size-4) 16px | 28px | 14px \u00d7 var(--size-3) 12px |
| \`default\` | var(--size-5) 20px | 36px | 18px \u00d7 var(--size-4) 16px |
| \`lg\` | var(--size-6) 24px | 51px | 27px \u00d7 var(--size-5) 20px |

### States
| State | Description |
|---|---|
| \`unchecked\` | Muted track (border-input color) |
| \`checked\` | Success-colored (green) track with slide animation |
| \`disabled\` | 40% opacity, no interaction |

### Features
- Label and description text support
- Smooth slide transition on thumb
- 3D inner shadow overlay on track (matches existing Dubo switch)
- Full keyboard and screen reader support (Radix)
        `,
      },
    },
  },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    label: { control: "text" },
    description: { control: "text" },
  },
} satisfies Meta<SwitchProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ── */

export const Playground: Story = {
  args: {
    label: "Enable notifications",
    description: "Receive push notifications for new appointments.",
    checked: false,
    disabled: false,
    size: "default",
  },
  render: function PlaygroundRender(args) {
    const [checked, setChecked] = React.useState(args.checked ?? false);

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    return <Switch {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

/* ── All States ── */

export const AllStates: Story = {
  name: "All States",
  render: function AllStatesRender() {
    const [on, setOn] = React.useState(true);
    return (
      <div className="flex flex-col gap-6">
        <Switch label="Unchecked" />
        <Switch label="Checked" checked={on} onCheckedChange={setOn} />
        <Switch label="Disabled unchecked" disabled />
        <Switch label="Disabled checked" disabled defaultChecked />
      </div>
    );
  },
};

/* ── Sizes ── */

export const Sizes: Story = {
  name: "Sizes",
  render: function SizesRender() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="w-20 text-body-sm text-[color:var(--color-text-secondary)]">Small</span>
          <Switch size="sm" defaultChecked />
          <Switch size="sm" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-body-sm text-[color:var(--color-text-secondary)]">Default</span>
          <Switch size="default" defaultChecked />
          <Switch size="default" />
        </div>
        <div className="flex items-center gap-4">
          <span className="w-20 text-body-sm text-[color:var(--color-text-secondary)]">Large</span>
          <Switch size="lg" defaultChecked />
          <Switch size="lg" />
        </div>
      </div>
    );
  },
};

/* ── With Label ── */

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="flex flex-col gap-6">
      <Switch label="Dark mode" defaultChecked />
      <Switch label="Auto-save" />
    </div>
  ),
};

/* ── With Description ── */

export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <div className="flex flex-col gap-6">
      <Switch
        label="Email notifications"
        description="Receive emails about new appointments and cancellations."
        defaultChecked
      />
      <Switch
        label="SMS reminders"
        description="Send text message reminders 24 hours before appointments."
      />
    </div>
  ),
};

/* ── Disabled ── */

export const Disabled: Story = {
  name: "Disabled",
  render: () => (
    <div className="flex flex-col gap-6">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
      <Switch
        label="Disabled with description"
        description="This setting is managed by your administrator."
        disabled
        defaultChecked
      />
    </div>
  ),
};

/* ── Design Tokens ── */

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["switch"].title}
      tokens={componentTokenDocs["switch"].tokens}
    />
  ),
};
