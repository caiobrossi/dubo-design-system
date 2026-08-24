import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import { Progress } from "@/components/ui/progress";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { ProgressDemo } from "./demo";

export const metadata: Metadata = {
  title: "Progress — Dubo Design System",
  description:
    "Linear progress bar with 5 color variants, 3 sizes, animated fill, indeterminate mode, and optional label/percentage display.",
};

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      {children}
    </div>
  );
}

/* ── Page ── */

export default function ProgressPage() {
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
              Progress
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Linear progress bar with animated fill. 5 color variants (default, success, warning,
              danger, brand), 3 sizes, indeterminate shimmer animation, and optional label and
              percentage display. All colors from shared semantic tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── Static sections (server component) ── */}
      <ProgressStaticSections />

      {/* ── Interactive demos (client) ── */}
      <ProgressDemo />

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
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
                [
                  "variant",
                  '"default" | "brand" | "success" | "warning" | "danger"',
                  '"default"',
                  "Color variant for the fill bar",
                ],
                [
                  "size",
                  '"sm" | "default" | "lg"',
                  '"default"',
                  "Height — sm=4px, default=8px, lg=12px",
                ],
                ["value", "number", "0", "Progress value from 0 to max"],
                ["max", "number", "100", "Maximum value"],
                ["indeterminate", "boolean", "false", "Show indeterminate shimmer animation"],
                ["label", "string", "—", "Label text above the bar"],
                ["showPercentage", "boolean", "false", "Show percentage text above the bar"],
              ].map(([prop, type, def, description]) => (
                <tr key={prop}>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{description}</td>
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
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["progress"].tokens.map(({ token, value, usage }) => (
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

/* ── Static sections (no client JS needed) ── */

function ProgressStaticSections() {
  return (
    <>
      {/* Variants */}
      <DocsSection
        id="variants"
        title="Variants"
        description="5 color variants using shared semantic status tokens. Default and brand are identical."
      >
        <ShowcaseCard title="All variants at 65%">
          <div className="flex max-w-md flex-col gap-5">
            {(
              [
                ["default", "Default (brand blue)"],
                ["success", "Success (green)"],
                ["warning", "Warning (amber)"],
                ["danger", "Danger (red)"],
                ["brand", "Brand (alias)"],
              ] as const
            ).map(([variant, label]) => (
              <ShowcaseRow key={variant} label={label}>
                <Progress variant={variant} value={65} />
              </ShowcaseRow>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Sizes */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three height options for different density contexts."
      >
        <ShowcaseCard title="Size comparison">
          <div className="flex max-w-md flex-col gap-5">
            <ShowcaseRow label="Small — 4px">
              <Progress size="sm" value={55} />
            </ShowcaseRow>
            <ShowcaseRow label="Default — 8px">
              <Progress size="default" value={55} />
            </ShowcaseRow>
            <ShowcaseRow label="Large — 12px">
              <Progress size="lg" value={55} />
            </ShowcaseRow>
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* With Label */}
      <DocsSection
        id="label"
        title="Label & Percentage"
        description="Optional label and percentage display above the bar."
      >
        <ShowcaseCard title="Label + percentage combinations">
          <div className="flex max-w-md flex-col gap-5">
            <Progress label="Upload progress" value={45} />
            <Progress label="Storage used" value={78} showPercentage />
            <Progress label="Processing" value={90} showPercentage variant="success" />
            <Progress value={62} showPercentage />
          </div>
        </ShowcaseCard>
      </DocsSection>
    </>
  );
}
