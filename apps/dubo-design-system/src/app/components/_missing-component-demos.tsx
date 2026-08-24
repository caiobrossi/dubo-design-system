"use client";

import * as React from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Combobox,
  ComboboxField,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  FloatingComboboxTrigger,
} from "@/components/ui/combobox";
import { DataTable } from "@/components/ui/data-table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogBody,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Stepper, StepperItem } from "@/components/ui/stepper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const countries = [
  { value: "br", label: "Brazil" },
  { value: "pt", label: "Portugal" },
  { value: "es", label: "Spain" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "it", label: "Italy" },
];

const countryLabels = Object.fromEntries(
  countries.map((country) => [country.value, country.label])
);

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
];

const frameworkLabels = Object.fromEntries(
  frameworks.map((framework) => [framework.value, framework.label])
);

const dentalProcedures = {
  preventive: [
    { value: "cleaning", label: "Teeth Cleaning" },
    { value: "sealants", label: "Dental Sealants" },
  ],
  restorative: [
    { value: "filling", label: "Dental Filling" },
    { value: "crown", label: "Crown" },
  ],
  cosmetic: [
    { value: "whitening", label: "Teeth Whitening" },
    { value: "veneer", label: "Porcelain Veneer" },
  ],
};

type Patient = {
  id: string;
  name: string;
  email: string;
  lastVisit: string;
  status: "Active" | "Inactive" | "New";
};

const patients: Patient[] = [
  {
    id: "P001",
    name: "Maria Silva",
    email: "maria@email.com",
    lastVisit: "2026-03-15",
    status: "Active",
  },
  {
    id: "P002",
    name: "Joao Santos",
    email: "joao@email.com",
    lastVisit: "2026-03-10",
    status: "Inactive",
  },
  {
    id: "P003",
    name: "Ana Costa",
    email: "ana@email.com",
    lastVisit: "2026-03-08",
    status: "New",
  },
  {
    id: "P004",
    name: "Pedro Oliveira",
    email: "pedro@email.com",
    lastVisit: "2026-02-28",
    status: "Active",
  },
];

function StatusBadge({ status }: { status: Patient["status"] }) {
  const variant = status === "Active" ? "success" : status === "New" ? "info1" : "warning";
  return <Badge variant={variant}>{status}</Badge>;
}

const patientColumns: ColumnDef<Patient>[] = [
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
    accessorKey: "lastVisit",
    header: "Last Visit",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
];

const wizardSteps = [
  { label: "Patient Info" },
  { label: "Clinical Notes" },
  { label: "Treatment Plan" },
  { label: "Review" },
];

const verticalWizardSteps = [
  {
    label: "Patient Info",
    description: "Collect demographics, insurance and consent.",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md text-[color:var(--color-text-secondary)]">
        Patient intake form preview.
      </div>
    ),
  },
  {
    label: "Clinical Notes",
    description: "Capture symptoms, findings and attachments.",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md text-[color:var(--color-text-secondary)]">
        Notes editor preview.
      </div>
    ),
  },
  {
    label: "Treatment Plan",
    description: "Select procedures, estimates and schedules.",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md text-[color:var(--color-text-secondary)]">
        Treatment plan builder preview.
      </div>
    ),
  },
  {
    label: "Review",
    description: "Check details before confirming the flow.",
    content: (
      <div className="rounded-lg border border-[var(--color-border)] p-3 text-body-md text-[color:var(--color-text-secondary)]">
        Final review summary.
      </div>
    ),
  },
];

export function AlertDialogBasicDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete Patient</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete patient record?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes the patient profile, appointments and related notes. This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete Patient</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function ComboboxFloatingMultiDemo() {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-sm">
      <Combobox multiple value={values} onValueChange={setValues}>
        <FloatingComboboxTrigger
          label="Frameworks"
          placeholder="Search and select..."
          labels={frameworkLabels}
        />
        <ComboboxContent>
          <ComboboxInput placeholder="Search frameworks..." />
          <ComboboxList>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxFloatingDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <Combobox value={value} onValueChange={setValue}>
        <FloatingComboboxTrigger
          label="Country"
          placeholder="Search and select..."
          labels={countryLabels}
        />
        <ComboboxContent>
          <ComboboxInput placeholder="Type to search countries..." />
          <ComboboxList>
            <ComboboxEmpty>No country found.</ComboboxEmpty>
            {countries.map((country) => (
              <ComboboxItem key={country.value} value={country.value}>
                {country.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function AlertDialogCustomDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Discard Changes</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full bg-[var(--color-danger-subtle)]">
              <AlertTriangle className="size-5 text-[color:var(--color-danger)]" />
            </div>
            <AlertDialogTitle>Discard unsaved changes?</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            You have pending edits in the clinical note and attached media that will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Keep Editing</AlertDialogCancel>
          <AlertDialogAction>Discard</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function DialogSizesDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      {[
        { label: "Small", size: "sm" as const },
        { label: "Default", size: "default" as const },
        { label: "Large", size: "lg" as const },
        { label: "Patient", size: "xl" as const },
      ].map((dialog) => (
        <Dialog key={dialog.label}>
          <DialogTrigger asChild>
            <Button variant="outline">{dialog.label}</Button>
          </DialogTrigger>
          <DialogContent size={dialog.size}>
            <DialogHeader sticky>
              <DialogTitle>{dialog.label} dialog</DialogTitle>
              <DialogDescription>
                Use {dialog.label.toLowerCase()} layouts when the content scope matches the task.
              </DialogDescription>
            </DialogHeader>
            <DialogBody className="text-body-md text-[color:var(--color-text-secondary)]">
              Modal content preview for the {dialog.label.toLowerCase()} size.
            </DialogBody>
            <DialogFooter sticky>
              <DialogClose asChild>
                <Button variant="outline">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}

export function DialogFormDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Patient</Button>
      </DialogTrigger>
      <DialogContent size="xl">
        <DialogHeader sticky>
          <DialogTitle>New Patient</DialogTitle>
          <DialogDescription>
            Capture essential details before creating the record.
          </DialogDescription>
        </DialogHeader>
        <DialogBody>
          <form className="grid gap-4" onSubmit={(event) => event.preventDefault()}>
            <div className="grid gap-2">
              <label
                htmlFor="patient-name"
                className="text-body-md font-normal text-[color:var(--color-text-primary)]"
              >
                Full Name
              </label>
              <input
                id="patient-name"
                type="text"
                placeholder="Maria Silva"
                className="h-10 rounded-md border border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)] px-3 text-body-md text-[color:var(--color-text-primary)]"
              />
            </div>
            <div className="grid gap-2">
              <label
                htmlFor="patient-email"
                className="text-body-md font-normal text-[color:var(--color-text-primary)]"
              >
                Email
              </label>
              <input
                id="patient-email"
                type="email"
                placeholder="maria@example.com"
                className="h-10 rounded-md border border-[var(--color-border-interactive)] bg-[var(--color-bg-surface)] px-3 text-body-md text-[color:var(--color-text-primary)]"
              />
            </div>
          </form>
        </DialogBody>
        <DialogFooter sticky>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>Save Patient</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function ComboboxSingleDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <ComboboxField
        label="Country"
        helpText="Shared field label and helper text composition."
        htmlFor="combobox-country-trigger"
      >
        <Combobox value={value} onValueChange={setValue}>
          <ComboboxTrigger
            id="combobox-country-trigger"
            placeholder="Select a country..."
            labels={countryLabels}
          />
          <ComboboxContent>
            <ComboboxInput placeholder="Search countries..." />
            <ComboboxList>
              <ComboboxEmpty>No country found.</ComboboxEmpty>
              {countries.map((country) => (
                <ComboboxItem key={country.value} value={country.value}>
                  {country.label}
                </ComboboxItem>
              ))}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </ComboboxField>
    </div>
  );
}

export function ComboboxMultiDemo() {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <div className="w-full max-w-sm">
      <Combobox multiple value={values} onValueChange={setValues}>
        <ComboboxTrigger placeholder="Select frameworks..." labels={frameworkLabels} />
        <ComboboxContent>
          <ComboboxInput placeholder="Search frameworks..." />
          <ComboboxList>
            <ComboboxEmpty>No framework found.</ComboboxEmpty>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework.value} value={framework.value}>
                {framework.label}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function ComboboxGroupedDemo() {
  const [value, setValue] = React.useState("");

  return (
    <div className="w-full max-w-sm">
      <Combobox value={value} onValueChange={setValue}>
        <ComboboxTrigger
          placeholder="Select a procedure..."
          labels={Object.fromEntries(
            Object.values(dentalProcedures)
              .flat()
              .map((procedure) => [procedure.value, procedure.label])
          )}
        />
        <ComboboxContent>
          <ComboboxInput placeholder="Search procedures..." />
          <ComboboxList>
            <ComboboxEmpty>No procedure found.</ComboboxEmpty>
            {Object.entries(dentalProcedures).map(([group, options]) => (
              <ComboboxGroup key={group} heading={group}>
                {options.map((option) => (
                  <ComboboxItem key={option.value} value={option.value}>
                    {option.label}
                  </ComboboxItem>
                ))}
              </ComboboxGroup>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}

export function DataTableBasicDemo() {
  return <DataTable columns={patientColumns} data={patients} />;
}

export function DataTableEmptyDemo() {
  return <DataTable columns={patientColumns} data={[]} emptyMessage="No patients found." />;
}

export function StepperHorizontalDemo() {
  return (
    <div className="w-full max-w-3xl">
      <Stepper activeStep={2}>
        {wizardSteps.map((step) => (
          <StepperItem key={step.label} label={step.label} />
        ))}
      </Stepper>
    </div>
  );
}

export function StepperVerticalDemo() {
  return (
    <div className="w-full max-w-md">
      <Stepper activeStep={1} orientation="vertical">
        {verticalWizardSteps.map((step) => (
          <StepperItem key={step.label} label={step.label} description={step.description}>
            {step.content}
          </StepperItem>
        ))}
      </Stepper>
    </div>
  );
}

export function TableStripedDemo() {
  return (
    <Table variant="striped">
      <TableHeader>
        <TableRow>
          <TableHead>Patient</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Last Visit</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-normal">{patient.name}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>{patient.lastVisit}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableCardDemo() {
  return (
    <Table variant="card">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell>
              <span className="text-body-md font-normal text-[color:var(--color-text-muted)]">ID</span>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function TableSortableDemo() {
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc" | null>(null);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDirection("asc");
      return;
    }

    if (sortDirection === "asc") {
      setSortDirection("desc");
      return;
    }

    if (sortDirection === "desc") {
      setSortKey(null);
      setSortDirection(null);
      return;
    }

    setSortDirection("asc");
  }

  const sortedPatients = patients.toSorted((left, right) => {
    if (!sortKey || !sortDirection) return 0;

    const comparison = String(left[sortKey as keyof Patient]).localeCompare(
      String(right[sortKey as keyof Patient])
    );

    return sortDirection === "asc" ? comparison : -comparison;
  });

  return (
    <Table variant="default">
      <TableCaption>Interactive header sort example.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead
            sortable
            sortDirection={sortKey === "name" ? sortDirection : null}
            onSort={() => handleSort("name")}
          >
            Patient
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "email" ? sortDirection : null}
            onSort={() => handleSort("email")}
          >
            Email
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "lastVisit" ? sortDirection : null}
            onSort={() => handleSort("lastVisit")}
          >
            Last Visit
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortKey === "status" ? sortDirection : null}
            onSort={() => handleSort("status")}
          >
            Status
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedPatients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">{patient.name}</TableCell>
            <TableCell>{patient.email}</TableCell>
            <TableCell>{patient.lastVisit}</TableCell>
            <TableCell>
              <StatusBadge status={patient.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
