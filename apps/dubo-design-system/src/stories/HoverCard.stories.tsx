import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { CalendarDays, MapPin } from "@/lib/icons";
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import { Avatar } from "@/components/ui/avatar";

const meta: Meta = {
  title: "Components/HoverCard",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**HoverCard** — Dubo Design System component (Radix-based).

Rich preview popup triggered on hover. Built on \`@radix-ui/react-hover-card\`.

### Variants
| Prop | Values | Default |
|---|---|---|
| \`glass\` | \`true\` / \`false\` | \`false\` |

- **Solid** (default): \`--color-bg-surface\` background with \`--color-border\`
- **Glass**: frosted glass with backdrop blur

### Token model
HoverCard reuses shared overlay, glass, spacing, and typography roles. The popup switches between the standard overlay surface recipe and the shared frosted glass recipe through the \`glass\` prop.
        `,
      },
    },
  },
};

export default meta;

/* ── Helper: profile card content ── */
function ProfilePreview() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Avatar size="lg" src="/avatar-placeholder.webp" name="Ana Silva" />
        <div>
          <p className="text-body-md font-semibold text-[color:var(--color-text-primary)]">
            Dr. Ana Silva
          </p>
          <p className="text-body-sm text-[color:var(--color-text-secondary)]">@anasilva</p>
        </div>
      </div>
      <p className="text-body-md text-[color:var(--color-text-secondary)]">
        Orthodontist specialized in invisible aligners. Board certified with 12 years of clinical
        experience.
      </p>
      <div className="flex items-center gap-4 text-body-sm text-[color:var(--color-text-muted)]">
        <span className="flex items-center gap-1">
          <MapPin className="size-3" /> Lisbon, PT
        </span>
        <span className="flex items-center gap-1">
          <CalendarDays className="size-3" /> Joined Jan 2024
        </span>
      </div>
    </div>
  );
}

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj = {
  render: () => (
    <div className="flex items-center justify-center p-20">
      <HoverCard>
        <HoverCardTrigger asChild>
          <a
            href="https://dubo.pt"
            className="text-body-md font-medium text-[color:var(--color-brand)] underline underline-offset-4"
          >
            @anasilva
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <ProfilePreview />
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

// ─── Solid variant (default) ─────────────────────────────────────────────────

export const Solid: StoryObj = {
  name: "Solid (Default)",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Default solid background with subtle border.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center p-20">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <a
            href="https://dubo.pt"
            className="text-body-md font-medium text-[color:var(--color-brand)] underline underline-offset-4"
          >
            Hover for profile
          </a>
        </HoverCardTrigger>
        <HoverCardContent>
          <ProfilePreview />
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

// ─── Glass variant ───────────────────────────────────────────────────────────

export const Glass: StoryObj = {
  name: "Frosted Glass",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Frosted glass variant with backdrop blur — `glass` prop.",
      },
    },
  },
  render: () => (
    <div className="flex items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--p-brand-100)] to-[var(--p-cool-100)] p-20">
      <HoverCard openDelay={200} closeDelay={100}>
        <HoverCardTrigger asChild>
          <a
            href="https://dubo.pt"
            className="text-body-md font-medium text-[color:var(--color-brand)] underline underline-offset-4"
          >
            Hover for glass card
          </a>
        </HoverCardTrigger>
        <HoverCardContent glass>
          <ProfilePreview />
        </HoverCardContent>
      </HoverCard>
    </div>
  ),
};

// ─── All Sides ───────────────────────────────────────────────────────────────

export const AllSides: StoryObj = {
  name: "All Sides",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Hover card can open on any side: top, right, bottom, left.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center justify-center gap-16 p-28">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <HoverCard key={side} openDelay={100} closeDelay={50}>
          <HoverCardTrigger asChild>
            <button className="rounded-full border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-1.5 text-body-md text-[color:var(--color-text-primary)] transition-colors hover:bg-[var(--color-hover)]">
              {side}
            </button>
          </HoverCardTrigger>
          <HoverCardContent side={side} className="w-64">
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              Content positioned on the <strong>{side}</strong> side.
            </p>
          </HoverCardContent>
        </HoverCard>
      ))}
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["hover-card"].title}
      tokens={componentTokenDocs["hover-card"].tokens}
    />
  ),
};
