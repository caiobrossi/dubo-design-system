"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Check, AlertCircle, Clock, Info, Star, Zap } from "@/lib/icons";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Badge",
  component: Badge as unknown as Meta<BadgeProps>["component"],
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: `
**Badge** — Dubo Design System component (shadcn-based). Unified badge + chip.

Badge uses shared semantic status tokens plus a few primitive palette values for info2/info3. Sizing and spacing are handled inline with primitives.

### Variants (status-based)
| Variant | Color | Use |
|---|---|---|
| \`success\` | Green | Completed, active, approved |
| \`error\` | Red | Error, failed, rejected |
| \`warning\` | Amber | Pending, caution, draft |
| \`info1\` | Brand blue | Default info, category |
| \`info2\` | Purple | Accent, premium |
| \`info3\` | Cyan/sky | Secondary accent |

### Intensities
- \`soft\` — Tinted background + dark tone-on-tone text (default)
- \`strong\` — Saturated background with high-contrast text

### Sizes
- \`sm\` → 20px height
- \`default\` → 24px height

### Features
- Icon support (inline-start/end via children)
- Avatar on left side
- Close (X) button on right side
- Loading spinner
- Link support via \`asChild\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["success", "error", "warning", "info1", "info2", "info3"],
    },
    intensity: {
      control: "select",
      options: ["soft", "strong"],
    },
    size: {
      control: "select",
      options: ["sm", "default"],
    },
    loading: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Badge",
    variant: "info1",
    intensity: "soft",
    size: "default",
    loading: false,
  },
} satisfies Meta<BadgeProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ── Playground ── */
export const Playground: Story = {
  render: (args) => (
    <div className="flex min-h-24 items-start p-6">
      <Badge {...args} />
    </div>
  ),
};

/* ── All Variants — Soft ── */
export const AllVariantsSoft: Story = {
  name: "All Variants — Soft",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">Success</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info1">Info 1</Badge>
      <Badge variant="info2">Info 2</Badge>
      <Badge variant="info3">Info 3</Badge>
    </div>
  ),
};

/* ── All Variants — Strong ── */
export const AllVariantsStrong: Story = {
  name: "All Variants — Strong",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" intensity="strong">
        Success
      </Badge>
      <Badge variant="error" intensity="strong">
        Error
      </Badge>
      <Badge variant="warning" intensity="strong">
        Warning
      </Badge>
      <Badge variant="info1" intensity="strong">
        Info 1
      </Badge>
      <Badge variant="info2" intensity="strong">
        Info 2
      </Badge>
      <Badge variant="info3" intensity="strong">
        Info 3
      </Badge>
    </div>
  ),
};

/* ── Sizes ── */
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <span className="w-24 text-body-md text-[color:var(--color-text-secondary)]">sm (20px)</span>
        <Badge size="sm" variant="success">
          Success
        </Badge>
        <Badge size="sm" variant="error">
          Error
        </Badge>
        <Badge size="sm" variant="info1">
          Info
        </Badge>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-24 text-body-md text-[color:var(--color-text-secondary)]">default (24px)</span>
        <Badge variant="success">Success</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info1">Info</Badge>
      </div>
    </div>
  ),
};

/* ── With Icons ── */
export const WithIcons: Story = {
  name: "With Icons",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        <Check /> Approved
      </Badge>
      <Badge variant="error">
        <AlertCircle /> Failed
      </Badge>
      <Badge variant="warning">
        <Clock /> Pending
      </Badge>
      <Badge variant="info1">
        <Info /> Info
      </Badge>
      <Badge variant="info2">
        <Star /> Premium
      </Badge>
      <Badge variant="info3">
        <Zap /> Fast
      </Badge>
    </div>
  ),
};

/* ── With Icons — Strong ── */
export const WithIconsStrong: Story = {
  name: "With Icons — Strong",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success" intensity="strong">
        <Check /> Approved
      </Badge>
      <Badge variant="error" intensity="strong">
        <AlertCircle /> Failed
      </Badge>
      <Badge variant="warning" intensity="strong">
        <Clock /> Pending
      </Badge>
      <Badge variant="info1" intensity="strong">
        <Info /> Info
      </Badge>
      <Badge variant="info2" intensity="strong">
        <Star /> Premium
      </Badge>
      <Badge variant="info3" intensity="strong">
        <Zap /> Fast
      </Badge>
    </div>
  ),
};

/* ── Icon Right ── */
export const IconRight: Story = {
  name: "Icon Right",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="success">
        Approved <Check />
      </Badge>
      <Badge variant="info1">
        Category <Info />
      </Badge>
    </div>
  ),
};

/* ── Loading ── */
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="info1" loading>
        Loading&hellip;
      </Badge>
      <Badge variant="warning" loading>
        Processing
      </Badge>
      <Badge variant="success" intensity="strong" loading>
        Saving
      </Badge>
    </div>
  ),
};

/* ── With Close Button ── */
export const WithClose: Story = {
  name: "With Close Button",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="info1" onClose={() => {}}>
        Removable
      </Badge>
      <Badge variant="success" onClose={() => {}}>
        Tag
      </Badge>
      <Badge variant="error" intensity="strong" onClose={() => {}}>
        Alert
      </Badge>
    </div>
  ),
};

/* ── With Avatar ── */
export const WithAvatar: Story = {
  name: "With Avatar",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge
        variant="info1"
        avatar={
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=6366f1"
            alt="JD"
            className="h-full w-full object-cover rounded-full"
          />
        }
      >
        John Doe
      </Badge>
      <Badge
        variant="success"
        avatar={
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=AB&backgroundColor=22c55e"
            alt="AB"
            className="h-full w-full object-cover rounded-full"
          />
        }
        onClose={() => {}}
      >
        Alice B.
      </Badge>
    </div>
  ),
};

/* ── As Link ── */
export const AsLink: Story = {
  name: "As Link",
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge variant="info1" asChild>
        <a href="https://dubo.pt" className="hover:opacity-80 transition-opacity cursor-pointer">
          Link Badge
        </a>
      </Badge>
      <Badge variant="info2" intensity="strong" asChild>
        <a href="https://dubo.pt" className="hover:opacity-80 transition-opacity cursor-pointer">
          Strong Link
        </a>
      </Badge>
    </div>
  ),
};

/* ── Complete Matrix ── */
export const CompleteMatrix: Story = {
  name: "Complete Matrix",
  render: () => {
    const variants = ["success", "error", "warning", "info1", "info2", "info3"] as const;
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-medium text-[color:var(--color-text-secondary)]">
            Soft (default)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((v) => (
              <Badge key={v} variant={v}>
                {v}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-medium text-[color:var(--color-text-secondary)]">Strong</p>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((v) => (
              <Badge key={v} variant={v} intensity="strong">
                {v}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-medium text-[color:var(--color-text-secondary)]">Small: Soft</p>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((v) => (
              <Badge key={v} variant={v} size="sm">
                {v}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-medium text-[color:var(--color-text-secondary)]">
            Small: Strong
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {variants.map((v) => (
              <Badge key={v} variant={v} intensity="strong" size="sm">
                {v}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["badge"].title}
      tokens={componentTokenDocs["badge"].tokens}
    />
  ),
};
