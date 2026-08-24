"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Checkbox, CheckboxGroup, type CheckboxProps } from "@/components/ui/checkbox";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox as unknown as Meta<CheckboxProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Checkbox** — Dubo Design System component built on \`@radix-ui/react-checkbox\`.

All visual properties are driven by shared semantic CSS custom properties from design-tokens.

### States
| State | Description |
|---|---|
| \`unchecked\` | Default empty state |
| \`checked\` | Filled with brand color + checkmark |
| \`indeterminate\` | Filled with brand color + dash |
| \`disabled\` | 40% opacity, no interaction |
| \`invalid\` | Red border, optional error message |

### Features
- Label and description text
- CheckboxGroup for grouping with shared label/error
- Horizontal and vertical layouts
- Full keyboard and screen reader support (Radix)
        `,
      },
    },
  },
  argTypes: {
    checked: {
      control: "select",
      options: [true, false, "indeterminate"],
    },
    disabled: { control: "boolean" },
    invalid: { control: "boolean" },
    label: { control: "text" },
    description: { control: "text" },
    errorMessage: { control: "text" },
  },
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ── */

export const Playground: Story = {
  args: {
    label: "Accept terms and conditions",
    description: "You agree to our Terms of Service and Privacy Policy.",
    checked: false,
    disabled: false,
    invalid: false,
    errorMessage: "",
  },
  render: function PlaygroundRender(args) {
    const [checked, setChecked] = React.useState<boolean | "indeterminate">(args.checked ?? false);

    React.useEffect(() => {
      setChecked(args.checked ?? false);
    }, [args.checked]);

    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

/* ── All States ── */

export const AllStates: Story = {
  name: "All States",
  render: function AllStatesRender() {
    return (
      <div className="flex flex-col gap-6">
        <Checkbox label="Unchecked" />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" checked="indeterminate" />
        <Checkbox label="Disabled unchecked" disabled />
        <Checkbox label="Disabled checked" disabled defaultChecked />
        <Checkbox label="Invalid" invalid errorMessage="This field is required" />
        <Checkbox
          label="Invalid checked"
          invalid
          defaultChecked
          errorMessage="Selection not allowed"
        />
      </div>
    );
  },
};

/* ── With Description ── */

export const WithDescription: Story = {
  name: "With Description",
  render: () => (
    <div className="flex flex-col gap-6">
      <Checkbox
        label="Marketing emails"
        description="Receive emails about new products, features, and offers."
      />
      <Checkbox
        label="Security emails"
        description="Receive alerts about your account security."
        defaultChecked
      />
    </div>
  ),
};

/* ── Checkbox Group — Vertical ── */

export const GroupVertical: Story = {
  name: "Group (Vertical)",
  render: function GroupVerticalRender() {
    return (
      <CheckboxGroup
        label="Notifications"
        helpText="Choose which notifications you want to receive."
      >
        <Checkbox label="Push notifications" defaultChecked />
        <Checkbox label="Email notifications" />
        <Checkbox label="SMS notifications" />
      </CheckboxGroup>
    );
  },
};

/* ── Checkbox Group — Horizontal ── */

export const GroupHorizontal: Story = {
  name: "Group (Horizontal)",
  render: () => (
    <CheckboxGroup label="Specialties" horizontal>
      <Checkbox label="Orthodontics" defaultChecked />
      <Checkbox label="Endodontics" />
      <Checkbox label="Periodontics" />
      <Checkbox label="Prosthodontics" />
    </CheckboxGroup>
  ),
};

/* ── Group with Error ── */

export const GroupWithError: Story = {
  name: "Group with Error",
  render: () => (
    <CheckboxGroup label="Terms" error errorMessage="You must accept at least one option.">
      <Checkbox label="I accept the Terms of Service" invalid />
      <Checkbox label="I accept the Privacy Policy" invalid />
    </CheckboxGroup>
  ),
};

/* ── Disabled Group ── */

export const DisabledGroup: Story = {
  name: "Disabled Group",
  render: () => (
    <CheckboxGroup label="Unavailable options">
      <Checkbox label="Option A" disabled defaultChecked />
      <Checkbox label="Option B" disabled />
      <Checkbox label="Option C" disabled />
    </CheckboxGroup>
  ),
};

/* ── Indeterminate (parent-child) ── */

export const IndeterminateDemo: Story = {
  name: "Indeterminate (Parent/Child)",
  render: function IndeterminateDemoRender() {
    const [items, setItems] = React.useState([true, false, false]);

    const allChecked = items.every(Boolean);
    const someChecked = items.some(Boolean);
    const parentChecked = allChecked ? true : someChecked ? "indeterminate" : false;

    function handleParent(checked: boolean | "indeterminate") {
      const newVal = checked === "indeterminate" ? false : Boolean(checked);
      setItems([newVal, newVal, newVal]);
    }

    function handleChild(index: number, checked: boolean | "indeterminate") {
      setItems((prev) => {
        const next = [...prev];
        next[index] = Boolean(checked);
        return next;
      });
    }

    return (
      <div className="flex flex-col gap-2">
        <Checkbox
          label="Select all"
          checked={parentChecked as boolean | "indeterminate"}
          onCheckedChange={handleParent}
        />
        <div className="ml-6 flex flex-col gap-2">
          <Checkbox
            label="Cleaning"
            checked={items[0]}
            onCheckedChange={(c) => handleChild(0, c)}
          />
          <Checkbox
            label="Whitening"
            checked={items[1]}
            onCheckedChange={(c) => handleChild(1, c)}
          />
          <Checkbox label="Filling" checked={items[2]} onCheckedChange={(c) => handleChild(2, c)} />
        </div>
      </div>
    );
  },
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["checkbox"].title}
      tokens={componentTokenDocs["checkbox"].tokens}
    />
  ),
};
