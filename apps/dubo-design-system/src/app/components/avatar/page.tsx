"use client";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

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

export default function AvatarPage() {
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
              Avatar
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Visual representation of a user or entity. 3 display types (initials, image,
              placeholder or fallback marker), 2 semantic variants, 5 sizes, status badges, and
              avatar groups with count indicator.
            </p>
          </div>
        </div>
      </section>

      {/* ── Types ── */}
      <DocsSection
        id="types"
        title="Avatar Types"
        description="Three ways to display an avatar: initials from a name, a photo image, or an optional placeholder illustration when you want a richer empty state. Without initials or image, the component falls back to a simple marker."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Initials — auto-generated from name">
            <Avatar name="Kai Brossi" />
            <Avatar name="Maria Silva" variant="brand" />
            <Avatar name="John Doe" variant="neutral" />
            <Avatar initials="DR" variant="brand" />
          </ShowcaseCard>

          <ShowcaseCard title="Image — photo of the person">
            <Avatar src="https://i.pravatar.cc/80?u=type1" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/80?u=type2" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/80?u=type3" alt="User 3" />
          </ShowcaseCard>

          <ShowcaseCard title="Fallback — default user icon">
            <Avatar variant="neutral" />
            <Avatar variant="brand" />
            <Avatar variant="brand" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Two semantic variants control the avatar fill and text color. Use the separate status badge for presence states like online, offline, and busy."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Available variants with initials">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Brand (default)">
                <Avatar variant="brand" initials="KB" />
                <Avatar variant="brand" initials="KB" size="lg" />
              </ShowcaseRow>
              <ShowcaseRow label="Neutral">
                <Avatar variant="neutral" initials="NE" />
                <Avatar variant="neutral" initials="NE" size="lg" />
              </ShowcaseRow>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Sizes ── */}
      <DocsSection
        id="sizes"
        title="Sizes"
        description="Five sizes from 24px to 64px to match different density contexts — compact lists, standard views, and profile headers."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="All sizes — initials">
            <div className="flex flex-col gap-4">
              <ShowcaseRow label="Extra Small — 24px">
                <Avatar size="xs" initials="XS" />
                <Avatar size="xs" initials="XS" variant="brand" />
                <Avatar size="xs" variant="neutral" />
              </ShowcaseRow>
              <ShowcaseRow label="Small — 32px">
                <Avatar size="sm" initials="SM" />
                <Avatar size="sm" initials="SM" variant="brand" />
                <Avatar size="sm" variant="neutral" />
              </ShowcaseRow>
              <ShowcaseRow label="Default — 40px">
                <Avatar initials="MD" />
                <Avatar initials="MD" variant="brand" />
                <Avatar variant="neutral" />
              </ShowcaseRow>
              <ShowcaseRow label="Large — 48px">
                <Avatar size="lg" initials="LG" />
                <Avatar size="lg" initials="LG" variant="brand" />
                <Avatar size="lg" variant="neutral" />
              </ShowcaseRow>
              <ShowcaseRow label="Extra Large — 64px">
                <Avatar size="xl" initials="XL" />
                <Avatar size="xl" initials="XL" variant="brand" />
                <Avatar size="xl" variant="neutral" />
              </ShowcaseRow>
            </div>
          </ShowcaseCard>

          <ShowcaseCard title="All sizes — image">
            <Avatar size="xs" src="https://i.pravatar.cc/48?u=sz1" />
            <Avatar size="sm" src="https://i.pravatar.cc/64?u=sz2" />
            <Avatar src="https://i.pravatar.cc/80?u=sz3" />
            <Avatar size="lg" src="https://i.pravatar.cc/96?u=sz4" />
            <Avatar size="xl" src="https://i.pravatar.cc/128?u=sz5" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Status Badge ── */}
      <DocsSection
        id="status"
        title="Status Badge"
        description="Online, offline, and busy status indicators positioned at the bottom-right corner of the avatar."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Status badges — initials">
            <Avatar initials="ON" status="online" />
            <Avatar initials="OF" status="offline" variant="neutral" />
            <Avatar initials="BU" status="busy" variant="neutral" />
          </ShowcaseCard>

          <ShowcaseCard title="Status badges — images">
            <Avatar src="https://i.pravatar.cc/80?u=st1" status="online" />
            <Avatar src="https://i.pravatar.cc/80?u=st2" status="offline" />
            <Avatar src="https://i.pravatar.cc/80?u=st3" status="busy" />
          </ShowcaseCard>

          <ShowcaseCard title="Status badges — different sizes">
            <Avatar size="sm" initials="SM" status="online" />
            <Avatar initials="MD" status="online" />
            <Avatar size="lg" initials="LG" status="online" />
            <Avatar size="xl" initials="XL" status="online" />
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Avatar Group ── */}
      <DocsSection
        id="group"
        title="Avatar Group"
        description="Stack multiple avatars with overlap. Use max to limit visible avatars and show a count badge for the rest."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Basic group">
            <AvatarGroup>
              <Avatar initials="AB" variant="brand" />
              <Avatar initials="CD" variant="brand" />
              <Avatar initials="EF" variant="neutral" />
              <Avatar initials="GH" variant="brand" />
            </AvatarGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Image group">
            <AvatarGroup>
              <Avatar src="https://i.pravatar.cc/80?u=gr1" />
              <Avatar src="https://i.pravatar.cc/80?u=gr2" />
              <Avatar src="https://i.pravatar.cc/80?u=gr3" />
              <Avatar src="https://i.pravatar.cc/80?u=gr4" />
              <Avatar src="https://i.pravatar.cc/80?u=gr5" />
            </AvatarGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Group with max={3} — shows +3 count">
            <AvatarGroup max={3}>
              <Avatar src="https://i.pravatar.cc/80?u=mx1" />
              <Avatar src="https://i.pravatar.cc/80?u=mx2" />
              <Avatar src="https://i.pravatar.cc/80?u=mx3" />
              <Avatar src="https://i.pravatar.cc/80?u=mx4" />
              <Avatar src="https://i.pravatar.cc/80?u=mx5" />
              <Avatar src="https://i.pravatar.cc/80?u=mx6" />
            </AvatarGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Small group with count">
            <AvatarGroup max={2}>
              <Avatar size="sm" initials="AB" variant="brand" />
              <Avatar size="sm" initials="CD" variant="brand" />
              <Avatar size="sm" initials="EF" variant="neutral" />
              <Avatar size="sm" initials="GH" variant="brand" />
              <Avatar size="sm" initials="IJ" variant="neutral" />
            </AvatarGroup>
          </ShowcaseCard>

          <ShowcaseCard title="Standalone count badge">
            <div className="flex items-center gap-4">
              <AvatarGroupCount count={5} size="sm" />
              <AvatarGroupCount count={12} />
              <AvatarGroupCount count={99} size="lg" />
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API Reference ── */}
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
                  {`"brand" | "neutral" | "success" | "warning" | "error" | "accent"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"brand"`}</td>
                <td className="px-4 py-3">Background color variant</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">size</td>
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"xs" | "sm" | "default" | "lg" | "xl"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"default"`}</td>
                <td className="px-4 py-3">
                  Size: xs=24px, sm=32px, default=40px, lg=48px, xl=64px
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">src</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Image URL for photo avatar</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">alt</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Alt text for the image</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">initials</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">1-2 letter initials to display</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">name</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">
                  Full name: auto-generates initials if initials prop is not set
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">status</td>
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"online" | "offline" | "busy"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Shows a status badge indicator at bottom-right</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* AvatarGroup props */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  AvatarGroup Prop
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">max</td>
                <td className="px-4 py-3 font-mono text-body-sm">number</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Max visible avatars before showing count badge</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">children</td>
                <td className="px-4 py-3 font-mono text-body-sm">ReactNode</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Avatar elements to group</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CSS Variables table */}
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
              {componentTokenDocs["avatar"].tokens.map(({ token, value, usage }) => (
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
