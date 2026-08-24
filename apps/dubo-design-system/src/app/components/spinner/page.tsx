import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { DocsSection } from "@/components/docs/section";
import { Loader2 } from "@/lib/icons";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Spinner — Dubo Design System",
  description:
    "Wave bars loading indicator with 4 sizes (16–40px), 3 color modes, and smooth CSS animation.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

export default function SpinnerPage() {
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
              Spinner
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              CSS-only wave bars loading indicator. 4 sizes (16px to 40px), 3 color modes (muted,
              brand, inherit), and reduced-motion support. Zero component-specific tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Sizes */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="4 sizes mapping to the sizing scale: 16px, 24px, 32px, and 40px."
      >
        <ShowcaseCard title="All sizes">
          <ShowcaseRow label="sm — 16px">
            <Spinner size="sm" />
          </ShowcaseRow>
          <ShowcaseRow label="default — 24px">
            <Spinner size="default" />
          </ShowcaseRow>
          <ShowcaseRow label="lg — 32px">
            <Spinner size="lg" />
          </ShowcaseRow>
          <ShowcaseRow label="xl — 40px">
            <Spinner size="xl" />
          </ShowcaseRow>
        </ShowcaseCard>
      </DocsSection>

      {/* Colors */}
      <DocsSection
        id="colors"
        title="Colors"
        description="Three color modes: default (muted gray), brand (blue), and inherit (adapts to parent color)."
      >
        <ShowcaseCard title="Color modes">
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" color="default" />
              <span className="text-body-sm text-subtext-color">default</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Spinner size="lg" color="brand" />
              <span className="text-body-sm text-subtext-color">brand</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[color:var(--color-danger)]">
              <Spinner size="lg" color="inherit" />
              <span className="text-body-sm text-subtext-color">inherit (red)</span>
            </div>
            <div className="flex flex-col items-center gap-2 text-[color:var(--color-success)]">
              <Spinner size="lg" color="inherit" />
              <span className="text-body-sm text-subtext-color">inherit (green)</span>
            </div>
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Inline Usage */}
      <DocsSection
        id="inline"
        title="Inline Usage"
        description="Spinners work inline with text and inside buttons."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Inline with text">
            <div className="flex items-center gap-2 text-body-md text-[color:var(--color-text-secondary)]">
              <Spinner size="sm" color="brand" /> Loading patients&hellip;
            </div>
          </ShowcaseCard>
          <ShowcaseCard title="Inside buttons (compare with Loader2)">
            <Button disabled>
              <Loader2 className="animate-spin" /> With Loader2
            </Button>
            <Button disabled>
              <Spinner size="sm" color="inherit" /> With wave bars
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* API */}
      <DocsSection id="api" title="API Reference" description="Props and semantic tokens used.">
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
                  "size",
                  '"sm" | "default" | "lg" | "xl"',
                  '"default"',
                  "Spinner size (16/24/32/40px)",
                ],
                ["color", '"default" | "brand" | "inherit"', '"default"', "Color mode"],
                ["label", "string", '"Loading"', "Accessible aria-label"],
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
              {componentTokenDocs["spinner"].tokens.map(({ token, value, usage }) => (
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
