import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, FileText, LayoutDashboard, Settings, Users, Zap } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  ListItem,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export const metadata: Metadata = {
  title: "Navigation Menu — Dubo Design System",
  description:
    "Horizontal navigation with dropdown content, links, icons, and sub-menu items with descriptions. Built on Radix.",
};

/* ── Helpers ── */

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-start gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function NavigationMenuPage() {
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
              Navigation Menu
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Horizontal navigation with dropdown content panels, simple links, icons, and sub-menu
              items with descriptions. Built on @radix-ui/react-navigation-menu and aligned to the
              shared control, overlay, spacing, icon, and typography roles.
            </p>
          </div>
        </div>
      </section>

      {/* With Dropdowns */}
      <DocsSection
        id="with-dropdowns"
        title="With Dropdowns"
        description="Triggers open dropdown content panels while reusing the same trigger height, radius, and text roles."
      >
        <ShowcaseCard title="Dropdown navigation with featured card">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="flex h-full w-full select-none flex-col justify-end rounded-[var(--radius-md,8px)] bg-gradient-to-b from-[var(--color-brand-subtle)] to-[var(--color-bg-surface)] p-6 no-underline outline-none transition-colors hover:bg-[var(--color-hover)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                          href="/components"
                        >
                          <div className="mb-2 mt-4 text-heading-3 font-medium text-[color:var(--color-text-primary)]">
                            Dubo Design System
                          </div>
                          <p className="text-body-md text-[color:var(--color-text-secondary)]">
                            Build dental clinic interfaces with consistent tokens.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/components" title="Introduction">
                      Overview of the design system architecture.
                    </ListItem>
                    <ListItem href="/components" title="Installation">
                      Step-by-step setup guide.
                    </ListItem>
                    <ListItem href="/components" title="Typography">
                      Font scales and weight tokens.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/components" title="Button" icon={<Zap className="size-4" />}>
                      Primary interaction element.
                    </ListItem>
                    <ListItem
                      href="/components"
                      title="Input"
                      icon={<FileText className="size-4" />}
                    >
                      Two input styles with floating labels.
                    </ListItem>
                    <ListItem
                      href="/components"
                      title="Card"
                      icon={<LayoutDashboard className="size-4" />}
                    >
                      Container for grouping content.
                    </ListItem>
                    <ListItem
                      href="/components"
                      title="Badge"
                      icon={<BarChart3 className="size-4" />}
                    >
                      Status indicators with semantic colors.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
                  Documentation
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ShowcaseCard>
      </DocsSection>

      {/* Simple Links */}
      <DocsSection
        id="simple-links"
        title="Simple Links"
        description="Flat navigation without dropdown content, still using the same trigger recipe."
      >
        <ShowcaseCard title="Horizontal link-only navigation">
          <NavigationMenu>
            <NavigationMenuList>
              {["Dashboard", "Patients", "Schedule", "Settings"].map((label) => (
                <NavigationMenuItem key={label}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </ShowcaseCard>
      </DocsSection>

      {/* With Icons */}
      <DocsSection
        id="with-icons"
        title="With Icons"
        description="Triggers and links with leading icons that stay on the shared menu spacing and icon scale."
      >
        <ShowcaseCard title="Icon-enhanced navigation">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <Users className="size-4" />
                  Team
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem
                      href="/components"
                      title="Members"
                      icon={<Users className="size-4" />}
                    >
                      Manage team members and roles.
                    </ListItem>
                    <ListItem
                      href="/components"
                      title="Analytics"
                      icon={<BarChart3 className="size-4" />}
                    >
                      View team performance metrics.
                    </ListItem>
                    <ListItem
                      href="/components"
                      title="Settings"
                      icon={<Settings className="size-4" />}
                    >
                      Configure team preferences.
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
                  <LayoutDashboard className="size-4" />
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ShowcaseCard>
      </DocsSection>

      {/* API Reference */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Component contracts plus the shared tokens that style triggers, items, viewport, and indicator."
      >
        <div className="flex flex-col gap-6">
          {/* Props */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Component
                  </th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Key Props
                  </th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">NavigationMenu</td>
                  <td className="px-4 py-3 font-mono text-body-md">className</td>
                  <td className="px-4 py-3">Root wrapper, renders viewport automatically</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">NavigationMenuTrigger</td>
                  <td className="px-4 py-3 font-mono text-body-md">children</td>
                  <td className="px-4 py-3">Button that opens dropdown, with chevron icon</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">NavigationMenuContent</td>
                  <td className="px-4 py-3 font-mono text-body-md">className</td>
                  <td className="px-4 py-3">Dropdown panel with enter/exit animations</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">ListItem</td>
                  <td className="px-4 py-3 font-mono text-body-md">title, icon, href</td>
                  <td className="px-4 py-3">
                    Sub-menu item with title, optional icon, and description
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CSS Variables */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    CSS Variable
                  </th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Value</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {componentTokenDocs["navigation-menu"].tokens.map(({ token, value, usage }) => (
                  <tr key={token}>
                    <td className="px-4 py-3 font-mono text-body-md">{token}</td>
                    <td className="px-4 py-3 font-mono text-body-md">{value}</td>
                    <td className="px-4 py-3">{usage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </DocsSection>
    </div>
  );
}
