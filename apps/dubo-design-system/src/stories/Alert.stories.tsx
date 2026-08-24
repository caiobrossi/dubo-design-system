"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertAction,
  type AlertProps,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { CircleCheck, CircleAlert, AlertTriangle, Info, ShieldCheck } from "@/lib/icons";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Alert",
  component: Alert as unknown as Meta<AlertProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Alert** — Dubo Design System component (v2, ReUI-inspired).

Grid-based alert with composable sub-components and 6 semantic variants.

### Variants
| Variant | Use |
|---|---|
| \`default\` | Neutral message — subtle surface styling |
| \`destructive\` | Error/critical — red tones |
| \`info\` | Informational — brand blue tones |
| \`success\` | Positive feedback — green tones |
| \`warning\` | Warning/caution — amber tones |
| \`invert\` | Dark background — inverted colors |

### Sub-components
- \`Alert\` — root container (CSS grid)
- \`AlertTitle\` — heading text
- \`AlertDescription\` — body text
- \`AlertAction\` — action area (responsive: stacks on mobile, inline on sm+)

### Features
- CSS Grid layout with automatic icon column detection
- Pass any SVG/icon as direct child of Alert (no wrapper needed)
- Responsive action placement
- Composable — mix and match sub-components freely
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "info", "success", "warning", "invert"],
    },
  },
  args: {
    variant: "default",
  },
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Playground ──

export const Playground: Story = {
  render: (args: AlertProps) => (
    <Alert {...args}>
      <Info />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
};

// ── Pattern 1: Basic (title + description) ──

export const Basic: Story = {
  name: "Basic (title + description)",
  render: () => (
    <Alert>
      <AlertTitle>Alert!</AlertTitle>
      <AlertDescription>This is an alert with a title and description.</AlertDescription>
    </Alert>
  ),
};

// ── Pattern 2: With Icon ──

export const WithIcon: Story = {
  name: "With Icon",
  render: () => (
    <Alert>
      <CircleCheck />
      <AlertTitle>Alert!</AlertTitle>
      <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
    </Alert>
  ),
};

// ── Pattern 3: With Icon + Action Buttons ──

export const WithActions: Story = {
  name: "With Actions",
  render: () => (
    <Alert>
      <ShieldCheck />
      <AlertTitle>Security Update</AlertTitle>
      <AlertDescription>Update your password and enable 2FA.</AlertDescription>
      <AlertAction>
        <Button variant="outline" size="sm">
          Dismiss
        </Button>
        <Button size="sm">Update</Button>
      </AlertAction>
    </Alert>
  ),
};

// ── Pattern 4: Destructive with list ──

export const DestructiveWithList: Story = {
  name: "Destructive (with list)",
  render: () => (
    <Alert variant="destructive">
      <CircleAlert />
      <AlertTitle>Payment Failed</AlertTitle>
      <AlertDescription>
        <p>Please check your payment details:</p>
        <ul className="mt-1 list-inside list-disc space-y-0.5 text-body-md">
          <li>Card number and expiry</li>
          <li>Billing address</li>
          <li>Available funds</li>
        </ul>
      </AlertDescription>
    </Alert>
  ),
};

// ── All Status Variants ──

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Alert variant="info">
        <CircleAlert />
        <AlertTitle>Info! Something important</AlertTitle>
        <AlertDescription>This is an important message. Please read it carefully.</AlertDescription>
      </Alert>
      <Alert variant="success">
        <CircleCheck />
        <AlertTitle>Success! All good</AlertTitle>
        <AlertDescription>
          Everything is working as expected. You can continue with your task.
        </AlertDescription>
      </Alert>
      <Alert variant="warning">
        <AlertTriangle />
        <AlertTitle>Warning! Something is wrong</AlertTitle>
        <AlertDescription>
          Please check your settings. If the problem persists, contact support.
        </AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <CircleAlert />
        <AlertTitle>Error! Something went wrong</AlertTitle>
        <AlertDescription>
          Please try again. If the problem persists, contact support.
        </AlertDescription>
      </Alert>
    </div>
  ),
};

// ── Invert Variant ──

export const Invert: Story = {
  name: "Invert",
  render: () => (
    <Alert variant="invert">
      <CircleAlert className="text-[color:var(--color-success)]" />
      <AlertTitle>Notification! All good</AlertTitle>
      <AlertDescription>
        This is a notification alert with a title and description.
      </AlertDescription>
    </Alert>
  ),
};

// ── Title Only ──

export const TitleOnly: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(["default", "info", "success", "warning", "destructive"] as const).map((variant) => (
        <Alert key={variant} variant={variant}>
          <Info />
          <AlertTitle>{variant.charAt(0).toUpperCase() + variant.slice(1)}: title only</AlertTitle>
        </Alert>
      ))}
    </div>
  ),
};

// ─── Design Tokens ───

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["alert"].title}
      tokens={componentTokenDocs["alert"].tokens}
    />
  ),
};
