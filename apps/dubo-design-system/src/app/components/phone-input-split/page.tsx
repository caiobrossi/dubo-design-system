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
  PhoneInputSplitDualDemo,
  PhoneInputSplitEmptyDemo,
  PhoneInputSplitFilledDemo,
} from "./demo";

const entry = getComponentDoc("phone-input-split");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const usageRows = [
  {
    item: "Field family first",
    details: "This component should read like the rest of the floating-field family even though it contains a second trigger for country selection.",
  },
  {
    item: "Split responsibility",
    details: "Use the left segment only for country selection and the main field for the national number, so the interaction stays easy to scan.",
  },
  {
    item: "Reuse across workflows",
    details: "Prefer this component over rebuilding phone inputs locally in registration, suppliers, professionals, clinic settings, or patient flows.",
  },
];

const propRows = [
  {
    prop: "label",
    type: "string",
    default: "required",
    description: "Floating field label shown inside the number input shell.",
  },
  {
    prop: "value / onChange",
    type: "string / change handler",
    default: "controlled by consumer",
    description: "The component stores the full phone value, including country code.",
  },
  {
    prop: "defaultCountry",
    type: "CountryCode",
    default: "\"PT\"",
    description: "Fallback country used when the current value does not include a parseable country.",
  },
  {
    prop: "clearable / onClear",
    type: "boolean / callback",
    default: "false",
    description: "Keeps the inline clear affordance aligned with the rest of the input family.",
  },
  {
    prop: "portalContainer",
    type: "HTMLElement | null",
    default: "optional",
    description: "Use when the country picker lives inside a modal and should portal inside that container instead of the document body.",
  },
];

const integrationRows = [
  {
    item: "Portal-safe in dialogs",
    details: "When used through the compat wrapper, the country picker keeps rendering inside the dialog container so nested overlays continue to work correctly.",
  },
  {
    item: "Search semantics",
    details: "The country list search reuses SearchField so list search stays visually consistent with the rest of the app.",
  },
  {
    item: "Do not hand-style variants",
    details: "If a workflow needs a phone field, use this component instead of assembling a custom flag button and input with local classes.",
  },
];

export default function PhoneInputSplitPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="PhoneInputSplit packages the country picker and number field into one reusable field primitive for real product flows."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <ShowcaseCard title="Empty" description="Ready for a new phone number.">
              <PhoneInputSplitEmptyDemo />
            </ShowcaseCard>
            <ShowcaseCard title="With value" description="Shows the country code and formatted national number.">
              <PhoneInputSplitFilledDemo />
            </ShowcaseCard>
            <ShowcaseCard title="Dual fields" description="Common contact form pairing for phone and WhatsApp.">
              <PhoneInputSplitDualDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="guidelines"
          title="Guidelines"
          description="Keep this component as the single source of truth for split phone fields."
        >
          <NotesTable rows={usageRows} />
        </DocsSection>

        <DocsSection
          id="api"
          title="API"
          description="The component stays controlled, but the design and layout decisions should remain inside the design system."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["phone-input-split"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="integration"
          title="Integration"
          description="Use the design-system component directly in new work, and let legacy wrappers keep compatibility where needed."
        >
          <NotesTable rows={integrationRows} />
        </DocsSection>
      </div>
    </div>
  );
}
