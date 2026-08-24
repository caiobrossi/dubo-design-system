import type { Meta, StoryObj } from "@storybook/react-vite";
import { PageLayout, type PageLayoutProps } from "@/components/ui/page-layout";
import { LayoutCard } from "@/components/ui/layout-card";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

function DemoPane({
  title,
  lines = 3,
  className,
}: {
  title: string;
  lines?: number;
  className?: string;
}) {
  return (
    <LayoutCard className={className}>
      <div className="flex flex-col gap-4">
        <div className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
          {title}
        </div>
        <div className="flex flex-col gap-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className="h-3 rounded-full bg-[var(--color-hover)]"
              style={{ width: `${88 - index * 12}%` }}
            />
          ))}
        </div>
      </div>
    </LayoutCard>
  );
}

const meta = {
  title: "Components/PageLayout",
  component: PageLayout as unknown as Meta<PageLayoutProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PageLayout** — page composition primitive for 1-column and split-column page structures.

Use it when you need consistent layout ratios for content blocks instead of rebuilding ad-hoc grid wrappers.

### Layout presets
- \`full\` → single 100% pane
- \`halves\` → 50 / 50 split
- \`sidebar-left\` → 25 / 75 split
- \`sidebar-right\` → 75 / 25 split
- \`two-thirds-left\` → 66 / 33 split
- \`two-thirds-right\` → 33 / 66 split
- \`fixed-sidebar-left\` → fixed 420px left pane + fluid content
- \`fixed-sidebar-right\` → fluid content + fixed 420px right pane

### Pair with LayoutCard
- PageLayout is structural only
- pair it with \`LayoutCard\` or another content wrapper
- default gap between panes is 8px
        `,
      },
    },
  },
  argTypes: {
    layout: {
      control: "select",
      options: [
        "full",
        "halves",
        "sidebar-left",
        "sidebar-right",
        "two-thirds-left",
        "two-thirds-right",
        "fixed-sidebar-left",
        "fixed-sidebar-right",
      ],
    },
  },
  args: {
    layout: "halves",
  },
} satisfies Meta<PageLayoutProps>;

export default meta;
type Story = StoryObj<PageLayoutProps>;

export const Playground: Story = {
  render: (args) => (
    <PageLayout {...args}>
      <DemoPane title="Primary content" lines={4} />
      {args.layout !== "full" ? <DemoPane title="Secondary content" lines={3} /> : null}
    </PageLayout>
  ),
};

export const FullWidth: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="full">
      <DemoPane title="Full-width content" lines={5} />
    </PageLayout>
  ),
};

export const Halves: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="halves">
      <DemoPane title="Left block" />
      <DemoPane title="Right block" />
    </PageLayout>
  ),
};

export const SidebarLeft: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="sidebar-left">
      <DemoPane title="Sidebar" lines={2} />
      <DemoPane title="Main content" lines={5} />
    </PageLayout>
  ),
};

export const SidebarRight: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="sidebar-right">
      <DemoPane title="Main content" lines={5} />
      <DemoPane title="Sidebar" lines={2} />
    </PageLayout>
  ),
};

export const TwoThirdsLeft: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="two-thirds-left">
      <DemoPane title="66%" lines={5} />
      <DemoPane title="33%" lines={2} />
    </PageLayout>
  ),
};

export const TwoThirdsRight: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="two-thirds-right">
      <DemoPane title="33%" lines={2} />
      <DemoPane title="66%" lines={5} />
    </PageLayout>
  ),
};

export const FixedSidebarLeft: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="fixed-sidebar-left">
      <DemoPane title="Fixed sidebar" lines={2} className="h-full" />
      <DemoPane title="Fluid content" lines={5} className="h-full" />
    </PageLayout>
  ),
};

export const FixedSidebarRight: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <PageLayout layout="fixed-sidebar-right">
      <DemoPane title="Fluid content" lines={5} className="h-full" />
      <DemoPane title="Fixed sidebar" lines={2} className="h-full" />
    </PageLayout>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["page-layout"].title}
      tokens={componentTokenDocs["page-layout"].tokens}
    />
  ),
};
