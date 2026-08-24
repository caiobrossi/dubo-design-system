import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "RadioGroup — Dubo Design System",
  description:
    "Radio selection component with group label, descriptions, disabled, invalid, and horizontal layout. Reuses shared field-selection, label, and description tokens.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="max-w-sm">{children}</div>
    </div>
  );
}

export default function RadioGroupPage() {
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
              RadioGroup
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Radio selection component built on Radix UI. Reuses shared field-selection, group
              label, item label, and description tokens. Supports disabled, invalid, and horizontal
              layout states.
            </p>
          </div>
        </div>
      </section>

      {/* ── Default ── */}
      <DocsSection id="default" title="Default" description="Basic radio group with label.">
        <ShowcaseCard title="With group label">
          <RadioGroup defaultValue="email" label="Notification method">
            <RadioGroupItem value="email" label="Email" />
            <RadioGroupItem value="sms" label="SMS" />
            <RadioGroupItem value="push" label="Push notification" />
          </RadioGroup>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Descriptions ── */}
      <DocsSection
        id="descriptions"
        title="With Descriptions"
        description="Each radio item can have description text below the label."
      >
        <ShowcaseCard title="Appointment type">
          <RadioGroup defaultValue="standard" label="Appointment type">
            <RadioGroupItem
              value="standard"
              label="Standard"
              description="Regular 30-minute appointment"
            />
            <RadioGroupItem
              value="extended"
              label="Extended"
              description="60-minute comprehensive session"
            />
            <RadioGroupItem
              value="emergency"
              label="Emergency"
              description="Urgent same-day appointment"
            />
          </RadioGroup>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Horizontal ── */}
      <DocsSection
        id="horizontal"
        title="Horizontal Layout"
        description="Use horizontal prop for inline radio groups."
      >
        <ShowcaseCard title="View switcher">
          <RadioGroup defaultValue="day" label="View" horizontal>
            <RadioGroupItem value="day" label="Day" />
            <RadioGroupItem value="week" label="Week" />
            <RadioGroupItem value="month" label="Month" />
          </RadioGroup>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Disabled ── */}
      <DocsSection
        id="disabled"
        title="Disabled"
        description="Disabled reduces to 40% opacity. Can disable the whole group or individual items."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Entire group disabled">
            <RadioGroup defaultValue="active" label="Status" disabled>
              <RadioGroupItem value="active" label="Active" />
              <RadioGroupItem value="inactive" label="Inactive" />
            </RadioGroup>
          </ShowcaseCard>
          <ShowcaseCard title="Single item disabled">
            <RadioGroup defaultValue="free" label="Plan">
              <RadioGroupItem value="free" label="Free" description="Basic features" />
              <RadioGroupItem value="pro" label="Pro" description="All features" />
              <RadioGroupItem
                value="enterprise"
                label="Enterprise"
                description="Coming soon"
                disabled
              />
            </RadioGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Invalid ── */}
      <DocsSection
        id="invalid"
        title="Invalid / Error"
        description="Error state with red border and error message."
      >
        <ShowcaseCard title="Required selection">
          <RadioGroup label="Gender" error errorMessage="Please select an option">
            <RadioGroupItem value="male" label="Male" invalid />
            <RadioGroupItem value="female" label="Female" invalid />
            <RadioGroupItem value="other" label="Other" invalid />
          </RadioGroup>
        </ShowcaseCard>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props and shared field-selection design tokens."
      >
        {/* Props — RadioGroup */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (RadioGroup)
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["defaultValue", "string", "—", "Initially selected value"],
                ["value", "string", "—", "Controlled selected value"],
                ["onValueChange", "(value: string) => void", "—", "Called when selection changes"],
                ["label", "ReactNode", "—", "Group label text"],
                ["helpText", "ReactNode", "—", "Help text below group"],
                ["error", "boolean", "false", "Shows error state"],
                ["errorMessage", "string", "—", "Error message text"],
                ["horizontal", "boolean", "false", "Horizontal layout"],
                ["disabled", "boolean", "false", "Disables entire group"],
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

        {/* Props — RadioGroupItem */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Prop (RadioGroupItem)
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["value", "string", "—", "Value of this radio option (required)"],
                ["label", "ReactNode", "—", "Label text next to the radio"],
                ["description", "ReactNode", "—", "Description below the label"],
                ["invalid", "boolean", "false", "Shows red error border"],
                ["disabled", "boolean", "false", "Disables this item"],
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

        {/* Tokens */}
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
              {componentTokenDocs["radio-group"].tokens.map(({ token, value, usage }) => (
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
