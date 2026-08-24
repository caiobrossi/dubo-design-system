# Actions and feedback

## Button hierarchy

- Use one `primary` action per visible section.
- Use secondary/outline actions for supporting choices.
- Use ghost actions for low-emphasis utilities.
- Use destructive styling only for destructive intent.
- Use the built-in loading state; do not replace button text with custom spinners.
- Icon-only buttons require `aria-label` and `Tooltip`.

## Feedback selection

- Use `Alert` when the message must remain visible in the content flow.
- Use `toast` for brief confirmation or asynchronous outcomes.
- Use `Progress` for measurable or ongoing work.
- Use `Skeleton` when preserving layout reduces perceived loading.
- Use `Spinner` inside a compact control or bounded loading region.
- Use `EmptyState` when content does not exist yet or filters returned no results.
- Use `ErrorState` when an operation failed and the user can retry or recover.

## Confirmation

Use `AlertDialog` before deletion, irreversible changes, or actions affecting clinical/financial
records. State exactly what will happen. Do not use vague confirmation copy.
