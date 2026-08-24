"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Mail, Search, AlertCircle, User, Lock, Calendar } from "@/lib/icons";
import { Input, FloatingInput, type InputProps } from "@/components/ui/input";

const meta: Meta<InputProps> = {
  title: "Components/Input",
  component: Input as any,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Input** — Dubo Design System component.

Two styles built from the shared field recipe, reusing the same spacing, radius, typography, and state tokens.

### Styles
| Style | Height | Border-radius | Use |
|---|---|---|---|
| \`Input\` | 40px (\`--height-control-md\`) | 8px (\`--radius-control-input\`) | Standard text input with label above |
| \`FloatingInput\` | 56px (\`--size-14\`) | 16px (\`--radius-scale-xl\`) | Floating label that animates inside→top |

### Variants
- \`outline\` — border + surface bg (default)
- \`filled\` — subtle gray bg, no border

### Features
- Icon left / right / both
- Suffix content such as duration units
- Error state (red border + error text)
- Disabled (40% opacity)
- Help text below
- All HTML input types
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
  },
  args: {
    variant: "outline",
    label: "Email address",
    placeholder: "you@example.com",
    helpText: "",
    error: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<InputProps>;

// ─── Playground Standard ──────────────────────────────────────────────────────

export const PlaygroundStandard: Story = {
  name: "Playground — Standard",
  render: (args: InputProps) => (
    <div className="max-w-sm">
      <Input {...args} />
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
  },
  args: {
    variant: "outline",
    label: "Email address",
    helpText: "",
    error: false,
    disabled: false,
  },
  render: (args: InputProps) => (
    <div className="max-w-sm">
      <FloatingInput
        label={(args.label as string) || "Email address"}
        variant={args.variant}
        helpText={args.helpText}
        error={args.error}
        disabled={args.disabled}
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
      <Input variant="outline" label="Full name" placeholder="John Doe" />
      <Input variant="outline" label="Email" placeholder="you@example.com" icon={<Mail />} />
      <Input
        variant="outline"
        label="Search"
        placeholder="Search patients..."
        icon={<Search />}
        iconRight={<AlertCircle />}
      />
      <Input
        variant="outline"
        label="Email"
        placeholder="you@example.com"
        error
        helpText="Please enter a valid email"
        iconRight={<AlertCircle />}
      />
      <Input variant="outline" label="Full name" placeholder="John Doe" disabled />
    </div>
  ),
};

// ─── Standard Filled ──────────────────────────────────────────────────────────

export const StandardFilled: Story = {
  name: "Standard — Filled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <Input variant="filled" label="Full name" placeholder="John Doe" />
      <Input variant="filled" label="Email" placeholder="you@example.com" icon={<Mail />} />
      <Input variant="filled" label="Search" placeholder="Search patients..." icon={<Search />} />
      <Input
        variant="filled"
        label="Email"
        placeholder="you@example.com"
        error
        helpText="Please enter a valid email"
        iconRight={<AlertCircle />}
      />
      <Input variant="filled" label="Full name" placeholder="John Doe" disabled />
    </div>
  ),
};

// ─── Floating Outline ─────────────────────────────────────────────────────────

export const FloatingOutline: Story = {
  name: "Floating — Outline",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingInput variant="outline" label="Full name" />
      <FloatingInput variant="outline" label="Email address" icon={<Mail />} />
      <FloatingInput variant="outline" label="Search" icon={<Search />} />
      <FloatingInput
        variant="outline"
        label="Email"
        error
        helpText="Please enter a valid email"
        iconRight={<AlertCircle />}
      />
      <FloatingInput variant="outline" label="Full name" disabled />
    </div>
  ),
};

// ─── Floating Filled ──────────────────────────────────────────────────────────

export const FloatingFilled: Story = {
  name: "Floating — Filled",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex max-w-md flex-col gap-6">
      <FloatingInput variant="filled" label="Full name" />
      <FloatingInput variant="filled" label="Email address" icon={<Mail />} />
      <FloatingInput variant="filled" label="Search" icon={<Search />} />
      <FloatingInput
        variant="filled"
        label="Email"
        error
        helpText="Please enter a valid email"
        iconRight={<AlertCircle />}
      />
      <FloatingInput variant="filled" label="Full name" disabled />
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Icons can be placed left, right, or both sides on either input style.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <Input label="Icon left" placeholder="Search..." icon={<Search />} />
          <Input label="Icon right" placeholder="you@example.com" iconRight={<Mail />} />
          <Input
            label="Both sides"
            placeholder="Search patients..."
            icon={<Search />}
            iconRight={<AlertCircle />}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingInput label="Search" icon={<Search />} />
          <FloatingInput label="Email address" iconRight={<Mail />} />
          <FloatingInput label="Username" icon={<User />} iconRight={<AlertCircle />} />
        </div>
      </div>
    </div>
  ),
};

// ─── Suffix ───────────────────────────────────────────────────────────────────

export const Suffix: Story = {
  name: "Suffix",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Use suffix for compact units that should stay visually attached to the value, such as appointment duration in minutes.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <Input
            variant="filled"
            label="Duração"
            placeholder="30"
            inputMode="numeric"
            suffix="min"
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingInput variant="filled" label="Duração" inputMode="numeric" suffix="min" />
        </div>
      </div>
    </div>
  ),
};

// ─── Error States ─────────────────────────────────────────────────────────────

export const ErrorStates: Story = {
  name: "Error States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Error state applies red border and colors the helpText red." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <Input
            label="Email"
            placeholder="you@example.com"
            error
            helpText="Please enter a valid email address"
            iconRight={<AlertCircle />}
          />
          <Input
            label="Password"
            type="password"
            error
            helpText="Password must be at least 8 characters"
            icon={<Lock />}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingInput
            label="Email"
            error
            helpText="Please enter a valid email address"
            iconRight={<AlertCircle />}
          />
          <FloatingInput
            label="Password"
            error
            helpText="Password must be at least 8 characters"
            icon={<Lock />}
          />
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
      description: { story: "Disabled state — 40% opacity, no pointer events." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <Input label="Full name" placeholder="John Doe" disabled />
          <Input
            variant="filled"
            label="Email"
            placeholder="you@example.com"
            disabled
            icon={<Mail />}
          />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingInput label="Full name" disabled />
          <FloatingInput variant="filled" label="Email address" disabled icon={<Mail />} />
        </div>
      </div>
    </div>
  ),
};

// ─── Input Types ──────────────────────────────────────────────────────────────

export const InputTypes: Story = {
  name: "Input Types",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "HTML input types — text, email, password, number, date, tel." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <Input label="Text" type="text" placeholder="Enter text..." />
          <Input label="Email" type="email" placeholder="you@example.com" icon={<Mail />} />
          <Input label="Password" type="password" placeholder="Enter password..." icon={<Lock />} />
          <Input label="Number" type="number" placeholder="0" />
          <Input label="Date" type="date" icon={<Calendar />} />
          <Input label="Telephone" type="tel" placeholder="+1 (555) 000-0000" />
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating Input
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingInput label="Text" type="text" />
          <FloatingInput label="Email" type="email" icon={<Mail />} />
          <FloatingInput label="Password" type="password" icon={<Lock />} />
          <FloatingInput label="Number" type="number" />
          <FloatingInput label="Date" type="date" icon={<Calendar />} />
          <FloatingInput label="Telephone" type="tel" />
        </div>
      </div>
    </div>
  ),
};

// ─── Floating Animation ───────────────────────────────────────────────────────

function FloatingAnimationDemo() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const updateValue = (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
        <p className="mb-6 text-body-md font-semibold text-[color:var(--color-text-primary)]">
          Patient Registration Form
        </p>
        <div className="flex max-w-lg flex-col gap-5">
          <FloatingInput
            label="Full name"
            icon={<User />}
            value={values.name}
            onChange={updateValue("name")}
          />
          <FloatingInput
            label="Email address"
            type="email"
            icon={<Mail />}
            value={values.email}
            onChange={updateValue("email")}
          />
          <FloatingInput
            label="Phone number"
            type="tel"
            value={values.phone}
            onChange={updateValue("phone")}
          />
          <FloatingInput label="Address" value={values.address} onChange={updateValue("address")} />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
        <p className="mb-6 text-body-md font-semibold text-[color:var(--color-text-primary)]">
          Login: Filled variant
        </p>
        <div className="flex max-w-sm flex-col gap-5">
          <FloatingInput variant="filled" label="Email" icon={<Mail />} />
          <FloatingInput variant="filled" label="Password" type="password" icon={<Lock />} />
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8">
        <p className="mb-6 text-body-md font-semibold text-[color:var(--color-text-primary)]">
          Mixed states: click into each field to see the label animate
        </p>
        <div className="grid max-w-2xl grid-cols-2 gap-5">
          <FloatingInput label="First name" />
          <FloatingInput label="Last name" />
          <FloatingInput label="Email" icon={<Mail />} />
          <FloatingInput label="Phone" />
          <FloatingInput label="City" />
          <FloatingInput label="ZIP code" type="number" />
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
          "The star of the show — click into each floating input to see the label animate from center to top. The animation uses pure CSS peer selectors with `duration-200 ease-out`.",
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
      title={componentTokenDocs["input"].title}
      tokens={componentTokenDocs["input"].tokens}
    />
  ),
};
