import type { DocKind } from "./schemas";

function readStorybookBaseUrl() {
  const fallback = "https://storybook.design.dubo.pt";

  const viteEnv =
    typeof import.meta !== "undefined"
      ? (import.meta as ImportMeta & {
          env?: Record<string, string | undefined>;
        }).env?.NEXT_PUBLIC_STORYBOOK_BASE_URL
      : undefined;

  const nodeEnv =
    typeof process !== "undefined"
      ? process.env?.NEXT_PUBLIC_STORYBOOK_BASE_URL
      : undefined;

  return viteEnv || nodeEnv || fallback;
}

function buildStoryIdSegment(slug: string) {
  return slug.replace(/-/g, "");
}

export function buildStorybookUrl(kind: DocKind, slug: string) {
  const storybookBaseUrl = readStorybookBaseUrl();
  const storyIdSegment = buildStoryIdSegment(slug);

  if (kind === "component") {
    return `${storybookBaseUrl}/?path=/docs/components-${storyIdSegment}--docs`;
  }

  if (kind === "product-component") {
    return `${storybookBaseUrl}/?path=/docs/product-components-${storyIdSegment}--docs`;
  }

  return storybookBaseUrl;
}

export function getStorybookBaseUrl() {
  return readStorybookBaseUrl();
}
