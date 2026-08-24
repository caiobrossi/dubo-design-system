import type { ReactNode } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  GripVertical,
  Search,
  X,
} from "@/lib/icons";
import { cn } from "@/lib/utils";

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <div className="aspect-[4/3] overflow-hidden bg-[var(--color-bg-page)]">
      <div className="flex h-full items-center justify-center">{children}</div>
    </div>
  );
}

function Ink({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("bg-[var(--color-text-primary)] text-[color:var(--color-bg-surface)]", className)}>
      {children}
    </div>
  );
}

function Paper({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cn("bg-[var(--color-bg-surface)] text-[color:var(--color-text-primary)]", className)}>
      {children}
    </div>
  );
}

function MutedLine({ className }: { className?: string }) {
  return <div className={cn("h-2 rounded-full bg-[var(--color-border-strong)]/95", className)} />;
}

function StrongLine({ className }: { className?: string }) {
  return <Ink className={cn("h-2 rounded-full", className)} />;
}

function AccentDot({ className }: { className?: string }) {
  return <Ink className={cn("rounded-full", className)} />;
}

function ButtonThumb() {
  return (
    <Paper className="rounded-[16px] px-8 py-4 shadow-[0_1px_0_0_var(--color-border)]">
      <StrongLine className="h-3 w-28 rounded-full" />
    </Paper>
  );
}

function BadgeThumb() {
  return (
    <div className="relative flex items-center justify-center">
      <Paper className="size-20 rounded-[18px] border border-[var(--color-border)]" />
      <Ink className="absolute right-0 top-0 flex size-9 items-center justify-center rounded-full text-body-md font-medium">
        4
      </Ink>
    </div>
  );
}

function AvatarThumb() {
  return (
    <div className="flex items-center">
      <Paper className="flex size-16 items-center justify-center rounded-full border border-[var(--color-border)]">
        <div className="size-6 rounded-full border-2 border-[var(--color-text-secondary)]" />
      </Paper>
      <Ink className="-ml-2 flex size-16 items-center justify-center rounded-full text-heading-3 font-medium">
        AK
      </Ink>
      <Paper className="-ml-2 flex size-16 items-center justify-center rounded-full border border-[var(--color-border)] text-heading-3 font-medium text-[color:var(--color-text-muted)]">
        OP
      </Paper>
      <AccentDot className="-ml-3 mt-8 size-3.5 border-2 border-[var(--color-bg-page)]" />
    </div>
  );
}

function AlertThumb() {
  return (
    <Paper className="flex w-[220px] items-center gap-4 rounded-[16px] border border-[var(--color-border)] px-5 py-4">
      <AlertTriangle className="size-6 text-[color:var(--color-text-primary)]" strokeWidth={1.8} />
      <div className="flex flex-1 flex-col gap-2">
        <StrongLine className="w-20" />
        <MutedLine className="w-28" />
      </div>
      <X className="size-4 text-[color:var(--color-text-muted)]" strokeWidth={1.8} />
    </Paper>
  );
}

function AccordionThumb() {
  return (
    <div className="flex w-[250px] flex-col gap-2.5">
      {[true, false, false].map((active, index) => (
        <Paper
          key={index}
          className="flex items-center justify-between rounded-[14px] border border-[var(--color-border)] px-4 py-3"
        >
          <div className="flex flex-col gap-2">
            {active ? <StrongLine className="w-24" /> : <MutedLine className="w-28" />}
            <MutedLine className={cn("h-1.5", active ? "w-28" : "w-16")} />
          </div>
          <ChevronDown className="size-4 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
        </Paper>
      ))}
    </div>
  );
}

function BreadcrumbThumb() {
  return (
    <div className="flex items-center gap-1 rounded-[14px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-3 py-2">
      {["w-9", "w-10", "w-7"].map((width, index) => (
        <div key={index} className="flex items-center gap-1">
          <Paper
            className={cn("rounded-full border border-[var(--color-border)] px-3 py-2", width)}
          >
            <div className="h-1.5" />
          </Paper>
          {index < 2 ? (
            <ChevronRight className="size-3.5 text-[color:var(--color-text-secondary)]" strokeWidth={2} />
          ) : null}
        </div>
      ))}
      <Ink className="h-6 w-10 rounded-full" />
    </div>
  );
}

function InputThumb() {
  return (
    <div className="flex w-[250px] flex-col gap-3">
      {[true, false].map((active, index) => (
        <Paper
          key={index}
          className="flex items-center justify-between rounded-[14px] border border-[var(--color-border)] px-4 py-3"
        >
          <div className="flex flex-col gap-2">
            {active ? <StrongLine className="w-24" /> : <MutedLine className="w-20" />}
            <MutedLine className="h-1.5 w-32" />
          </div>
          <Search className="size-4 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
        </Paper>
      ))}
    </div>
  );
}

function TextareaThumb() {
  return (
    <Paper className="flex w-[250px] flex-col gap-3 rounded-[16px] border border-[var(--color-border)] p-4">
      <StrongLine className="w-24" />
      <MutedLine className="w-40" />
      <MutedLine className="w-36" />
      <MutedLine className="w-28" />
    </Paper>
  );
}

function SelectThumb() {
  return (
    <div className="flex w-[250px] flex-col gap-2.5">
      {[true, false].map((active, index) => (
        <Paper
          key={index}
          className="flex items-center justify-between rounded-[14px] border border-[var(--color-border)] px-4 py-3"
        >
          <div className="flex flex-col gap-2">
            {active ? <StrongLine className="w-20" /> : <MutedLine className="w-24" />}
          </div>
          <ChevronDown className="size-4 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
        </Paper>
      ))}
    </div>
  );
}

function CheckboxThumb() {
  return (
    <div className="flex w-[230px] flex-col gap-3">
      {[true, false, false].map((checked, index) => (
        <div key={index} className="flex items-center gap-3">
          <Paper className="flex size-5 items-center justify-center rounded-[6px] border border-[var(--color-border)]">
            {checked ? <Ink className="size-3 rounded-[3px]" /> : null}
          </Paper>
          {index === 0 ? <StrongLine className="w-24" /> : <MutedLine className="w-28" />}
        </div>
      ))}
    </div>
  );
}

function DentalSelectorThumb() {
  return (
    <div className="flex w-[240px] flex-col gap-3">
      <Paper className="rounded-[16px] border border-[var(--color-border)] px-4 py-3">
        <div className="flex flex-col gap-2">
          <StrongLine className="w-16" />
          <MutedLine className="w-24" />
        </div>
      </Paper>
      <Paper className="rounded-[20px] border border-[var(--color-border)] p-4">
        <div className="grid grid-cols-4 gap-2">
          {["18", "17", "16", "15", "24", "25", "26", "27"].map((tooth, index) =>
            index === 2 || index === 5 ? (
              <Ink
                key={tooth}
                className="flex h-8 items-center justify-center rounded-full text-body-sm font-medium"
              >
                {tooth}
              </Ink>
            ) : (
              <Paper
                key={tooth}
                className="flex h-8 items-center justify-center rounded-full border border-[var(--color-border)] text-body-sm font-medium text-[color:var(--color-text-secondary)]"
              >
                {tooth}
              </Paper>
            )
          )}
        </div>
      </Paper>
    </div>
  );
}

function SwitchThumb() {
  return (
    <div className="flex w-[230px] flex-col gap-3">
      <div className="flex items-center justify-between">
        <MutedLine className="w-28" />
        <Ink className="flex h-7 w-12 items-center rounded-full px-1">
          <div className="ml-auto size-5 rounded-full bg-[var(--color-bg-surface)]" />
        </Ink>
      </div>
      <div className="flex items-center justify-between">
        <MutedLine className="w-24" />
        <Paper className="flex h-7 w-12 items-center rounded-full border border-[var(--color-border)] px-1">
          <div className="size-5 rounded-full bg-[var(--color-border-strong)]" />
        </Paper>
      </div>
    </div>
  );
}

function TabsThumb() {
  return (
    <div className="flex w-[240px] flex-col gap-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-2">
          <StrongLine className="w-14" />
          <Ink className="h-1 w-14 rounded-full" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <MutedLine className="w-14" />
          <div className="h-1 w-14 rounded-full bg-transparent" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <MutedLine className="w-14" />
          <div className="h-1 w-14 rounded-full bg-transparent" />
        </div>
      </div>
      <Paper className="rounded-[16px] border border-[var(--color-border)] p-4">
        <MutedLine className="w-36" />
      </Paper>
    </div>
  );
}

function SegmentThumb() {
  return (
    <Paper className="inline-flex items-center rounded-full border border-[var(--color-border)] p-1">
      <Ink className="rounded-full px-5 py-2">
        <div className="h-2 w-10 rounded-full bg-[var(--color-bg-surface)]" />
      </Ink>
      <div className="px-5 py-2">
        <MutedLine className="w-10" />
      </div>
      <div className="px-5 py-2">
        <MutedLine className="w-10" />
      </div>
    </Paper>
  );
}

function StepperThumb() {
  return (
    <div className="flex items-center gap-2">
      {[0, 1, 2, 3].map((step) => (
        <div key={step} className="flex items-center gap-2">
          {step < 2 ? (
            <Ink className="size-7 rounded-full" />
          ) : (
            <Paper className="size-7 rounded-full border border-[var(--color-border)]" />
          )}
          {step < 3 ? <div className="h-px w-5 bg-[var(--color-border)]" /> : null}
        </div>
      ))}
    </div>
  );
}

function TableThumb() {
  return (
    <Paper className="w-[260px] overflow-hidden rounded-[16px] border border-[var(--color-border)]">
      <div className="grid grid-cols-3 border-b border-[var(--color-border)] bg-[var(--color-bg-page)] px-3 py-2">
        <MutedLine className="w-12" />
        <MutedLine className="w-10" />
        <MutedLine className="w-10" />
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "grid grid-cols-3 p-3",
            index !== 0 && "border-t border-[var(--color-border)]"
          )}
        >
          <StrongLine className="w-16" />
          <MutedLine className="w-12" />
          <MutedLine className="w-8" />
        </div>
      ))}
    </Paper>
  );
}

function CalendarThumb() {
  return (
    <Paper className="w-[250px] rounded-[16px] border border-[var(--color-border)] p-3">
      <div className="mb-3 flex items-center justify-center gap-2">
        <CalendarDays className="size-4 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
        <StrongLine className="w-24" />
      </div>
      <div className="grid grid-cols-4 border border-[var(--color-border)]">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-11 border-[var(--color-border)]",
              index % 4 !== 3 && "border-r",
              index < 8 && "border-b"
            )}
          />
        ))}
      </div>
    </Paper>
  );
}

function MenuThumb() {
  return (
    <Paper className="w-[220px] rounded-[16px] border border-[var(--color-border)] p-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-[12px] px-3 py-2",
            index === 1 ? "bg-[var(--color-text-primary)]" : "bg-transparent"
          )}
        >
          {index === 1 ? (
            <div className="h-2 w-20 rounded-full bg-[var(--color-bg-surface)]" />
          ) : (
            <MutedLine className="w-20" />
          )}
        </div>
      ))}
    </Paper>
  );
}

function OverlayThumb() {
  return (
    <div className="relative h-[150px] w-[240px]">
      <Paper className="absolute inset-x-4 top-2 h-14 rounded-[16px] border border-[var(--color-border)]" />
      <Paper className="absolute inset-x-0 top-9 rounded-[18px] border border-[var(--color-border)] px-5 py-4 shadow-[0_1px_0_0_var(--color-border)]">
        <div className="flex flex-col gap-2">
          <StrongLine className="w-24" />
          <MutedLine className="w-32" />
          <div className="mt-2 flex gap-2">
            <Paper className="rounded-full border border-[var(--color-border)] px-4 py-2">
              <div className="h-2 w-10" />
            </Paper>
            <Ink className="rounded-full px-4 py-2">
              <div className="h-2 w-10 rounded-full bg-[var(--color-bg-surface)]" />
            </Ink>
          </div>
        </div>
      </Paper>
    </div>
  );
}

function CardThumb() {
  return (
    <Paper className="w-[220px] rounded-[18px] border border-[var(--color-border)] px-5 py-4">
      <div className="flex flex-col gap-3">
        <StrongLine className="w-20" />
        <MutedLine className="w-32" />
        <MutedLine className="w-24" />
      </div>
    </Paper>
  );
}

function PageHeaderThumb() {
  return (
    <Paper className="w-[250px] rounded-[18px] border border-[var(--color-border)] px-4 py-3">
      <div className="grid grid-cols-[0.7fr_1fr_0.7fr] items-center gap-3">
        <MutedLine className="w-10" />
        <div className="mx-auto flex justify-center gap-2">
          <StrongLine className="w-10" />
          <MutedLine className="w-8" />
          <MutedLine className="w-8" />
        </div>
        <div className="ml-auto flex gap-2">
          <Paper className="size-8 rounded-full border border-[var(--color-border)]" />
          <Ink className="size-8 rounded-full" />
        </div>
      </div>
    </Paper>
  );
}

function PageLayoutThumb() {
  return (
    <div className="flex w-[250px] gap-2">
      <Paper className="h-28 flex-[3] rounded-[16px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)]" />
      <Paper className="h-28 flex-1 rounded-[16px] border border-[var(--color-bg-surface)] bg-[var(--color-bg-surface)]" />
    </div>
  );
}

function DragDropThumb() {
  return (
    <div className="flex w-[230px] flex-col gap-2.5">
      {Array.from({ length: 3 }).map((_, index) => (
        <Paper
          key={index}
          className="flex items-center gap-3 rounded-[16px] border border-[var(--color-border)] px-4 py-3"
        >
          <GripVertical className="size-4 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
          {index === 0 ? <StrongLine className="w-24" /> : <MutedLine className="w-28" />}
        </Paper>
      ))}
    </div>
  );
}

function ProgressThumb() {
  return (
    <div className="flex w-[230px] flex-col gap-5">
      <div className="flex items-center justify-between">
        <MutedLine className="w-20" />
        <MutedLine className="w-8" />
      </div>
      <Paper className="h-3 rounded-full border border-[var(--color-border)] p-[2px]">
        <Ink className="h-full w-[72%] rounded-full" />
      </Paper>
    </div>
  );
}

function SkeletonThumb() {
  return (
    <div className="flex w-[230px] items-center gap-3">
      <Paper className="size-12 rounded-full border border-[var(--color-border)] bg-[var(--color-hover)]" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-3 w-20 rounded-full bg-[var(--color-hover)]" />
        <div className="h-3 w-32 rounded-full bg-[var(--color-hover)]" />
      </div>
    </div>
  );
}

function SeparatorThumb() {
  return (
    <div className="flex w-[230px] items-center gap-3">
      <div className="h-px flex-1 bg-[var(--color-border)]" />
      <Paper className="rounded-full border border-[var(--color-border)] px-3 py-1">
        <div className="h-2 w-8 rounded-full bg-[var(--color-border-strong)]" />
      </Paper>
      <div className="h-px flex-1 bg-[var(--color-border)]" />
    </div>
  );
}

function StatsThumb() {
  return (
    <Paper className="w-[250px] rounded-[18px] border border-[var(--color-border)] p-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <MutedLine className="w-8" />
            <StrongLine className="w-10" />
          </div>
        ))}
      </div>
    </Paper>
  );
}

function DataDisplayThumb() {
  return (
    <Paper className="w-[240px] overflow-hidden rounded-[18px] border border-[var(--color-border)]">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center justify-between px-4 py-3",
            index !== 0 && "border-t border-[var(--color-border)]"
          )}
        >
          <MutedLine className="w-16" />
          <StrongLine className="w-12" />
        </div>
      ))}
    </Paper>
  );
}

function WeekdayThumb() {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 7 }).map((_, index) =>
        index === 2 ? (
          <Ink key={index} className="size-9 rounded-full" />
        ) : (
          <Paper key={index} className="size-9 rounded-full border border-[var(--color-border)]" />
        )
      )}
    </div>
  );
}

function FloatingPanelThumb() {
  return (
    <div className="relative h-[150px] w-[250px]">
      <Paper className="absolute inset-x-3 top-2 rounded-[18px] border border-[var(--color-border)] p-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <StrongLine className="w-20" />
            <MutedLine className="w-10" />
          </div>
          <MutedLine className="w-36" />
          <MutedLine className="w-32" />
        </div>
      </Paper>
      <Paper className="absolute bottom-2 right-2 rounded-[14px] border border-[var(--color-border)] px-4 py-3">
        <StrongLine className="w-12" />
      </Paper>
    </div>
  );
}

function SideNavigationThumb() {
  return (
    <div className="flex h-[150px] w-[250px] overflow-hidden rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-page)]">
      <Paper className="flex h-full w-[84px] flex-col justify-between border-r border-[var(--color-border)] px-3 py-4">
        <div className="space-y-3">
          <Ink className="size-9 rounded-full" />
          <div className="space-y-2">
            <Ink className="h-10 rounded-[12px]" />
            <Paper className="h-10 rounded-[12px] border border-[var(--color-border)]" />
            <Paper className="h-10 rounded-[12px] border border-[var(--color-border)]" />
          </div>
        </div>
        <Paper className="h-10 rounded-[12px] border border-[var(--color-border)]" />
      </Paper>
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="w-full space-y-3">
          <StrongLine className="w-24" />
          <MutedLine className="w-full" />
          <MutedLine className="w-[76%]" />
          <MutedLine className="w-[58%]" />
        </div>
      </div>
    </div>
  );
}

function EmptyStateThumb() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Paper className="flex size-16 items-center justify-center rounded-full border border-[var(--color-border)]">
        <Search className="size-6 text-[color:var(--color-text-secondary)]" strokeWidth={1.8} />
      </Paper>
      <StrongLine className="w-24" />
      <MutedLine className="w-32" />
    </div>
  );
}

function GenericThumb() {
  return (
    <Paper className="w-[220px] rounded-[18px] border border-[var(--color-border)] p-5">
      <div className="flex flex-col gap-3">
        <StrongLine className="w-16" />
        <MutedLine className="w-28" />
        <MutedLine className="w-20" />
      </div>
    </Paper>
  );
}

const previews: Record<string, ReactNode> = {
  button: <ButtonThumb />,
  badge: <BadgeThumb />,
  avatar: <AvatarThumb />,
  alert: <AlertThumb />,
  "alert-dialog": <AlertThumb />,
  tabs: <TabsThumb />,
  "segment-control": <SegmentThumb />,
  stepper: <StepperThumb />,
  card: <CardThumb />,
  "interactive-card": <CardThumb />,
  "page-layout": <PageLayoutThumb />,
  "page-header": <PageHeaderThumb />,
  "empty-state": <EmptyStateThumb />,
  "drag-and-drop": <DragDropThumb />,
  "dental-selector": <DentalSelectorThumb />,
  "floating-panel": <FloatingPanelThumb />,
  "side-navigation": <SideNavigationThumb />,
  "stats-bar": <StatsThumb />,
  "data-display": <DataDisplayThumb />,
  "weekday-picker": <WeekdayThumb />,
  accordion: <AccordionThumb />,
  breadcrumb: <BreadcrumbThumb />,
  input: <InputThumb />,
  textarea: <TextareaThumb />,
  select: <SelectThumb />,
  "field-trigger": <SelectThumb />,
  autocomplete: <InputThumb />,
  combobox: <SelectThumb />,
  "date-picker": <CalendarThumb />,
  "date-field": <CalendarThumb />,
  "time-field": <InputThumb />,
  calendar: <CalendarThumb />,
  checkbox: <CheckboxThumb />,
  "radio-group": <CheckboxThumb />,
  switch: <SwitchThumb />,
  toggle: <SwitchThumb />,
  "toggle-group": <SwitchThumb />,
  "filter-chip": <SwitchThumb />,
  table: <TableThumb />,
  "data-table": <TableThumb />,
  "dropdown-menu": <MenuThumb />,
  command: <MenuThumb />,
  "navigation-menu": <MenuThumb />,
  pagination: <BreadcrumbThumb />,
  dialog: <OverlayThumb />,
  popover: <OverlayThumb />,
  tooltip: <OverlayThumb />,
  sheet: <OverlayThumb />,
  "hover-card": <OverlayThumb />,
  progress: <ProgressThumb />,
  spinner: <ProgressThumb />,
  skeleton: <SkeletonThumb />,
  separator: <SeparatorThumb />,
  "scroll-area": <MenuThumb />,
  resizable: <DragDropThumb />,
};

export function ComponentCatalogPreview({ slug }: { slug: string }) {
  return <PreviewFrame>{previews[slug] ?? <GenericThumb />}</PreviewFrame>;
}
