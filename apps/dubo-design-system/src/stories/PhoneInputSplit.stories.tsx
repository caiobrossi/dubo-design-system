"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { PhoneInputSplit, type PhoneInputSplitProps } from "@/components/ui/phone-input-split";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta<PhoneInputSplitProps> = {
  title: "Components/PhoneInputSplit",
  component: PhoneInputSplit,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**PhoneInputSplit** — phone field with split country picker and number input.

Built for workflows that need a floating-label phone field while keeping country selection visible and searchable.

### Features
- Country picker with flag and calling code
- Floating label aligned with the field family
- Search inside the country list
- Optional clear action
- Same height, radius, and typography language as the rest of the DS fields
        `,
      },
    },
  },
  args: {
    label: "Telefone",
    value: "",
    variant: "filled",
    defaultCountry: "PT",
    clearable: true,
    searchPlaceholder: "Pesquisar país",
    noCountriesFoundText: "Nenhum país encontrado",
    disabled: false,
    error: false,
    helpText: "",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["outline", "filled"],
    },
    label: { control: "text" },
    defaultCountry: { control: "text" },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    helpText: { control: "text" },
    searchPlaceholder: { control: "text" },
    noCountriesFoundText: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<PhoneInputSplitProps>;

function PlaygroundDemo(args: PhoneInputSplitProps) {
  const [value, setValue] = useState(args.value ?? "");

  return (
    <div className="max-w-lg">
      <PhoneInputSplit
        {...args}
        value={value}
        onChange={setValue}
        onClear={() => setValue("")}
      />
    </div>
  );
}

function CommonUsageDemo() {
  const [phone, setPhone] = useState("+351912345678");
  const [whatsapp, setWhatsapp] = useState("");

  return (
    <div className="flex max-w-3xl flex-col gap-6">
      <div className="max-w-lg">
        <PhoneInputSplit
          label="Telefone"
          value={phone}
          onChange={setPhone}
          onClear={() => setPhone("")}
          variant="filled"
          clearable
          searchPlaceholder="Pesquisar país"
          noCountriesFoundText="Nenhum país encontrado"
        />
      </div>
      <div className="max-w-lg">
        <PhoneInputSplit
          label="WhatsApp"
          value={whatsapp}
          onChange={setWhatsapp}
          onClear={() => setWhatsapp("")}
          variant="filled"
          clearable
          searchPlaceholder="Pesquisar país"
          noCountriesFoundText="Nenhum país encontrado"
        />
      </div>
    </div>
  );
}

export const Playground: Story = {
  render: (args) => <PlaygroundDemo {...args} />,
};

export const CommonUsage: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => <CommonUsageDemo />,
};

export const DesignTokens: Story = {
  parameters: {
    controls: { disable: true },
  },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["phone-input-split"].title}
      tokens={componentTokenDocs["phone-input-split"].tokens}
    />
  ),
};
