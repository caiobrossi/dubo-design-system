import type { Meta, StoryObj } from "@storybook/react-vite";
import { SideNavigation, type SideNavigationProps } from "@/components/ui/side-navigation";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import {
  SideNavigationDemoCollapsedLogo,
  SideNavigationDemoLogo,
  SideNavigationDesktopDemo,
  SideNavigationMobileDemo,
  sideNavigationPrimaryAction,
  sideNavigationProfile,
  sideNavigationSecondaryAction,
  sideNavigationSections,
} from "@/components/docs/side-navigation-demo";

const meta = {
  title: "Components/SideNavigation",
  component: SideNavigation as unknown as Meta<SideNavigationProps>["component"],
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `
**SideNavigation** — primary application navigation patterned after the current Dubo app shell.

It supports:
- expanded desktop mode
- collapsed desktop mode with icon-only items and tooltips
- elevated active item treatment
- flush top-content slot without an imposed divider
- matched utility actions using the same outline treatment
- profile menu
- mobile bottom drawer via \`SideNavigationMobile\`

The component is meant for application chrome, not for documentation navigation.
        `,
      },
    },
  },
  args: {
    defaultCollapsed: false,
    bordered: true,
    showSectionLabels: false,
    sections: sideNavigationSections,
    renderLogo: ({ collapsed }) =>
      collapsed ? <SideNavigationDemoCollapsedLogo /> : <SideNavigationDemoLogo />,
    primaryAction: sideNavigationPrimaryAction,
    secondaryAction: sideNavigationSecondaryAction,
    profile: sideNavigationProfile,
  },
} satisfies Meta<SideNavigationProps>;

export default meta;
type Story = StoryObj<SideNavigationProps>;

export const Playground: Story = {
  render: (args) => (
    <div className="overflow-hidden rounded-[28px] border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      <div className="flex h-[720px]">
        <SideNavigation {...args} />
        <div className="flex flex-1 flex-col gap-6 bg-[var(--color-bg-page)] p-8">
          <div className="rounded-[20px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)] p-6">
            <div className="mb-4 text-heading-3 [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
              Side navigation shell
            </div>
            <div className="space-y-3">
              <div className="h-3 w-40 rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-full rounded-full bg-[var(--color-hover)]" />
              <div className="h-3 w-[68%] rounded-full bg-[var(--color-hover)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CollapsedDesktop: Story = {
  parameters: { controls: { disable: true } },
  render: () => <SideNavigationDesktopDemo defaultCollapsed />,
};

export const MobileDrawer: Story = {
  parameters: { controls: { disable: true } },
  render: () => <SideNavigationMobileDemo defaultOpen />,
};

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      title={componentTokenDocs["side-navigation"].title}
      tokens={componentTokenDocs["side-navigation"].tokens}
    />
  ),
};
