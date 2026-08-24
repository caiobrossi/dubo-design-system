"use client";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const meta = {
  title: "Foundations/Expressive Surfaces",
  parameters: {
    docs: {
      description: {
        component: `
Warm Peach, calm Sky, and the canonical Dubo product gradient.
Also includes the classic Sunrise gradient used in welcoming and explanatory flows.
And the classic Warm Tint gradient used for patient groups, templates, and supportive card hovers.

These are shared expressive surface recipes for product moments that should feel branded or editorial
without pretending to be warning or info feedback.
        `,
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Preview: Story = {
  render: () => (
    <div className="grid gap-6 p-4 lg:grid-cols-5">
      <Card className="border-[var(--color-peach-border)] bg-[var(--color-peach-subtle)] shadow-none">
        <CardHeader>
          <CardTitle className="[font-weight:var(--font-weight-500)]">Peach Secondary</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Warm, editorial and human. Good for notes, supportive highlights, and product moments
            that should feel softer than feedback states.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary">Secondary action</Button>
            <Button variant="ghost">Dismiss</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[var(--color-sky-border)] bg-[var(--color-sky-subtle)] shadow-none">
        <CardHeader>
          <CardTitle className="[font-weight:var(--font-weight-500)]">Sky Secondary</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Calm, airy and product-forward. Good for supporting hero panels, search surfaces, and
            soft blue UI framing.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary">Try search</Button>
            <Button variant="ghost">Later</Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-none"
        style={{
          background: "var(--surface-gradient-product-bg)",
          borderColor: "var(--surface-gradient-product-border)",
          color: "var(--surface-gradient-product-text)",
        }}
      >
        <CardHeader>
          <CardTitle className="[font-weight:var(--font-weight-500)]">Product Gradient</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Canonical Dubo expressive gradient for richer branded surfaces and previews.
          </p>
          <div className="flex gap-3">
            <Button>Primary action</Button>
            <Button variant="outline">Learn more</Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-none"
        style={{
          background: "var(--surface-gradient-sunrise-bg)",
          borderColor: "var(--surface-gradient-sunrise-border)",
          color: "var(--surface-gradient-sunrise-text)",
        }}
      >
        <CardHeader>
          <CardTitle className="[font-weight:var(--font-weight-500)]">Sunrise Gradient</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            The classic Dubo welcoming gradient for onboarding, anamnese entry points, and
            explanatory moments.
          </p>
          <div className="flex gap-3">
            <Button>Start flow</Button>
            <Button variant="outline">Learn more</Button>
          </div>
        </CardContent>
      </Card>

      <Card
        className="shadow-none"
        style={{
          background: "var(--surface-gradient-warm-tint-bg)",
          borderColor: "var(--surface-gradient-warm-tint-border)",
          color: "var(--surface-gradient-warm-tint-text)",
        }}
      >
        <CardHeader>
          <CardTitle className="[font-weight:var(--font-weight-500)]">Warm Tint Gradient</CardTitle>
        </CardHeader>
        <CardContent className="gap-4">
          <p className="text-body-md text-[color:var(--color-text-secondary)]">
            Classic soft hover tint for patient groups, templates, and editorial card moments that
            should stay warm and subtle.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary">Preview hover</Button>
            <Button variant="ghost">Save recipe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
