import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import {
  SideNavigationDesktopDemo,
  SideNavigationMobileDemo,
} from "@/components/docs/side-navigation-demo";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";

const entry = getComponentDoc("side-navigation");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const patternRows = [
  {
    item: "Flush top-content slot",
    details:
      "Top content is rendered without an automatic divider or spacer block. Consumers control their own spacing so the route list can stay as compact as the legacy app on smaller heights.",
  },
  {
    item: "Expanded and collapsed desktop",
    details:
      "The desktop shell keeps the same information hierarchy in both modes. The collapsed version trades labels for tooltips and a tighter icon-only rhythm.",
  },
  {
    item: "Elevated active item",
    details:
      "The active destination sits on an elevated surface so it feels persistent and easier to scan in long navigation lists.",
  },
  {
    item: "Bottom action cluster",
    details:
      "Primary action, secondary utility entry, and profile access live in a stable footer area. Utility actions intentionally share the same outline treatment so the cluster reads as one family.",
    },
  {
    item: "Mobile bottom drawer",
    details:
      "On mobile the pattern becomes a bottom drawer instead of a narrow side panel, preserving the app-like feel from the current product shell.",
  },
];

const propRows = [
  {
    prop: "sections",
    type: "SideNavigationSection[]",
    default: "required",
    description:
      "Structured navigation groups containing icon, label, optional badge, and active state for each item.",
  },
  {
    prop: "topContent",
    type: "ReactNode",
    default: "—",
    description:
      "Optional content rendered directly under the logo area. The component does not add a divider or reserved spacing, so consumers can keep the shell compact or add their own rhythm.",
  },
  {
    prop: "renderLogo",
    type: "({ collapsed }) => ReactNode",
    default: "—",
    description:
      "Preferred API for branded navigation headers. Use it when the logo needs to animate or adapt smoothly between expanded and collapsed states.",
  },
  {
    prop: "logo / collapsedLogo",
    type: "ReactNode / ReactNode",
    default: "—",
    description:
      "Fallback API for simpler branding setups when you do not need a collapsed-aware animated logo.",
  },
  {
    prop: "collapsed / defaultCollapsed",
    type: "boolean / boolean",
    default: "false / false",
    description:
      "Control the desktop nav externally or let it manage its own collapsed state internally.",
  },
  {
    prop: "bordered",
    type: "boolean",
    default: "true",
    description:
      "Controls whether the navigation renders its shell border. Disable it when the page layout already provides its own divider.",
  },
  {
    prop: "showSectionLabels",
    type: "boolean",
    default: "false",
    description:
      "Controls whether section headers are rendered above grouped navigation items. The default keeps the shell closer to the current app.",
  },
  {
    prop: "primaryAction / secondaryAction",
    type: "SideNavigationAction / SideNavigationAction",
    default: "—",
    description:
      "Optional utility actions pinned to the footer cluster below the navigation items.",
  },
  {
    prop: "profile",
    type: "SideNavigationProfile",
    default: "—",
    description: "Optional account area with avatar, title, and popover actions.",
  },
  {
    prop: "SideNavigationMobile",
    type: "companion component",
    default: "—",
    description:
      "Use the mobile companion for bottom-drawer navigation. It supports the same content model as the desktop nav.",
  },
];

const accessibilityRows = [
  {
    item: "Current page state",
    details:
      "Mark the active destination so screen readers and keyboard users can identify where they are in the application shell.",
  },
  {
    item: "Collapsed tooltips",
    details:
      "When labels are visually hidden in collapsed mode, the tooltip becomes essential for recognition, but the item still keeps its accessible label.",
  },
  {
    item: "Footer actions",
    details:
      "Keep footer actions meaningfully labelled. Avoid icon-only utilities without a clear accessible name.",
  },
  {
    item: "Mobile drawer dismissal",
    details:
      "The mobile drawer needs a dedicated close control and overlay dismissal so the state is easy to exit with touch and keyboard.",
  },
];

export default function SideNavigationPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="Use Side Navigation for primary application chrome when a product area needs persistent wayfinding, quick actions, and profile access in a single shell."
        >
          <div className="grid gap-6">
            <ShowcaseCard
              title="Desktop"
              description="Expanded navigation keeps the logo, grouped destinations, utility actions, and profile area in a stable app shell."
            >
              <SideNavigationDesktopDemo />
            </ShowcaseCard>
            <div className="grid gap-6 xl:grid-cols-2">
              <ShowcaseCard
                title="Collapsed desktop"
                description="The collapsed treatment preserves recognition through icons, elevation, and tooltips without losing the current location."
              >
                <SideNavigationDesktopDemo defaultCollapsed />
              </ShowcaseCard>
              <ShowcaseCard
                title="Mobile drawer"
                description="The mobile treatment becomes a bottom drawer so it feels native to the current Dubo app behavior."
              >
                <SideNavigationMobileDemo />
              </ShowcaseCard>
            </div>
          </div>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="The pattern intentionally mirrors the current application shell: calmer page background, compact route rhythm, elevated active item, and matched outline utility buttons."
        >
          <NotesTable rows={patternRows} />
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="The API is data-driven so application teams can keep navigation content declarative while preserving the same shell behavior across desktop and mobile."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["side-navigation"].tokens} />
          </div>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="Primary navigation is one of the highest-frequency interactions in the shell, so active state, labels, and dismissal patterns need to stay consistent."
        >
          <NotesTable rows={accessibilityRows} />
        </DocsSection>
      </div>
    </div>
  );
}
