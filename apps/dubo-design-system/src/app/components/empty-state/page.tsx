import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { EmptyStateIllustration } from "@/components/docs/empty-state-illustration";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("empty-state");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const patternRows = [
  {
    item: "Illustration container",
    details:
      "Provides a stable visual anchor using a shared surface fill, border, and large radius.",
  },
  {
    item: "Title",
    details: "Required. Keep it concise and outcome-focused so the empty moment is easy to scan.",
  },
  {
    item: "Description",
    details: "Optional. Use it for guidance, not repetition of the title.",
  },
  {
    item: "Action",
    details: "Optional. Add it only when the user can recover immediately from the empty state.",
  },
];

const propRows = [
  {
    prop: "illustration",
    type: "ReactNode",
    default: "—",
    description:
      "Custom illustration node. Use this when you want full control over the visual or need more than a static image.",
  },
  {
    prop: "imageSrc / imageAlt",
    type: "string / string",
    default: "— / \"\"",
    description:
      "Convenience API for illustrations stored in public. Prefer decorative alt text when the message is already fully explained by title and description.",
  },
  {
    prop: "title",
    type: "ReactNode",
    default: "required",
    description: "Primary message shown below the illustration.",
  },
  {
    prop: "description",
    type: "ReactNode",
    default: "—",
    description: "Optional supporting guidance for the empty state.",
  },
  {
    prop: "action",
    type: "ReactNode",
    default: "—",
    description: "Optional action area for recovery or next-step buttons.",
  },
  {
    prop: "size",
    type: '"compact" | "default"',
    default: '"default"',
    description: "Controls the illustration size and vertical spacing rhythm.",
  },
];

const accessibilityRows = [
  {
    item: "Meaningful copy",
    details:
      "Do not rely on the illustration alone. Title and description should make the empty state understandable without the image.",
  },
  {
    item: "Decorative imagery",
    details:
      "If the illustration is purely decorative, keep alt text empty. If it adds meaning beyond the copy, provide an explicit alt description.",
  },
  {
    item: "Action clarity",
    details:
      "When you render an action, the button label should explain the next step clearly, not just say “Continue” or “Open”.",
  },
];

export default function EmptyStatePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Use EmptyState for sections, cards, and pages that currently have no content to show. Keep the composition lightweight and let the title carry the main message."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Search results"
              description="The default size works well for card and page-level empty moments."
            >
              <EmptyState
                illustration={<EmptyStateIllustration tone="search" />}
                title="No results found"
                description="Try adjusting your filters or creating a new record."
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Actionable recovery"
              description="Use the optional action when the empty state can be resolved immediately."
            >
              <EmptyState
                illustration={<EmptyStateIllustration tone="tasks" />}
                title="Your task list is empty"
                description="Start by creating your first task for today."
                action={<Button>Create task</Button>}
              />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The pattern is intentionally simple: one calm surface for the illustration, one strong message, and an optional supporting line."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Default size"
              description="Closer to the current homepage treatment, with a 128px illustration container."
            >
              <EmptyState
                illustration={<EmptyStateIllustration tone="search" />}
                title="No results found"
              />
            </ShowcaseCard>
            <ShowcaseCard
              title="Compact size"
              description="Useful for denser cards, side panels, and tighter sections."
            >
              <EmptyState
                size="compact"
                illustration={<EmptyStateIllustration tone="tasks" />}
                title="No tasks to display"
              />
            </ShowcaseCard>
          </div>
          <div className="mt-6">
            <NotesTable rows={patternRows} />
          </div>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="The API is intentionally small so empty states stay consistent across the product while still accepting custom illustrations and optional actions."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["empty-state"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="The empty state pattern should remain understandable with and without its illustration."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
