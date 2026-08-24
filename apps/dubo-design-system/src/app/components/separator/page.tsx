import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Separator — Dubo Design System",
  description:
    "Visual divider with horizontal/vertical orientations, label support, and design token integration.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

export default function SeparatorPage() {
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
              Separator
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Visual divider built on Radix Separator. Horizontal and vertical orientations,
              optional centered label text, decorative by default. Zero component-specific tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Orientations */}
      <DocsSection
        id="orientations"
        title="Orientations"
        description="Horizontal (default) divides sections vertically; vertical divides items inline."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Horizontal">
            <div className="flex max-w-md flex-col gap-4">
              <p className="text-body-md text-[color:var(--color-text-primary)]">Section above</p>
              <Separator />
              <p className="text-body-md text-[color:var(--color-text-primary)]">Section below</p>
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Vertical">
            <div className="flex h-[40px] items-center gap-4">
              <span className="text-body-md text-[color:var(--color-text-primary)]">Left</span>
              <Separator orientation="vertical" />
              <span className="text-body-md text-[color:var(--color-text-primary)]">Center</span>
              <Separator orientation="vertical" />
              <span className="text-body-md text-[color:var(--color-text-primary)]">Right</span>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* Label */}
      <DocsSection
        id="label"
        title="With Label"
        description="Pass a label prop to display centered text. Useful for form dividers and section headers."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Label variations">
            <div className="flex max-w-md flex-col gap-6">
              <Separator label="OR" />
              <Separator label="Continue with" />
              <Separator label="Section divider" />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* Patterns */}
      <DocsSection
        id="patterns"
        title="Common Patterns"
        description="Separators in cards, lists, and metadata rows."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Card sections">
            <div className="flex w-[320px] flex-col gap-4 rounded-[16px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-[24px]">
              <h3 className="text-body-lg font-[600] text-[color:var(--color-text-primary)]">
                Patient Info
              </h3>
              <Separator />
              <div className="flex flex-col gap-2">
                <p className="text-body-md text-[color:var(--color-text-secondary)]">Name: John Doe</p>
                <p className="text-body-md text-[color:var(--color-text-secondary)]">DOB: 1990-01-15</p>
              </div>
              <Separator />
              <div className="flex items-center gap-3">
                <span className="text-body-md text-[color:var(--color-text-secondary)]">Active</span>
                <Separator orientation="vertical" className="h-[16px]" />
                <span className="text-body-md text-[color:var(--color-text-secondary)]">Insurance</span>
                <Separator orientation="vertical" className="h-[16px]" />
                <span className="text-body-md text-[color:var(--color-text-secondary)]">3 visits</span>
              </div>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* API */}
      <DocsSection id="api" title="API Reference" description="Props and CSS variables.">
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
                ["orientation", '"horizontal" | "vertical"', '"horizontal"', "Line direction"],
                ["label", "string", "—", "Centered label text (horizontal only)"],
                ["decorative", "boolean", "true", "If true, purely visual"],
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
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  CSS Variable
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Light value
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["separator"].tokens.map(({ token, value, usage }) => (
                <tr key={token}>
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
