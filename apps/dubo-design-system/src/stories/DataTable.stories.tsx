import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { type ColumnDef } from "@tanstack/react-table";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import { DataTable, type DataTableProps } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";

/* ── Sample data ── */

type Patient = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  lastVisit: string;
  status: "Active" | "Inactive" | "New";
};

const patients: Patient[] = [
  {
    id: "P001",
    name: "Maria Silva",
    email: "maria@email.com",
    dateOfBirth: "1990-05-12",
    lastVisit: "2024-03-15",
    status: "Active",
  },
  {
    id: "P002",
    name: "João Santos",
    email: "joao@email.com",
    dateOfBirth: "1985-08-23",
    lastVisit: "2024-01-20",
    status: "Inactive",
  },
  {
    id: "P003",
    name: "Ana Costa",
    email: "ana@email.com",
    dateOfBirth: "1992-11-30",
    lastVisit: "2024-03-10",
    status: "Active",
  },
  {
    id: "P004",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    dateOfBirth: "1978-02-14",
    lastVisit: "2024-02-28",
    status: "New",
  },
  {
    id: "P005",
    name: "Lucia Ferreira",
    email: "lucia@email.com",
    dateOfBirth: "1995-07-08",
    lastVisit: "2024-03-20",
    status: "Active",
  },
  {
    id: "P006",
    name: "Carlos Mendes",
    email: "carlos@email.com",
    dateOfBirth: "1988-12-01",
    lastVisit: "2023-11-15",
    status: "Inactive",
  },
  {
    id: "P007",
    name: "Beatriz Lima",
    email: "beatriz@email.com",
    dateOfBirth: "2000-03-25",
    lastVisit: "2024-03-22",
    status: "Active",
  },
  {
    id: "P008",
    name: "Ricardo Sousa",
    email: "ricardo@email.com",
    dateOfBirth: "1972-09-18",
    lastVisit: "2024-03-01",
    status: "New",
  },
];

/* ── Column definitions ── */

const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "name",
    header: "Patient",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
  },
  {
    accessorKey: "lastVisit",
    header: "Last Visit",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Active" ? "success" : status === "New" ? "info1" : "warning";
      return <Badge variant={variant}>{status}</Badge>;
    },
  },
];

/* ── Meta ── */

const meta: Meta<DataTableProps<Patient, unknown>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**DataTable** --- TanStack React Table wrapper for the Dubo Design System.

Use **DataTable** (this component) when you need:
- Sorting, filtering, or pagination logic
- Large datasets (100+ rows)
- Row selection with checkboxes
- Server-side operations (manual sorting/filtering)
- Column visibility controls
- Future: virtualization for 1000+ rows

Use **Table** (static) when you need:
- Simple static tables (<100 rows)
- No sorting/filtering needed
- Settings pages, small data displays
- Full HTML semantics (\`<table>\`, \`<tr>\`, \`<td>\`)

### Comparison
| Feature | Table | DataTable |
|---|---|---|
| Rendering | HTML \`<table>\` | Div-based flex |
| Sorting | Visual only (props) | Built-in (TanStack) |
| Filtering | No | Built-in |
| Row selection | No | Built-in |
| Virtualization | No | Via @tanstack/react-virtual |
| Best for | <100 rows, static | 100+ rows, interactive |
        `,
      },
    },
  },
  argTypes: {
    enableSorting: {
      control: "boolean",
      description: "Enable column sorting",
    },
    enableRowSelection: {
      control: "boolean",
      description: "Enable row selection",
    },
    emptyMessage: {
      control: "text",
      description: "Message shown when data is empty",
    },
    loading: {
      control: "boolean",
      description: "Show loading state",
    },
  },
  args: {
    enableSorting: true,
    enableRowSelection: false,
    loading: false,
  },
};

export default meta;

/* ── Stories ── */

// ─── Playground ──────────────────────────────────────────────────────────────

export const Playground: StoryObj<DataTableProps<Patient, unknown>> = {
  render: (args) => (
    <DataTable
      columns={columns}
      data={patients}
      enableSorting={args.enableSorting}
      enableRowSelection={args.enableRowSelection}
      emptyMessage={args.emptyMessage}
      loading={args.loading}
    />
  ),
};

// ─── With Sorting ────────────────────────────────────────────────────────────

function DataTableSortingDemo() {
  const [sorting, setSorting] = React.useState([{ id: "name", desc: false }]);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={patients} sorting={sorting} onSortingChange={setSorting} />
      <pre className="rounded-lg bg-[var(--color-hover)] p-4 text-body-sm text-[color:var(--color-text-secondary)]">
        sorting: {JSON.stringify(sorting, null, 2)}
      </pre>
    </div>
  );
}

export const WithSorting: StoryObj = {
  name: "With Sorting",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Click any column header to sort. Sorting cycles: none → ascending → descending → none. The sort indicator appears on hover and stays visible when active.",
      },
    },
  },
  render: () => <DataTableSortingDemo />,
};

// ─── With Row Click ──────────────────────────────────────────────────────────

function DataTableRowClickDemo() {
  const [clicked, setClicked] = React.useState<Patient | null>(null);

  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={patients} onRowClick={(row) => setClicked(row.original)} />
      {clicked && (
        <div className="rounded-lg bg-[var(--color-hover)] p-4 text-body-md text-[color:var(--color-text-primary)]">
          <strong>Clicked:</strong> {clicked.name} ({clicked.email})
        </div>
      )}
    </div>
  );
}

export const WithRowClick: StoryObj = {
  name: "With Row Click",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Click a row to trigger the `onRowClick` handler. The cursor changes to pointer when `onRowClick` is provided.",
      },
    },
  },
  render: () => <DataTableRowClickDemo />,
};

// ─── Empty State ─────────────────────────────────────────────────────────────

export const EmptyState: StoryObj = {
  name: "Empty State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "When the data array is empty, a centered message is displayed. Customize it via the `emptyMessage` prop.",
      },
    },
  },
  render: () => <DataTable columns={columns} data={[]} emptyMessage="No patients found." />,
};

// ─── Loading ─────────────────────────────────────────────────────────────────

export const Loading: StoryObj = {
  name: "Loading",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'When `loading` is true, a "Loading..." message is shown instead of rows.',
      },
    },
  },
  render: () => <DataTable columns={columns} data={patients} loading={true} />,
};

// ─── Design Tokens ───────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      tokens={[
        { token: "--color-text-primary", value: "textPrimary", usage: "Header text and cell text" },
        { token: "--color-text-muted", value: "textMuted", usage: "Empty state and loading text" },
        { token: "--color-bg-input", value: "bgInput", usage: "Row background color" },
        {
          token: "--color-bg-input-hover",
          value: "bgInputHover",
          usage: "Row hover background, selected row",
        },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "Row hover transition duration",
        },
      ]}
    />
  ),
};
