import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { DesignTokensTable } from "./_components/DesignTokensTable";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableProps,
} from "@/components/ui/table";

/* ── Sample data ── */

const patients = [
  {
    id: "P001",
    name: "Maria Silva",
    email: "maria@email.com",
    status: "Active",
    lastVisit: "2024-03-15",
  },
  {
    id: "P002",
    name: "João Santos",
    email: "joao@email.com",
    status: "Inactive",
    lastVisit: "2024-01-20",
  },
  {
    id: "P003",
    name: "Ana Costa",
    email: "ana@email.com",
    status: "Active",
    lastVisit: "2024-03-10",
  },
  {
    id: "P004",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    status: "Pending",
    lastVisit: "2024-02-28",
  },
  {
    id: "P005",
    name: "Lucia Ferreira",
    email: "lucia@email.com",
    status: "Active",
    lastVisit: "2024-03-20",
  },
];

import { Badge } from "@/components/ui/badge";

/* ── Status badge helper ── */

function StatusBadge({ status }: { status: string }) {
  const variant =
    status === "Active"
      ? ("success" as const)
      : status === "Pending"
        ? ("warning" as const)
        : ("info1" as const);
  return <Badge variant={variant}>{status}</Badge>;
}

/* ── Meta ── */

const meta: Meta<TableProps> = {
  title: "Components/Table",
  component: Table as unknown as Meta<TableProps>["component"],
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: `
**Table** — Dubo Design System component (shadcn-based).

Flexible data table with three visual variants and sortable headers. Uses shared semantic tokens for all colors, borders, and shadows.

### Variants
| Variant | Use |
|---|---|
| \`default\` | Clean rows with bottom border only — standard data tables |
| \`outline\` | Full bordered cells — dense data displays |
| \`striped\` | **Primary style** — gray bg rows, rounded corners, gap between rows (patients list) |
| \`card\` | Card listing — each row renders as a card with shadow and hover |

### Sub-components
- \`Table\` — Root container with variant
- \`TableHeader\` — \`<thead>\` wrapper (hidden in card variant)
- \`TableBody\` — \`<tbody>\` wrapper
- \`TableFooter\` — \`<tfoot>\` wrapper
- \`TableRow\` — Row with hover state (card in card variant)
- \`TableHead\` — Header cell with optional sorting
- \`TableCell\` — Data cell
- \`TableCaption\` — Caption text

### Sortable headers
\`TableHead\` accepts \`sortable\`, \`sortDirection\` ("asc" | "desc" | null), and \`onSort\` props for interactive column sorting.
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "striped", "card"],
    },
  },
  args: {
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<TableProps>;

/* ── Helper: render a standard patient table ── */

function PatientTable({ variant }: { variant?: "default" | "outline" | "card" | "striped" }) {
  if (variant === "card") {
    return (
      <Table variant="card">
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">ID</span>
                <span className="ml-2 font-mono text-body-sm">{patient.id}</span>
              </TableCell>
              <TableCell>
                <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                  Name
                </span>
                <span className="ml-2 font-medium">{patient.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                  Email
                </span>
                <span className="ml-2 text-[color:var(--color-text-secondary)]">{patient.email}</span>
              </TableCell>
              <TableCell>
                <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                  Status
                </span>
                <span className="ml-2">
                  <StatusBadge status={patient.status} />
                </span>
              </TableCell>
              <TableCell>
                <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                  Last Visit
                </span>
                <span className="ml-2 text-[color:var(--color-text-secondary)]">{patient.lastVisit}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  return (
    <Table variant={variant}>
      <TableCaption>A list of recent patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Last Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-mono text-body-sm">{patient.id}</TableCell>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell className="text-[color:var(--color-text-secondary)]">{patient.email}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
            <TableCell className="text-right text-[color:var(--color-text-secondary)]">
              {patient.lastVisit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// ─── Playground ───────────────────────────────────────────────────────────────

export const Playground: Story = {
  render: (args) => <PatientTable variant={args.variant ?? "default"} />,
};

// ─── Default Variant ──────────────────────────────────────────────────────────

export const DefaultVariant: Story = {
  name: "Default Variant",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Clean rows with bottom border only. Standard look for data tables.",
      },
    },
  },
  render: () => (
    <Table variant="default">
      <TableCaption>A list of recent patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Last Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-mono text-body-sm">{patient.id}</TableCell>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell className="text-[color:var(--color-text-secondary)]">{patient.email}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
            <TableCell className="text-right text-[color:var(--color-text-secondary)]">
              {patient.lastVisit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total patients</TableCell>
          <TableCell className="text-right font-medium">{patients.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// ─── Outline Variant ──────────────────────────────────────────────────────────

export const OutlineVariant: Story = {
  name: "Outline Variant",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Full bordered cells with header background. Dense data display style.",
      },
    },
  },
  render: () => (
    <Table variant="outline">
      <TableCaption>A list of recent patients.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Last Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-mono text-body-sm">{patient.id}</TableCell>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell className="text-[color:var(--color-text-secondary)]">{patient.email}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
            <TableCell className="text-right text-[color:var(--color-text-secondary)]">
              {patient.lastVisit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total patients</TableCell>
          <TableCell className="text-right font-medium">{patients.length}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// ─── Striped Variant ──────────────────────────────────────────────────────────

export const StripedVariant: Story = {
  name: "Striped Variant",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "**Primary table style** — rows with subtle gray background, rounded-2xl corners, and 8px gap between rows. Used across the app (patients list, treatments, appointments). Hover darkens the row background.",
      },
    },
  },
  render: () => (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Last Visit</TableHead>
          <TableHead>Professional</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((p) => (
          <TableRow key={p.id}>
            <TableCell className="font-medium">{p.name}</TableCell>
            <TableCell>1990-05-12</TableCell>
            <TableCell>{p.lastVisit}</TableCell>
            <TableCell>Dr. Silva</TableCell>
            <TableCell>
              <StatusBadge status={p.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// ─── Card Variant ─────────────────────────────────────────────────────────────

export const CardVariant: Story = {
  name: "Card Variant",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Each row renders as a card with shadow, hover elevation, and label:value pairs. Headers are hidden.",
      },
    },
  },
  render: () => (
    <Table variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">ID</span>
              <span className="ml-2 font-mono text-body-sm">{patient.id}</span>
            </TableCell>
            <TableCell>
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">Name</span>
              <span className="ml-2 font-medium">{patient.name}</span>
            </TableCell>
            <TableCell>
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">Email</span>
              <span className="ml-2 text-[color:var(--color-text-secondary)]">{patient.email}</span>
            </TableCell>
            <TableCell>
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                Status
              </span>
              <span className="ml-2">
                <StatusBadge status={patient.status} />
              </span>
            </TableCell>
            <TableCell>
              <span className="text-body-sm font-medium text-[color:var(--color-text-muted)]">
                Last Visit
              </span>
              <span className="ml-2 text-[color:var(--color-text-secondary)]">{patient.lastVisit}</span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// ─── Sortable Headers ─────────────────────────────────────────────────────────

function SortableHeadersDemo() {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc" | null>(null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else if (sortDir === "desc") {
      setSortKey(null);
      setSortDir(null);
    } else {
      setSortDir("asc");
    }
  }

  const sorted = patients.toSorted((a, b) => {
    if (!sortKey || !sortDir) return 0;
    const aVal = a[sortKey as keyof typeof a];
    const bVal = b[sortKey as keyof typeof b];
    const cmp = aVal.localeCompare(bVal);
    return sortDir === "asc" ? cmp : -cmp;
  });

  return (
    <Table variant="default">
      <TableHeader>
        <TableRow>
          <TableHead
            className="w-[80px]"
            sortable
            sortDirection={sortKey === "id" ? sortDir : null}
            onSort={() => handleSort("id")}
          >
            ID
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "name" ? sortDir : null}
            onSort={() => handleSort("name")}
          >
            Name
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "email" ? sortDir : null}
            onSort={() => handleSort("email")}
          >
            Email
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "status" ? sortDir : null}
            onSort={() => handleSort("status")}
          >
            Status
          </TableHead>
          <TableHead
            className="text-right"
            sortable
            sortDirection={sortKey === "lastVisit" ? sortDir : null}
            onSort={() => handleSort("lastVisit")}
          >
            Last Visit
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sorted.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-mono text-body-sm">{patient.id}</TableCell>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell className="text-[color:var(--color-text-secondary)]">{patient.email}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
            <TableCell className="text-right text-[color:var(--color-text-secondary)]">
              {patient.lastVisit}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const SortableHeaders: Story = {
  name: "Sortable Headers",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          "Interactive table with sortable columns. Click a header to cycle sort direction: none → asc → desc → none.",
      },
    },
  },
  render: () => <SortableHeadersDemo />,
};

// ─── Empty State ──────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  name: "Empty State",
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: "Table with no data rows, showing an empty message.",
      },
    },
  },
  render: () => (
    <Table variant="default">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Last Visit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="h-24 text-center text-[color:var(--color-text-muted)]">
            No patients found.
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

// ─── Design Tokens ────────────────────────────────────────────────────────────

export const DesignTokens: StoryObj = {
  name: "Design Tokens",
  parameters: { controls: { disable: true } },
  render: () => (
    <DesignTokensTable
      tokens={[
        { token: "--color-bg-surface", value: "bgSurface", usage: "Card variant background" },
        {
          token: "--color-border",
          value: "border",
          usage: "All borders — rows, cells, card edges",
        },
        { token: "--color-border-strong", value: "borderStrong", usage: "Card hover border" },
        { token: "--color-text-primary", value: "textPrimary", usage: "Header text, cell text" },
        { token: "--color-text-muted", value: "textMuted", usage: "Card labels, captions" },
        { token: "--color-bg-input", value: "bgInput", usage: "Striped row background" },
        { token: "--color-hover", value: "hover", usage: "Default row hover, outline header bg" },
        { token: "--color-bg-input-hover", value: "bgInputHover", usage: "Striped row hover" },
        { token: "--shadow-xs", value: "shadow.xs", usage: "Card variant resting shadow" },
        { token: "--shadow-sm", value: "shadow.sm", usage: "Card variant hover shadow" },
        {
          token: "--transition-fast",
          value: "interaction.transitionFast",
          usage: "Hover and shadow transitions",
        },
      ]}
    />
  ),
};
