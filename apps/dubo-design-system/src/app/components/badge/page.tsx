import type { Metadata } from "next";
import { Check, AlertCircle, Clock, Info, Star, Zap } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

export const metadata: Metadata = {
  title: "Badge — Dubo Design System",
  description:
    "Unified badge and chip component with 6 status variants, 2 intensities, 2 sizes, icon support, avatar, close button, and loading state.",
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

export default function BadgePage() {
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
              Badge
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Unified badge and chip component. 6 status variants, 2 color intensities (soft and
              strong), 2 sizes, icon support, avatar slot, close button, loading spinner, and link
              rendering via asChild.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Six status-based variants, each mapped to a distinct color from the design token palette. Default intensity is soft."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="All variants — soft (default)">
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info1">Info 1</Badge>
            <Badge variant="info2">Info 2</Badge>
            <Badge variant="info3">Info 3</Badge>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Intensities ── */}
      <DocsSection
        id="intensities"
        title="Intensities"
        description="Each variant supports two color intensities. Soft uses a tinted background with a darker tone-on-tone text color. Strong uses a saturated background with high-contrast text."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Soft — tinted bg + dark tone-on-tone text">
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info1">Info 1</Badge>
            <Badge variant="info2">Info 2</Badge>
            <Badge variant="info3">Info 3</Badge>
          </ShowcaseCard>

          <ShowcaseCard title="Strong — saturated bg + high-contrast text">
            <Badge variant="success" intensity="strong">
              Success
            </Badge>
            <Badge variant="error" intensity="strong">
              Error
            </Badge>
            <Badge variant="warning" intensity="strong">
              Warning
            </Badge>
            <Badge variant="info1" intensity="strong">
              Info 1
            </Badge>
            <Badge variant="info2" intensity="strong">
              Info 2
            </Badge>
            <Badge variant="info3" intensity="strong">
              Info 3
            </Badge>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Two sizes: sm (20px) for compact contexts, default (24px) for standard use."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Size comparison">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Small — 20px">
                <Badge size="sm" variant="success">
                  Success
                </Badge>
                <Badge size="sm" variant="error">
                  Error
                </Badge>
                <Badge size="sm" variant="warning">
                  Warning
                </Badge>
                <Badge size="sm" variant="info1">
                  Info 1
                </Badge>
                <Badge size="sm" variant="info2">
                  Info 2
                </Badge>
                <Badge size="sm" variant="info3">
                  Info 3
                </Badge>
              </ShowcaseRow>
              <ShowcaseRow label="Default — 24px">
                <Badge variant="success">Success</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info1">Info 1</Badge>
                <Badge variant="info2">Info 2</Badge>
                <Badge variant="info3">Info 3</Badge>
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Icons ── */}
      <DocsSection
        id="icons"
        title="With Icons"
        description="Icons can be placed inline-start (left) or inline-end (right) via children ordering."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon left">
            <Badge variant="success">
              <Check /> Approved
            </Badge>
            <Badge variant="error">
              <AlertCircle /> Failed
            </Badge>
            <Badge variant="warning">
              <Clock /> Pending
            </Badge>
            <Badge variant="info1">
              <Info /> Info
            </Badge>
            <Badge variant="info2">
              <Star /> Premium
            </Badge>
            <Badge variant="info3">
              <Zap /> Fast
            </Badge>
          </ShowcaseCard>

          <ShowcaseCard title="Icon left — strong">
            <Badge variant="success" intensity="strong">
              <Check /> Approved
            </Badge>
            <Badge variant="error" intensity="strong">
              <AlertCircle /> Failed
            </Badge>
            <Badge variant="warning" intensity="strong">
              <Clock /> Pending
            </Badge>
            <Badge variant="info1" intensity="strong">
              <Info /> Info
            </Badge>
            <Badge variant="info2" intensity="strong">
              <Star /> Premium
            </Badge>
            <Badge variant="info3" intensity="strong">
              <Zap /> Fast
            </Badge>
          </ShowcaseCard>

          <ShowcaseCard title="Icon right">
            <Badge variant="success">
              Approved <Check />
            </Badge>
            <Badge variant="info1">
              Category <Info />
            </Badge>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Features ── */}
      <DocsSection
        id="features"
        title="Features"
        description="Loading spinner, close button, avatar slot, and link rendering."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Loading state">
            <Badge variant="info1" loading>
              Loading&hellip;
            </Badge>
            <Badge variant="warning" loading>
              Processing
            </Badge>
            <Badge variant="success" intensity="strong" loading>
              Saving
            </Badge>
          </ShowcaseCard>

          <ShowcaseCard title="With close button (requires client component)">
            <Badge variant="info1">Removable</Badge>
            <Badge variant="success">Tag</Badge>
            <Badge variant="error" intensity="strong">
              Alert
            </Badge>
          </ShowcaseCard>

          <ShowcaseCard title="With avatar">
            <Badge
              variant="info1"
              avatar={
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=JD&backgroundColor=6366f1"
                  alt="JD"
                  className="h-full w-full object-cover rounded-full"
                />
              }
            >
              John Doe
            </Badge>
            <Badge
              variant="success"
              avatar={
                <img
                  src="https://api.dicebear.com/7.x/initials/svg?seed=AB&backgroundColor=22c55e"
                  alt="AB"
                  className="h-full w-full object-cover rounded-full"
                />
              }
            >
              Alice B.
            </Badge>
          </ShowcaseCard>

          <ShowcaseCard title="As link">
            <Badge variant="info1">Link Badge</Badge>
            <Badge variant="info2" intensity="strong">
              Strong Link
            </Badge>
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
                  {`"success" | "error" | "warning" | "info1" | "info2" | "info3"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"info1"`}</td>
                <td className="px-4 py-3">Status-based color variant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">intensity</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"soft" | "strong"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"soft"`}</td>
                <td className="px-4 py-3">Color intensity: soft (light bg) or strong (dark bg)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"sm" | "default"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">Size: sm=20px, default=24px</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">asChild</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">
                  Render as child element via Radix Slot (e.g. for links)
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">avatar</td>
                <td className="px-4 py-3 font-mono text-body-sm">ReactNode</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Avatar element rendered on the left side</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onClose</td>
                <td className="px-4 py-3 font-mono text-body-sm">{"() => void"}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">
                  Callback for close (X) button; renders the button when provided
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">loading</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Show a loading spinner</td>
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
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["badge"].tokens.map(({ token, value, usage }) => (
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
