import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Card — Dubo Design System",
  description:
    "Container component with 2 variants, reusable shadow options, 5 sub-components, and shared surface/glass token reuse.",
};

/* ── Helpers ── */

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-start gap-4">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function CardPage() {
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
              Card
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Container component for grouping related content. 2 variants (base and faded), 5
              composable sub-components following the shadcn pattern, and direct reuse of shared
              surface, shadow, radius, and glass tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Two variants to fit different surface contexts. The base variant is the default solid card. The faded variant uses a frosted glass effect for layering on gradients or images."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Base (default) — solid white background with subtle border">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Patient Overview</CardTitle>
                <CardDescription>Summary of the patient record and recent visits.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-md text-subtext-color">
                  Last visit was 3 days ago. Next appointment tomorrow at 14:00.
                </p>
              </CardContent>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard title="Faded — frosted glass effect">
            <div
              className="w-full rounded-2xl p-6"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-brand-subtle), var(--color-accent-subtle))",
              }}
            >
              <Card variant="faded" className="max-w-sm">
                <CardHeader>
                  <CardTitle>Clinic Schedule</CardTitle>
                  <CardDescription>
                    The faded variant is designed for colored or image backgrounds.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-body-md text-subtext-color">
                    The frosted glass lets the background gradient show through subtly.
                  </p>
                </CardContent>
              </Card>
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Strong shadow — Quick Links elevation">
            <Card shadow="xl" className="max-w-sm">
              <CardHeader>
                <CardTitle>Floating palette</CardTitle>
                <CardDescription>
                  Reuses the stronger elevation originally used in Quick Links.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-md text-subtext-color">
                  Use this option when a card needs to feel more detached from the page.
                </p>
              </CardContent>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard title="Side by side comparison">
            <ShowcaseRow label="Base">
              <Card className="w-64">
                <CardHeader>
                  <CardTitle>Base</CardTitle>
                  <CardDescription>Solid background</CardDescription>
                </CardHeader>
              </Card>
            </ShowcaseRow>
            <ShowcaseRow label="Faded">
              <div
                className="rounded-xl p-4"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-brand-subtle), var(--color-accent-subtle))",
                }}
              >
                <Card variant="faded" className="w-64">
                  <CardHeader>
                    <CardTitle>Faded</CardTitle>
                    <CardDescription>Frosted glass</CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </ShowcaseRow>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Sub-components ── */}
      <DocsSection
        id="sub-components"
        title="Sub-components"
        description="Card follows the shadcn composable pattern. Mix and match sub-components to build exactly the card layout you need."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Full card — Header + Content + Footer">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  Review the appointment information before confirming.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 text-body-md">
                  <div className="flex justify-between">
                    <span className="text-subtext-color">Date</span>
                    <span className="text-default-font">March 25, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-subtext-color">Time</span>
                    <span className="text-default-font">14:00 - 15:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-subtext-color">Procedure</span>
                    <span className="text-default-font">Cleaning</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" size="sm">
                  Cancel
                </Button>
                <Button size="sm">Confirm</Button>
              </CardFooter>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard title="Header only">
            <Card className="max-w-sm">
              <CardHeader>
                <CardTitle>Quick stat</CardTitle>
                <CardDescription>12 appointments scheduled today.</CardDescription>
              </CardHeader>
            </Card>
          </ShowcaseCard>

          <ShowcaseCard title="Content only">
            <Card className="max-w-sm">
              <CardContent>
                <p className="text-body-md text-subtext-color">
                  A minimal card with just content. No header or footer needed.
                </p>
              </CardContent>
            </Card>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Composition ── */}
      <DocsSection
        id="composition"
        title="Composition Examples"
        description="Real-world patterns showing cards in common dental clinic UI layouts."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Stats grid">
            <div className="grid w-full grid-cols-3 gap-4">
              {[
                { title: "Patients", value: "1,247" },
                { title: "Today", value: "12" },
                { title: "Revenue", value: "$8,420" },
              ].map((stat) => (
                <Card key={stat.title}>
                  <CardHeader>
                    <CardDescription>{stat.title}</CardDescription>
                    <CardTitle>{stat.value}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="Notification card with action">
            <Card className="max-w-md">
              <CardHeader>
                <CardTitle>Payment Overdue</CardTitle>
                <CardDescription>Invoice #1042 for Maria Silva is 7 days past due.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Dismiss
                </Button>
                <Button size="sm">Send Reminder</Button>
              </CardFooter>
            </Card>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props, sub-components, and CSS custom properties."
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
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">variant</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"base" | "faded"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"base"`}</td>
                <td className="px-4 py-3">Visual style of the card</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">className</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">-</td>
                <td className="px-4 py-3">Additional CSS classes for overrides</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Sub-component
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Element</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["Card", "div", "Root container with variant styling"],
                ["CardHeader", "div", "Top section for title and description"],
                ["CardTitle", "h3", "Heading text (text-heading-3 font-semibold"],
                ["CardDescription", "p", "Subtitle text in secondary color"],
                ["CardContent", "div", "Main content area"],
                ["CardFooter", "div", "Bottom section for actions"],
              ].map(([name, el, desc]) => (
                <tr key={name}>
                  <td className="px-4 py-3 font-mono text-body-sm">{name}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{el}</td>
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
              {componentTokenDocs["card"].tokens.map(({ token, value, usage }) => (
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
