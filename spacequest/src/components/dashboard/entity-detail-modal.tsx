export function EntityDetailModal({
  open,
  onOpenChange,
  title,
  description,
  sections,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  sections: { label: string; value: string }[];
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={() => onOpenChange(false)}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-gray-900 p-5 ring-1 ring-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-2">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          {description && <p className="mt-1 text-sm text-gray-400">{description}</p>}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {sections.map((s) => (
            <div key={s.label} className="rounded-lg bg-gray-950 p-3 ring-1 ring-gray-800">
              <div className="text-xs text-gray-500">{s.label}</div>
              <div className="mt-1 font-medium text-gray-200">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
