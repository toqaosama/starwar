export function PaginationControls({
  currentPage,
  hasNext,
  hasPrevious,
  onNext,
  onPrevious,
  totalCount,
}: {
  currentPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onNext: () => void;
  onPrevious: () => void;
  totalCount: number;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-black/70 p-4 ring-1 ring-slate-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-300">
        <span className="inline-flex items-center rounded-full border border-yellow-400/20 bg-yellow-400/10 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-yellow-200">
          Mission Log
        </span>
        <span className="ml-2">
          Page <span className="font-semibold text-white">{currentPage}</span>
          <span className="ml-2 text-gray-500">• Total: {totalCount}</span>
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white ring-1 ring-slate-700 transition hover:bg-slate-800 hover:text-yellow-200 disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-full bg-gradient-to-r from-yellow-400 via-amber-300 to-emerald-300 px-4 py-2 text-xs font-semibold text-slate-900 shadow-[0_0_18px_rgba(250,204,21,0.9)] transition hover:brightness-110 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
