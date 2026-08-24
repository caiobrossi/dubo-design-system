"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { Button } from "@/components/ui/button";
import { modalSectionTitleClass } from "@dubo-design/components/ui/modal-typography";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const meta: Meta = {
  title: "Components/Sheet",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Sheet** — Dubo Design System floating side panel / drawer.

Built on \`@radix-ui/react-dialog\`. Sheet reuses the shared overlay, surface, spacing, icon and typography roles, then adds directional motion for side panels.

### Floating panel design
The outer container keeps a shared floating inset from the viewport edges. The inner panel uses the shared elevated surface recipe, a 16px radius, and tokenized header/footer spacing. Left and right sheets keep a 450px max width.

### Sides
- \`right\` (default) — settings, detail panels
- \`left\` — navigation, filters
- \`top\` — notifications, search
- \`bottom\` — mobile actions, selection

### Sub-components
- \`Sheet\` — Root (Dialog.Root)
- \`SheetTrigger\` — Trigger button
- \`SheetContent\` — Floating panel with overlay, close button, side prop
- \`SheetHeader\` — Title + description area (px-6 py-5, border-bottom)
- \`SheetFooter\` — Action buttons area
- \`SheetTitle\` — Accessible title
- \`SheetDescription\` — Accessible description
- \`SheetClose\` — Close trigger

### Modal typography contract
- Use \`SheetTitle\` for the sheet title. It shares the 24px / weight 300 / 1.2 modal title treatment with Dialog.
- Use \`modalSectionTitleClass\` for section headings inside sheet content. It shares the 20px / weight 300 / 1.2 modal section treatment.
- Do not recreate either role with one-off text-size or font-weight utilities.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const RightSide: Story = {
  name: "Right (Default)",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Right Sheet</Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Patient Details</SheetTitle>
          <SheetDescription>View and manage patient information.</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-[var(--space-6)]">
          <div className="flex flex-col gap-[var(--space-4)]">
            <h3 className={modalSectionTitleClass}>Patient information</h3>
            <div className="flex flex-col gap-[var(--space-1)]">
              <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                Full Name
              </span>
              <span className="text-body-md text-[color:var(--color-text-secondary)]">Maria Silva</span>
            </div>
            <div className="flex flex-col gap-[var(--space-1)]">
              <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                Email
              </span>
              <span className="text-body-md text-[color:var(--color-text-secondary)]">
                maria.silva@example.com
              </span>
            </div>
            <div className="flex flex-col gap-[var(--space-1)]">
              <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                Next Appointment
              </span>
              <span className="text-body-md text-[color:var(--color-text-secondary)]">
                March 28, 2026 at 10:30 AM
              </span>
            </div>
            <div className="flex flex-col gap-[var(--space-1)]">
              <span className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                Treatment Plan
              </span>
              <span className="text-body-md text-[color:var(--color-text-secondary)]">
                Orthodontic follow-up: ceramic braces adjustment
              </span>
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
          <Button>Edit Patient</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const LeftSide: Story = {
  name: "Left",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Left Sheet</Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Browse the main sections of the clinic.</SheetDescription>
        </SheetHeader>
        <nav className="flex flex-1 flex-col gap-[var(--space-1)] p-[var(--space-4)]">
          {["Dashboard", "Patients", "Appointments", "Clinical Notes", "Billing", "Settings"].map(
            (item) => (
              <div
                key={item}
                className="rounded-[var(--radius-control-input)] px-[var(--space-3)] py-[var(--space-2)] text-body-md text-[color:var(--color-text-secondary)] transition-colors hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-primary)]"
              >
                {item}
              </div>
            )
          )}
        </nav>
      </SheetContent>
    </Sheet>
  ),
};

export const TopSide: Story = {
  name: "Top",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Top Sheet</Button>
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>Recent alerts and reminders.</SheetDescription>
        </SheetHeader>
        <div className="p-[var(--space-6)]">
          <div className="flex flex-col gap-[var(--space-3)]">
            <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-control-soft)] border border-[var(--color-border)] p-[var(--space-3)]">
              <div className="mt-[6px] size-[var(--space-2)] shrink-0 rounded-full bg-[var(--color-brand)]" />
              <div>
                <p className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                  Appointment reminder
                </p>
                <p className="text-body-sm text-[color:var(--color-text-secondary)]">
                  Maria Silva: tomorrow at 10:30 AM
                </p>
              </div>
            </div>
            <div className="flex items-start gap-[var(--space-3)] rounded-[var(--radius-control-soft)] border border-[var(--color-border)] p-[var(--space-3)]">
              <div className="mt-[6px] size-[var(--space-2)] shrink-0 rounded-full bg-[var(--color-warning)]" />
              <div>
                <p className="text-body-md font-medium text-[color:var(--color-text-primary)]">
                  Lab results ready
                </p>
                <p className="text-body-sm text-[color:var(--color-text-secondary)]">
                  X-ray results for patient #1024
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const BottomSide: Story = {
  name: "Bottom",
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Bottom Sheet</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle>Quick Actions</SheetTitle>
          <SheetDescription>Select an action to perform on the selected records.</SheetDescription>
        </SheetHeader>
        <div className="p-[var(--space-6)]">
          <div className="flex gap-[var(--space-2)]">
            <Button variant="outline">Export CSV</Button>
            <Button variant="outline">Print Report</Button>
            <Button variant="destructive">Archive Selected</Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  name: "All Sides",
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-wrap gap-3">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" className="capitalize">
              {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle className="capitalize">{side} Sheet</SheetTitle>
              <SheetDescription>This floating panel slides from the {side}.</SheetDescription>
            </SheetHeader>
            <div className="flex-1 p-[var(--space-6)]">
              <p className="text-body-md text-[color:var(--color-text-secondary)]">
                Shared overlay, surface, and spacing tokens keep every side visually consistent.
              </p>
            </div>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["sheet"].title}
      tokens={componentTokenDocs["sheet"].tokens}
    />
  ),
};
