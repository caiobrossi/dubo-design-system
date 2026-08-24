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
import {
  FieldTriggerChipsDemo,
  FieldTriggerEmptyDemo,
  FieldTriggerValueDemo,
} from "./demo";

const entry = getComponentDoc("field-trigger");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const styleRows = [
  {
    item: "Field first",
    details: "This trigger should read like a normal floating field before the user understands it opens a richer surface.",
  },
  {
    item: "Dialog launcher",
    details: "Use it for selections that need chips, summaries, or a dedicated modal instead of a simple dropdown.",
  },
  {
    item: "Rich value slot",
    details: "The body area accepts text, badges, or compact actions while keeping the same vertical rhythm as Select.",
  },
];

const propRows = [
  {
    prop: "label",
    type: "ReactNode",
    default: "required",
    description: "Floating label shown inside the field shell and compacted when the field is active or already has value.",
  },
  {
    prop: "open / hasValue",
    type: "boolean",
    default: "false",
    description: "Controls floating-label state and open-field styling independently from the content body.",
  },
  {
    prop: "triggerIcon",
    type: "ReactNode",
    default: "—",
    description: "Trailing affordance such as a chevron, without changing the body layout.",
  },
  {
    prop: "children",
    type: "ReactNode",
    default: "—",
    description: "Custom value slot for text summaries, chips, or small inline actions.",
  },
  {
    prop: "variant",
    type: "\"outline\" | \"filled\"",
    default: "\"outline\"",
    description: "Matches the same field language already used by Input, Select, DateField, and TimeField.",
  },
];

const integrationRows = [
  {
    item: "Nested actions",
    details: "Use Button for clear, favorite, or inline management actions inside the value slot so the trigger stays in the design system language.",
  },
  {
    item: "Keyboard behavior",
    details: "The trigger activates on Enter and Space so product flows keep button-like accessibility even when nested actions exist inside.",
  },
  {
    item: "Product fit",
    details: "Ideal for cases like procedure selectors, patient summary pickers, or any field that opens a full dialog instead of a dropdown.",
  },
];

export default function FieldTriggerPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="FieldTrigger is for controls that must look like a floating field while opening a dialog, sheet, or richer selection workflow."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Empty" description="Resting field shell before any selection exists.">
              <FieldTriggerEmptyDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Value" description="Single selected summary with inline clear action.">
              <FieldTriggerValueDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Chips" description="Multiple selected entities without leaving the field language.">
              <FieldTriggerChipsDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The component should feel like part of the field family, not like a button pretending to be an input."
        >
          <NotesTable rows={styleRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="Keep the shell generic and push product-specific content into the children slot."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["field-trigger"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="integration"
          title="Integration"
          description="This trigger is especially useful when a classic Select would not be expressive enough for the flow."
        >
          <NotesTable rows={integrationRows} />
        </DocsSection>
      </div>
    </div>
  );
}
