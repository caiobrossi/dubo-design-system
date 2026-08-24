import type { Metadata } from "next";
import { Callout } from "@/components/docs/callout";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getProductComponentDoc } from "@/lib/content-registry";

interface ProductComponentPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProductComponentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getProductComponentDoc(slug);

  return {
    title: entry.title,
    description: entry.description,
  };
}

export default async function ProductComponentPage({ params }: ProductComponentPageProps) {
  const { slug } = await params;
  const entry = getProductComponentDoc(slug);

  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="This section will explain the workflow context, triggers and screen relationships for the product component."
        >
          <Callout title="Planned content">
            Product components will be documented from real tasks and screens, including which
            flows launch them and which user roles depend on them.
          </Callout>
        </DocsSection>

        <DocsSection
          id="style"
          title="Style"
          description="This section will cover layout density, container rules and interaction rhythm for the product surface."
        >
          <Callout title="Planned content">
            We will capture panel sizes, overlay behavior, header treatment, content spacing and the
            shared visual grammar used across product-level surfaces.
          </Callout>
        </DocsSection>

        <DocsSection
          id="code"
          title="Code"
          description="This section will map the product component to implementation details, state orchestration and Storybook references."
        >
          <Callout tone="brand" title="Storybook connection">
            This template already supports a direct Storybook link for future product stories and
            technical review.
          </Callout>
        </DocsSection>

        <DocsSection
          id="accessibility"
          title="Accessibility"
          description="This section will define focus management, escape hatches, announcements and semantics for complex overlays or panels."
        >
          <Callout tone="warning" title="To be documented">
            Accessibility guidance will be authored with each real product surface so modal, drawer
            and panel behaviors reflect the actual implementation.
          </Callout>
        </DocsSection>
      </div>
    </div>
  );
}
