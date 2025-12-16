export function EmptyState({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="rounded-xl bg-gray-900 p-6 ring-1 ring-gray-800">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
    </div>
  );
}
