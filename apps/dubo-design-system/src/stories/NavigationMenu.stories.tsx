import React from "react";
import Link from "next/link";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { BarChart3, FileText, LayoutDashboard, Settings, Users, Zap } from "@/lib/icons";
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

const meta: Meta<React.ComponentProps<typeof NavigationMenu>> = {
  title: "Components/NavigationMenu",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Navigation Menu** — Dubo Design System component.

Built on @radix-ui/react-navigation-menu. Navigation Menu reuses the shared control, overlay, spacing, icon, and typography roles for both triggers and dropdown content.

### Sub-components
| Component | Purpose |
|---|---|
| \`NavigationMenu\` | Root with viewport |
| \`NavigationMenuList\` | Horizontal list of triggers |
| \`NavigationMenuItem\` | Individual menu slot |
| \`NavigationMenuTrigger\` | Button that opens dropdown |
| \`NavigationMenuContent\` | Dropdown panel |
| \`NavigationMenuLink\` | Link primitive |
| \`ListItem\` | Sub-menu item with title, icon, and description |
| \`NavigationMenuIndicator\` | Arrow indicator under active trigger |

### Tokens
Triggers, list items, viewport, and indicator all derive from shared control height, input radius, body/label roles, spacing scale, focus ring, and overlay surface tokens.
        `,
      },
    },
  },
};

export default meta;

/* ── With Dropdowns ── */

export const WithDropdowns: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="flex h-full w-full select-none flex-col justify-end rounded-[var(--radius-control-input)] bg-gradient-to-b from-[var(--color-brand-subtle)] to-[var(--color-bg-surface)] p-[var(--space-6)] no-underline outline-none transition-colors hover:bg-[var(--color-hover)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                    href="/components"
                  >
                    <div className="mb-[var(--space-2)] mt-[var(--space-4)] text-body-lg font-medium text-[color:var(--color-text-primary)]">
                      Dubo Design System
                    </div>
                    <p className="text-body-md text-[color:var(--color-text-secondary)]">
                      Build dental clinic interfaces with consistent tokens and components.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/components" title="Introduction">
                Overview of the design system architecture and principles.
              </ListItem>
              <ListItem href="/components" title="Installation">
                Step-by-step guide for setting up the design system.
              </ListItem>
              <ListItem href="/components" title="Typography">
                Font scales, weights, and line-height tokens.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem href="/components" title="Button" icon={<Zap className="size-4" />}>
                Primary interaction element with 6 variants and 3 sizes.
              </ListItem>
              <ListItem href="/components" title="Input" icon={<FileText className="size-4" />}>
                Two input styles with floating label animation.
              </ListItem>
              <ListItem
                href="/components"
                title="Card"
                icon={<LayoutDashboard className="size-4" />}
              >
                Container for grouping related content.
              </ListItem>
              <ListItem href="/components" title="Badge" icon={<BarChart3 className="size-4" />}>
                Status indicators with semantic color variants.
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
  ),
};

/* ── Simple Links ── */

export const SimpleLinks: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
            Dashboard
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
            Patients
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
            Schedule
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/components">
            Settings
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
};

/* ── With Icons ── */

export const WithIcons: StoryObj = {
  render: () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Users className="size-4" />
            Team
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[300px] gap-3 p-4">
              <ListItem href="/components" title="Members" icon={<Users className="size-4" />}>
                Manage team members and roles.
              </ListItem>
              <ListItem
                href="/components"
                title="Analytics"
                icon={<BarChart3 className="size-4" />}
              >
                View team performance metrics.
              </ListItem>
              <ListItem href="/components" title="Settings" icon={<Settings className="size-4" />}>
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
  ),
};

/* ── Design Tokens ── */

export const DesignTokens: StoryObj = {
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["navigation-menu"].title}
      tokens={componentTokenDocs["navigation-menu"].tokens}
    />
  ),
};
