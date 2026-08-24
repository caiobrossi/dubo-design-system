"use client";

import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

type InputOTPStoryProps = React.ComponentPropsWithoutRef<typeof InputOTP>;

const meta = {
  title: "Components/InputOTP",
  component: InputOTP as unknown as Meta<InputOTPStoryProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Input OTP** — Dubo Design System component.

One-time password input built on the \`input-otp\` package. Reuses shared field sizing, radius, spacing, and focus tokens.

### Variants
| Variant | Description |
|---|---|
| 4-digit | Short verification codes |
| 6-digit | Standard OTP codes |
| With separator | Visual grouping with dash |
| Disabled | Non-interactive state |

### Tokens
Shared field tokens include \`--height-control-md\`, \`--radius-control-input\`, \`--space-2\`, \`--color-bg-input\`, \`--color-border-input\`, and the shared focus ring.
        `,
      },
    },
  },
} satisfies Meta<InputOTPStoryProps>;

export default meta;
type Story = StoryObj;

/* ── 4-Digit ── */

export const FourDigit: Story = {
  render: () => (
    <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── 6-Digit ── */

export const SixDigit: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── With Separator ── */

export const WithSeparator: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── With Dash (4 + 4) ── */

export const WithDash: Story = {
  render: () => (
    <InputOTP maxLength={8} pattern={REGEXP_ONLY_DIGITS}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
        <InputOTPSlot index={6} />
        <InputOTPSlot index={7} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Disabled ── */

export const Disabled: Story = {
  render: () => (
    <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} disabled>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  ),
};

/* ── Design Tokens ── */

export const DesignTokens: StoryObj = {
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["input-otp"].title}
      tokens={componentTokenDocs["input-otp"].tokens}
    />
  ),
};
