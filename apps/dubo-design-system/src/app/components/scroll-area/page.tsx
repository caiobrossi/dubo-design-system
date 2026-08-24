import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "ScrollArea — Dubo Design System",
  description:
    "Custom scrollbar overlay with thin 4px track, hover expansion, and design token integration.",
};

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

const specialties = [
  "General Dentistry",
  "Orthodontics",
  "Periodontics",
  "Endodontics",
  "Prosthodontics",
  "Oral Surgery",
  "Pediatric Dentistry",
  "Cosmetic Dentistry",
  "Implantology",
  "Radiology",
  "Preventive Care",
  "Emergency Dentistry",
  "Restorative Dentistry",
  "TMJ Treatment",
  "Teeth Whitening",
  "Veneers",
  "Crown & Bridge",
  "Dentures",
  "Root Canal Therapy",
  "Extraction",
];

export default function ScrollAreaPage() {
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
              ScrollArea
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Custom scrollbar overlay built on Radix ScrollArea. Reuses `--space-1` and `--space-2`
              for thickness, with shared neutral tokens for thumb color. Supports vertical,
              horizontal, and bidirectional scrolling with no component-specific tokens.
            </p>
          </div>
        </div>
      </section>

      {/* Vertical */}
      <DocsSection
        id="vertical"
        title="Vertical Scroll"
        description="Default orientation. Constrain the height and content overflows vertically."
      >
        <ShowcaseCard title="List of specialties">
          <ScrollArea className="size-[280px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
            <div className="p-[16px]">
              <h4 className="mb-[16px] text-body-md font-[600] text-[color:var(--color-text-primary)]">
                Dental Specialties
              </h4>
              {specialties.map((item, i) => (
                <div key={item}>
                  <div className="py-[8px] text-body-md text-[color:var(--color-text-secondary)]">
                    {item}
                  </div>
                  {i < specialties.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ShowcaseCard>
      </DocsSection>

      {/* Horizontal */}
      <DocsSection
        id="horizontal"
        title="Horizontal Scroll"
        description="Pass orientation='horizontal' for horizontally overflowing content."
      >
        <ShowcaseCard title="Horizontally scrolling tags">
          <ScrollArea
            orientation="horizontal"
            className="w-full max-w-[500px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
          >
            <div className="flex gap-[12px] p-[16px]">
              {specialties.map((item) => (
                <div
                  key={item}
                  className="flex shrink-0 items-center rounded-full border border-[var(--color-border)] bg-[var(--color-hover)] px-[16px] py-[8px] text-body-sm font-[500] text-[color:var(--color-text-secondary)]"
                >
                  {item}
                </div>
              ))}
            </div>
          </ScrollArea>
        </ShowcaseCard>
      </DocsSection>

      {/* Both */}
      <DocsSection
        id="both"
        title="Both Directions"
        description="Pass orientation='both' for content that overflows in both directions (e.g., wide tables)."
      >
        <ShowcaseCard title="Wide data table">
          <ScrollArea
            orientation="both"
            className="h-[200px] w-full max-w-[500px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
          >
            <div className="w-[700px] p-[16px]">
              <table className="w-full text-body-sm text-[color:var(--color-text-secondary)]">
                <thead>
                  <tr className="border-b border-[var(--color-border)]">
                    {["Patient", "Date", "Procedure", "Doctor", "Status", "Cost"].map((h) => (
                      <th
                        key={h}
                        className="text-body-md font-normal px-[12px] py-[8px] text-left font-[600] text-[color:var(--color-text-primary)]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(10)].map((_, i) => (
                    <tr key={i} className="border-b border-[var(--color-border)]">
                      <td className="whitespace-nowrap px-[12px] py-[8px]">Patient {i + 1}</td>
                      <td className="whitespace-nowrap px-[12px] py-[8px]">
                        2024-0{(i % 9) + 1}-{10 + i}
                      </td>
                      <td className="whitespace-nowrap px-[12px] py-[8px]">
                        {specialties[i % specialties.length]}
                      </td>
                      <td className="whitespace-nowrap px-[12px] py-[8px]">Dr. Smith</td>
                      <td className="whitespace-nowrap px-[12px] py-[8px]">Completed</td>
                      <td className="whitespace-nowrap px-[12px] py-[8px]">$150</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollArea>
        </ShowcaseCard>
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
                [
                  "orientation",
                  '"vertical" | "horizontal" | "both"',
                  '"vertical"',
                  "Which scrollbars to show",
                ],
                ["className", "string", "—", "Applied to the root element (set height/width here)"],
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
              {componentTokenDocs["scroll-area"].tokens.map(({ token, value, usage }) => (
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
