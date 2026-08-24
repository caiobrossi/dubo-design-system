"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { TextArea, FloatingTextArea, type TextAreaProps } from "@/components/ui/textarea";

const meta = {
  title: "Components/TextArea",
  component: TextArea as unknown as Meta<TextAreaProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**TextArea** — Dubo Design System component.

Two styles built from the same shared field recipe as Input, reusing the radius, spacing, helper text, and state tokens.

### Styles
| Style | Min Height | Border-radius | Use |
|---|---|---|---|
| \`TextArea\` | 120px (composed from \`--size-24\` + \`--space-6\`) | 8px (\`--radius-control-input\`) | Standard textarea with label above |
| \`FloatingTextArea\` | 120px (same shared composition) | 16px (\`--radius-scale-xl\`) | Floating label that animates inside→top |

### Variants
- \`outline\` — border + surface bg (default)
- \`filled\` — subtle gray bg, no border

### Features
- Clearable (X button)
- Error state (red border + error text)
- Disabled (40% opacity)
- Help text below
- Character count (with optional maxLength)
- Auto-resize to fit content
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
    helpText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    showCount: { control: "boolean" },
    autoResize: { control: "boolean" },
    clearable: { control: "boolean" },
  },
  args: {
    variant: "outline",
    label: "Description",
    placeholder: "Enter a description...",
    helpText: "",
    error: false,
    disabled: false,
    showCount: false,
    autoResize: false,
    clearable: false,
  },
} satisfies Meta<TextAreaProps>;

export default meta;
type Story = StoryObj<TextAreaProps>;

// ─── Playground Standard ──────────────────────────────────────────────────────

export const PlaygroundStandard: Story = {
  name: "Playground — Standard",
  render: (args: TextAreaProps) => (
    <div className="max-w-sm">
      <TextArea {...args} />
    </div>
  ),
};

// ─── Playground Floating ──────────────────────────────────────────────────────

export const PlaygroundFloating: Story = {
  name: "Playground — Floating",
  argTypes: {
    label: { control: "text" },
    variant: { control: "select", options: ["outline", "filled"] },
    helpText: { control: "text" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    showCount: { control: "boolean" },
    autoResize: { control: "boolean" },
    clearable: { control: "boolean" },
  },
  args: {
    variant: "outline",
    label: "Description",
    helpText: "",
    error: false,
    disabled: false,
  },
  render: (args: TextAreaProps) => (
    <div className="max-w-sm">
      <FloatingTextArea
        label={(args.label as string) || "Description"}
        variant={args.variant}
        helpText={args.helpText}
        error={args.error}
        disabled={args.disabled}
        showCount={args.showCount}
        autoResize={args.autoResize}
        clearable={args.clearable}
      />
    </div>
  ),
};

// ─── Standard Outline ─────────────────────────────────────────────────────────

export const StandardOutline: Story = {
  name: "Standard — Outline",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <TextArea variant="outline" label="Notes" placeholder="Add clinical notes..." />
      <TextArea
        variant="outline"
        label="Description"
        placeholder="Describe the treatment..."
        helpText="Be as specific as possible"
      />
      <TextArea
        variant="outline"
        label="Notes"
        placeholder="Add notes..."
        error
        helpText="This field is required"
      />
      <TextArea variant="outline" label="Notes" placeholder="Add notes..." disabled />
    </div>
  ),
};

// ─── Standard Filled ──────────────────────────────────────────────────────────

export const StandardFilled: Story = {
  name: "Standard — Filled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <TextArea variant="filled" label="Notes" placeholder="Add clinical notes..." />
      <TextArea
        variant="filled"
        label="Description"
        placeholder="Describe the treatment..."
        helpText="Be as specific as possible"
      />
      <TextArea
        variant="filled"
        label="Notes"
        placeholder="Add notes..."
        error
        helpText="This field is required"
      />
      <TextArea variant="filled" label="Notes" placeholder="Add notes..." disabled />
    </div>
  ),
};

// ─── Floating Outline ─────────────────────────────────────────────────────────

export const FloatingOutline: Story = {
  name: "Floating — Outline",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingTextArea variant="outline" label="Clinical notes" />
      <FloatingTextArea
        variant="outline"
        label="Treatment description"
        helpText="Be as specific as possible"
      />
      <FloatingTextArea variant="outline" label="Notes" error helpText="This field is required" />
      <FloatingTextArea variant="outline" label="Notes" disabled />
    </div>
  ),
};

// ─── Floating Filled ──────────────────────────────────────────────────────────

export const FloatingFilled: Story = {
  name: "Floating — Filled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingTextArea variant="filled" label="Clinical notes" />
      <FloatingTextArea
        variant="filled"
        label="Treatment description"
        helpText="Be as specific as possible"
      />
      <FloatingTextArea variant="filled" label="Notes" error helpText="This field is required" />
      <FloatingTextArea variant="filled" label="Notes" disabled />
    </div>
  ),
};

// ─── Character Count ──────────────────────────────────────────────────────────

function CharacterCountDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-6">
      <TextArea
        label="Bio"
        placeholder="Tell us about yourself..."
        showCount
        maxLength={200}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FloatingTextArea label="Bio" showCount maxLength={200} />
    </div>
  );
}

export const CharacterCount: Story = {
  name: "Character Count",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Character count shows current length and optional maxLength. Turns red when exceeding maxLength.",
      },
    },
  },
  render: () => <CharacterCountDemo />,
};

// ─── Auto Resize ──────────────────────────────────────────────────────────────

function AutoResizeDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-6">
      <TextArea
        label="Auto-resize standard"
        placeholder="Start typing and the textarea will grow..."
        autoResize
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <FloatingTextArea label="Auto-resize floating" autoResize />
    </div>
  );
}

export const AutoResize: Story = {
  name: "Auto Resize",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Auto-resize adjusts the textarea height to fit its content. Uses a useEffect that resets height then reads scrollHeight.",
      },
    },
  },
  render: () => <AutoResizeDemo />,
};

// ─── Clearable ────────────────────────────────────────────────────────────────

function ClearableDemo() {
  const [value, setValue] = useState("Some pre-filled text that can be cleared");
  return (
    <div className="flex max-w-md flex-col gap-6">
      <TextArea
        label="Clearable standard"
        placeholder="Type something..."
        clearable
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onClear={() => setValue("")}
      />
      <FloatingTextArea label="Clearable floating" clearable />
    </div>
  );
}

export const Clearable: Story = {
  name: "Clearable",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Clearable shows an X button when the textarea has a value. Click to clear the content.",
      },
    },
  },
  render: () => <ClearableDemo />,
};

// ─── Error States ─────────────────────────────────────────────────────────────

export const ErrorStates: Story = {
  name: "Error States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Error state applies red border and colors the helpText red.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard TextArea
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <TextArea
            label="Notes"
            placeholder="Add notes..."
            error
            helpText="This field is required"
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating TextArea
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingTextArea label="Notes" error helpText="This field is required" />
        </div>
      </div>
    </div>
  ),
};

// ─── Disabled States ──────────────────────────────────────────────────────────

export const DisabledStates: Story = {
  name: "Disabled States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Disabled state — 40% opacity, no pointer events.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard TextArea
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <TextArea label="Notes" placeholder="Add notes..." disabled />
          <TextArea variant="filled" label="Description" placeholder="Describe..." disabled />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating TextArea
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingTextArea label="Notes" disabled />
          <FloatingTextArea variant="filled" label="Description" disabled />
        </div>
      </div>
    </div>
  ),
};

// ─── Floating Animation ───────────────────────────────────────────────────────

function FloatingAnimationDemo() {
  const [values, setValues] = useState({
    notes: "",
    description: "",
    feedback: "",
  });

  const updateValue =
    (field: keyof typeof values) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
        <p className="mb-6 text-body-md font-semibold text-[color:var(--color-text-primary)]">
          Patient Notes Form
        </p>
        <div className="flex max-w-lg flex-col gap-5">
          <FloatingTextArea
            label="Clinical notes"
            value={values.notes}
            onChange={updateValue("notes")}
            showCount
            maxLength={500}
          />
          <FloatingTextArea
            label="Treatment description"
            value={values.description}
            onChange={updateValue("description")}
            autoResize
          />
          <FloatingTextArea
            label="Patient feedback"
            value={values.feedback}
            onChange={updateValue("feedback")}
            clearable
            onClear={() => setValues((prev) => ({ ...prev, feedback: "" }))}
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
        <p className="mb-6 text-body-md font-semibold text-[color:var(--color-text-primary)]">
          Filled variant
        </p>
        <div className="flex max-w-sm flex-col gap-5">
          <FloatingTextArea variant="filled" label="Clinical notes" />
          <FloatingTextArea variant="filled" label="Treatment description" />
        </div>
      </div>
    </div>
  );
}

export const FloatingAnimation: Story = {
  name: "Floating Animation",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Click into each floating textarea to see the label animate from inside to top. The animation uses pure CSS peer selectors with `duration-200 ease-out`.",
      },
    },
  },
  render: () => <FloatingAnimationDemo />,
};

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["textarea"].title}
      tokens={componentTokenDocs["textarea"].tokens}
    />
  ),
};
