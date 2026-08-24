import type { Metadata } from "next";
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
import { DentalSurfaceSelectorDemo, DentalToothSelectorDemo } from "./demo";

const entry = getComponentDoc("dental-selector");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Clinical selectors",
    details:
      "Use this pattern when the choice itself is dental-domain specific, like teeth or surfaces, and a plain select would hide too much context.",
  },
  {
    item: "Field first",
    details:
      "The trigger should still feel like part of the floating field family, even when the content opens a richer clinical chooser.",
  },
  {
    item: "Avoid generic overload",
    details:
      "Do not force this component into unrelated multi-select flows. Keep it reserved for dental meaning like FDI teeth and surface selection.",
  },
];

const propRows = [
  {
    prop: "value / onValueChange",
    type: "string[] / setter",
    default: "required",
    description: "Controlled selected identifiers for teeth or surfaces.",
  },
  {
    prop: "quadrantLabels",
    type: "Partial<Record<1 | 2 | 3 | 4, ReactNode>>",
    default: "English defaults",
    description: "Overrides the quadrant headings used by the tooth selector so product areas can localize them.",
  },
  {
    prop: "selectionSummaryFormatter",
    type: "(count) => string",
    default: "`${count} selected`",
    description: "Lets products control the collapsed trigger summary for large dental selections.",
  },
  {
    prop: "options",
    type: "DentalSurfaceOption[]",
    default: "shared surface list",
    description: "Overrides the surface list when a flow needs translated labels or a filtered set.",
  },
  {
    prop: "open / onOpenChange",
    type: "boolean / setter",
    default: "uncontrolled",
    description: "Useful when multiple selectors in the same form need coordinated open state.",
  },
];

const integrationRows = [
  {
    item: "Treatment plans",
    details:
      "The selector already backs the single-visit treatment flow, so new clinical flows should reuse it instead of rebuilding local tooth grids.",
  },
  {
    item: "Surface selection",
    details:
      "The surface variant deliberately stays closer to Combobox so multi-select semantics remain familiar while the labels stay domain-specific.",
  },
  {
    item: "Future reuse",
    details:
      "Ideal for labs, orthodontics, procedure builders, and any upcoming dental forms that need consistent tooth semantics.",
  },
];

export default function DentalSelectorPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Dental Selector turns tooth and surface selection into a first-class design-system pattern instead of a one-off clinical exception."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard
              title="Tooth selector"
              description="FDI tooth picker with quadrant grouping and floating-field trigger."
            >
              <DentalToothSelectorDemo />
            </ShowcaseCard>
            <ShowcaseCard
              title="Surface selector"
              description="Combobox-based dental surface selector for multi-surface treatment flows."
            >
              <DentalSurfaceSelectorDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component keeps dental-specific meaning inside a familiar field shell so clinical flows stay consistent with the rest of Dubo."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Use the tooth selector for quadrant-aware FDI choices and the surface selector when the domain is dental but the interaction is closer to a multiselect field."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["dental-selector"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="integration"
          title="Integration"
          description="This pattern should replace local dental pickers before teams create new custom clinical dropdowns."
        >
          <NotesTable rows={integrationRows} />
        </DocsSection>
      </div>
    </div>
  );
}
