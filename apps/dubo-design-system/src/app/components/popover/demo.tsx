"use client";

import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DocsSection } from "@/components/docs/section";

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      {children}
    </div>
  );
}

export function PopoverDemo() {
  return (
    <>
      {/* Sides */}
      <DocsSection
        id="sides"
        title="Side Variants"
        description="Popover can appear on any side of the trigger. Uses Radix collision detection to auto-flip when space is limited."
      >
        <ShowcaseCard title="All 4 sides">
          <div className="flex flex-wrap items-center gap-4 py-8">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Popover key={side}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    {side}
                  </Button>
                </PopoverTrigger>
                <PopoverContent side={side} className="w-48">
                  <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
                    Popover on the <strong>{side}</strong> side.
                  </p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Alignment */}
      <DocsSection
        id="alignment"
        title="Alignment"
        description="Three alignment options relative to the trigger element."
      >
        <ShowcaseCard title="Align start, center, end">
          <div className="flex flex-wrap items-center gap-4 py-8">
            {(["start", "center", "end"] as const).map((align) => (
              <Popover key={align}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    align={align}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align={align} className="w-48">
                  <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
                    Aligned to <strong>{align}</strong>.
                  </p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Arrow */}
      <DocsSection
        id="arrow"
        title="With Arrow"
        description="Pass showArrow to display an arrow pointing to the trigger."
      >
        <ShowcaseCard title="Arrow on all sides">
          <div className="flex flex-wrap items-center gap-4 py-8">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Popover key={side}>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm">
                    {side}
                  </Button>
                </PopoverTrigger>
                <PopoverContent side={side} showArrow className="w-48">
                  <p className="text-[color:var(--color-text-secondary)]" style={{ fontSize: "0.75rem" }}>
                    Arrow on <strong>{side}</strong>.
                  </p>
                </PopoverContent>
              </Popover>
            ))}
          </div>
        </ShowcaseCard>
      </DocsSection>

      {/* Form Example */}
      <DocsSection
        id="form-example"
        title="Form Example"
        description="Common pattern: popover with form fields for inline editing."
      >
        <ShowcaseCard title="Dimensions form in a popover">
          <div className="flex items-center py-8">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Set dimensions</Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="flex flex-col gap-4">
                  <div>
                    <p
                      className="text-[color:var(--color-text-primary)]"
                      style={{ fontSize: "0.875rem", fontWeight: 600 }}
                    >
                      Dimensions
                    </p>
                    <p
                      className="text-[color:var(--color-text-secondary)]"
                      style={{ fontSize: "0.75rem" }}
                    >
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <Label className="w-16 shrink-0">Width</Label>
                      <Input defaultValue="100%" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Label className="w-16 shrink-0">Height</Label>
                      <Input defaultValue="25px" />
                    </div>
                    <div className="flex items-center gap-3">
                      <Label className="w-16 shrink-0">Max W.</Label>
                      <Input defaultValue="300px" />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </ShowcaseCard>
      </DocsSection>
    </>
  );
}
