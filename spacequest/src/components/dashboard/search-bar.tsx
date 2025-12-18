import { useEffect, useState } from "react";

export function SearchBar({
  onSearch,
  placeholder = "Search...",
}: {
  onSearch: (term: string) => void;
  placeholder?: string;
}) {
  const [value, setValue] = useState("");

  // small debounce (300ms)
  useEffect(() => {
    const id = window.setTimeout(() => onSearch(value), 300);
    return () => window.clearTimeout(id);
  }, [value, onSearch]);

  return (
    <div className="w-full sm:w-96">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-xs text-yellow-300/80">
          ⌕
        </div>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-full bg-black/60 pl-8 pr-4 py-2 text-sm text-white placeholder-gray-500 outline-none ring-1 ring-slate-800 transition focus:ring-2 focus:ring-yellow-400/80 focus:bg-black/80"
        />
      </div>
    </div>
  );
}
