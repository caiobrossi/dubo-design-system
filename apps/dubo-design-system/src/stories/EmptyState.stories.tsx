import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@/components/ui/button";
import { EmptyState, type EmptyStateProps } from "@/components/ui/empty-state";
import { EmptyStateIllustration } from "@/components/docs/empty-state-illustration";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/EmptyState",
  component: EmptyState as unknown as Meta<EmptyStateProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**EmptyState** — Dubo Design System component for empty or zero-data moments.

Use it when a section, card, or page has no content to show yet. The component keeps the pattern consistent: illustration container, illustration, concise title, optional description, and optional action.

### Sizes
- \`default\` → 128px illustration container, ideal for card and page empty states
- \`compact\` → 100px illustration container, useful for denser surfaces

### Content strategy
- **title** is required and should stay short
- **description** is optional for extra guidance
- **action** is optional when the user can recover immediately
- **illustration** can be a custom React node or an image path from \`public\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["compact", "default"],
    },
    title: { control: "text" },
    description: { control: "text" },
  },
  args: {
    size: "default",
    title: "No results found",
    description: "Try adjusting your filters or creating a new record.",
  },
} satisfies Meta<EmptyStateProps>;

export default meta;
type Story = StoryObj<EmptyStateProps>;

export const Playground: Story = {
  render: ({ title, description, size, className }: EmptyStateProps) => (
    <EmptyState
      title={title}
      description={description}
      size={size}
      className={className}
      illustration={<EmptyStateIllustration tone="search" />}
      action={<Button size="sm">Create item</Button>}
    />
  ),
};

export const Compact: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-sm">
      <EmptyState
        size="compact"
        illustration={<EmptyStateIllustration tone="tasks" />}
        title="No tasks to display"
      />
    </div>
  ),
};

export const WithDescription: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-md">
      <EmptyState
        illustration={<EmptyStateIllustration tone="search" />}
        title="No results found"
        description="We couldn’t find anything that matches the current filters."
      />
    </div>
  ),
};

export const WithAction: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="max-w-md">
      <EmptyState
        illustration={<EmptyStateIllustration tone="tasks" />}
        title="Your task list is empty"
        description="Start by creating your first task for today."
        action={<Button>Create task</Button>}
      />
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["empty-state"].title}
      tokens={componentTokenDocs["empty-state"].tokens}
    />
  ),
};
