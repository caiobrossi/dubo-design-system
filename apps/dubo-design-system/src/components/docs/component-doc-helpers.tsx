import type { ReactNode } from "react";
import type { ComponentTokenDocRow } from "@/lib/component-token-docs";
import { TokenTable } from "@/components/docs/token-table";

interface ShowcaseCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

interface PropRow {
  prop: string;
  type: string;
  default?: string;
  description: string;
}

interface NoteRow {
  item: string;
  details: string;
}

export function ShowcaseCard({ title, description, children }: ShowcaseCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      <div className="flex flex-col gap-2">
        <p className="text-body-md font-medium text-default-font">{title}</p>
        {description ? <p className="text-body-md text-subtext-color">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <TokenTable
      rows={rows}
      columns={[
        {
          key: "prop",
          label: "Prop",
          render: (row) => <code className="text-body-md text-default-font">{row.prop}</code>,
        },
        {
          key: "type",
          label: "Type",
          render: (row) => <code className="text-body-md text-subtext-color">{row.type}</code>,
        },
        {
          key: "default",
          label: "Default",
          render: (row) => (
            <span className="text-body-md text-subtext-color">{row.default ?? "—"}</span>
          ),
        },
        {
          key: "description",
          label: "Description",
        },
      ]}
    />
  );
}

export function NotesTable({ rows }: { rows: NoteRow[] }) {
  return (
    <TokenTable
      rows={rows}
      columns={[
        {
          key: "item",
          label: "Item",
          render: (row) => (
            <span className="text-body-md font-medium text-default-font">{row.item}</span>
          ),
        },
        {
          key: "details",
          label: "Details",
        },
      ]}
    />
  );
}

export function DesignTokensDocTable({ rows }: { rows: ComponentTokenDocRow[] }) {
  return (
    <TokenTable
      rows={rows}
      columns={[
        {
          key: "token",
          label: "Token",
          render: (row) => <code className="text-body-md text-default-font">{row.token}</code>,
        },
        {
          key: "value",
          label: "Value",
          render: (row) => <code className="text-body-md text-subtext-color">{row.value}</code>,
        },
        {
          key: "usage",
          label: "Usage",
        },
      ]}
    />
  );
}
