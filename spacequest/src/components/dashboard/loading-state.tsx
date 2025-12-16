export function LoadingState() {
  return (
    <div className="rounded-xl bg-gray-900 p-6 ring-1 ring-gray-800">
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-40 rounded bg-gray-800" />
        <div className="h-3 w-64 rounded bg-gray-800" />
        <div className="h-3 w-56 rounded bg-gray-800" />
      </div>
    </div>
  );
}
