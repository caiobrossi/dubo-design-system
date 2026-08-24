"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription, AlertAction } from "@/components/ui/alert";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { CircleCheck, CircleAlert, AlertTriangle, Info, ShieldCheck } from "@/lib/icons";

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function AlertPage() {
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
              Alert
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Grid-based feedback component for contextual messages. 6 variants (default,
              destructive, info, success, warning, invert), composable sub-components, responsive
              action placement, and direct icon support. Inspired by ReUI patterns.
            </p>
          </div>
        </div>
      </section>

      {/* ── Basic ── */}
      <DocsSection
        id="basic"
        title="Basic"
        description="The simplest alert with just a title and description. No icon, no actions."
      >
        <ShowcaseCard title="Title + description">
          <Alert>
            <AlertTitle>Alert!</AlertTitle>
            <AlertDescription>This is an alert with a title and description.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </DocsSection>

      {/* ── With Icon ── */}
      <DocsSection
        id="with-icon"
        title="With Icon"
        description="Pass any Lucide icon as a direct child of Alert. The grid auto-detects the icon column."
      >
        <ShowcaseCard title="Icon + title + description">
          <Alert>
            <CircleCheck />
            <AlertTitle>Alert!</AlertTitle>
            <AlertDescription>This is an alert with icon, title and description.</AlertDescription>
          </Alert>
        </ShowcaseCard>
      </DocsSection>

      {/* ── With Actions ── */}
      <DocsSection
        id="with-actions"
        title="With Actions"
        description="Use AlertAction for responsive button placement. Buttons stack below on mobile and align inline on sm+ screens."
      >
        <ShowcaseCard title="Icon + actions">
          <Alert>
            <ShieldCheck />
            <AlertTitle>Security Update</AlertTitle>
            <AlertDescription>Update your password and enable 2FA.</AlertDescription>
            <AlertAction>
              <Button variant="outline" size="sm">
                Dismiss
              </Button>
              <Button size="sm">Update</Button>
            </AlertAction>
          </Alert>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Destructive with List ── */}
      <DocsSection
        id="destructive-list"
        title="Destructive with List"
        description="The destructive variant supports rich content like lists inside the description."
      >
        <ShowcaseCard title="Error with checklist">
          <Alert variant="destructive">
            <CircleAlert />
            <AlertTitle>Payment Failed</AlertTitle>
            <AlertDescription>
              <p>Please check your payment details:</p>
              <ul className="mt-1 list-inside list-disc space-y-0.5 text-body-md">
                <li>Card number and expiry</li>
                <li>Billing address</li>
                <li>Available funds</li>
              </ul>
            </AlertDescription>
          </Alert>
        </ShowcaseCard>
      </DocsSection>

      {/* ── All Status Variants ── */}
      <DocsSection
        id="variants"
        title="Status Variants"
        description="Each variant uses semantic status colors for background, border, icon, and text."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Info">
            <Alert variant="info">
              <CircleAlert />
              <AlertTitle>Info! Something important</AlertTitle>
              <AlertDescription>
                This is an important message. Please read it carefully.
              </AlertDescription>
            </Alert>
          </ShowcaseCard>
          <ShowcaseCard title="Success">
            <Alert variant="success">
              <CircleCheck />
              <AlertTitle>Success! All good</AlertTitle>
              <AlertDescription>
                Everything is working as expected. You can continue with your task.
              </AlertDescription>
            </Alert>
          </ShowcaseCard>
          <ShowcaseCard title="Warning">
            <Alert variant="warning">
              <AlertTriangle />
              <AlertTitle>Warning! Something is wrong</AlertTitle>
              <AlertDescription>
                Please check your settings. If the problem persists, contact support.
              </AlertDescription>
            </Alert>
          </ShowcaseCard>
          <ShowcaseCard title="Destructive / Error">
            <Alert variant="destructive">
              <CircleAlert />
              <AlertTitle>Error! Something went wrong</AlertTitle>
              <AlertDescription>
                Please try again. If the problem persists, contact support.
              </AlertDescription>
            </Alert>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Invert ── */}
      <DocsSection
        id="invert"
        title="Invert"
        description="Dark background variant for high-contrast notifications. Combine with colored icons for emphasis."
      >
        <ShowcaseCard title="Invert with success icon">
          <Alert variant="invert">
            <CircleAlert className="text-[color:var(--color-success)]" />
            <AlertTitle>Notification! All good</AlertTitle>
            <AlertDescription>
              This is a notification alert with a title and description.
            </AlertDescription>
          </Alert>
        </ShowcaseCard>
      </DocsSection>

      {/* ── Title Only ── */}
      <DocsSection
        id="title-only"
        title="Title Only"
        description="Compact alerts with just an icon and title for inline messages."
      >
        <ShowcaseCard title="All variants — title only">
          {(["default", "info", "success", "warning", "destructive"] as const).map((variant) => (
            <Alert key={variant} variant={variant}>
              <Info />
              <AlertTitle>
                {variant.charAt(0).toUpperCase() + variant.slice(1)}: title only
              </AlertTitle>
            </Alert>
          ))}
        </ShowcaseCard>
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
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"default" | "destructive" | "info" | "success" | "warning" | "invert"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Visual style of the alert</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">className</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Additional CSS classes</td>
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
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">AlertTitle</td>
                <td className="px-4 py-3 font-mono text-body-sm">div</td>
                <td className="px-4 py-3">Heading text (grid col 2)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">AlertDescription</td>
                <td className="px-4 py-3 font-mono text-body-sm">div</td>
                <td className="px-4 py-3">Body text / rich content (grid col 2)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">AlertAction</td>
                <td className="px-4 py-3 font-mono text-body-sm">div</td>
                <td className="px-4 py-3">
                  Action buttons: stacks on mobile, inline on sm+ (grid col 3)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">SVG icon</td>
                <td className="px-4 py-3 font-mono text-body-sm">svg</td>
                <td className="px-4 py-3">
                  Pass any Lucide icon as direct child: grid auto-detects icon column
                </td>
              </tr>
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
              {componentTokenDocs["alert"].tokens.map(({ token, value, usage }) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{value}</td>
                  <td className="px-4 py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Variant</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Suggested icon
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Color scale
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["default", "Info", "surface (neutral)"],
                ["destructive", "CircleAlert", "danger-subtle/border/text"],
                ["info", "CircleAlert", "info-subtle/border + brand-500"],
                ["success", "CircleCheck", "success-subtle/border/text"],
                ["warning", "AlertTriangle", "warning-subtle/border/text"],
                ["invert", "Any (colored)", "inverted bg, white text"],
              ].map(([variant, icon, colors]) => (
                <tr key={variant}>
                  <td className="px-4 py-3 font-mono text-body-sm">{variant}</td>
                  <td className="px-4 py-3">{icon}</td>
                  <td className="px-4 py-3">{colors}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
