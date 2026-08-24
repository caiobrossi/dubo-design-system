"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Bold, Italic, Underline, Star, Heart, Bookmark, Pin, Bell, Eye } from "@/lib/icons";
import { Toggle, type ToggleProps } from "@/components/ui/toggle";

const meta = {
  title: "Components/Toggle",
  component: Toggle as unknown as Meta<ToggleProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Toggle** — Dubo Design System component built on \`@radix-ui/react-toggle\`.

A pill-shaped two-state button (on/off). Depending on the variant, the pressed state can be subtle or emphatic.

### Variants
| Variant | Use |
|---|---|
| \`default\` | Ghost-like — no border, transparent bg |
| \`outline\` | With 1px border |
| \`choice\` | Choice/answer pill with strong active state |

### Sizes
- \`sm\` -> 32px — compact contexts
- \`default\` -> 40px — standard forms
- \`lg\` -> 48px — prominent controls

### Pressed state
- Background: \`--color-brand-subtle\` (brand-50)
- Text: \`--color-brand\` (brand-500)
- Outline variant also gets brand border
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "choice"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    disabled: { control: "boolean" },
    pressed: { control: "boolean" },
  },
  args: {
    variant: "default",
    size: "default",
    disabled: false,
  },
} satisfies Meta<ToggleProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ---- Playground ----

export const Playground: Story = {
  render: function PlaygroundRender(args) {
    const [pressed, setPressed] = React.useState(false);
    return (
      <Toggle {...args} pressed={pressed} onPressedChange={setPressed}>
        <Bold /> Bold
      </Toggle>
    );
  },
};

// ---- All Variants ----

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Default, outline, and choice variants." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default variant
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle>
            <Bold /> Bold
          </Toggle>
          <Toggle pressed>
            <Italic /> Italic
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline variant
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="outline">
            <Bold /> Bold
          </Toggle>
          <Toggle variant="outline" pressed>
            <Italic /> Italic
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Choice variant
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="choice">
            <Bold /> Sim
          </Toggle>
          <Toggle variant="choice" pressed>
            <Italic /> Nao
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

// ---- Sizes ----

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "3 sizes: sm (32px), default (40px), lg (48px)." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Small</span>
        <Toggle size="sm">
          <Bold /> Bold
        </Toggle>
        <Toggle size="sm" variant="outline">
          <Italic /> Italic
        </Toggle>
        <Toggle size="sm" variant="choice" pressed>
          <Star /> Choice
        </Toggle>
        <Toggle size="sm" pressed>
          <Star /> Star
        </Toggle>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Default</span>
        <Toggle>
          <Bold /> Bold
        </Toggle>
        <Toggle variant="outline">
          <Italic /> Italic
        </Toggle>
        <Toggle variant="choice" pressed>
          <Star /> Choice
        </Toggle>
        <Toggle pressed>
          <Star /> Star
        </Toggle>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Large</span>
        <Toggle size="lg">
          <Bold /> Bold
        </Toggle>
        <Toggle size="lg" variant="outline">
          <Italic /> Italic
        </Toggle>
        <Toggle size="lg" variant="choice" pressed>
          <Star /> Choice
        </Toggle>
        <Toggle size="lg" pressed>
          <Star /> Star
        </Toggle>
      </div>
    </div>
  ),
};

// ---- With Icons ----

export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Toggle with icons on inline-start, inline-end, and icon-only." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Icon start
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle>
            <Star /> Favorite
          </Toggle>
          <Toggle variant="outline">
            <Heart /> Like
          </Toggle>
          <Toggle pressed>
            <Bookmark /> Saved
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Icon end
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle>
            Pin <Pin />
          </Toggle>
          <Toggle variant="outline">
            Notify <Bell />
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Icon only
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle size="sm" aria-label="Bold">
            <Bold />
          </Toggle>
          <Toggle aria-label="Italic">
            <Italic />
          </Toggle>
          <Toggle size="lg" aria-label="Underline">
            <Underline />
          </Toggle>
          <Toggle pressed aria-label="Favorite">
            <Star />
          </Toggle>
          <Toggle variant="outline" aria-label="Watch">
            <Eye />
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

// ---- Pressed State ----

export const PressedState: Story = {
  name: "Pressed State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Pressed/on state comparison across variants." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Default: unpressed vs pressed
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle>
            <Star /> Unpressed
          </Toggle>
          <Toggle pressed>
            <Star /> Pressed
          </Toggle>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline: unpressed vs pressed
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Toggle variant="outline">
            <Star /> Unpressed
          </Toggle>
          <Toggle variant="outline" pressed>
            <Star /> Pressed
          </Toggle>
        </div>
      </div>
    </div>
  ),
};

// ---- Disabled ----

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Disabled state -- 40% opacity, no pointer events." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle disabled>
        <Bold /> Default
      </Toggle>
      <Toggle disabled pressed>
        <Bold /> Pressed
      </Toggle>
      <Toggle disabled variant="outline">
        <Bold /> Outline
      </Toggle>
      <Toggle disabled variant="outline" pressed>
        <Bold /> Outline Pressed
      </Toggle>
    </div>
  ),
};

// ---- Design Tokens ----

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["toggle"].title}
      tokens={componentTokenDocs["toggle"].tokens}
    />
  ),
};
