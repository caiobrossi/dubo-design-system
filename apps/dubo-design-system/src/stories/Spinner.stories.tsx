import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Spinner, type SpinnerProps } from "@/components/ui/spinner";

const meta = {
  title: "Components/Spinner",
  component: Spinner as unknown as Meta<SpinnerProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Spinner** — Dubo Design System loading indicator.

CSS-only wave bars loader. All visual properties driven by design tokens.

### Sizes
- \`sm\` → 16px — inline, beside text
- \`default\` → 24px — buttons, small areas
- \`lg\` → 32px — card loading
- \`xl\` → 40px — page loading

### Colors
- \`default\` → muted gray (--color-text-muted)
- \`brand\` → brand blue (--color-brand)
- \`inherit\` → currentColor (adapts to parent)
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
    },
    color: {
      control: "select",
      options: ["default", "brand", "inherit"],
    },
    label: { control: "text" },
  },
  args: {
    size: "default",
    color: "default",
    label: "Loading",
  },
} satisfies Meta<SpinnerProps>;

export default meta;
type Story = StoryObj<SpinnerProps>;

export const Playground: Story = {};

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner size="sm" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="default" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">default (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="lg" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">lg (32px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner size="xl" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">xl (40px)</span>
      </div>
    </div>
  ),
};

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <Spinner color="default" size="lg" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">default</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Spinner color="brand" size="lg" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">brand</span>
      </div>
      <div className="flex flex-col items-center gap-2 text-[color:var(--color-danger)]">
        <Spinner color="inherit" size="lg" />
        <span className="text-body-sm text-[color:var(--color-text-muted)]">inherit (red parent)</span>
      </div>
    </div>
  ),
};

export const InlineWithText: Story = {
  name: "Inline With Text",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 text-body-md text-[color:var(--color-text-secondary)]">
        <Spinner size="sm" color="brand" /> Loading patients&hellip;
      </div>
      <div className="flex items-center gap-2 text-body-lg text-[color:var(--color-text-primary)]">
        <Spinner size="default" color="brand" /> Processing request&hellip;
      </div>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["spinner"].title}
      tokens={componentTokenDocs["spinner"].tokens}
    />
  ),
};
