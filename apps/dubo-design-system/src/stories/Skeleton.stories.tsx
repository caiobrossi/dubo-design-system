import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Skeleton, type SkeletonProps } from "@/components/ui/skeleton";

const meta = {
  title: "Components/Skeleton",
  component: Skeleton as unknown as Meta<SkeletonProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Skeleton** — Dubo Design System loading placeholder.

Pulse animation for content placeholders. Uses \`--color-hover\` for the base fill.

### Variants
- \`text\` → rectangle (default, h=20px, full width)
- \`circle\` → circle (36px)
- \`card\` → rounded rectangle (h=120px, full width, 16px radius)

Width and height can be overridden via className or style props.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circle", "card"],
    },
  },
  args: {
    variant: "text",
  },
} satisfies Meta<SkeletonProps>;

export default meta;
type Story = StoryObj<SkeletonProps>;

export const Playground: Story = {};

export const AllVariants: Story = {
  name: "All Variants",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 max-w-md">
      <div className="flex flex-col gap-2">
        <span className="text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Text
        </span>
        <Skeleton variant="text" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Circle
        </span>
        <div className="flex gap-3">
          <Skeleton variant="circle" />
          <Skeleton variant="circle" className="size-[48px]" />
          <Skeleton variant="circle" className="size-[64px]" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Card
        </span>
        <Skeleton variant="card" />
      </div>
    </div>
  ),
};

export const CardLoadingPattern: Story = {
  name: "Card Loading Pattern",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex w-[320px] flex-col gap-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[24px]">
      <div className="flex items-center gap-3">
        <Skeleton variant="circle" className="size-[40px]" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton variant="text" className="h-[16px] w-3/4" />
          <Skeleton variant="text" className="h-[12px] w-1/2" />
        </div>
      </div>
      <Skeleton variant="text" />
      <Skeleton variant="text" className="w-4/5" />
      <Skeleton variant="card" className="h-[80px]" />
    </div>
  ),
};

export const TableLoadingPattern: Story = {
  name: "Table Loading Pattern",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-3 max-w-lg">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circle" className="size-[32px]" />
          <Skeleton variant="text" className="h-[14px] flex-1" />
          <Skeleton variant="text" className="h-[14px] w-[80px]" />
          <Skeleton variant="text" className="h-[14px] w-[60px]" />
        </div>
      ))}
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["skeleton"].title}
      tokens={componentTokenDocs["skeleton"].tokens}
    />
  ),
};
