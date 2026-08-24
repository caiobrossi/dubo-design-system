"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { Button } from "@/components/ui/button";
import { modalSectionTitleClass } from "@dubo-design/components/ui/modal-typography";
import {
  Dialog,
  DialogClose,
  DialogContent,
  type DialogContentProps,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const meta: Meta<DialogContentProps> = {
  title: "Components/Dialog",
  component: DialogContent as unknown as Meta<DialogContentProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Dialog** -- Dubo Design System modal component for forms, editing flows and richer modal tasks.

Built on \`@radix-ui/react-dialog\`. Centers on screen with an overlay backdrop, a 24px radius, and optional sticky header/footer sections around a scrollable body.

### Size variants (DialogContent)
| Size | Max Width | Use |
|---|---|---|
| \`sm\` | 384px | Simple confirmations, small forms |
| \`default\` | 512px | Standard dialogs |
| \`lg\` | 672px | Complex content, large forms |
| \`xl\` | 768px | Patient-style workflows and denser editing flows |

### Sub-components
- \`Dialog\` -- Root
- \`DialogTrigger\` -- Trigger button
- \`DialogContent\` -- Modal panel with overlay and close button
- \`DialogHeader\` -- Title + description area (can be sticky)
- \`DialogBody\` -- Scrollable content region
- \`DialogFooter\` -- Action buttons area (can be sticky)
- \`DialogTitle\` -- Accessible title
- \`DialogDescription\` -- Accessible description
- \`DialogClose\` -- Close trigger

### Modal typography contract
- Use \`DialogTitle\` for the modal title. It owns the shared 24px / weight 300 / 1.2 line-height treatment.
- Use \`modalSectionTitleClass\` for section headings inside modal content. It owns the shared 20px / weight 300 / 1.2 treatment.
- Do not recreate either role with one-off text-size or font-weight utilities in product modals.
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "default", "lg", "xl"],
    },
  },
  args: {
    size: "default",
  },
};

export default meta;
type Story = StoryObj<DialogContentProps>;

// --- Playground ---------------------------------------------------------------

export const Playground: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent size={args.size}>
        <DialogHeader sticky>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <div className="flex flex-col gap-3">
            <h3 className={modalSectionTitleClass}>Basic information</h3>
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              Dialog content goes here. The section heading uses the shared modal typography role.
            </p>
          </div>
        </DialogBody>
        <DialogFooter sticky>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// --- All Sizes ----------------------------------------------------------------

export const AllSizes: Story = {
  name: "All Sizes",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "4 size variants: sm (384px), default (512px), lg (672px), and xl (768px). Each opens a separate dialog.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Small</Button>
        </DialogTrigger>
        <DialogContent size="sm">
          <DialogHeader sticky>
            <DialogTitle>Small Dialog</DialogTitle>
            <DialogDescription>
              max-w-sm (384px) -- ideal for simple confirmations and small forms.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              This is the smallest dialog size. Use it for quick confirmations or simple yes/no
              decisions.
            </p>
          </DialogBody>
          <DialogFooter sticky>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Default</Button>
        </DialogTrigger>
        <DialogContent size="default">
          <DialogHeader sticky>
            <DialogTitle>Default Dialog</DialogTitle>
            <DialogDescription>
              max-w-lg (512px) -- the standard size for most dialogs.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              This is the default dialog size. Use it for standard forms, detail views, and general
              content.
            </p>
          </DialogBody>
          <DialogFooter sticky>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Large</Button>
        </DialogTrigger>
        <DialogContent size="lg">
          <DialogHeader sticky>
            <DialogTitle>Large Dialog</DialogTitle>
            <DialogDescription>
              max-w-2xl (672px) -- for complex content and large forms.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              This is the largest dialog size. Use it for multi-field forms, data tables, or complex
              content that needs more horizontal space.
            </p>
          </DialogBody>
          <DialogFooter sticky>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Patient</Button>
        </DialogTrigger>
        <DialogContent size="xl">
          <DialogHeader sticky>
            <DialogTitle>Patient Dialog</DialogTitle>
            <DialogDescription>
              max-w-3xl (768px) -- for denser patient flows with fixed chrome.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <p className="text-body-md text-[color:var(--color-text-secondary)]">
              This larger modal is intended for create/edit workflows that need more horizontal room
              while keeping header and footer fixed.
            </p>
          </DialogBody>
          <DialogFooter sticky>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  ),
};

// --- With Form ----------------------------------------------------------------

export const WithForm: Story = {
  name: "With Form",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Dialog with a simple form containing name and email inputs.",
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>
      <DialogContent size="xl">
        <DialogHeader sticky>
          <DialogTitle>New Patient</DialogTitle>
          <DialogDescription>
            Add a new patient to your clinic. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form className="grid gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid gap-2">
              <label
                htmlFor="name"
                className="text-body-md font-normal text-[color:var(--color-text-primary)]"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Maria Silva"
                className="h-10 w-full rounded-md border border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)] px-3 text-body-md text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="email"
                className="text-body-md font-normal text-[color:var(--color-text-primary)]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="maria@example.com"
                className="h-10 w-full rounded-md border border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)] px-3 text-body-md text-[color:var(--color-text-primary)] placeholder:text-[color:var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter sticky>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Patient</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

// --- Custom Footer ------------------------------------------------------------

export const CustomFooter: Story = {
  name: "Custom Footer",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Dialog with a custom footer layout -- destructive action on the left, cancel/confirm on the right.",
      },
    },
  },
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Manage Appointment</Button>
      </DialogTrigger>
      <DialogContent size="default">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>
            Review the appointment details. You can reschedule or cancel this appointment.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-body-md">
              <span className="text-[color:var(--color-text-secondary)]">Patient</span>
              <span className="font-medium text-[color:var(--color-text-primary)]">Maria Silva</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-[color:var(--color-text-secondary)]">Date</span>
              <span className="font-medium text-[color:var(--color-text-primary)]">March 28, 2026</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-[color:var(--color-text-secondary)]">Time</span>
              <span className="font-medium text-[color:var(--color-text-primary)]">10:30 AM</span>
            </div>
            <div className="flex justify-between text-body-md">
              <span className="text-[color:var(--color-text-secondary)]">Treatment</span>
              <span className="font-medium text-[color:var(--color-text-primary)]">Routine Cleaning</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">
          <Button variant="destructive" size="sm">
            Cancel Appointment
          </Button>
          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <Button>Reschedule</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  ),
};

// --- Design Tokens ------------------------------------------------------------

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      tokens={[
        { token: "--color-bg-surface", value: "bgSurface", usage: "Dialog background" },
        { token: "--color-border", value: "border", usage: "Dialog border" },
        { token: "--color-text-primary", value: "textPrimary", usage: "Title text" },
        { token: "--color-text-secondary", value: "textSecondary", usage: "Description text" },
        { token: "--color-text-muted", value: "textMuted", usage: "Close button icon" },
        { token: "--color-hover", value: "hover", usage: "Close button hover bg" },
        { token: "--shadow-lg", value: "shadow.lg", usage: "Dialog elevation shadow" },
        {
          token: "--focus-ring",
          value: "interaction.focusRing",
          usage: "Focus ring on close button",
        },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "Close button transition",
        },
      ]}
    />
  ),
};
