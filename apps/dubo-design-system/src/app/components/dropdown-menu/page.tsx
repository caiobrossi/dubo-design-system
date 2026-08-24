"use client";

import { useState } from "react";
import {
  ChevronDown,
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  Share,
  Trash2,
  User,
  UserPlus,
  Users,
} from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

/* ── Page ── */

export default function DropdownMenuPage() {
  /* Checkbox demo state */
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  /* Radio demo state */
  const [position, setPosition] = useState("bottom");

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
              Dropdown Menu
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Frosted glass dropdown menu built on Radix primitives. Supports items with icons,
              keyboard shortcuts, checkbox and radio groups, nested submenus, destructive actions,
              labels, and separators. Uses the shared overlay glass recipe tokens plus shared
              semantic spacing, type, and motion tokens.
            </p>
          </div>
        </div>
      </section>

      {/* ── Basic ── */}
      <DocsSection
        id="basic"
        title="Basic"
        description="A simple dropdown with a few items, a label, and a separator."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Default dropdown">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Options <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Icons ── */}
      <DocsSection
        id="with-icons"
        title="With Icons"
        description="Items accept an icon prop that renders a leading icon with muted secondary color."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Icon items">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings /> Account <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
                  <DropdownMenuItem icon={<CreditCard />}>Billing</DropdownMenuItem>
                  <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
                  <DropdownMenuItem icon={<Keyboard />}>Keyboard shortcuts</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem icon={<Users />}>Team</DropdownMenuItem>
                  <DropdownMenuItem icon={<UserPlus />}>Invite users</DropdownMenuItem>
                  <DropdownMenuItem icon={<Plus />}>New team</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<LifeBuoy />}>Support</DropdownMenuItem>
                <DropdownMenuItem icon={<Cloud />}>API</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<LogOut />}>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Shortcuts ── */}
      <DocsSection
        id="with-shortcuts"
        title="With Shortcuts"
        description="Use DropdownMenuShortcut inside an item to show a right-aligned keyboard shortcut hint."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Shortcut hints">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Edit <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem icon={<User />}>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem icon={<CreditCard />}>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Settings />}>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Keyboard />}>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<LogOut />}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Checkboxes ── */}
      <DocsSection
        id="with-checkboxes"
        title="With Checkboxes"
        description="DropdownMenuCheckboxItem provides a toggleable checked state with a brand-colored check indicator."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Checkbox items (interactive)">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  View <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={showStatusBar}
                  onCheckedChange={setShowStatusBar}
                >
                  Status bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={showActivityBar}
                  onCheckedChange={setShowActivityBar}
                >
                  Activity bar
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem checked={showPanel} onCheckedChange={setShowPanel}>
                  Panel
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="ml-4 flex flex-col gap-1 text-body-md text-subtext-color">
              <p>Status bar: {showStatusBar ? "visible" : "hidden"}</p>
              <p>Activity bar: {showActivityBar ? "visible" : "hidden"}</p>
              <p>Panel: {showPanel ? "visible" : "hidden"}</p>
            </div>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Radio Group ── */}
      <DocsSection
        id="with-radio"
        title="With Radio Group"
        description="DropdownMenuRadioGroup with DropdownMenuRadioItem for single-select options with a filled circle indicator."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Radio items (interactive)">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Panel position <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                  <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <p className="ml-4 text-body-md text-subtext-color">Current position: {position}</p>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── With Submenus ── */}
      <DocsSection
        id="with-submenus"
        title="With Submenus"
        description="DropdownMenuSub with DropdownMenuSubTrigger and DropdownMenuSubContent for nested navigation. Sub-content uses a smaller border radius (16px)."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Nested submenu">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Actions <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem icon={<User />}>Profile</DropdownMenuItem>
                  <DropdownMenuItem icon={<CreditCard />}>Billing</DropdownMenuItem>
                  <DropdownMenuItem icon={<Settings />}>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem icon={<Users />}>Team</DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger icon={<UserPlus />}>
                      Invite users
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem icon={<Mail />}>Email</DropdownMenuItem>
                        <DropdownMenuItem icon={<MessageSquare />}>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem icon={<PlusCircle />}>More&hellip;</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger icon={<Share />}>Share</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem icon={<Github />}>GitHub</DropdownMenuItem>
                        <DropdownMenuItem icon={<Mail />}>Email link</DropdownMenuItem>
                        <DropdownMenuItem icon={<MessageSquare />}>Slack</DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<LifeBuoy />}>Support</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Destructive ── */}
      <DocsSection
        id="destructive"
        title="Destructive"
        description="Items with destructive={true} use the danger color for text and icon. Use for delete, remove, or irreversible actions."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Destructive items">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  Manage <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Patient Record</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<User />}>View profile</DropdownMenuItem>
                <DropdownMenuItem icon={<Settings />}>Edit details</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<Trash2 />} destructive>
                  Delete patient
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>

          <ShowcaseCard title="Destructive with shortcut">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  File <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem icon={<Plus />}>
                  New file
                  <DropdownMenuShortcut>⌘N</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem icon={<Share />}>
                  Share
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem icon={<Trash2 />} destructive>
                  Delete
                  <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Props for each sub-component and CSS custom properties."
      >
        {/* DropdownMenu (Root) */}
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenu (Root)
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">open</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Controlled open state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onOpenChange</td>
                <td className="px-4 py-3 font-mono text-body-sm">{"(open: boolean) => void"}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Callback when open state changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">defaultOpen</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Uncontrolled initial open state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">modal</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">true</td>
                <td className="px-4 py-3">Whether interaction outside closes the menu</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DropdownMenuContent */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuContent
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">sideOffset</td>
                <td className="px-4 py-3 font-mono text-body-sm">number</td>
                <td className="px-4 py-3 font-mono text-body-sm">6</td>
                <td className="px-4 py-3">Gap between trigger and dropdown (px)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">side</td>
                <td className="px-4 py-3 font-mono text-body-sm">
                  {`"top" | "bottom" | "left" | "right"`}
                </td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"bottom"`}</td>
                <td className="px-4 py-3">Preferred side to render</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">align</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"start" | "center" | "end"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`"center"`}</td>
                <td className="px-4 py-3">Alignment along the side</td>
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

        {/* DropdownMenuItem */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuItem
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">icon</td>
                <td className="px-4 py-3 font-mono text-body-sm">ReactNode</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Leading icon (16px, secondary color)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">destructive</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Applies danger color to text and icon</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the item (40% opacity, no pointer events)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onSelect</td>
                <td className="px-4 py-3 font-mono text-body-sm">{"() => void"}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Called when item is selected</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DropdownMenuCheckboxItem */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuCheckboxItem
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">checked</td>
                <td className="px-4 py-3 font-mono text-body-sm">{`boolean | "indeterminate"`}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Controlled checked state</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onCheckedChange</td>
                <td className="px-4 py-3 font-mono text-body-sm">{"(checked: boolean) => void"}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Callback when checked state changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">disabled</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Disables the checkbox item</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DropdownMenuRadioGroup + RadioItem */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuRadioGroup / DropdownMenuRadioItem
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">value (RadioGroup)</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Currently selected value</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">onValueChange (RadioGroup)</td>
                <td className="px-4 py-3 font-mono text-body-sm">{"(value: string) => void"}</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Callback when selected value changes</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">value (RadioItem)</td>
                <td className="px-4 py-3 font-mono text-body-sm">string</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Unique value for the radio option</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DropdownMenuSubTrigger */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuSubTrigger
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">icon</td>
                <td className="px-4 py-3 font-mono text-body-sm">ReactNode</td>
                <td className="px-4 py-3 font-mono text-body-sm">—</td>
                <td className="px-4 py-3">Leading icon (16px, secondary color)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-body-sm">inset</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Adds left padding to align with checkbox/radio items</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* DropdownMenuLabel */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            DropdownMenuLabel
          </p>
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
                <td className="px-4 py-3 font-mono text-body-sm">inset</td>
                <td className="px-4 py-3 font-mono text-body-sm">boolean</td>
                <td className="px-4 py-3 font-mono text-body-sm">false</td>
                <td className="px-4 py-3">Adds left padding to align with checkbox/radio items</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* CSS Variables */}
        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <p className="border-b border-neutral-200 bg-neutral-50 px-4 py-3 text-body-md font-medium text-subtext-color">
            CSS Variables (shared glass, spacing, icon, and typography tokens)
          </p>
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
              {componentTokenDocs["dropdown-menu"].tokens.map(({ token, value, usage }) => (
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
