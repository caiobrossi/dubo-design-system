import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { foundationDocs, getFoundationDocBySlug } from "@/lib/content-registry";

interface FoundationPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return foundationDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: FoundationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getFoundationDocBySlug(slug);

  if (!doc) {
    return {
      title: "Foundation",
    };
  }

  return {
    title: doc.title,
    description: doc.description,
  };
}

export default async function FoundationPage({ params }: FoundationPageProps) {
  const { slug } = await params;
  const doc = getFoundationDocBySlug(slug);

  if (!doc) {
    notFound();
  }

  const Content = doc.component;

  return (
    <div id="content" className="mx-auto flex w-full max-w-[960px] flex-col gap-12">
      <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-body-md font-medium text-subtext-color">Foundations</p>
          <h1 className="mt-4 text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
            {doc.title}
          </h1>
          <p className="mt-4 max-w-3xl text-body-lg text-subtext-color">{doc.description}</p>
        </div>
      </section>

      <article className="docs-prose">
        <Content />
      </article>
    </div>
  );
}
