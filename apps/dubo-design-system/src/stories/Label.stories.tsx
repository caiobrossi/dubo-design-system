import type { Meta, StoryObj } from "@storybook/react-vite";
import { HelpCircle } from "@/lib/icons";
import { Label, type LabelProps } from "@/components/ui/label";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Label",
  component: Label as unknown as Meta<LabelProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Label** — Reusable form label component.

Uses shared semantic typography roles plus semantic text colors that are also consumed by Checkbox, Input, Select, Radio, and other form controls.

### Features
- Required indicator (red asterisk \`*\`)
- Optional indicator (\`"(optional)"\` text)
- Info icon with tooltip
- Description/subtext below the label

### Shared roles and colors (shared across form components)
| Token | Value | Used by |
|---|---|---|
| \`--type-body-md-* + --font-weight-400\` | 14px / 500 / 1.375 | Label, Checkbox, Input, Select |
| \`--color-text-primary\` | semantic text primary | All form labels |
| \`--type-body-sm-* + --font-weight-400\` | 12px / 400 / 1.5 | Label, Checkbox, Input |
| \`--color-text-secondary\` | semantic text secondary | All descriptions |
| \`--color-danger\` | semantic danger | Required asterisk |
        `,
      },
    },
  },
  argTypes: {
    required: { control: "boolean" },
    optional: { control: "boolean" },
    disabled: { control: "boolean" },
    info: { control: "text" },
    description: { control: "text" },
    children: { control: "text" },
  },
  args: {
    children: "Full name",
    required: false,
    optional: false,
    disabled: false,
  },
} satisfies Meta<LabelProps>;

export default meta;
type Story = StoryObj<LabelProps>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  args: {
    info: "",
  },
};

// ─── All Features ─────────────────────────────────────────────────────────────

export const AllFeatures: Story = {
  name: "All Features",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Label>Default label</Label>
      <Label required>Required field</Label>
      <Label optional>Optional field</Label>
      <Label info="This is a helpful tooltip">With info icon</Label>
      <Label description="This will be used for your profile">With description</Label>
      <Label required info="Required for registration" description="Enter your full legal name">
        Full name
      </Label>
      <Label optional description="We will never share your phone number">
        Phone number
      </Label>
      <Label disabled>Disabled label</Label>
    </div>
  ),
};

// ─── Required ─────────────────────────────────────────────────────────────────

export const Required: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Label required>Full name</Label>
      <Label required>Email address</Label>
      <Label required>Date of birth</Label>
    </div>
  ),
};

// ─── Optional ─────────────────────────────────────────────────────────────────

export const Optional: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Label optional>Phone number</Label>
      <Label optional>Notes</Label>
    </div>
  ),
};

// ─── With Info ────────────────────────────────────────────────────────────────

export const WithInfo: Story = {
  name: "With Info Icon",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Label info="Tax identification number used for billing">NIF</Label>
      <Label info="Your preferred contact method">Contact preference</Label>
      <Label info={<HelpCircle className="size-3.5" />}>Custom icon</Label>
    </div>
  ),
};

// ─── With Description ─────────────────────────────────────────────────────────

export const WithDescription: Story = {
  name: "With Description",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Label description="Enter your full legal name as it appears on your ID">Full name</Label>
      <Label description="We will send a verification code to this address">Email address</Label>
    </div>
  ),
};

// ─── Combined ─────────────────────────────────────────────────────────────────

export const Combined: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-6 max-w-sm">
      <Label
        required
        info="Legal name as it appears on official documents"
        description="First and last name required"
      >
        Patient name
      </Label>
      <Label
        optional
        info="Used for appointment reminders"
        description="Include country code (e.g., +351)"
      >
        Phone number
      </Label>
      <Label required description="Must be a valid email for account verification">
        Email
      </Label>
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4 max-w-sm">
      <Label disabled>Disabled label</Label>
      <Label disabled required description="This field cannot be edited">
        Locked field
      </Label>
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["label"].title}
      tokens={componentTokenDocs["label"].tokens}
    />
  ),
};
