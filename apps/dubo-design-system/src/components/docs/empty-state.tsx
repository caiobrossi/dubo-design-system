interface EmptyStateProps {
  title: string;
  description: string;
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-[20px] border border-dashed border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8">
      <div className="max-w-2xl">
        <p className="text-heading-4 font-medium text-default-font">{title}</p>
        <p className="mt-3 text-body-lg text-subtext-color">{description}</p>
      </div>
    </div>
  );
}
