import type { Metadata } from "next";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { getComponentDoc } from "@/lib/content-registry";

export const metadata: Metadata = {
  title: "Tabs — Dubo Design System",
  description:
    "Inline underline tabs with animated sliding indicator. 2 sizes, disabled state, and full keyboard navigation via Radix UI.",
};

const entry = getComponentDoc("tabs");

/* ── Helpers ── */

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function TabsPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <ComponentHero entry={entry} />

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Default inline underline style. The active tab has a sliding indicator that animates between tabs using a spring transition."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default tabs">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>

          <ShowcaseCard title="Two tabs">
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="past">Past</TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>

          <ShowcaseCard title="Many tabs">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="api">API</TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Two sizes to match different density contexts — compact tables (32px) and standard pages (40px)."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Size comparison">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 32px">
                <Tabs defaultValue="overview">
                  <TabsList size="sm">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                  </TabsList>
                </Tabs>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Content ── */}
      <DocsSection
        id="with-content"
        title="With Content"
        description="Tabs with content panels. Each TabsContent panel is shown when its corresponding trigger is active. Use defaultValue for uncontrolled mode in server components."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Patient record tabs">
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">Patient Info</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="treatments">Treatments</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Patient demographic information, contact details, and insurance data would be
                    displayed here.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="history">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Complete medical and dental history, allergies, medications, and past
                    procedures.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="treatments">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Treatment plans, in-progress procedures, and completed treatments with notes.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="documents">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Uploaded documents, X-rays, consent forms, and lab reports.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </ShowcaseCard>

          <ShowcaseCard title="Settings tabs">
            <Tabs defaultValue="general">
              <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
              </TabsList>
              <TabsContent value="general">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    General clinic settings including name, address, timezone, and business hours.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="notifications">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Configure email, SMS, and push notification preferences for appointments and
                    reminders.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="appearance">
                <div className="rounded-xl border border-neutral-200 bg-white p-4">
                  <p className="text-body-md text-default-font">
                    Theme settings, logo upload, and branding customization options.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Disabled tabs reduce to 40% opacity and block pointer events. Use the disabled prop on individual TabsTrigger elements."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Disabled tabs">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports" disabled>
                  Reports
                </TabsTrigger>
                <TabsTrigger value="settings" disabled>
                  Settings
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>

          <ShowcaseCard title="Single disabled tab">
            <Tabs defaultValue="active">
              <TabsList>
                <TabsTrigger value="active">Active patients</TabsTrigger>
                <TabsTrigger value="archived" disabled>
                  Archived
                </TabsTrigger>
                <TabsTrigger value="all">All patients</TabsTrigger>
              </TabsList>
            </Tabs>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection id="api" title="API Reference" description="Props and CSS custom properties.">
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Component</th>
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
                <td className="px-4 py-3 font-mono text-body-sm">Tabs</td>
                <td className="px-4 py-3 font-mono text-body-sm">value</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Controlled active tab value</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">Tabs</td>
                <td className="px-4 py-3 font-mono text-body-sm">defaultValue</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Uncontrolled initial active tab value</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">Tabs</td>
                <td className="px-4 py-3 font-mono text-body-sm">onValueChange</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`(value: string) => void`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Callback when the active tab changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">TabsList</td>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size: sm=32px, default=40px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">TabsTrigger</td>
                <td className="px-4 py-3 font-mono text-body-sm">value</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Unique value identifying this tab (required)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">TabsTrigger</td>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the tab (40% opacity, no pointer events)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">TabsContent</td>
                <td className="px-4 py-3 font-mono text-body-sm">value</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">
                  Matches the corresponding TabsTrigger value (required)
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
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["tabs"].tokens.map(({ token, value, usage }, index) => (
                <tr key={`${token}-${index}`}>
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
