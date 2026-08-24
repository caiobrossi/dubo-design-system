import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  Archive,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Mail,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "@/lib/icons";
import { Button, ButtonGroup, type ButtonProps } from "@/components/ui/button";

const meta = {
  title: "Components/Button",
  component: Button as unknown as Meta<ButtonProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Button** — Dubo Design System component (shadcn-based).

Reuses shared semantic tokens for color, spacing, heights, icon sizing, and typography roles. Button-specific tokens are limited to signature motion/shadows.

### Variants
| Variant | Use |
|---|---|
| \`default\` | Primary CTA — 3D shadow + scale hover (Dubo signature) |
| \`secondary\` | Support actions — subtle gray bg with opacity + matching border |
| \`outline\` | Secondary actions — 1px gray border |
| \`ghost\` | Inline actions — no background |
| \`destructive\` | Irreversible actions — red with 3D shadow |
| \`link\` | Link style — underline on hover |

### Sizes
- \`sm\` → 32px — inside cards, table rows
- \`default\` → 40px — headers, forms
- \`lg\` → 48px — primary CTA, empty states

### Shape
- \`rounded={true}\` → pill (default)
- \`rounded={false}\` → squarish (rounded-lg)

### Press effect
- **Primary**: scale(0.97) on active
- **All others**: translate-y 1px on active (shadcn pattern)
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg", "icon", "icon-sm", "icon-lg"],
    },
    rounded: {
      control: "boolean",
      description: "Pill (true) or squarish (false)",
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    rounded: true,
    disabled: false,
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All 6 variants at default size (40px). Click to see the press effect.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "3 sizes: sm (32px), default (40px), lg (48px)." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Small</span>
        <Button size="sm">Primary</Button>
        <Button size="sm" variant="secondary">
          Secondary
        </Button>
        <Button size="sm" variant="outline">
          Outline
        </Button>
        <Button size="sm" variant="ghost">
          Ghost
        </Button>
        <Button size="sm" variant="destructive">
          Destructive
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Default</span>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Large</span>
        <Button size="lg">Primary</Button>
        <Button size="lg" variant="secondary">
          Secondary
        </Button>
        <Button size="lg" variant="outline">
          Outline
        </Button>
        <Button size="lg" variant="ghost">
          Ghost
        </Button>
        <Button size="lg" variant="destructive">
          Destructive
        </Button>
      </div>
    </div>
  ),
};

// ─── Rounded vs Square ────────────────────────────────────────────────────────

export const RoundedVsSquare: Story = {
  name: "Rounded vs Square",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Toggle between pill shape (rounded-full, default) and squarish (rounded-lg).",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Rounded (pill): default
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Square (rounded-lg)
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button rounded={false}>Primary</Button>
          <Button rounded={false} variant="secondary">
            Secondary
          </Button>
          <Button rounded={false} variant="outline">
            Outline
          </Button>
          <Button rounded={false} variant="ghost">
            Ghost
          </Button>
          <Button rounded={false} variant="destructive">
            Destructive
          </Button>
        </div>
      </div>
    </div>
  ),
};

// ─── With Icons ───────────────────────────────────────────────────────────────

export const IconLeft: Story = {
  name: "Icon Left",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <Plus /> Add patient
      </Button>
      <Button variant="secondary">
        <Download /> Export
      </Button>
      <Button variant="outline">
        <Mail /> Send
      </Button>
      <Button variant="ghost">
        <Pencil /> Edit
      </Button>
      <Button variant="destructive">
        <Trash2 /> Delete
      </Button>
    </div>
  ),
};

export const IconRight: Story = {
  name: "Icon Right",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        Continue <ArrowRight />
      </Button>
      <Button variant="secondary">
        Next <ChevronRight />
      </Button>
      <Button variant="outline">
        View all <ArrowRight />
      </Button>
    </div>
  ),
};

export const IconBothSides: Story = {
  name: "Icon Both Sides",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button>
        <ChevronLeft /> Back to list <ChevronRight />
      </Button>
      <Button variant="outline">
        <Search /> Search patients <ArrowRight />
      </Button>
    </div>
  ),
};

// ─── Icon Only ────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  name: "Icon Only",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Square icon-only buttons in all 3 sizes and all variants." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Small</span>
        <Button size="icon-sm">
          <Plus />
        </Button>
        <Button size="icon-sm" variant="secondary">
          <Settings />
        </Button>
        <Button size="icon-sm" variant="outline">
          <Pencil />
        </Button>
        <Button size="icon-sm" variant="ghost">
          <X />
        </Button>
        <Button size="icon-sm" variant="destructive">
          <Trash2 />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Default</span>
        <Button size="icon">
          <Plus />
        </Button>
        <Button size="icon" variant="secondary">
          <Settings />
        </Button>
        <Button size="icon" variant="outline">
          <Pencil />
        </Button>
        <Button size="icon" variant="ghost">
          <X />
        </Button>
        <Button size="icon" variant="destructive">
          <Trash2 />
        </Button>
      </div>
      <div className="flex items-center gap-3">
        <span className="w-20 text-body-sm text-[color:var(--color-text-muted)]">Large</span>
        <Button size="icon-lg">
          <Plus />
        </Button>
        <Button size="icon-lg" variant="secondary">
          <Settings />
        </Button>
        <Button size="icon-lg" variant="outline">
          <Pencil />
        </Button>
        <Button size="icon-lg" variant="ghost">
          <X />
        </Button>
        <Button size="icon-lg" variant="destructive">
          <Trash2 />
        </Button>
      </div>
    </div>
  ),
};

// ─── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Disabled state — 40% opacity, no pointer events." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
      <Button variant="ghost" disabled>
        Ghost
      </Button>
      <Button variant="destructive" disabled>
        Destructive
      </Button>
      <Button variant="link" disabled>
        Link
      </Button>
    </div>
  ),
};

// ─── Loading ──────────────────────────────────────────────────────────────────

export const Loading: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Loading state with Loader2 spinner — combine with disabled." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Loader2 className="animate-spin" /> Saving&hellip;
      </Button>
      <Button variant="secondary" disabled>
        <Loader2 className="animate-spin" /> Loading&hellip;
      </Button>
      <Button variant="outline" disabled>
        <Loader2 className="animate-spin" /> Processing&hellip;
      </Button>
      <Button variant="destructive" disabled>
        <Loader2 className="animate-spin" /> Deleting&hellip;
      </Button>
    </div>
  ),
};

// ─── Button Group ─────────────────────────────────────────────────────────────

export const ButtonGroupHorizontal: Story = {
  name: "Button Group",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Buttons grouped together with shared borders. Works best with `outline` variant and `rounded={false}`.",
      },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline group: squarish
        </p>
        <ButtonGroup>
          <Button variant="outline" rounded={false} size="icon">
            <ChevronLeft />
          </Button>
          <Button variant="outline" rounded={false}>
            <Archive /> Archive
          </Button>
          <Button variant="outline" rounded={false}>
            Report
          </Button>
          <Button variant="outline" rounded={false}>
            Snooze
          </Button>
          <Button variant="outline" rounded={false} size="icon">
            <MoreHorizontal />
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Secondary group: squarish
        </p>
        <ButtonGroup>
          <Button variant="secondary" rounded={false}>
            Day
          </Button>
          <Button variant="secondary" rounded={false}>
            Week
          </Button>
          <Button variant="secondary" rounded={false}>
            Month
          </Button>
        </ButtonGroup>
      </div>
      <div>
        <p className="mb-3 text-body-sm font-medium uppercase tracking-wider text-[color:var(--color-text-muted)]">
          Outline group: rounded (pill)
        </p>
        <ButtonGroup>
          <Button variant="outline">
            <ChevronLeft />
          </Button>
          <Button variant="outline">Page 1 of 10</Button>
          <Button variant="outline">
            <ChevronRight />
          </Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

export const ButtonGroupVertical: Story = {
  name: "Button Group Vertical",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Vertical button group." },
    },
  },
  render: () => (
    <ButtonGroup orientation="vertical">
      <Button variant="outline" rounded={false}>
        <Settings /> Settings
      </Button>
      <Button variant="outline" rounded={false}>
        <Mail /> Messages
      </Button>
      <Button variant="outline" rounded={false}>
        <Search /> Search
      </Button>
    </ButtonGroup>
  ),
};

// ─── Destructive Patterns ─────────────────────────────────────────────────────

export const DestructivePatterns: Story = {
  name: "Destructive Patterns",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Destructive actions with confirm/cancel pattern." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="destructive">
          <Trash2 /> Delete patient
        </Button>
        <Button variant="destructive" size="sm">
          <Trash2 /> Remove
        </Button>
        <Button variant="destructive" size="icon">
          <Trash2 />
        </Button>
      </div>
      <div className="flex items-center gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
        <p className="mr-4 text-body-md text-[color:var(--color-text-secondary)]">
          Are you sure you want to delete this patient?
        </p>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">
          <Trash2 /> Delete
        </Button>
      </div>
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["button"].title}
      tokens={componentTokenDocs["button"].tokens}
    />
  ),
};
