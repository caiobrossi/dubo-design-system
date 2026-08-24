"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Popover",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Popover** — Dubo Design System component (shadcn-based).

Floating content panel built on \`@radix-ui/react-popover\` with frosted glass styling.

### Sub-components
- \`Popover\` — root context provider
- \`PopoverTrigger\` — element that opens the popover
- \`PopoverContent\` — the floating panel
- \`PopoverAnchor\` — optional anchor element
- \`PopoverClose\` — optional close button

### Features
- 4 side positions: top, right, bottom, left
- 3 alignment options: start, center, end
- Frosted glass background with backdrop blur
- Optional arrow pointing to trigger
- Smooth enter/exit animations
- Shared overlay glass recipe tokens for radius, border, blur, saturate, and shadow
        `,
      },
    },
  },
};

export default meta;

// ── Playground ──

export const Playground: StoryObj = {
  render: () => (
    <div className="flex h-[300px] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-3">
            <p
              className="text-[color:var(--color-text-primary)]"
              style={{ fontSize: "0.875rem", fontWeight: 600 }}
            >
              Settings
            </p>
            <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Adjust your preferences below.
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// ── Side Variants ──

export const SideVariants: StoryObj = {
  name: "Side Variants",
  render: () => (
    <div className="flex h-[400px] items-center justify-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} className="w-48">
            <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Popover on the <strong>{side}</strong> side.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

// ── Align Variants ──

export const AlignVariants: StoryObj = {
  name: "Align Variants",
  render: () => (
    <div className="flex h-[300px] items-center justify-center gap-4">
      {(["start", "center", "end"] as const).map((align) => (
        <Popover key={align}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              align={align}
            </Button>
          </PopoverTrigger>
          <PopoverContent align={align} className="w-48">
            <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Aligned to <strong>{align}</strong>.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

// ── With Arrow ──

export const WithArrow: StoryObj = {
  name: "With Arrow",
  render: () => (
    <div className="flex h-[300px] items-center justify-center gap-4">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Popover key={side}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              {side}
            </Button>
          </PopoverTrigger>
          <PopoverContent side={side} showArrow className="w-48">
            <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
              Arrow on <strong>{side}</strong>.
            </p>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  ),
};

// ── Form Example ──

export const FormExample: StoryObj = {
  name: "Form Example",
  render: () => (
    <div className="flex h-[400px] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Set dimensions</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="flex flex-col gap-4">
            <div>
              <p
                className="text-[color:var(--color-text-primary)]"
                style={{ fontSize: "0.875rem", fontWeight: 600 }}
              >
                Dimensions
              </p>
              <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Label className="w-16 shrink-0">Width</Label>
                <Input defaultValue="100%" />
              </div>
              <div className="flex items-center gap-3">
                <Label className="w-16 shrink-0">Height</Label>
                <Input defaultValue="25px" />
              </div>
              <div className="flex items-center gap-3">
                <Label className="w-16 shrink-0">Max W.</Label>
                <Input defaultValue="300px" />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  ),
};

// ─── Design Tokens ───

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["popover"].title}
      tokens={componentTokenDocs["popover"].tokens}
    />
  ),
};
