import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Separator, type SeparatorProps } from "@/components/ui/separator";

const meta = {
  title: "Components/Separator",
  component: Separator as unknown as Meta<SeparatorProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Separator** — Dubo Design System divider.

Built on \`@radix-ui/react-separator\`. Uses \`--color-border\` for color, decorative by default.

### Orientations
- \`horizontal\` (default) — full-width 1px line
- \`vertical\` — full-height 1px line

### Label support
Pass a \`label\` prop for centered text dividers (horizontal only).
        `,
      },
    },
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
    label: { control: "text" },
    decorative: { control: "boolean" },
  },
  args: {
    orientation: "horizontal",
    decorative: true,
  },
} satisfies Meta<SeparatorProps>;

export default meta;
type Story = StoryObj<SeparatorProps>;

export const Playground: Story = {};

export const Horizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-md">
      <p className="text-body-md text-[color:var(--color-text-primary)]">Section above</p>
      <Separator />
      <p className="text-body-md text-[color:var(--color-text-primary)]">Section below</p>
    </div>
  ),
};

export const Vertical: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex h-[40px] items-center gap-4">
      <span className="text-body-md text-[color:var(--color-text-primary)]">Left</span>
      <Separator orientation="vertical" />
      <span className="text-body-md text-[color:var(--color-text-primary)]">Right</span>
    </div>
  ),
};

export const WithLabel: Story = {
  name: "With Label",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <Separator label="OR" />
      <Separator label="Continue with" />
      <Separator label="Section divider" />
    </div>
  ),
};

export const InCard: Story = {
  name: "Inside Card",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-[320px] flex-col gap-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[24px]">
      <h3 className="text-body-lg font-[600] text-[color:var(--color-text-primary)]">Patient Info</h3>
      <Separator />
      <div className="flex flex-col gap-2">
        <p className="text-body-md text-[color:var(--color-text-secondary)]">Name: John Doe</p>
        <p className="text-body-md text-[color:var(--color-text-secondary)]">DOB: 1990-01-15</p>
      </div>
      <Separator />
      <div className="flex items-center gap-3">
        <span className="text-body-md text-[color:var(--color-text-secondary)]">Active</span>
        <Separator orientation="vertical" className="h-[16px]" />
        <span className="text-body-md text-[color:var(--color-text-secondary)]">Insurance</span>
        <Separator orientation="vertical" className="h-[16px]" />
        <span className="text-body-md text-[color:var(--color-text-secondary)]">3 visits</span>
      </div>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["separator"].title}
      tokens={componentTokenDocs["separator"].tokens}
    />
  ),
};
