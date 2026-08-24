# Data, overlays, and advanced interaction

## Data presentation

- Use `Table` for static dense information.
- Use `DataTable` when sorting, column state, or richer interaction is needed.
- Use `DataCards` as the responsive/mobile representation of dense rows.
- Use `StatsBar` for a small set of comparable summary metrics.
- Align numeric data consistently and keep row heights stable.
- Put units, timestamps, and helper text in `text-body-sm`.

## Overlay selection

- `Tooltip`: short explanation, never essential content.
- `HoverCard`: rich preview that does not require a committed action.
- `Popover`: anchored contextual interaction.
- `DropdownMenu`: compact commands or actions.
- `Dialog`: focused task that blocks the underlying workflow.
- `Sheet`: secondary detail/task that benefits from retaining page context.
- `FloatingPanel`: movable secondary workspace that may be minimized.

Never stack multiple blocking overlays. Ensure close controls, escape handling, focus return, and
clear titles are preserved.

## Advanced interaction

- Use `DragAndDrop` only when ordering is meaningful and provide non-drag affordances when needed.
- Use `ResizablePanelGroup` for genuine split-workspace control, not decorative layouts.
- Use `ScrollArea` only inside a constrained region; do not create nested page scroll traps.
