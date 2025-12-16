export function EntityCard({
  title,
  subtitle,
  badges,
  onClick,
}: {
  title: string;
  subtitle?: string;
  badges?: string[];
  onClick: () => void;
}) {
  const safeTitle = title?.trim() || "Unknown";
  const initial = safeTitle.charAt(0).toUpperCase();

  return (
    <button
      onClick={onClick}
      className="group text-left rounded-xl bg-gray-900 p-5 shadow-md ring-1 ring-gray-800 transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-400 text-lg font-bold text-gray-900">
        {initial}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-white transition group-hover:text-yellow-400">
        {safeTitle}
      </h3>

      {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}

      {badges && badges.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {badges.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="rounded-full bg-gray-950 px-3 py-1 text-xs text-gray-300 ring-1 ring-gray-800"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </button>
  );
}
