import type { Metadata } from "next";
import {
  DesignTokensDocTable,
  NotesTable,
  PropsTable,
  ShowcaseCard,
} from "@/components/docs/component-doc-helpers";
import { ComponentHero } from "@/components/docs/component-hero";
import { DocsSection } from "@/components/docs/section";
import { getComponentDoc } from "@/lib/content-registry";
import { componentTokenDocs } from "@/lib/component-token-docs";
import { SearchFieldDemo, SearchFieldFilledValueDemo } from "./demo";

const entry = getComponentDoc("search-field");

export const metadata: Metadata = {
  title: entry.title,
  description: entry.description,
};

const notesRows = [
  {
    item: "Default visual language",
    details: "SearchField should be the standard page-toolbar search control: filled, pill-shaped, 40px tall, and 16px regular text.",
  },
  {
    item: "No local wrappers",
    details: "Prefer SearchField over manually styling Input with a search icon, so search bars stay consistent across pages.",
  },
  {
    item: "Clear action",
    details: "The field is clearable by default, so filtering flows can always reset quickly without extra UI.",
  },
];

const propRows = [
  {
    prop: "value / onChange",
    type: "string / input change handler",
    default: "controlled by consumer",
    description: "Use the same input contract as the base Input component.",
  },
  {
    prop: "placeholder",
    type: "string",
    default: "\"Search...\"",
    description: "Set the search context, for example patients, lab orders, or tasks.",
  },
  {
    prop: "clearable",
    type: "boolean",
    default: "true",
    description: "Keeps the inline clear action available unless a workflow explicitly disables it.",
  },
  {
    prop: "className",
    type: "string",
    default: "optional",
    description: "Use only for layout concerns such as width. The visual recipe should stay the component default.",
  },
];

export default function SearchFieldPage() {
  return (
    <div id="content" className="mx-auto flex w-full max-w-6xl flex-col gap-10">
      <ComponentHero entry={entry} />

      <div className="flex flex-col gap-10">
        <DocsSection
          id="usage"
          title="Usage"
          description="SearchField exists to stop each page from rebuilding the same search affordance by hand."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <ShowcaseCard title="Empty state" description="The common page-toolbar search bar.">
              <SearchFieldDemo />
            </ShowcaseCard>
            <ShowcaseCard title="With value" description="Shows the built-in clear action when text exists.">
              <SearchFieldFilledValueDemo />
            </ShowcaseCard>
          </div>
        </DocsSection>

        <DocsSection
          id="guidelines"
          title="Guidelines"
          description="Keep search consistent. The component should do the styling work so pages only decide width and data behavior."
        >
          <NotesTable rows={notesRows} />
        </DocsSection>

        <DocsSection
          id="api"
          title="API"
          description="SearchField intentionally stays thin: it reuses Input behavior but locks the shared search visual language."
        >
          <div className="flex flex-col gap-6">
            <PropsTable rows={propRows} />
            <DesignTokensDocTable rows={componentTokenDocs["search-field"].tokens} />
          </div>
        </DocsSection>
      </div>
    </div>
  );
}
