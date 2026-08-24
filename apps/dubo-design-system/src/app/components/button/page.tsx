import type { Metadata } from "next";
import {
  Archive,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Loader2,
  Mail,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings,
  Trash2,
  X,
} from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonGroup } from "@/components/ui/button";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Button — Dubo Design System",
  description:
    "Primary action component with 6 variants, 3 sizes, 2 shapes, button group, icon support, and Dubo signature 3D shadow animation.",
};

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
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function ButtonPage() {
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
              Button
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Primary interaction element. 6 variants, 3 sizes, 2 shapes (pill and squarish), button
              group, full icon support, loading state, and the Dubo signature 3D shadow with scale
              animation on the primary variant.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Each variant serves a different level of emphasis. The primary (default) variant has the Dubo signature 3D shadow and scale animation. All other variants use a subtle translate-y press effect."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="All variants — default size (40px)">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </ShowcaseCard>

          <ShowcaseCard title="Default (Primary) — 3D shadow + scale hover + scale press">
            <Button>Save changes</Button>
            <Button>
              <Plus /> New patient
            </Button>
            <Button>
              Continue <ArrowRight />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Secondary — subtle gray bg with matching border + translate-y press">
            <Button variant="secondary">Cancel</Button>
            <Button variant="secondary">
              <Settings /> Settings
            </Button>
            <Button variant="secondary">
              Export <Download />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Outline — 1px border + translate-y press">
            <Button variant="outline">Cancel</Button>
            <Button variant="outline">
              <Mail /> Send email
            </Button>
            <Button variant="outline">
              View all <ArrowRight />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Ghost — text only, no background + translate-y press">
            <Button variant="ghost">Cancel</Button>
            <Button variant="ghost">
              <Pencil /> Edit
            </Button>
            <Button variant="ghost">
              Learn more <ArrowRight />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Link — underline on hover">
            <Button variant="link">Terms of service</Button>
            <Button variant="link">Learn more</Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Three sizes (32px, 40px, 48px) to match different density contexts — compact tables, standard forms, and large CTAs."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Size comparison — all variants">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 32px">
                <Button size="sm">Primary</Button>
                <Button size="sm" variant="secondary">
                  Secondary
                </Button>
                <Button size="sm" variant="outline">
                  Outline
                </Button>
                <Button size="sm" variant="ghost">
                  Ghost
                </Button>
                <Button size="sm" variant="destructive">
                  Destructive
                </Button>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
              </ShowcaseRow>
              <ShowcaseRow label="Large — 48px">
                <Button size="lg">Primary</Button>
                <Button size="lg" variant="secondary">
                  Secondary
                </Button>
                <Button size="lg" variant="outline">
                  Outline
                </Button>
                <Button size="lg" variant="ghost">
                  Ghost
                </Button>
                <Button size="lg" variant="destructive">
                  Destructive
                </Button>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Shape ── */}
      <DocsSection
        id="shape"
        title="Shape — Rounded vs Square"
        description="Toggle between pill shape (rounded-full, default) and squarish (rounded-lg). Use the rounded prop."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Rounded (pill) — default">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
          </ShowcaseCard>

          <ShowcaseCard title="Square (rounded-lg) — rounded={false}">
            <Button rounded={false}>Primary</Button>
            <Button rounded={false} variant="secondary">
              Secondary
            </Button>
            <Button rounded={false} variant="outline">
              Outline
            </Button>
            <Button rounded={false} variant="ghost">
              Ghost
            </Button>
            <Button rounded={false} variant="destructive">
              Destructive
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Icons can be placed on the left, right, or both sides. Icon-only buttons are square and available in all 3 sizes."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon left">
            <Button>
              <Plus /> Add patient
            </Button>
            <Button variant="secondary">
              <Download /> Export
            </Button>
            <Button variant="outline">
              <Mail /> Send
            </Button>
            <Button variant="ghost">
              <Pencil /> Edit
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Icon right">
            <Button>
              Continue <ArrowRight />
            </Button>
            <Button variant="secondary">
              Next <ChevronRight />
            </Button>
            <Button variant="outline">
              View all <ArrowRight />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Icon both sides">
            <Button>
              <ChevronLeft /> Back to list <ChevronRight />
            </Button>
            <Button variant="outline">
              <Search /> Search patients <ArrowRight />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Icon only">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 32px">
                <Button size="icon-sm">
                  <Plus />
                </Button>
                <Button size="icon-sm" variant="secondary">
                  <Settings />
                </Button>
                <Button size="icon-sm" variant="outline">
                  <Pencil />
                </Button>
                <Button size="icon-sm" variant="ghost">
                  <X />
                </Button>
                <Button size="icon-sm" variant="destructive">
                  <Trash2 />
                </Button>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Button size="icon">
                  <Plus />
                </Button>
                <Button size="icon" variant="secondary">
                  <Settings />
                </Button>
                <Button size="icon" variant="outline">
                  <Pencil />
                </Button>
                <Button size="icon" variant="ghost">
                  <X />
                </Button>
                <Button size="icon" variant="destructive">
                  <Trash2 />
                </Button>
              </ShowcaseRow>
              <ShowcaseRow label="Large — 48px">
                <Button size="icon-lg">
                  <Plus />
                </Button>
                <Button size="icon-lg" variant="secondary">
                  <Settings />
                </Button>
                <Button size="icon-lg" variant="outline">
                  <Pencil />
                </Button>
                <Button size="icon-lg" variant="ghost">
                  <X />
                </Button>
                <Button size="icon-lg" variant="destructive">
                  <Trash2 />
                </Button>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── States ── */}
      <DocsSection
        id="states"
        title="States"
        description="Disabled and loading states. Disabled buttons reduce to 40% opacity and block pointer events."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Disabled">
            <Button disabled>Primary</Button>
            <Button variant="secondary" disabled>
              Secondary
            </Button>
            <Button variant="outline" disabled>
              Outline
            </Button>
            <Button variant="ghost" disabled>
              Ghost
            </Button>
            <Button variant="destructive" disabled>
              Destructive
            </Button>
            <Button variant="link" disabled>
              Link
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Loading (with Loader2 spinner)">
            <Button disabled>
              <Loader2 className="animate-spin" /> Saving&hellip;
            </Button>
            <Button variant="secondary" disabled>
              <Loader2 className="animate-spin" /> Loading&hellip;
            </Button>
            <Button variant="outline" disabled>
              <Loader2 className="animate-spin" /> Processing&hellip;
            </Button>
            <Button variant="destructive" disabled>
              <Loader2 className="animate-spin" /> Deleting&hellip;
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Button Group ── */}
      <DocsSection
        id="button-group"
        title="Button Group"
        description="Group buttons together with shared borders. Inner border-radius is removed automatically. Works best with outline variant and rounded={false}."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Outline group — squarish">
            <ButtonGroup>
              <Button variant="outline" rounded={false} size="icon">
                <ChevronLeft />
              </Button>
              <Button variant="outline" rounded={false}>
                <Archive /> Archive
              </Button>
              <Button variant="outline" rounded={false}>
                Report
              </Button>
              <Button variant="outline" rounded={false}>
                Snooze
              </Button>
              <Button variant="outline" rounded={false} size="icon">
                <MoreHorizontal />
              </Button>
            </ButtonGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Secondary group — squarish">
            <ButtonGroup>
              <Button variant="secondary" rounded={false}>
                Day
              </Button>
              <Button variant="secondary" rounded={false}>
                Week
              </Button>
              <Button variant="secondary" rounded={false}>
                Month
              </Button>
            </ButtonGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Outline group — rounded (pill)">
            <ButtonGroup>
              <Button variant="outline">
                <ChevronLeft />
              </Button>
              <Button variant="outline">Page 1 of 10</Button>
              <Button variant="outline">
                <ChevronRight />
              </Button>
            </ButtonGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Vertical group">
            <ButtonGroup orientation="vertical">
              <Button variant="outline" rounded={false}>
                <Settings /> Settings
              </Button>
              <Button variant="outline" rounded={false}>
                <Mail /> Messages
              </Button>
              <Button variant="outline" rounded={false}>
                <Search /> Search
              </Button>
            </ButtonGroup>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Destructive ── */}
      <DocsSection
        id="destructive"
        title="Destructive Actions"
        description="Destructive buttons signal irreversible actions. Use with confirmation dialogs."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Destructive variations">
            <Button variant="destructive">
              <Trash2 /> Delete patient
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 /> Remove
            </Button>
            <Button variant="destructive" size="lg">
              <Trash2 /> Delete all records
            </Button>
            <Button variant="destructive" size="icon">
              <Trash2 />
            </Button>
          </ShowcaseCard>

          <ShowcaseCard title="Common pattern — confirm / cancel pair">
            <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-4">
              <p className="mr-4 text-body-md text-default-font">
                Are you sure you want to delete this patient?
              </p>
              <Button variant="outline">Cancel</Button>
              <Button variant="destructive">
                <Trash2 /> Delete
              </Button>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props, variants, and CSS custom properties."
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
                  {`"default" | "secondary" | "outline" | "ghost" | "destructive" | "link"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Visual style of the button</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"sm" | "default" | "lg" | "icon" | "icon-sm" | "icon-lg"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size: sm=32px, default=40px, lg=48px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">rounded</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">true</td>
                <td className="px-4 py-3">Pill shape (true) or squarish rounded-lg (false)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">asChild</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Render as child element via Radix Slot</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the button (40% opacity, no pointer events)</td>
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
              {componentTokenDocs["button"].tokens.map(({ token, value, usage }) => (
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
                  Press effect
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Hover effect
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["default", "scale(0.97)", "scale(1.03) + blue glow shadow"],
                ["secondary", "translate-y: 1px", "Darker bg"],
                ["outline", "translate-y: 1px", "Light bg fill + darker border"],
                ["ghost", "translate-y: 1px", "Light bg fill"],
                ["destructive", "translate-y: 1px", "Darker red bg"],
                ["link", "—", "Underline"],
              ].map(([variant, press, hover]) => (
                <tr key={variant}>
                  <td className="px-4 py-3 font-mono text-body-sm">{variant}</td>
                  <td className="px-4 py-3">{press}</td>
                  <td className="px-4 py-3">{hover}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
