"use client";

import * as React from "react";
import {
  BarChart3,
  Building2,
  CalendarDays,
  Boxes,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  Plus,
  TestTubeDiagonal,
  Settings,
  Users,
} from "@/lib/icons";
import { AnimatedDuboLogo } from "@/components/branding/animated-dubo-logo";
import {
  SideNavigation,
  SideNavigationMobile,
  type SideNavigationAction,
  type SideNavigationProfile,
  type SideNavigationSection,
} from "@/components/ui/side-navigation";
import { Button } from "@/components/ui/button";

export const sideNavigationSections: SideNavigationSection[] = [
  {
    label: "Main navigation",
    items: [
      {
        id: "home",
        label: "Home",
        icon: <LayoutGrid className="size-5" />,
        href: "#",
        active: true,
      },
      {
        id: "patients",
        label: "Pacientes",
        icon: <Users className="size-5" />,
        href: "#",
      },
      {
        id: "scheduling",
        label: "Agendamento",
        icon: <CalendarDays className="size-5" />,
        href: "#",
      },
      {
        id: "labs",
        label: "Labs",
        icon: <TestTubeDiagonal className="size-5" />,
        href: "#",
      },
      {
        id: "marketing",
        label: "Marketing",
        icon: <Megaphone className="size-5" />,
        href: "#",
      },
      {
        id: "reports",
        label: "Reports",
        icon: <BarChart3 className="size-5" />,
        href: "#",
      },
      {
        id: "inventory",
        label: "Inventário",
        icon: <Boxes className="size-5" />,
        href: "#",
      },
      {
        id: "admin",
        label: "Admin",
        icon: <Building2 className="size-5" />,
        href: "#",
      },
      {
        id: "settings",
        label: "Settings",
        icon: <Settings className="size-5" />,
        href: "#",
      },
    ],
  },
];

export const sideNavigationPrimaryAction: SideNavigationAction = {
  label: "Quick links",
  icon: <Plus className="size-5" />,
  href: "#",
};

export const sideNavigationSecondaryAction: SideNavigationAction = {
  label: "Chat",
  icon: <MessageSquare className="size-5" />,
  href: "#",
  badge: (
    <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--color-brand)] px-1.5 text-body-sm font-medium text-[color:var(--color-text-on-brand)]">
      3
    </span>
  ),
};

export const sideNavigationProfile: SideNavigationProfile = {
  name: "Olivia Parker",
  title: "Practice owner",
  avatarFallback: "OP",
  actions: [
    { label: "Account", href: "#" },
    { label: "Support center", href: "#" },
    { label: "Terms and conditions", href: "#" },
    { label: "Privacy policy", href: "#" },
    { label: "Complaints book", href: "#" },
    { label: "Log out", href: "#", tone: "danger" },
  ],
};

export function SideNavigationDemoLogo() {
  return <AnimatedDuboLogo collapsed={false} className="h-14 w-auto" />;
}

export function SideNavigationDemoCollapsedLogo() {
  return <AnimatedDuboLogo collapsed className="h-14 w-auto" />;
}

export function SideNavigationDesktopDemo({
  defaultCollapsed = false,
}: {
  defaultCollapsed?: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-input)]">
      <div className="flex h-[720px] bg-[var(--color-bg-input)]">
        <SideNavigation
          defaultCollapsed={defaultCollapsed}
          renderLogo={({ collapsed }) => (
            <AnimatedDuboLogo collapsed={collapsed} className="h-14 w-auto" />
          )}
          sections={sideNavigationSections}
          primaryAction={sideNavigationPrimaryAction}
          secondaryAction={sideNavigationSecondaryAction}
          profile={sideNavigationProfile}
        />
        <div className="flex flex-1 flex-col gap-6 bg-[var(--color-bg-input)] p-8">
          <div className="rounded-[20px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)] p-6">
            <div className="mb-4 text-heading-3 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              Home
            </div>
            <div className="flex flex-col gap-3">
              <div className="h-3 w-40 rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-[72%] rounded-full bg-[var(--color-hover)]" />
            </div>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {Array.from({ length: 2 }).map((_, index) => (
              <div
                key={index}
                className="rounded-[20px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)] p-6"
              >
                <div className="mb-4 h-3 w-28 rounded-full bg-[var(--color-hover)]" />
                <div className="space-y-3">
                  <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
                  <div className="h-3 w-[84%] rounded-full bg-[var(--color-hover)]" />
                  <div className="h-3 w-[58%] rounded-full bg-[var(--color-hover)]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SideNavigationMobileDemo({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-input)]">
      <div className="relative h-[760px] bg-[var(--color-bg-input)]">
        <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-[var(--color-brand)]" />
            <div className="h-3 w-24 rounded-full bg-[var(--color-hover)]" />
          </div>
          <Button variant="secondary" size="sm" onClick={() => setOpen(true)}>
            Open navigation
          </Button>
        </div>

        <div className="space-y-4 p-5">
          <div className="rounded-[20px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)] p-5">
            <div className="mb-4 h-3 w-28 rounded-full bg-[var(--color-hover)]" />
            <div className="space-y-3">
              <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-[80%] rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-[56%] rounded-full bg-[var(--color-hover)]" />
            </div>
          </div>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <SideNavigationMobile
            responsive={false}
            position="absolute"
            open={open}
            onOpenChange={setOpen}
            logo={<AnimatedDuboLogo collapsed={false} className="h-14 w-auto" />}
            sections={sideNavigationSections}
            primaryAction={sideNavigationPrimaryAction}
            secondaryAction={sideNavigationSecondaryAction}
            profile={sideNavigationProfile}
          />
        </div>
      </div>
    </div>
  );
}
