"use client";

import { Badge } from "@/components/ui/badge";
import { DocsSection } from "@/components/docs/section";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
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

export default function InputOTPPage() {
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
              Input OTP
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              One-time password input with 4-digit, 6-digit, separator, and dash variants. Built on
              the input-otp package with shared field sizing, radius, spacing, and focus tokens.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Digit */}
      <DocsSection id="four-digit" title="4-Digit">
        <ShowcaseCard title="Short verification codes">
          <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
        </ShowcaseCard>
      </DocsSection>

      {/* 6-Digit */}
      <DocsSection id="six-digit" title="6-Digit">
        <ShowcaseCard title="Standard OTP codes">
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
        </ShowcaseCard>
      </DocsSection>

      {/* With Separator */}
      <DocsSection id="with-separator" title="With Separator">
        <ShowcaseCard title="Visual grouping with dash separator (3+3)">
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
        </ShowcaseCard>
      </DocsSection>

      {/* With Dash */}
      <DocsSection id="with-dash" title="With Dash (4+4)">
        <ShowcaseCard title="8-digit code with dash separator">
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
        </ShowcaseCard>
      </DocsSection>

      {/* Disabled */}
      <DocsSection id="disabled" title="Disabled">
        <ShowcaseCard title="Non-interactive state">
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
        </ShowcaseCard>
      </DocsSection>

      {/* API Reference */}
      <DocsSection id="api" title="API Reference">
        <div className="flex flex-col gap-6">
          {/* Props */}
          <div className="overflow-x-auto rounded-xl border border-neutral-200">
            <table className="w-full text-left text-body-md">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60">
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Prop</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                  <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">maxLength</td>
                  <td className="px-4 py-3 font-mono text-body-md">number</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Total number of slots (required)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">pattern</td>
                  <td className="px-4 py-3 font-mono text-body-md">string</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Input validation regex (e.g., REGEXP_ONLY_DIGITS)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">disabled</td>
                  <td className="px-4 py-3 font-mono text-body-md">boolean</td>
                  <td className="px-4 py-3">false</td>
                  <td className="px-4 py-3">Disables the input with reduced opacity</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-body-md">onChange</td>
                  <td className="px-4 py-3 font-mono text-body-md">{`(value: string) => void`}</td>
                  <td className="px-4 py-3">-</td>
                  <td className="px-4 py-3">Callback when value changes</td>
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
                {componentTokenDocs["input-otp"].tokens.map(({ token, value, usage }) => (
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
