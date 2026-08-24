import type { Meta, StoryObj } from "@storybook/react-vite";

import { LayoutCard, type LayoutCardProps } from "@/components/ui/layout-card";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

const meta = {
  title: "Components/LayoutCard",
  component: LayoutCard as unknown as Meta<LayoutCardProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**LayoutCard** — quiet panel wrapper for page content.

Use it inside \`PageLayout\` when a page area needs its own surface, border, radius, and padding without pushing those styles into the layout primitive itself.
        `,
      },
    },
  },
} satisfies Meta<LayoutCardProps>;

export default meta;
type Story = StoryObj<LayoutCardProps>;

export const Playground: Story = {
  render: (args) => (
    <div className="bg-[var(--color-bg-page)] p-8">
      <LayoutCard {...args}>
        <div className="flex flex-col gap-4">
          <div className="text-heading-3 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            Panel title
          </div>
          <div className="flex flex-col gap-2">
            <div className="h-3 w-40 rounded-full bg-[var(--color-hover)]" />
            <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
            <div className="h-3 w-[72%] rounded-full bg-[var(--color-hover)]" />
          </div>
        </div>
      </LayoutCard>
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["layout-card"].title}
      tokens={componentTokenDocs["layout-card"].tokens}
    />
  ),
};
