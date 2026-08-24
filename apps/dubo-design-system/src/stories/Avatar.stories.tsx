import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarGroup, type AvatarProps } from "@/components/ui/avatar";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta = {
  title: "Components/Avatar",
  component: Avatar as unknown as Meta<AvatarProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Avatar** — Dubo Design System component (shadcn-based).

Uses shared semantic tokens from design-tokens. Only \`--avatar-group-overlap\` is avatar-specific.

### Types
- **Initials**: 2-letter initials on a colored background
- **Image**: Photo of the person
- **Placeholder illustration**: Optional branded placeholder image

### Variants (background color)
| Variant | Background | Text |
|---|---|---|
| \`brand\` | brand-50 | brand-500 |
| \`neutral\` | cool-100 | cool-600 |

### Sizes
- \`xs\` = 24px
- \`sm\` = 32px
- \`default\` = 40px
- \`lg\` = 48px
- \`xl\` = 64px
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["brand", "neutral"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "default", "lg", "xl"],
    },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy"],
    },
    src: { control: "text" },
    initials: { control: "text" },
    name: { control: "text" },
  },
  args: {
    variant: "brand",
    size: "default",
    initials: "KB",
  },
} satisfies Meta<AvatarProps>;

export default meta;
type Story = StoryObj<AvatarProps>;

/* ── Playground ── */

export const Playground: Story = {};

/* ── All Variants ── */

export const AllVariants: Story = {
  name: "All Variants",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar variant="brand" initials="BR" />
      <Avatar variant="neutral" initials="NE" />
      <Avatar variant="neutral" initials="SU" />
      <Avatar variant="brand" initials="WA" />
      <Avatar variant="neutral" initials="ER" />
      <Avatar variant="brand" initials="AC" />
    </div>
  ),
};

/* ── Sizes ── */

export const Sizes: Story = {
  name: "Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="xs" initials="XS" />
      <Avatar size="sm" initials="SM" />
      <Avatar size="default" initials="MD" />
      <Avatar size="lg" initials="LG" />
      <Avatar size="xl" initials="XL" />
    </div>
  ),
};

/* ── With Image ── */

export const WithImage: Story = {
  name: "With Image",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="xs" src="https://i.pravatar.cc/48?u=a" alt="User A" />
      <Avatar size="sm" src="https://i.pravatar.cc/64?u=b" alt="User B" />
      <Avatar size="default" src="https://i.pravatar.cc/80?u=c" alt="User C" />
      <Avatar size="lg" src="https://i.pravatar.cc/96?u=d" alt="User D" />
      <Avatar size="xl" src="https://i.pravatar.cc/128?u=e" alt="User E" />
    </div>
  ),
};

/* ── Fallback Icon (no initials, no image) ── */

export const FallbackIcon: Story = {
  name: "Fallback Icon",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="xs" variant="neutral" />
      <Avatar size="sm" variant="neutral" />
      <Avatar size="default" variant="neutral" />
      <Avatar size="lg" variant="neutral" />
      <Avatar size="xl" variant="neutral" />
    </div>
  ),
};

/* ── With Status Badge ── */

export const WithStatusBadge: Story = {
  name: "With Status Badge",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar initials="ON" status="online" />
      <Avatar initials="OF" status="offline" variant="neutral" />
      <Avatar initials="BU" status="busy" variant="neutral" />
      <Avatar src="https://i.pravatar.cc/80?u=status" status="online" />
    </div>
  ),
};

/* ── Avatar Group ── */

export const Group: Story = {
  name: "Avatar Group",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <AvatarGroup>
        <Avatar initials="AB" variant="brand" />
        <Avatar initials="CD" variant="brand" />
        <Avatar initials="EF" variant="neutral" />
        <Avatar initials="GH" variant="brand" />
      </AvatarGroup>

      <AvatarGroup>
        <Avatar src="https://i.pravatar.cc/80?u=g1" />
        <Avatar src="https://i.pravatar.cc/80?u=g2" />
        <Avatar src="https://i.pravatar.cc/80?u=g3" />
        <Avatar src="https://i.pravatar.cc/80?u=g4" />
        <Avatar src="https://i.pravatar.cc/80?u=g5" />
      </AvatarGroup>
    </div>
  ),
};

/* ── Avatar Group with Max / Count ── */

export const GroupWithCount: Story = {
  name: "Avatar Group with Count",
  render: () => (
    <AvatarGroup max={3}>
      <Avatar src="https://i.pravatar.cc/80?u=c1" />
      <Avatar src="https://i.pravatar.cc/80?u=c2" />
      <Avatar src="https://i.pravatar.cc/80?u=c3" />
      <Avatar src="https://i.pravatar.cc/80?u=c4" />
      <Avatar src="https://i.pravatar.cc/80?u=c5" />
      <Avatar src="https://i.pravatar.cc/80?u=c6" />
    </AvatarGroup>
  ),
};

/* ── Name auto-initials ── */

export const AutoInitials: Story = {
  name: "Auto Initials from Name",
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar name="Kai Brossi" variant="brand" />
      <Avatar name="Maria Silva" variant="brand" />
      <Avatar name="John Doe" variant="neutral" />
      <Avatar name="Ana" variant="brand" />
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["avatar"].title}
      tokens={componentTokenDocs["avatar"].tokens}
    />
  ),
};
