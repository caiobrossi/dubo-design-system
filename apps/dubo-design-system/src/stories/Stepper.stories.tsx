import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { Stepper, StepperItem, type StepperProps } from "@/components/ui/stepper";

/* -------------------------------------------------------------------------- */
/*  Meta                                                                      */
/* -------------------------------------------------------------------------- */

const meta: Meta<StepperProps> = {
  title: "Components/Stepper",
  component: Stepper as unknown as Meta<StepperProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Stepper** displays progress through a sequence of steps.

### Orientations
| Orientation | Usage |
|---|---|
| \`horizontal\` | Default. Best for top-level wizard flows (e.g., patient intake) |
| \`vertical\` | For sidebar or detailed flows with descriptions and inline content |

### Step states
| State | Visual |
|---|---|
| \`default\` | Muted circle with step number |
| \`active\` | Brand-highlighted circle with ring |
| \`completed\` | Solid brand circle with check icon |

### Compound pattern
Uses \`<Stepper>\` + \`<StepperItem>\`. The root passes \`activeStep\` and \`orientation\` via context; each item derives its state from its index.
        `,
      },
    },
  },
  argTypes: {
    activeStep: { control: { type: "number", min: 0, max: 3 } },
    orientation: { control: "select", options: ["horizontal", "vertical"] },
  },
  args: {
    activeStep: 1,
    orientation: "horizontal",
  },
};

export default meta;
type Story = StoryObj<StepperProps>;

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

const DENTAL_STEPS = [
  { label: "Patient Info" },
  { label: "Clinical Notes" },
  { label: "Treatment Plan" },
  { label: "Review & Confirm" },
];

const DENTAL_STEPS_VERTICAL = [
  {
    label: "Patient Info",
    description: "Collect patient demographics and insurance details",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md">
        Patient information form goes here&hellip;
      </div>
    ),
  },
  {
    label: "Clinical Notes",
    description: "Record clinical findings and observations",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md">
        Clinical notes editor goes here&hellip;
      </div>
    ),
  },
  {
    label: "Treatment Plan",
    description: "Define procedures, pricing, and scheduling",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md">
        Treatment plan builder goes here&hellip;
      </div>
    ),
  },
  {
    label: "Review & Confirm",
    description: "Review all details before finalizing",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md">
        Summary and confirmation goes here&hellip;
      </div>
    ),
  },
];

/* -------------------------------------------------------------------------- */
/*  1. Playground                                                             */
/* -------------------------------------------------------------------------- */

export const Playground: Story = {
  render: (args) => (
    <Stepper {...args}>
      {DENTAL_STEPS.map((step) => (
        <StepperItem key={step.label} label={step.label} />
      ))}
    </Stepper>
  ),
};

/* -------------------------------------------------------------------------- */
/*  2. Horizontal                                                             */
/* -------------------------------------------------------------------------- */

export const Horizontal: Story = {
  name: "Horizontal",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Horizontal stepper with 4 dental workflow steps. Active on step 2 (Treatment Plan).",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-2xl p-4">
      <Stepper activeStep={2} orientation="horizontal">
        {DENTAL_STEPS.map((step) => (
          <StepperItem key={step.label} label={step.label} />
        ))}
      </Stepper>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  3. Vertical                                                               */
/* -------------------------------------------------------------------------- */

export const Vertical: Story = {
  name: "Vertical",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Vertical stepper with descriptions and inline content. Active on step 2 (Clinical Notes).",
      },
    },
  },
  render: () => (
    <div className="w-full max-w-md p-4">
      <Stepper activeStep={1} orientation="vertical">
        {DENTAL_STEPS_VERTICAL.map((step) => (
          <StepperItem key={step.label} label={step.label} description={step.description}>
            {step.content}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  4. AllStates                                                              */
/* -------------------------------------------------------------------------- */

export const AllStates: Story = {
  name: "All States",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Three horizontal steppers showing different progress states: beginning (step 0), middle (step 2), and completed (step 4).",
      },
    },
  },
  render: () => (
    <div className="flex w-full max-w-2xl flex-col gap-8 p-4">
      <div>
        <p className="mb-2 text-body-sm font-medium text-[color:var(--color-text-muted)]">
          Step 0: Beginning
        </p>
        <Stepper activeStep={0}>
          {DENTAL_STEPS.map((step) => (
            <StepperItem key={step.label} label={step.label} />
          ))}
        </Stepper>
      </div>

      <div>
        <p className="mb-2 text-body-sm font-medium text-[color:var(--color-text-muted)]">
          Step 2: In Progress
        </p>
        <Stepper activeStep={2}>
          {DENTAL_STEPS.map((step) => (
            <StepperItem key={step.label} label={step.label} />
          ))}
        </Stepper>
      </div>

      <div>
        <p className="mb-2 text-body-sm font-medium text-[color:var(--color-text-muted)]">
          Step 4: All Completed
        </p>
        <Stepper activeStep={4}>
          {DENTAL_STEPS.map((step) => (
            <StepperItem key={step.label} label={step.label} />
          ))}
        </Stepper>
      </div>
    </div>
  ),
};

/* -------------------------------------------------------------------------- */
/*  5. DesignTokens                                                           */
/* -------------------------------------------------------------------------- */

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "All CSS design tokens used by the Stepper component.",
      },
    },
  },
  render: () => (
    <DesignTokensTable
      tokens={[
        {
          token: "--color-hover",
          value: "hover",
          usage: "Default step indicator background (shared)",
        },
        {
          token: "--color-brand-subtle",
          value: "brandSubtle",
          usage: "Active step indicator background (shared)",
        },
        {
          token: "--color-brand",
          value: "brand",
          usage: "Active ring, completed bg, completed connector (shared)",
        },
        {
          token: "--color-text-on-brand",
          value: "textOnBrand",
          usage: "Completed step check icon color (shared)",
        },
        {
          token: "--color-text-primary",
          value: "textPrimary",
          usage: "Active step label text (shared)",
        },
        {
          token: "--color-text-secondary",
          value: "textSecondary",
          usage: "Completed step label text (shared)",
        },
        {
          token: "--color-text-muted",
          value: "textMuted",
          usage: "Default step label, step number, description text (shared)",
        },
        {
          token: "--color-border",
          value: "border",
          usage: "Default connector line (shared)",
        },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "All state transitions (shared)",
        },
      ]}
    />
  ),
};
