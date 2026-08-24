import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataDisplay, DataDisplayItem, type DataDisplayProps } from "@/components/ui/data-display";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";

const meta = {
  title: "Components/DataDisplay",
  component: DataDisplay,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**DataDisplay** — structured label/value list for summary details, metadata blocks, and footer-like information groups.

Use it when you need repeated rows with a calm divider, label on the left, and value on the right.

### Core behaviors
- wrapper with built-in dividers
- item row with label/value layout
- 40px and 48px height options via shared control tokens
- no component-specific design tokens
        `,
      },
    },
  },
} satisfies Meta<DataDisplayProps>;

export default meta;

type Story = StoryObj<DataDisplayProps>;

export const Playground: Story = {
  render: () => (
    <DataDisplay className="max-w-xl">
      <DataDisplayItem label="Patient" value="Ana Martins" />
      <DataDisplayItem label="Phone" value="+351 910 000 000" />
      <DataDisplayItem label="Next appointment" value="14 Mar 2026, 10:30" />
      <DataDisplayItem label="Balance" value="€120.00" />
    </DataDisplay>
  ),
};

export const LargeRows: Story = {
  render: () => (
    <DataDisplay className="max-w-xl">
      <DataDisplayItem size="lg" label="Treatment plan" value="Orthodontic follow-up" />
      <DataDisplayItem size="lg" label="Responsible doctor" value="Dr. Miguel Costa" />
      <DataDisplayItem size="lg" label="Clinic" value="Dubo Porto" />
    </DataDisplay>
  ),
};

export const MultilineContent: Story = {
  render: () => (
    <DataDisplay className="max-w-xl">
      <DataDisplayItem
        align="start"
        label="Notes"
        value={
          <span className="inline-block max-w-[240px] text-right">
            Patient asked to confirm the estimate and return next week with documentation.
          </span>
        }
      />
      <DataDisplayItem label="Status" value="Pending confirmation" />
    </DataDisplay>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["data-display"].title}
      tokens={componentTokenDocs["data-display"].tokens}
    />
  ),
};
