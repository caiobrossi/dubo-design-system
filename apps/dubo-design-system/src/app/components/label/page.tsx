import type { Metadata } from "next";
import { HelpCircle } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Label — Dubo Design System",
  description:
    "Reusable form label with required asterisk, optional indicator, info icon, and description subtext. Uses shared typography roles and semantic colors.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-col gap-4 max-w-sm">{children}</div>
    </div>
  );
}

export default function LabelPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="success">Ready</Badge>
              <Badge variant="info1">Component</Badge>
            </div>
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              Label
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Reusable form label with required asterisk, optional indicator, info icon with
              tooltip, and description subtext. Uses shared typography roles and semantic colors
              that are also consumed by Checkbox, Input, Select, and other form components.
            </p>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <DocsSection
        id="features"
        title="All Features"
        description="Label supports required asterisk, optional text, info icon, and description — all in one component."
      >
        <ShowcaseCard>
          <Label>Default label</Label>
          <Label required>Required field</Label>
          <Label optional>Optional field</Label>
          <Label info="This is a helpful tooltip">With info icon</Label>
          <Label description="Helper text below the label">With description</Label>
          <Label required info="Required for registration" description="Enter your full legal name">
            Full name
          </Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Required ── */}
      <DocsSection
        id="required"
        title="Required"
        description="Shows a red asterisk (*) after the label text to indicate mandatory fields."
      >
        <ShowcaseCard>
          <Label required>Full name</Label>
          <Label required>Email address</Label>
          <Label required>Date of birth</Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Optional ── */}
      <DocsSection
        id="optional"
        title="Optional"
        description='Shows "(optional)" text in muted color after the label. Does not show if required is also true.'
      >
        <ShowcaseCard>
          <Label optional>Phone number</Label>
          <Label optional>Notes</Label>
          <Label optional description="We will never share your phone number">
            Phone number with description
          </Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Info ── */}
      <DocsSection
        id="info"
        title="Info Icon"
        description="Shows a small info circle icon next to the label. Pass a string for tooltip text, or a ReactNode for a custom icon."
      >
        <ShowcaseCard>
          <Label info="Tax identification number used for billing">NIF</Label>
          <Label info="Your preferred contact method">Contact preference</Label>
          <Label info={<HelpCircle className="size-3.5" />}>Custom icon</Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Description ── */}
      <DocsSection
        id="description"
        title="Description"
        description="Shows smaller subtext below the label for additional context."
      >
        <ShowcaseCard>
          <Label description="Enter your full legal name as it appears on your ID">Full name</Label>
          <Label description="We will send a verification code to this address">
            Email address
          </Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Combined ── */}
      <DocsSection
        id="combined"
        title="Combined"
        description="Multiple features together — required + info + description, optional + description, etc."
      >
        <ShowcaseCard>
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
          <Label disabled>Disabled label</Label>
          <Label disabled required description="This field cannot be edited">
            Locked field
          </Label>
        </ShowcaseCard>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props and the shared typography roles and semantic colors used by the component."
      >
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["children", "ReactNode", "—", "Label text"],
                ["htmlFor", "string", "—", "Connects to form control via id"],
                ["required", "boolean", "false", "Shows red asterisk (*)"],
                ["optional", "boolean", "false", 'Shows "(optional)" text'],
                ["info", "string | ReactNode", "—", "Info icon with tooltip or custom content"],
                ["description", "ReactNode", "—", "Subtext below the label"],
                ["disabled", "boolean", "false", "Reduces opacity (40%)"],
                ["className", "string", "—", "Override classes"],
              ].map(([prop, type, def, desc]) => (
                <tr key={prop}>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Token</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["label"].tokens.map(({ token, value, usage }) => (
                <tr key={`${token}-${usage}`}>
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{value}</td>
                  <td className="px-4 py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
