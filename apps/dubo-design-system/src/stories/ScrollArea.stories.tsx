import type { Meta, StoryObj } from "@storybook/react-vite";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const meta: Meta = {
  title: "Components/ScrollArea",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**ScrollArea** — Dubo Design System custom scrollbar.

Built on \`@radix-ui/react-scroll-area\`. Reuses \`--space-1\` and \`--space-2\` for scrollbar thickness, with shared neutral tokens for the thumb.

### Features
- Custom scrollbar styling matching Dubo design
- \`--color-text-muted\` / \`--color-border-strong\` for thumb colors
- Supports vertical, horizontal, or both orientations
- Overlay scrollbar (does not push content)
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const tags = [
  "General Dentistry",
  "Orthodontics",
  "Periodontics",
  "Endodontics",
  "Prosthodontics",
  "Oral Surgery",
  "Pediatric",
  "Cosmetic",
  "Implantology",
  "Radiology",
  "Preventive Care",
  "Emergency",
  "Restorative",
  "TMJ Treatment",
  "Whitening",
  "Veneers",
  "Crown & Bridge",
  "Dentures",
  "Root Canal",
  "Extraction",
];

export const VerticalScroll: Story = {
  name: "Vertical Scroll",
  render: () => (
    <ScrollArea className="size-[280px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <div className="p-[16px]">
        <h4 className="mb-[16px] text-body-md font-[600] text-[color:var(--color-text-primary)]">
          Dental Specialties
        </h4>
        {tags.map((tag, i) => (
          <div key={tag}>
            <div className="py-[8px] text-body-md text-[color:var(--color-text-secondary)]">{tag}</div>
            {i < tags.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  name: "Horizontal Scroll",
  render: () => (
    <ScrollArea
      orientation="horizontal"
      className="w-[400px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
    >
      <div className="flex gap-[12px] p-[16px]">
        {tags.map((tag) => (
          <div
            key={tag}
            className="flex shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-hover)] px-[16px] py-[8px] text-body-sm font-[500] text-[color:var(--color-text-secondary)]"
          >
            {tag}
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const BothDirections: Story = {
  name: "Both Directions",
  render: () => (
    <ScrollArea
      orientation="both"
      className="h-[200px] w-[300px] rounded-[12px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]"
    >
      <div className="w-[600px] p-[16px]">
        <table className="w-full text-body-sm text-[color:var(--color-text-secondary)]">
          <thead>
            <tr className="border-b border-[var(--color-border)]">
              {["Patient", "Date", "Procedure", "Doctor", "Status", "Cost"].map((h) => (
                <th
                  key={h}
                  className="text-body-md font-normal px-[12px] py-[8px] text-left font-[600] text-[color:var(--color-text-primary)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(10)].map((_, i) => (
              <tr key={i} className="border-b border-[var(--color-border)]">
                <td className="whitespace-nowrap px-[12px] py-[8px]">Patient {i + 1}</td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">
                  2024-0{(i % 9) + 1}-{10 + i}
                </td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">{tags[i % tags.length]}</td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">Dr. Smith</td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">Completed</td>
                <td className="whitespace-nowrap px-[12px] py-[8px]">$150</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ScrollArea>
  ),
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["scroll-area"].title}
      tokens={componentTokenDocs["scroll-area"].tokens}
    />
  ),
};
