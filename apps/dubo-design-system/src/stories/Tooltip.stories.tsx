"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Plus, Info, HelpCircle, Settings, Copy, Trash2 } from "@/lib/icons";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Tooltip** — Dubo Design System component (Radix-based).

All visual properties are driven by shared inverted-surface, spacing, radius, and caption typography tokens.

### Positioning
| Side | Description |
|---|---|
| \`top\` | Above the trigger (default) |
| \`right\` | To the right of the trigger |
| \`bottom\` | Below the trigger |
| \`left\` | To the left of the trigger |

### Features
- Arrow indicator (toggleable via \`showArrow\`)
- Configurable open delay (default 200ms via Provider)
- Configurable skip delay for fast tooltip hopping
- Smooth enter/exit animations using design token transitions
- Dark inverted surface with automatic dark mode inversion
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <TooltipProvider delayDuration={200} skipDelayDuration={100}>
        <div className="flex min-h-[200px] items-center justify-center p-12">
          <Story />
        </div>
      </TooltipProvider>
    ),
  ],
};
export default meta;

type Story = StoryObj;

/* ── Playground ── */
export const Playground: Story = {
  render: () => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <HelpCircle />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>This is a tooltip</p>
      </TooltipContent>
    </Tooltip>
  ),
};

/* ── Positioning ── */
export const Positioning: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-6">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} defaultOpen>
          <TooltipTrigger asChild>
            <Button variant="outline">{side}</Button>
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p>Tooltip on {side}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/* ── With Arrow vs Without ── */
export const ArrowToggle: Story = {
  name: "Arrow / No Arrow",
  render: () => (
    <div className="flex items-center gap-6">
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">With arrow</Button>
        </TooltipTrigger>
        <TooltipContent showArrow>
          <p>Has an arrow</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip defaultOpen>
        <TooltipTrigger asChild>
          <Button variant="outline">No arrow</Button>
        </TooltipTrigger>
        <TooltipContent showArrow={false}>
          <p>No arrow</p>
        </TooltipContent>
      </Tooltip>
    </div>
  ),
};

/* ── Icon Button Tooltips ── */
export const IconButtons: Story = {
  name: "Icon Button Tooltips",
  render: () => (
    <div className="flex items-center gap-3">
      {[
        { icon: <Plus />, label: "Add patient" },
        { icon: <Copy />, label: "Copy to clipboard" },
        { icon: <Settings />, label: "Settings" },
        { icon: <Trash2 />, label: "Delete" },
      ].map(({ icon, label }) => (
        <Tooltip key={label}>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              {icon}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
};

/* ── Multiline Content ── */
export const MultilineContent: Story = {
  render: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger asChild>
        <Button variant="outline">
          <Info /> Hover me
        </Button>
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px]">
        <p>
          This tooltip has longer content that wraps across multiple lines for detailed
          descriptions.
        </p>
      </TooltipContent>
    </Tooltip>
  ),
};

/* ── Custom Delay ── */
export const CustomDelay: Story = {
  name: "Custom Delay (0ms)",
  render: () => (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Instant tooltip</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Opens immediately (0ms delay)</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

/* ── Design Tokens ── */
export const DesignTokens: Story = {
  name: "Design Tokens",
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["tooltip"].title}
      tokens={componentTokenDocs["tooltip"].tokens}
    />
  ),
};
