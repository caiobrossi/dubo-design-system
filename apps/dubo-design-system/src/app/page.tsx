import Link from "next/link";
import { ArrowRight, Layers3, Palette, Sparkles, Workflow } from "@/lib/icons";
import { Button } from "@/components/ui/button";
import { getStorybookBaseUrl } from "@/lib/storybook";

const docsAreas = [
  {
    title: "Foundations",
    href: "/foundations/colors",
    description:
      "Colors, radius, typography, shadows, spacing and glass effects documented from the real Dubo UI.",
    icon: Palette,
  },
  {
    title: "Design Tokens",
    href: "/design-tokens",
    description:
      "A single catalog of semantic, visual and spacing tokens actually used in the system today.",
    icon: Sparkles,
  },
  {
    title: "Components",
    href: "/components",
    description:
      "Public documentation shell for shadcn-based primitives that will be styled in Dubo language.",
    icon: Layers3,
  },
  {
    title: "Product Components",
    href: "/product-components",
    description:
      "Higher-level panels, overlays and workflow components tied to real Dubo product surfaces.",
    icon: Workflow,
  },
];

export default function HomePage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8 lg:py-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:items-start">
          <div>
            <p className="text-body-md font-medium text-subtext-color">Dubo Design System</p>
            <h1 className="mt-4 max-w-4xl text-hero font-medium tracking-[0em] text-default-font sm:text-hero">
              Public docs for the Dubo interface language.
            </h1>
            <p className="mt-5 max-w-3xl text-body-lg text-subtext-color">
              This site is the editorial layer of the system. Foundations and design tokens live
              here as public guidance, while Storybook stays as the technical playground behind the
              scenes.
            </p>
          </div>

          <div className="rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
            <p className="text-body-md font-medium text-subtext-color">How it works</p>
            <div className="mt-4 flex flex-col gap-4">
              <div>
                <p className="text-heading-4 font-medium text-default-font">design.dubo.pt</p>
                <p className="mt-1 text-body-md text-subtext-color">
                  Public narrative, foundations, tokens and component usage guidelines.
                </p>
              </div>
              <div>
                <p className="text-heading-4 font-medium text-default-font">
                  storybook.design.dubo.pt
                </p>
                <p className="mt-1 text-body-md text-subtext-color">
                  Live component states, variants and technical validation for the same system.
                </p>
              </div>
              <Button asChild>
                <a href={getStorybookBaseUrl()} target="_blank" rel="noreferrer">
                  Open Storybook
                  <ArrowRight className="ml-2 size-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {docsAreas.map((area) => {
          const Icon = area.icon;
          return (
            <Link
              key={area.title}
              href={area.href}
              className="group rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5 transition-colors hover:border-[var(--color-border-strong)]"
            >
              <div className="flex size-10 items-center justify-center rounded-[14px] bg-[var(--color-hover)] text-[color:var(--color-text-secondary)]">
                <Icon className="size-5" />
              </div>
              <h2 className="mt-4 text-heading-4 font-medium text-default-font">{area.title}</h2>
              <p className="mt-2 text-body-md text-subtext-color">{area.description}</p>
              <p className="mt-4 inline-flex items-center text-body-md text-default-font">
                Explore
                <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </Link>
          );
        })}
      </section>

      <section className="grid gap-6 rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6 lg:grid-cols-2">
        <div>
          <p className="text-body-md font-medium text-subtext-color">Principles for v1</p>
          <div className="mt-4 flex flex-col gap-3 text-body-lg text-subtext-color">
            <p>
              The visual rhythm follows Carbon&apos;s documentation structure, but every token,
              material and interaction pattern is grounded in Dubo&apos;s existing product language.
            </p>
            <p>
              Components are intentionally not documented one by one yet. This first release builds
              the shell, the taxonomy and the shared visual base so we can fill each page with you
              later, component by component.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-5">
            <p className="text-body-md font-medium text-subtext-color">Foundations first</p>
            <p className="mt-3 text-body-md text-default-font">
              Colors, radius, type, shadows, spacing and glass are documented from the real UI.
            </p>
          </div>
          <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-5">
            <p className="text-body-md font-medium text-subtext-color">Technical parity</p>
            <p className="mt-3 text-body-md text-default-font">
              Storybook stays public and linked from the docs so usage guidance stays close to the
              code.
            </p>
          </div>
          <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-5">
            <p className="text-body-md font-medium text-subtext-color">No rebrand</p>
            <p className="mt-3 text-body-md text-default-font">
              The site preserves the current Dubo surface language instead of inventing a new one.
            </p>
          </div>
          <div className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-page)] p-5">
            <p className="text-body-md font-medium text-subtext-color">Ready for rollout</p>
            <p className="mt-3 text-body-md text-default-font">
              The component templates already support usage, style, code and accessibility sections.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
