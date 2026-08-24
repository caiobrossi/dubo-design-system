"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

export default function SheetPage() {
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
              Sheet
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Floating side panel / drawer built on Radix Dialog. Sheet reuses the shared overlay,
              elevated surface, spacing, icon, and typography roles, then adds directional motion
              for left, right, top, and bottom layouts.
            </p>
          </div>
        </div>
      </section>

      {/* Directions */}
      <DocsSection
        id="directions"
        title="Directions"
        description="Sheets can slide from any edge while keeping the same shared header, footer, and surface language."
      >
        <ShowcaseCard title="All 4 directions">
          {(["top", "right", "bottom", "left"] as const).map((side) => (
            <Sheet key={side}>
              <SheetTrigger asChild>
                <Button variant="outline" className="capitalize">
                  {side}
                </Button>
              </SheetTrigger>
              <SheetContent side={side}>
                <SheetHeader>
                  <SheetTitle className="capitalize">{side} Sheet</SheetTitle>
                  <SheetDescription>This sheet slides in from the {side}.</SheetDescription>
                </SheetHeader>
                <div className="flex-1 p-[var(--space-6)]">
                  <p className="text-body-md text-[color:var(--color-text-secondary)]">
                    Content area for the {side} sheet.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          ))}
        </ShowcaseCard>
      </DocsSection>

      {/* Composition */}
      <DocsSection
        id="composition"
        title="Composition"
        description="Combine SheetHeader, SheetFooter, SheetTitle, and SheetDescription for common patterns while keeping spacing and type roles consistent."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="With header and footer">
            <Sheet>
              <SheetTrigger asChild>
                <Button>Edit Profile</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Edit Profile</SheetTitle>
                  <SheetDescription>
                    Make changes to your profile here. Click save when done.
                  </SheetDescription>
                </SheetHeader>
                <div className="flex-1 overflow-y-auto p-[var(--space-6)]">
                  <div className="flex flex-col gap-[var(--space-4)]">
                    <div className="flex flex-col gap-[var(--space-1)]">
                      <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                        Name
                      </span>
                      <span className="text-body-md text-[color:var(--color-text-secondary)]">
                        John Doe
                      </span>
                    </div>
                    <div className="flex flex-col gap-[var(--space-1)]">
                      <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                        Email
                      </span>
                      <span className="text-body-md text-[color:var(--color-text-secondary)]">
                        john@example.com
                      </span>
                    </div>
                  </div>
                </div>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </SheetClose>
                  <Button>Save changes</Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </ShowcaseCard>

          <ShowcaseCard title="Navigation (left side)">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary">Open Navigation</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-1 flex-col gap-[var(--space-1)] p-[var(--space-4)]">
                  {["Dashboard", "Patients", "Appointments", "Billing", "Settings"].map((item) => (
                    <div
                      key={item}
                      className="rounded-[var(--radius-control-input)] px-[var(--space-3)] py-[var(--space-2)] text-body-md text-[color:var(--color-text-secondary)] transition-colors hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]"
                    >
                      {item}
                    </div>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* API */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Sub-components, props, and the shared tokens that define Sheet spacing, radius, type, and overlay behavior."
      >
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Component</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                [
                  "SheetContent",
                  "side",
                  '"top" | "right" | "bottom" | "left"',
                  "Direction the sheet slides from (default: right)",
                ],
                ["Sheet", "open", "boolean", "Controlled open state"],
                [
                  "Sheet",
                  "onOpenChange",
                  "(open: boolean) => void",
                  "Called when open state changes",
                ],
              ].map(([comp, prop, type, desc], i) => (
                <tr key={i}>
                  <td className="px-4 py-3 font-mono text-body-sm">{comp}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{prop}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
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
              {componentTokenDocs["sheet"].tokens.map(({ token, value, usage }) => (
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
