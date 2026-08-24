"use client";

import { useState, useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress, type ProgressProps } from "@/components/ui/progress";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Progress",
  component: Progress as unknown as Meta<ProgressProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Progress** — Dubo Design System component (shadcn-based).

Linear progress bar with animated fill, driven by CSS custom properties.

### Variants
| Variant | Color | Token |
|---|---|---|
| \`default\` | Brand blue | \`--color-brand\` |
| \`brand\` | Brand blue | \`--color-brand\` |
| \`success\` | Green | \`--color-success\` |
| \`warning\` | Amber | \`--color-warning\` |
| \`danger\` | Red | \`--color-danger\` |

### Sizes
| Size | Height |
|---|---|
| \`sm\` | 4px |
| \`default\` | 8px |
| \`lg\` | 12px |

### Features
- Animated fill transition
- Indeterminate shimmer animation
- Optional label and percentage display
- Full border radius (9999px)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
    value: {
      control: { type: "range", min: 0, max: 100, step: 1 },
    },
    indeterminate: { control: "boolean" },
    showPercentage: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    variant: "default",
    size: "default",
    value: 60,
    indeterminate: false,
    showPercentage: false,
    label: "",
  },
} satisfies Meta<ProgressProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Playground ──

export const Playground: Story = {
  render: (args: ProgressProps) => (
    <div style={{ maxWidth: "400px" }}>
      <Progress {...args} />
    </div>
  ),
};

// ── All Variants ──

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      {(["default", "success", "warning", "danger", "brand"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-1">
          <span
            className="text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "0.75rem", fontWeight: 500, textTransform: "capitalize" }}
          >
            {variant}
          </span>
          <Progress variant={variant} value={65} />
        </div>
      ))}
    </div>
  ),
};

// ── Sizes ──

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      {(["sm", "default", "lg"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-1">
          <span
            className="text-[color:var(--color-text-secondary)]"
            style={{ fontSize: "0.75rem", fontWeight: 500 }}
          >
            {size === "sm" ? "Small (4px)" : size === "default" ? "Default (8px)" : "Large (12px)"}
          </span>
          <Progress size={size} value={55} />
        </div>
      ))}
    </div>
  ),
};

// ── With Label ──

export const WithLabel: Story = {
  name: "With Label",
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      <Progress label="Upload progress" value={45} />
      <Progress label="Storage used" value={78} showPercentage />
      <Progress label="Processing" value={90} showPercentage variant="success" />
    </div>
  ),
};

// ── With Percentage ──

export const WithPercentage: Story = {
  name: "With Percentage",
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      <Progress value={25} showPercentage />
      <Progress value={50} showPercentage variant="success" />
      <Progress value={75} showPercentage variant="warning" />
      <Progress value={95} showPercentage variant="danger" />
    </div>
  ),
};

// ── Indeterminate ──

export const Indeterminate: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      <div className="flex flex-col gap-1">
        <span
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          Default
        </span>
        <Progress indeterminate />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          Success
        </span>
        <Progress indeterminate variant="success" />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          Warning
        </span>
        <Progress indeterminate variant="warning" />
      </div>
      <div className="flex flex-col gap-1">
        <span
          className="text-[color:var(--color-text-secondary)]"
          style={{ fontSize: "0.75rem", fontWeight: 500 }}
        >
          Danger
        </span>
        <Progress indeterminate variant="danger" />
      </div>
    </div>
  ),
};

// ── Animated ──

function AnimatedDemo() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex flex-col gap-4" style={{ maxWidth: "400px" }}>
      <Progress value={value} showPercentage label="Uploading file..." variant="brand" size="lg" />
    </div>
  );
}

export const Animated: Story = {
  render: () => <AnimatedDemo />,
};

// ── Status Examples ──

export const StatusExamples: Story = {
  name: "Status Examples",
  render: () => (
    <div className="flex flex-col gap-6" style={{ maxWidth: "400px" }}>
      <Progress label="Patients synced" value={100} variant="success" showPercentage size="lg" />
      <Progress label="Storage" value={82} variant="warning" showPercentage size="lg" />
      <Progress label="API limit" value={96} variant="danger" showPercentage size="lg" />
      <Progress label="Backup" indeterminate variant="brand" size="lg" />
    </div>
  ),
};

// ─── Design Tokens ───

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["progress"].title}
      tokens={componentTokenDocs["progress"].tokens}
    />
  ),
};
