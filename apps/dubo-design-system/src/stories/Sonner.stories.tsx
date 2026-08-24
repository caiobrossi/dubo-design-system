"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toaster, toast } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";

const meta: Meta = {
  title: "Components/Sonner",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Sonner (Toast)** — Dubo Design System notification component.

Uses the \`sonner\` package directly with shared semantic design tokens for surface, status, and typography. No wrapper — just configuration via the Toaster component.

### Variants
| Variant   | Function             | Use                        |
|-----------|----------------------|----------------------------|
| \`default\` | \`toast()\`           | Neutral notifications       |
| \`success\` | \`toast.success()\`  | Positive outcomes           |
| \`info\`    | \`toast.info()\`     | Informational messages      |
| \`warning\` | \`toast.warning()\`  | Caution / attention needed  |
| \`error\`   | \`toast.error()\`    | Failures / errors           |
| \`promise\` | \`toast.promise()\`  | Async loading → result      |

### Features
- Title + description
- Action & cancel buttons
- Close button
- Custom icons
- Configurable duration
- Rich colors mode with design tokens
        `,
      },
    },
  },
  decorators: [
    (Story) => (
      <>
        <Toaster position="bottom-right" />
        <Story />
      </>
    ),
  ],
};

export default meta;
type Story = StoryObj;

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast("Hello from Dubo", { description: "This is a default toast notification." })
        }
      >
        Default
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.success("Patient saved", { description: "Record updated successfully." })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.info("New update available", { description: "Version 2.4 is ready to install." })
        }
      >
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.warning("Session expiring", {
            description: "Your session will expire in 5 minutes.",
          })
        }
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error("Upload failed", { description: "The file could not be processed." })
        }
      >
        Error
      </Button>
    </div>
  ),
};

// ─── All Variants ─────────────────────────────────────────────────────────────

export const AllVariants: Story = {
  name: "All Variants",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "All 5 toast variants. Click each button to trigger." },
    },
  },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          onClick={() =>
            toast("Default notification", {
              description: "Neutral styling with surface background.",
            })
          }
        >
          Default
        </Button>
        <Button
          onClick={() =>
            toast.success("Success!", { description: "Operation completed successfully." })
          }
        >
          Success
        </Button>
        <Button
          onClick={() => toast.info("Information", { description: "Here is some useful info." })}
        >
          Info
        </Button>
        <Button
          onClick={() =>
            toast.warning("Warning", { description: "Please review before proceeding." })
          }
        >
          Warning
        </Button>
        <Button onClick={() => toast.error("Error", { description: "Something went wrong." })}>
          Error
        </Button>
      </div>
    </div>
  ),
};

// ─── With Action Buttons ─────────────────────────────────────────────────────

export const WithActions: Story = {
  name: "With Actions",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Toast with action and cancel buttons." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        onClick={() =>
          toast("File deleted", {
            description: "The file has been moved to trash.",
            action: {
              label: "Undo",
              onClick: () => toast.success("File restored"),
            },
            cancel: {
              label: "Dismiss",
              onClick: () => {},
            },
          })
        }
      >
        With Undo Action
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.error("Failed to save", {
            description: "Network connection lost.",
            action: {
              label: "Retry",
              onClick: () => toast.success("Saved successfully"),
            },
          })
        }
      >
        Error with Retry
      </Button>
    </div>
  ),
};

// ─── Promise ─────────────────────────────────────────────────────────────────

export const PromiseToast: Story = {
  name: "Promise",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Async toast that shows loading, then resolves to success or error." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="secondary"
        onClick={() => {
          toast.promise(
            new Promise<{ name: string }>((resolve) =>
              setTimeout(() => resolve({ name: "Patient record" }), 2000)
            ),
            {
              loading: "Saving patient data...",
              success: (data) => `${data.name} saved successfully`,
              error: "Failed to save patient data",
            }
          );
        }}
      >
        Promise (Success)
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          toast.promise(
            new Promise((_resolve, reject) => setTimeout(() => reject(new Error("timeout")), 2000)),
            {
              loading: "Uploading file...",
              success: "File uploaded",
              error: "Upload failed — please try again",
            }
          );
        }}
      >
        Promise (Error)
      </Button>
    </div>
  ),
};

// ─── Custom Duration ─────────────────────────────────────────────────────────

export const CustomDuration: Story = {
  name: "Custom Duration",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Toast with custom display duration (10 seconds) and infinite (until dismissed).",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button
        variant="outline"
        onClick={() =>
          toast.info("Extended toast", {
            description: "This toast stays for 10 seconds.",
            duration: 10000,
          })
        }
      >
        10s Duration
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.warning("Persistent toast", {
            description: "This toast stays until manually dismissed.",
            duration: Infinity,
          })
        }
      >
        Infinite (Dismiss to close)
      </Button>
    </div>
  ),
};

// ─── Title Only ──────────────────────────────────────────────────────────────

export const TitleOnly: Story = {
  name: "Title Only",
  parameters: {
    controls: { disable: true },
    docs: {
      description: { story: "Toasts with only a title, no description." },
    },
  },
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="ghost" onClick={() => toast("Copied to clipboard")}>
        Default
      </Button>
      <Button variant="ghost" onClick={() => toast.success("Saved")}>
        Success
      </Button>
      <Button variant="ghost" onClick={() => toast.error("Connection lost")}>
        Error
      </Button>
    </div>
  ),
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["sonner"].title}
      tokens={componentTokenDocs["sonner"].tokens}
    />
  ),
};
