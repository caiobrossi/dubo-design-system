import type { Meta, StoryObj } from "@storybook/react-vite";
import { AlertTriangle } from "@/lib/icons";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const meta: Meta = {
  title: "Components/AlertDialog",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**AlertDialog** is a confirmation dialog for destructive actions and important decisions.

Built on \`@radix-ui/react-alert-dialog\`. Blocks user interaction until confirmed or cancelled.

### Sub-components

| Sub-component | Role |
|---|---|
| \`AlertDialog\` | Root — manages open/close state |
| \`AlertDialogTrigger\` | Element that opens the dialog |
| \`AlertDialogContent\` | The dialog panel (overlay + portal included) |
| \`AlertDialogHeader\` | Groups title + description |
| \`AlertDialogFooter\` | Groups action buttons |
| \`AlertDialogTitle\` | Shared modal title: 24px / weight 300 / 1.2 line-height |
| \`AlertDialogDescription\` | Descriptive text |
| \`AlertDialogAction\` | Primary action button (destructive by default) |
| \`AlertDialogCancel\` | Cancel button (outline variant) |

### Usage rules
- Use for **irreversible** or **high-impact** actions (delete, discard, overwrite)
- Always provide a clear title and description explaining the consequence
- Action button should use destructive styling for dangerous operations
- Cancel should always be available — never force the user into the action
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// --- Playground ----------------------------------------------------------------

export const Playground: Story = {
  parameters: {
    docs: {
      description: {
        story: "Basic AlertDialog with trigger, title, description, and action buttons.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete Account</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// --- Destructive Action --------------------------------------------------------

export const DestructiveAction: Story = {
  name: "Destructive Action",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Confirmation dialog for deleting a patient record. Action button is styled as destructive by default.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Patient</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete patient record?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the patient record for Maria Silva, including all
            appointments, clinical notes, and billing history. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete Patient</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// --- Custom Content ------------------------------------------------------------

export const CustomContent: Story = {
  name: "Custom Content",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "AlertDialog with custom content including an icon and a longer description with multiple consequences.",
      },
    },
  },
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Discard Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-full"
              style={{
                backgroundColor: "var(--status-danger-subtle-bg)",
              }}
            >
              <AlertTriangle
                className="size-5"
                style={{ color: "var(--status-danger-subtle-fg)" }}
              />
            </div>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            You have unsaved changes in this clinical note. If you leave now, the following will be
            lost:
          </AlertDialogDescription>
          <ul
            className="mt-2 list-disc pl-6 text-body-md"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <li>Treatment notes added during this session</li>
            <li>Updated tooth chart annotations</li>
            <li>Attached intraoral photos</li>
          </ul>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Editing</AlertDialogCancel>
          <AlertDialogAction>Discard Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

// --- Design Tokens -------------------------------------------------------------

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All CSS design tokens used by the AlertDialog component.",
      },
    },
  },
  render: () => (
    <DesignTokensTable
      tokens={[
        {
          token: "--color-bg-surface",
          value: "bgSurface",
          usage: "Dialog content background",
        },
        {
          token: "--color-text-primary",
          value: "textPrimary",
          usage: "Title text color (shared)",
        },
        {
          token: "--color-text-secondary",
          value: "textSecondary",
          usage: "Description text color (shared)",
        },
        {
          token: "--shadow-lg",
          value: "shadow.lg",
          usage: "Dialog content drop shadow (applied via inline style)",
        },
        {
          token: "--focus-ring",
          value: "interaction.focusRing",
          usage: "Focus ring on interactive elements (shared)",
        },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "Animation duration for transitions (shared)",
        },
        {
          token: "--color-danger",
          value: "danger",
          usage: "AlertDialogAction destructive background (via buttonVariants)",
        },
        {
          token: "--color-on-dark",
          value: "onDark",
          usage: "AlertDialogAction destructive text (via buttonVariants)",
        },
      ]}
    />
  ),
};
