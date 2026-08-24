"use client";

import * as React from "react";
import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  FloatingAutocompleteInput,
} from "@/components/ui/autocomplete";

type PatientOption = {
  value: string;
  label: string;
  phone: string;
  note: string;
};

const patientOptions: PatientOption[] = [
  {
    value: "maria-silva",
    label: "Maria Silva",
    phone: "+351 912 345 678",
    note: "Retorno de profilaxia",
  },
  {
    value: "joao-santos",
    label: "Joao Santos",
    phone: "+351 913 222 111",
    note: "Avaliação inicial",
  },
  {
    value: "ana-costa",
    label: "Ana Costa",
    phone: "+351 914 987 654",
    note: "Tratamento ortodôntico",
  },
  {
    value: "pedro-oliveira",
    label: "Pedro Oliveira",
    phone: "+351 917 555 010",
    note: "Ajuste de coroa",
  },
];

type ProcedureOption = {
  value: string;
  label: string;
  duration: string;
};

const procedureOptions: ProcedureOption[] = [
  { value: "cleaning", label: "Limpeza", duration: "30 min" },
  { value: "consultation", label: "Consulta inicial", duration: "45 min" },
  { value: "whitening", label: "Branqueamento", duration: "60 min" },
  { value: "implant-review", label: "Revisão de implante", duration: "30 min" },
];

export function AutocompleteStandardDemo() {
  const [selectedPatient, setSelectedPatient] = React.useState<PatientOption | null>(null);
  const [createdPatientName, setCreatedPatientName] = React.useState<string | null>(null);

  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={patientOptions}
        value={selectedPatient}
        onValueChange={setSelectedPatient}
        openOnInputClick
        autoHighlight
      >
        <AutocompleteInput
          label="Paciente"
          placeholder="Buscar paciente..."
          clearable
          showTrigger
        />
        <AutocompleteContent>
          <AutocompleteEmpty
            showCreateAction
            createActionLabel="Criar paciente"
            onCreateAction={() => setCreatedPatientName("Fluxo de criar paciente")}
          >
            Paciente não encontrado.
          </AutocompleteEmpty>
          <AutocompleteList>
            {(item: PatientOption) => (
              <AutocompleteItem key={item.value} value={item}>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate">{item.label}</span>
                  <span className="truncate text-body-sm text-[color:var(--color-text-secondary)]">
                    {item.phone} • {item.note}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      {createdPatientName ? (
        <p className="mt-3 text-body-sm text-[color:var(--color-text-secondary)]">
          Ação disparada: {createdPatientName}
        </p>
      ) : null}
    </div>
  );
}

export function AutocompleteFloatingDemo() {
  const [selectedProcedure, setSelectedProcedure] = React.useState<ProcedureOption | null>(null);

  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={procedureOptions}
        value={selectedProcedure}
        onValueChange={setSelectedProcedure}
        openOnInputClick
        autoHighlight
      >
        <FloatingAutocompleteInput label="Procedimento" variant="filled" clearable showTrigger />
        <AutocompleteContent>
          <AutocompleteEmpty>Nenhum procedimento encontrado.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: ProcedureOption) => (
              <AutocompleteItem key={item.value} value={item}>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <span className="truncate">{item.label}</span>
                  <span className="shrink-0 text-body-sm text-[color:var(--color-text-secondary)]">
                    {item.duration}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  );
}

export function AutocompleteDenseDemo() {
  const [selectedPatient, setSelectedPatient] = React.useState<PatientOption | null>(null);

  return (
    <div className="w-full max-w-sm">
      <Autocomplete
        items={patientOptions}
        value={selectedPatient}
        onValueChange={setSelectedPatient}
        openOnInputClick
        autoHighlight
      >
        <FloatingAutocompleteInput
          label="Paciente"
          variant="outline"
          helpText="Desktop first. Vamos integrar no modal de agendamento depois."
          clearable
        />
        <AutocompleteContent>
          <AutocompleteEmpty>Nenhum paciente encontrado.</AutocompleteEmpty>
          <AutocompleteList>
            {(item: PatientOption) => (
              <AutocompleteItem key={item.value} value={item}>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate">{item.label}</span>
                  <span className="truncate text-body-sm text-[color:var(--color-text-secondary)]">
                    {item.note}
                  </span>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
    </div>
  );
}
