"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { ChevronDown, X } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FloatingFieldTrigger, type FloatingFieldTriggerProps } from "@/components/ui/field-trigger";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

type Story = StoryObj<FloatingFieldTriggerProps>;

const meta: Meta<FloatingFieldTriggerProps> = {
  title: "Components/FieldTrigger",
  component: FloatingFieldTrigger,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**FieldTrigger** — floating-label field shell for controls that visually behave like a form field but semantically open a richer surface such as a dialog or picker.

### Features
- Floating label aligned with Select and FloatingInput
- Open/closed visual state
- Supports rich content such as chips, summaries, or entity labels
- Keeps trailing trigger icon aligned to the field language
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
    open: { control: "boolean" },
    hasValue: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helpText: { control: "text" },
  },
  args: {
    label: "Tipo de procedimento",
    variant: "filled",
    open: false,
    hasValue: false,
    disabled: false,
    error: false,
    helpText: "",
  },
};

export default meta;

function PlaygroundDemo(args: FloatingFieldTriggerProps) {
  const [open, setOpen] = useState(args.open ?? false);
  const hasValue = args.hasValue ?? false;

  return (
    <div className="max-w-md">
      <FloatingFieldTrigger
        {...args}
        open={open}
        hasValue={hasValue}
        onClick={() => setOpen((current) => !current)}
        triggerIcon={<ChevronDown className={open ? "rotate-180" : undefined} />}
      >
        {hasValue ? (
          <div className="flex min-w-0 items-center gap-2">
            <span className="truncate">47 - Biópsias</span>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="size-6 shrink-0 text-[color:var(--color-text-muted)]"
              onClick={(event) => event.stopPropagation()}
            >
              <X className="size-4" />
            </Button>
          </div>
        ) : null}
      </FloatingFieldTrigger>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <PlaygroundDemo {...args} />,
};

export const EmptyState: Story = {
  name: "Empty State",
  parameters: { controls: { disable: true } },
  render: () => (
    <PlaygroundDemo
      label="Tipo de procedimento"
      variant="filled"
      open={false}
      hasValue={false}
    />
  ),
};

export const WithValue: Story = {
  name: "With Value",
  parameters: { controls: { disable: true } },
  render: () => (
    <PlaygroundDemo
      label="Tipo de procedimento"
      variant="filled"
      open={false}
      hasValue
    />
  ),
};

export const WithChips: Story = {
  name: "With Chips",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-md">
      <FloatingFieldTrigger
        label="Tipo de procedimento"
        variant="filled"
        hasValue
        triggerIcon={<ChevronDown />}
      >
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="info1" intensity="soft" size="default">
            Biópsias
          </Badge>
          <Badge variant="info1" intensity="soft" size="default">
            Exodontia simples
          </Badge>
        </div>
      </FloatingFieldTrigger>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["field-trigger"].title}
      tokens={componentTokenDocs["field-trigger"].tokens}
    />
  ),
};
