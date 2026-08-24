"use client";

import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Apple, Cherry, Citrus, Stethoscope, Syringe, Scan } from "@/lib/icons";
import {
  Select,
  FloatingSelect,
  SelectItem,
  SelectGroup,
  SelectGroupLabel,
  SelectSeparator,
  type SelectProps,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Select built on the same shared field recipe as Input. Standard uses the 40px control height, Floating uses the shared 56px surface, and the menu reuses the frosted glass overlay recipe.",
      },
    },
  },
  argTypes: {
    variant: { control: "select", options: ["outline", "filled"] },
    clearable: { control: "boolean" },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

// ─── Playground ──────────────────────────────────────────────────────────────

function PlaygroundDemo(args: SelectProps) {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-sm">
      <Select {...args} value={value} onValueChange={setValue}>
        <SelectItem value="brazil">Brazil</SelectItem>
        <SelectItem value="portugal">Portugal</SelectItem>
        <SelectItem value="spain">Spain</SelectItem>
        <SelectItem value="france">France</SelectItem>
        <SelectItem value="germany">Germany</SelectItem>
        <SelectItem value="italy">Italy</SelectItem>
      </Select>
    </div>
  );
}

export const Playground: Story = {
  args: {
    variant: "outline",
    label: "Country",
    placeholder: "Select a country...",
    clearable: false,
    disabled: false,
    error: false,
    helpText: "",
  },
  render: (args: SelectProps) => <PlaygroundDemo {...args} />,
};

// ─── All Variants ────────────────────────────────────────────────────────────

function AllVariantsDemo() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [v3, setV3] = useState("");
  const [v4, setV4] = useState("");

  const options = (
    <>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="mango">Mango</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
    </>
  );

  return (
    <div className="grid max-w-3xl grid-cols-2 gap-6">
      <Select
        variant="outline"
        label="Outline"
        placeholder="Choose fruit..."
        value={v1}
        onValueChange={setV1}
      >
        {options}
      </Select>
      <Select
        variant="filled"
        label="Filled"
        placeholder="Choose fruit..."
        value={v2}
        onValueChange={setV2}
      >
        {options}
      </Select>
      <FloatingSelect
        variant="outline"
        label="Floating Outline"
        placeholder="Choose fruit..."
        value={v3}
        onValueChange={setV3}
      >
        {options}
      </FloatingSelect>
      <FloatingSelect
        variant="filled"
        label="Floating Filled"
        placeholder="Choose fruit..."
        value={v4}
        onValueChange={setV4}
      >
        {options}
      </FloatingSelect>
    </div>
  );
}

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All 4 style combinations: outline, filled, floating-outline, floating-filled.",
      },
    },
  },
  render: () => <AllVariantsDemo />,
};

// ─── Floating Label ──────────────────────────────────────────────────────────

function FloatingLabelDemo() {
  const [outlineVal, setOutlineVal] = useState("");
  const [filledVal, setFilledVal] = useState("");
  const [prefilledVal, setPrefilledVal] = useState("cleaning");

  const options = (
    <>
      <SelectItem value="cleaning">Dental Cleaning</SelectItem>
      <SelectItem value="filling">Filling</SelectItem>
      <SelectItem value="extraction">Extraction</SelectItem>
      <SelectItem value="root-canal">Root Canal</SelectItem>
      <SelectItem value="crown">Crown</SelectItem>
    </>
  );

  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline: idle, then click to see label float
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingSelect
            variant="outline"
            label="Procedure"
            placeholder="Choose..."
            value={outlineVal}
            onValueChange={setOutlineVal}
          >
            {options}
          </FloatingSelect>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Filled: idle, then click to see label float
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingSelect
            variant="filled"
            label="Procedure"
            placeholder="Choose..."
            value={filledVal}
            onValueChange={setFilledVal}
          >
            {options}
          </FloatingSelect>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Pre-filled: label is already floating
        </p>
        <div className="flex max-w-md flex-col gap-4">
          <FloatingSelect
            variant="outline"
            label="Procedure"
            value={prefilledVal}
            onValueChange={setPrefilledVal}
          >
            {options}
          </FloatingSelect>
        </div>
      </div>
    </div>
  );
}

export const FloatingLabel: Story = {
  name: "Floating Label",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "FloatingSelect with outline and filled variants showing idle, open, and filled states. Click each select to see the label animate from center to top.",
      },
    },
  },
  render: () => <FloatingLabelDemo />,
};

// ─── Sizes ───────────────────────────────────────────────────────────────────

function SizesDemo() {
  const [stdVal, setStdVal] = useState("");
  const [floatVal, setFloatVal] = useState("");

  const options = (
    <>
      <SelectItem value="cleaning">Dental Cleaning</SelectItem>
      <SelectItem value="filling">Filling</SelectItem>
      <SelectItem value="extraction">Extraction</SelectItem>
    </>
  );

  return (
    <div className="flex max-w-3xl items-start gap-6">
      <div className="flex-1">
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Standard: 40px (\`--height-control-md\`)
        </p>
        <Select label="Procedure" placeholder="Select..." value={stdVal} onValueChange={setStdVal}>
          {options}
        </Select>
      </div>
      <div className="flex-1">
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Floating: 56px (\`--size-14\`)
        </p>
        <FloatingSelect
          label="Procedure"
          placeholder="Select..."
          value={floatVal}
          onValueChange={setFloatVal}
        >
          {options}
        </FloatingSelect>
      </div>
    </div>
  );
}

export const Sizes: Story = {
  name: "Sizes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "One size per style: Standard (40px) vs Floating (56px) side by side.",
      },
    },
  },
  render: () => <SizesDemo />,
};

// ─── With Groups ─────────────────────────────────────────────────────────────

function WithGroupsDemo() {
  const [value, setValue] = useState("");
  return (
    <div className="max-w-sm">
      <Select
        label="Dental Procedure"
        placeholder="Select procedure..."
        value={value}
        onValueChange={setValue}
      >
        <SelectGroup>
          <SelectGroupLabel>Preventive</SelectGroupLabel>
          <SelectItem value="cleaning">Dental Cleaning</SelectItem>
          <SelectItem value="sealant">Sealant</SelectItem>
          <SelectItem value="fluoride">Fluoride Treatment</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Restorative</SelectGroupLabel>
          <SelectItem value="filling">Filling</SelectItem>
          <SelectItem value="crown">Crown</SelectItem>
          <SelectItem value="bridge">Bridge</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectGroupLabel>Surgical</SelectGroupLabel>
          <SelectItem value="extraction">Extraction</SelectItem>
          <SelectItem value="root-canal">Root Canal</SelectItem>
          <SelectItem value="implant">Implant</SelectItem>
        </SelectGroup>
      </Select>
    </div>
  );
}

export const WithGroups: Story = {
  name: "With Groups",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Select with SelectGroup, SelectGroupLabel, and SelectSeparator for categorized options.",
      },
    },
  },
  render: () => <WithGroupsDemo />,
};

// ─── With Icons ──────────────────────────────────────────────────────────────

function WithIconsDemo() {
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  return (
    <div className="flex max-w-md flex-col gap-6">
      <Select
        label="Fruit"
        placeholder="Pick a fruit..."
        icon={<Apple />}
        value={v1}
        onValueChange={setV1}
      >
        <SelectItem value="apple" icon={<Apple />}>
          Apple
        </SelectItem>
        <SelectItem value="cherry" icon={<Cherry />}>
          Cherry
        </SelectItem>
        <SelectItem value="citrus" icon={<Citrus />}>
          Citrus
        </SelectItem>
      </Select>
      <FloatingSelect
        label="Procedure"
        placeholder="Choose..."
        icon={<Stethoscope />}
        value={v2}
        onValueChange={setV2}
      >
        <SelectItem value="checkup" icon={<Stethoscope />}>
          Checkup
        </SelectItem>
        <SelectItem value="injection" icon={<Syringe />}>
          Anesthesia
        </SelectItem>
        <SelectItem value="xray" icon={<Scan />}>
          X-Ray
        </SelectItem>
      </FloatingSelect>
    </div>
  );
}

export const WithIcons: Story = {
  name: "With Icons",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "SelectItem supports an `icon` prop. The trigger also accepts an `icon` prop for a left-side icon.",
      },
    },
  },
  render: () => <WithIconsDemo />,
};

// ─── Disabled ────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  name: "Disabled",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Disabled select (entire trigger) and disabled individual items within a select.",
      },
    },
  },
  render: () => {
    function DisabledDemo() {
      const [val, setVal] = useState("");
      return (
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Disabled select (entire component)
            </p>
            <div className="flex max-w-md flex-col gap-4">
              <Select label="Country" placeholder="Select country..." disabled>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
              </Select>
              <Select variant="filled" label="Country" placeholder="Select country..." disabled>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
              </Select>
              <FloatingSelect label="Country" disabled>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
              </FloatingSelect>
              <FloatingSelect variant="filled" label="Country" disabled>
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
              </FloatingSelect>
            </div>
          </div>
          <div>
            <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Disabled individual items
            </p>
            <div className="max-w-md">
              <Select
                label="Country"
                placeholder="Select country..."
                value={val}
                onValueChange={setVal}
              >
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="es" disabled>
                  Spain (unavailable)
                </SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="de" disabled>
                  Germany (unavailable)
                </SelectItem>
              </Select>
            </div>
          </div>
        </div>
      );
    }
    return <DisabledDemo />;
  },
};

// ─── Invalid ─────────────────────────────────────────────────────────────────

export const Invalid: Story = {
  name: "Invalid",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Error state with helpText — red border and error message.",
      },
    },
  },
  render: () => {
    function InvalidDemo() {
      const [v1, setV1] = useState("");
      const [v2, setV2] = useState("");
      return (
        <div className="flex flex-col gap-8">
          <div>
            <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Standard Input
            </p>
            <div className="flex max-w-md flex-col gap-4">
              <Select
                label="Country"
                placeholder="Select country..."
                error
                helpText="Country is required"
                value={v1}
                onValueChange={setV1}
              >
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
              </Select>
              <Select
                variant="filled"
                label="Procedure"
                placeholder="Select procedure..."
                error
                helpText="Please select a procedure"
                value={v2}
                onValueChange={setV2}
              >
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="filling">Filling</SelectItem>
              </Select>
            </div>
          </div>
          <div>
            <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
              Floating Input
            </p>
            <div className="flex max-w-md flex-col gap-4">
              <FloatingSelect label="Country" error helpText="Country is required">
                <SelectItem value="br">Brazil</SelectItem>
                <SelectItem value="pt">Portugal</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
              </FloatingSelect>
              <FloatingSelect
                variant="filled"
                label="Procedure"
                error
                helpText="Please select a procedure"
              >
                <SelectItem value="cleaning">Cleaning</SelectItem>
                <SelectItem value="filling">Filling</SelectItem>
              </FloatingSelect>
            </div>
          </div>
        </div>
      );
    }
    return <InvalidDemo />;
  },
};

// ─── Clearable ───────────────────────────────────────────────────────────────

function ClearableDemo() {
  const [v1, setV1] = useState("mango");
  const [v2, setV2] = useState("grape");
  const [v3, setV3] = useState("apple");
  const [v4, setV4] = useState("");

  const options = (
    <>
      <SelectItem value="apple">Apple</SelectItem>
      <SelectItem value="banana">Banana</SelectItem>
      <SelectItem value="mango">Mango</SelectItem>
      <SelectItem value="grape">Grape</SelectItem>
    </>
  );

  return (
    <div className="flex max-w-md flex-col gap-6">
      <Select
        label="Fruit (clearable)"
        placeholder="Pick a fruit..."
        clearable
        value={v1}
        onValueChange={setV1}
      >
        {options}
      </Select>
      <Select
        variant="filled"
        label="Fruit (clearable, filled)"
        placeholder="Pick a fruit..."
        clearable
        value={v2}
        onValueChange={setV2}
      >
        {options}
      </Select>
      <FloatingSelect
        label="Fruit (clearable, floating)"
        clearable
        value={v3}
        onValueChange={setV3}
      >
        {options}
      </FloatingSelect>
      <FloatingSelect
        variant="filled"
        label="Fruit (clearable, floating filled)"
        clearable
        value={v4}
        onValueChange={setV4}
      >
        {options}
      </FloatingSelect>
    </div>
  );
}

export const Clearable: Story = {
  name: "Clearable",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Select with `clearable={true}`. An X button appears when a value is selected, allowing the user to reset the selection.",
      },
    },
  },
  render: () => <ClearableDemo />,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["select"].title}
      tokens={componentTokenDocs["select"].tokens}
    />
  ),
};
