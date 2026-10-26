export type EmptyStateProps = {
  title: string;
  reason: string;
};

export function EmptyState({ title, reason }: EmptyStateProps) {
  return (
    <div className="pr-empty">
      <p className="pr-empty-title">{title}</p>
      <p className="pr-empty-reason">{reason}</p>
    </div>
  );
}
