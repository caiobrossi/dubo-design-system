"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Card** — Container component for grouping related content.

### Variants
| Variant | Use |
|---|---|
| \`base\` | White background with subtle border — main content grouping card |
| \`faded\` | Frosted glass effect — translucent background with backdrop blur |

### Shadow Options
| Shadow | Use |
|---|---|
| \`none\` | Default flat card |
| \`sm\` / \`md\` / \`lg\` | Progressive elevations |
| \`xl\` | Strong floating shadow, based on the Quick Links popover |

### Sub-components
- \`Card\` — root container
- \`CardHeader\` — top section (title + description)
- \`CardTitle\` — heading text
- \`CardDescription\` — subtitle text
- \`CardContent\` — main content area
- \`CardFooter\` — bottom actions area

### Design Tokens
Card reuses shared surface, border, radius, shadow, and glass tokens directly. Only layout composition stays in the component layer.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["base", "faded"],
      description: "Visual style of the card",
    },
    shadow: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl"],
      description: "Optional elevation shadow",
    },
  },
};

export default meta;

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj = {
  args: {
    variant: "base",
    shadow: "none",
  },
  render: (args: Record<string, unknown>) => (
    <Card
      variant={args.variant as "base" | "faded"}
      shadow={args.shadow as "none" | "sm" | "md" | "lg" | "xl"}
      className="max-w-sm"
    >
      <CardHeader>
        <CardTitle>Patient Overview</CardTitle>
        <CardDescription>Summary of the patient record and recent activity.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md text-[color:var(--color-text-secondary)]">
          Last visit was 3 days ago. Next appointment scheduled for tomorrow at 14:00.
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm">
          View details
        </Button>
        <Button size="sm">Schedule</Button>
      </CardFooter>
    </Card>
  ),
};

// ─── All Variants ────────────────────────────────────────────────────────────

export const AllVariants: StoryObj = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      <Card className="max-w-sm">
        <CardHeader>
          <CardTitle>Base variant</CardTitle>
          <CardDescription>Solid white background with subtle border.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            The default card style for grouping page content.
          </p>
        </CardContent>
      </Card>

      <Card variant="faded" className="max-w-sm">
        <CardHeader>
          <CardTitle>Faded variant</CardTitle>
          <CardDescription>Frosted glass with translucent background.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Creates a frosted/glass-like effect so the page background shows through.
          </p>
        </CardContent>
      </Card>

      <Card shadow="xl" className="max-w-sm">
        <CardHeader>
          <CardTitle>Strong shadow</CardTitle>
          <CardDescription>Uses the new reusable shadow based on Quick Links.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Good for floating palettes, rich overlays, and stronger emphasis moments.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

// ─── With Footer Actions ─────────────────────────────────────────────────────

export const WithFooterActions: StoryObj = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Confirm Action</CardTitle>
        <CardDescription>Are you sure you want to proceed with this operation?</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md text-[color:var(--color-text-secondary)]">
          This action cannot be undone. All associated data will be permanently removed.
        </p>
      </CardContent>
      <CardFooter className="justify-end">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button variant="destructive" size="sm">
          Delete
        </Button>
      </CardFooter>
    </Card>
  ),
};

// ─── Minimal Card ────────────────────────────────────────────────────────────

export const Minimal: StoryObj = {
  render: () => (
    <Card className="max-w-xs">
      <CardContent>
        <p className="text-body-md text-[color:var(--color-text-secondary)]">
          A simple card with only content and no header or footer.
        </p>
      </CardContent>
    </Card>
  ),
};

// ─── Faded on colored background ─────────────────────────────────────────────

export const FadedOnBackground: StoryObj = {
  render: () => (
    <div
      className="rounded-2xl p-8"
      style={{
        background:
          "linear-gradient(135deg, var(--color-brand-subtle), var(--color-accent-subtle))",
      }}
    >
      <Card variant="faded" className="max-w-sm">
        <CardHeader>
          <CardTitle>Faded on gradient</CardTitle>
          <CardDescription>
            The frosted glass effect is most visible on colored backgrounds.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Use the faded variant when the card sits on top of a gradient or image.
          </p>
        </CardContent>
      </Card>
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["card"].title}
      tokens={componentTokenDocs["card"].tokens}
    />
  ),
};
