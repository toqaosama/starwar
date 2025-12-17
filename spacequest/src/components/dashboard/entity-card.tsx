interface EntityCardProps {
  title: string
  subtitle?: string
  badges?: string[]
  onClick?: () => void
}

export function EntityCard({
  title,
  subtitle,
  badges = [],
  onClick,
}: EntityCardProps) {
  return (
    <button
      onClick={onClick}
      className="
        h-full w-full
        rounded-2xl
        border border-white/10
        bg-white/5
        backdrop-blur
        p-5
        text-left
        transition
        hover:border-yellow-400/40
        hover:bg-white/10
        focus:outline-none
      "
    >
      {/* FLEX COLUMN IS THE KEY */}
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-yellow-400 text-lg font-bold text-black">
            {title.charAt(0)}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            {subtitle && (
              <p className="mt-1 text-sm text-white/60">{subtitle}</p>
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
                className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/70"
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
