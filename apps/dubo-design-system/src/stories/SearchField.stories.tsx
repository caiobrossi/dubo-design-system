"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { SearchField, type SearchFieldProps } from "@/components/ui/search-field";

const meta: Meta<SearchFieldProps> = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**SearchField** — Dubo Design System component.

Pill-shaped search input built on top of \`Input\`, with the search icon on the left and clear action on the right.

### Defaults
- Height: \`40px\`
- Radius: \`9999px\`
- Typography: \`16px / 400\`
- Variant: \`filled\`
- Clearable by default

### Use
- Page-level search bars
- Toolbar search within cards
- Filter/search rows that need the same visual language across the app

Zero component-specific tokens.
        `,
      },
    },
  },
  args: {
    placeholder: "Search lab orders...",
    value: "",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<SearchFieldProps>;

function PlaygroundDemo() {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-md">
      <SearchField
        placeholder="Search lab orders..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onClear={() => setValue("")}
      />
    </div>
  );
}

function CommonUsageDemo() {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("Clissia");

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="max-w-sm">
        <SearchField
          placeholder="Search patients..."
          value={valueA}
          onChange={(event) => setValueA(event.target.value)}
          onClear={() => setValueA("")}
        />
      </div>
      <div className="w-full max-w-lg">
        <SearchField
          placeholder="Search lab orders..."
          value={valueB}
          onChange={(event) => setValueB(event.target.value)}
          onClear={() => setValueB("")}
        />
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: () => <PlaygroundDemo />,
};

export const SizesAndWidths: Story = {
  name: "Common Usage",
  parameters: {
    controls: { disable: true },
  },
  render: () => <CommonUsageDemo />,
};

export const DesignTokens: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "SearchField reuses Input tokens plus the shared pill radius used in toolbar-style controls.",
      },
    },
  },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["search-field"].title}
      tokens={componentTokenDocs["search-field"].tokens}
    />
  ),
};
