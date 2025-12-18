interface EntityCardProps {
  title: string;
  subtitle?: string;
  badges?: string[];
  onClick?: () => void;
  imageUrl?: string;
}

export function EntityCard({
  title,
  subtitle,
  badges = [],
  onClick,
  imageUrl,
}: EntityCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        h-full w-full relative
        rounded-2xl sq-lift
        border border-white/10
        bg-gradient-to-br from-slate-950/90 via-slate-900/90 to-black/90
        backdrop-blur-md
        p-5
        text-left
        focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
      "
    >
      {/* Elite border accent */}
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/70 to-transparent opacity-70" />

      {/* FLEX COLUMN IS THE KEY */}
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start gap-4">
          {imageUrl ? (
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-2 ring-yellow-400/70 shadow-[0_0_18px_rgba(250,204,21,0.9)]">
              <img
                src={imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-300 via-amber-400 to-orange-500 text-lg font-extrabold text-black shadow-[0_0_18px_rgba(250,204,21,0.9)]">
              {title.charAt(0)}
            </div>
          )}

          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-xs sm:text-sm text-white/60">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Spacer forces footer to bottom */}
        <div className="flex-1" />

        {/* Badges */}
        {badges.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {badges.map((badge, i) => (
              <span
                key={i}
                className="rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-wide text-white/70"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}
