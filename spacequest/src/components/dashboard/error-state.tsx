export function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="rounded-xl bg-gray-900 p-6 ring-1 ring-red-800">
      <p className="font-semibold text-red-300">Something went wrong</p>
      <p className="mt-1 text-sm text-gray-300">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-md bg-yellow-400 px-4 py-2 text-sm font-semibold text-gray-900 hover:opacity-90"
        >
          Retry
        </button>
      )}
    </div>
  );
}
