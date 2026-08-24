import { ArrowUpRight, Code2 } from "@/lib/icons";
import type { DocEntry } from "@/lib/schemas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ComponentHeroProps {
  entry: DocEntry;
}

export function ComponentHero({ entry }: ComponentHeroProps) {
  return (
    <section className="rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-3">
          <Badge variant={entry.status === "ready" ? "success" : "warning"}>
            {entry.status === "ready" ? "Ready" : "Draft"}
          </Badge>
          <Badge variant="info1">{entry.category}</Badge>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              {entry.title}
            </h1>
            <p className="mt-4 text-body-lg text-subtext-color">{entry.description}</p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            {entry.storybookUrl ? (
              <Button asChild variant="secondary">
                <a href={entry.storybookUrl} target="_blank" rel="noreferrer">
                  <Code2 className="mr-2 size-4" />
                  Open in Storybook
                  <ArrowUpRight className="ml-2 size-4" />
                </a>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
