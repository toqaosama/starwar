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
    <div className="flex flex-col gap-3 rounded-xl bg-gray-900 p-4 ring-1 ring-gray-800 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-300">
        Page <span className="font-semibold text-white">{currentPage}</span>
        <span className="ml-2 text-gray-500">• Total: {totalCount}</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className="rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!hasNext}
          className="rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
