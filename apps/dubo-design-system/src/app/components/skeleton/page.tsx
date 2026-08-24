import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Skeleton — Dubo Design System",
  description:
    "Loading placeholder component with 3 variants (text, circle, card), pulse animation, and configurable dimensions.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

export default function SkeletonPage() {
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
              Skeleton
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Pulse animation loading placeholders. 3 variants: text (rectangle), circle, and card
              (rounded rectangle). Uses shared surface radius and sizing tokens for the default
              shapes.
            </p>
          </div>
        </div>
      </section>

      {/* Variants */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Three shape variants to match common content types."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Text — rectangle, full width, 20px height">
            <div className="flex max-w-md flex-col gap-2">
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-3/4" />
              <Skeleton variant="text" className="w-1/2" />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Circle — 36px default, customizable">
            <div className="flex items-center gap-3">
              <Skeleton variant="circle" className="size-[24px]" />
              <Skeleton variant="circle" />
              <Skeleton variant="circle" className="size-[48px]" />
              <Skeleton variant="circle" className="size-[64px]" />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Card — rounded rectangle, 120px height">
            <div className="max-w-md">
              <Skeleton variant="card" />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* Patterns */}
      <DocsSection
        id="patterns"
        title="Loading Patterns"
        description="Common loading state compositions."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Card loading">
            <div className="flex w-[320px] flex-col gap-4">
              <div className="flex items-center gap-3">
                <Skeleton variant="circle" className="size-[40px]" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton variant="text" className="h-[16px] w-3/4" />
                  <Skeleton variant="text" className="h-[12px] w-1/2" />
                </div>
              </div>
              <Skeleton variant="text" />
              <Skeleton variant="text" className="w-4/5" />
              <Skeleton variant="card" className="h-[80px]" />
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Table rows">
            <div className="flex max-w-lg flex-col gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <Skeleton variant="circle" className="size-[32px]" />
                  <Skeleton variant="text" className="h-[14px] flex-1" />
                  <Skeleton variant="text" className="h-[14px] w-[80px]" />
                  <Skeleton variant="text" className="h-[14px] w-[60px]" />
                </div>
              ))}
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Profile header">
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" className="size-[64px]" />
              <div className="flex flex-col gap-2">
                <Skeleton variant="text" className="h-[20px] w-[200px]" />
                <Skeleton variant="text" className="h-[14px] w-[150px]" />
              </div>
            </div>
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
                ["variant", '"text" | "circle" | "card"', '"text"', "Shape variant"],
                ["className", "string", "—", "Override width/height/border-radius"],
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
              {componentTokenDocs["skeleton"].tokens.map(({ token, value, usage }) => (
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
