"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
  Underline,
} from "@/lib/icons";
import { ToggleGroup, ToggleGroupItem, type ToggleGroupProps } from "@/components/ui/toggle-group";

const meta = {
  title: "Components/ToggleGroup",
  component: ToggleGroup as unknown as Meta<ToggleGroupProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**ToggleGroup** — Dubo Design System component built on \`@radix-ui/react-toggle-group\`.

Groups multiple toggle buttons for single or multiple selection. Items inherit variant and size from the parent group via context.

### Types
| Type | Description |
|---|---|
| \`single\` | Only one item can be active at a time |
| \`multiple\` | Multiple items can be active simultaneously |

### Orientations
- \`horizontal\` (default) — items flow left to right
- \`vertical\` — items stack top to bottom

### Variants & Sizes
Inherited from Toggle: \`default\` / \`outline\` / \`choice\`, \`sm\` / \`default\` / \`lg\`, plus shared \`--space-1\` group spacing.
        `,
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["single", "multiple"],
    },
    variant: {
      control: "select",
      options: ["default", "outline", "choice"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    type: "single",
    variant: "default",
    size: "default",
    orientation: "horizontal",
  },
} satisfies Meta<ToggleGroupProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Playground ----

export const Playground: Story = {
  args: {
    type: "single",
  },
  render: function PlaygroundRender(args: Record<string, unknown>) {
    return (
      <ToggleGroup {...(args as any)} type="single" defaultValue="center">
        <ToggleGroupItem value="left" aria-label="Left aligned">
          <AlignLeft />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Center aligned">
          <AlignCenter />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Right aligned">
          <AlignRight />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justified">
          <AlignJustify />
        </ToggleGroupItem>
      </ToggleGroup>
    );
  },
};

// ---- Single Selection ----

export const SingleSelection: Story = {
  name: "Single Selection",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Only one item can be active at a time (type="single").' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default variant
        </p>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline variant
        </p>
        <ToggleGroup type="single" variant="outline" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Choice variant
        </p>
        <ToggleGroup type="single" variant="choice" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            Sim
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            Talvez
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            Nao
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ---- Multiple Selection ----

export const MultipleSelection: Story = {
  name: "Multiple Selection",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: 'Multiple items can be active simultaneously (type="multiple").' },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Text formatting: multiple selection
        </p>
        <ToggleGroup type="multiple" defaultValue={["bold", "italic"]}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
          <ToggleGroupItem value="strikethrough" aria-label="Strikethrough">
            <Strikethrough />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline variant: multiple selection
        </p>
        <ToggleGroup type="multiple" variant="outline" defaultValue={["bold"]}>
          <ToggleGroupItem value="bold" aria-label="Bold">
            <Bold />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <Italic />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <Underline />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ---- Sizes ----

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "3 sizes inherited from Toggle: sm (32px), default (40px), lg (48px).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Small</span>
        <ToggleGroup type="single" size="sm" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Default</span>
        <ToggleGroup type="single" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Large</span>
        <ToggleGroup type="single" size="lg" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ---- With Text Labels ----

export const WithTextLabels: Story = {
  name: "With Text Labels",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Toggle group items with icon + text labels." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <ToggleGroup type="single" defaultValue="unordered">
        <ToggleGroupItem value="unordered">
          <List /> Bullet list
        </ToggleGroupItem>
        <ToggleGroupItem value="ordered">
          <ListOrdered /> Numbered list
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" variant="outline" defaultValue="left">
        <ToggleGroupItem value="left">
          <AlignLeft /> Left
        </ToggleGroupItem>
        <ToggleGroupItem value="center">
          <AlignCenter /> Center
        </ToggleGroupItem>
        <ToggleGroupItem value="right">
          <AlignRight /> Right
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  ),
};

// ---- Vertical Orientation ----

export const VerticalOrientation: Story = {
  name: "Vertical Orientation",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Vertical stacking for sidebar or toolbar layouts." },
    },
  },
  render: () => (
    <div className="flex gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default
        </p>
        <ToggleGroup type="single" orientation="vertical" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline
        </p>
        <ToggleGroup type="single" variant="outline" orientation="vertical" defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ---- Disabled ----

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Individual items or entire group can be disabled." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Entire group disabled
        </p>
        <ToggleGroup type="single" disabled defaultValue="center">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center">
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Single item disabled
        </p>
        <ToggleGroup type="single" defaultValue="left">
          <ToggleGroupItem value="left" aria-label="Left">
            <AlignLeft />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Center" disabled>
            <AlignCenter />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Right">
            <AlignRight />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  ),
};

// ---- Design Tokens ----

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["toggle-group"].title}
      tokens={componentTokenDocs["toggle-group"].tokens}
    />
  ),
};
