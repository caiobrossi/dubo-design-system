"use client";

import * as React from "react";
import { ChevronDown, X } from "@/lib/icons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FloatingFieldTrigger } from "@/components/ui/field-trigger";

export function FieldTriggerEmptyDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full max-w-sm">
      <FloatingFieldTrigger
        label="Tipo de procedimento"
        variant="filled"
        open={open}
        onClick={() => setOpen((current) => !current)}
        triggerIcon={<ChevronDown className={open ? "rotate-180" : undefined} />}
      />
    </div>
  );
}

export function FieldTriggerValueDemo() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-full max-w-sm">
      <FloatingFieldTrigger
        label="Tipo de procedimento"
        variant="filled"
        open={open}
        hasValue
        onClick={() => setOpen((current) => !current)}
        triggerIcon={<ChevronDown className={open ? "rotate-180" : undefined} />}
      >
        <div className="flex min-w-0 items-center gap-2">
          <span className="truncate">47 - Biópsias</span>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="size-6 shrink-0 text-[color:var(--color-text-muted)]"
            onClick={(event) => event.stopPropagation()}
          >
            <X className="size-4" />
          </Button>
        </div>
      </FloatingFieldTrigger>
    </div>
  );
}

export function FieldTriggerChipsDemo() {
  return (
    <div className="w-full max-w-sm">
      <FloatingFieldTrigger
        label="Tipo de procedimento"
        variant="filled"
        hasValue
        triggerIcon={<ChevronDown />}
      >
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="info1" intensity="soft" size="default">
            Biópsias
          </Badge>
          <Badge variant="info1" intensity="soft" size="default">
            Exodontia simples
          </Badge>
        </div>
      </FloatingFieldTrigger>
    </div>
  );
}
