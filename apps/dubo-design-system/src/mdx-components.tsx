import type { ComponentPropsWithoutRef } from "react";
import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (({ children, ...props }: ComponentPropsWithoutRef<"h2">) => (
      <h2 {...props} className="text-heading-3 font-semibold text-default-font">
        {children}
      </h2>
    )) as any,
    p: ((props: ComponentPropsWithoutRef<"p">) => (
      <p {...props} className="text-body-lg text-subtext-color" />
    )) as any,
    ul: ((props: ComponentPropsWithoutRef<"ul">) => (
      <ul {...props} className="list-disc space-y-2 pl-5 text-body-lg text-subtext-color" />
    )) as any,
    ol: ((props: ComponentPropsWithoutRef<"ol">) => (
      <ol {...props} className="list-decimal space-y-2 pl-5 text-body-lg text-subtext-color" />
    )) as any,
    code: ((props: ComponentPropsWithoutRef<"code">) => (
      <code
        {...props}
        className="rounded-md bg-neutral-100 px-1.5 py-0.5 font-mono text-body-sm text-brand-700"
      />
    )) as any,
    ...components,
  };
}
